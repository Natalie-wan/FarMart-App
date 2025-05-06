import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext'; 

const Navbar = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

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
        <Link to="/cart" className="cart">
          <ShoppingCart />
          <span className="cart-count">{cartCount}</span>
        </Link>
        <Link to="/login" className="login">Login</Link>
        <Link to="/register" className="register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;