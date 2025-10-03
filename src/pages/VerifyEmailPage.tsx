// src/pages/VerifyEmailPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import ImageGallery from '../components/ImageGallery';
import '../App.css';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice'; 

const VerifyEmailPage: React.FC = () => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState<string>(
    localStorage.getItem('userEmailForVerification') || "demo@moon.tn"
  );

  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(['', '', '', '']); // État pour les 4 chiffres du code
  const [timeLeft, setTimeLeft] = useState(30); // Temps restant pour le compte à rebours
  const [isResendEnabled, setIsResendEnabled] = useState(false); // État pour activer/désactiver le bouton de renvoi
  const inputRefs = useRef<(HTMLInputElement)[]>([]); // Références pour les champs de saisie du code
  //const inputRefs = useRef<(HTMLInputElement | null)[]>([]); 

  // Effet pour le compte à rebours
  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendEnabled(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer); // Nettoyage du timer
  }, [timeLeft]);

  // Gère le changement de valeur dans les champs de saisie du code
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    // Permet un seul chiffre par champ
    if (value.length > 1) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Passe au champ suivant si un chiffre est entré
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Gère la touche "Backspace" pour revenir en arrière
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Gère le renvoi du code
  const handleResendCode = async () => {
    console.log("Requesting new verification code for:", userEmail);
    try {
      const response = await axios.post('https://localhost:7111/api/auth/send-verification-code', { email: userEmail });
      alert(response.data?.message || "Un nouveau code a été envoyé.");
      setTimeLeft(30); // Réinitialise le compte à rebours
      setIsResendEnabled(false); // Désactive le bouton de renvoi
      setCode(['', '', '', '']); // Réinitialise les champs de saisie
      inputRefs.current[0]?.focus(); // Met le focus sur le premier champ
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Erreur lors du renvoi du code.";
      console.error("Error resending code:", error);
      alert(errorMessage);
    }
  };

  // Gère la soumission du code de vérification
  const handleFinish = async () => {
    const fullCode = code.join(''); 
    if (fullCode.length !== 4) {
      alert("Veuillez entrer un code à 4 chiffres.");
      return;
    }
    console.log("Verifying code:", fullCode, "for email:", userEmail);
    try {
      const response = await axios.post('https://localhost:7111/api/auth/verify-email', { email: userEmail, code: fullCode });
      //alert(response.data?.message || "Adresse e-mail vérifiée avec succès !");
      localStorage.removeItem('userEmailForVerification'); // Nettoie l'e-mail après vérification
      
      const { token } = response.data;
      console.log("AccessToken apres VerificationCode :", token);
      // Stocke dans Redux + localStorage (via slice)
      dispatch(setToken(token));
      
      navigate('/ProfileCreatedPage'); // Redirige vers le tableau de bord après vérification
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Échec de la vérification de l'e-mail. Veuillez vérifier le code.";
      console.error("Email verification failed:", error);
      alert(errorMessage);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Retourne à la page précédente
  };

  return (
    <div className="app-container">
      {/* La structure de l'en-tête est maintenant inlinée comme demandé précédemment */}
      <div className="full-width-header">
        <div>
          <Link to="/"><img src="/tannit.PNG" alt="Tannit Logo" className="logo" /></Link>
        </div>
      </div>

      <div className="content"> {/* Ce div 'content' n'était pas dans votre App.css, il faut l'ajouter ou l'ajuster */}
        <div className="left-panel">
          <div className="signup-form-section">
            <button onClick={handleGoBack} className="go-back-button">
              <span className="arrow-icon">←</span> Go back
            </button>
            <h2>Verify your email address</h2>
            <p className="verification-instruction">
              We emailed you a four-digit code to <span className="font-semibold">{userEmail}</span>. Enter the code below to confirm your email address.
            </p>

            <div className="code-input-container">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  className="code-input"
                />
              ))}
            </div>

            <div className="resend-timer-container">
              <span className="timer-text">
                {timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`} seconds left to enter code
              </span>
              <button
                onClick={handleResendCode}
                disabled={!isResendEnabled}
                className={`resend-button ${isResendEnabled ? '' : 'disabled'}`}
              >
                Didn't receive code? <span className="resend-link">Resend</span>
              </button>
            </div>

            <button onClick={handleFinish} className="send-verification-button mt-8">
              Finish
            </button>
          </div>
        </div>
        <div className="right-panel">
          <ImageGallery />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;