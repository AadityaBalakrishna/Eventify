
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './Header.css';



const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();



    useEffect(() => {

        const token = localStorage.getItem('token');

        if (token) {

            try {

                const payload = JSON.parse(atob(token.split('.')[1]));

                const expirationTime = payload.exp * 1000;

                const isExpired = Date.now() > expirationTime;



                if (isExpired) {

                    alert('Your session has expired. Please sign in again.');

                    setTimeout(() => {

                        localStorage.removeItem('token');

                        localStorage.removeItem('role');

                        localStorage.removeItem('username');

                        localStorage.removeItem('eventData');

                        setIsLoggedIn(false);

                        navigate('/auth/signin');

                    });

                } else {

                    setIsLoggedIn(true);

                }

            } catch (error) {

                console.error('Error parsing token', error);

                setIsLoggedIn(false);

            }

        } else {

            setIsLoggedIn(false);

        }

    }, [navigate]);



    const handleOnClick = (route) => {

        navigate(route);

    };



    const handleLogout = () => {

        localStorage.removeItem('token');

        localStorage.removeItem('role');

        localStorage.removeItem('username');

        localStorage.removeItem('eventData');

        setIsLoggedIn(false);

        navigate('/auth/signin');

    };



    return (

        <div className="header" style={{ textAlign: 'center' }}>

            <div className="logo-container">

                <img src="/images/logo.png" alt="Logo" className="logo" />

            </div>





            <div className="auth-buttons">

                {isLoggedIn ? (

                    <button className="logout" onClick={handleLogout}>Logout</button>

                ) : (

                    <>

                        <button className="signup" onClick={() => handleOnClick('/auth/signup')}>Sign Up</button>

                        <button className="login" onClick={() => handleOnClick('/auth/signin')}>Login</button>

                    </>

                )}

            </div>

        </div>

    );

};



export default Header;

if the token expires alert message should come without manually refreshing the page
