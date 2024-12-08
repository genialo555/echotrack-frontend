
// src/components/AuthButtons.js
import React from 'react';

const AuthButtons = ({ onLogin, onStarted }) => {
  return (
    <div className="hidden md:flex items-center gap-4">
      <button 
        onClick={onLogin}
        className="px-4 py-2 text-green-600 font-medium hover:text-green-700 transition-colors"
      >
        Connexion
      </button>
      <button 
        onClick={onStarted}
        className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
      >
        Commencer
      </button>
    </div>
  );
};

export default AuthButtons;