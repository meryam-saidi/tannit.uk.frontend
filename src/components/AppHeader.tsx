// src/components/AppHeader.tsx
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Home, Building2, Store, MessageSquare, Bell } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";

export default function AppHeader() {
  const { balance, email } = useSelector((s: RootState) => s.account);
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/UserProfilePage");
  };

  return (
    <header className="full-width-header">
      <nav className="navbar">
        <div>
          <Link to="/dashboard"><img src="/tannit.PNG" alt="Tannit Logo" className="logo" /></Link>
        </div>
        <div className="nav-links">
          <NavLink to="/dashboard" className="nav-item">
              <Home size={18} className="mr-2" />
              Dashboard
          </NavLink>
          <NavLink to="/PropertiesPage" className="nav-item">
              <Building2 size={18} className="mr-2" />
              Properties
          </NavLink>
          <NavLink to="/marketplace" className="nav-item">
              <Store size={18} className="mr-2" />
              Marketplace
          </NavLink>
          <NavLink to="/forum" className="nav-item">
              <MessageSquare size={18} className="mr-2" />
              Forum
          </NavLink>
        </div>
        <div className="user-stats">
          <div className="stat-item">
            <img src="/Green Coin.png" alt="XP" className="xp-image"/>
            <div className="balance-text">
              <span className="label">0K XP</span>
            </div>
          </div>
          <div className="stat-item">
            <img src="/Yellow Coin.png" alt="Balance" className="balance-image"/>
            <div className="balance-text">
              <span className="label">BALANCE</span>
              <span className="value">{balance}</span>
            </div>
          </div>
          <div className="notification-icon">
            <Bell size={22} className="text-gray-600 cursor-pointer hover:text-black" />
          </div>
            <ProfileAvatar progress={60} onClick={goToProfile} /> 
            {/* A faire: calculer le progress automatiquement en fonction des champs remplis du profil 
            (par exemple : 8 champs remplis sur 10 → 80%). */}
        </div>
      </nav>
    </header>
  );
}
