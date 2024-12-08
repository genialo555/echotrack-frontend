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
  Award, 
  BarChart, 
  Leaf, 
  MenuIcon, 
  X, 
  FileText,
  Bell,
  Users,
  Mail,
  MessageSquare,
  Check,
  Send, 
  Twitter,    
  Linkedin,   
  Facebook,   
  Instagram   
} from 'lucide-react';

import {
  Layout,
  Section,
  StatsDashboard,
  Navigation,
  MetricCard,
  AuthButtons
} from '../components';
import DashboardUtilisateur from '../pages/DashboardUtilisateur';
import DashboardEntreprise from '../pages/DashboardEntreprise';

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

const NAV_ITEMS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'fonctionnalites', label: 'Fonctionnalités' },
  { id: 'statistiques', label: 'Statistiques' },
  { id: 'integrations', label: 'Intégrations' },
  { id: 'contact', label: 'Contact' }
];

const FEATURES = [
  {
    title: "Rapports Automatisés",
    description: "Générez des rapports détaillés sur vos performances environnementales",
    icon: FileText
  },
  {
    title: "Alertes Intelligentes",
    description: "Recevez des notifications personnalisées sur les événements importants",
    icon: Bell
  },
  {
    title: "Gestion d'Équipe",
    description: "Gérez les accès et les rôles de votre équipe efficacement",
    icon: Users
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

      <header className="fixed w-full top-0 left-0 z-50 bg-white backdrop-blur-sm bg-opacity-80 border-b border-gray-200">
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold">EchoTrack</span>
            </div>

            <Navigation 
              items={NAV_ITEMS} 
              onItemClick={scrollToSection} 
            />

            <AuthButtons 
              onLogin={handleConnexion}
              onStarted={handleInscription}
            />
      
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <MenuIcon className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10}}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 py-4"
            >
              <nav className="flex flex-col space-y-4 px-4">
                {NAV_ITEMS.map(({ id, label }) => (
                  <button 
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-left text-gray-900 hover:text-green-600 font-medium transition-colors"
                  >
                    {label}
                  </button>
                ))}
                <button 
                  onClick={handleConnexion}
                  className="text-left text-green-600 font-medium hover:text-green-700 transition-colors"
                >
                  Connexion
                </button>
                <button 
                  onClick={handleInscription}
                  className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Commencer
                </button>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      <main className="pt-24">
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
                className="px-8 py-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors transform hover:scale-105"
              >
                Démarrer Gratuitement
              </button>
              <button 
                onClick={handleContact}
                className="px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-green-600 transition-colors transform hover:scale-105"
              >
                Demander une Démo
              </button>
            </motion.div>
          </motion.div>
        </Section>

        {/*
          Ajout de la classe "conteneur-fonctionnalites" ici
          pour pouvoir cibler le CSS plus facilement.
        */}
        <Section id="fonctionnalites" className="bg-white py-36 conteneur-fonctionnalites">
          <motion.div
            className="max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-12"
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              <motion.div 
                variants={fadeIn} 
                className="bg-white rounded-2xl p-6 lg:p-8 xl:p-10 shadow-md elementInterne"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Tableau de Bord Intelligent
                </h3>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Visualisez en temps réel les performances de votre flotte avec des métriques essentielles et des analyses prédictives avancées.
                </p>
                
                <ul className="space-y-4">
                  {[
                    {
                      text: "Suivi en temps réel des émissions CO₂",
                      detail: "Monitoring précis et alertes instantanées",
                      icon: "🌱"
                    },
                    {
                      text: "Analyses comparatives de performance",
                      detail: "Benchmarks et tendances détaillées",
                      icon: "📊"
                    },
                    {
                      text: "Alertes intelligentes",
                      detail: "Notifications personnalisées et proactives",
                      icon: "🔔"
                    }
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl"
                      variants={slideUp}
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">{item.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.text}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              {/*
                Conteneur du dashboard : ici, on remplace la hauteur dynamique en vh
                par une max-height et un overflow auto pour éviter l'étirement.
              */}
              <motion.div 
                variants={fadeIn} 
                className="
                  lg:col-span-3
                  rounded-3xl 
                  shadow-lg 
                  p-4
                  flex flex-col items-center
                  elementInterne
                "
              >
                <div className="flex justify-between items-center mb-4 w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-lg">Nos Fonctionnalités.</h4>
                  </div>
                  <button
                    onClick={toggleDashboard}
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300"
                  >
                    {isDashboardUser ? 'Vue Utilisateur' : 'Vue Entreprise'}
                  </button>
                </div>
                
                {/* 
                  Ici, au lieu de height: calc(100vh - 200px), on met une hauteur max 
                  et un overflow auto pour éviter l'allongement lorsqu'on dézoome.
                */}
                <div 
                  className="bg-gray-100 rounded-2xl shadow-inner w-full overflow-auto"
                  style={{ 
                    maxHeight: '800px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    margin: '0 auto'
                  }}
                >
                  <div 
                    className="bg-white rounded-xl shadow-md flex-1 p-4 overflow-hidden"
                    style={{ width: '100%', height: '100%' }}
                  >
                    {isDashboardUser ? <DashboardUtilisateur /> : <DashboardEntreprise />}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Section>

        <Section id="integrations" className="bg-gray-50 py-42">
          <motion.div 
            className="max-w-8xl mx-auto"
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                variants={itemVariant}
              >
                Intégrations & Connectivité
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-2xl mx-auto"
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
                  className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
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
                  <div className="mt-4 text-center">
                    <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                    <p className="mt-2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {partner.category || 'Intégration complète'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Section>

        <Section id="statistiques" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="grid lg:grid-cols-3 gap-8"
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariant} className="col-span-1">
                <MetricCard icon={Car} title="Performance Flotte" className="h-full">
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl p-4">
                    <FleetPerformanceChart />
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    Mise à jour en temps réel
                  </div>
                </MetricCard>
              </motion.div>

              <motion.div variants={itemVariant} className="col-span-1">
                <MetricCard icon={BarChart} title="Réduction Émissions" className="h-full">
                  <div className="space-y-6 p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Objectif annuel</span>
                      <span className="text-xl font-bold text-green-600">-30%</span>
                    </div>
                    <div className="relative pt-2">
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <motion.div 
                          className="bg-green-600 h-3 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: '65%' }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="absolute -right-2 top-0 transform -translate-y-full">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-medium text-green-600">65% de l'objectif atteint</span>
                    </div>
                  </div>
                </MetricCard>
              </motion.div>

              <motion.div variants={itemVariant} className="col-span-1">
                <MetricCard icon={Award} title="Certifications" className="h-full">
                  <div className="space-y-4 p-4">
                    {[
                      { name: "ISO 14001", status: "Vérifié", date: "2024" },
                      { name: "Green Fleet", status: "Certifié", date: "2024" },
                      { name: "ECO2 Standard", status: "Premium", date: "2024" }
                    ].map((cert) => (
                      <div 
                        key={cert.name}
                        className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{cert.name}</span>
                          <span className="text-sm text-gray-500">{cert.date}</span>
                        </div>
                        <span className="flex items-center gap-2 text-green-600">
                          <Check className="w-5 h-5" />
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

        <Section id="contact" className="bg-white py-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
              <p className="text-xl text-gray-600">Nous sommes là pour répondre à vos questions</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              // Demo submission
              setTimeout(() => {
                alert('Message envoyé avec succès (Demo)');
              }, 1000);
            }} className="space-y-6">
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <MessageSquare className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                <textarea
                  placeholder="Votre message"
                  rows="5"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Envoyer le message
              </button>
            </form>
          </div>
        </Section>

        <Section className="bg-gray-50 py-24">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Restez Informé</h3>
            <p className="text-gray-600 mb-6">Abonnez-vous à notre newsletter pour recevoir nos dernières actualités</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              // Demo submission
              setTimeout(() => {
                alert('Inscription réussie (Demo)');
              }, 1000);
            }} className="flex gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                S'abonner
              </button>
            </form>
          </div>
        </Section>
      </main>

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
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a 
              href="https://linkedin.com/company/echotrack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a 
              href="https://facebook.com/echotrack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Facebook className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a 
              href="https://instagram.com/echotrack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Instagram className="w-6 h-6" />
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
      <TermsModal 
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
      <Chatbot />
    </Layout>
  );
};

export default HomePage;
