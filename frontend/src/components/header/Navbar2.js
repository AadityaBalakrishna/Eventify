
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar2 = () => {
  return (

<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
<div className="container-fluid justify-content-center">
  <ul className="navbar-nav">
    <li className="nav-item">
      <Link to="/auth/admin/AdminHome" className="nav-link active">
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/auth/admin/myProfile" className="nav-link active">
        My Profile
      </Link>
    </li>
  </ul>
</div>
</nav>
  );
};

export default Navbar2;