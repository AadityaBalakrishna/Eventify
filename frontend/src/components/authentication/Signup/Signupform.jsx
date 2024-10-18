
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import Styles from './Signupform.module.css';
import { useNavigate } from 'react-router-dom';

const Signupform = () => {
  const [role, setRole] = useState('user');
  const [alertMessage, setAlertMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const initialFormData = {
    username: '',
    password: '',
    confirmPassword: '',
    name: '',          // Added name field
    dob: '',           // Added date of birth field
    picture: '',       // Added picture field
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // Handle picture file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        picture: reader.result, // Store the base64 encoded string of the image
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.username) {
      errors.username = 'This field is required';
    } else {
      const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!usernameRegex.test(formData.username)) {
        errors.username = 'Invalid email address';
      }
    }

    if (!formData.password) {
      errors.password = 'This field is required';
    } else if (
      formData.password.length < 6 ||
      !/[a-z]/.test(formData.password) ||
      !/[A-Z]/.test(formData.password) ||
      !/\d/.test(formData.password)
    ) {
      errors.password = 'Password must be at least 6 characters long and contain 1 uppercase, 1 lowercase letter, and 1 number';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'This field is required';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.name) {
      errors.name = 'Name is required';
    }

    if (!formData.dob) {
      errors.dob = 'Date of birth is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const apiUrl = `http://localhost:8080/auth/signup`;
      const payload = {
        username: formData.username,
        password: formData.password,
        name: formData.name,       // Include name
        dob: formData.dob,         // Include date of birth
        picture: formData.picture, // Include picture (base64)
        role,
      };
      console.log("initialFormData", payload);

      try {
        const response = await axios.post(apiUrl, payload, {
          validateStatus: (status) => status < 500,
        });

        if (response.status === 201) {
          setAlertMessage(`${role.charAt(0).toUpperCase() + role.slice(1)} has been successfully registered`);
          setMessageType('success');
          setFormData({ ...initialFormData });
          setTimeout(() => {
            navigate('/auth/signin');
          }, 1500);
        } else if (response.status === 409) {
          setAlertMessage('User already exists.');
          setMessageType('error');
        } else {
          setAlertMessage(`Failed to register ${role}.`);
          setMessageType('error');
        }
      } catch (error) {
        setAlertMessage(`Failed to register ${role}. Please try again.`);
        setMessageType('error');
      }
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div>
      <div className={Styles.signupFormContainer}>
        <Header />
        <main>
          <div className={Styles.card}>
            <h1><center>{role.charAt(0).toUpperCase() + role.slice(1)} Signup</center></h1>

            {alertMessage && (
              <p style={{ color: messageType === 'success' ? 'green' : 'red', textAlign: 'center' }}>
                {alertMessage}
              </p>
            )}

            <form className={Styles.signupForm} onSubmit={handleSubmit}>
              <div className={Styles.formRow}>
                <div className={Styles.formGroup}>
                  <label className={Styles.label}>Email:</label>
                  <input
                    className={Styles.input}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {formErrors.username && <span className={Styles.error}>{formErrors.username}</span>}
                </div>
              </div>

              <div className={Styles.formRow}>
                <div className={Styles.formGroup}>
                  <label className={Styles.label}>Name:</label>
                  <input
                    className={Styles.input}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {formErrors.name && <span className={Styles.error}>{formErrors.name}</span>}
                </div>
              </div>

              <div className={Styles.formRow}>
                <div className={Styles.formGroup}>
                  <label className={Styles.label}>Date of Birth:</label>
                  <input
                    className={Styles.input}
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  {formErrors.dob && <span className={Styles.error}>{formErrors.dob}</span>}
                </div>
              </div>

              <div className={Styles.formRow}>
                <div className={Styles.formGroup}>
                  <label className={Styles.label}>Profile Picture:</label>
                  <input
                    className={Styles.input}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className={Styles.formRow}>
                <div className={Styles.formGroup}>
                  <label className={Styles.label}>Password:</label>
                  <input
                    className={Styles.input}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {formErrors.password && <span className={Styles.error}>{formErrors.password}</span>}
                </div>
              </div>

              <div className={Styles.formRow}>
                <div className={Styles.formGroup}>
                  <label className={Styles.label}>Confirm Password:</label>
                  <input
                    className={Styles.input}
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {formErrors.confirmPassword && <span className={Styles.error}>{formErrors.confirmPassword}</span>}
                </div>
              </div>

              <input type="submit" className={Styles.button} value="Sign up" />
              <p>Already a user? <span onClick={() => navigate('/auth/signin')} style={{ cursor: 'pointer', color: 'blue' }}>Sign in</span></p>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Signupform;

