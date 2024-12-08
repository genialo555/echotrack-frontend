
export const useStatistics = () => {
  const historicalData = [
    { type: "Poids Lourds", emissions: 120, performance: 78 },
    { type: "Berlines", emissions: 45, performance: 92 },
    { type: "Camionnettes", emissions: 75, performance: 85 },
  ];

  const calculateAverageEmissions = () => {
    const totalEmissions = historicalData.reduce((sum, item) => sum + item.emissions, 0);
    return (totalEmissions / historicalData.length).toFixed(2);
  };

  const detectAnomalies = () => {
    return historicalData.filter((item) => item.performance < 80);
  };

  const generateRecommendations = () => {
    return historicalData.map((item) => {
      if (item.emissions > 100) {
        return `${item.type} : Réduisez les émissions avec des itinéraires optimisés.`;
      }
      if (item.performance < 80) {
        return `${item.type} : Planifiez une maintenance pour améliorer les performances.`;
      }
      return `${item.type} : Les performances sont optimales. Continuez ainsi !`;
    });
  };

  return { calculateAverageEmissions, detectAnomalies, generateRecommendations };
};
