import React from 'react';
import { MetricCard } from '../components';
import { Car, BarChart, Award } from 'lucide-react';
import FleetPerformanceChart from '../components/FleetPerformanceChart';

const StatisticsSection = () => (
  <section id="statistiques" className="bg-white py-24">
    <div className="grid lg:grid-cols-3 gap-6">
      <MetricCard icon={Car} title="Performance Flotte">
        <div className="h-64 flex items-center justify-center">
          <FleetPerformanceChart />
        </div>
      </MetricCard>
      <MetricCard icon={BarChart} title="Réduction Émissions">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Objectif annuel</span>
            <span className="font-semibold">-30%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }} />
          </div>
          <div className="text-sm text-gray-500">Progression: 65% de l'objectif atteint</div>
        </div>
      </MetricCard>
      <MetricCard icon={Award} title="Certifications">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span>ISO 14001</span>
            <span className="text-green-600">Vérifié</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span>Green Fleet</span>
            <span className="text-green-600">Certifié</span>
          </div>
          <div className="flex items-center justify-between">
            <span>ECO2 Standard</span>
            <span className="text-green-600">Premium</span>
          </div>
        </div>
      </MetricCard>
    </div>
  </section>
);

export default StatisticsSection;
