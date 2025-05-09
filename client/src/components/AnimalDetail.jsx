import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import config from '../config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AnimalDetail.css';

const AnimalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000;
    return Date.now() > expiryTime;
  };

  useEffect(() => {
    const fetchAnimal = async () => {
      setLoading(true);

      const stored = localStorage.getItem('farmartUser');
      if (!stored) {
        toast.error('Not authenticated');
        setLoading(false);
        return;
      }

      const { token } = JSON.parse(stored);

      // Check if the token has expired
      if (isTokenExpired(token)) {
        toast.error('Session expired, please log in again');
        setLoading(false);
        navigate('/login'); // Redirect to login page
        return;
      }

      try {
        const res = await fetch(`${config.API_BASE_URL}/animals/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 404) {
          toast.error('Animal not found');
          setAnimal(null);
        } else if (res.status === 401) {
          toast.error('Unauthorized access, please log in again');
          setAnimal(null);
          navigate('/login'); // Redirect to login page
        } else if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || res.statusText);
        } else {
          const data = await res.json();
          setAnimal(data);
        }
      } catch (err) {
        console.error('[AnimalDetail] Error:', err);
        toast.error(err.message || 'Failed to fetch animal');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id, navigate]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!animal) return <div className="error">Animal not found</div>;

  return (
    <div className="animal-detail">
      <div className="animal-card">
        <div className="image-container">
          <img
            src={animal.image || '/default-animal.jpg'}
            alt={animal.name || `${animal.type} - ${animal.breed}`}
            className="animal-image"
          />
        </div>

        <div className="animal-info">
          <div className="header">
            <h3 className="animal-name">
              {animal.name || `${animal.type} - ${animal.breed}`}
            </h3>
          </div>
          <p className="animal-breed">Breed: {animal.breed}</p>
          <p className="animal-age">Age: {animal.age} years</p>
          <div className="animal-price">
            <p>${animal.price?.toLocaleString()}</p>
          </div>

          <div className="add-to-cart">
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(animal);
                toast.success('Added to cart');
              }}
              className="add-button"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;


