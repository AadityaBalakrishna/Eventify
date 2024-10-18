import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signinform from './components/Authentication/Signin/Signinform';
import Signupform from './components/Authentication/Signup/Signupform';
import Landing from './components/landing/Landing';
import Userhome from './components/landing/Userhome';
import Adminhome from './components/landing/Adminhome';
import PrivateRoute from './components/Authentication/PrivateRoute';
import Createevent from './components/users/CreateEvent';
import MyVenue from './components/admin/MyVenue';
import MyOrders from './components/admin/MyOrders';
import MyInventory from './components/admin/MyInventory';
import MyPackage from './components/users/MyPackage';
import MyEvents from './components/users/MyEvents';
import ParticipantsPayment from './components/users/ParticipantsPayment';
import HostPayment from './components/users/HostPayment';
 
function App() {
  const [selectedItems, setSelectedItems] = useState({});
 
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/auth/signup' element={<Signupform />} />
        <Route path='/auth/signin' element={<Signinform />} />
        <Route path="/auth/admin/adminHome" element={<PrivateRoute element={Adminhome} role="admin" />} />
        <Route path='/api/venue' element={<PrivateRoute element={MyVenue} role="admin"/>} />
        <Route path='/api/item' element={<PrivateRoute element={MyInventory} role="admin"/>} />
        <Route path='/api/event' element={<MyOrders/>} />
        <Route path="/auth/user/userHome" element={<PrivateRoute element={Userhome} role="user" />} />
        <Route path="/api/event/MyEvents" element={<PrivateRoute element={MyEvents} role="user" />} />
        <Route path="/api/event/createEvent" element={<PrivateRoute element={Createevent} role="user"/>} />
        <Route path="/api/event/mypackage/:id" element={<PrivateRoute element={MyPackage} role="user"/>} />
        <Route path="/api/event/ParticipantsPayment/:id" element={<PrivateRoute element={ParticipantsPayment} role="user"/>} />
        <Route path="/api/event/HostPayment" element={<PrivateRoute element={HostPayment} role="user"/>} />

      </Routes>
  );
}
 
export default App;
 