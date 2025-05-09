import { useState } from 'react';
import './AddAnimal.css';

function AddAnimal({ onAdd }) {
  const [formData, setFormData] = useState({
    type: '',
    breed: '',
    age: '',
    price: '',
    image: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newAnimal = {
      ...formData,
      age: Number(formData.age),
      price: Number(formData.price),
      image: formData.image || 'https://via.placeholder.com/150',
    };
    onAdd(newAnimal);
    toast.success('Animal added!');
    setFormData({ type: '', breed: '', age: '', price: '', image: '' });
  }

  return (
    <form onSubmit={handleSubmit} className="add-animal-form">
      <h2 className="form-title">Add New Animal</h2>
      <input
        name="type"
        placeholder="Type (e.g., ram, ewe)"
        value={formData.type}
        onChange={handleChange}
        className="form-input"
      />
      <input
        name="breed"
        placeholder="Breed (e.g., alpine,jersey)"
        value={formData.breed}
        onChange={handleChange}
        className="form-input"
      />
      <input
        name="age"
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        className="form-input"
      />
      <input
        name="price"
        type="number"
        placeholder="Price ($)"
        value={formData.price}
        onChange={handleChange}
        className="form-input"
      />
      <input
        name="image"
        placeholder="e.g. https://i.imgur.com/iqlhgXm.jpeg"
        value={formData.image}
        onChange={handleChange}
        className="form-input"
      />
      <button type="submit" className="submit-button">
        Add Animal
      </button>
    </form>
  );
}

export default AddAnimal;

