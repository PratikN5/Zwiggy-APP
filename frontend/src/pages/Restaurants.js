import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/restaurants')
      .then(res => setRestaurants(res.data))
      .catch(() => setRestaurants([]));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">Zwiggy Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurants.map(r => (
          <div key={r._id} className="bg-white rounded-xl shadow p-6 flex flex-col items-start hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{r.name}</h3>
            <p className="text-gray-500 mb-4">{r.address}</p>
            <Link to={`/restaurants/${r._id}`} className="mt-auto text-red-500 hover:underline font-medium">View Menu</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
