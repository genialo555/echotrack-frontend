// src/utils/useGeminiAPI.js

const geminiApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const defaultModel = 'models/text-bison-001';

if (!geminiApiKey) {
  console.error('La clé API Google Generative AI est manquante. Vérifiez votre fichier .env.');
}

export const useGeminiAPI = (model = defaultModel) => {
  const fetchRecommendations = async (userInput, parameters = {}) => {
    const { temperature = 0.2, top_p = 0.95, ...rest } = parameters;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta2/${model}:generateText?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: { text: userInput },
            temperature,
            top_P: top_p, // Notez le 'P' majuscule ici.
            ...rest
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur API Gemini:', response.status, errorData);
        return [`Erreur API Gemini: ${response.status} ${errorData?.error?.message || ''}`];
      }

      const data = await response.json();

      if (data && data.candidates && data.candidates.length > 0) {
        return data.candidates.map(candidate => candidate.output);
      } else if (data && data.error) {
          console.error('Erreur dans la réponse de l\'API:', data.error);
          return [`Erreur API Gemini: ${data.error.message}`];
      } else {
        return ["Aucune recommandation trouvée."];
      }
    } catch (error) {
      console.error('Erreur réseau lors de la requête API Generative AI :', error);
      return ['Je n’ai pas pu obtenir des recommandations pour le moment. Veuillez vérifier votre connexion internet.'];
    }
  };

  return { fetchRecommendations };
};