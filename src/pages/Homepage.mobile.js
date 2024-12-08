import React, { useState } from 'react';
import backgroundImage from './imagebank/AdobeStock_876092380.jpeg';
import powerBiImage from '../pages/imagebank/powerbi.jpeg';
import quickBooksImage from '../pages/imagebank/qb.jpeg';
import salesforceImage from '../pages/imagebank/salesforce.jpeg';
import slackImage from '../pages/imagebank/slack.jpeg';
import FleetPerformanceChart from '../components/FleetPerformanceChart';
import { Newsletter, ContactForm } from '../components';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import TermsModal from '../components/TermsModal';
import Chatbot from '../components/Chatbot';

import { 
  Car,
  Trophy,          // Remplace Award
  ChartBar,        // Remplace BarChart
  Leaf,
  List,            // Remplace MenuIcon
  X,
  FileText,
  Bell,
  Users,
  Envelope,        // Remplace Mail
  Chat,            // Remplace MessageSquare
  Check,
  PaperPlane,      // Remplace Send
  TwitterLogo,     // Remplace BrandTwitter
  LinkedinLogo,    // Remplace BrandLinkedin
  FacebookLogo,    // Remplace BrandFacebook
  InstagramLogo    // Remplace BrandInstagram
} from 'phosphor-react';


import {
  Layout,
  Section,
  StatsDashboard,
  MetricCard,
  AuthButtons
} from '../components';
import DashboardUtilisateur from '../components/DashboardUtilisateur';
import DashboardEntreprise from '../components/DashboardEntreprise';

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

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

// Les différentes sections avec leurs icônes
const NAV_ITEMS = [
  { id: 'accueil', label: 'Accueil', icon: Leaf },
  { id: 'fonctionnalites', label: 'Fonctionnalités', icon: FileText },
  { id: 'statistiques', label: 'Statistiques', icon: ChartBar },
  { id: 'integrations', label: 'Intégrations', icon: Trophy },
  { id: 'contact', label: 'Contact', icon: Envelope }
];

// Couleurs pour les blocs verticaux mobile selon la section
const colorMapping = {
  fonctionnalites: 'bg-gradient-to-r from-primary to-tealBlue',    // #249b5b à #249b97
  statistiques: 'bg-gradient-to-r from-tealBlue to-deepBlue',      // #249b97 à #24649b
  integrations: 'bg-gradient-to-r from-deepBlue to-intenseBlue',  // #24649b à #24289b
  contact: 'bg-gradient-to-r from-intenseBlue to-vibrantViolet',  // #24289b à #5b249b
};

const FEATURES = [
  {
    title: "Rapports Automatisés",
    description: "Générez des rapports détaillés sur vos performances environnementales",
    icon: FileText,
    bgColor: "bg-primary/20" // Utilisation de primary avec opacité
  },
  {
    title: "Alertes Intelligentes",
    description: "Recevez des notifications personnalisées sur les événements importants",
    icon: Bell,
    bgColor: "bg-tealBlue/20" // Utilisation de tealBlue avec opacité
  },
  {
    title: "Gestion d'Équipe",
    description: "Gérez les accès et les rôles de votre équipe efficacement",
    icon: Users,
    bgColor: "bg-primary/20" // Utilisation de primary avec opacité
  }
];

