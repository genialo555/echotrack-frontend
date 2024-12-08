// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice'; // Importez le userReducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, // Ajoutez le userReducer ici
    // Ajoutez d'autres reducers ici si nécessaire
  },
});

export default store;