import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';

function Create() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/users', values)
            .then(res => {
                console.log(res);
                navigate("/user")
            })
            .catch(err => console.log(err))
    }

    return (
        <motion.div
            className='d-flex w-100 vh-100 justify-content-center align-items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='w-50 border bg-secondary text-white p-5'>
                <form onSubmit={handleSubmit}>
                    <h2>Add a user</h2>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name='name' className='form-control'
                               onChange={event =>
                                   setValues({...values, [event.target.name]: event.target.value})
                               }/>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name='email' className='form-control'
                               onChange={event =>
                                   setValues({...values, [event.target.name]: event.target.value})
                               }/>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input type="number" name='phone' className='form-control'
                               onChange={event =>
                                   setValues({...values, [event.target.name]: event.target.value})
                               }/>
                    </div>
                    <br/>
                    <button className='btn btn-info'>Submit</button>
                    <div className='d-flex justify-content-between'>
                        <Link to='/user' className='btn btn-success'>Back</Link>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default Create;