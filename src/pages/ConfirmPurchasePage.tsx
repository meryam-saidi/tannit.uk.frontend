import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import pour l'icône de retour
import { Property } from "../pages/PropertiesPage";
import PropertyImageCarousel from './PropertyImageCarousel';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


// Composant de la page de confirmation
const ConfirmPurchasePage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { balance } = useSelector((s: RootState) => s.account);
    const [error, setError] = useState<string | null>(null);

    // Récupération des données
    const property = (location.state as { propertyData: Property })?.propertyData;
    
    // État local pour le montant à investir (en TANNITs)
    const [tannitAmount, setTannitAmount] = useState<string>('');

    // Si les données sont manquantes
    if (!property) {
        return (
            <div className="error-page">
                <h1>Erreur</h1>
                <p>Données de propriété manquantes.</p>
                <button onClick={() => navigate(-1)}>Retour</button>
            </div>
        );
    }

    // Calculs basés sur les données (Mockés ou basés sur property.remainingInvestment)
    const remainingShares = property.availableShares * property.pricePerShare;
    
    // --- Calculs pour la section Calculateur (Mockés comme dans l'image) ---
    const revenuePerMonth = 2642; // £
    const addedValuePerYear = 3508; // £
    const valuationPerYear = 8530; // £
    const investmentInGBP = parseFloat(tannitAmount) * property.pricePerShare;

    // Fonction de confirmation (simple alerte pour l'exemple)
    const handleConfirm = () => {
        alert(`Confirmation d'investissement de ${investmentInGBP.toFixed(2)} £.`);
        // Ici, vous implémenteriez la logique de l'API pour l'achat réel
    };

    return (
        <div className="confirm-purchase-page-layout">
            
            {/* En-tête de la page */}
            <header className="confirm-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Confirm your purchase
                </button>
            </header>

            {/* Bloc d'information de la propriété */}
            <div className="property-summary-block">
                <PropertyImageCarousel images={property.images} />
                <div className="summary-details">
                    <p className="summary-description">
                        {property.description}
                    </p>
                    <p className="description"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, rerum. Architecto iste, mollitia fugiat explicabo veritatis quo, modi reiciendis incidunt accusamus facilis dolorem laborum neque doloremque dolore nesciunt tempora minima.</p>
                    <h2 className="summary-price">{property.totalValue} £</h2>
                    <p className="summary-conversion">
                        Converted to: {property.totalValue / 10} Tannits
                    </p>
                    <div className="progress-bar-container">
                        <div className="progress-bar" ></div> {/* <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>  */}
                    
                    </div>
                    <div className="summary-stats">
                        <span className="remaining-shares-summary">
                            <span className="icon">🪙</span> {remainingShares} remaining
                        </span>
                        <span className="investors-summary">
                            <span className="icon">👤</span> {property.totalShares - property.availableShares} Investors
                        </span>
                    </div>

                    <div className="summary-profitability">
                        <span className="profit-value">Profitability 25%</span>
                        <span className="returned-value">Returned 5%</span>
                    </div>
                </div>
            </div>

            {/* Section du Calculateur */}
            <div className="calculator-container">
                <h2>Calculator</h2>
                
                <div className="calculator-stats-row">
                    <div className="calc-stat">
                        <p className="calc-label">Revenue/month</p>
                        <p className="calc-value">+{revenuePerMonth.toLocaleString()} £</p>
                    </div>
                    <div className="calc-stat">
                        <p className="calc-label">Added value/year</p>
                        <p className="calc-value">+{addedValuePerYear.toLocaleString()} £</p>
                    </div>
                    <div className="calc-stat">
                        <p className="calc-label">Valuation / year</p>
                        <p className="calc-value">+{valuationPerYear.toLocaleString()} £</p>
                    </div>
                </div>
                
                {/* Slider (Placeholder) */}
                <input 
                    type="range" 
                    min="0" 
                    max={remainingShares} 
                    value={tannitAmount === '' ? 0 : parseFloat(tannitAmount)}
                    onChange={(e) => setTannitAmount(e.target.value)}
                    className="tannit-slider"
                />

                {/* Montants possédés et investis */}
                <div className="investment-inputs">
                    <p className="label-section">You have</p>
                    <div className="current-tannit-amount">
                        { balance } TANNIT
                    </div>
                    
                    <p className="label-section">You will Invest</p>
                    <div className="tannit-input-group">
                        <input 
                            type="number"
                            placeholder="Enter amount in TANNIT"
                            value={tannitAmount}
                            min={0}
                            max={Math.min(balance, remainingShares)}
                            onChange={(e) => {
                                const value = Number(e.target.value);

                                if (value > balance) {
                                    setError("Insufficient TANNIT balance");
                                    setTannitAmount(balance.toString());
                                } else if (value < 0) {
                                    setTannitAmount('0');
                                    setError(null);
                                } else {
                                    setTannitAmount(e.target.value);
                                    setError(null);
                                }
                            }}
                            className="tannit-input"
                        />
                        <span className="tannit-output">
                            ={investmentInGBP.toFixed(2)} £
                        </span>
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <p className="tannit-note">
                        Note: 1 TANNIT = 10 £
                    </p>
                </div>

                <button  
                    className="invest-button"
                    onClick={handleConfirm}
                    disabled={
                        !tannitAmount || 
                        parseFloat(tannitAmount) <= 0 ||   //afficher des messages d'erreur
                        parseFloat(tannitAmount) > balance ||
                        Number(tannitAmount) > remainingShares
                    }
                    >
                    Invest
                </button>
            </div>
        </div>
    );
};

export default ConfirmPurchasePage;