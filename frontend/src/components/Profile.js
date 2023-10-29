import React, { useState, useEffect } from 'react';
import axios from '../AxiosConfig.js';

function Profile() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

    if (!token) {
        console.error("No token found");
        return;
    }

    axios.get('/get_current_user', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            setUsername(response.data.username);
        })
        .catch(error => {
            console.error("Error fetching user details:", error);
        });
    }, []);

    return (
        <div>
            <h2>Hello! {username}</h2>
        </div>
    );
}

export default Profile;
