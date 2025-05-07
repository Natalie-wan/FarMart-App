
import React from 'react';
import './Footer.css';

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
            <li>Privacy Policy</li>
            <li>About Us</li>
            <li>Cookies</li>
            <li>Terms of service</li>
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