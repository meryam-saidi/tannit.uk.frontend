import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// --- Interfaces ---
interface Property {
  id: string;
  name: string;
  description: string;
  totalValue: number;
  totalShares: number;
  availableShares: number;
  pricePerShare: number;
  address: string;
  imageUrls: string[];
}

// Composant Placeholder pour les icônes de services (Amenities)
const AmenityIcon: React.FC = () => (
    <div className="amenity-icon">A</div> // Remplacez 'A' par une icône réelle
);

// Carte de propriété (version mockée, indépendante de la base)
const PropertyCard: React.FC<{ property?: Property }> = ({ property }) => {
  const navigate = useNavigate();

  // Si aucune propriété n’est fournie, on utilise des valeurs mock
  const mockProperty = {
    title: "Modern Villa",
    location: "London, UK",
    priceK: 500,
    convertedPrice: 10000,
    remainingInvestment: 2500,
    investors: 12,
    profitability: 8,
    returned: 25,
    amenities: ['Y', 'L', 'D', 'C', 'B'], // 5 icônes de services
    pricePerShare: 10.20,
    // L'erreur est probablement causée par l'absence de ces champs :
    area: 650, // sqft
    targetProfitability: 3.5,
    numberLot: 1,
    energyClass: 'B',
    energyIndex: 64, // KWh/m2/a
    imageSources: [ // Chemins mockés
        '/house1.jpg', 
        '/house1.jpg',
        '/house1.jpg',
        '/house1.jpg',
    ],
     indicators: { value: 5000, percent: 50 },
     tags: ["Eco-Friendly", "High Demand"]
  };

  const p = property
    ? {
        title: property.name,
        location: property.address,
        priceK: Math.round(property.totalValue / 1000),
        convertedPrice: property.totalValue / 10, // juste pour mock
        remainingInvestment: property.availableShares * property.pricePerShare,
        investors: property.totalShares - property.availableShares,
        profitability: 8,
        returned: 25,
        pricePerShare: property.totalValue / property.totalShares,
        indicators: [{ value: property.totalValue, percent: 50 }, { value: 125, percent: 0.2  }, ],
        tags: ["Investment", "Eco Friendly", "With credit"],
        amenities: ['Y', 'L', 'D', 'C', 'B'],
          // Assurez-vous que l'API fournit ces valeurs, sinon MOCKEZ-LES ICI AUSSI :
          area: 650, // Si l'API ne fournit pas 'area', vous devez le mocker ici
          targetProfitability: 3.5, // Si l'API ne fournit pas 'targetProfitability', vous devez le mocker ici
          numberLot: 1, // Si l'API ne fournit pas 'numberLot', vous devez le mocker ici
          energyClass: 'B', // Si l'API ne fournit pas 'energyClass', vous devez le mocker ici
          energyIndex: 64, // Si l'API ne fournit pas 'energyIndex', vous devez le mocker ici
          imageSources: [
             // Mettez ici les chemins d'images de l'API si disponibles, sinon mockez-les.
             property.imageUrls?.[0],
             property.imageUrls?.[1],
             property.imageUrls?.[2]
          ],
      }
    : mockProperty;

  const progressPercent =
    ((p.convertedPrice - p.remainingInvestment) / p.convertedPrice) * 100;

  const handleGoToPropertyDetailsClick = () => {
  // MODIFICATION IMPORTANTE : on passe l'objet 'p' dans le state de navigation
    navigate('/PropertyDetailsPage', { state: { propertyData: p } });
  };  
  
  return (
    <div className="property-card">
      <div className="card-image-container">
        <img
          src={p.imageSources?.[0]}
          alt="Property Image"
          className="card-image-placeholder"
        />
        {p.tags.map((tag) => (
          <span
            key={tag}
            className={`tag ${tag.toLowerCase().replace(' ', '-')}`}
          >
            {tag}
          </span>
        ))}
        <div className="image-indicators">
          <span>{p.pricePerShare.toLocaleString()}£/share</span>
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
        <h3>{p.title}</h3>
        <p className="location">📍 {p.location}</p>

        <div className="price-investor-info">
          <p className="price-main">{p.priceK}K £</p>
          <div className="investor-details">
            <span className="converted-price">
              Converted to: {p.convertedPrice} Tannits
            </span>
            <span className="remaining-amount">{p.remainingInvestment} remaining</span>
            <span className="investor-count">👤 {p.investors} Investors</span>
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
            <p className="stat-value">{p.profitability}%</p>
          </div>
          <div className="stat">
            <p className="stat-label">Returned</p>
            <p className="stat-value">{p.returned}%</p>
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
        {properties.length > 0
          ? properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          : // Affiche quelques cartes mockées si pas encore de données
            [1, 2, 3].map((i) => <PropertyCard key={i} />)}
      </div>
    </div>
  );
};

export default PropertiesPage;