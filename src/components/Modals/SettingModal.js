// src/components/Modals/SettingsModal.js

import React from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

export const SettingsModal = ({ isOpen, onClose }) => {
  // Empêcher le scroll de la page lorsque le modal est ouvert
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-labelledby="settings-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 md:mx-0 relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="settings-modal-title" className="text-2xl font-bold">Paramètres</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-4 overflow-y-auto max-h-[70vh]">
          <form className="space-y-6">
            {/* Informations du Profil */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Informations du Profil</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input 
                    type="text" 
                    defaultValue="John Doe" 
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
                  <input 
                    type="email" 
                    defaultValue="john.doe@example.com" 
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Photo de Profil</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="mt-1 block w-full text-sm text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Préférences de Notification */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Préférences de Notification</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="email-notifications" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="email-notifications" className="ml-2 text-sm text-gray-700">
                    Recevoir des notifications par e-mail
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="push-notifications" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="push-notifications" className="ml-2 text-sm text-gray-700">
                    Recevoir des alertes push
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="weekly-summary" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="weekly-summary" className="ml-2 text-sm text-gray-700">
                    Résumé hebdomadaire des trajets
                  </label>
                </div>
              </div>
            </div>

            {/* Unités de Mesure */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Unités de Mesure</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Distance</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option>Kilomètres (km)</option>
                    <option>Miles (mi)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Émissions</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option>kg CO₂</option>
                    <option>g CO₂</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sécurité et Authentification */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Sécurité</h3>
              <div className="space-y-2">
                <button 
                  type="button" 
                  className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Changer le mot de passe
                </button>
                <button 
                  type="button" 
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Activer l'authentification à deux facteurs (2FA)
                </button>
              </div>
            </div>

            {/* Thème et Apparence */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Thème</h3>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Clair</button>
                <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">Sombre</button>
              </div>
            </div>

            {/* Gestion des Données */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Gestion des Données</h3>
              <div className="space-y-2">
                <button 
                  type="button" 
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Exporter les données
                </button>
                <button 
                  type="button" 
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Supprimer le compte
                </button>
              </div>
            </div>

            {/* Langue */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Langue</h3>
              <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option>Français</option>
                <option>Anglais</option>
                {/* Ajoutez d'autres langues si nécessaire */}
              </select>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Enregistrer et Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
