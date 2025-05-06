import React, { useState } from 'react';
import './FilterSideBar.css';

const FilterSideBar = ({ breeds, onFilterChange }) => {
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleBreedChange = (breed) => {
    const updated = selectedBreeds.includes(breed)
      ? selectedBreeds.filter((b) => b !== breed)
      : [...selectedBreeds, breed];

    setSelectedBreeds(updated);
    onFilterChange({ breeds: updated, availableOnly, searchText });
  };

  const handleAvailabilityToggle = () => {
    const updated = !availableOnly;
    setAvailableOnly(updated);
    onFilterChange({ breeds: selectedBreeds, availableOnly: updated, searchText });
  };

  const handleSearchChange = (e) => {
    const updated = e.target.value;
    setSearchText(updated);
    onFilterChange({ breeds: selectedBreeds, availableOnly, searchText: updated });
  };

  return (
    <div className="sidebar">
      <h2 className="title">Filters</h2>

      <div className="section">
        <label className="label">Search</label>
        <input
          type="text"
          placeholder="Search by name..."
          className="input"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      <div className="section">
        <label className="label">Breeds</label>
        <div className="checkboxGroup">
          {breeds.map((breed) => (
            <label key={breed} className="checkboxLabel">
              <input
                type="checkbox"
                checked={selectedBreeds.includes(breed)}
                onChange={() => handleBreedChange(breed)}
              />
              {breed}
            </label>
          ))}
        </div>
      </div>

      <div className="section">
        <label className="checkboxLabel">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={handleAvailabilityToggle}
          />
          Show Available Only
        </label>
      </div>
    </div>
  );
};

export default FilterSideBar;