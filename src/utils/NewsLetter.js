// Newsletter.js
import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API call with timeout
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Restez Informé</h3>
      <p className="text-gray-600 mb-6">Abonnez-vous à notre newsletter pour recevoir nos dernières actualités</p>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          {status === 'sending' ? 'Envoi...' : ''}
        </button>
      </form>
      
      {status === 'success' && (
        <p className="mt-4 text-green-600">
          Démo : Merci de votre inscription ! Dans une version réelle, un email de confirmation vous serait envoyé.
        </p>
      )}
    </div>
  );
};
export default Newsletter;  // This line is crucial