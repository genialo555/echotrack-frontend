import React, { useState } from 'react';
import { List, X, Leaf } from 'phosphor-react';
import { AuthButtons } from '../';
import { motion } from 'framer-motion';
import MobileNav from '../MobileNav/MobileNav';
import { useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'accueil', label: 'Accueil', icon: Leaf },
  { id: 'fonctionnalites', label: 'Fonctionnalités', icon: FileText },
  { id: 'statistiques', label: 'Statistiques', icon: ChartBar },
  { id: 'integrations', label: 'Intégrations', icon: Trophy },
  { id: 'contact', label: 'Contact', icon: Envelope }
];

const Header = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleConnexion = () => navigate('/connexion');
  const handleInscription = () => navigate('/inscription');

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-primary backdrop-blur-sm bg-opacity-80 border-b border-gray-200">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">EchoTrack</span>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(({ id, label }) => (
              <button 
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-white hover:text-secondary font-medium transition-colors text-lg px-4 py-2"
              >
                {label}
              </button>
            ))}
          </nav>

          <AuthButtons 
            onLogin={handleConnexion}
            onStarted={handleInscription}
          />

          {/* Bouton Menu Mobile */}
          <button 
            className="block md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu mobile"
          >
            {isMenuOpen ? (
              <X size={24} weight="bold" className="text-secondary" />
            ) : (
              <List size={24} weight="bold" className="text-secondary" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <MobileNav 
              navItems={NAV_ITEMS} 
              scrollToSection={scrollToSection} 
              onClose={() => setIsMenuOpen(false)} 
              handleConnexion={handleConnexion}
              handleInscription={handleInscription}
            />
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
