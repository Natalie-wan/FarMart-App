import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import config from '../config';
import 'react-toastify/dist/ReactToastify.css';
import './FilterSideBar.css';

const FilterSideBar = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    type: '',
    breed: '',
    age: '',
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyFilters = () => {
    const stored = localStorage.getItem('farmartUser');
    if (!stored) {
      toast.error('Not authenticated');
      return;
    }

    const { token } = JSON.parse(stored);
    const params = new URLSearchParams();
    if (filters.breed) params.append('breed', filters.breed);
    if (filters.type) params.append('type', filters.type);
    if (filters.age) params.append('age', filters.age);

    fetch(`${config.API_BASE_URL}/animals?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          toast.error('No animals found');
          return;
        }

        const animalsWithDetails = data.map((animal) => ({
          id: animal.id,
          type: animal.type,
          breed: animal.breed,
          age: animal.age,
          price: animal.price,
          image: animal.image || 'https://via.placeholder.com/80',
          farmer_name: animal.farmer_name
        }));

        setResults(animalsWithDetails);
        toast.success('Filters applied successfully');
      })
      .catch((err) => {
        console.error('[FilterSidebar] Error:', err);
        toast.error(err.message || 'Failed to fetch animals');
      });
  };

  return (
    <div className="filter-sidebar">
      <div className="info-cards">
    <div className="info-card">
      <h4>Search by Type</h4>
    <p>Use the type field to narrow results to specific animal categories like heifer, bullock, or buck.</p>
     </div>
     <div className="info-card">
        <h4>Refine by Breed & Age</h4>
        <p>Enter a breed or age to filter animals that meet your preferred specifications more precisely.</p>
        </div>
      </div>
      <div className="form-group">
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={filters.type}
          onChange={handleChange}
          placeholder="e.g. heifer,bullock,ram"
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Breed:</label>
        <input
          type="text"
          name="breed"
          value={filters.breed}
          onChange={handleChange}
          placeholder="e.g. suffolk,alpine"
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={filters.age}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <button onClick={handleApplyFilters} className="filter-button">
        Apply Filters
      </button>

      {results.length > 0 && (
        <div className="animal-results">
          {results.map((animal) => (
            <div key={animal.id} className="animal-card">
              <img src={animal.image} alt={animal.type} className="animal-image" />
              <div className="animal-info">
                <div className="animal-type">{animal.type}</div>
                <div className="animal-breed-age">
                  Breed: {animal.breed} • Age: {animal.age}
                  <p>Farmer: {animal.farmer_name}</p>
                </div>
                <div className="animal-price">${animal.price.toLocaleString()}</div>
              </div>
              
              <Link to={`/animals/${animal.id}`} className="view-details">
                <p className="details-button">View Details</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSideBar;  





