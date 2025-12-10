import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import pour l'icône de retour

// --- Interfaces (Copiez PropertyDetails de l'autre fichier) ---
interface PropertyDetails {
    title: string;
    location: string;
    description: string;
    priceK: number;
    convertedPrice: number;
    remainingInvestment: number;
    investors: number;
    profitability: number;
    returned: number;
    pricePerShare: number;
    tags: string[];
    indicators: Array<{ value: number; percent: number }>;
    amenities: string[];
    imageSources: string[];
    area: number;
    targetProfitability: number;
    numberLot: number;
    energyClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
    energyIndex: number;
}

// Composant de la page de confirmation
const ConfirmPurchasePage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Récupération des données
    const property = (location.state as { propertyData: PropertyDetails })?.propertyData;
    
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
    const remainingShares = Math.round(property.remainingInvestment / property.pricePerShare);
    
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
                <img 
                    src={property.imageSources[0]} 
                    alt={property.title} 
                    className="summary-image" 
                />
                <div className="summary-details">
                    <p className="summary-description">
                        {property.description}
                    </p>
                    
                    <h2 className="summary-price">{property.convertedPrice.toLocaleString()} £</h2>
                    <p className="summary-conversion">
                        Converted to: {property.convertedPrice} Tannits
                    </p>
                    
                    <div className="summary-stats">
                        <span className="remaining-shares-summary">
                            <span className="icon">🪙</span> {remainingShares} remaining
                        </span>
                        <span className="investors-summary">
                            <span className="icon">👤</span> {property.investors} Investors
                        </span>
                    </div>

                    <div className="summary-profitability">
                        <span className="profit-value">Profitability {property.profitability}%</span>
                        <span className="returned-value">Returned {property.returned}%</span>
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
                        0 TANNIT
                    </div>
                    
                    <p className="label-section">You will Invest</p>
                    <div className="tannit-input-group">
                        <input 
                            type="number"
                            placeholder="Enter amount in TANNIT"
                            value={tannitAmount}
                            onChange={(e) => setTannitAmount(e.target.value)}
                            className="tannit-input"
                        />
                        <span className="tannit-output">
                            ={investmentInGBP.toFixed(2)} £
                        </span>
                    </div>
                    
                    <p className="tannit-note">
                        Note: 1 TANNIT = {property.pricePerShare.toFixed(2)} £
                    </p>
                </div>

                <button className="invest-button" onClick={handleConfirm} disabled={!tannitAmount || parseFloat(tannitAmount) <= 0}>
                    Invest
                </button>
            </div>
        </div>
    );
};

export default ConfirmPurchasePage;