import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md py-4 px-4 md:px-8 flex flex-wrap justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-extrabold text-red-500 tracking-tight">Zwiggy</Link>
      <button
        className="md:hidden ml-auto text-2xl focus:outline-none"
        onClick={() => setMenuOpen(m => !m)}
        aria-label="Toggle menu"
      >
        <span>{menuOpen ? '✖' : '☰'}</span>
      </button>
      <div
        className={`w-full md:w-auto flex-col md:flex-row md:flex gap-2 md:gap-4 mt-2 md:mt-0 flex-wrap md:items-center ${menuOpen ? 'flex' : 'hidden md:flex'}`}
      >
        <Link to="/restaurants" className="hover:text-red-500 font-medium transition-colors block md:inline-block px-2 py-2 md:p-0">Restaurants</Link>
        <Link to="/orders" className="hover:text-red-500 font-medium transition-colors block md:inline-block px-2 py-2 md:p-0">Orders</Link>
        <Link to="/login" className="hover:text-red-500 font-medium transition-colors block md:inline-block px-2 py-2 md:p-0">Login</Link>
        <Link to="/register" className="hover:text-red-500 font-medium transition-colors block md:inline-block px-2 py-2 md:p-0">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
