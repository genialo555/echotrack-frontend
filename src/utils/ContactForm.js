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
          {status === 'sending' ? 'Envoi...' : 'a bientot'}
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

// ContactForm.js
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API call with timeout
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
        <p className="text-xl text-gray-600">Nous sommes là pour répondre à vos questions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        <div className="relative">
          <Mail className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Votre email"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        <div className="relative">
          <MessageSquare className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message"
            rows="5"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {status === 'sending' ? 'Envoi...' : 'Envoyer le message'}
        </button>

        {status === 'success' && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-center text-green-600">
              Démo : Message reçu ! Nous vous répondrons dans les plus brefs délais.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export { Newsletter, ContactForm };