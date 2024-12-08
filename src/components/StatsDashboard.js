// src/components/StatsDashboard.jsx

import React from 'react';
import { Activity, Calendar, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatsDashboard = ({ fleetCount, co2Reduction }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 py-3 px-4 hidden md:block">
      <div className="container mx-auto flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-600" />
          <span>Flotte Active: {fleetCount} véhicules</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-green-600" />
          <span>Dernière mise à jour: {new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-green-600" />
          <span>Impact CO₂ réduit: {co2Reduction} tonnes</span>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
