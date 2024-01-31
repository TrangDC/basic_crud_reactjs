import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

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
    }, []);

    return (
        <div>
            Edit
        </div>
    );
}

export default Edit;