import React from 'react';
import houseImage from '/house1.jpg'; 

// --- Interfaces de Données ---
interface Property {
  id: number;
  title: string;
  location: string;
  priceK: number; // Prix en K£
  convertedPrice: number; // Prix en Tannits
  remainingInvestment: number;
  investors: number;
  profitability: number;
  returned: number;
  tags: string[]; // Ex: ["Eco Friendly", "With credit"]
  indicators: { value: number; percent: number }; // Ex: 125 - 0.2%
}

// --- Données d'Exemple ---
const propertiesData: Property[] = [
  {
    id: 1,
    title: "Petrus campersingel",
    location: "Willow Road, London NW17JE",
    priceK: 245,
    convertedPrice: 24600,
    remainingInvestment: 24090,
    investors: 4,
    profitability: 2.5,
    returned: 3.7,
    tags: ["Eco Friendly", "With credit"],
    indicators: { value: 125, percent: 0.2 }
  },
  {
    id: 2,
    title: "Noordsingle",
    location: "Vauxhall Walk, London SE11",
    priceK: 699,
    convertedPrice: 69900,
    remainingInvestment: 69700,
    investors: 2,
    profitability: 5.4,
    returned: 10.2,
    tags: ["Eco Friendly", "With credit"],
    indicators: { value: 125, percent: 0.2 }
  },
  {
    id: 3,
    title: "Boven Engweg",
    location: "Hammersmith Grove, London W6EN",
    priceK: 535,
    convertedPrice: 53500,
    remainingInvestment: 53500,
    investors: 0,
    profitability: 2.4,
    returned: 7.2,
    tags: ["Eco Friendly", "With credit"],
    indicators: { value: 125, percent: 0.2 }
  }
];

// --- Composant : Carte de Propriété ---

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  // Calcul simple de la progression pour la barre (ex: 10% complété)
  const progressPercent = ((property.convertedPrice - property.remainingInvestment) / property.convertedPrice) * 100;

  return (
    <div className="property-card">
      {/* Conteneur d'Image et Tags */}
      <div className="card-image-container">
        {/* L'image réelle serait ici */}
        <div><img src="/house1.jpg" alt="Property Image" className="card-image-placeholder" /></div>

        {property.tags.map(tag => (
          <span key={tag} className={`tag ${tag.toLowerCase().replace(' ', '-')}`}>
            {tag}
          </span>
        ))}
        
        {/* Indicateurs Eco */}
        <div className="image-indicators">
          <span>{property.indicators.value}€</span> - <span>{property.indicators.percent}%</span>
        </div>
      </div>

      {/* Détails du Corps */}
      <div className="card-body">
        <h3>{property.title}</h3>
        <p className="location">📍 {property.location}</p>

        {/* Prix et Investisseurs */}
        <div className="price-investor-info">
          <p className="price-main">
            {property.priceK}K £
          </p>
          <div className="investor-details">
            <span className="converted-price">Converted to: {property.convertedPrice} Tannits</span>
            <span className="remaining-amount">{property.remainingInvestment} remaining</span>
            <span className="investor-count">👤 {property.investors} Investors</span>
          </div>
        </div>

        {/* Ligne de progression */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
        </div>

        {/* Rentabilité et Retour */}
        <div className="stats-row">
          <div className="stat">
            <p className="stat-label">Profitability</p>
            <p className="stat-value">{property.profitability}%</p>
          </div>
          <div className="stat">
            <p className="stat-label">Returned</p>
            <p className="stat-value">{property.returned}%</p>
          </div>
        </div>

        <button className="invest-button">Invest →</button>
      </div>
    </div>
  );
};


// --- Composant Principal : Page des Propriétés ---

const PropertiesPage: React.FC = () => {
  return (
    <div className="properties-page-layout">
      {/* 1. Barres de Navigation Supérieure */}
      <nav className="top-nav">
        <div className="nav-items">
            <a href="#" className="nav-link active">Properties ({propertiesData.length})</a>
            <a href="#" className="nav-link">My investments (0)</a>
            <a href="#" className="nav-link">My marketplace (0)</a>
        </div>
      </nav>

      {/* 2. Barre de Filtres */}
      <div className="filter-bar">
        <div className="filter-dropdowns">
          <select className="filter-select"><option>Price range</option></select>
          <select className="filter-select"><option>Type</option></select>
          <select className="filter-select"><option>Region</option></select>
          <select className="filter-select"><option>Energy</option></select>
          <button className="advanced-filter-btn">Advanced filter</button>
        </div>
        
        <input type="text" placeholder="Search for property" className="search-input" />
      </div>

      {/* 3. Filtres Appliqués et Outils de Tri */}
      <div className="applied-filters-and-sort">
        <div className="applied-filters">
          <span className="filter-label">Applied filter :</span>
          <span className="applied-filter-tag">United Kingdom <span className="close-tag">×</span></span>
          <span className="applied-filter-tag">Price : 12K £ - 320 £ <span className="close-tag">×</span></span>
          <span className="applied-filter-tag">Price : 12K £ - 320 £ <span className="close-tag">×</span></span>
          {/* Note: Un 4ème filtre invisible est présent sur l'image */}
          <span className="applied-filter-tag invisible-tag"><span className="close-tag">×</span></span> 
        </div>
        
        <div className="sort-by">
          <span className="showing-results">Showing {propertiesData.length} properties that match your search criteria</span>
          <button className="sort-button">Sort by (Date) ⇵</button>
        </div>
      </div>
      
      <div className="separator-line"></div>

      {/* 4. Grille des Propriétés */}
      <div className="property-list-grid">
        {propertiesData.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;