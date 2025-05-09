import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FarmerAnimals from './FarmerAnimals';
import AddAnimal from './AddAnimal';
import OrderManagement from './OrderManagement';
import './FarmerDashboard.css';

const FarmerDashboard = () => {
  const { user, isFarmer } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('animals');

  useEffect(() => {
    if (!user || !isFarmer) {
      navigate('/login');
    }
  }, [user, isFarmer, navigate]);

  if (!user || !isFarmer) return null;

  const handleAddAnimal = (animal) => {
    console.log('Add animal:', animal);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Farmer Dashboard</h1>

      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab('animals')}
          className={`tab-button ${activeTab === 'animals' ? 'active' : ''}`}
        >
          My Animals
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
        >
          Orders
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'animals' && <FarmerAnimals />}
        {activeTab === 'add' && <AddAnimal onAddAnimal={handleAddAnimal} />}
        {activeTab === 'orders' && <OrderManagement />}
      </div>
    </div>
  );
};

export default FarmerDashboard;


