import React from 'react';
// Importez votre hook de navigation si vous utilisez un routeur (ex: useRouter de next/navigation, ou useNavigate de react-router-dom)
 import { useNavigate } from 'react-router-dom';

// Définition des props pour le composant (maintient la flexibilité)
interface TopUpTransactionPageProps {
  /** Le nom de la monnaie virtuelle ou de l'article acheté. */
  itemName?: string; 
  /** L'URL de destination pour le tableau de bord. */
  dashboardUrl?: string; 
  /** Fonction à appeler lors du clic sur le bouton. */
  onGoToDashboard?: () => void;
}

const TopUpTransactionPage: React.FC<TopUpTransactionPageProps> = ({
  itemName = 'Tannits', // Valeur par défaut basée sur l'image
  dashboardUrl = '/dashboard',
  onGoToDashboard,
}) => {
  // Si vous utilisez React Router
   const navigate = useNavigate();

  // Fonction de gestion du clic sur le bouton
  const handleGoToDashboard = () => {
    if (onGoToDashboard) {
      onGoToDashboard();
    } else {
      // --- Logique de navigation ---
      
      // 1. Si vous utilisez React Router DOM:
       navigate(dashboardUrl);
      
      // 2. Si vous utilisez une navigation standard (Moins recommandé dans React, mais fonctionne):
      // window.location.href = dashboardUrl;
      
      // 3. Simple log pour l'exemple (à remplacer dans votre app)
      console.log(`Navigation vers le tableau de bord: ${dashboardUrl}`);
    }
  };

   return (
    // Utiliser la classe CSS principale
    <div className="topup-container">
      
      {/* Utiliser la classe pour la boîte de contenu */}
      <div className="topup-content-box">
        
        {/* Icône/Emoji de succès */}
        <div className="topup-icon">
          🎉
        </div>
        
        {/* Titre et message */}
        <h1 className="topup-title">
          Money added successfully!
        </h1>
        <p className="topup-message">
          You have successfully purchased your **{itemName}**.
        </p>
        
        {/* Bouton */}
        <button
          onClick={handleGoToDashboard}
          className="topup-button"
        >
          Go to dashboard
          {/* Flèche */}
          <span className="topup-button-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default TopUpTransactionPage;