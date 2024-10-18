
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import Navbar2 from '../header/Navbar2';

const URL = "http://localhost:8080/api/venue";

const MyVenue = () => {
    const [id, setId] = useState(0); 
    const [venueName, setVenueName] = useState(''); 
    const [price, setPrice] = useState(0); 
    const [venues, setVenues] = useState([]);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [venueToDelete, setVenueToDelete] = useState(null);

    // Fetch all venues from the backend
    useEffect(() => {
        retrieveAllVenues();
    }, []);

    const retrieveAllVenues = () => {
        axios.get("http://localhost:8080/api/venue")
            .then((response) => {
                setVenues(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEditClick = (venue) => {
        setId(venue.id);
        setVenueName(venue.venueName); 
        setPrice(venue.price);
        setIsEditing(true);
        setShowAddEditModal(true);
    };

    const openAddModal = () => {
        resetForm();
        setIsEditing(false);
        setShowAddEditModal(true);
    };

    const saveVenue = (e) => {
        e.preventDefault();
        const venueData = { id, venueName, price }; 

        if (isEditing) {
            axios.put(`${URL}`, venueData)
                .then((response) => {
                    console.log(response.data);
                    resetForm();
                    retrieveAllVenues();
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios.post(URL, venueData)
                .then((response) => {
                    console.log(response.data);
                    resetForm();
                    retrieveAllVenues();
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    };

    const resetForm = () => {
        setId(0);
        setVenueName('');
        setPrice(0);
        setShowAddEditModal(false);
        setIsEditing(false);
    };

    const handleDeleteClick = (venueId) => {
        setVenueToDelete(venueId);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        axios.delete(`${URL}/${venueToDelete}`)
            .then((response) => {
                console.log(response.data);
                retrieveAllVenues();
                setShowDeleteConfirm(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Header />
            <Navbar2 />
        <div className="App">
            <div className="p-5 bg-secondary text-white">
                <h2>My Venues</h2>
                <button className="btn btn-primary" onClick={openAddModal}>
                    + Add Venue
                </button>
            </div>

            <table className='table table-bordered table-striped table-hover mt-3'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Venue Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        venues.map((venue) => (
                            <tr key={venue.id}>
                                <td>{venue.id}</td> 
                                <td>{venue.venueName}</td> 
                                <td>{venue.price}</td> 
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => handleEditClick(venue)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteClick(venue.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* Add/Edit Modal */}
            <div className={`modal fade ${showAddEditModal ? 'show' : ''}`} style={{ display: showAddEditModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{isEditing ? 'Edit Venue' : 'Add Venue'}</h5>
                            <button type="button" className="close" onClick={resetForm}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={saveVenue}>
                                {isEditing && (
                                    <div className="mb-3">
                                        <label>Venue ID</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            value={id} 
                                            readOnly 
                                        />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label>Venue Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={venueName} 
                                        onChange={(e) => setVenueName(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Price</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        value={price} 
                                        onChange={(e) => setPrice(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success">
                                        {isEditing ? 'Update Venue' : 'Add Venue'}
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <div className={`modal fade ${showDeleteConfirm ? 'show' : ''}`} style={{ display: showDeleteConfirm ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Deletion</h5>
                            <button type="button" className="close" onClick={() => setShowDeleteConfirm(false)}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this venue?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>No</button>
                            <button type="button" className="btn btn-danger" onClick={confirmDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default MyVenue;