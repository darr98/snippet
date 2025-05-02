import React from 'react'
import { Link, Outlet } from 'react-router-dom'; 


interface LayoutComp{
    children? :React.ReactNode
}

const Layout :React.FC<LayoutComp>=({children})=>{
  return (
    <div>
    <header>
    <nav>
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/register" className="nav-button">Register</Link>
    </nav>
  </header>
  <main>
        <Outlet/>
      </main>
  </div>
  )
}

export default Layout
