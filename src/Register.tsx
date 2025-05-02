import {useState,ReactHTMLElement,useRef ,useEffect } from 'react'
import './App.css';
import { randomUUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import axiosConfig from './axios/axiosConfig';
import  { AxiosError } from 'axios';

interface RegisterComp{
    children? :React.ReactNode
}

const Register :React.FC<RegisterComp>=({children})=>{



    const REGISTER = 'register/'
    const formRef = useRef<HTMLFormElement | null>(null) 
    const [username,Setuser] = useState('')
    const [key,Setkey] = useState('')
    const [currentFormId, setCurrentFormId] = useState<string>('');
    const [sizeFlg,setSize] = useState<boolean>(true);
    const [charFlg,setChar] = useState<boolean>(true);
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
          if (!username){
            setSize(false)
            setChar(false)
          }
          Setuser(user)
            if (user.length >=5 && user.length <=15){
              setSize(true)
            }
            else{setSize(false)}
            const pattern = /^[a-zA-Z0-9]+$/;
            if (pattern.test(user)){setChar(true)}
            else {setChar(false)}

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
            const response  =await axiosConfig.post(REGISTER,
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
            console.log('Registration successful:', result);

        }
        catch(error: unknown){
          if (error instanceof AxiosError && error.response?.data) {
          console.error('Error during registration:', error?.response.data.errors.username);
          alert(error?.response.data.errors.username)
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

    <form id  = 'Register' ref={formRef} onSubmit={(e)=>{e.preventDefault() ; handleSubmit()}}>
    <div className="form-group">
      <label>Username:</label>
      <input className  = {shake ? 'shake': undefined}type="text" value={username} onChange={handleUsernameChange} />
    </div>
              {/* <div className="requirements-container"> */}
            {!sizeFlg? (
              <p className="requirements">
                <span style={{color:'red',fontSize :'small'}}>!</span> Username must be between 4 and 15 characters long.
              </p>
            ) : null}
            {!charFlg? (
              <p className="requirements">
                <span style={{color:'red',fontSize :'small'}}>!</span> Letters and numbers only.
              </p>
            ) : null}
          {/* </div> */}

    <div className="form-group" >
      <label>Key:</label>
      <div className="key-input-container">
        <input type="text" value={key} readOnly style={{backgroundColor : currentFormId ? 'lightgray' :'transparent'}} />
        <button type="button" onClick={handleGenerateKey}>KeyGen</button>
      </div>
    </div>
    <button type="submit">Submit</button>
  </form>
  
  </div>
  )
}

export default Register
