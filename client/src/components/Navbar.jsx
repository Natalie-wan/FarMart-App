import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Farmart</Link>
      </div>
      <ul className="navLinks">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/marketplace">Marketplace</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
      <div className="authButtons">
        <Link to="/login" className="login">Login</Link>
        <Link to="/register" className="register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;