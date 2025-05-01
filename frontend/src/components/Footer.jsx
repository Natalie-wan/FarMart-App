import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="columns">
        <div className="column">
          <h4>Farmart</h4>
          <p>Connecting farmers to buyers with ease and trust.</p>
        </div>

        <div className="column">
          <h5>Explore</h5>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/marketplace">Marketplace</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        <div className="column">
          <h5>Help</h5>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/support">Customer Support</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div className="column">
          <h5>Contact</h5>
          <p>Email: support@farmart.com</p>
          <p>Phone: +234 123 4567</p>
        </div>
      </div>

      <div className="bottomBar">
        <p>&copy; {new Date().getFullYear()} Farmart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;