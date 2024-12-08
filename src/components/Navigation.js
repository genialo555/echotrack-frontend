import React from 'react';

const Navigation = ({ items, onItemClick }) => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {items.map(({ id, label }) => (
        <button 
          key={id}
          onClick={() => onItemClick(id)} 
          className="text-gray-900 hover:text-green-600 font-medium transition-colors"
        >
          {label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;