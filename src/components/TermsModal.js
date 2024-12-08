import React from 'react';
import './TermsModal.css'; // Assurez-vous de créer et d'importer un fichier CSS pour le style

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Conditions Générales d'Utilisation</h2>
        </div>
        
        <div className="modal-body">
          <div className="terms-content">
            <h3>1. Introduction</h3>
            <p>
              Bienvenue sur <strong>Ecotrack</strong>. Ces Conditions Générales d'Utilisation (ci-après "CGU") régissent l'accès et l'utilisation de la plateforme Ecotrack (ci-après "le Service") proposée par <strong>EcoSolutions SARL</strong>, dont le siège social est situé au <strong>123 Rue Verte, 75015 Paris, France</strong>.
            </p>
            <p>
              En utilisant le Service, vous acceptez pleinement ces CGU. Si vous n'acceptez pas ces termes, veuillez ne pas utiliser le Service.
            </p>
            
            <h3>2. Définitions</h3>
            <ul>
              <li><strong>Utilisateur</strong> : Toute personne physique ou morale utilisant le Service.</li>
              <li><strong>Compte</strong> : Espace personnel de l'Utilisateur créé lors de son inscription.</li>
              <li><strong>Données Personnelles</strong> : Toute information se rapportant à une personne identifiée ou identifiable.</li>
            </ul>
            
            <h3>3. Objet</h3>
            <p>
              Les présentes CGU ont pour objet de définir les conditions dans lesquelles <strong>EcoSolutions SARL</strong> met à disposition des Utilisateurs le Service Ecotrack, ainsi que les obligations et responsabilités des parties.
            </p>
            
            <h3>4. Accès au Service</h3>
            <p>
              Le Service est accessible gratuitement à tout Utilisateur disposant d'un accès à Internet. Tous les frais relatifs à l'accès au Service, y compris les frais matériels, logiciels et d'accès à Internet, sont à la charge de l'Utilisateur.
            </p>
            
            <h3>5. Inscription et Compte Utilisateur</h3>
            <h4>5.1. Création du Compte</h4>
            <p>
              Pour accéder à certaines fonctionnalités du Service, l'Utilisateur doit créer un Compte en fournissant des informations exactes et à jour.
            </p>
            <h4>5.2. Sécurité du Compte</h4>
            <p>
              L'Utilisateur est responsable de la confidentialité de ses identifiants de connexion. Toute utilisation non autorisée de son Compte doit être signalée immédiatement à <strong>EcoSolutions SARL</strong> via l'adresse email <a href="mailto:support@ecotrack.com">support@ecotrack.com</a>.
            </p>
            
            <h3>6. Propriété Intellectuelle</h3>
            <h4>6.1. Droits de Propriété</h4>
            <p>
              Tous les éléments du Service, qu'ils soient visuels ou sonores, sont protégés par le droit d'auteur, des marques ou des brevets. Toute reproduction, distribution, modification, ou exploitation non autorisée est strictement interdite.
            </p>
            <h4>6.2. Licence d'Utilisation</h4>
            <p>
              <strong>EcoSolutions SARL</strong> accorde à l'Utilisateur une licence limitée, non exclusive et non transférable pour utiliser le Service conformément aux présentes CGU.
            </p>
            
            <h3>7. Responsabilités</h3>
            <h4>7.1. De EcoSolutions SARL</h4>
            <p>
              <strong>EcoSolutions SARL</strong> s'engage à mettre en œuvre tous les moyens nécessaires pour assurer la disponibilité et la sécurité du Service. Toutefois, elle ne peut être tenue responsable en cas d'interruption ou de dysfonctionnement dû à des causes indépendantes de sa volonté.
            </p>
            <h4>7.2. De l'Utilisateur</h4>
            <p>
              L'Utilisateur s'engage à utiliser le Service conformément aux lois en vigueur et aux présentes CGU. Il est responsable des contenus qu'il publie et des informations qu'il fournit.
            </p>
            
            <h3>8. Protection des Données Personnelles</h3>
            <h4>8.1. Collecte des Données</h4>
            <p>
              Les données personnelles collectées lors de l'inscription et de l'utilisation du Service sont traitées conformément à la <a href="https://www.ecotrack.com/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">Politique de Confidentialité</a>.
            </p>
            <h4>8.2. Droits de l'Utilisateur</h4>
            <p>
              Conformément à la réglementation en vigueur, l'Utilisateur dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles. Il peut exercer ce droit en contactant <strong>EcoSolutions SARL</strong> à l'adresse email <a href="mailto:data.protection@ecotrack.com">data.protection@ecotrack.com</a>.
            </p>
            
            <h3>9. Modalités de Paiement</h3>
            <h4>9.1. Tarification</h4>
            <p>
              Les tarifs des services premium sont détaillés sur la page <a href="https://www.ecotrack.com/tarifs" target="_blank" rel="noopener noreferrer">Tarifs</a>. <strong>EcoSolutions SARL</strong> se réserve le droit de modifier ses tarifs à tout moment, avec un préavis de <strong>30 jours</strong>.
            </p>
            <h4>9.2. Paiement</h4>
            <p>
              Le paiement s'effectue via <strong>PaySecure</strong>, <strong>Stripe</strong>, ou <strong>PayPal</strong>. Les transactions sont sécurisées par <strong>SSL Encryption</strong>.
            </p>
            
            <h3>10. Durée et Résiliation</h3>
            <h4>10.1. Durée</h4>
            <p>
              Les CGU sont conclues pour une durée indéterminée à compter de l'acceptation par l'Utilisateur.
            </p>
            <h4>10.2. Résiliation</h4>
            <p>
              Chaque partie peut résilier le présent accord à tout moment, sous réserve de notifier l'autre partie par écrit avec un préavis de <strong>15 jours</strong>.
            </p>
            
            <h3>11. Modification des CGU</h3>
            <p>
              <strong>EcoSolutions SARL</strong> se réserve le droit de modifier les présentes CGU à tout moment. Les modifications seront communiquées aux Utilisateurs via une notification sur le site web ou par email. L'utilisation continue du Service constitue une acceptation des CGU modifiées.
            </p>
            
            <h3>12. Litiges</h3>
            <p>
              En cas de litige relatif à l'interprétation ou à l'exécution des présentes CGU, les parties s'efforceront de trouver une solution amiable. À défaut, le litige sera soumis à la compétence des tribunaux de <strong>Paris</strong>.
            </p>
            
            <h3>13. Droit Applicable</h3>
            <p>
              Les présentes CGU sont régies par le droit français.
            </p>
            
            <h3>14. Contact</h3>
            <p>
              Pour toute question concernant les CGU, veuillez nous contacter à :
            </p>
            <p>
              <strong>EcoSolutions SARL</strong><br />
              Adresse : 123 Rue Verte, 75015 Paris, France<br />
              Email : <a href="mailto:support@ecotrack.com">support@ecotrack.com</a><br />
              Téléphone : +33 1 23 45 67 89
            </p>
            
            <p><em>Veuillez adapter ce modèle en fonction des spécificités de votre projet Ecotrack et des exigences légales applicables.</em></p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="button-secondary" onClick={onClose}>
            Fermer
          </button>
          <button className="button-primary" onClick={onClose}>
            J'accepte
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
