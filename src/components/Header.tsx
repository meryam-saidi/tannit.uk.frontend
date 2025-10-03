import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';

const Header: React.FC = () => {
  const { balance, email } = useSelector((s: RootState) => s.account);

  return (
    <div className="full-width-header">
        <div>
          <Link to="/"><img src="/tannit.PNG" alt="Tannit Logo" className="logo" /></Link>
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
        </div>      
    </div>    
  );
};

export default Header;