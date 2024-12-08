// useChatbotLogic.js
import { useGeminiAPI } from "./useGeminiAPI";

export const useChatbotLogic = () => {
  const { fetchRecommendations } = useGeminiAPI();

  const handleUserCommand = async (command) => {
    try {
      const response = await fetchRecommendations(command);

      if (!response || response.length === 0 || response.every(r => r === 'Aucune recommandation trouvée.')) {
        return ["Je n'ai pas trouvé d'information pour cette demande. Soyez plus précis ou reformulez votre question."];
      }

      // Gérer les réponses multiples (exemple - à adapter à vos besoins)
      const formattedResponse = response.map((r, index) => index === 0 ? r : `Alternative ${index}: ${r}`).join('\n\n');

      return [formattedResponse]; // Retourner un tableau avec une seule chaîne

    } catch (error) {
      console.error("Erreur lors du traitement de la demande:", error);
      if (error.message.includes('Network')) {
        return ["Une erreur réseau s'est produite. Veuillez vérifier votre connexion internet."];
      } else if (error.message.includes('API')) {
        return ["Une erreur API s'est produite. Veuillez réessayer plus tard."];
      }
      return ["Je n'ai pas pu traiter votre demande. Veuillez réessayer plus tard ou contacter un administrateur."];
    }
  };

  return { handleUserCommand };
};