import React from 'react';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <section className="advertising-section">
        <div className="ad-card">
          <h3 className="ad-title">A variety of livestock breeds</h3>
          <p className="ad-description">Our livestock is raised on healthy, sustainable farms. Browse our marketplace for fresh offerings.</p>
        </div>
        <div className="ad-card">
          <h3 className="ad-title">Quality Assurance</h3>
          <p className="ad-description">We ensure the highest standards of quality for every animal. Our farmers follow strict guidelines.</p>
        </div>
        <div className="ad-card">
          <h3 className="ad-title">Fast Delivery</h3>
          <p className="ad-description">Get your livestock delivered right to your doorsteps quickly and safely. Order today and enjoy fresh products!</p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
