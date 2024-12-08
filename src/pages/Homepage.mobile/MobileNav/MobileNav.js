import React from 'react';
import { motion } from 'framer-motion';

const MobileNav = ({ navItems, scrollToSection, onClose, handleConnexion, handleInscription }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="md:hidden absolute top-full left-0 w-full bg-primary border-b border-gray-200 py-8 z-50"
    >
      <nav className="flex flex-col space-y-6 px-6 text-center">
        {navItems.map(({ id, label }) => (
          <button 
            key={id}
            onClick={() => {
              scrollToSection(id);
              onClose();
            }}
            className="text-white hover:text-secondary font-medium transition-colors text-xl py-3"
          >
            {label}
          </button>
        ))}
        <button 
          onClick={() => { handleConnexion(); onClose(); }}
          className="text-secondary font-medium hover:text-secondary-dark transition-colors text-xl py-3"
        >
          Connexion
        </button>
        <button 
          onClick={() => { handleInscription(); onClose(); }}
          className="w-full py-3 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-dark transition-colors text-xl"
        >
          Commencer
        </button>
      </nav>
    </motion.div>
  );
};

export default MobileNav;
