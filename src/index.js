// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import correct de createRoot
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import './styles/variables.css'; // Assurez-vous que ce chemin est correct
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
