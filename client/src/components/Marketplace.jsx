/**import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';
import FilterSideBar from './FilterSideBar';
import './Marketplace.css';

const Marketplace = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [filters, setFilters] = useState({ class: '', category: '' });

  // Example API Fetch
  useEffect(() => {
    // TODO: Replace with your actual API endpoint
    fetch('/api/animals')
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
        setFilteredAnimals(data);
      })
      .catch((err) => console.error('Failed to fetch animals:', err));
  }, []);

  // Filter logic
  useEffect(() => {
    const filtered = animals.filter((animal) => {
      return (
        (filters.class ? animal.class === filters.class : true) &&
        (filters.category ? animal.category === filters.category : true)
      );
    });
    setFilteredAnimals(filtered);
  }, [filters, animals]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="marketplaceContainer">
      <div className="filterSidebar">
        <FilterSideBar onFilterChange={handleFilterChange} />
      </div>
      <div className="animalList">
        {filteredAnimals.length > 0 ? (
          filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))
        ) : (
          <div className="noAnimals">No animals found matching your criteria</div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
*/

import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';
import FilterSideBar from './FilterSideBar';
import './Marketplace.css';

const Marketplace = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [filters, setFilters] = useState({ class: '', category: '' });

  useEffect(() => {
    fetch('http://localhost:5000/animals')
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setAnimals(data || []);
        setFilteredAnimals(data || []);
      })
      .catch((err) => console.error('Failed to fetch animals:', err));
  }, []);

  useEffect(() => {
    const filtered = animals.filter((animal) => {
      return (
        (filters.class ? animal.class === filters.class : true) &&
        (filters.category ? animal.type === filters.category : true)
      );
    });
    setFilteredAnimals(filtered);
  }, [filters, animals]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="marketplaceContainer">
      <div className="filterSidebar">
        <FilterSideBar onFilterChange={handleFilterChange} />
      </div>
      <div className="animalList">
        {filteredAnimals.length > 0 ? (
          filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))
        ) : (
          <div className="noAnimals">
            No animals found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
