import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/auth/user/userHome" className="nav-link active">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/api/event/MyEvents" className="nav-link active">
              My Events
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
