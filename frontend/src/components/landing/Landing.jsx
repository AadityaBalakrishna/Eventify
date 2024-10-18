import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Styles from './Landing.module.css';
 
const Landing = () => {
  return (
    <div className={Styles.LandingContainer}>
      <Header />
 
      {/* Section 1*/}
      <section className={`${Styles.section} ${Styles.welcomeSection}`}>
        <h1>Welcome to Our Platform</h1>
        <p>Join us for unforgettable experiences, where every event sparks connection. Discover upcoming events and be a part of the moments that matter.</p>
      </section>
 
      {/* Section 2 -*/}
      <section className={`${Styles.section} ${Styles.secondSection}`}>
        <h2>Our Events</h2>
        <p>
          We provide a wide range of events to help you manage your invitations to the participants.
        </p>
        <div className={Styles.featureCards}>
          <div className={Styles.card}>
            <h3>Birthdays</h3>
          </div>
          <div className={Styles.card}>
            <h3>Marriages</h3>
          </div>
          <div className={Styles.card}>
            <h3>Parties</h3>
          </div>
        </div>
      </section>
 
      {/* Section 3 - Final Section */}
      <section className={`${Styles.section} ${Styles.thirdSection}`}>
        <h2>Join Us</h2>
        <p>Sign up today and become part of our journey.</p>
      </section>
 
      <Footer />
    </div>
  );
};
 
export default Landing;
 