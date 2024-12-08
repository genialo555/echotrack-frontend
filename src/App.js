import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import DashboardUtilisateur from './pages/DashboardUtilisateur';
import DashboardEntreprise from './pages/DashboardEntreprise';
import HomePage from './pages/HomePage'; 
import HomePageMobile from './pages/Homepage.mobile';

import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { logout } from './slices/authSlice';

import 'react-toastify/dist/ReactToastify.css';

// Importation du logo
import LogoImage from './styles/logo.png'; // Ajustez le chemin et le nom du fichier selon votre projet

// Composant stylisé pour le logo
const Logo = styled(Link)`
  display: flex;
  align-items: center;
  img {
    height: 70px; /* Ajustez la hauteur selon vos besoins */
    width: 200px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05); /* Effet de zoom léger au survol */
  }

  @media (max-width: 768px) {
    img {
      height: 35px;
    }
  }
`;

const Nav = styled.nav`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: background-color 0.3s ease;
  overflow: hidden; /* Assure que l'overlay ne dépasse pas */

  /* Ajout de l'overlay en bas */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px; /* Hauteur de l'overlay */
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    pointer-events: none; /* Permet de cliquer à travers l'overlay */
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  position: relative;
  z-index: 2; /* Assure que les liens restent au-dessus de l'overlay */

  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    backdrop-filter: blur(4px);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.1;
  }
`;

const NavLinkStyled = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  position: relative;
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.2);

  &:hover {
    opacity: 0.9;
    text-decoration: none;
    background-color: rgba(255, 165, 0, 0.3); /* Orange subtil lors du survol */
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease-in-out;
    backdrop-filter: blur(2px);
  }

  &:hover:after {
    width: 100%;
    left: 0;
  }
`;

const LogoutButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: rgba(255, 165, 0, 0.9); /* Orange vif */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 2; /* Assure que le bouton reste au-dessus de l'overlay */

  &:hover {
    background-color: rgba(255, 140, 0, 0.95); /* Orange plus foncé au survol */
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 165, 0, 1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderNavigation = () => {
    if (!user) return null;

    return (
      <Nav>
        {/* Intégration du logo */}
        <Logo to="/">
          <img src={LogoImage} alt="Echotrack Logo" />
        </Logo>
        
        <NavLinks>
          {user.role === 'USER' && (
            <NavLinkStyled to="/dashboard-utilisateur">
              Dashboard Utilisateur
            </NavLinkStyled>
          )}
          {user.role === 'ADMIN' && (
            <NavLinkStyled to="/dashboard-entreprise">
              Dashboard Entreprise
            </NavLinkStyled>
          )}
        </NavLinks>
        <LogoutButton 
          onClick={handleLogout}
          aria-label="Se déconnecter"
        >
          Se Déconnecter
        </LogoutButton>
      </Nav>
    );
  };

  const isMobile = window.innerWidth < 768; 

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      {renderNavigation()}

      <Routes>
        {/* Routes publiques */}
        <Route
          path="/"
          element={
            <PublicRoute>
              {isMobile ? <HomePageMobile /> : <HomePage />}
            </PublicRoute>
          }
        />
        <Route
          path="/connexion"
          element={
            <PublicRoute>
              <Connexion />
            </PublicRoute>
          }
        />
        <Route
          path="/inscription"
          element={
            <PublicRoute>
              <Inscription />
            </PublicRoute>
          }
        />

        {/* Routes protégées */}
        <Route
          path="/dashboard-utilisateur"
          element={
            <ProtectedRoute requiredRole="USER">
              <DashboardUtilisateur />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-entreprise"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <DashboardEntreprise />
            </ProtectedRoute>
          }
        />

        {/* Route par défaut */}
        <Route 
          path="*" 
          element={
            <PublicRoute>
              {isMobile ? <HomePageMobile /> : <HomePage />}
            </PublicRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
