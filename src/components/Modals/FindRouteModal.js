// src/components/Modals/FindRouteModal.js

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';  
import { Navigation, Timer, Leaf, X, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

export const FindRouteModal = ({ isOpen, onClose }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [emissions, setEmissions] = useState('');
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const handleFindRoute = () => {
    if (travelMode !== 'PLANE' && (!origin || !destination)) {
      setError("Veuillez spécifier une adresse de départ et d'arrivée.");
      return;
    }
    
    calculateEmissions();
  };

  const calculateEmissions = async () => {
    try {
      setError('');
      setIsCalculating(true);
      
      if (travelMode !== 'PLANE') {
        const response = await simulateDistanceMatrixAPI(origin, destination, travelMode);
        setDistance(response.distance.toFixed(1));
        setDuration(response.duration);
        const emissionsCalc = (response.distance * getEmissionFactor(travelMode)).toFixed(2);
        setEmissions(`${emissionsCalc} kg CO₂`);
      } else {
        const fixedDistance = 1000;
        setDistance(fixedDistance.toFixed(1));
        setDuration('N/A');
        const emissionsCalc = (fixedDistance * 0.25).toFixed(2);
        setEmissions(`${emissionsCalc} kg CO₂`);
      }
    } catch (error) {
      setError('Erreur lors du calcul du trajet. Veuillez réessayer.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getEmissionFactor = (mode) => {
    const factors = {
      DRIVING: 0.185,
      TRAIN: 0.089,
      PLANE: 0.25,
      TRANSIT: 0.089,
      WALKING: 0,
      BICYCLING: 0,
    };
    return factors[mode] || 0.089;
  };

  const simulateDistanceMatrixAPI = (origin, destination, mode) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const baseDistance = Math.random() * 100 + 10;
        const speedFactors = {
          DRIVING: 60,
          TRANSIT: 40,
          WALKING: 5,
          BICYCLING: 15,
        };
        const speed = speedFactors[mode] || 60;
        const timeInMinutes = (baseDistance / speed) * 60;
        const hours = Math.floor(timeInMinutes / 60);
        const minutes = Math.floor(timeInMinutes % 60);

        resolve({
          distance: baseDistance,
          duration: `${hours}h ${minutes}min`,
        });
      }, 1500);
    });
  };

  const getMapUrl = () => {
    if (!origin || !destination) return null;
    return `https://www.google.com/maps/embed/v1/directions?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${travelMode.toLowerCase()}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=fr`;
  };

  const resetForm = () => {
    setOrigin('');
    setDestination('');
    setDistance('');
    setDuration('');
    setEmissions('');
    setTravelMode('DRIVING');
    setIsCalculating(false);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[1126px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Trouver un Itinéraire</DialogTitle>
          <DialogDescription>
            Saisissez votre point de départ et d'arrivée pour obtenir l'itinéraire, la distance, la durée et les émissions de CO₂.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Départ</label>
              <Input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Adresse de départ"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Destination</label>
              <Input
                type="text"  
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Adresse d'arrivée"
                className="mt-1 block w-full"  
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label className="block text-sm font-medium">Mode de Transport</label>
              <select
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}  
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="DRIVING">En voiture</option>
                <option value="TRAIN">Train</option>
                <option value="PLANE">Avion</option>
                <option value="TRANSIT">Transport en commun</option>  
                <option value="WALKING">À pied</option>
                <option value="BICYCLING">À vélo</option>
              </select>
            </div>

            <Button
              onClick={handleFindRoute}
              disabled={isCalculating || (!origin || !destination)}
              className="md:w-40"  
            >
              {isCalculating ? "Calcul..." : "Trouver l'Itinéraire"}
            </Button>
          </div>

          {distance && duration && emissions && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Navigation className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Distance</span>
                </div>
                <p className="text-2xl font-bold mt-1">{distance} km</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">  
                <div className="flex items-center space-x-2">
                  <Timer className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Durée</span>
                </div>
                <p className="text-2xl font-bold mt-1">{duration}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">  
                  <Leaf className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Émissions</span>
                </div>
                <p className="text-2xl font-bold mt-1">{emissions}</p>
              </div>
            </div>
          )}

          {getMapUrl() && (
            <div className="aspect-video w-full rounded-lg overflow-hidden border">
              <iframe  
                src={getMapUrl()}
                width="100%"
                height="100%"  
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"  
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Directions"
              />
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={handleClose}>
              Fermer  
            </Button>
          </div>
        </div>

        <button 
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <X className="w-6 h-6" />
        </button>
      </DialogContent>  
    </Dialog>
  );
};
