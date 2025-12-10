import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Assurez-vous d'avoir les dépendances 'react-icons' installées : npm install react-icons

// --- Interfaces et Types pour les données reçues ---
// J'ai structuré ceci pour correspondre aux données enrichies passées par PropertyCard.
interface PropertyDetails {
    imageUrls: string[];
    address: string;
    title: string;
    location: string;
    description: string; // Description longue
    priceK: number; // Prix total en K £
    convertedPrice: number; // Valeur convertie en Tannits
    remainingInvestment: number;
    investors: number;
    profitability: number;
    returned: number;
    pricePerShare: number;
    tags: string[];
    indicators: Array<{ value: number; percent: number }>;
    amenities: string[];
    // Ajout d'une liste d'images (doivent correspondre aux src dans votre dossier /public)
    imageSources: string[];
    // Données spécifiques de la page de détails
    area: number;
    targetProfitability: number;
    numberLot: number;
    energyClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
    energyIndex: number;
}

// --- Images Mockées (à adapter) ---
// Ces chemins doivent pointer vers vos images dans le dossier /public
const MOCK_IMAGE_SOURCES = [
    '/house1.jpg', 
    '/house1.jpg',
    '/house1.jpg',
    '/house1.jpg', // Utilisée pour le fond du bouton "Show More"
];

// --- Composant : Grille d'Images (Dynamique) ---
const ImageGrid: React.FC<{ images: string[] }> = ({ images }) => {
    // S'assurer qu'on a au moins les 3 images nécessaires pour le layout
    const mainImage = images[0] || MOCK_IMAGE_SOURCES[0];
    const smallImage1 = images[1] || MOCK_IMAGE_SOURCES[1];
    const smallImage2 = images[2] || MOCK_IMAGE_SOURCES[2];
    const showMoreImage = images[3] || MOCK_IMAGE_SOURCES[3];

    return (
        <div className="image-grid">
            {/* Image principale */}
            <img src={mainImage} alt="Property main view" className="main-image" />
            
            {/* 3 autres images (ou placeholders) */}
            <img src={smallImage1} alt="Property small view 1" className="small-image" />
            <img src={smallImage2} alt="Property small view 2" className="small-image" />
            
            {/* Bouton "Show More Images" avec l'image 4 en arrière-plan (si vous utilisez le style de l'image) */}
            <div 
                className="small-image show-more"
                style={{ backgroundImage: `url(${showMoreImage})` }} // Optionnel: pour avoir une image de fond
            >
                <div className="show-more-overlay">Show More Images</div>
            </div>
        </div>
    );
};

// --- Composant : Échelle Énergétique (Energy) ---
const EnergyDetails: React.FC<{ energyClass: string; energyIndex: number }> = ({ energyClass, energyIndex }) => {
// Les classes sont A, B, C, D, E, F, G
const classes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    
    return (
        <div className="energy-details-container">
            <h3>Energy</h3>
            <div className="energy-class-box">
                <p>Energy Class:</p>
                <span className={`energy-tag ${energyClass.toLowerCase()}`}>{energyClass}</span>
            </div>
            <div className="energy-index-box">
                <p>Energy Index in KWh/m2/a:</p>
                <span className="energy-index-value">{energyIndex}</span>
            </div>
            
            <div className="energy-scale">
                {classes.map(cls => (
                    <div 
                        key={cls} 
                        className={`scale-segment ${cls.toLowerCase()} ${cls === energyClass ? 'active' : ''}`}
                    >
                        {cls}
                    </div>
                ))}
            </div>

            <div className="eco-friendly-box">
                <p className="eco-friendly-title">
                    <span className="icon">✓</span> Eco Friendly
                </p>
                <p className="eco-friendly-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nunc pharetra vitae ut ac. Non cursus nec vel metus nibh rutrum accumsan egestas vel. In mi dui tempor amet. Imperdiet elit convallis augue posuere amet pellentesque. Pellentesque molestie eget blandit purus iaculis vitae
                </p>
            </div>
        </div>
    );
};

// Définissez l'interface pour les props de Sidebar, qui étend PropertyDetails
interface SidebarProps extends PropertyDetails {
    onInvestClick: (propertyData: PropertyDetails) => void; 
}

