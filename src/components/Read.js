import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

function Read() {
    const [user, setUser] = useState([]);

    const {id} = useParams();
    useEffect(() => {
        axios.get('http://localhost:3000/users/' + id)
            .then(res => {
                console.log(res);
                setUser(res.data);
            })
            .catch(err => console.error(err))
    }, [])


    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <h3>User Detail</h3>
                <div className=' text-white'>
                    <p>Id : {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Website: {user.website}</p>
                    <Link to={`/update/${id}`} className='btn btn-info'>Edit</Link>
                    <Link to="/" className='btn btn-primary'>Back</Link>
                </div>
            </div>
        </div>
    );
}

export default Read;