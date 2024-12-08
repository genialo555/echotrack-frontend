// src/services/api.js
import axios from 'axios';


// Créez une instance Axios avec l'URL de base actuelle
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Ajoutez un intercepteur pour inclure le token d'authentification dans les requêtes
export const setupApiInterceptors = (getState) => {
  api.interceptors.request.use(
    (config) => {
      const state = getState();
      const token = state.auth?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Intercepteur de réponse pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Vous pouvez ajouter une logique de gestion des erreurs ici
    return Promise.reject(error);
  }
);



export default api;