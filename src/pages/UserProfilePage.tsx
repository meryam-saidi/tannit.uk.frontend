import React, { useState, useEffect } from 'react';
import Header from '../components/Header'; // Assurez-vous que le chemin est correct
import '../App.css'; // Fichier CSS pour les styles globaux
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AppHeader from '../components/AppHeader';

// Type pour les données utilisateur
interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  placeOfBirth: string;
  departmentOfBirth: string;
  nativeCountry: string;
  residenceCountry: string;
  city: string;
  zipCode: string;
  region: string;
  address: string;
  maritalStatus: string;
}

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  // Données de profil simulées
  const [profileData, setProfileData] = useState<UserProfile>({
    fullName: 'Loading...',
    email: '',
    phoneNumber: '',
    birthday: '',
    placeOfBirth: '',
    departmentOfBirth: '',
    nativeCountry: '',
    residenceCountry: '',
    city: '',
    zipCode: '',
    region: '',
    address: '',
    maritalStatus: '',
  });

  const [balance, setBalance] = useState(0);
  const [xp, setXp] = useState(0);
  const [activeTab, setActiveTab] = useState('My details');
  const token = useSelector((state: RootState) => state.auth.token); 
  const avatarUrl = undefined;

  useEffect(() => {
    if (!token) {
      alert("Token manquant. Veuillez vous reconnecter.");
      navigate("/loginPage", { replace: true });
      return;
    }

    const load = async () => {
      try {
        // 1) Récupérer le profil MÉTIER depuis le backend (balance, etc.)
        const res = await fetch("https://localhost:7111/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          navigate("/loginPage", { replace: true });
          return;
        }
        if (!res.ok) {
          throw new Error(`Failed to fetch (${res.status})`);
        }

        const me = await res.json() as {
          authUserId: string;
          email: string;
          balance: number;
          vestedBalance: number;
          kycStatus: string;
        };

        // 2) Mettre à jour le header
        setBalance(me.balance ?? 0);
        // (si tu as une logique XP ailleurs, garde-la; sinon laisse à 0)
        setXp(0);

        // 3) Alimenter les infos de base du profil affiché
        const username = me.email.split("@")[0];
        setProfileData(prev => ({
          ...prev,
          email: me.email,
          fullName: username,
        }));

      } catch (error) {
        console.error("Error loading", error);
        alert("Impossible de charger votre profil. Veuillez réessayer.");
      }
    };

    load();
  }, [token, navigate]);
  // Le tableau de dépendances vide [] garantit que cet effet ne s'exécute qu'une seule fois au montage du composant.

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveChanges = (section: string) => {
    // Logique pour enregistrer les modifications
    console.log(`Saving changes for ${section}:`, profileData);
    alert(`Changements pour la section ${section} enregistrés ! (Simulation)`);
  };

  const renderTabs = () => {
    const tabs = ['My details', 'Status', 'Investment', 'Documents', 'Referrals', 'My favorites'];
    return (
      <div className="profile-tabs">
        {tabs.map(tab => (
          <div
            key={tab}
            className={`profile-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="user-profile-page">
      {/* En-tête de la page */}
      
      <div className="profile-container">
        <div className="profile-header-card">
          <div className="profile-header-background"></div>
          <div className="profile-info">
            <img src="https://placehold.co/100x100/121212/fff?text=M" alt="User Profile" className="profile-picture" />
            <h1 className="profile-name">{profileData.fullName}</h1>
          </div>
          {renderTabs()}
        </div>

        

        <div className="profile-content">
          {activeTab === 'My details' && (
            <>
              {/* Section Informations personnelles */}
              <div className="profile-section">
                <div className="section-header">
                  <h3>Personal information</h3>
                  <p>update your photo and personal details.</p>
                </div>
                <div className="section-form">
                  <div className="form-group">
                    <label>Full name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>You are</label>
                    <input
                      type="text"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleInputChange}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Birthday</label>
                    <input
                      type="text"
                      name="birthday"
                      value={profileData.birthday}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Place of birth</label>
                    <input
                      type="text"
                      name="placeOfBirth"
                      value={profileData.placeOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Department of birth</label>
                    <input
                      type="text"
                      name="departmentOfBirth"
                      value={profileData.departmentOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Native country</label>
                    <input
                      type="text"
                      name="nativeCountry"
                      value={profileData.nativeCountry}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="section-actions">
                  <button onClick={() => handleSaveChanges('Personal information')} className="save-button">
                    Save changes
                  </button>
                </div>
              </div>

              {/* Section Adresse de résidence */}
              <div className="profile-section">
                <div className="section-header">
                  <h3>Your residence address</h3>
                  <p>update your phone and personal details.</p>
                </div>
                <div className="section-form">
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="residenceCountry"
                      value={profileData.residenceCountry}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={profileData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={profileData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Region</label>
                    <input
                      type="text"
                      name="region"
                      value={profileData.region}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Marital status</label>
                    <input
                      type="text"
                      name="maritalStatus"
                      value={profileData.maritalStatus}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="section-actions">
                  <button onClick={() => handleSaveChanges('Residence address')} className="save-button">
                    Save changes
                  </button>
                </div>
              </div>
            </>
          )}
          {/* Les autres onglets seraient rendus ici */}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;