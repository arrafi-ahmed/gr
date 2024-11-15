import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Vegetables = () => {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVegetables = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/vegetables');
        setVegetables(response.data); // Update state with the fetched data
        setLoading(false);
      } catch (err) {
        setError(err.message); // Set error state if there's an issue
        setLoading(false);
      }
    };

    getVegetables();
  }, []);

  console.log(vegetables);
  

  // Render loading, error, or data based on the state
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <h2>Vegetables List</h2>
      <ul>
        {vegetables.map((vegetable, index) => (
          <li key={index}>{vegetable.name}</li> // Assuming 'name' is a property of vegetable
        ))}
      </ul>
    </div>
  );
};

export default Vegetables;
