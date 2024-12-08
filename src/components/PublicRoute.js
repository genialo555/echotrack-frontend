// src/components/PublicRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (user) {
    const targetPath = user.role === 'ADMIN' 
      ? '/dashboard-entreprise' 
      : '/dashboard-utilisateur';

    // Prevent redirection loops by checking current path
    if (location.pathname === targetPath) {
      return children; // Retourner les enfants au lieu de null
    }

    return (
      <Navigate 
        to={targetPath}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default PublicRoute;
