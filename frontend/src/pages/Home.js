
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Hero from '../components/Hero';
import Footer from '../components/Footer';

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


function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data.slice(0, 4))) // Show top 4 featured
      .catch(() => setRestaurants([]));
  }, []);

  // Filter and search logic
  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.address.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? (r.rating && r.rating >= parseFloat(filter)) : true;
    const matchesCategory = category ? (r.cuisine && r.cuisine.toLowerCase().includes(category.toLowerCase())) : true;
    return matchesSearch && matchesFilter && matchesCategory;
  });

  return (
    <div>
      <Hero />
      {/* Banner/Testimonial Section */}
      <section className="max-w-4xl mx-auto mb-10 px-4">
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl shadow flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-6 animate-fade-in">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-2">Why Zwiggy?</h2>
            <p className="text-gray-700 mb-2">Fast delivery, top-rated restaurants, and the best food experience in your city. Join thousands of happy customers!</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-white rounded-full px-4 py-1 text-sm font-semibold text-red-500 shadow">4.8/5 Rating</span>
              <span className="bg-white rounded-full px-4 py-1 text-sm font-semibold text-orange-500 shadow">1000+ Restaurants</span>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="https://img.freepik.com/free-vector/food-delivery-concept-illustration_114360-674.jpg?w=400" alt="Delivery" className="w-40 md:w-56 rounded-xl shadow-lg" />
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto mt-12 px-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">What's on your mind?</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
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
        </div>
        {/* Featured Restaurants */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Featured Restaurants</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search restaurants..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              <option value="">All Ratings</option>
              <option value="4.5">4.5+</option>
              <option value="4">4+</option>
              <option value="3.5">3.5+</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRestaurants.map(r => (
            <div key={r._id} className="bg-white rounded-xl shadow p-4 flex flex-col items-start hover:shadow-2xl transition-shadow duration-300 relative group transform hover:-translate-y-1 animate-fade-in">
              <div className="h-32 w-full bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden">
                {r.image ? (
                  <img src={r.image} alt={r.name} className="object-cover w-full h-32 group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <span className="text-gray-400">Image</span>
                )}
                <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow">★ {r.rating || 'N/A'}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800 flex items-center gap-2">
                {r.name}
              </h3>
              <p className="text-gray-500 mb-1 text-sm">{r.cuisine || 'Multi-cuisine'}</p>
              <p className="text-gray-400 mb-2 text-xs">{r.address}</p>
              <Link to={`/restaurants/${r._id}`} className="mt-auto text-red-500 hover:bg-red-50 hover:text-red-700 font-medium px-3 py-1 rounded-full transition-colors duration-200">View Menu</Link>
            </div>
          ))}
        </div>
        {/* Top Restaurant Chains (demo) */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Top Restaurant Chains</h2>
          <div className="flex gap-6 overflow-x-auto pb-2 hide-scrollbar">
            {filteredRestaurants.slice(0, 4).map(r => (
              <div key={r._id} className="min-w-[220px] bg-white rounded-xl shadow p-4 flex flex-col items-start hover:shadow-lg transition">
                <div className="h-24 w-full bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
                  {r.image ? (
                    <img src={r.image} alt={r.name} className="object-cover w-full h-24" />
                  ) : (
                    <span className="text-gray-400">Image</span>
                  )}
                </div>
                <h3 className="text-base font-semibold mb-1 text-gray-800 flex items-center gap-2">
                  {r.name}
                  <span className="text-yellow-500 text-xs font-bold">★ {r.rating || 'N/A'}</span>
                </h3>
                <p className="text-gray-500 mb-1 text-xs">{r.cuisine || 'Multi-cuisine'}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <Link to="/restaurants" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow">See All Restaurants</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
