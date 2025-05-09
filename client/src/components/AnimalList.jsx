import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    fetch('http://127.0.0.1:5000/animal', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setAnimals(data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      {animals.map(animal => (
        <div key={animal.id}>{animal.name}</div>
      ))}
    </div>
  );
};

export default AnimalList;
