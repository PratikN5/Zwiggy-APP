import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/restaurants/${id}`)
      .then(res => res.json())
      .then(data => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!restaurant) return <div className="text-center py-10 text-red-500">Restaurant not found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow p-8">
      <div className="h-48 w-full bg-gray-200 rounded mb-6 flex items-center justify-center overflow-hidden">
        {restaurant.image ? (
          <img src={restaurant.image} alt={restaurant.name} className="object-cover w-full h-48" />
        ) : (
          <span className="text-gray-400">Image</span>
        )}
      </div>
      <h1 className="text-3xl font-bold text-red-500 mb-2">{restaurant.name}</h1>
      <p className="text-gray-600 mb-4">{restaurant.address}</p>
      <h2 className="text-xl font-semibold mb-2">Menu</h2>
      <ul className="space-y-2">
        {restaurant.menu && restaurant.menu.length > 0 ? (
          restaurant.menu.map((item, idx) => (
            <li key={idx} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span className="text-red-500 font-semibold">₹{item.price}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-400">No menu items available.</li>
        )}
      </ul>
    </div>
  );
}

export default RestaurantDetail;
