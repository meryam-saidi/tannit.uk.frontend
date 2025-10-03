import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Assurez-vous que le chemin est correct
import '../App.css'; // Assurez-vous d'avoir ce fichier CSS avec les styles

// Composant pour les confettis (simple simulation visuelle)
const Confetti: React.FC = () => {
  return (
    <div className="confetti-container">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        ></div>
      ))}
    </div>
  );
};

const ProfileCreatedClaimedPage: React.FC = () => {
  const navigate = useNavigate();
  // Simuler le solde après avoir réclamé (par exemple, 40)
  const [balance, setBalance] = useState(40);
  const [xp, setXp] = useState(0); // Exemple d'XP

  // Logique pour le bouton "Move on"
  const handleMoveOn = () => {
    // Naviguer vers le tableau de bord ou la prochaine étape de l'application
    navigate('/OnboardingStepsPage'); // Assurez-vous que cette route est définie
  };

  return (
    <div className="profile-created-page">
      <Confetti /> {/* Intégration du composant Confetti */}

      {/* En-tête de la page avec logo et informations XP/Balance */}
      <Header />

      <div className="main-content-area">
        <div className="profile-created-card">
          <div className="celebration-icon">🎉</div> {/* Icône de célébration */}
          <h3>Profile created!</h3>
          <p>
            You have successfully created your Tannit account.
            To be able to start investing, information is strongly required. You can
            access your profile at any time to provide the necessary information.
          </p>

          <div className="tannit-claimed-confirmation">
            <div className="check-icon-container">
              {/* Icône de coche SVG */}
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#28a745" strokeWidth="2"/>
                <path d="M8 12L11 15L16 9" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="tannit-claimed-text">40 Tannit are now yours</p>
          </div>

          <button onClick={handleMoveOn} className="move-on-button">
            Move on
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreatedClaimedPage;