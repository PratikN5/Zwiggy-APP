import React from 'react';


function Footer() {
  return (
    <footer className="bg-white border-t mt-16 py-8 px-4 text-center text-gray-500 text-sm w-full">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <span>&copy; {new Date().getFullYear()} Zwiggy. All rights reserved.</span>
        <span className="hidden md:inline">Made with <span className="text-red-500">♥</span> for foodies</span>
      </div>
    </footer>
  );
}

export default Footer;
