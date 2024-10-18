
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const ParticipantsPayment = () => {
  // State variables for first name and username
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');

  // Function to handle fetching username from localStorage (if available)
  const fetchUsernameFromLocalStorage = () => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  };

  // useEffect hook to fetch username on component mount
  useEffect(() => {
    fetchUsernameFromLocalStorage();
  }, []);

  // Function to handle payment
  const handlePayment = () => {
    if (username) { // Replace 'fat@gmail.com' with actual stored username
      // Payment successful, generate PDF
      const doc = new jsPDF();

      // Add content to PDF
      doc.text(`Invitation Card`, 20, 20);
      doc.text(`Dear ${firstName},`, 20, 40);
      doc.text(`Thank you for your payment!`, 20, 60);

      // Save the PDF
      doc.save(`${firstName}_Invitation_Card.pdf`);

      alert('Payment successful! Invitation card generated.');
    } else {
      alert('Invalid username. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Participants Payment</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Username:
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </label>
      </div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default ParticipantsPayment;