const HomePage = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardUser, setIsDashboardUser] = useState(true);
  const navigate = useNavigate();
  
  const handleConnexion = () => navigate('/connexion');
  const handleInscription = () => navigate('/inscription');
  const handleContact = () => navigate('/contact');
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleDashboard = () => {
    setIsDashboardUser(!isDashboardUser);
  };

  return (
    <Layout>
      <ToastContainer />
      <StatsDashboard fleetCount={247} co2Reduction={2450} />

      <header className="fixed w-full top-0 left-0 z-50 bg-primary backdrop-blur-sm bg-opacity-80 border-b border-gray-200">
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold text-white">EchoTrack</span>
            </div>

            {/* Navigation Desktop (visible sur écrans moyens et supérieurs) */}
            <nav className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map(({ id, label }) => (
                <button 
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-white hover:text-secondary font-medium transition-colors text-lg px-4 py-2"
                >
                  {label}
                </button>
              ))}
            </nav>

            <AuthButtons 
              onLogin={handleConnexion}
              onStarted={handleInscription}
            />

            {/* Bouton Menu Mobile (visible uniquement sur petits écrans) */}
            <button 
              className="block md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu mobile"
            >
              {isMenuOpen ? (
                <X size={24} weight="bold" className="text-secondary" />
              ) : (
                <List size={24} weight="bold" className="text-secondary" />
              )}
            </button>
          </div>

          {/* Menu Mobile (visible uniquement sur petits écrans) */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10}}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden absolute top-full left-0 w-full bg-primary border-b border-gray-200 py-8 z-50"
            >
              <nav className="flex flex-col space-y-6 px-6 text-center">
                {NAV_ITEMS.map(({ id, label }) => (
                  <button 
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-white hover:text-secondary font-medium transition-colors text-xl py-3"
                  >
                    {label}
                  </button>
                ))}
                <button 
                  onClick={handleConnexion}
                  className="text-secondary font-medium hover:text-secondary-dark transition-colors text-xl py-3"
                >
                  Connexion
                </button>
                <button 
                  onClick={handleInscription}
                  className="w-full py-3 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-dark transition-colors text-xl"
                >
                  Commencer
                </button>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      <main className="pt-24">
        {/* Accueil Section */}
        <Section 
          id="accueil" 
          className="bg-white border-b min-h-[80vh] flex items-center relative overflow-hidden"
        >
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

          <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

          <motion.div 
            className="max-w-3xl mx-auto text-center relative z-20"
            variants={containerVariant}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              variants={itemVariant}
            >
              Gestion Intelligente de Flotte & Impact Environnemental
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-100 mb-8"
              variants={itemVariant}
            >
              Solution complète pour optimiser votre flotte et réduire votre empreinte carbone
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={itemVariant}
            >
              <button 
                onClick={handleInscription}
                className="px-10 py-4 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-dark transition-colors transform hover:scale-105 text-lg"
              >
                Démarrer Gratuitement
              </button>
              <button 
                onClick={handleContact}
                className="px-10 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-secondary transition-colors transform hover:scale-105 text-lg"
              >
                Demander une Démo
              </button>
            </motion.div>
          </motion.div>
        </Section>

        {/* Navigation rapide en mobile avec couleurs dynamiques */}
        <Section className="md:hidden py-5 px-4 bg-primary border-b">
          <div className="flex flex-col space-y-4">
            {NAV_ITEMS.filter(item => item.id !== 'accueil').map((item, index, array) => {
              const Icon = item.icon || Leaf;
              const gradient = colorMapping[item.id] || 'bg-gray-300';

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative
                    rounded-lg 
                    h-[300px] w-full
                    px-6 
                    flex flex-col items-center justify-center
                    hover:shadow-md 
                    transition-shadow 
                    focus:outline-none 
                    active:scale-95
                    text-center
                    overflow-hidden
                  `}
                >
                  {/* Couleur de fond dynamique */}
                  <div className={`${gradient} absolute inset-0`}></div>
                  
                  {/* Superposition grise */}
                  <div className="absolute inset-0 bg-gray-500 bg-opacity-40"></div>
                  
                  {/* Contenu du bouton */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    {/* Icône avec fond noir et icône blanche, plus grande */}
                    <div className="w-16 h-12 bg-black rounded-full flex items-center justify-center mb-6 shadow-md">
                      <Icon size={32} className="text-white" />
                    </div>
                    
                    {/* Texte plus grand, en blanc, centré */}
                    <span className="text-3xl font-bold text-white">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Section Fonctionnalités avec dégradé et overlay pour lisibilité */}
        <Section 
          id="fonctionnalites" 
          className={`${colorMapping['fonctionnalites']} relative py-24 text-white`}
        >
          <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm z-10"></div>
          <motion.div
            className="max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-12 relative z-20"
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              <motion.div 
                variants={fadeIn} 
                className="
                  bg-white bg-opacity-80 
                  rounded-2xl 
                  p-6 lg:p-8 xl:p-10 
                  shadow-md
                  flex 
                  flex-col
                  space-y-8
                  text-gray-900
                "
              >
                <h3 className="text-2xl font-bold">
                  Tableau de Bord Intelligent
                </h3>
                
                <p className="text-lg leading-relaxed">
                  Visualisez en temps réel les performances de votre flotte avec des métriques essentielles et des analyses prédictives avancées.
                </p>
                
                <ul className="space-y-4">
                  {FEATURES.map((feature, index) => (
                    <motion.li
                      key={index}
                      className={`
                        flex items-center gap-4 
                        ${feature.bgColor} p-4 
                        rounded-xl 
                        hover:shadow-lg 
                        transition-shadow 
                        cursor-pointer
                      `}
                      variants={slideUp}
                    >
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md">
                        <feature.icon size={24} className="text-gray-900" />
                      </div>
                      <div className="flex flex-col text-gray-900">
                        <p className="font-semibold text-lg">{feature.title}</p>
                        <p className="text-sm mt-1">{feature.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                variants={fadeIn} 
                className="
                  lg:col-span-3
                  rounded-3xl 
                  shadow-lg 
                  p-4
                  flex flex-col items-center
                  bg-white bg-opacity-80
                "
              >
                <div className="flex justify-between items-center mb-4 w-full text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Leaf size={24} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-lg">Nos Fonctionnalités.</h4>
                  </div>
                  <button
                    onClick={toggleDashboard}
                    className="px-4 py-2 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-dark transition-all duration-300 text-lg"
                  >
                    {isDashboardUser ? 'Vue Utilisateur' : 'Vue Entreprise'}
                  </button>
                </div>
                
                <div 
                  className="
                    bg-gray-100 
                    rounded-2xl 
                    shadow-inner 
                    w-full 
                    h-auto 
                    max-h-[80vh] 
                    overflow-auto
                    p-4
                  "
                >
                  <div 
                    className="
                      bg-white 
                      rounded-xl 
                      shadow-md 
                      p-4 
                      h-full 
                      flex 
                      flex-col 
                      overflow-hidden
                    "
                  >
                    {isDashboardUser ? <DashboardUtilisateur /> : <DashboardEntreprise />}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Section>

        {/* Section Intégrations */}
        <Section 
          id="integrations" 
          className={`${colorMapping['integrations']} relative py-24 text-white`}
        >
          <div className="absolute inset-0 bg-secondary/30 backdrop-blur-sm z-10"></div>
          <motion.div 
            className="max-w-8xl mx-auto relative z-20"
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-center mb-16">
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
                  className="group bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  variants={itemVariant}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="relative w-full h-40 flex items-center justify-center">
                    <img
                      src={partner.imagePath}
                      alt={`${partner.name} Integration`}
                      className="w-32 h-32 object-contain object-center transition-transform duration-300 group-hover:scale-110"
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
          className={`${colorMapping['statistiques']} relative py-24 text-white`}
        >
          <div className="absolute inset-0 bg-secondary/30 backdrop-blur-sm z-10"></div>
          <div className="max-w-7xl mx-auto relative z-20">
            <motion.div 
              className="grid lg:grid-cols-3 gap-8"
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariant} className="col-span-1">
                <MetricCard icon={Car} title="Performance Flotte" className="h-full bg-white bg-opacity-80 text-gray-900">
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl p-4">
                    <FleetPerformanceChart />
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    Mise à jour en temps réel
                  </div>
                </MetricCard>
              </motion.div>

              <motion.div variants={itemVariant} className="col-span-1">
                <MetricCard icon={ChartBar} title="Réduction Émissions" className="h-full bg-white bg-opacity-80 text-gray-900">
                  <div className="space-y-6 p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Objectif annuel</span>
                      <span className="text-xl font-bold text-secondary">-30%</span>
                    </div>
                    <div className="relative pt-2">
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <motion.div 
                          className="bg-secondary h-3 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: '65%' }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="absolute -right-2 top-0 transform -translate-y-full">
                        <span className="bg-secondary text-white text-xs px-2 py-1 rounded">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-medium text-secondary">65% de l'objectif atteint</span>
                    </div>
                  </div>
                </MetricCard>
              </motion.div>

              <motion.div variants={itemVariant} className="col-span-1">
                <MetricCard icon={Trophy} title="Certifications" className="h-full bg-white bg-opacity-80 text-gray-900">
                  <div className="space-y-4 p-4">
                    {[
                      { name: "ISO 14001", status: "Vérifié", date: "2024" },
                      { name: "Green Fleet", status: "Certifié", date: "2024" },
                      { name: "ECO2 Standard", status: "Premium", date: "2024" }
                    ].map((cert) => (
                      <div 
                        key={cert.name}
                        className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{cert.name}</span>
                          <span className="text-sm text-gray-500">{cert.date}</span>
                        </div>
                        <span className="flex items-center gap-2 text-secondary">
                          <Check size={20} />
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
          className={`${colorMapping['contact']} relative py-24 text-white`}
        >
          <div className="absolute inset-0 bg-secondary/30 backdrop-blur-sm z-10"></div>
          <div className="max-w-2xl mx-auto relative z-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Contactez-nous</h2>
              <p className="text-xl text-white">Nous sommes là pour répondre à vos questions</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              // Démonstration
              setTimeout(() => {
                alert('Message envoyé avec succès (Demo)');
              }, 1000);
            }} className="space-y-6">
              <div className="relative">
                <Envelope size={20} weight="regular" className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                  required
                />
              </div>

              <div className="relative">
                <Envelope size={20} weight="regular" className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                  required
                />
              </div>

              <div className="relative">
                <Chat size={20} weight="regular" className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                <textarea
                  placeholder="Votre message"
                  rows="5"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <PaperPlane size={16} />
                Envoyer le message
              </button>
            </form>
          </div>
        </Section>

        {/* Section Newsletter */}
        <Section className="bg-gradient-to-r from-gray-100 to-gray-200 py-24">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Restez Informé</h3>
            <p className="text-gray-600 mb-6">Abonnez-vous à notre newsletter pour recevoir nos dernières actualités</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              // Démonstration
              setTimeout(() => {
                alert('Inscription réussie (Demo)');
              }, 1000);
            }} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 text-lg"
              >
                <PaperPlane size={16} />
                S'abonner
              </button>
            </form>
          </div>
        </Section>
      </main>

  {/* Remplacement des Icônes Sociales dans le Footer */}
  <footer className="py-8 bg-gray-900">
          <div className="container mx-auto px-4 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} EchoTrack. Tous droits réservés.</p>
            
            <div className="flex justify-center space-x-6 my-6">
              <a 
                href="https://twitter.com/echotrack" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <TwitterLogo size={24} className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="https://linkedin.com/company/echotrack" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <LinkedinLogo size={24} className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a 
                href="https://facebook.com/echotrack" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FacebookLogo size={24} className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a 
                href="https://instagram.com/echotrack" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <InstagramLogo size={24} className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>

          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/privacy')}
              className="hover:text-white transition-colors"
            >
              Politique de Confidentialité
            </button>
            <span>|</span>
            <button
              onClick={() => setIsTermsModalOpen(true)}
              className="hover:text-white transition-colors"
            >
              Conditions d'Utilisation
            </button>
          </div>
        </div>
      </footer>

      {/* Animation du chatbot */}
      <motion.div
        className="fixed bottom-16 right-7 z-50 cursor-pointer"
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
      >
        <Chatbot />
      </motion.div>

      <TermsModal 
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </Layout>
  );
};

export default HomePage;
