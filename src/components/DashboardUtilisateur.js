// src/components/DashboardUtilisateur.js

import React, { useState } from 'react';
import { 
  LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Line 
} from 'recharts';
import { 
  Bell, ChevronDown, Settings, LogOut, Car, Leaf, Target, 
  Calendar, PlusCircle, Map, History, Search, Train, User
} from 'lucide-react';
import { AddTripModal } from '../components/Modals/AddTripModal';
import { FindRouteModal } from '../components/Modals/FindRouteModal';
import { TripOverviewModal } from '../components/Modals/TripOverviewModal';

const DashboardUtilisateur = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showAddTripModal, setShowAddTripModal] = useState(false);
  const [showFindRouteModal, setShowFindRouteModal] = useState(false);
  const [showTripOverviewModal, setShowTripOverviewModal] = useState(false); 
  const [showProfileSetupModal, setShowProfileSetupModal] = useState(false); 
  const [showVehicleManagementModal, setShowVehicleManagementModal] = useState(false); 

  const [trips, setTrips] = useState([
    {
      id: 1,
      date: '2024-03-01',
      distance: 12.5,
      emissions: 2.3,
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateTotalEmissions = () => {
    return trips.reduce((total, trip) => {
      const emissionValue = typeof trip.emissions === 'string' ? parseFloat(trip.emissions) : trip.emissions;
      return total + (emissionValue || 0);
    }, 0).toFixed(2);
  };

  const getMonthlyTrips = () => {
    const currentMonth = new Date().getMonth();
    return trips.filter(trip => new Date(trip.date).getMonth() === currentMonth).length;
  };

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
      icon: <Train className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50',
      label: 'Trajets ce mois',
      getValue: getMonthlyTrips
    },
    {
      id: 3,
      icon: <Leaf className="w-6 h-6 text-orange-600" />,
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

  const handleAddTrip = (tripData) => {
    const emissionsByMode = {
      DRIVING: 0.185, 
      TRAIN: 0.089,
      PLANE: 0.25
    };

    const mode = tripData.travelMode;
    let emissions;
    if (mode === 'PLANE') {
      emissions = (emissionsByMode[mode] * 1000).toFixed(2);
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
        onClick={() => setShowTripOverviewModal(true)} 
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <History className="w-4 h-4" />
        Vue d'Ensemble des Trajets
      </button>
      <button 
        onClick={() => setShowVehicleManagementModal(true)} 
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Car className="w-4 h-4" />
        Gérer Mes Véhicules
      </button>
      <button 
        onClick={() => setShowProfileSetupModal(true)} 
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <User className="w-4 h-4" />
        Mon Profil
      </button>
      <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
        <Settings className="w-4 h-4" />
        Paramètres
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-100 dashboard-container" style={{ maxHeight: '900px', overflow: 'hidden' }}>
      
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="px-4 py-4">
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

        <main className="px-4 py-8" style={{ maxHeight: 'calc(900px - 116px)', overflow: 'auto' }}>
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
            <div className="bg-white rounded-xl shadow-sm p-6" style={{ maxHeight: '500px', overflow: 'auto' }}>
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

            <div className="bg-white rounded-xl shadow-sm p-6" style={{ maxHeight: '500px', overflow: 'auto' }}>
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
                onClick={() => setShowTripOverviewModal(true)}
              >
                Voir tous les trajets
              </button>
            </div>
          </div>
        </main>
      </div>

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

      {showProfileSetupModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Mon Profil (Démo)</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            <hr className="my-4"/>
            <p className="mb-4 text-sm text-gray-600">
              Ici vous pourriez modifier votre nom, votre adresse email ou charger une nouvelle photo de profil.
              Les modifications ne seront pas enregistrées car il s'agit d'une démo.
            </p>
            <button 
              onClick={() => setShowProfileSetupModal(false)}
              className="px-4 py-2 mt-4 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {showVehicleManagementModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Gérer Mes Véhicules (Démo)</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Tesla Model 3</p>
                  <p className="text-sm text-gray-500">Électrique</p>
                </div>
                <Car className="text-gray-600 w-6 h-6" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Peugeot 208</p>
                  <p className="text-sm text-gray-500">Essence</p>
                </div>
                <Car className="text-gray-600 w-6 h-6" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Vélo électrique</p>
                  <p className="text-sm text-gray-500">Sans émission</p>
                </div>
                <Car className="text-gray-600 w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Dans une version réelle, vous pourriez ajouter, modifier ou supprimer vos véhicules ici.
            </p>
            <button 
              onClick={() => setShowVehicleManagementModal(false)}
              className="px-4 py-2 mt-4 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardUtilisateur;
