import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Bell, Users } from 'lucide-react';

const FEATURES = [
  {
    title: "Rapports Automatisés",
    description: "Générez des rapports détaillés sur vos performances environnementales.",
    icon: FileText,
  },
  {
    title: "Alertes Intelligentes",
    description: "Recevez des notifications personnalisées sur les événements importants.",
    icon: Bell,
  },
  {
    title: "Gestion d'Équipe",
    description: "Gérez les accès et les rôles de votre équipe efficacement.",
    icon: Users,
  },
];

const FeaturesSection = () => (
  <section id="fonctionnalites" className="bg-white py-24">
    <motion.div
      className="max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Solutions Complètes de Gestion</h2>
        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
          Une suite d'outils intégrés pour optimiser votre flotte et réduire votre impact environnemental.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => (
          <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <feature.icon className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default FeaturesSection;
