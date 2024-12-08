import React from 'react';
import { motion } from 'framer-motion';

const INTEGRATION_PARTNERS = [
  { id: 1, name: "Power BI", imagePath: "/images/powerbi.jpeg" },
  { id: 2, name: "QuickBooks", imagePath: "/images/qb.jpeg" },
  { id: 3, name: "Salesforce", imagePath: "/images/salesforce.jpeg" },
  { id: 4, name: "Slack", imagePath: "/images/slack.jpeg" },
];

const IntegrationsSection = () => (
  <section id="integrations" className="bg-gray-50 py-24">
    <motion.div
      className="max-w-7xl mx-auto text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Intégrations & Connectivité</h2>
      <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
        Une solution qui s'intègre parfaitement à votre écosystème existant.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {INTEGRATION_PARTNERS.map((partner) => (
          <motion.div
            key={partner.id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={partner.imagePath}
              alt={`Logo de ${partner.name}`}
              className="max-w-full h-20 object-contain mx-auto"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default IntegrationsSection;
