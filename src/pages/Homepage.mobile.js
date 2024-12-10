// Core React and library imports
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';

// Image imports
import backgroundImage from './imagebank/AdobeStock_876092380.jpeg';
import powerBiImage from '../pages/imagebank/powerbi.jpeg';
import quickBooksImage from '../pages/imagebank/qb.jpeg';
import salesforceImage from '../pages/imagebank/salesforce.jpeg';
import slackImage from '../pages/imagebank/slack.jpeg';

// Component imports
import { Newsletter, ContactForm } from '../components';
import TermsModal from '../components/TermsModal';
import Chatbot from '../components/Chatbot';
import {
  Layout,
  Section,
  StatsDashboard,
  MetricCard,
  AuthButtons
} from '../components';

// Icon imports
import { 
  Car,
  Trophy,
  ChartBar,
  Leaf,
  List,
  X,
  FileText,
  Bell,
  Users,
  Envelope,
  Chat,
  Check,
  PaperPlane,
  TwitterLogo,
  LinkedinLogo,
  FacebookLogo,
  InstagramLogo
} from 'phosphor-react';

// Lazy loaded components
const FleetPerformanceChart = lazy(() => import('../components/FleetPerformanceChart'));
const DashboardUtilisateur = lazy(() => import('../components/DashboardUtilisateur'));
const DashboardEntreprise = lazy(() => import('../components/DashboardEntreprise'));

// Animation variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const slideUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

// Définition des éléments de navigation
const NAV_ITEMS = [
  { id: 'accueil', label: 'Accueil', icon: Leaf },
  { id: 'fonctionnalites', label: 'Fonctionnalités', icon: FileText },
  { id: 'statistiques', label: 'Statistiques', icon: ChartBar },
  { id: 'integrations', label: 'Intégrations', icon: Trophy },
  { id: 'contact', label: 'Contact', icon: Envelope }
];

// Couleurs pour les blocs verticaux mobile selon la section
const colorMapping = {
  fonctionnalites: 'bg-gradient-to-r from-primary to-tealBlue',
  statistiques: 'bg-gradient-to-r from-tealBlue to-deepBlue',
  integrations: 'bg-gradient-to-r from-deepBlue to-intenseBlue',
  contact: 'bg-gradient-to-r from-intenseBlue to-vibrantViolet',
};

// Définition des fonctionnalités
const FEATURES = [
  {
    title: "Rapports Automatisés",
    description: "Générez des rapports détaillés sur vos performances environnementales",
    icon: FileText,
    bgColor: "bg-primary/20"
  },
  {
    title: "Alertes Intelligentes",
    description: "Recevez des notifications personnalisées sur les événements importants",
    icon: Bell,
    bgColor: "bg-tealBlue/20"
  },
  {
    title: "Gestion d'Équipe",
    description: "Gérez les accès et les rôles de votre équipe efficacement",
    icon: Users,
    bgColor: "bg-primary/20"
  }
];

// Définition des partenaires d'intégration
const INTEGRATION_PARTNERS = [
  {
    id: 1,
    name: "Power BI",
    imagePath: powerBiImage
  },
  {
    id: 2,
    name: "QuickBooks",
    imagePath: quickBooksImage
  },
  {
    id: 3,
    name: "Salesforce",
    imagePath: salesforceImage
  },
  {
    id: 4,
    name: "Slack",
    imagePath: slackImage
  }
];

// Composant Bottom Navigation pour mobile
const BottomNav = ({ currentSection, scrollToSection, handleButtonClick }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md z-50 md:hidden m-0 p-0">
      <div className="flex justify-around">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleButtonClick(() => scrollToSection(id))}
            className={`flex flex-col items-center justify-center py-2 w-full transition-transform active:scale-95 ${
              currentSection === id ? 'text-primary' : 'text-gray-600'
            }`}
            aria-label={label}
            style={{
              background: currentSection === id ? '#FFA500' : 'white',
              color: currentSection === id ? 'white' : '#333',
              textShadow: '0px 1px 2px rgba(0,0,0,0.5)', // Améliore le contraste
            }}
          >
            <Icon size={24} className={`${currentSection === id ? 'text-white' : 'text-black'} mx-auto`} />
            <span className="text-sm font-medium tracking-wide">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// Composant principal HomePage
