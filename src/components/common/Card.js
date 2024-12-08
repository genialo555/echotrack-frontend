// src/components/common/Card.js
export const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
  
  export const CardHeader = ({ children, className = '' }) => (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
  
  export const CardTitle = ({ children, className = '' }) => (
    <div className={`text-lg font-medium text-gray-900 ${className}`}>
      {children}
    </div>
  );
  
  export const CardContent = ({ children, className = '' }) => (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
  
  // src/components/common/SearchBar.js
  import React from 'react';
  import { Search } from 'lucide-react';
  
  export const SearchBar = ({ placeholder, onSearch }) => (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
  
  // src/components/common/ActionButton.js
  import React from 'react';
  
  export const ActionButton = ({ icon: Icon, label, onClick, variant = 'primary' }) => {
    const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors";
    const variants = {
      primary: "bg-green-600 text-white hover:bg-green-700",
      secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      danger: "bg-red-600 text-white hover:bg-red-700"
    };
  
    return (
      <button 
        className={`${baseClasses} ${variants[variant]}`}
        onClick={onClick}
      >
        <Icon className="w-4 h-4" />
        {label}
      </button>
    );
  };
  
  // src/components/common/CustomTooltip.js
  export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} kg CO₂
            </p>
          ))}
        </div>
      );
    }
    return null;
  };