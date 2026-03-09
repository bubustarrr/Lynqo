import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCrown, FaCheck, FaArrowLeft, FaTimes } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext';
import { Spinner } from 'react-bootstrap';
import './SubscriptionPage.css';

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  
  // Állapotok
  const [currentPlan, setCurrentPlan] = useState('basic'); 
  const [loadingPlan, setLoadingPlan] = useState(''); 
  
  // Állapotok a Premium csomag beállításaihoz
  const [selectedDuration, setSelectedDuration] = useState(1); // 1 vagy 12 hónap
  const [isAutoRenew, setIsAutoRenew] = useState(true); // Automatikus megújulás (checkbox)

  // 1. Jelenlegi előfizetés lekérése betöltéskor
  useEffect(() => {
    if (!token) return;
    
    const fetchSubscription = async () => {
      try {
        const response = await fetch('https://localhost:7118/api/Subscriptions/me', {
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Accept': 'application/json' 
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          // Ha a DTO visszaadott egy tervet, és a lejárati idő jövőbeli
          if (data && data.planName) {
             const now = new Date();
             const expiresAt = new Date(data.expiresAt);
             
             if (expiresAt > now) {
                setCurrentPlan(data.planName.toLowerCase());
             }
          }
        }
      } catch (error) {
        console.error("Hiba az előfizetés lekérésekor:", error);
      }
    };

    fetchSubscription();
  }, [token]);

  // 2. Vásárlás elküldése
  const handleSubscribe = async () => {
    if (!token) {
        alert("Kérlek jelentkezz be a vásárláshoz!");
        return;
    }

    setLoadingPlan('premium');
    
    // Pontosan megegyezik a C# StartSubscriptionRequest DTO-val!
    const requestBody = {
        planName: 'Premium', 
        quantityMonths: selectedDuration,
        autoRenew: isAutoRenew
    };

    try {
        const response = await fetch('https://localhost:7118/api/Subscriptions/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            alert(`Sikeresen előfizettél a Premium csomagra! 🎉`);
            setCurrentPlan('premium');
        } else {
            const errText = await response.text();
            alert(`Sikertelen vásárlás: ${errText}`);
        }
    } catch (error) {
        console.error("Vásárlási hiba:", error);
        alert("Hálózati hiba történt a vásárlás során.");
    } finally {
        setLoadingPlan('');
    }
  };

  return (
    <div className="main-page-container">
      
      {/* Vissza gomb */}
      <div className="w-100 px-4 pt-4" style={{ maxWidth: '1200px' }}>
        <button 
          className="cta-button secondary" 
          onClick={() => navigate('/shop')}
        >
          <FaArrowLeft className="me-2 mb-1" style={{ color: '#8b5cf6' }} /> Vissza
        </button>
      </div>

      {/* Fejléc */}
      <div className="text-center mt-4 mb-5 px-3">
        <h1 className="hero-title">Válaszd ki a csomagodat</h1>
        <p className="subtitle-text mx-auto">
          Csatlakozz a Lynqo Premiumhoz! Emeld új szintre a tanulási élményedet 
          exkluzív funkciókkal és reklámmentes környezettel.
        </p>
      </div>

      {/* Előfizetés Kártyák */}
      <div className="features-section">
        <div className="pricing-grid two-cards-only">
          
          {/* 1. Alap (Ingyenes) Csomag */}
          <div className="pricing-card">
            <h3 className="mb-2 fw-bold">Alap</h3>
            <div className="price-display">Ingyenes</div>
            <ul className="pricing-features mt-4">
              <li><FaCheck className="feature-icon-check"/> Alap funkciók hozzáférése</li>
              <li><FaCheck className="feature-icon-check"/> Napi limitált leckék</li>
              <li className="feature-disabled"><FaTimes className="me-2"/> Nincs reklám</li>
              <li className="feature-disabled"><FaTimes className="me-2"/> Offline hozzáférés</li>
              <li className="feature-disabled"><FaTimes className="me-2"/> Személyre szabott tervek</li>
            </ul>
            <button 
              className="cta-button secondary w-100 mt-auto"
              disabled={true}
              style={{ opacity: currentPlan === 'basic' ? 1 : 0.5 }}
            >
              {currentPlan === 'basic' ? 'Jelenlegi csomag' : 'Ingyenes Csomag'}
            </button>
          </div>

          {/* 2. Premium Csomag (Dinamikus opciókkal) */}
          <div className="pricing-card highlighted premium-card">
            <div className="popular-badge">Ajánlott</div>
            
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="fw-bold mb-0">Premium</h3>
              <FaCrown className="text-warning fs-3" />
            </div>
            
            <ul className="pricing-features mt-4 mb-4">
              <li><FaCheck className="feature-icon-check"/> Korlátlan tanulás és leckék</li>
              <li><FaCheck className="feature-icon-check"/> Teljesen reklámmentes</li>
              <li><FaCheck className="feature-icon-check"/> Offline hozzáférés bárhol</li>
              <li><FaCheck className="feature-icon-check"/> Fejlett statisztikák és tervek</li>
            </ul>

            {/* Időtartam választó */}
            <div className="duration-selector mb-3">
              <div 
                className={`duration-option ${selectedDuration === 1 ? 'active' : ''}`}
                onClick={() => setSelectedDuration(1)}
              >
                <div className="duration-title">1 Hónap</div>
                <div className="duration-price">2.990 Ft</div>
              </div>
              <div 
                className={`duration-option ${selectedDuration === 12 ? 'active' : ''}`}
                onClick={() => setSelectedDuration(12)}
              >
                <div className="discount-tag">2 hónap ingyen!</div>
                <div className="duration-title">12 Hónap</div>
                <div className="duration-price">24.990 Ft</div>
              </div>
            </div>

            {/* Automatikus megújulás kapcsoló */}
            <div className="auto-renew-toggle mb-4">
              <label className="toggle-label">
                <input 
                  type="checkbox" 
                  checked={isAutoRenew} 
                  onChange={(e) => setIsAutoRenew(e.target.checked)} 
                />
                <span className="checkmark"></span>
                Automatikusan megújuló előfizetés
              </label>
            </div>

            <button 
              className={`cta-button ${currentPlan === 'premium' ? 'secondary' : 'primary'} w-100 mt-auto`}
              onClick={handleSubscribe}
              disabled={currentPlan === 'premium' || loadingPlan === 'premium'}
            >
              {loadingPlan === 'premium' ? <Spinner animation="border" size="sm" /> : 
               currentPlan === 'premium' ? 'Jelenlegi csomag' : 'Előfizetés indítása'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}