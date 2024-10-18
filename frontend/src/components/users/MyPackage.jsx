
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyPackage.css';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import Navbar from '../header/Navbar';

const MyPackage = () => {
  const [Items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [venuePrice, setVenuePrice]=useState(0)

  useEffect(() => {

    const eventData = JSON.parse(localStorage.getItem('eventData')); // Get event data from localStorage
    var venueId=eventData.venue.id;
    //find venue object from venue id
    axios.get(`http://localhost:8080/api/venue/${venueId}`)
    .then((response)=>{
      var obj=response.data;
      setVenuePrice(obj.price)

    })
    .catch()


    axios.get("http://localhost:8080/api/item")
      .then((response) => {
        const itemsWithQuantity = response.data.map(item => ({
          ...item,
          quantity: 0,
          cost: 0,
        }));
        setItems(itemsWithQuantity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter(i => i !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prevState => {
      const newExpandedState = {
        ...prevState,
        [category]: !prevState[category], // Toggle the current category
      };

      // Collapse all other categories
      Object.keys(newExpandedState).forEach(cat => {
        if (cat !== category) {
          newExpandedState[cat] = false; // Collapse other categories
        }
      });

      return newExpandedState;
    });
    setSelectedCategory(prevCategory => (prevCategory === category ? null : category)); // Track selected category
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === itemId) {
        const quantity = Math.min(Math.max(newQuantity, 0), item.limit);
        return { ...item, quantity, cost: quantity * item.price };
      }
      return item;
    }));
  };

  const calculateTotalCost = () => {
    return Items.reduce((acc, item) => {
      if (selectedItems.includes(item.id) && item.quantity > 0) {
        let totalCartCost = acc + item.cost
        localStorage.setItem('totalCartCost', totalCartCost);
        return acc + item.cost;
      }
      return acc;
    }, 0);
  };

  const calculateTotalEventPrice = () => {
    return calculateTotalCost() + venuePrice;
  }

  const groupedItems = Items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const selectedItemsDetails = Items.filter(item => selectedItems.includes(item.id) && item.quantity > 0);

  // Function to update the event data stored in localStorage
  const updateEventData = (cartItems) => {
    const eventData = JSON.parse(localStorage.getItem('eventData')); // Get event data from localStorage
    if (eventData) {

      eventData.carts = cartItems; // Update the carts array
      localStorage.setItem('eventData', JSON.stringify(eventData)); // Store updated event data in localStorage
      console.log('Updated event data:', eventData);
    } else {
      console.error('No event data found in localStorage');
    }
  };

  // Function to submit the cart data to the backend and update localStorage
  const handleSubmitCart = async () => {
    const cartItems = selectedItemsDetails.map(item => ({
      cartPrice: item.cost,
      quantity: item.quantity,
      item: { 'id': item.id },
      userInfo: { 'username': username }
    }));

    console.log('Submitting cart data:', cartItems);

    try {
      var response = await axios.post("http://localhost:8080/api/cart", cartItems);

      updateEventData(response.data); // Update the event data with the cart items
      console.log("Cart items now got ids", cartItems)
      const totalEventPrice= calculateTotalEventPrice();
      // console.log("Event data", eventData)
      // alert('Cart items submitted successfully!');
      navigate("/api/event/HostPayment", {state: {totalEventPrice}});
    } catch (error) {
      console.error('Error submitting cart items:', error);
      alert('Failed to submit cart items. Please try again.');
    }


    try {
      var eventData = JSON.parse(localStorage.getItem("eventData"))
      console.log("Verify the event object")
      console.log(eventData);

      await axios.put("http://localhost:8080/api/event", eventData);
      // updateEventData(cartItems); // Update the event data with the cart items
      alert('Cart items submitted successfully!');
    } catch (error) {
      console.error('Error submitting cart items:', error);
      alert('Failed to submit cart items. Please try again.');
    }
  };


  return (
    <div>
      <Header />
      <Navbar />
    <div className="container-fluid my-events-container">
      <div className="row">
        <h1>Select your Package</h1>
        <div className="col-sm-2">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedItems).map((category, index) => (
                <tr
                  key={index}
                  className={`category-row ${selectedCategory === category ? 'selected-category' : ''}`}
                  onClick={() => toggleCategory(category)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Items Section */}
        <div className="col-sm-6">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Select</th>
                <th>Item</th>
                <th>Price</th>
                <th>Limit</th>
                <th>Quantity</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedItems).map((category, index) => (
                expandedCategories[category] && selectedCategory === category && groupedItems[category].map(item => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                    <td>{item.item}</td>
                    <td>₹{item.price}</td>
                    <td>{item.limit}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        className="form-control form-control-sm"
                        onChange={e => {
                          const newQuantity = parseInt(e.target.value, 10);
                          handleQuantityChange(item.id, isNaN(newQuantity) ? 0 : newQuantity);
                        }}
                        disabled={!selectedItems.includes(item.id)}
                        min="0"
                        max={item.limit}
                      />
                    </td>
                    <td>₹{item.cost}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>

        {/* Side Cart Section */}
        <div className="col-sm-3 cart-container">
          <div className="card1">
            <div className="card-header bg-dark text-white">
              <h3>Cart</h3>
            </div>
            <div className="card-body">
              {selectedItemsDetails.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItemsDetails.map(item => (
                      <tr key={item.id}>
                        <td>{item.item}</td>
                        <td>₹{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No items selected</p>
              )}
            </div>
            <div className="card-footer">
              <h5>Cart Price: ₹{calculateTotalCost()}</h5>
              <h5>Venue Price: ₹{venuePrice} </h5>
              <h4>Total Event Price: ₹{calculateTotalEventPrice()}</h4>
              <br></br>
              <button
                className="btn btn-primary btn-block"
                disabled={selectedItemsDetails.length === 0}
                onClick={handleSubmitCart} // Call the function on button click
              >
                Proceed to Payment
              </button>

              
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyPackage;

