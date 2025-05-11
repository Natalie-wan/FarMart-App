import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Marketplace from "./components/Marketplace";
import Login from "./components/Login";
import Register from "./components/Register";
import AnimalDetail from "./components/AnimalDetail";
import FarmerDashboard from "./components/FarmerDashboard";
import Homepage from "./components/Homepage";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import Stripe from "./components/Stripe";
import { CartProvider } from "./contexts/CartContext";
import RoleProtectedRoute from "./components/RoleProtectedRoute"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Stripe />} />

              <Route path="/animals/:id" element={<AnimalDetail />} /> 

              <Route
                path="/marketplace"
                element={
                  <RoleProtectedRoute role="buyer">
                    <Marketplace />
                 </RoleProtectedRoute>
                }
              /> 
              <Route 
               path="/cart" 
               element={
                <RoleProtectedRoute role="buyer">
                   <Cart />
                </RoleProtectedRoute>
                } 
              />    
              <Route 
               path="/farmer" 
               element={
                <RoleProtectedRoute role="farmer">
                   <FarmerDashboard />
                </RoleProtectedRoute>
                } 
              />    
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </CartProvider>
  );
}

export default App;