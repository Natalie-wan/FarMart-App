import React from 'react';

const AnimalCard = ({ animal, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(animal)}>
      <div className="imageContainer">

       
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
    </div>
  );
};

export default AnimalCard;


