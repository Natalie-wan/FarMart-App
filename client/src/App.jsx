/**import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Marketplace from "./components/Marketplace";
import Login from "./components/Login";
import Register from "./components/Register";
import AnimalDetail from "./components/AnimalDetail";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import PaymentPage from "./components/PaymentPage";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/animal/:id" element={<AnimalDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
*/

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Marketplace from "./components/Marketplace";
import Login from "./components/Login";
import Register from "./components/Register";
import AnimalDetail from "./components/AnimalDetail";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import PaymentPage from "./components/PaymentPage";
import { CartProvider } from "./contexts/CartContext"; 

import "./App.css";

function App() {
  return (
    <CartProvider> 
      <Router>
        <div className="min-h-screen flex flex-col font-sans">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/animal/:id" element={<AnimalDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;