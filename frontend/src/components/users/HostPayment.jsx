
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const HostPayment = () => {
  // State variables for payment details
  const location = useLocation();
  const { totalEventPrice } = location.state || 0;

  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch username and total amount from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (totalEventPrice) {
      setTotalAmount(totalEventPrice);
    }
  }, [totalEventPrice]);

  // Function to handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!firstName) {
      alert('Please enter your first name.');
      return; // Halt execution if first name is missing
    }


    try {
      let eventData = JSON.parse(localStorage.getItem("eventData"))
      if (eventData) {
        eventData.status = "upcoming";

        // Save the updated eventData back to localStorage
        localStorage.setItem("eventData", JSON.stringify(eventData));

        const response = await axios.put("http://localhost:8080/api/event", eventData);

        if (response.status === 200) {
          setPaymentSuccess(true);
          alert('Event status successfully updated to "upcoming"!');
        } else {
          alert('Failed to update event status. Please try again.');
        }
      } else {
        console.error('Invalid event data format in localStorage.');
        alert('An error occurred. Please try again.'); // Inform user of invalid data
      }
    } catch (error) {
      console.error('Error parsing event data or making PUT request:', error);
      alert('An error occurred while updating event status. Please try again.'); // Inform user of error
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Participants Payment</h2>
      <form onSubmit={handlePayment}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            readOnly
          />
        </div>
        <div className="form-group">
          <h4>Total Amount: ₹{totalAmount.toFixed(2)}</h4>
        </div>
        <button type="submit" className="btn btn-primary">
          Pay
        </button>
      </form>
      {paymentSuccess && (
        <div className="payment-success">
          <h4>Payment successful! Your invitation card is being generated.</h4>
        </div>
      )}
    </div>
  );
};

export default HostPayment;