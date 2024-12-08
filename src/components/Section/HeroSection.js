import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ onInscription, onContact }) => (
  <section id="accueil" className="bg-white border-b min-h-[80vh] flex items-center">
    <motion.div
      className="max-w-3xl mx-auto text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Gestion Intelligente de Flotte & Impact Environnemental
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-8">
        Solution complète pour optimiser votre flotte et réduire votre empreinte carbone
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onInscription}
          className="px-8 py-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Démarrer Gratuitement
        </button>
        <button
          onClick={onContact}
          className="px-8 py-4 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors"
        >
          Demander une Démo
        </button>
      </div>
    </motion.div>
  </section>
);

export default HeroSection;
