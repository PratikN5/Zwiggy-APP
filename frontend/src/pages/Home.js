
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Footer from '../components/Footer';


function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

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
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <Hero />
      <section className="max-w-5xl mx-auto mt-12 px-4">
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
            <div key={r._id} className="bg-white rounded-xl shadow p-6 flex flex-col items-start hover:shadow-lg transition">
              <div className="h-32 w-full bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden">
                {r.image ? (
                  <img src={r.image} alt={r.name} className="object-cover w-full h-32" />
                ) : (
                  <span className="text-gray-400">Image</span>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800 flex items-center gap-2">
                {r.name}
                <span className="text-yellow-500 text-sm font-bold">★ {r.rating || 'N/A'}</span>
              </h3>
              <p className="text-gray-500 mb-2">{r.address}</p>
              <Link to={`/restaurants/${r._id}`} className="mt-auto text-red-500 hover:underline font-medium">View Menu</Link>
            </div>
          ))}
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
