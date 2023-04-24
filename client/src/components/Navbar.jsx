import React from 'react'
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='container'>
        <NavLink 
            to='/'
            className={({isActive})=> isActive? "link active" : "link"}
        >
            Home
        </NavLink>
        <NavLink 
            to='/dashboard' 
            className={({isActive})=> isActive ? "link active": "link"}
        >
            Dashboard
        </NavLink>
        
        <NavLink
            to='/register'
            className={({isActive})=> isActive? "link active" : "link"}
        >
            Sign up
        </NavLink>
        <NavLink
            to='/login'
            className={({isActive})=> isActive? "link active" : "link"}
        >
            Login
        </NavLink>
        </div>
    </nav>
  )
}

export default Navbar