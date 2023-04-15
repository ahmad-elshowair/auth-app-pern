import './App.css';
import React, {useState, useEffect} from 'react';
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard';
import axios from 'axios';

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
    <div className="d-flex vh-100 justify-content-center align-items-center">
      {
        user ? (
          <Dashboard
            error={error}
            success={success}
            setSuccess={setSuccess}
            setError={setError}
            user={user} 
            users={users}
            setUsers={setUsers}
          />
        ):(
          <Login setUser={setUser}  user={user}/>
        )
      }
    </div>
  );
}

export default App;
