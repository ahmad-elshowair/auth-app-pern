import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = ({setUsers}) => {
    const navigate =useNavigate();
    
    const addUser = (user) =>{
        setUsers(prev => [...prev, user]);
    }

    const [userForm, setUserForm] = useState({
        user_email: '',
        user_name: '',
        user_password: '',
        is_admin: false
    });

    // handle on change form
    const handleOnChange = (e)=>{
        const {name, value, type, checked} = e.target;
        setUserForm(prev =>{
            return {
                ...prev,
                [name]: type ==="checkbox"? checked : value
            }
        });
    };

    // create a new user
    const handleRegister = async(e) => {
        e.preventDefault();
        const body = userForm;
        console.log(body);
        try {
            const response = await axios.post('http://localhost:5000/users/create-user', body);
            if(response){
                addUser(response.data);
                navigate('/login');
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }

    };

  return (
    <form className='w-50 p-3 shadow rounded' onSubmit={handleRegister}>
        <h1 className='text-center mb-3'>Register</h1>
        
        <div className="mb-3">
            <label htmlFor="user_email" className="form-label">Email address</label>
            <input 
                type="email" 
                className="form-control" 
                placeholder='user email...'
                id="user_email" 
                aria-describedby="emailHelp"
                value={userForm.user_email}
                onChange={handleOnChange}
                name='user_email'
            />
        </div>

        <div className="mb-3">
            <label htmlFor="user_name" className="form-label">Name</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder='user name...'
                id="usr_name"
                value={userForm.user_name}
                onChange={handleOnChange}
                name='user_name' 
            />
        </div>

        <div className="mb-3">
            <label htmlFor="user_password" className="form-label">Password</label>
            <input 
                type="password" 
                className="form-control" 
                placeholder='user password...'
                id="user_password"
                value={userForm.user_password}
                onChange={handleOnChange}
                name='user_password' 
            />
        </div>
        <div className='mb-3'>
            <input
                type="checkbox"
                className="form-check-input me-3"
                id="is_admin"
                value={userForm.is_admin}
                onChange={handleOnChange}
                name='is_admin'
            />
            <label htmlFor="is_admin" className="form-label">Admin</label>
        </div>
        <div className="d-flex justify-content-around align-content-center">
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to='/login'>I have an account</Link>
        </div>
    </form>
  )
}

export default Register