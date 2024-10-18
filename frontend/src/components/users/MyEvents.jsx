
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Table, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../header/Navbar';

const MyEvents = () => {
    const [hostedEvents, setHostedEvents] = useState([]);
    const [participatedEvents, setParticipatedEvents] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [showParticipantsModal, setShowParticipantsModal] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [activeTab, setActiveTab] = useState('hosted');

    const navigate= useNavigate();
    useEffect(() => {
        const fetchHostedEvents = async () => {
            try {
                const username = localStorage.getItem('username');
                const response = await axios.get(
                    `http://localhost:8080/api/event/MyEvents/${username}`
                );
                const sortedEvents = response.data.sort((a, b) =>
                    new Date(b.eventDate) - new Date(a.eventDate)
                );
                setHostedEvents(sortedEvents);
            } catch (error) {
                console.error('Error fetching hosted events:', error);
            }
        };
        fetchHostedEvents();
    }, []);

    useEffect(() => {
        const fetchParticipatedEvents = async () => {
            try {
                const username = localStorage.getItem('username');
                const response = await axios.get(
                    `http://localhost:8080/api/event/MyParticipatedEvents/${username}`
                );
                const sortedEvents = response.data.sort((a, b) =>
                    new Date(b.eventDate) - new Date(a.eventDate)
                );
                setParticipatedEvents(sortedEvents);
            } catch (error) {
                console.error('Error fetching participated events:', error);
            }
        };
        fetchParticipatedEvents();
    }, []);

    const handleShowCart = (event) => {
        setCartItems(event.carts);
        setSelectedEvent(event);
        setShowCartModal(true);
    };

    const fetchShowDescription = (description) => {
        setSelectedDescription(description);
        setShowDescriptionModal(true);
    };

    const handleCloseDescription = () => {
        setShowDescriptionModal(false);
    };

    const handleEdit = (event) => {
        localStorage.setItem("eventData",JSON.stringify(event))
        navigate(`/api/event/myPackage/${event.id}`);
        // const venuePrice = event.venue.price;
        // const eventId = event.id;
        // navigate(`/api/event/myPackage/${eventId}`, {state: { venuePrice}});
    }

    const handleShowParticipants = (event) => {
        setParticipants(event.participants || []);
        setShowParticipantsModal(true);
    };

    const handleCloseParticipants = () => {
        setShowParticipantsModal(false);
    };

    const toggleTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <Header />
           <Navbar />
            <div className="container">
                <br />
                <div className="toggle-container" style={{ marginBottom: '20px' }}>
                    <center>
                        <Button
                            className={`toggle-button ${activeTab === 'hosted' ? 'active' : ''}`}
                            style={{
                                backgroundColor: activeTab === 'hosted' ? '#007bff' : '#f8f9fa',
                                color: activeTab === 'hosted' ? '#fff' : '#000',
                                border: '1px solid #007bff',
                                marginRight: '10px',
                            }}
                            onClick={() => toggleTab('hosted')}
                        >
                            My Hosted Events
                        </Button>
                        <Button
                            className={`toggle-button ${activeTab === 'participated' ? 'active' : ''}`}
                            style={{
                                backgroundColor: activeTab === 'participated' ? '#007bff' : '#f8f9fa',
                                color: activeTab === 'participated' ? '#fff' : '#000',
                                border: '1px solid #007bff',
                            }}
                            onClick={() => toggleTab('participated')}
                        >
                            My Participated Events
                        </Button>
                    </center>
                </div>

                {activeTab === 'hosted' ? (
                    <>
                        <h2>My Hosted Events</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sl. No.</th>
                                    <th>Event Date</th>
                                    <th>Event Name</th>
                                    <th>Event Type</th>
                                    <th>Venue Name</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                    <th>Cart Items</th>
                                    <th>List of Participants</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hostedEvents.map((event, index) => (
                                    <tr key={event.id}>
                                        <td>{index + 1}</td>
                                        <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                                        <td>{event.eventName}</td>
                                        <td>{event.eventType}</td>
                                        <td>{event.venue.venueName}</td>
                                        <td>
                                            <span
                                                style={{
                                                    color:
                                                        event.status === 'upcoming'
                                                            ? 'green'
                                                            : event.status === 'live'
                                                            ? 'red'
                                                            : 'grey',
                                                }}
                                            >
                                                {event.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Button
                                                variant="link"
                                                onClick={() => fetchShowDescription(event.description)}
                                            >
                                                View Description
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant="link"
                                                onClick={() => handleShowCart(event)}
                                            >
                                                View Cart Items
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant="link"
                                                onClick={() => handleShowParticipants(event)}
                                            >
                                                View Participants
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <>
                        <h2>My Participated Events</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sl. No.</th>
                                    <th>Event Date</th>
                                    <th>Event Name</th>
                                    <th>Host Name</th>
                                    <th>Venue Name</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {participatedEvents.map((event, index) => (
                                    <tr key={event.id}>
                                        <td>{index + 1}</td>
                                        <td>{event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'N/A'}</td>
                                        <td>{event.eventName || 'N/A'}</td>
                                        <td>{event.userInfo?.name || 'Unknown Host'}</td>
                                        <td>{event.venue?.venueName || 'N/A'}</td>
                                        <td>
                                            <span
                                                style={{
                                                    color:
                                                        event.status === 'upcoming'
                                                            ? 'green'
                                                            : event.status === 'live'
                                                            ? 'red'
                                                            : 'grey',
                                                }}
                                            >
                                                {event.status || 'N/A'}
                                            </span>
                                        </td>
                                        <td>
                                            <Button
                                                variant="link"
                                                onClick={() => fetchShowDescription(event.description)}
                                            >
                                                View Description
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}

                {/* Cart Items Modal */}
                <Modal show={showCartModal} onHide={() => setShowCartModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cart Items and Venue Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sl. No.</th>
                                    <th>Item Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Price (₹)</th>
                                    <th>Total Price (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.item.item}</td>
                                        <td>{item.item.category}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.item.price}</td>
                                        <td>{item.cartPrice}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'right' }}>Venue Price</td>
                                    <td>{selectedEvent && selectedEvent.venue ? selectedEvent.venue.price : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'right' }}><strong>Total Payment</strong></td>
                                    <td>
                                        <strong>
                                            {cartItems.reduce((acc, item) => acc + item.cartPrice, 0) + (selectedEvent?.venue?.price || 0)}
                                        </strong>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        {selectedEvent?.status === 'pending' && (
                            <Button variant="primary" onClick={() => handleEdit(selectedEvent)}>
                                Edit
                            </Button>
                        )}
                        <Button variant="secondary" onClick={() => setShowCartModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Description Modal */}
                <Modal show={showDescriptionModal} onHide={handleCloseDescription}>
                    <Modal.Header closeButton>
                        <Modal.Title>Description</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{selectedDescription}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDescription}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Participants Modal */}
                <Modal show={showParticipantsModal} onHide={handleCloseParticipants}>
                    <Modal.Header closeButton>
                        <Modal.Title>List of Participants</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            {participants.map((participant, index) => (
                                <li key={index}>{participant.name}</li>
                            ))}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseParticipants}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Footer />
        </div>
    );
};

export default MyEvents;
