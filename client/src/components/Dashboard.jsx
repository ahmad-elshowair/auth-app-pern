import React from 'react'
import {Card} from 'react-bootstrap';
import RowUser from './Row.User';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
const Dashboard = ({user, setUser, users, setUsers, error, success, setError, setSuccess}) => {


    const refresh = async()=>{
        const response = await axios.post('http://localhost:5000/users/refresh-token', {
            token: user.refreshToken
        });

        setUser({
            ...user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
        });
        return response.data;
    }
    const jwtAxios = axios.create();
    jwtAxios.interceptors.request.use(
       async (config) => {

        let currentDate= new Date();
        const decodedToken = jwt_decode(user.accessToken);
        if(decodedToken.exp * 1000 < currentDate.getTime){
            const response = await refresh();
            console.log(response.data);
            config.headers.authorization = `Bearer ${response.data.accessToken}`;
        }
        
        return config;
        },
        error => {
            return Promise.reject(error);
        }
    )
    const handleDelete = async(id) => {
        setError(false);
        setSuccess(false);
        try{
            await axios.delete(`http://localhost:5000/users/delete-user/${id}`,{
                headers: {
                    'authorization': `Bearer ${user.accessToken}`
                }
            });
            setUsers(prev =>
                prev.filter(user => user.user_id !== id)
            )
            setSuccess(true);

        }catch(error){
            console.log(error);
            setError(true)
        }

    }

    const allUser = users.map(user =>
        <RowUser
            key={user.user_id} 
            user={user}
            handleDelete={handleDelete}
        />
        );
  return (
    <Card>
        <Card.Header className='text-center'>
            <Card.Text>
                Welcome 
                <b>
                    {user.admin ? " admin ": " user "}
                </b>
                Dashboard
            </Card.Text>
        </Card.Header>
        <Card.Body>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {allUser}
                </tbody>
            </table>
        </Card.Body>
        {
            error &&(
                <Card.Footer className="mb-0 alert alert-danger" role="alert">
                    you are not allowed to delete this user!
                </Card.Footer>
            )
        }
        {
            success && (
                <Card.Footer className="mb-0 alert alert-success" role="alert">
                    User deleted successfully!
                </Card.Footer>
            )
        }
    </Card>
  )
}

export default Dashboard