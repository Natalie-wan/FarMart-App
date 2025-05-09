import React, { useState } from 'react';
import './EditAnimal.css';

function EditAnimal({ animal, onUpdate, onDelete }) {
  const [formData, setFormData] = useState(animal);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate({ ...formData, updatedAt: new Date().toISOString() });
  }

  function handleDelete() {
    onDelete(animal.id); 
  }

  return (
    <form onSubmit={handleSubmit} className="edit-animal-form">
      <h2 className="form-title">Edit Animal</h2>
      <input
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Type (e.g., ram, heifer)"
        className="form-input"
      />
      <input
        name="breed"
        value={formData.breed}
        onChange={handleChange}
        placeholder="Breed"
        className="form-input"
      />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        className="form-input"
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price ($)"
        className="form-input"
      />
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="form-input"
      />

      <div className="form-buttons">
        <button type="submit" className="save-button">
          Save
        </button>
        <button type="button" className="delete-button" onClick={handleDelete}>
          Delete animal
        </button>
      </div>
    </form>
  );
}

export default EditAnimal;


