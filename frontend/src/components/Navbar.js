import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-4 md:px-8 flex flex-wrap justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-extrabold text-red-500 tracking-tight">Zwiggy</Link>
      <div className="flex gap-2 md:gap-4 mt-2 md:mt-0 flex-wrap">
        <Link to="/restaurants" className="hover:text-red-500 font-medium transition-colors">Restaurants</Link>
        <Link to="/orders" className="hover:text-red-500 font-medium transition-colors">Orders</Link>
        <Link to="/login" className="hover:text-red-500 font-medium transition-colors">Login</Link>
        <Link to="/register" className="hover:text-red-500 font-medium transition-colors">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
