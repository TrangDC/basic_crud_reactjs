import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function Home() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(res => {
                console.log(res);
                setUsers(res.data);
            })
            .catch(err => console.error(err))
    }, [])

    const navigate = useNavigate();
    const handleDelete = (id) => {
        const confirm = window.confirm('You want to delete this user?');
        if (confirm) {
            axios.delete('http://localhost:3000/users/' + id)
                .then(res => {
                    alert("User Deleted");
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <h1>List of Users</h1>
            <div className='w-75 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'>
                    <Link to='/create' className='btn btn-success'>ADD</Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) =>(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.image}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/read/${user.id}`} className='btn btn-sm btn-info me-2'>View</Link>
                                    <Link to={`/update/${user.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                    <button className='btn btn-sm btn-danger' onClick={event => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;