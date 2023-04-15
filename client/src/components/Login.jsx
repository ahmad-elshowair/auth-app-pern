import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
const Login = ({user, setUser}) => {

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async(event)=>{
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/login', 
                {user_email:email, user_password: password}
            );
            console.log(response.data);
            if(response){
                setSuccess(true)
                setUser(response.data);
            }

        } catch (error) {
            setError(true)
        }
    }
  return (
    <>
        <Form className="w-50 p-3 shadow rounded" onSubmit={handleLogin} >
            <h1 className='text-center mb-3'>Login</h1>
            <Form.Group controlId="formBasicEmail" className='mb-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    onChange={(event)=>setEmail(event.target.value)}
                    value={email}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    onChange={(event)=>setPassword(event.target.value)}
                    value={password}
                />
            </Form.Group>
            <Form.Group controlId="formBasicButton" className='d-grid'>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form.Group>
            {error && <Form.Text className="text-danger">Invalid email or password</Form.Text>}
            {success && <Form.Text className="text-success">Login successful</Form.Text>}
        </Form>
    </>
  )
}

export default Login