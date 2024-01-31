import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Detail() {
    const [user, setUser] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                setUser(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [id]);

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <motion.div
                className='user-details-container w-50 border bg-light text-dark p-5 mb-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3>User Detail</h3>
                <Card>
                    <Card.Body>
                        <Card.Text>Name: {user.name && `${user.name.firstname} ${user.name.lastname}`}</Card.Text>
                        <Card.Text>Username: {user.username}</Card.Text>
                        <Card.Text>Email: {user.email}</Card.Text>
                        <Card.Text>Phone: {user.phone}</Card.Text>
                        <Link to={`/users/edit/${id}`} className='btn btn-info me-2'>Edit</Link>
                        <Link to="/users" className='btn btn-primary'>Back</Link>
                    </Card.Body>
                </Card>
            </motion.div>
        </Container>
    );
}

export default Detail;
