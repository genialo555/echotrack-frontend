// src/components/ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  console.log('ProtectedRoute - user:', user);
  console.log('ProtectedRoute - requiredRole:', requiredRole);

  if (!user || !user.data) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = user.data.role;

  if (userRole !== requiredRole) {
    const redirectPath = userRole === 'ADMIN' ? '/dashboard-entreprise' : '/dashboard-utilisateur';
    if (location.pathname !== redirectPath) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
};

export default ProtectedRoute;
