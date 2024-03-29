import React, { useState } from 'react';
import '../App.css';


export default function Login({ setIsAuthenticated }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userType, setUserType] = useState('');

    const customerId = localStorage.getItem('_cdp_cusid');

    const visitorId = localStorage.getItem('_asm_uid');

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('https://demo-website-api.vercel.app/api/v1/users', {
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
        <div className='form-body'>
        <div className='form-container'>
            <h2 className='login'>Log in</h2>
            <form onSubmit={handleLogin} className='form-login'>
                <div className='form-field'>
                    <label htmlFor='username' className='form-label'>Username</label>
                    <input type='text'
                        id='username'
                        value={username}
                        onChange={handleUsername}
                        className='form-input'
                    ></input>
                </div>
                <div className='form-field'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input type='text'
                        id='username'
                        value={password}
                        onChange={handlePassword}
                        className='form-input'
                    ></input>
                </div>
                <button type='submit' className='button-submit'>Login</button>
            </form>
            {message && <p className='form-message'>{message}</p>}
        </div>
        <div>
      <ants-app-inbox
       domain="https://sandbox-api.ants.tech/access"
       socketDomain="https://sandbox-ws.ants.tech"
       portalId="33167"
       destinationId="1350042"
       lookupId={visitorId}
       lookupType="visitor"
       propId="556300706"
       token=""
      />    
      </div>
        </div>
    )
}