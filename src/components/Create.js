import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useFormik} from "formik";
import * as Yup from "yup";

function Create() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email().required(),
            phone: Yup.number()
                .typeError('Must be a number')
                .test('len', 'Must be exactly 9 digits', val => val.toString().length === 9)
                .required('Required'),
        }),
        onSubmit: values => {
            axios.post('http://localhost:3000/users', values)
                .then(res => {
                    console.log(res);
                    navigate("/")
                })
                .catch(err => console.log(err))
        }
    })


    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Add a user</h2>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text"
                               name='name'
                               className='form-control'
                               value={formik.values.name}
                               onChange={formik.handleChange}
                               />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-danger">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email"
                               name='email'
                               className='form-control'
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input type="number"
                               name='phone'
                               className='form-control'
                               value={formik.values.phone}
                               onChange={formik.handleChange}
                               />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-danger">{formik.errors.phone}</div>
                        ) : null}
                    </div>
                    <br/>
                    <button type={"submit"} className='btn btn-info'>Submit</button>
                    <div className='d-flex justify-content-between'>
                        <Link to='/' className='btn btn-success'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;