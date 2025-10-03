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

const LoginPage: React.FC = () => {
  return (
    <div className="app-container">
      <div className="full-width-header">
        <div>
          <Link to="/"><img src="/tannit.PNG" alt="Tannit Logo" className="logo" /></Link>
        </div>
      </div>

      <div className="content">
        <div className="left-panel">
          <LoginFormContent />
        </div>
        <div className="right-panel">
          <ImageGallery />
        </div>
      </div>
    </div>
  );
};

const LoginFormContent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(''); // État pour le champ email/mobile
  const [password, setPassword] = useState(''); // État pour le champ mot de passe
  const [showPasswordSection, setShowPasswordSection] = useState(false); // État pour contrôler l'affichage de la section mot de passe
  const [showPasswordToggle, setShowPasswordToggle] = useState(false); // État pour basculer la visibilité du mot de passe
/*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7111/api/auth/login', {
        email,
        password
      });
      const { token } = response.data;

      console.log("AccessToken dans le login :", token);

      // Stocke dans Redux + localStorage (via slice)
      dispatch(setToken(token));

      // Navigue vers dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      // Utilisation d'un message box personnalisé au lieu d'alert()
      alert("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
    }
  };
*/

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await axios.post('https://localhost:7111/api/auth/login', {
      email,
      password
    });
      const { token } = response.data;

      console.log("AccessToken dans le login :", token);

      // Stocke dans Redux + localStorage (via slice)
      dispatch(setToken(token));

    toast.success(response.data?.message || 'Login réussie. Tu peux maintenant te connecter.');

    navigate('/dashboard');
    
    } catch (error: any) {
        // Si c’est une erreur venant du backend avec un message clair :
        const errorMessage = error.response?.data?.error || 'Erreur lors du Login.';
        toast.error(errorMessage);
        console.error('login failed:', error);
        }
    };

    const API_BASE ="https://localhost:7111";
    const FRONT_CALLBACK = `${window.location.origin}/GoogleCallback`;
    const startGoogleLogin = async (e: React.FormEvent) =>{
      const url = `${API_BASE}/api/auth/google-login?returnUrl=${encodeURIComponent(FRONT_CALLBACK)}`;
      window.location.href = url;
    }
  
    return (
    <div className="register-form">
      <p className="register-text">Login</p>
      <h2>Login into your account</h2>
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

      <button type="submit" className="proceed-button" onClick={handleSubmit}>Connecter</button>

      <p className="terms-policy mt-5">
        By continuing, you agree to Tannit's <a href="#">Terms of Use</a> and read our <a href="#">Privacy Policy</a>.
      </p>
      {/* Modification du texte et ajout du style rouge pour le lien "Login" */}
      <p className="login-link">
        Don't have an account? <a href="/RegisterPage">Register</a>
      </p>
    </div>
  );
};

export default LoginPage;