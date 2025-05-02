import React, { useEffect } from 'react'
import useAuth from '../customhooks/useAuth'
import { privateAxios } from './axiosConfig';
import { error } from 'console';
import useRefresh from '../useRefreshToken';

const customAxios =()=> {


const refresh = useRefresh()
const context = useAuth()
if (!context) {
    throw new Error('AuthContext used outside AuthProvider');
  }
  const { auth, setAuth } = context

useEffect(()=>{

    const requestinterceptors = privateAxios.interceptors.request.use(
      config =>{
          if (!config.headers['Authorization']){
            config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
          }
          return config
      },
      error => Promise.reject(error)
    )

    const responseinterceptors = privateAxios.interceptors.response.use(
      response=>response,
      async error =>{
          const prev=  error.config
          if (error?.response?.status ==403  && !prev?.sent){
              prev.sent = true
              const token = await refresh()
              if (token) {
                prev.headers['Authorization'] = `Bearer ${token}`; // Set new token
                return privateAxios(prev); // Retry the original request with new token
              }
    
              // If refresh fails, redirect to login (or handle accordingly)
              window.location.href = "/login"; 
              return Promise.reject(error);
          }
          return Promise.reject(error)
        }
      
    )
    return()=>{
      privateAxios.interceptors.request.eject(requestinterceptors)
      privateAxios.interceptors.response.eject(responseinterceptors)

    }

},[auth,refresh])

  return privateAxios
}

export default customAxios
