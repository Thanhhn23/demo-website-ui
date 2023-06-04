import React, { useState } from 'react';

export default function Login({ setIsAuthenticated }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userType, setUserType] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/v1/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                try {
                    if (data.message === "Log in successfully") {
                        setMessage(data.message);
                        setUserType(data.user_type);
                        const token = data.token;
                        //console.log(token)
                        document.cookie = `token= ${token}; expires = ${new Date(Date.now() + (365 * 24 * 60 * 60 * 1000))}; path=/`;
                        setIsAuthenticated(true);

                    }
                    else {
                        setIsAuthenticated(false);
                        setMessage(data.message);
                    }
                }
                catch (e) {
                    console.log(e)
                }
            })

    }

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input type='text'
                        id='username'
                        value={username}
                        onChange={handleUsername}
                    ></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='text'
                        id='username'
                        value={password}
                        onChange={handlePassword}
                    ></input>
                </div>
                <button type='submit'>Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}