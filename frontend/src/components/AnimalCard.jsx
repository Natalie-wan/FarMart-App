import React from 'react';
import './AnimalCard.css';

const AnimalCard = ({ animal, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(animal)}>
      <div className="imageContainer">
        {/* Replace this with your backend image */}
        <img
          src={animal.image || "https://via.placeholder.com/300x200.png?text=Animal+Image"}
          alt={animal.name}
          className="image"
        />

        <span
          className={`availability ${
            animal.available ? "available" : "unavailable"
          }`}
        >
          {animal.available ? 'Available' : 'Adopted'}
        </span>
      </div>

      <div className="info">
        <div className="header">
          <h3 className="name">{animal.name}</h3>
          <div className="breedTag">{animal.breed}</div>
        </div>
        <p className="description">{animal.description}</p>
        <div className="footer">
          <span className="price">${animal.price}</span>
          <button className="adoptBtn">Adopt</button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;