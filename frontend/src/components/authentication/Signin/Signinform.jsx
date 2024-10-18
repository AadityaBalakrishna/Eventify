import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import Styles from './Signinform.module.css';
import { useNavigate } from 'react-router-dom';

const Signinform = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(''); // Added state for alert message
  const [messageType, setMessageType] = useState(''); // Added state for message type (success/error)
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    for (const key in formData) {
      if (formData[key] === '') {
        errors[key] = 'This field is required';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const displayError = (fieldName) => {
    return formErrors[fieldName] && (
      <span className={Styles.error} style={{ color: 'red', fontSize: '12px' }}>
        {formErrors[fieldName]}
      </span>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const apiUrl = `http://localhost:8080/auth/generateToken`;
      try {
        const response = await axios.post(apiUrl, formData);

        if (response.status === 200) {
          const { token, authorities } = response.data;
          const role = authorities[0].authority;

          // Store data in localStorage (similar to Signupform)
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          localStorage.setItem('username', formData.username);

          // Navigate based on role
          if (role === 'user') {
            navigate('/auth/user/userHome');
          } else if (role === 'admin') {
            navigate('/auth/admin/adminHome');
          }
        } else {
          setAlertMessage('Invalid username or password');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Error signing in:', error);
        setAlertMessage('Invalid username or password. Try again');
        setMessageType('error');
      }
    } else {
      console.log('Form validation failed');
    }
  };

  const handleSignupClick = () => {
    navigate('/auth/signup');
  };

  return (
    <div>
      <div className={Styles.signinFormContainer}>
        <Header />
        <main>
          <div className={Styles.card}>
            <h1>Sign-in</h1>
            {alertMessage && ( // Conditionally render alert message
              <p style={{ color: messageType === 'success' ? 'green' : 'red', textAlign: 'center' }}>
                {alertMessage}
              </p>
            )}
            <form onSubmit={handleSubmit} className={Styles.signinForm}>
              <div className={Styles.formRow}>
                <div className={Styles.formGroup}>
                  <label className={Styles.label}>Email:</label>
                  <input
                    className={Styles.input}
                    type="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {displayError('username')}

                  <label className={Styles.label}>Password:</label>
                  <input
                    className={Styles.input}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {displayError('password')}
                </div>
              </div>

              <center><button className={Styles.button} type="submit"> Sign In</button></center>
              <p>Not registered? <span onClick={handleSignupClick} style={{ cursor: 'pointer', color: 'blue' }}>Sign up</span></p>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Signinform;
