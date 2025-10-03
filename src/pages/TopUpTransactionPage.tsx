import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const TopUpTransactionPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    /*
    if (sessionId) {
      axios.get(`https://localhost:7211/api/payments/session/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }).then(res => {
        console.log("Payment session details:", res.data);
        // Ici tu peux mettre à jour la transaction, processing, balance, etc.
      });
    }
      */
    if (sessionId) {
    console.log("Stripe Checkout Session created:", sessionId);
    // Ne pas faire axios.get pour settle ici !
    // Le backend recevra le webhook et fera le settle automatiquement
  }
  }, [sessionId]);

  const handleGoToDashboard = () => {
        navigate("/dashboard");
  }
  
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
          You have successfully purchased your TANNITS.
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
