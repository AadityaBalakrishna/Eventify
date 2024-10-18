
import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import axios from 'axios';
import './Userhome.css'; // Assuming you have this file for custom CSS
import { useNavigate } from 'react-router-dom';
import Navbar from '../header/Navbar';

const Userhome = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // For carousel navigation
  const [showPopup, setShowPopup] = useState(false); // Manage popup visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event for viewing

 
  const navigate = useNavigate();  
  // State variable to store retrieved username from localStorage
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Retrieve username from localStorage on component mount
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || null); // Set to null if not found

    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/event/professional/upcoming');
        console.log(response.data);
        const filteredEvents = response.data.filter(event => event.userInfo.username !== storedUsername);
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleViewDetails = (event) => {
    // Set the selected event and show the popup
    setSelectedEvent(event);
    setShowPopup(true);
  };

  const handleNext = () => {
    if (currentIndex + 4 < events.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedEvent(null); // Reset selected event
  };

const handleJoin = async () => {
  if (selectedEvent && username) {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/event/join/${selectedEvent.id}/${username}`
      );
      console.log(`Joined event: ${response.data.eventName}`);
      // alert(`Successfully joined the event: ${selectedEvent.eventName}`);
      navigate(`/api/event/ParticipantsPayment/${selectedEvent.id}`)
      // window.location.href = `/ParticipantsPayment/${selectedEvent.id}`;
    } catch (error) {
      console.error('Error joining event:', error);
      if (error.response && error.response.data.message === 'Already registered') {
        alert('You have already registered for this event!');
      } else {
        alert('An error occurred. Please try again later.');
      }
    } finally {
      closePopup(); // Close popup after join attempt
    }
  } else {
    alert('Please log in to join events.');
  }
};

  const handleCreateEvent = () => {
    // Redirect to the create event page
    window.location.href = '/api/event/createEvent';
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className="events-container">
        <header>
          <h1>Upcoming Events</h1>
          <button className="create-event-button" onClick={handleCreateEvent}>Create Your Event</button>
        </header>

        <div className="events-grid">

          {events.length === 0 ? (
            <p>No upcoming events available.</p>
          ) : (
            events.slice(currentIndex, currentIndex + 4).map((event) => (
              <div className="event-card">
              <img src={event.picture || 'default-image.jpg'} alt={event.eventName} /> {/* Image */}
              <div className="event-card-content">
                <h4>{event.eventName}</h4>
                <p><strong>Venue:</strong> {event.venue ? event.venue.venueName : 'N/A'}</p>
                <p><strong>Date:</strong> {event.eventDate || 'N/A'}</p>
              </div>
              <button
                className="view-button"
                onClick={() => handleViewDetails(event)}
              >
                View
              </button>
              <br /><br />
            </div>
            ))
          )}
        </div>

        <div className="carousel-controls">
          <button onClick={handlePrev} disabled={currentIndex === 0} className="carousel-button">
            Prev
          </button>
          <button onClick={handleNext} disabled={currentIndex + 3 >= events.length} className="carousel-button">
            Next
          </button>
        </div>

        {showPopup && selectedEvent && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>{selectedEvent.eventName}</h2>
              <p><strong>Host:</strong> {selectedEvent.userInfo.username || 'N/A'}</p>
              <p><strong>Date:</strong> {selectedEvent.eventDate || 'N/A'}</p>
              <p><strong>Venue:</strong> {selectedEvent.venue ? selectedEvent.venue.venueName : 'N/A'}</p>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <div className="popup-buttons">
                <button onClick={handleJoin} className="join-button">Join</button>
                <button onClick={closePopup} className="close-popup-button">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userhome;
