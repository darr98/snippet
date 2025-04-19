import { useContext, useDebugValue } from "react";
import { AuthContext } from "./AuthProvider";
import { privateAxios } from './axiosConfig'; 
import   axios from './axiosConfig'; 
import  { AxiosError } from 'axios';
const useRefresh = () => {

    console.log('B1  useRefresh Called')
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('B2.  AuthContext used outside AuthProvider');
    }
    const { setAuth} = context;

    const refresh =async ()=>{

      console.log('B3.  refresh initiated get API')
    
    try{
      console.log('B4.  Entering Try')
      const response = await axios.post('refresh/', {
        'refresh' : localStorage.getItem('refresh')
      })
    console.log('B5.  refresh TOKEN generated check ')
    const data =response.data
    console.log(`B6.  The data of TOKEN  : ${JSON.stringify(data, null, 2)}`)
    const Token = response.data.access
    const user = response.data.username
    console.log(`B7.   token is ${Token}`)
    setAuth(prev=>{
        if (prev){
          return {
            ...prev, accessToken : Token
          }
        }else{
          return{
            userId : user , accessToken : Token
          }
        } 
    })
  
    return Token.access
  }
  catch (error) {
    console.log('B8E1.   refresh FAILED!!!!!!')
    if (error instanceof AxiosError) {
      console.error('B9E2. Error during refresh token request:', error.response?.data || error.message);
  }
  // You can return null or an empty string depending on how you want to handle it in the calling function.
  return null;
  }

}
      return refresh
    }

    
export default useRefresh;
