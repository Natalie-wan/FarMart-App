/*import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="https://i.imgur.com/lWGrewb.png" alt="Farmart logo" title="Every Farmer's Favourite"></img>
      </div>
      <div className="right-section">
        <div className="dashboard-dropdown">
          <button className="dashboard-button" onClick={() => setShowDropdown(!showDropdown)}  title="dashboard">
            <Menu />
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/">Home</Link>
              <Link to="/marketplace">Marketplace</Link>
              {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
            </div>
          )}
        </div>

        <Link to="/cart" className="cart">
          <ShoppingCart />
          <span className="cart-count">0</span>
        </Link>

        {!isAuthenticated && (
          <>
            <Link to="/login" className="login">Login</Link>
            <Link to="/register" className="register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;  */



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const { items } = useCart(); 
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="https://i.imgur.com/lWGrewb.png" alt="Farmart logo" title="Every Farmer's Favourite"></img>
      </div>
      <div className="right-section">
        <div className="dashboard-dropdown">
          <button className="dashboard-button" onClick={() => setShowDropdown(!showDropdown)}  title="dashboard">
            <Menu />
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/">Home</Link>
              <Link to="/marketplace">Marketplace</Link>
              <Link to="/farmer">Farmer Dashboard</Link>
              {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
            </div>
          )}
        </div>

        <nav>
        {/* ... */}
        <Link to="/cart" className="cart">
          <ShoppingCart />
          <span className="cart-count">{items.length}</span> 
      </Link>
        {/* ... */}
         </nav>

        {!isAuthenticated && (
          <>
            <Link to="/login" className="login">Login</Link>
            <Link to="/register" className="register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;  

