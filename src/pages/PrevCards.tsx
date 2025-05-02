import { useEffect,useState,ChangeEvent, MouseEvent, useRef} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';
import useRefresh from './useRefreshToken';
import "./Cards.css"

import React from 'react'

interface PrevCardsProps {
  id: number;
  }


const PrevCards:React.FC<PrevCardsProps> =({id}) =>{

  const context = useAuth()
  
  if (!context) {
    throw new Error('AuthContext used outside AuthProvider');
  }
  const { auth, setAuth ,IsdetCard,setDetCard } = context

  
  
  return (
    <div>
     
    <div className="card">
    <div className="align">
        <span className="red"></span>
        <span className="yellow"></span>
        <span className="green"></span>
    </div>

    <h1>Natural Disaster nottes</h1>
</div>


          

                  </div>

  )
}

export default PrevCards
