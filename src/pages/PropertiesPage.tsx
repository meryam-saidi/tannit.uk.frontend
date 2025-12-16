import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropertyImageCarousel from "./PropertyImageCarousel";

// --- Interfaces ---
export interface PropertyImage {
  id: string;
  propertyId: string;
  imageUrl: string;
  caption?: string;
  isCover: boolean;
  displayOrder: number;
}

export interface Property {
  id: string;
  name: string;
  description: string;

  totalValue: number;
  totalShares: number;
  availableShares: number;
  pricePerShare: number;

  address: string;
  latitude?: number;
  longitude?: number;

  lotNumber: string;
  lotArea: number;

  gesEmission: number;
  energyConsumption: number;
  energyClass: string;

  images: PropertyImage[];

}

// Composant Placeholder pour les icônes de services (Amenities)
const AmenityIcon: React.FC = () => (
    <div className="amenity-icon">A</div> // Remplacez 'A' par une icône réelle
);

// Carte de propriété (version mockée, indépendante de la base)
const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const navigate = useNavigate();

  const progressPercent =
    ((property.totalValue - property.availableShares * property.pricePerShare) / property.totalValue) * 100;

  const handleGoToPropertyDetailsClick = () => {
  // MODIFICATION IMPORTANTE : on passe l'objet 'p' dans le state de navigation
    navigate('/PropertyDetailsPage', { state: { propertyData: property } });
  };  
  
  return (
    <div className="property-card">
      <div className="card-image-container">
        <PropertyImageCarousel images={property.images} />

        <div className="image-indicators">
          <span>{property.pricePerShare.toLocaleString()}£/share</span>
        </div>

        {/* Tag Eco Friendly */}
        <span className="tag eco-friendly">
          <span className="icon">🌱</span> Eco Friendly
        </span>

        {/* Indicateurs (125↑ 0.2%) */}
        <span className="tag indicator-tag">
          <span className="icon">🌱</span> 125 ↑ 0.2%
        </span>

      </div>

      <div className="card-body">
        <h3>{property.name}</h3>
        <p className="location">📍 {property.address}</p>

        <div className="price-investor-info">
          
          <p className="price-main">{Math.round(property.totalValue / 1000)}K £</p>
          
          <div className="investor-details">
            <span className="converted-price">
              Converted to: {property.totalValue / 10} Tannits
            </span>
            <span className="remaining-amount">
              Remaining: {property.availableShares * property.pricePerShare} £
            </span>
            <span className="investor-count">
              👥 {property.totalShares - property.availableShares} Investors
            </span>
          </div>
        
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="stats-row">
          <div className="stat">
            <p className="stat-label">Profitability</p>
            <p className="stat-value">25%</p>
          </div>
          <div className="stat">
            <p className="stat-label">Returned</p>
            <p className="stat-value">5%</p>
          </div>
        </div>

        <button className="invest-button" onClick={handleGoToPropertyDetailsClick}>Invest →</button>
      </div>
    </div>
  );
};

// Page principale
const PropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    axios
      .get<Property[]>('https://localhost:7211/api/Properties')
      .then((response) => setProperties(response.data))
      .catch((error) => console.error("Error fetching properties", error));
  }, []);

  return (
    <div className="properties-page-layout">
      <nav className="top-nav">
        <div className="nav-items">
          <a href="#" className="nav-link active">
            Properties ({properties.length})
          </a>
          <a href="#" className="nav-link">My investments (0)</a>
          <a href="#" className="nav-link">My marketplace (0)</a>
        </div>
      </nav>

      {/* 2. Barre de Filtres (avec dropdowns et champ de recherche) */}
      <div className="filter-bar">
        <div className="filter-dropdowns">
          <select className="filter-select"><option>Price range</option></select>
          <select className="filter-select"><option>Type</option></select>
          <select className="filter-select"><option>Region</option></select>
          <select className="filter-select"><option>Energy</option></select>
          <button className="advanced-filter-btn">Advanced filter</button>
        </div>
        
        <div className="search-container">
            <input type="text" placeholder="Search for property" className="search-input" />
            <button className="search-icon-btn">🔍</button>
        </div>
      </div>

      {/* 3. Filtres Appliqués et Outils de Tri */}
      <div className="applied-filters-and-sort">
        <div className="applied-filters">
          <span className="filter-label">Applied filter :</span>
          <span className="applied-filter-tag">United Kingdom <span className="close-tag">×</span></span>
          <span className="applied-filter-tag">Price : 12K £ - 320 £ <span className="close-tag">×</span></span>
          <span className="applied-filter-tag">Price : 12K £ - 320 £ <span className="close-tag">×</span></span>
          <span className="applied-filter-tag invisible-tag">0</span> {/* Placeholder pour le filtre invisible */}
        </div>
        
        <div className="sort-by-row">
          <div className="showing-results">
            Showing 22 properties that match your search criteria
          </div>
          <button className="sort-button">Sort by (Date) ⇵</button>
        </div>
      </div>
      
      <div className="separator-line"></div>

      <div className="property-list-grid">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;