import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FleetPerformanceChart = () => {
  const fleetData = useMemo(() => [
    {
      type: 'Poids Lourds',
      performance: 78,
      utilisation: 85,
      emissions: 120
    },
    {
      type: 'Berlines',
      performance: 92,
      utilisation: 95,
      emissions: 45
    },
    {
      type: 'Camionnettes',
      performance: 85,
      utilisation: 88,
      emissions: 75
    }
  ], []);

  const renderTooltip = useMemo(() => ({
    contentStyle: {
      backgroundColor: 'white',
      border: '1px solid #E5E7EB',
      borderRadius: '6px',
      fontSize: '12px'
    }
  }), []);

  const chartMargin = useMemo(() => ({ 
    top: 10, 
    right: 20, 
    left: 0, 
    bottom: 5 
  }), []);

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%" debounce={50}>
        <BarChart 
          data={fleetData} 
          margin={chartMargin}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#f0f0f0" 
            vertical={false}
          />
          <XAxis 
            dataKey="type" 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip {...renderTooltip} />
          <Legend 
            wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            iconSize={8}
          />
          <Bar 
            dataKey="performance" 
            name="Performance" 
            fill="#3B82F6" 
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar 
            dataKey="utilisation" 
            name="Utilisation" 
            fill="#10B981" 
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar 
            dataKey="emissions" 
            name="Émissions" 
            fill="#6366F1" 
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FleetPerformanceChart;