const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardUser, setIsDashboardUser] = useState(true);
  const [currentSection, setCurrentSection] = useState('accueil');
  const navigate = useNavigate();
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  
  // État pour gérer la visibilité du modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction de navigation
  const handleConnexion = () => navigate('/connexion');
  const handleInscription = () => navigate('/inscription');
  const handleContact = () => navigate('/contact');

  // Fonction pour scroller vers une section spécifique
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Fonction pour basculer entre les dashboards
  const toggleDashboard = (view) => {
    if (view === 'user') {
      setIsDashboardUser(true);
    } else {
      setIsDashboardUser(false);
    }
  };

  // Gestion du scroll pour déterminer la section actuelle
  const handleScroll = () => {
    const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    for (let section of sections) {
      if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
        setCurrentSection(section.id);
        break;
      }
    }
  };

  // Ajout de l'écouteur de scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestion des retours haptiques
  const handleButtonClick = (callback) => {
    if (navigator.vibrate) {
      navigator.vibrate(100); // Vibre pendant 100ms
    }
    callback();
  };

  // Fonction de gestionnaire combinée pour la navigation desktop
  const handleNavClick = (id) => {
    handleButtonClick(() => scrollToSection(id));
  };

  return (
    <Layout>
      <ToastContainer />
      <StatsDashboard fleetCount={247} co2Reduction={2450} />

      {/* Header */}
      <header className="fixed w-full top-0 left-0 z-50 bg-primary backdrop-blur-sm bg-opacity-80 border-b border-gray-200 h-24">
        <div className="container mx-auto px-0 relative">
          <div className="flex items-center justify-between py-1 md:py-3">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 md:w-8 md:h-8 text-white" />
              <span className="text-xl md:text-2xl font-bold text-white">EchoTrack</span>
            </div>

            {/* Navigation Desktop (visible sur écrans moyens et supérieurs) */}
            <nav className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map(({ id, label }) => (
                <button 
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="text-white hover:text-orange-500 font-medium transition-colors text-lg px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded shadow-md"
                  aria-label={label}
                >
                  {label}
                </button>
              ))}
            </nav>

            <AuthButtons 
              onLogin={() => handleButtonClick(handleConnexion)}
              onStarted={() => handleButtonClick(handleInscription)}
            />

            {/* Bouton Menu Mobile (visible uniquement sur petits écrans) */}
            <button 
              className="block md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu mobile"
            >
              {isMenuOpen ? (
                <X size={20} weight="bold" className="text-orange-500" />
              ) : (
                <List size={20} weight="bold" className="text-orange-500" />
              )}
            </button>

            {/* Bouton pour ouvrir le modal du tableau de bord */}
            <button 
              className="hidden md:block ml-4 px-4 py-2 bg-orange-500 text-white font-medium rounded-lg shadow-lg hover:bg-orange-600 transition-colors active:scale-95"
              onClick={() => setIsModalOpen(true)}
            >
              Tableau de Bord
            </button>
          </div>

          {/* Menu Mobile (visible uniquement sur petits écrans) */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 w-full bg-primary border-b border-gray-200 py-4 z-50 m-0 p-0"
            >
              <nav className="flex flex-col space-y-6 px-6 text-center">
                {NAV_ITEMS.map(({ id, label }) => (
                  <button 
                    key={id}
                    onClick={() => handleButtonClick(() => scrollToSection(id))}
                    className="text-white hover:text-orange-500 font-medium transition-colors text-lg py-2"
                  >
                    {label}
                  </button>
                ))}
                <div className="flex flex-col space-y-2 mt-4">
                  <button 
                    onClick={() => handleButtonClick(handleConnexion)}
                    className="text-orange-500 font-medium hover:text-orange-600 transition-colors text-lg py-2"
                  >
                    Connexion
                  </button>
                  <button 
                    onClick={() => handleButtonClick(handleInscription)}
                    className="w-full py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors text-lg"
                  >
                    Commencer
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Navigation rapide en mobile avec couleurs dynamiques */}
      <Section className="md:hidden pt-24 py-6 px-4 bg-primary border-b">
        <div className="flex flex-col space-y-4">
          {NAV_ITEMS.filter(item => item.id !== 'accueil').map((item) => {
            const Icon = item.icon || Leaf;
            const gradient = colorMapping[item.id] || 'bg-gray-300';

            return (
              <button
                key={item.id}
                onClick={() => handleButtonClick(() => scrollToSection(item.id))}
                className={`
                  relative
                  rounded-lg 
                  h-24 sm:h-32 
                  w-full
                  px-4 
                  my-3         
                  flex flex-col items-center justify-center
                  hover:shadow-lg  
                  transition-all duration-300
                  focus:outline-none 
                  active:scale-95
                  text-center
                  overflow-hidden
                `}
              >
                {/* Couleur de fond dynamique */}
                <div className={`${gradient} absolute inset-0`}></div>
                
                {/* Superposition grise plus légère */}
                <div className="absolute inset-0 bg-gray-500 bg-opacity-20"></div>
                
                {/* Contenu du bouton avec plus d'espace */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
                  {/* Icône avec fond noir et icône blanche */}
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg">
                    <Icon size={28} className="text-white mx-auto" />
                  </div>
                  
                  {/* Texte plus grand et plus espacé */}
                  <span className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      <main className="pt-24 md:pt-24">
        {/* Accueil Section */}
        <Section 
          id="accueil" 
          className="min-h-screen flex items-center relative overflow-hidden"
        >
          {/* Image de fond */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(0.7)',
            }}
          />

          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

          {/* Contenu principal */}
          <motion.div 
            className="max-w-3xl mx-auto text-center relative z-20 px-4 sm:px-6 lg:px-8"
            variants={containerVariant}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
              variants={itemVariant}
            >
              Gestion Intelligente de Flotte & Impact Environnemental
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8"
              variants={itemVariant}
            >
              Solution complète pour optimiser votre flotte et réduire votre empreinte carbone
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={itemVariant}
            >
              <button 
                onClick={() => handleButtonClick(handleInscription)}
                className="px-6 sm:px-10 py-3 sm:py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors transform hover:scale-105 text-lg"
              >
                Démarrer Gratuitement
              </button>
              <button 
                onClick={() => handleButtonClick(handleContact)}
                className="px-6 sm:px-10 py-3 sm:py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-orange-500 transition-colors transform hover:scale-105 text-lg"
              >
                Demander une Démo
              </button>
            </motion.div>
          </motion.div>
        </Section>

        {/* Section Fonctionnalités */}
        <Section 
          id="fonctionnalites" 
          className={`${colorMapping['fonctionnalites']} relative py-8 md:py-16 text-white`}
        >
          <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm z-10"></div>
          <motion.div
            className="max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-12 relative z-20"
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
              <motion.div 
                variants={fadeIn} 
                className="
                  bg-white bg-opacity-80 
                  rounded-2xl 
                  p-2 sm:p-4 lg:p-6 
                  shadow-sm
                  flex 
                  flex-col
                  space-y-2
                  text-gray-900
                "
              >
                <h3 className="text-lg sm:text-xl font-bold">
                  Tableau de Bord Intelligent
                </h3>
                
                <p className="text-xs sm:text-sm leading-relaxed">
                  Visualisez en temps réel les performances de votre flotte avec des métriques essentielles et des analyses prédictives avancées.
                </p>
                
                <ul className="space-y-1">
                  {FEATURES.map((feature, index) => (
                    <motion.li
                      key={index}
                      className={`
                        flex items-center gap-2 
                        ${feature.bgColor} p-2 
                        rounded-lg 
                        hover:shadow-md 
                        transition-shadow 
                        cursor-pointer
                      `}
                      variants={slideUp}
                    >
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md">
                        <feature.icon size={16} className="text-gray-900 mx-auto" />
                      </div>
                      <div className="flex flex-col text-gray-900">
                        <p className="font-semibold text-sm">{feature.title}</p>
                        <p className="text-xs mt-0.5">{feature.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                variants={fadeIn} 
                className="
                  lg:col-span-3
                  rounded-2xl 
                  shadow-sm 
                  p-2 sm:p-4 lg:p-6
                  flex 
                  flex-col 
                  items-center
                  bg-white bg-opacity-80
                "
              >
                <div className="flex justify-between items-center mb-3 w-full text-gray-900">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <Leaf size={16} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base">Nos Fonctionnalités</h4>
                  </div>
                  <div className="flex space-x-2">
                    {/* Bouton Vue Utilisateur */}
                    <button
                      onClick={() => handleButtonClick(() => toggleDashboard('user'))}
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all duration-300 text-xs sm:text-sm active:scale-95 ${
                        isDashboardUser ? 'opacity-100' : 'opacity-50'
                      }`}
                    >
                      Vue Utilisateur
                    </button>
                    {/* Bouton Vue Entreprise */}
                    <button
                      onClick={() => handleButtonClick(() => toggleDashboard('enterprise'))}
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all duration-300 text-xs sm:text-sm active:scale-95 ${
                        !isDashboardUser ? 'opacity-100' : 'opacity-50'
                      }`}
                    >
                      Vue Entreprise
                    </button>
                  </div>
                </div>
                
                <div 
                  className="
                    bg-gray-100 
                    rounded-lg 
                    shadow-inner 
                    w-full 
                    h-auto 
                    max-h-[50vh] sm:max-h-[70vh] 
                    overflow-auto
                    p-2 sm:p-3
                  "
                >
                  <div 
                    className="
                      bg-white 
                      rounded-lg 
                      shadow-sm 
                      p-2 sm:p-3 
                      h-full 
                      flex 
                      flex-col 
                      overflow-hidden
                    "
                  >
                    <Suspense fallback={<div>Chargement du tableau de bord...</div>}>
                      {isDashboardUser ? <DashboardUtilisateur /> : <DashboardEntreprise />}
                    </Suspense>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Section>

        {/* Section Intégrations */}
        <Section 
          id="integrations" 
          className={`${colorMapping['integrations']} relative py-20 text-white`}
        >
          <div className="absolute inset-0 bg-secondary/30 backdrop-blur-sm z-10"></div>
          <motion.div 
            className="max-w-8xl mx-auto relative z-20"
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-center mb-12">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                variants={itemVariant}
              >
                Intégrations & Connectivité
              </motion.h2>
              <motion.p 
                className="text-xl max-w-2xl mx-auto text-white"
                variants={itemVariant}
              >
                Une solution qui s'intègre parfaitement à votre écosystème existant
              </motion.p>
            </div>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
              variants={containerVariant}
            >
              {INTEGRATION_PARTNERS.map((partner) => (
                <motion.div
                  key={partner.id}
                  className="group bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
                  variants={itemVariant}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="relative w-full h-40 flex items-center justify-center">
                    <img
                      src={partner.imagePath}
                      alt={`${partner.name} Integration`}
                      className="w-24 h-24 object-contain object-center transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/200/100";
                      }}
                    />
                  </div>
                  <div className="mt-4 text-center text-gray-900">
                    <h3 className="font-semibold">{partner.name}</h3>
                    <p className="mt-2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {partner.category || 'Intégration complète'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Section>

        {/* Section Statistiques */}
        <Section 
          id="statistiques" 
          className={`${colorMapping['statistiques']} relative py-20 text-white`}
        >
          <div className="absolute inset-0 bg-secondary/30 backdrop-blur-sm z-10"></div>
          <div className="max-w-7xl mx-auto relative z-20">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariant} className="col-span-1">
                <MetricCard icon={Car} title="Performance Flotte" className="h-full bg-white bg-opacity-80 text-gray-900 shadow-sm">
                  <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg p-2">
                    <Suspense fallback={<div>Chargement...</div>}>
                      <FleetPerformanceChart />
                    </Suspense>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Mise à jour en temps réel
                  </div>
                </MetricCard>
              </motion.div>

              <motion.div variants={itemVariant} className="col-span-1">
                <MetricCard icon={ChartBar} title="Réduction Émissions" className="h-full bg-white bg-opacity-80 text-gray-900 shadow-sm">
                  <div className="space-y-4 p-2 sm:p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Objectif annuel</span>
                      <span className="text-lg font-bold text-secondary">-30%</span>
                    </div>
                    <div className="relative pt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="bg-secondary h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: '65%' }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="absolute -right-2 top-0 transform -translate-y-full">
                        <span className="bg-secondary text-white text-xs px-2 py-0.5 rounded">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-medium text-secondary">65% de l'objectif atteint</span>
                    </div>
                  </div>
                </MetricCard>
              </motion.div>

              <motion.div variants={itemVariant} className="col-span-1">
                <MetricCard icon={Trophy} title="Certifications" className="h-full bg-white bg-opacity-80 text-gray-900 shadow-sm">
                  <div className="space-y-2 p-2 sm:p-3">
                    {[
                      { name: "ISO 14001", status: "Vérifié", date: "2024" },
                      { name: "Green Fleet", status: "Certifié", date: "2024" },
                      { name: "ECO2 Standard", status: "Premium", date: "2024" }
                    ].map((cert) => (
                      <div 
                        key={cert.name}
                        className="group flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 text-sm">{cert.name}</span>
                          <span className="text-xs text-gray-500">{cert.date}</span>
                        </div>
                        <span className="flex items-center gap-1 text-secondary text-xs">
                          <Check size={16} />
                          <span className="font-medium">{cert.status}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </MetricCard>
              </motion.div>
            </motion.div>
          </div>
        </Section>

        {/* Section Contact */}
        <Section 
          id="contact" 
          className={`${colorMapping['contact']} relative py-20 text-white`}
        >
          <div className="absolute inset-0 bg-secondary/30 backdrop-blur-sm z-10"></div>
          <div className="max-w-2xl mx-auto relative z-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Contactez-nous</h2>
              <p className="text-lg text-white">Nous sommes là pour répondre à vos questions</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              // Démonstration
              setTimeout(() => {
                alert('Message envoyé avec succès (Demo)');
              }, 1000);
            }} className="space-y-6">
              <div className="relative">
                <Envelope size={16} weight="regular" className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 text-sm"
                  required
                />
              </div>

              <div className="relative">
                <Envelope size={16} weight="regular" className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 text-sm"
                  required
                />
              </div>

              <div className="relative">
                <Chat size={16} weight="regular" className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                <textarea
                  placeholder="Votre message"
                  rows="4"
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 text-sm active:scale-95"
              >
                <PaperPlane size={16} />
                Envoyer le message
              </button>
            </form>
          </div>
        </Section>

        {/* Section Newsletter */}
        <Section className="bg-gradient-to-r from-gray-100 to-gray-200 py-20">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Restez Informé</h3>
            <p className="text-gray-600 mb-5">Abonnez-vous à notre newsletter pour recevoir nos dernières actualités</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              // Démonstration
              setTimeout(() => {
                alert('Inscription réussie (Demo)');
              }, 1000);
            }} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 text-sm"
                required
              />
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 text-sm active:scale-95"
              >
                <PaperPlane size={16} />
                S'abonner
              </button>
            </form>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-gray-900">
        <div className="container mx-auto px-4 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} EchoTrack. Tous droits réservés.</p>
          
          <div className="flex justify-center space-x-4 my-4">
            <a 
              href="https://twitter.com/echotrack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <TwitterLogo size={20} className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a 
              href="https://linkedin.com/company/echotrack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <LinkedinLogo size={20} className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a 
              href="https://facebook.com/echotrack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FacebookLogo size={20} className="w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a 
              href="https://instagram.com/echotrack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <InstagramLogo size={20} className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>

          <div className="flex justify-center space-x-3">
            <button 
              onClick={() => handleButtonClick(() => navigate('/privacy'))}
              className="hover:text-white transition-colors text-xs"
            >
              Politique de Confidentialité
            </button>
            <span>|</span>
            <button
              onClick={() => handleButtonClick(() => setIsTermsModalOpen(true))}
              className="hover:text-white transition-colors text-xs"
            >
              Conditions d'Utilisation
            </button>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation pour mobile */}
      <BottomNav 
        currentSection={currentSection} 
        scrollToSection={scrollToSection} 
        handleButtonClick={handleButtonClick} 
      />

      {/* Modale des Conditions d'Utilisation */}
      <TermsModal 
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      {/* Modale du Tableau de Bord */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} // Fermer en cliquant sur le fond
        >
          <div 
            className="bg-white w-11/12 max-w-2xl p-6 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // Empêcher la fermeture en cliquant à l'intérieur
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Tableau de Bord</h2>
              <div className="flex space-x-4">
                {/* Bouton Vue Utilisateur */}
                <button
                  onClick={() => handleButtonClick(() => toggleDashboard('user'))}
                  className={`px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors ${
                    isDashboardUser ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  Vue Utilisateur
                </button>
                {/* Bouton Vue Entreprise */}
                <button
                  onClick={() => handleButtonClick(() => toggleDashboard('enterprise'))}
                  className={`px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors ${
                    !isDashboardUser ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  Vue Entreprise
                </button>
              </div>
              <div className="bg-gray-100 rounded-lg shadow-inner w-full h-auto max-h-[70vh] overflow-auto p-4">
                <div className="bg-white rounded-lg shadow-sm p-4 h-full flex flex-col overflow-hidden">
                  <Suspense fallback={<div>Chargement du tableau de bord...</div>}>
                    {isDashboardUser ? <DashboardUtilisateur /> : <DashboardEntreprise />}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
