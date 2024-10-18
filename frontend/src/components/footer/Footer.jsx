
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-links">
                <a href="#">Home</a>
                <a href="#">About Us</a>
                <a href="#">Help</a>
                <a href="#">FAQ</a>
                <a href="#">Terms and Conditions</a>
                <a href="#">Feedback</a>
            </div>
            <div className="footer-text">
                <p>This website is to provide our customers a seamless experience of Events.</p>
                <p>Have a great day!!</p>
            </div>
        </div>
    );
};

export default Footer;