import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../App.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const claimReward = async (token: string) => {
  return axios.post(
    'https://localhost:7111/api/auth/claim-reward',
    
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Confettis visuels
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

const ProfileCreatedPage: React.FC = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [xp, setXp] = useState(0);

  // Récupérer le token dès le chargement
  const token = useSelector((state: RootState) => state.auth.token); // Au bon endroit

  const handleClaimNow = async () => {
    try {
      if (!token) {
        alert("Token manquant. Veuillez vous reconnecter.");
        return;
      }
      
      console.log("token dans profileCreatedpage apres claimReward", token);

      const response = await claimReward(token);
      const newBalance = response.data.newBalance;

      setBalance(newBalance);
      alert("40 Tannit réclamés avec succès !");
      navigate('/ProfileCreatedClaimedPage');
    } catch (error: any) {
      console.error("Erreur lors du claim :", error.response?.data || error.message);
      alert("Échec du claim : " + (error.response?.data || error.message));
      navigate('/ProfileCreatedClaimedPage');
    }
  };

  return (
    <div className="profile-created-page">
      <Confetti />

    <div className="full-width-header">
        <div>
          <Link to="/"><img src="/tannit.PNG" alt="Tannit Logo" className="logo" /></Link>
        </div>
        <div className="user-stats">
          <div className="stat-item">
            <img src="/Green Coin.png" alt="XP" className="xp-image"/>
            <div className="balance-text">
              <span className="label">0K XP</span>
            </div>
          </div>
          <div className="stat-item">
            <img src="/Yellow Coin.png" alt="Balance" className="balance-image"/>
            <div className="balance-text">
              <span className="label">BALANCE</span>
              <span className="value">{balance}</span>
            </div>
          </div>
        </div>      
    </div>  

      <div className="main-content-area">
        <div className="profile-created-card">
          <div className="celebration-icon">🎉</div>
          <h3>Profile created!</h3>
          <p>
            You have successfully created your Tannit account.
            To be able to start investing, information is strongly required. You can
            access your profile at any time to provide the necessary information.
          </p>

          <div className="tannit-bonus">
            <div className="tannit-icon-container">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="2"/>
                <path d="M12 17V12L14 10" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 10H14" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7V8" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" fill="#FFD700"/>
              </svg>
            </div>
            <p className="tannit-value">40 TANNIT</p>
          </div>

          <button onClick={handleClaimNow} className="claim-button">
            Claim now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreatedPage;
