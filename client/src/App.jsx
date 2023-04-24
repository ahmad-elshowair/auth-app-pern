import './App.css';
import React, {useState, useEffect} from 'react';
import Login from './pages/Login.jsx'
import Dashboard from './components/Dashboard';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import ProtectedRoute from './pages/ProtectedRoute';
import Error from './pages/Error';

function App() {
  const [user, setUser] = useState(null);
 const [users, setUsers] = useState([]);
 const [error, setError] = useState(false);
const [success, setSuccess] = useState(false)


 const getUsers= async ()=>{
    const response = await axios.get('http://localhost:5000/users');
    setUsers(prev => prev = response.data);
 };
 useEffect(() => {
   getUsers();
 }, [])
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout/>}>
          <Route index element={<Home/>}/>
        
          <Route 
            path='/register' 
            element={
              <Register/>
            }
          />
         
          <Route 
            path='/login' 
            element={
              <Login 
                setUser={setUser}  
                user={user}/>
            }
          />
         
          <Route path='/dashboard' element={
            <ProtectedRoute user={user}>
                <Dashboard
                  error={error}
                  success={success}
                  setSuccess={setSuccess}
                  setError={setError}
                  user={user}
                  users={users}
                  setUsers={setUsers}
                />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Error/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
