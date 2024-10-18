import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import Navbar2 from '../header/Navbar2';

const URL = "http://localhost:8080/api/item";

const MyInventory = () => {
    const [id, setId] = useState(0);
    const [item, setItem] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [limit, setLimit] = useState(0);

    const [items, setItems] = useState([]);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        retrieveAllProducts();
    }, []);

    const retrieveAllProducts = () => {
        axios.get(URL)
            .then((response) => {
                setItems(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEditClick = (item) => {
        setId(item.id);
        setItem(item.item);
        setCategory(item.category);
        setPrice(item.price);
        setLimit(item.limit);
        setIsEditing(true);
        setShowAddEditModal(true);
    };

    const openAddModal = () => {
        resetForm();
        setIsEditing(false);
        setShowAddEditModal(true);
    };

    const saveEvent = (e) => {
        e.preventDefault();
        const eventData = { id, item, category, price, limit }; 

        if (isEditing) {
            // Update item
            axios.put(`${URL}`, eventData) // Use PUT with item ID
                .then((response) => {
                    console.log(response.data);
                    resetForm();
                    retrieveAllProducts();
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            // Add new item
            const newItem = {
                id,
                item,
                category,
                price,
                limit
            };

            axios.post(URL, newItem)
                .then((response) => {
                    console.log(response.data);
                    resetForm();
                    retrieveAllProducts();
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    };

    const resetForm = () => {
        setId(0);
        setItem('');
        setCategory('');
        setPrice(0);
        setLimit(0);
        setShowAddEditModal(false);
        setIsEditing(false);
    };

    const handleDeleteClick = (itemId) => {
        setItemToDelete(itemId);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        axios.delete(`${URL}/${itemToDelete}`)
            .then((response) => {
                console.log(response.data);
                retrieveAllProducts();
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
            <div>
                <button className="btn btn-primary" onClick={openAddModal}>
                    + Add Item
                </button>
            </div>

            <table className='table table-bordered table-striped table-hover mt-3'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Limit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.item}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>{item.limit}</td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => handleEditClick(item)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteClick(item.id)}>Delete</button>
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
                            <h5 className="modal-title">{isEditing ? 'Edit Item' : 'Add Item'}</h5>
                            <button type="button" className="close" onClick={resetForm}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={saveEvent}>
                                <div className="mb-3">
                                    <label>Item id</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        value={id} 
                                        onChange={(e) => setId(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Item Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={item} 
                                        onChange={(e) => setItem(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Category</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)} 
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
                                <div className="mb-3">
                                    <label>Limit</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        value={limit} 
                                        onChange={(e) => setLimit(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success">
                                        {isEditing ? 'Update Item' : 'Add Item'}
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
                            <p>Are you sure you want to delete this item?</p>
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

export default MyInventory;
