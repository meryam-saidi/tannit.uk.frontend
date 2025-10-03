import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';

// Types pour les indicateurs de solde
interface BalanceIndicator {
  icon: string;
  label: string;
  value: number;
  currencyValue: number;
  unit: string;
  color: string;
}

// Type pour une transaction
interface Transaction {
  id: string;
  date: string;
  details: string;
  amount: number;
  tannit: number;
  type: 'Purchase' | 'Sold' | 'Top-Up Transaction' | 'SignupBonus';
  status: 'Pending' | 'Settled' | 'Vested';
}

const Dashboard: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0); // balance vested
  const [processing, setProcessing] = useState(0); // transactions pending
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [xp, setXp] = useState(8);

  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGetTannitClick = () => {
    navigate('/PaymentPage');
  };

  // Indicateurs de solde
  const [indicators, setIndicators] = useState<BalanceIndicator[]>([
    { icon: '💰', label: 'Current balance', value: 0, currencyValue: 0, unit: '£', color: '#FFD700' },
    { icon: '⏳', label: 'Processing', value: 0, currencyValue: 0, unit: '£', color: '#1a237e' },
    { icon: '💵', label: 'Current cash', value: 0, currencyValue: 0, unit: '£', color: '#28a745' },
    { icon: '💳', label: 'Wallet value', value: 0, currencyValue: 0, unit: '£', color: '#007bff' },
  ]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get('https://localhost:7211/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { balance: vestedBalance, processing: pendingAmount, transactions } = res.data;

        setBalance(vestedBalance);
        setProcessing(pendingAmount);
        setTransactions(transactions);

        // Mise à jour des indicateurs
        setIndicators([
          { icon: '💰', label: 'Current balance', value: vestedBalance, currencyValue: vestedBalance * 10, unit: '£', color: '#FFD700' },
          { icon: '⏳', label: 'Processing', value: pendingAmount, currencyValue: pendingAmount * 10, unit: '£', color: '#1a237e' },
          { icon: '💵', label: 'Current cash', value: 0, currencyValue: 0, unit: '£', color: '#28a745' },
          { icon: '💳', label: 'Wallet value', value: vestedBalance +pendingAmount, currencyValue: pendingAmount * 10, unit: '£', color: '#007bff' },
        ]);
      } catch (err) {
        console.error('Erreur récupération dashboard', err);
      }
    };

    fetchDashboard();
  }, [token]);

  const getAmountColor = (type: string) => {
    if (type === 'Purchase') return 'transaction-negative'; // rouge
    return 'transaction-positive'; // vert pour tout le reste
  };

  // Composant pour un indicateur de solde
  const BalanceCard: React.FC<BalanceIndicator & { isFirst: boolean }> = ({ icon, label, value, currencyValue, unit, isFirst, color }) => (
    <div className={`balance-card ${isFirst ? 'balance-tannit' : ''}`}>
      <div className="balance-header">
        <span className="balance-icon" style={{ color }}>{icon}</span>
        <span className="balance-label">{label}</span>
      </div>
      <div className="balance-values">
        <span className="large-value">{value}</span>
      </div>
      <div className="currency-equivalent">
        = {currencyValue.toLocaleString('fr-FR')} {unit}
      </div>
    </div>
  );

  // Filtrage des transactions
const filteredTransactions = transactions.filter(tx => {
  const txDate = new Date(tx.date);
  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;

  const matchesDate = (!start || txDate >= start) && (!end || txDate <= end);
  const matchesSearch = !searchQuery || 
    (tx.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     tx.type?.toLowerCase().includes(searchQuery.toLowerCase()));

  // N’affiche que Settled ou Vested = Exclure les Pending
  const allowedStatus = tx.status === 'Settled' || tx.status === 'Vested';

  const allowedDetails = tx.type !== 'SignupBonus' ;

  return matchesDate && matchesSearch && allowedStatus && allowedDetails;
});

  return (
    <div className="app-container transactions-page">
      <div className="transactions-container">
        {/* Section des indicateurs de solde */}
        <div className="balance-indicators-section">
          <div className="indicators-grid">
            {indicators.map((ind, index) => (
              <BalanceCard key={ind.label} {...ind} isFirst={index === 0} />
            ))}
          </div>
          <button className="get-tannit-button" onClick={handleGetTannitClick}>
            Get TANNIT
          </button>
        </div>

        {/* Tableau des transactions */}
        <div className="transactions-table-card">
          <h3 className="transactions-header-title">Latest transactions</h3>
          <div className="transactions-filter-bar">
            <div className="date-filter">
              <input type="date" placeholder="jj/mm/aaaa" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="date-filter">
              <input type="date" placeholder="jj/mm/aaaa" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="search-activity">
              <input
                type="text"
                placeholder="Search for activity"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="transaction-table-wrapper">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>Details</th>
                  <th>Amount</th>
                  <th>Tannit</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{new Date(tx.date).toLocaleDateString('fr-FR')}</td>
                    <td>{tx.type}</td>
                    <td className={getAmountColor(tx.type)}>{tx.amount.toLocaleString('fr-FR')}£</td>
                    <td>{tx.tannit.toLocaleString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
