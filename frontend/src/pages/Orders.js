import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">Your Zwiggy Orders</h2>
      <div className="space-y-4">
        {orders.length === 0 && <p className="text-gray-500 text-center">No orders found.</p>}
        {orders.map(o => (
          <div key={o._id} className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold text-lg text-gray-800">{o.restaurant?.name || 'Unknown'}</div>
              <div className="text-gray-500 text-sm">{new Date(o.createdAt).toLocaleString()}</div>
            </div>
            <div className="text-red-500 font-bold text-xl">₹{o.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
