import React from 'react'

const RowUser = ({user, handleDelete}) => {
  return (
    <>
        <tr>
            <td>{user.user_name}</td>
            <td>{user.user_email}</td>
            <td>{user.is_admin ? "admin": "user"}</td>
            <td>
                <button 
                  className="btn btn-danger"
                  onClick={()=>handleDelete(user.user_id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    </>
  )
}

export default RowUser;