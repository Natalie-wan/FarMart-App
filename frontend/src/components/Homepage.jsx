import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">From Farm to Door</h1>
          <p className="hero-subtitle">Bringing healthy livestock directly to you.</p>
          <Link to="/marketplace" className="hero-button">Explore Marketplace</Link>
        </div>
      </section>

      <section className="category-section">
        <h2 className="section-title">Browse by Category</h2>
        <div className="category-grid">
          {categories.length > 0 ? (
            categories.map((cat, idx) => (
              <div key={idx} className="category-card">
                <img
                  src="https://via.placeholder.com/150"
                  alt={cat.name}
                  className="category-image"
                />
                <h3 className="category-name">{cat.name}</h3>
              </div>
            ))
          ) : (
            <p className="loading-text">Loading categories...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
