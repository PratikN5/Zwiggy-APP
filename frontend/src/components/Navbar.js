import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-red-500">Zwiggy</Link>
      <div className="space-x-4">
        <Link to="/restaurants" className="hover:text-red-500 font-medium">Restaurants</Link>
        <Link to="/orders" className="hover:text-red-500 font-medium">Orders</Link>
        <Link to="/login" className="hover:text-red-500 font-medium">Login</Link>
        <Link to="/register" className="hover:text-red-500 font-medium">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
