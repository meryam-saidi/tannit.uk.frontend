
import React, { useState, useMemo } from 'react';
import { CreditCard, Zap, Link, User, DollarSign, Wallet, Check } from 'lucide-react';
import { JSX } from 'react/jsx-runtime';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// Définition des types
interface PredefinedAmount {
  tannit: number;
  pound: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: JSX.Element;
}

interface Plan {
    id: 'classic' | 'unlimited' | 'pro';
    name: string;
    pricePound: number;
    priceUnit: string;
    tannitPerMonth: number;
    features: string[];
    isPopular?: boolean;
}

const TANNIT_RATE = 10; // 1 TANNIT = 10£

// --- Composant pour les plans d'abonnement ---
const SubscriptionPlans: React.FC = () => {
    const plans: Plan[] = [
        {
            id: 'classic',
            name: 'CLASSIC (FREE)',
            pricePound: 0,
            priceUnit: '£/month',
            tannitPerMonth: 0,
            features: [
                'Limited EcoVest features', 
                'Standard fees', 
                'No secondary market'
            ],
            isPopular: false
        },
        {
            id: 'unlimited',
            name: 'ECOVEST UNLIMITED',
            pricePound: 40,
            priceUnit: '£/month',
            tannitPerMonth: 400,
            features: [
                'Full EcoVest gamification', 
                'reduced fees', 
                'No secondary market'
            ],
            isPopular: true
        },
        {
            id: 'pro',
            name: 'PRO INVESTOR',
            pricePound: 400,
            priceUnit: '£/month',
            tannitPerMonth: 4000,
            features: [
                'Complete EcoVest experience', 
                'lowest fees', 
                'Secondary market',
                'Advanced analytics and reports'
            ],
            isPopular: false
        }
    ];

    const handleSelectPlan = (planId: string) => {
        console.log(`Plan sélectionné: ${planId}`);
        // Logique de sélection d'abonnement ici (ex: redirection vers le paiement)
    };

    return (
        <div className="subscription-plans-container">
            {plans.map((plan) => (
                <div key={plan.id} className={`plan-card ${plan.isPopular ? 'popular-plan' : ''}`}>
                    {plan.isPopular && <div className="popular-tag">Popular</div>}
                    
                    <h3 className="plan-name">{plan.name}</h3>
                    
                    <div className="plan-price">
                        <span className="price-value">
                            {plan.pricePound.toLocaleString('fr-FR', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                        <span className="price-unit">{plan.priceUnit}</span>
                    </div>

                    <p className="tannit-benefit">
                        {plan.tannitPerMonth.toLocaleString('fr-FR')} TANNITs per month
                    </p>

                    <ul className="plan-features">
                        {plan.features.map((feature, index) => (
                            <li key={index} className="feature-item">
                                <Check size={16} className="feature-icon" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button 
                        className="select-plan-button"
                        onClick={() => handleSelectPlan(plan.id)}
                    >
                        Select Plan
                    </button>
                </div>
            ))}
        </div>
    );
}
// --- Fin du Composant des plans d'abonnement ---


// --- Composant pour le paiement unique (contenu précédent) ---
const OneTimePayment: React.FC = () => {
    const [selectedTannit, setSelectedTannit] = useState<number | 'custom'>(120);
    const [customTannit, setCustomTannit] = useState<number>(0);
    const [selectedMethod, setSelectedMethod] = useState<string>('stripe');

    const predefinedAmounts: PredefinedAmount[] = [
        { tannit: 120, pound: 120 * TANNIT_RATE },
        { tannit: 320, pound: 320 * TANNIT_RATE },
        { tannit: 1500, pound: 1500 * TANNIT_RATE },
    ];

    const paymentMethods: PaymentMethod[] = [
        { id: 'stripe', name: 'Stripe', icon: <CreditCard size={20} /> },
        { id: 'paypal', name: 'Paypal', icon: <Zap size={20} /> },
        { id: 'gocardless', name: 'GoCardless', icon: <Link size={20} /> },
        { id: 'broker', name: 'Investment Broker', icon: <User size={20} /> },
        { id: 'konnect', name: 'Konnect', icon: <DollarSign size={20} /> },
    ];

    const currentPoundValue = useMemo(() => {
        const tannitAmount = selectedTannit === 'custom' ? customTannit : (selectedTannit === 0 ? 0 : selectedTannit);
        return (tannitAmount * TANNIT_RATE).toLocaleString('fr-FR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }, [selectedTannit, customTannit]);

    const handleCustomTannitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            setCustomTannit(Number(value));
            setSelectedTannit('custom');
        }
    };
    /*
    const handleConfirmPayment = () => {
        const finalTannitAmount = selectedTannit === 'custom' ? customTannit : selectedTannit;
        const finalPoundAmount = finalTannitAmount * TANNIT_RATE;
        
        console.log(`Confirmation de paiement:
            Type de paiement: One-Time
            Montant TANNIT: ${finalTannitAmount}
            Montant POUND: ${finalPoundAmount}£
            Méthode: ${selectedMethod}`);
        
        window.location.hash = '/dashboard'; // Simule la redirection
    };
    */
    const token = useSelector((state: RootState) => state.auth.token);

    const handleConfirmPayment = async () => {
        const finalTannitAmount = selectedTannit === 'custom' ? customTannit : selectedTannit;
        const finalPoundAmount = finalTannitAmount * TANNIT_RATE;
        
        const response = await fetch("https://localhost:7211/api/payments/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({
            //userId: "DEA0DE2B-3626-44E0-8DE6-924959FAC22D",  // à remplacer par l'ID utilisateur connecté
            //tannit: finalTannitAmount,
            amount: finalPoundAmount,
            currency: "GBP"
            //method: selectedMethod
            })
        });

    let data;
    try {
        data = await response.json();
    } catch (e) {
        console.error("Erreur lecture JSON:", e);
        alert("Erreur lors de la création de la session Stripe");
        return;
    }

    if (response.ok) {
        window.location.href = data.url;
    } else {
        alert("Erreur paiement: " + data.error);
    }
};

    const isPaymentDisabled = (selectedTannit === 'custom' && customTannit <= 0) || (selectedTannit !== 'custom' && selectedTannit <= 0);

    return (
        <>
            {/* Montants prédéfinis */}
            <div className="predefined-amounts-grid">
                {predefinedAmounts.map((amount) => (
                    <div
                        key={amount.tannit}
                        className={`amount-card ${selectedTannit === amount.tannit ? 'selected' : ''}`}
                        onClick={() => setSelectedTannit(amount.tannit)}
                    >
                        <div className="amount-tannit">
                            <Wallet size={20} color="#FFD700" fill="#FFD700" />
                            {amount.tannit}
                        </div>
                        <div className="amount-pound">
                            {amount.pound.toLocaleString('fr-FR', { style: 'currency', currency: 'GBP' })
                                .replace('£GB', '£') // Supprime le code GB pour n'afficher que le £
                                .replace('GBP', '£') // Gère le cas où le symbole est affiché comme un code
                            }
                        </div>
                    </div>
                ))}
            </div>

            {/* Montant personnalisé */}
            <div className="custom-amount-section">
                <h3 className="section-title">Custom amount</h3>
                <div className="input-group">
                    <span className="tannit-icon">
                        <Wallet size={20} color="#1a237e" />
                    </span>
                    <input
                        type="text"
                        placeholder="Number of TANNIT"
                        value={selectedTannit === 'custom' ? (customTannit || '') : ''}
                        onChange={handleCustomTannitChange}
                        className={`tannit-input ${selectedTannit === 'custom' ? 'active-input' : ''}`}
                        onFocus={() => setSelectedTannit('custom')}
                    />
                    <span className="pound-value">= {currentPoundValue} £</span>
                </div>
                <p className="note">Note: 1 TANNIT = 10£</p>
            </div>

            {/* Méthode de paiement */}
            <div className="payment-method-section">
                <h3 className="section-title">Payment method</h3>
                <div className="payment-methods-grid">
                    {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className={`method-tile ${selectedMethod === method.id ? 'selected' : ''}`}
                            onClick={() => setSelectedMethod(method.id)}
                        >
                            {method.id === 'paypal' && <Zap size={20} fill="#1a237e" color="#1a237e" className="method-icon" />}
                            {method.id === 'stripe' && <CreditCard size={20} className="method-icon" />}
                            {/* Ajoutez ici d'autres icônes pour les méthodes */}
                            {method.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Boutons d'action */}
            <div className="action-buttons">
                <button className="cancel-button" onClick={() => window.location.hash = '/dashboard'}>
                    Cancel
                </button>
                <button
                    className="confirm-button"
                    onClick={handleConfirmPayment}
                    disabled={isPaymentDisabled}
                >
                    Confirm Payment
                </button>
            </div>
        </>
    );
};
// --- Fin du Composant de paiement unique ---


const PaymentPage: React.FC = () => {
  const [paymentType, setPaymentType] = useState<'onetime' | 'subscription'>('onetime');
  
  return (
    <div className="payment-page-container">
      <div className="payment-card">
        <h2 className="payment-title">Add Money to Your Pot: Boost Your Savings with Contributions</h2>

        {/* Sélecteur de type de paiement */}
        <div className="payment-type-selector">
          <button
            className={`type-button ${paymentType === 'onetime' ? 'active-onetime' : ''}`}
            onClick={() => setPaymentType('onetime')}
          >
            One-Time Payment
          </button>
          <button
            className={`type-button ${paymentType === 'subscription' ? 'active-subscription' : ''}`}
            onClick={() => setPaymentType('subscription')}
          >
            Subscription
          </button>
        </div>

        {/* Contenu affiché selon le type de paiement */}
        {paymentType === 'onetime' ? <OneTimePayment /> : <SubscriptionPlans />}

      </div>
    </div>
  );
};

export default PaymentPage;