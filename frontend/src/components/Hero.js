import React from 'react';


function Hero() {
  return (
    <section className="bg-gradient-to-br from-red-100 to-orange-100 py-12 md:py-20 px-4 flex flex-col items-center text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-500 mb-4 drop-shadow-lg tracking-tight">Zwiggy</h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl">Discover the best food & restaurants near you. Order online and get it delivered fast with Zwiggy!</p>
      <form className="flex w-full max-w-md mx-auto shadow-lg rounded-full overflow-hidden bg-white">
        <input type="text" placeholder="Search for restaurants or dishes..." className="flex-1 px-4 py-2 rounded-l-full border-none focus:outline-none" />
        <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 font-semibold transition-colors">Search</button>
      </form>
    </section>
  );
}

export default Hero;
