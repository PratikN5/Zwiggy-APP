import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t mt-16 py-6 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} Zwiggy. All rights reserved.
    </footer>
  );
}

export default Footer;
