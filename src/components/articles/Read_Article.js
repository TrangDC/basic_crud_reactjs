import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function Read_Article() {
    const [article, setArticle] = useState({});

    const {id, article_id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:3000/articles/' + article_id)
            .then((response) => {
                setArticle(response.data)
            })
            .catch(error => {console.log(error)})
    }, []);

    return (
        <div className='d-flex flex-column align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5 mb-4'>
                <h3>Article Detail</h3>
                <div className=' text-white'>
                    <p>{article.title}</p>
                    <pre>{article.content}</pre>
                    <Link to={`/user/${id}/edit-article/${article_id}`} className='btn btn-info me-2'>Edit</Link>
                    <Link to={`/user/${id}`} className='btn btn-primary'>Back</Link>
                </div>
            </div>
        </div>
    );
}


export default Read_Article;