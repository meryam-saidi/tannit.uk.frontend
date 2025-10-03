import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Assurez-vous que le chemin est correct
import '../App.css'; // Assurez-vous que ce fichier CSS a les styles de base

// Composant pour l'étape de l'onboarding
interface OnboardingStepProps {
  title: string;
  isCompleted: boolean;
  timeEstimate?: string;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({ title, isCompleted, timeEstimate }) => {
  return (
    <div className={`onboarding-step ${isCompleted ? 'completed' : ''}`}>
      <div className="step-icon-container">
        {isCompleted ? (
          <span className="icon-completed">✓</span>
        ) : (
          <span className="icon-pending"></span>
        )}
      </div>
      <div className="step-info">
        <h4 className="step-title">{title}</h4>
        {isCompleted ? (
          <span className="step-status">Done</span>
        ) : (
          <span className="step-time">{timeEstimate} to complete it</span>
        )}
      </div>
      {!isCompleted && (
        <span className="step-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      )}
    </div>
  );
};

const OnboardingStepsPage: React.FC = () => {
  const navigate = useNavigate();
  // Simuler le solde et l'XP
  const [balance, setBalance] = useState(40);
  const [xp, setXp] = useState(0);

  // Gérer la navigation vers les paramètres du profil
  const handleProfileSettingsClick = () => {
    console.log("Navigating to profile settings...");
    navigate('/UserProfilePage'); // Assurez-vous que cette route est définie
  };

  // Gérer la navigation vers une étape spécifique
  const handleStepClick = (stepTitle: string) => {
    console.log(`Navigating to ${stepTitle} step...`);
    // Implémentez la navigation ici, par exemple :
    // navigate(`/onboarding/${stepTitle.toLowerCase().replace(' ', '-')}`);
    alert(`Cliquer sur une étape naviguerait vers la page de ${stepTitle}.`);
  };

  // Gérer l'option "Do it later"
  const handleDoItLater = () => {
    console.log("Skipping onboarding steps...");
    navigate('/dashboard'); // Naviguer vers le tableau de bord
  };

  return (
    <div className="onboarding-page">
      {/* En-tête de la page */}
      <Header />

      <div className="main-content-area">
        <div className="onboarding-card">
          <div className="celebration-icon">🎉</div>
          <h3>Profile created!</h3>
          <p>
            You have successfully created your Tannit account.
            To be able to start investing, information is strongly required. You can
            access your profile at any time to provide the necessary information.
          </p>

          <div className="onboarding-steps-container">
            <div onClick={() => handleStepClick('Profile')}>
              <OnboardingStep title="Profile" isCompleted={true} />
            </div>
            <div onClick={() => handleStepClick('Wealth and income')}>
              <OnboardingStep title="Wealth and income" isCompleted={false} timeEstimate="Only 2 minutes" />
            </div>
            <div onClick={() => handleStepClick('Investment')}>
              <OnboardingStep title="Investment" isCompleted={false} timeEstimate="Only 4 minutes" />
            </div>
            <div onClick={() => handleStepClick('Documents')}>
              <OnboardingStep title="Documents" isCompleted={false} timeEstimate="Only 3 minutes" />
            </div>
          </div>

          <button onClick={handleProfileSettingsClick} className="profile-settings-button">
            Profile settings
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          <button onClick={handleDoItLater} className="do-it-later-button">
            Do it later
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStepsPage;