import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';

function Edit() {

    const [user, setUser] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                setUser(response.data);
                console.log(response)
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [id]);

    return (
        <motion.div
            className='d-flex w-100 vh-100 justify-content-center align-items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='w-50 border bg-secondary text-white p-5'>
                <form>
                    <h2>Update a user</h2>
                    <div>
                        <label htmlFor="name.firstname">First Name:</label>
                        <input type="text" name='name.firstname' className='form-control'
                               value={user.name && `${user.name.firstname}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="name.lastname">Last Name:</label>
                        <input type="text" name='name.lastname' className='form-control'
                               value={user.name && `${user.name.lastname}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name='username' className='form-control'
                               value={user.username}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name='email' className='form-control'
                               value={user.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input type="number" name='phone' className='form-control'
                               value={user.phone}
                        />
                    </div>
                    <br/>
                    <button className='btn btn-info'>Submit</button>
                    <div className='d-flex justify-content-between'>
                        <Link to='/users' className='btn btn-success'>Back</Link>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default Edit;