import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";


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
        // axios.get('http://localhost:3000/users/' + id)
        //     .then(res => {
        //         console.log(res);
        //         setUser(res.data);
        //     })
        //     .catch(err => console.error(err))
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
        <div className='d-flex flex-column align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5 mb-4'>
                <h3>User Detail</h3>
                <div className=' text-white'>
                    <p>Id : {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <Link to={`/user/update/${id}`} className='btn btn-info me-2'>Edit</Link>
                    <Link to="/user" className='btn btn-primary'>Back</Link>
                </div>
            </div>
            <div className="w-75">
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
                                <Link to={`/user/update/${user.id}/edit-article/${article.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                <button className='btn btn-sm btn-danger' onClick={event => handleDeleteArticle(article.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Read;