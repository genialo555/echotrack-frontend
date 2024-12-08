import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Navigation, Car } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const DemoVehicleLocation = () => {
  const [vehicles] = useState([
    {
      id: "VH-2024-FR-75001",
      name: "Véhicule A",
      status: "En livraison",
      speed: "65 km/h",
      co2: "12.5 kg/h",
      lastUpdate: "Il y a 5 min",
      region: "Île-de-France",
      position: [48.8566, 2.3522]
    },
    {
      id: "VH-2024-FR-13002",
      name: "Véhicule B",
      status: "En transit",
      speed: "85 km/h",
      co2: "14.2 kg/h",
      lastUpdate: "Il y a 2 min",
      region: "Provence-Alpes-Côte d'Azur",
      position: [43.2965, 5.3698]
    },
    {
      id: "VH-2024-FR-06003",
      name: "Véhicule C",
      status: "Arrêté",
      speed: "0 km/h",
      co2: "0 kg/h",
      lastUpdate: "Il y a 15 min",
      region: "Provence-Alpes-Côte d'Azur",
      position: [43.7102, 7.2620]
    }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-3xl mx-auto">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-green-600" />
          <h3 className="font-medium">Localisation Véhicules</h3>
        </div>
        <span className="text-sm text-gray-500">{vehicles.length} actifs</span>
      </div>

      <div className="h-[413px] relative"> {/* Increased by approximately 3cm (113px) */}
        <MapContainer
          center={[46.603354, 1.888334]}
          zoom={6}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />
          {vehicles.map(vehicle => (
            <Marker key={vehicle.id} position={vehicle.position}>
              <Popup>
                <div className="p-2">
                  <div className="font-medium text-green-600">{vehicle.name}</div>
                  <div className="text-sm mt-1 space-y-1">
                    <div>Status: {vehicle.status}</div>
                    <div>Vitesse: {vehicle.speed}</div>
                    <div>CO₂: {vehicle.co2}</div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="divide-y">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
            <div>
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{vehicle.name}</span>
                <span className="text-sm text-gray-500">{vehicle.id}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                <div>{vehicle.status}</div>
                <div>{vehicle.region}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">{vehicle.speed}</div>
              <div className="text-sm text-gray-500">CO<sub>2</sub> {vehicle.co2}</div>
              <div className="text-xs text-gray-400">{vehicle.lastUpdate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoVehicleLocation;