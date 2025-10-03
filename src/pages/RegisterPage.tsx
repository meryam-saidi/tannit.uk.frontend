import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import userManager from '../auth/authService';
import { Log } from "oidc-client-ts";
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice'; 

// Import des composants réutilisables
import Header from '../components/Header';
import ImageGallery from '../components/ImageGallery';

import '../App.css'; 

import { toast } from 'react-toastify';

const RegisterPage: React.FC = () => {
  return (
    <div className="app-container">
      <div className="full-width-header">
        <div>
          <Link to="/"><img src="/tannit.PNG" alt="Tannit Logo" className="logo" /></Link>
        </div>
      </div>

      <div className="content">
        <div className="left-panel">
          <RegisterFormContent />
        </div>
        <div className="right-panel">
          <ImageGallery />
        </div>
      </div>
    </div>
  );
};

const RegisterFormContent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(''); // État pour le champ email/mobile
  const [password, setPassword] = useState(''); // État pour le champ mot de passe
  const [showPasswordSection, setShowPasswordSection] = useState(false); // État pour contrôler l'affichage de la section mot de passe
  const [showPasswordToggle, setShowPasswordToggle] = useState(false); // État pour basculer la visibilité du mot de passe

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://localhost:7111/api/auth/register', {
        email,
        password
        });
        
        localStorage.setItem('userEmailForVerification', email);
        
        //toast.success(response.data?.message || 'Inscription réussie. Tu peux maintenant te connecter.');
        navigate('/VerifyEmailPage');
    } catch (error: any) {
        // Si c’est une erreur venant du backend avec un message clair :
        const errorMessage = error.response?.data?.error || 'Erreur lors de l’inscription.';
        toast.error(errorMessage);
        console.error('Registration failed:', error);
        }
    };
  
    const API_BASE ="https://localhost:7111";
    const FRONT_CALLBACK = `${window.location.origin}/GoogleCallback`;
    const startGoogleLogin = async (e: React.FormEvent) =>{
      const url = `${API_BASE}/api/auth/google-login?returnUrl=${encodeURIComponent(FRONT_CALLBACK)}`;
      window.location.href = url;
    }

    const handleProceedClick = () => {
      // Lorsque "Proceed" est cliqué, affiche la section mot de passe
      setShowPasswordSection(true);
    };

  return (
    <div className="register-form">
      <p className="register-text">Register</p>
      <h2>Create your account</h2>
      <div className="social-login-buttons">
        <button 
          onClick={startGoogleLogin} 
          className="google-btn"
        >
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Icon" className="icon" /> Continue with Google
        </button>
        <button className="social-button facebook">
          <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook Icon" className="icon" /> Continue with Facebook
        </button>
        <button className="social-button linkedin">
          <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn Icon" className="icon" /> Continue with LinkedIn
        </button>
      </div>
      <div className="or-separator">
        <span>OR</span>
      </div>
      <div className="email-mobile-input mb-6"> {/* Ajout de la classe mb-6 pour l'espace */}
        <label htmlFor="emailMobile">Email / Mobile Number</label>
        <div className="input-with-icon">
          <span className="input-icon">📧</span> {/* Icône d'e-mail */}
          <input
            type="text"
            id="emailMobile"
            placeholder="Enter your email address or mobile number..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {!showPasswordSection && ( // Affiche le bouton "Proceed" seulement si la section mot de passe n'est pas affichée
        <button className="proceed-button" onClick={handleProceedClick}>Proceed</button>
      )}

      {showPasswordSection && ( // Affiche cette section conditionnellement après avoir cliqué sur "Proceed"
        <>
          <form onSubmit={handleSubmit} className="email-signup-form">
            <div className="form-group">
              <label htmlFor="loginPassword">Mot de passe</label>
              <div className="input-with-icon">
                <span className="input-icon">🔒</span>
                <input
                  type={showPasswordToggle ? 'text' : 'password'}
                  id="loginPassword"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPasswordToggle(!showPasswordToggle)}
                >
                  {showPasswordToggle ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <button type="submit" className="send-verification-button">
              Connecter
            </button>
          </form>
        </>
      )}

      <p className="terms-policy mt-5">
        By continuing, you agree to Tannit's <a href="#">Terms of Use</a> and read our <a href="#">Privacy Policy</a>.
      </p>
      {/* Modification du texte et ajout du style rouge pour le lien "Login" */}
      <p className="login-link">
        Already have an account? <a href="/LoginPage">Login</a>
      </p>
    </div>
  );
};

export default RegisterPage;