import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";

function Update() {
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
    }); // Khởi tạo user với một đối tượng trống

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/users/' + id)
            .then(res => {
                console.log(res);
                setUser(res.data);
            })
            .catch(err => console.error(err))
    }, [])

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3000/users/' + id, user)
            .then(res => {
                console.log(res);
                navigate("/")
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <form onSubmit={handleUpdate}>
                    <h2>Update a user</h2>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name='name' className='form-control'
                               value={user.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name='email' className='form-control'
                               value={user.email}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input type="number" name='phone' className='form-control'
                               value={user.phone}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name='username' className='form-control'
                               value={user.username}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="website">Website:</label>
                        <input type="text" name='website' className='form-control'
                               value={user.website}
                               onChange={handleChange}
                        />
                    </div>
                    <br/>
                    <button className='btn btn-info' type="submit">Submit</button>
                    <div className='d-flex justify-content-between'>
                        <Link to='/' className='btn btn-success'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update;
