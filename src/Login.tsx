import {useState,ReactHTMLElement,useRef ,useEffect,useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';

import './App.css';
import { randomUUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
// import privateAxios from './axiosConfig';
import  { AxiosError } from 'axios';
import { AuthContext } from './AuthProvider';
import useAuth from './customhooks/useAuth';
import   axios from './axios/axiosConfig'; 

interface LoginComp{
    children? :React.ReactNode
}


const Login :React.FC<LoginComp>=({children})=>{
const location = useLocation()
const navigate = useNavigate()
const from = "/dashboard";
const context = useAuth()

if (!context) {
    throw new Error('AuthContext used outside AuthProvider');
  }
  const { auth, setAuth } = context
  console.log(`The authy is  ${auth?.userId}`)
  
    const LOGIN = 'login/'

    const formRef = useRef<HTMLFormElement | null>(null) 
    const [username,Setuser] = useState('testing1')
    const [key,Setkey] = useState('7ea5cd5e2d64')
    const [currentFormId, setCurrentFormId] = useState<string>('');
    const [sizeFlg,setSize] = useState<boolean>(false);
    const [charFlg,setChar] = useState<boolean>(false);
    const [shake,setShake] =  useState<boolean>(false);

    useEffect(() => {
      console.log(`useeffect size ${sizeFlg}`)
      console.log(`useeffect size ${charFlg}`)

    }, [sizeFlg, charFlg]);

    // Passkey generation
    const handleGenerateKey =()=>{
    const length=  12
    const randomVal =uuidv4().replace(/-/g,'')
    const newVal = randomVal.substring(0,length)
    Setkey(newVal)
    }
    
    // -----------  User generation -----------//
    const handleUsernameChange= (event:React.ChangeEvent<HTMLInputElement>)=>{
          const user = event.target.value
          Setuser(user)
            if (user.length >=5 && user.length <=15){
              setSize(true)
            }
            else{setSize(false)}
            const pattern = /^[a-zA-Z0-9]+$/;
            if (pattern.test(user)){setChar(true)}
            else {setChar(false)}
      }
      
    const handlePassChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
      const pass = event.target.value
      Setkey(pass)
    }
    useEffect(() => {
      if (formRef.current) {
        setCurrentFormId(formRef.current.id)
        console.log("Form ID:", formRef.current.id); 
      }
    }, [formRef]);


    const userShake =()=>{
        const shaking = setTimeout(()=>{
            setShake(false)
        },500)
    }
    const handleSubmit = async()=>{
      console.log('Entered FORM')
        if (!charFlg || !sizeFlg){
            console.log('error user invalid')
            setShake(true)
            userShake()
            return
        }
        try{
            const response  =await axios.post(LOGIN,
                  {    username: username,
                    key: key},
                  {
                    headers : {
                      "Content-Type" : 'application/json',
                    },
                    withCredentials :true
                  }
            )
            const result = response.data
            console.log('Login successful:', result.access);
            console.log('Login successful user:', result.user);
            console.log('Login successful refresh:', result.refresh);
            const accessToken = result.access
            const refreshToken = result.refresh
            localStorage.setItem('refresh',refreshToken)
            setAuth({userId:username,accessToken})
            Setuser('')
            Setkey('')
            alert(from)
            navigate(from, { replace: true });

        }
        catch(error: unknown){
          if (error instanceof AxiosError && error.response?.data) {
          console.error('Error during registration:', error?.response.data.errors);
          console.error('Error during registration2:', error?.cause);
          console.error('Error during registration3:', error?.message);
          console.error('Error during registration4:', error?.response);
          console.error('Error during registration5:', error);
        }
        else {
          console.log('didnt go through')
        }
        }
    }

  return (
    <div>  
    <header>
      <div className='head'>
      </div>
    </header>

    <form id  = 'Login' ref={formRef} onSubmit={(e)=>{e.preventDefault() ; handleSubmit()}}>
    <div className="form-group">
      <label>Username:</label>
      <input type="text" value={username} onChange={handleUsernameChange} />
    </div>
    <div className="form-group" >
      <label>Key:</label>
      <div className="key-input-container">
        <input type="password" value={key} onChange={handlePassChange}  style={{backgroundColor : currentFormId ? 'lightgray' :'transparent'}} />
      </div>
    </div>
    <button type="submit">Submit</button>
  </form>
  
  </div>
  )
}

export default Login
