// src/services/vehicleService.js
import api from './api';

const fetchVehicles = () => api.get('/vehicles');
const addVehicle = (vehicleData) => api.post('/vehicles', vehicleData);
const updateVehicle = (id, vehicleData) => api.put(`/vehicles/${id}`, vehicleData);
const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);

export default {
  fetchVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};
