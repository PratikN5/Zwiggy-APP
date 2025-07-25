
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Biryani', icon: '🍛' },
  { name: 'South Indian', icon: '🍲' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Burger', icon: '🍔' },
  { name: 'Rolls', icon: '🌯' },
  { name: 'Cake', icon: '🍰' },
  { name: 'Ice Cream', icon: '🍦' },
  { name: 'Salad', icon: '🥗' },
  { name: 'Chinese', icon: '🥡' },
  { name: 'Shawarma', icon: '🌮' },
  { name: 'Kebabs', icon: '🍢' },
  { name: 'Pasta', icon: '🍝' },
];


function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/restaurants')
      .then(res => setRestaurants(res.data))
      .catch(() => setRestaurants([]));
  }, []);

  // Filter by category
  const filteredRestaurants = category
    ? restaurants.filter(r => r.cuisine && r.cuisine.toLowerCase().includes(category.toLowerCase()))
    : restaurants;

  return (
    <div>
      <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">Zwiggy Restaurants</h2>
      {/* What's on your mind? */}
      <div className="mb-8 flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.name}
            className={`flex flex-col items-center px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-red-50 transition min-w-[80px] ${category === cat.name ? 'border-red-500 ring-2 ring-red-200' : ''}`}
            onClick={() => setCategory(cat.name === category ? '' : cat.name)}
          >
            <span className="text-2xl mb-1">{cat.icon}</span>
            <span className="text-xs font-medium text-gray-700">{cat.name}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredRestaurants.map(r => (
          <div key={r._id} className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-start hover:shadow-2xl transition-shadow duration-300 relative group transform hover:-translate-y-1 animate-fade-in border border-gray-100">
            <div className="h-32 w-full bg-gray-100 rounded-xl mb-3 flex items-center justify-center overflow-hidden relative">
              {r.image ? (
                <img src={r.image} alt={r.name} className="object-cover w-full h-32 group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <span className="text-gray-400">Image</span>
              )}
              <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow">★ {r.rating || 'N/A'}</span>
              {r.isVeg && <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">PURE VEG</span>}
              {r.offer && <span className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">{r.offer}</span>}
            </div>
            <h3 className="text-lg font-semibold mb-1 text-gray-800 flex items-center gap-2">
              {r.name}
            </h3>
            <div className="flex flex-wrap gap-1 mb-1">
              {(r.cuisine ? r.cuisine.split(',') : ['Multi-cuisine']).map(c => (
                <span key={c} className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-medium">{c.trim()}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-400 text-xs">{r.address}</span>
              <span className="text-gray-400 text-xs">·</span>
              <span className="text-green-600 text-xs font-semibold">{r.deliveryTime || '30-40 min'}</span>
            </div>
            <Link to={`/restaurants/${r._id}`} className="mt-auto text-white bg-red-500 hover:bg-red-600 font-medium px-4 py-1.5 rounded-full transition-colors duration-200 shadow">View Menu</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
