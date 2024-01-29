import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import { motion } from 'framer-motion';



function Read() {
    const [user, setUser] = useState([]);
    const [articles, setArticles] = useState([])

    const {id} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchUser = await axios.get('http://localhost:3000/users/' + id);
                setUser(fetchUser.data);
                const fetchArticles = await axios.get(`http://localhost:3000/articles?user_id=${id}`);
                setArticles(fetchArticles.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [id])

    const handleDeleteArticle = (articleId) => {
        const confirm = window.confirm('You want to delete this articles?');
        if (confirm) {
            axios.delete('http://localhost:3000/articles/' + articleId)
                .then(res => {
                    alert("Article Deleted");
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <motion.div
            className='d-flex flex-column align-items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='w-50 border bg-light text-dark p-5 mb-4'>
                <h3>User Detail</h3>
                <div>
                    <p>Id : {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <Link to={`/user/update/${id}`} className='btn btn-info me-2'>Edit</Link>
                    <Link to="/user" className='btn btn-primary'>Back</Link>
                </div>
            </div>
            <motion.div
                className='w-75 rounded bg-white border shadow p-4'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
            >
                <div className='d-flex justify-content-end'>
                    <Link to={`/user/${id}/add-article`} className='btn btn-success'>ADD Article</Link>
                </div>
                <h4>Articles</h4>
                <table className='table table-striped'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.map((article, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{article.title}</td>
                            <td>
                                <Link to={`/user/${user.id}/view-article/${article.id}`} className='btn btn-sm btn-info me-2'>View</Link>
                                <Link to={`/user/${user.id}/edit-article/${article.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                <button className='btn btn-sm btn-danger' onClick={event => handleDeleteArticle(article.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </motion.div>
        </motion.div>
    );
}

export default Read;