import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import { motion } from 'framer-motion';
import {useFormik} from "formik";
import axios from "axios";
import * as Yup from "yup";

function Create() {

    const navigate = useNavigate();

    const formCreate = useFormik({
        initialValues: {
            name : {
                firstname: '',
                lastname: '',
            },
            email: ''
        },
        validationSchema: Yup.object().shape({ // Sử dụng shape() để xác định schema cho đối tượng
            name: Yup.object().shape({ // Xác định schema cho đối tượng name
                firstname: Yup.string() // firstname là một chuỗi
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                lastname: Yup.string() // lastname là một chuỗi
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
            }),
            email: Yup.string().email().required()
        }),
        onSubmit: values => {
            axios.post('http://localhost:3000/users', values)
                .then(response => {
                    console.log(response)
                    navigate('/users');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })


    return (
        <motion.div
            className='d-flex w-100 vh-100 justify-content-center align-items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='w-50 border bg-light text-black p-5'>
                <form onSubmit={formCreate.handleSubmit}>
                    <h2>Add a user</h2>
                    <div>
                        <label htmlFor="firstname">First Name:</label>
                        <input type="text"
                               name='name.firstname'
                               className='form-control'
                               value={formCreate.values.name.firstname}
                               onChange={formCreate.handleChange}/>
                    </div>
                    {formCreate.touched.name && formCreate.errors.name && formCreate.errors.name.firstname && (
                        <div className="text-danger">{formCreate.errors.name.firstname}</div>
                    )}
                    <div>
                        <label htmlFor="lastname">Last Name:</label>
                        <input type="text"
                               name='name.lastname'
                               className='form-control'
                               value={formCreate.values.name.lastname}
                               onChange={formCreate.handleChange}/>
                    </div>
                    {formCreate.touched.name && formCreate.errors.name && formCreate.errors.name.lastname && (
                        <div className="text-danger">{formCreate.errors.name.lastname}</div>
                    )}
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name='email'
                            className='form-control'
                            value={formCreate.values.email}
                            onChange={formCreate.handleChange}
                        />
                    </div>
                    {formCreate.touched.email && formCreate.errors.email ? (
                        <div className="text-danger">{formCreate.errors.email}</div>
                    ) : null}
                    <br/>
                    <button type={"submit"} className='btn btn-info'>Submit</button>
                    <div className='d-flex justify-content-between'>
                        <Link to='/users' className='btn btn-success'>Back</Link>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default Create;