import React, { useState, useEffect } from 'react';
import EditAnimal from './EditAnimal';
import AddAnimal from './AddAnimal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FarmerAnimals.css';
import config from '../config';

function FarmerAnimals() {
  const [animals, setAnimals] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const stored = localStorage.getItem('farmartUser');
      if (!stored) {
        toast.error('Not authenticated');
        return;
      }
  
      const { token } = JSON.parse(stored);
  

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/farmer/animals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch animals');
        return res.json();
      })
      .then(data => setAnimals(data))
      .catch(() => toast.error('Could not load animals from server'));
  }, []);

  const handleAdd = (newAnimal) => {
    fetch(`${config.API_BASE_URL}/animals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAnimal),
    })
      .then(res => {
        if (!res.ok) throw new Error('Add failed');
        return res.json();
      })
      .then(data => {
        setAnimals(prev => [...prev, data]);
        toast.success('Animal added successfully!');
        setIsAdding(false);
      })
      .catch(() => toast.error('Failed to add animal'));
  };

  const handleUpdate = (updatedAnimal) => {
    fetch(`${config.API_BASE_URL}/animals/${updatedAnimal.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedAnimal),
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then(data => {
        setAnimals(prev =>
          prev.map(animal => (animal.id === data.id ? data : animal))
        );
        toast.success('Animal updated successfully!');
        setEditingId(null);
      })
      .catch(() => toast.error('Failed to update animal'));
  };

  const handleDelete = (id) => {
    fetch(`${config.API_BASE_URL}/animals/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Delete failed');
        setAnimals(prev => prev.filter(animal => animal.id !== id));
        toast.success('Animal deleted successfully!');
        setEditingId(null);
      })
      .catch(() => toast.error('Failed to delete animal'));
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="farmer-animals-container">
      <div className="add-button-container">
        <button onClick={() => setIsAdding(true)} className="add-animal-button">
          + Add Animal
        </button>
      </div>

      {isAdding && <AddAnimal onAdd={handleAdd} onCancel={handleCancel} />}

      <ul className="animal-list">
        {animals.map(animal => (
          <li key={animal.id} className="animal-card">
            {editingId === animal.id ? (
              <EditAnimal
                animal={animal}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onCancel={handleCancel}
              />
            ) : (
              <div className="animal-display">
                <div className="animal-info">
                  <img src={animal.image} alt={animal.type} className="animal-image" />
                  <div>
                    <p>{animal.type} - {animal.breed}</p>
                    <p>Age: {animal.age} years</p>
                    <p>Price: ${animal.price}</p>
                  </div>
                </div>
                <div className="animal-buttons">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => setEditingId(animal.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(animal.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FarmerAnimals;





