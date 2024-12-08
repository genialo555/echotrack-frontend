import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const MetricCard = ({ 
  icon: Icon, 
  title, 
  children, 
  backgroundColor = 'bg-white',
  iconColor = 'text-blue-600',
  iconBackground = 'bg-blue-50',
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${backgroundColor} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${iconBackground}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="w-full">
        {children}
      </div>
    </motion.div>
  );
};

MetricCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  iconColor: PropTypes.string,
  iconBackground: PropTypes.string,
  className: PropTypes.string,
};

export default MetricCard;