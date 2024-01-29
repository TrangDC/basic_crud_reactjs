import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function Update() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const {id} = useParams();

    // const [values, setValues] = useState({
    //     name: '',
    //     email: '',
    //     phone: ''
    // });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/users/' + id)
            .then(res => {
                console.log(res);
                setUser(res.data);
            })
            .catch(err => console.error(err))
    }, [])

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3000/users/' + id, user)
            .then(res => {
                console.log(res);
                navigate("/user")
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
                               onChange={event =>
                                   setUser({...user, [event.target.name]: event.target.value})
                               }
                               />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name='email' className='form-control'
                               value={user.email}
                               onChange={event =>
                                   setUser({...user, [event.target.name]: event.target.value})
                               }
                               />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input type="number" name='phone' className='form-control'
                               value={user.phone}
                               onChange={event =>
                                   setUser({...user, [event.target.name]: event.target.value})
                               }
                               />
                    </div>
                    <br/>
                    <button className='btn btn-info'>Submit</button>
                    <div className='d-flex justify-content-between'>
                        <Link to='/user' className='btn btn-success'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update;