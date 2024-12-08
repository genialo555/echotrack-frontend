
export const useDashboardInteractions = () => {
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
    } else {
      console.error("Modal introuvable :", modalId);
    }
  };

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    } else {
      console.error("Modal introuvable :", modalId);
    }
  };

  const fetchPerformanceData = () => {
    return {
      performance: Math.floor(Math.random() * 100),
      emissions: Math.floor(Math.random() * 150),
      utilization: Math.floor(Math.random() * 100),
    };
  };

  return { openModal, closeModal, fetchPerformanceData };
};
