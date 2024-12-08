// src/components/Modals/AddTripModal.js

import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Navigation, Timer, Leaf, X, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

export const AddTripModal = ({ isOpen, onClose, onAddTrip }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [emissions, setEmissions] = useState('');
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const getMapUrl = () => {
    if (!origin || !destination) return null;
    return `https://www.google.com/maps/embed/v1/directions?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${travelMode.toLowerCase()}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleAddTrip = () => {
    if (travelMode !== 'PLANE' && (!origin || !destination)) {
      setError("Veuillez spécifier une adresse de départ et d'arrivée");
      return;
    }

    const tripData = {
      origin,
      destination,
      distance: `${distance} km`,
      duration: travelMode === 'PLANE' ? 'N/A' : duration,
      travelMode,
      date: new Date().toISOString(),
      emissions,
    };

    onAddTrip(tripData);
    onClose();
    resetForm();
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[3000px] md:max-w-[1200px] max-h-[90vh] overflow-y-auto p-8">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-3xl font-bold">Ajouter un Trajet</DialogTitle>
          <DialogDescription className="text-lg">
            Remplissez les informations ci-dessous pour ajouter un trajet et calculer son impact environnemental.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="origin" className="text-base font-medium">Départ</label>
              <Input
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Adresse de départ"
                className="w-full text-lg"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="destination" className="text-base font-medium">Arrivée</label>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Adresse d'arrivée"
                className="w-full text-lg"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-grow">
              <label htmlFor="travelMode" className="text-base font-medium">Mode de Transport</label>
              <select
                id="travelMode"
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
                className="w-full mt-2 rounded-md border border-input bg-background px-4 py-3 text-lg ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="DRIVING">En voiture</option>
                <option value="TRANSIT">Transport en commun</option>
                <option value="WALKING">À pied</option>
                <option value="BICYCLING">À vélo</option>
                <option value="TRAIN">Train</option>
                <option value="PLANE">Avion</option>
              </select>
            </div>
            <Button
              onClick={calculateEmissions}
              disabled={isCalculating || (!origin || !destination)}
              className="lg:self-end px-8 py-3 text-lg"
            >
              {isCalculating ? "Calcul en cours..." : "Calculer"}
            </Button>
          </div>

          {getMapUrl() && (
            <div className="aspect-video w-full rounded-lg overflow-hidden border mt-8">
              <iframe
                src={getMapUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            </div>
          )}

          {distance && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Navigation className="w-6 h-6 text-green-600" />
                  <span className="text-base font-medium">Distance</span>
                </div>
                <p className="mt-2 text-3xl font-bold">{distance} km</p>
              </div>
              <div className="p-6 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Timer className="w-6 h-6 text-blue-600" />
                  <span className="text-base font-medium">Durée</span>
                </div>
                <p className="mt-2 text-3xl font-bold">{duration}</p>
              </div>
              <div className="p-6 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-orange-600" />
                  <span className="text-base font-medium">Émissions</span>
                </div>
                <p className="mt-2 text-3xl font-bold">{emissions}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-4 mt-8">
            <Button variant="outline" onClick={onClose} className="px-8 py-3 text-lg">
              Annuler
            </Button>
            <Button
              onClick={handleAddTrip}
              disabled={!distance || isCalculating}
              className="px-8 py-3 text-lg"
            >
              Ajouter le trajet
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
