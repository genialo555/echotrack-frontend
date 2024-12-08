// Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTED_MESSAGES = [
  "Quel est l'empreinte carbone d'un vol Paris-New York ?",
  "Comment calculer mon empreinte carbone quotidienne ?",
  "Quels sont les gestes éco-responsables au bureau ?",
  "Impact environnemental du numérique ?",
  "Conseils pour réduire mes déchets"
];

const ErrorAlert = ({ message, details }) => (
  <div className="bg-red-50/90 backdrop-blur-sm border-l-4 border-red-500 p-4 m-2 rounded">
    <div className="flex items-center">
      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
      <div>
        <p className="text-sm text-red-700">{message}</p>
        {details && <p className="text-xs text-red-600 mt-1">{details}</p>}
      </div>
    </div>
  </div>
);

const PhraseCarousel = ({ phrases, onClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setIsAnimating(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="min-h-[48px] flex items-center justify-center px-4 my-1">
      <div className="w-full text-center">
        <button
          onClick={() => onClick(phrases[currentIndex])}
          className={`w-full transform transition-all duration-1000 ease-in-out
            ${isAnimating 
              ? 'opacity-0 translate-y-8' 
              : 'opacity-100 translate-y-0'
            }
            bg-green-600/60 hover:bg-green-600/70 text-green-50 rounded-2xl px-6 py-3 
            backdrop-blur-sm text-sm line-clamp-2 min-h-[48px] flex items-center justify-center
            shadow-sm hover:shadow-md`}
        >
          {phrases[currentIndex]}
        </button>
      </div>
    </div>
  );
};

const formatBotMessage = (message) => {
  // Formatage des titres
  message = message.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-green-700">$1</span>');
  
  // Formatage des sous-sections
  message = message.replace(/\*\*\*(.*?)\*\*\*/g, '<span class="font-semibold text-green-600">$1</span>');
  
  // Conversion des listes avec puces
  message = message.replace(/\* (.*?)(\n|$)/g, '<div class="flex items-center gap-2 my-1"><div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div><span>$1</span></div>');

  // Conversion des listes numérotées
  message = message.replace(/(\d+)\. (.*?)(\n|$)/g, '<div class="flex items-start gap-2 my-1"><span class="min-w-[24px] h-6 flex items-center justify-center bg-green-100 rounded-full text-sm">$1</span><span>$2</span></div>');

  return (
    <div 
      className="space-y-4 font-sans leading-relaxed"
      dangerouslySetInnerHTML={{ 
        __html: message
      }} 
    />
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Bonjour ! Je suis l\'assistant Echotrack. Comment puis-je vous aider ?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [errorDetails, setErrorDetails] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messageContainerRef = useRef(null);
  const dragRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Vous pouvez ajouter des logiques supplémentaires ici si nécessaire
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  const checkContentHeight = () => {
    if (messageContainerRef.current) {
      const scrollHeight = messageContainerRef.current.scrollHeight;
      const shouldExpand = scrollHeight > 320;
      setIsExpanded(shouldExpand);
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      checkContentHeight();
    }
  }, [messages]);

  const handleGeminiError = (error, responseStatus) => {
    let errorMessage = 'Une erreur est survenue lors de la communication avec l\'API Gemini.';
    let details = '';

    if (responseStatus === 403) {
      errorMessage = 'Erreur d\'authentification avec l\'API Gemini.';
      details = 'Vérifiez que la clé API est valide et que le service est activé.';
    } else if (responseStatus === 400) {
      errorMessage = 'Requête invalide à l\'API Gemini.';
      details = 'Le format de la requête n\'est pas correct.';
    }

    setApiError(errorMessage);
    setErrorDetails(details);
    console.error('Erreur Gemini API:', error);
  };

  const handleSuggestionClick = (text) => {
    setUserInput(text);
    sendMessage(text);
  };

  const sendMessage = async (text = userInput) => {
    if (!text.trim()) return;
    if (!API_KEY) {
      setApiError('La clé API Gemini n\'est pas configurée.');
      setErrorDetails('Vérifiez la présence de REACT_APP_GEMINI_API_KEY dans le fichier .env');
      return;
    }

    setMessages(prev => [...prev, { sender: 'user', text: text }]);
    setLoading(true);
    setApiError(null);
    setErrorDetails('');
    setUserInput('');
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: text
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const botResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: botResponse 
        }]);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      handleGeminiError(error, error.response?.status);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "Désolé, je ne peux pas traiter votre demande pour le moment. Un problème technique est survenu." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer le déplacement du Chatbot
  const handleDrag = (event, info) => {
    // Vous pouvez implémenter des logiques supplémentaires ici si nécessaire
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`
              bg-white/90 backdrop-blur-xl rounded-[40px] shadow-2xl flex flex-col 
              w-[400px] ${isExpanded ? 'h-[700px]' : 'h-[500px]'} 
              border border-white/20 overflow-hidden 
              transition-all duration-300
            `}
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDrag}
            // Positionnement réactif
            style={{
              left: window.innerWidth <= 768 ? '50%' : 'auto',
              right: window.innerWidth > 768 ? '1.75rem' : 'auto',
              top: window.innerWidth > 768 ? '1.25rem' : 'auto',
              transform: window.innerWidth <= 768 ? 'translateX(-50%)' : 'none',
            }}
          >
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-green-500/20 rounded-full blur-xl"></div>

            {/* Header du Chatbot avec handle de glisser seulement sur les grands écrans */}
            <div className="bg-gradient-to-r from-green-500/90 to-green-600/90 backdrop-blur-sm p-4 flex justify-between items-center rounded-t-[40px] cursor-move drag-handle">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-full">
                  <MessageCircle className="text-white" size={20} />
                </div>
                <h3 className="text-white font-medium text-lg">Echotrack IA</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Fermer le chatbot"
              >
                <X className="text-white" size={20} />
              </button>
            </div>

            {/* Affichage des erreurs API */}
            {apiError && <ErrorAlert message={apiError} details={errorDetails} />}

            {/* Conteneur des messages */}
            <div 
              ref={messageContainerRef}
              className="flex-1 overflow-y-auto px-6 pt-4 pb-2 space-y-4"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[80%] p-4 ${
                    msg.sender === 'bot'
                      ? 'bg-gray-100/95 rounded-t-[20px] rounded-br-[20px] rounded-bl-[5px] mr-auto'
                      : 'bg-green-600/95 text-white rounded-t-[20px] rounded-bl-[20px] rounded-br-[5px] ml-auto'
                  } shadow-lg backdrop-blur-sm`}
                >
                  {msg.sender === 'bot' ? formatBotMessage(msg.text) : msg.text}
                </div>
              ))}
              {loading && (
                <div className="bg-gray-100/95 rounded-t-[20px] rounded-br-[20px] rounded-bl-[5px] p-4 max-w-[80%] animate-pulse shadow-lg backdrop-blur-sm">
                  <div className="h-4 bg-gray-200/90 rounded-full w-12"></div>
                </div>
              )}
            </div>

            {/* Carousel de messages suggérés */}
            <div className="px-4 pt-1 pb-2">
              <PhraseCarousel 
                phrases={SUGGESTED_MESSAGES}
                onClick={handleSuggestionClick}
              />
            </div>

            {/* Zone de saisie utilisateur */}
            <div className="p-2 backdrop-blur-sm bg-white/60">
              <div className="bg-white/95 backdrop-blur-sm rounded-full flex gap-2 p-1.5 items-center shadow-inner">
                <input
                  type="text"
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && !loading && sendMessage()}
                  placeholder="Écrivez votre message..."
                  className="flex-1 bg-transparent px-3 py-1.5 focus:outline-none text-base text-gray-800"
                  disabled={loading}
                  aria-label="Saisir votre message"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading}
                  className="bg-green-600/90 hover:bg-green-700/90 text-white p-2 rounded-full transition-colors shadow-lg disabled:bg-gray-400/90"
                  aria-label="Envoyer le message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton d'ouverture du Chatbot */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-green-500/90 to-green-600/90 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 relative group"
            aria-label="Ouvrir le chatbot"
          >
            <div className="absolute inset-0 bg-green-400/80 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <MessageCircle size={24} className="relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
