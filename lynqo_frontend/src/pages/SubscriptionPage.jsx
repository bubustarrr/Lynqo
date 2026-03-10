import React, { useState, useContext, useEffect } from "react";
// A useNavigate kikerült innen
import { FaCrown, FaCheck, FaTimes } from "react-icons/fa"; // FaArrowLeft kikerült
import { AuthContext } from '../context/AuthContext';
import { Spinner } from 'react-bootstrap';
import './SubscriptionPage.css';

// Itt importáljuk be az általad kért útvonalról a komponenst
import BackButton from '../components/common/BackButton'; 

export default function SubscriptionPage() {
  const { token } = useContext(AuthContext);
  
  // --- ÁLLAPOTOK ---
  const [currentPlan, setCurrentPlan] = useState('basic'); 
  const [loadingPlan, setLoadingPlan] = useState(''); 
  const [selectedDuration, setSelectedDuration] = useState(1); 
  const [isAutoRenew, setIsAutoRenew] = useState(true);

  // Modal állapotok
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    lastName: '',
    firstName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // --- MODAL KEZELÉS ---
  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentData({ lastName: '', firstName: '', cardNumber: '', expiry: '', cvv: '' });
  };

  // Zároljuk a görgetést, ha nyitva a modal
  useEffect(() => {
    if (showPaymentModal || showSuccessModal) {
      document.body.classList.add('payment-modal-open');
    } else {
      document.body.classList.remove('payment-modal-open');
    }
    return () => document.body.classList.remove('payment-modal-open');
  }, [showPaymentModal, showSuccessModal]);

  // Siker modal automatikus bezárása
  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => setShowSuccessModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  // --- BACKEND KOMMUNIKÁCIÓ ---
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
          if (data && data.planName) {
             const now = new Date();
             const expiresAt = new Date(data.expiresAt);
             if (expiresAt > now) setCurrentPlan(data.planName.toLowerCase());
          }
        }
      } catch (error) {
        console.error("Hiba az előfizetés lekérésekor:", error);
      }
    };
    fetchSubscription();
  }, [token]);

  const handlePaymentSubmit = async () => {
    if (!token) return;
    
    setLoadingPlan('premium');
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
            handleClosePaymentModal();
            setShowSuccessModal(true);
            setCurrentPlan('premium');
        } else {
            const errText = await response.text();
            alert(`Sikertelen vásárlás: ${errText}`);
        }
    } catch (error) {
        console.error("Vásárlási hiba:", error);
        alert("Hálózati hiba történt.");
    } finally {
        setLoadingPlan('');
    }
  };

  // --- FORM KEZELÉS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    } else if (name === "expiry") {
      let cleaned = value.replace(/\D/g, '');
      formattedValue = cleaned.length >= 3 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}` : cleaned;
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, '');
    }
    setPaymentData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const isFormValid = 
    paymentData.lastName.trim().length > 0 &&
    paymentData.firstName.trim().length > 0 &&
    paymentData.cardNumber.trim().length >= 19 && 
    paymentData.expiry.trim().length === 5 && 
    paymentData.cvv.trim().length >= 3;

  return (
    <div className="main-page-container position-relative">
      
      {/* Itt használjuk az új gombot, átadva neki a "Vissza" szöveget és az útvonalat */}
      <BackButton to="/shop"  />

      <div className="text-center mt-4 mb-5 px-3">
        <h1 className="hero-title">Válaszd ki a csomagodat</h1>
        <p className="subtitle-text mx-auto">Emeld új szintre a tanulási élményedet exkluzív funkciókkal.</p>
      </div>

      <div className="features-section">
        <div className="pricing-grid two-cards-only">
          
          {/* Alap Csomag */}
          <div className="pricing-card">
            <h3 className="mb-2 fw-bold">Alap</h3>
            <div className="price-display">Ingyenes</div>
            <ul className="pricing-features mt-4">
              <li><FaCheck className="feature-icon-check"/> Alap funkciók</li>
              <li><FaCheck className="feature-icon-check"/> Napi limitált leckék</li>
              <li className="feature-disabled"><FaTimes className="me-2"/> Nincs reklám</li>
            </ul>
            <button className="cta-button secondary w-100 mt-auto" disabled style={{ opacity: currentPlan === 'basic' ? 1 : 0.5 }}>
              {currentPlan === 'basic' ? 'Jelenlegi csomag' : 'Ingyenes Csomag'}
            </button>
          </div>

          {/* Premium Csomag */}
          <div className="pricing-card highlighted premium-card">
            <div className="popular-badge">Ajánlott</div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="fw-bold mb-0">Premium</h3>
              <FaCrown className="text-warning fs-3" />
            </div>
            
            <ul className="pricing-features mt-4 mb-4">
              <li><FaCheck className="feature-icon-check"/> Korlátlan tanulás</li>
              <li><FaCheck className="feature-icon-check"/> Reklámmentesség</li>
              <li><FaCheck className="feature-icon-check"/> Offline mód</li>
            </ul>

            <div className="duration-selector mb-3">
              <div className={`duration-option ${selectedDuration === 1 ? 'active' : ''}`} onClick={() => setSelectedDuration(1)}>
                <div className="duration-title">1 Hónap</div>
                <div className="duration-price">2.990 Ft</div>
              </div>
              <div className={`duration-option ${selectedDuration === 12 ? 'active' : ''}`} onClick={() => setSelectedDuration(12)}>
                <div className="discount-tag">2 hónap ingyen!</div>
                <div className="duration-title">12 Hónap</div>
                <div className="duration-price">19.990 Ft</div>
              </div>
            </div>

            <div className="auto-renew-toggle mb-4">
              <label className="toggle-label">
                <input type="checkbox" checked={isAutoRenew} onChange={(e) => setIsAutoRenew(e.target.checked)} />
                <span className="checkmark"></span>
                Automatikus megújulás
              </label>
            </div>

            <button 
              className={`cta-button ${currentPlan === 'premium' ? 'secondary' : 'primary'} w-100 mt-auto`}
              onClick={() => { if(token) setShowPaymentModal(true); else alert("Jelentkezz be!"); }}
              disabled={currentPlan === 'premium' || loadingPlan === 'premium'}
            >
              {loadingPlan === 'premium' ? <Spinner animation="border" size="sm" /> : 
               currentPlan === 'premium' ? 'Jelenlegi csomag' : 'Előfizetés indítása'}
            </button>
          </div>
        </div>
      </div>

      {/* --- FIZETÉSI MODAL --- */}
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal-content">
            <button className="payment-modal-close" onClick={handleClosePaymentModal}><FaTimes /></button>
            <h2 className="mb-4">Biztonságos Fizetés</h2>
            <p className="mb-4">Csomag: <strong>Premium ({selectedDuration} hónap)</strong></p>

            <div className="form-row d-flex gap-3 mb-3">
              <div className="flex-fill">
                <label>Vezetéknév</label>
                <input type="text" name="lastName" className="form-control" value={paymentData.lastName} onChange={handleInputChange} placeholder="Kovács" />
              </div>
              <div className="flex-fill">
                <label>Keresztnév</label>
                <input type="text" name="firstName" className="form-control" value={paymentData.firstName} onChange={handleInputChange} placeholder="János" />
              </div>
            </div>

            <div className="mb-3">
              <label>Kártyaszám</label>
              <input type="text" name="cardNumber" className="form-control" value={paymentData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" maxLength="19" />
            </div>

            <div className="form-row d-flex gap-3 mb-4">
              <div className="flex-fill">
                <label>Lejárat</label>
                <input type="text" name="expiry" className="form-control" value={paymentData.expiry} onChange={handleInputChange} placeholder="HH/ÉÉ" maxLength="5" />
              </div>
              <div className="flex-fill">
                <label>CVV</label>
                <input type="password" name="cvv" className="form-control" value={paymentData.cvv} onChange={handleInputChange} placeholder="123" maxLength="3" />
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button 
                className={`cta-button ${isFormValid ? 'primary' : 'secondary disabled'}`}
                disabled={!isFormValid || loadingPlan === 'premium'}
                onClick={handlePaymentSubmit}
              >
                {loadingPlan === 'premium' ? <Spinner animation="border" size="sm" /> : 'Fizetés megerősítése'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SIKER MODAL --- */}
      {showSuccessModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal-content text-center py-5">
            <div className="mb-4 d-flex justify-content-center">
              <div style={{ backgroundColor: '#ec4899', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaCheck style={{ color: 'white', fontSize: '40px' }} />
              </div>
            </div>
            <h2>Sikeres fizetés!</h2>
            <p>Köszönjük! A Premium funkciók aktiválva lettek.</p>
          </div>
        </div>
      )}
    </div>
  );
}