// src/components/Dashboard.js

import React from 'react';
import { User, Mail, GraphBar } from 'lucide-react';

const Dashboard = ({ user, stats }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Tableau de Bord Utilisateur</h2>
      <div className="flex items-center mb-4">
        <User className="w-6 h-6 text-green-600 mr-2" />
        <span className="text-gray-700">{user.name}</span>
      </div>
      <div className="flex items-center mb-4">
        <Mail className="w-6 h-6 text-green-600 mr-2" />
        <span className="text-gray-700">{user.email}</span>
      </div>
      <div className="flex items-center">
        <GraphBar className="w-6 h-6 text-green-600 mr-2" />
        <span className="text-gray-700">Performance Globale: {stats.performance}%</span>
      </div>
    </div>
  );
};

export default Dashboard;
