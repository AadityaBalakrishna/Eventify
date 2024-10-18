
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';
import Header from '../header/Header';
import Navbar2 from '../header/Navbar2';

const MyOrders = () => {
  const [events, setEvents] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  // Fetching upcoming events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/event');
        setEvents(response.data);
        console.log("response.data", response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Fetching cart items for the selected event
  const fetchCartItems = async (eventId) => {
    console.log("Fetching cart items for event ID:", eventId); // Log event ID

    try {
      const response = await axios.get(`http://localhost:8080/api/cart/event/${eventId}`);
      console.log("Cart items fetched:", response.data); // Log fetched data
      setCartItems(response.data);
      setShowCartModal(true);
    } catch (error) {
      console.error('Error fetching cart items:', error); // Log error details
    }
  };

  // Show event description in modal
  const fetchShowDescription = (description) => {
    setSelectedDescription(description);
    setShowDescriptionModal(true);
  };

  // Show participants list in modal
  const fetchShowParticipants = (participants) => {
    if (participants.length === 0) {
      setSelectedParticipants([]); // Set empty array for no participants
    } else {
      setSelectedParticipants(participants.map((participant) => participant.username));
    }
    setShowParticipantsModal(true);
  };

  // Close modal handlers
  const handleCloseCart = () => {
    setShowCartModal(false);
  };

  const handleCloseDescription = () => {
    setShowDescriptionModal(false);
  };

  const handleCloseParticipants = () => {
    setShowParticipantsModal(false);
  };

  return (
    <div>
      <Header />
      <Navbar2 />
    <div className="container mt-4">
      <h2>My Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>EVENT ID</th>
            <th>EVENT NAME</th>
            <th>EVENT DATE</th>
            <th>USERNAME</th>
            <th>EVENT TYPE</th>
            <th>STATUS</th>
            <th>DESCRIPTION</th>
            <th>CART ITEMS</th>
            <th>LIST OF PARTICIPANTS</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.eventName}</td>
              <td>{event.eventDate}</td>
              <td>{event.userInfo ? event.userInfo.username : 'N/A'}</td>
              <td>{event.eventType}</td>
              <td>{event.status}</td>
              <td>
                <Button variant="link" onClick={() => fetchShowDescription(event.description)}>
                  View Description
                </Button>
              </td>
              <td>
                <Button variant="link" onClick={() => fetchCartItems(event.id)}>
                  View Cart
                </Button>
              </td>
              <td>
                <Button variant="link" onClick={() => fetchShowParticipants(event.participants)}>
                  View Participants
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for displaying cart items */}
      <Modal show={showCartModal} onHide={handleCloseCart}>
        <Modal.Header closeButton>
          <Modal.Title>Cart Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Cart Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem) => (
                <tr key={cartItem.id}>
                  <td>{cartItem.item.item}</td>
                  <td>{cartItem.item.category}</td>
                  <td>{cartItem.quantity}</td>
                  <td>{cartItem.cartPrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCart}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for displaying event description */}
      <Modal show={showDescriptionModal} onHide={handleCloseDescription}>
        <Modal.Header closeButton>
          <Modal.Title>Event Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedDescription}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDescription}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for displaying participants list */}
      <Modal show={showParticipantsModal} onHide={handleCloseParticipants}>
        <Modal.Header closeButton>
          <Modal.Title>Participants</Modal.Title>
        </Modal.Header>
<Modal.Body>
  <ol>
    {selectedParticipants.map((participant, index) => (
      <li key={participant}>{participant}</li>
    ))}
  </ol>
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseParticipants}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
};

export default MyOrders;
