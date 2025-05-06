/**import React, { useEffect, useState } from 'react';
import './AnimalDetail.css';
import { useParams } from 'react-router-dom';

const AnimalDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    // 🔗 Fetch animal details from backend
    // Replace the URL with your backend endpoint
    fetch(`/api/animals/${id}`)
      .then((res) => res.json())
      .then((data) => setAnimal(data))
      .catch((err) => console.error('Error fetching animal:', err));
  }, [id]);

  if (!animal) return <div className="loading">Loading...</div>;

  return (
    <div className="detailContainer">
      <div className="imageWrapper">
        <img
          src={animal.imageUrl || '/placeholder.png'}
          alt={animal.name}
          className="image"
        />
      </div>
      <div className="infoWrapper">
        <h2 className="name">{animal.name}</h2>
        <p className="breed"><strong>Breed:</strong> {animal.breed}</p>
        <p className="age"><strong>Age:</strong> {animal.age} years</p>
        <p className="description">{animal.description}</p>
        <p className="price"><strong>Price:</strong> ${animal.price}</p>
        <p className="status">
          <strong>Status:</strong>{' '}
          <span className={animal.available ? "available" : "unavailable"}>
            {animal.available ? 'Available' : 'Adopted'}
          </span>
        </p>
        <button className="adoptBtn" disabled={!animal.available}>
          {animal.available ? 'Adopt Me' : 'Not Available'}
        </button>
      </div>
    </div>
  );
};

export default AnimalDetail;
*/

import React, { useEffect, useState } from 'react';
import './AnimalDetail.css';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const AnimalDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/animals/${id}`)
      .then((res) => res.json())
      .then((data) => setAnimal(data))
      .catch((err) => console.error('Error fetching animal:', err));
  }, [id]);

  if (!animal) return <div className="loading">Loading...</div>;

  return (
    <div className="detailContainer">
      <div className="imageWrapper">
        <img
          src={animal.imageUrl || '/placeholder.png'}
          alt={animal.name}
          className="image"
        />
      </div>

      <div className="infoWrapper">
        <h2 className="name">{animal.name}</h2>
        <p className="breed"><strong>Breed:</strong> {animal.breed}</p>
        <p className="age"><strong>Age:</strong> {animal.age} years</p>
        <p className="description">{animal.description}</p>
        <p className="price"><strong>Price:</strong> ${animal.price}</p>
        <p className="status">
          <strong>Status:</strong>{' '}
          <span className={animal.available ? "available" : "unavailable"}>
            {animal.available ? 'In Stock' : 'Out of Stock'}
          </span>
        </p>

        <button
          className="addToCartBtn"
          disabled={!animal.available}
          onClick={() => addToCart(animal)}
        >
          {animal.available ? 'Add to Cart' : 'Not Available'}
        </button>
      </div>
    </div>
  );
};

export default AnimalDetail;
