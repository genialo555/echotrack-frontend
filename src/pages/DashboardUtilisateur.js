// src/components/DashboardUtilisateur.js

import React, { useState } from 'react';
import { 
  LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Line 
} from 'recharts';
import { 
  Bell, ChevronDown, Settings, LogOut, Car, Leaf, Target, 
  Calendar, PlusCircle, Map, History, Search, Train
} from 'lucide-react';
import { AddTripModal } from '../components/Modals/AddTripModal';
import { FindRouteModal } from '../components/Modals/FindRouteModal';
import { TripOverviewModal } from '../components/Modals/TripOverviewModal';
import Chatbot from '../components/Chatbot';  // Assurez-vous que le chemin est correct

const DashboardUtilisateur = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showAddTripModal, setShowAddTripModal] = useState(false);
  const [showFindRouteModal, setShowFindRouteModal] = useState(false);
  const [showTripOverviewModal, setShowTripOverviewModal] = useState(false); // Nouvel état pour TripOverviewModal
  console.log("DashboardUtilisateur est monté");

  const [trips, setTrips] = useState([
    {
      id: 1,
      date: '2024-03-01',
      distance: 12.5, // Stocké en tant que nombre
      emissions: 2.3, // Stocké en tant que nombre
      duration: '25 minutes',
      travelMode: 'DRIVING',
      origin: 'Paris',
      destination: 'Versailles'
    },
    {
      id: 2,
      date: '2024-03-02',
      distance: 8.2,
      emissions: 1.5,
      duration: '15 minutes',
      travelMode: 'TRAIN',
      origin: 'Lyon',
      destination: 'Villeurbanne'
    },
    {
      id: 3,
      date: '2024-03-03',
      distance: 200.0,
      emissions: 50.0,
      duration: '1h 20 minutes',
      travelMode: 'PLANE',
      origin: 'Marseille',
      destination: 'Aix-en-Provence'
    }
  ]);

  const emissionsData = [
    { month: 'Jan', emissions: 120, objectif: 130 },
    { month: 'Fév', emissions: 98, objectif: 125 },
    { month: 'Mar', emissions: 86, objectif: 120 },
    { month: 'Avr', emissions: 99, objectif: 115 },
    { month: 'Mai', emissions: 85, objectif: 110 },
    { month: 'Jun', emissions: 65, objectif: 105 }
  ];

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Calcul des émissions totales
  const calculateTotalEmissions = () => {
    return trips.reduce((total, trip) => {
      // Supprimer "kg CO₂" pour le calcul
      const emissionValue = typeof trip.emissions === 'string' ? parseFloat(trip.emissions) : trip.emissions;
      return total + (emissionValue || 0);
    }, 0).toFixed(2);
  };

  // Nombre de trajets ce mois
  const getMonthlyTrips = () => {
    const currentMonth = new Date().getMonth();
    return trips.filter(trip => new Date(trip.date).getMonth() === currentMonth).length;
  };

  // Calcul de la réduction mensuelle
  const calculateMonthlyReduction = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const currentMonthTrips = trips.filter(trip => 
      new Date(trip.date).getMonth() === currentMonth
    );
    const previousMonthTrips = trips.filter(trip => 
      new Date(trip.date).getMonth() === previousMonth
    );

    const currentEmissions = currentMonthTrips.reduce((total, trip) => {
      const emissionValue = typeof trip.emissions === 'string' ? parseFloat(trip.emissions) : trip.emissions;
      return total + (emissionValue || 0);
    }, 0);

    const previousEmissions = previousMonthTrips.reduce((total, trip) => {
      const emissionValue = typeof trip.emissions === 'string' ? parseFloat(trip.emissions) : trip.emissions;
      return total + (emissionValue || 0);
    }, 0);

    if (previousEmissions === 0) return "N/A";
    const reduction = ((previousEmissions - currentEmissions) / previousEmissions) * 100;
    return `${reduction.toFixed(1)}%`;
  };

  // Données des statistiques
  const statisticsData = [
    {
      id: 1,
      icon: <Car className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
      label: 'Mes Véhicules',
      getValue: () => '3'
    },
    {
      id: 2,
      icon: <Train className="w-6 h-6 text-green-600" />, // Utilisation de l'icône Train
      bgColor: 'bg-green-50',
      label: 'Trajets ce mois',
      getValue: getMonthlyTrips
    },
    {
      id: 3,
      icon: <Leaf className="w-6 h-6 text-orange-600" />, // Assurez-vous que l'icône est correcte
      bgColor: 'bg-orange-50',
      label: 'Émissions Totales',
      getValue: () => `${calculateTotalEmissions()} kg`
    },
    {
      id: 4,
      icon: <Target className="w-6 h-6 text-purple-600" />,
      bgColor: 'bg-purple-50',
      label: 'Objectif Mensuel',
      getValue: calculateMonthlyReduction
    }
  ];

  // Fonction pour ajouter un trajet
  const handleAddTrip = (tripData) => {
    const emissionsByMode = {
      DRIVING: 0.185, // kg CO2 par km
      TRAIN: 0.089,   // kg CO2 par km
      PLANE: 0.25     // kg CO2 par km
    };

    const mode = tripData.travelMode;

    let emissions;
    if (mode === 'PLANE') {
      // Supposition: distance fixe ou calcul spécifique pour PLANE
      emissions = (emissionsByMode[mode] * 1000).toFixed(2); // Par exemple, 1000 km
    } else {
      const distanceValue = parseFloat(tripData.distance.replace(' km', ''));
      emissions = (distanceValue * emissionsByMode[mode]).toFixed(2);
    }

    const newTrip = {
      ...tripData,
      id: Date.now(),
      emissions: `${emissions} kg CO₂`
    };

    setTrips(prevTrips => [...prevTrips, newTrip]);
    setShowAddTripModal(false);
  };

  // Composant du menu de navigation
  const NavigationMenu = () => (
    <nav className="flex items-center space-x-4 mt-4 border-t pt-4">
      <button 
        onClick={() => setShowAddTripModal(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <PlusCircle className="w-4 h-4" />
        Ajouter un Trajet
      </button>
      <button 
        onClick={() => setShowFindRouteModal(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Map className="w-4 h-4" />
        Trouver Itinéraire
      </button>
      <button 
        onClick={() => setShowTripOverviewModal(true)} // Nouveau bouton pour TripOverviewModal
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <History className="w-4 h-4" />
        Vue d'Ensemble des Trajets
      </button>
      <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
        <Settings className="w-4 h-4" />
        Paramètres
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <header className="bg-white border-b">
        <div className="max-w-8xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold">EchoTrack</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative" aria-label="Notifications">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)} 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                  aria-haspopup="true"
                  aria-expanded={isProfileOpen}
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">JD</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg" role="menu" aria-label="Profile Options">
                    <div className="p-4 border-b">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-sm text-gray-500">john.doe@example.com</p>
                    </div>
                    <div className="py-1">
                      <button 
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <Settings className="mr-3 h-4 w-4 text-gray-600" />
                        Paramètres
                      </button>
                      <button 
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <LogOut className="mr-3 h-4 w-4 text-red-600" />
                        Se Déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <NavigationMenu />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setShowAddTripModal(true)}
            className="h-24 flex flex-col items-center justify-center gap-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
          >
            <PlusCircle className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium">Ajouter un trajet</span>
          </button>
          <button
            onClick={() => setShowFindRouteModal(true)}
            className="h-24 flex flex-col items-center justify-center gap-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Search className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium">Trouver un itinéraire</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {statisticsData.map((stat) => (
            <div key={stat.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.getValue()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Émissions Mensuelles</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emissionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="#16a34a" 
                    strokeWidth={2}
                    name="Émissions CO₂" 
                    dot={{ fill: '#16a34a' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="objectif" 
                    stroke="#6b7280" 
                    strokeDasharray="5 5"
                    name="Objectif"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Derniers Trajets</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Distance</th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Émissions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {trips.slice(0, 5).map((trip) => (
                    <tr key={trip.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {formatDate(trip.date)}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-right">{trip.distance} km</td>
                      <td className="px-4 py-2 text-right">
                        <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                          {trip.emissions}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {trips.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-center text-sm text-gray-500">
                        Aucun trajet disponible.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button 
              className="w-full mt-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              onClick={() => setShowTripOverviewModal(true)} // Ouvre TripOverviewModal
            >
              Voir tous les trajets
            </button>
          </div>
        </div>
      </main>

      {/* Intégration des Modals */}
      <AddTripModal
        isOpen={showAddTripModal}
        onClose={() => setShowAddTripModal(false)}
        onAddTrip={handleAddTrip}
      />

      <FindRouteModal
        isOpen={showFindRouteModal}
        onClose={() => setShowFindRouteModal(false)}
      />

      <TripOverviewModal
        isOpen={showTripOverviewModal}
        onClose={() => setShowTripOverviewModal(false)}
        trips={trips}
      />

      {/* Intégration du Chatbot avec position fixe */}
      <div className="fixed bottom-4 right-4 z-50">
        <Chatbot />
      </div>
    </div>
  );
};

export default DashboardUtilisateur;