// --- Composant : Colonne Latérale (Sidebar d'Investissement) ---
const Sidebar: React.FC<SidebarProps> = (data) => {
    const { convertedPrice, remainingInvestment, investors, profitability, returned } = data;
    const { onInvestClick, ...serializableData } = data;
    // Valeur actuelle de TANNIT (mockée)
    const tannitValue = 10.20; 
    
    // Calculs
    const remainingShares = Math.round(remainingInvestment / data.pricePerShare);
    const progressPercent = ((convertedPrice - remainingInvestment) / convertedPrice) * 100;
    
    return (
        <div className="sidebar-investment-box">
            {/* Graphique de valeur TANNIT (Placeholder) */}
            <div className="tannit-value-chart">
                <p className="chart-title">Amount of TANNIT</p>
                <h2 className="current-value">{tannitValue.toFixed(2)} £</h2>
                <p className="chart-info">Current value</p>
                {/*  */}
            </div>

            {/* Détails de l'investissement */}
            <div className="investment-stats">
                <h2 className="main-investment-amount">{convertedPrice.toLocaleString()}</h2>
                <p className="conversion-info">Converted for usable Tannits</p>

                <div className="stat-row">
                    <span>{remainingInvestment.toLocaleString()} remaining</span>
                    <span className="investors-count">👤 {investors} Investors</span>
                </div>
                
                {/* Barre de progression */}
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
                </div>

                <div className="icon-stats">
                    {/* Les icônes de la rangée (Profitability, N/A, Returned) */}
                    <div className="icon-stat">
                        <span className="label">Profitability</span>
                        <span className="value">{profitability}%</span>
                    </div>
                    <div className="icon-stat">
                        <span className="label">N/A</span>
                        <span className="value">4%</span>
                    </div>
                    <div className="icon-stat">
                        <span className="label">Returned</span>
                        <span className="value">{returned}%</span>
                    </div>
                </div>
                <button 
                    className="invest-button" 
                    onClick={() => onInvestClick(serializableData as PropertyDetails)} // Appel corrigé
                >
                    Invest →
                </button>
           </div>
        </div>
    );
};

// --- Composant Principal : Page de Détails de Propriété ---
const PropertyDetailsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Simuler le contenu des onglets pour le moment
    const [activeTab, setActiveTab] = useState('General');
    
    // Tente de récupérer les données passées via le state de navigation
    const data = (location.state as { propertyData: PropertyDetails })?.propertyData;

    // Si les données sont manquantes (ex: accès direct par URL), on redirige ou affiche un message d'erreur
    if (!data) {
        return (
            <div className="error-page">
                <h1>Propriété introuvable</h1>
                <p>Veuillez revenir à la page des propriétés.</p>
                <button onClick={() => navigate('/PropertyDetailsPage')}>Retour aux propriétés</button>
            </div>
        );
    }
    
    const handleGoToConfirmPurchaseClick = (propertyData: PropertyDetails) => {
    // MODIFICATION IMPORTANTE : on passe l'objet 'p' dans le state de navigation
        //navigate('/ConfirmPurchasePage', { state: { propertyData: p } });
        navigate('/ConfirmPurchasePage', { state: { propertyData } });
    };
    


    const renderContent = () => {
        switch (activeTab) {
            case 'General':
                return (
                    <>
                        <p className="description-text">{data.address}</p>
                        
                        {/* Extrait de votre renderContent dans PropertyDetailsPage.tsx */}
                        <div className="property-details-section">
                            <h4>Property details</h4>
                            <div className="details-row">
                                {/* L'erreur est probablement ici : */}
                                <p>Lot area: {data.area.toLocaleString()} sqft</p> 
                                {/* ou ici : */}
                                <p>Target Profitability: {data.targetProfitability}%</p>
                                {/* ou ici : */}
                                <p>Number Lot: {data.numberLot}</p>
                            </div>
                            {/* ou ici : */}
                            <p className="valuation">Property Valuation: {data.priceK}K £</p>
                        </div>
                        
                        <EnergyDetails 
                            energyClass={data.energyClass} 
                            energyIndex={data.energyIndex} 
                        />
                    </>
                );
            case 'Sustainability':
                return <p>Contenu de Sustainability...</p>;
            case 'Place':
                return <p>Contenu de Place...</p>;
            case 'Finance':
                return <p>Contenu de Finance...</p>;
            default:
                return null;
        }
    };

    return (
        <div className="property-details-page-layout">
            
            {/* En-tête */}
            <header className="details-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Return to properties
                </button>
                <div className="header-actions">
                    <span className="header-location">Noordsingle</span> {/* Emplacement mocké */}
                    <button className="action-btn"></button>
                    <button className="action-btn"></button>
                </div>
            </header>

            <div className="content-area">
                <main className="main-content">
                    {/* Grille d'Images */}
                    <ImageGrid images={data.imageUrls}  /> 
                    
                    {/* Infos Principales */}
                    <div className="main-info-block">
                        <h1>{data.title}</h1>
                        <p className="location-info">
                             {data.location}
                        </p>
                    </div>

                    {/* Navigation par Onglets */}
                    <nav className="details-tabs">
                        {['General', 'Sustainability', 'Place', 'Finance'].map(tab => (
                            <button 
                                key={tab} 
                                className={activeTab === tab ? 'tab-btn active' : 'tab-btn'}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>

                    {/* Contenu Dynamique de l'Onglet */}
                    <div className="tab-content">
                        {renderContent()}
                    </div>
                </main>
                
                {/* Colonne Latérale d'Investissement */}
                <aside className="sidebar-container">
                    <Sidebar {...data} onInvestClick={handleGoToConfirmPurchaseClick}/>
                </aside>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;