import React, {useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';


function Create_Article() {

    const [article, setArticle] = useState({
        title: ''
    })

    const {id} = useParams();

    const navigate = useNavigate();

    const handleInput = (event) => {
        setArticle({...article, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/articles', {...article, user_id: id})
            .then(response => {
                console.log(response)
                navigate('/user/' + id)
            })
            .catch(error => {
                console.log(error);
            })
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
                    <h2>Add an article</h2>
                    <div>
                        <input type={"hidden"} name='user_id' value={id}/>
                        <label htmlFor="title">Title:</label>
                        <input type="text" name='title' className='form-control'
                               onChange={handleInput}/>
                    </div>
                    <br/>
                    <button className='btn btn-info'>Submit</button>
                    <div className='d-flex justify-content-between'>
                        <Link to={`/user/${id}`} className='btn btn-success'>Back</Link>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default Create_Article;