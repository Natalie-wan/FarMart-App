import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">From Farm to Door</h1>
          <p className="hero-subtitle">Bringing healthy livestock directly to you.</p>
          <Link to="/marketplace" className="hero-button">Explore Marketplace</Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
