import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';

function Update_Article() {

    const [article, setArticle] = useState({});

    const {id, article_id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:3000/articles/' + article_id)
            .then((response) => {
                setArticle(response.data)
            })
            .catch(error => {console.log(error)})
    }, []);

    const handleChange = (event) => {
        setArticle({...article, [event.target.name]: event.target.value})
    }

    const navigate = useNavigate();

    const handleUpdate = (event) => {
        event.preventDefault();
        try {
            axios.put('http://localhost:3000/articles/' + article_id, article)
                .then(response => {
                    navigate('/user/' + id + '/view-article/' + article_id)
                })
        } catch (e) {
            console.log(e)
        }
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
                <form onSubmit={handleUpdate}>
                    <h2>Update article</h2>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input type={"text"} name='title' className='form-control'
                               value={article.title}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="content">Content:</label>
                        <textarea name='content' className='form-control'
                                  value={article.content}
                                  onChange={handleChange}
                        />
                    </div>
                    <button className='btn btn-info'>Submit</button>
                    <div className='d-flex justify-content-between'>
                        <Link to={`/user/${id}`} className='btn btn-primary'>Back</Link>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default Update_Article;