import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import Navbar from '../header/Navbar';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateEvent.css';
import axios from 'axios';

const CreateEvent = () => {
  const [eventType, setEventType] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(''); // For Base64 picture
  const [availableVenues, setAvailableVenues] = useState([]);
  const [allVenues, setAllVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/venue');
        setAllVenues(response.data);
        setAvailableVenues(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!eventType) {
      errors.eventType = 'Event type is required';
    }
    if (!eventName) {
      errors.eventName = 'Event name is required';
    }
    if (!description) {
      errors.description = 'Event description is required';
    }
    if (!picture) {
      errors.picture = 'Event picture is required';
    }
    if (!selectedVenueId) {
      errors.selectedVenue = 'Event venue is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkVenueAvailability = async (selectedDate) => {
    if (!selectedDate) {
      return;
    }

    try {
      const formattedDate = selectedDate.toISOString().slice(0, 10);
      const response = await axios.get(`http://localhost:8080/api/venue/notavailable/${formattedDate}`);
      const unavailableVenueIds = response.data.map((venue) => venue.id);

      const filteredVenues = allVenues.filter((venue) => !unavailableVenueIds.includes(venue.id));
      setAvailableVenues(filteredVenues);
    } catch (error) {
      console.error('Error checking venue availability:', error);
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPicture(reader.result); // Convert to Base64 and store in state
    };

    if (file) {
      reader.readAsDataURL(file); // Convert to Base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formattedEventDate = eventDate.toISOString().slice(0, 10);

      // Get the selected venue's price
      const selectedVenue = availableVenues.find(venue => venue.id === selectedVenueId);
      if (selectedVenue) {
        localStorage.setItem('venuePrice', selectedVenue.price); // Save the venue price to local storage
      }
      const eventData = {
        eventName,
        eventType,
        eventDate: formattedEventDate,
        description,
        picture,
        status: 'pending',
        userInfo: {
          username: localStorage.getItem('username'),
        },
        venue: {
          id: selectedVenueId,
        },
        participants: [],
        carts: [],
      };
      console.log("Event data", eventData);
      try {
        const response = await axios.post('http://localhost:8080/api/event', eventData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          console.log('Event created successfully:', response.data);
          const eventId = response.data.id;
          localStorage.setItem("eventData", JSON.stringify(response.data))
          navigate(`/api/event/mypackage/${eventId}`);
        } else {
          console.error('Error creating event:', response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error('403 Forbidden error:', error.response.data);
        } else {
          console.error('Error creating event:', error);
        }
      }
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div>
      <Header />

     <Navbar />

      <div className="add-event-form">
        <center><h2>Create New Event</h2></center>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="eventType">Event Type:</label>
            <select id="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)}>
              <option value="">Select Event Type</option>
              <option value="Personal">Personal</option>
              <option value="Professional">Professional</option>
            </select>
            {formErrors.eventType && <span className="error">{formErrors.eventType}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="eventName">Event Name:</label>
            <input type="text" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} />
            {formErrors.eventName && <span className="error">{formErrors.eventName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="eventDate">Event Date:</label>
            <DatePicker id="eventDate" selected={eventDate} onChange={(date) => {
              setEventDate(date);
              checkVenueAvailability(date);
            }} minDate={new Date()} />
          </div>
          <div className="form-group">
            <label htmlFor="venue">Event Venue:</label>
            <select id="venue" value={selectedVenueId} onChange={(e) => {
              const selectedVenueId = e.target.value;
              setSelectedVenueId(selectedVenueId);

              const selectedVenue = availableVenues.find(venue => venue.id === selectedVenueId);
              if (selectedVenue) {
                localStorage.setItem('venuePrice', selectedVenue.price); // Store venue price in local storage
              }
            }}>
              <option value="">Select Event Venue</option>
              {availableVenues.map((venue) => (
                <option key={venue.id} value={venue.id}>{venue.venueName} - ₹{venue.price}</option>
              ))}
            </select>
            {formErrors.selectedVenue && <span className="error">{formErrors.selectedVenue}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Event Description:</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            {formErrors.description && <span className="error">{formErrors.description}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="picture">Event Picture:</label>
            <input type="file" id="picture" onChange={handlePictureChange} />
            {formErrors.picture && <span className="error">{formErrors.picture}</span>}
          </div>
          <div className='text-end'><button type="submit">Proceed</button></div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CreateEvent;
