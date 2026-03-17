import React, { useState, useContext, useEffect } from "react";
import { FaCrown, FaCheck, FaTimes } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from "react-i18next"; // i18n import
import './SubscriptionPage.css';

import BackButton from '../components/common/BackButton'; 

export default function SubscriptionPage() {
  const { token } = useContext(AuthContext);
  const { t } = useTranslation(); // t függvény inicializálása
  
  const [currentPlan, setCurrentPlan] = useState('basic'); 
  const [loadingPlan, setLoadingPlan] = useState(''); 
  const [selectedDuration, setSelectedDuration] = useState(1); 
  const [isAutoRenew, setIsAutoRenew] = useState(true);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    lastName: '',
    firstName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentData({ lastName: '', firstName: '', cardNumber: '', expiry: '', cvv: '' });
  };

  useEffect(() => {
    if (showPaymentModal || showSuccessModal) {
      document.body.classList.add('payment-modal-open');
    } else {
      document.body.classList.remove('payment-modal-open');
    }
    return () => document.body.classList.remove('payment-modal-open');
  }, [showPaymentModal, showSuccessModal]);

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => setShowSuccessModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

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
            alert(`${t('subscriptionPage.errors.purchaseFailed')}: ${errText}`);
        }
    } catch (error) {
        console.error("Vásárlási hiba:", error);
        alert(t('subscriptionPage.errors.networkError'));
    } finally {
        setLoadingPlan('');
    }
  };

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
      
      <BackButton to="/shop"  />

      <div className="text-center mt-4 mb-5 px-3">
        <h1 className="hero-title">{t('subscriptionPage.heroTitle')}</h1>
        <p className="subtitle-text mx-auto">{t('subscriptionPage.heroSubtitle')}</p>
      </div>

      <div className="features-section">
        <div className="pricing-grid two-cards-only">
          
          {/* Alap Csomag */}
          <div className="pricing-card">
            <h3 className="mb-2 fw-bold">{t('subscriptionPage.plans.basic.name')}</h3>
            <div className="price-display">{t('subscriptionPage.plans.basic.price')}</div>
            <ul className="pricing-features mt-4">
              <li><FaCheck className="feature-icon-check"/> {t('subscriptionPage.features.basicFeatures')}</li>
              <li><FaCheck className="feature-icon-check"/> {t('subscriptionPage.features.limitedLessons')}</li>
              <li className="feature-disabled"><FaTimes className="me-2"/> {t('subscriptionPage.features.noAds')}</li>
            </ul>
            <button className="cta-button secondary w-100 mt-auto" disabled style={{ opacity: currentPlan === 'basic' ? 1 : 0.5 }}>
              {currentPlan === 'basic' ? t('subscriptionPage.status.currentPlan') : t('subscriptionPage.status.freePlan')}
            </button>
          </div>

          {/* Premium Csomag */}
          <div className="pricing-card highlighted premium-card">
            <div className="popular-badge">{t('subscriptionPage.plans.premium.badge')}</div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="fw-bold mb-0">{t('subscriptionPage.plans.premium.name')}</h3>
              <FaCrown className="text-warning fs-3" />
            </div>
            
            <ul className="pricing-features mt-4 mb-4">
              <li><FaCheck className="feature-icon-check"/> {t('subscriptionPage.features.unlimitedLearning')}</li>
              <li><FaCheck className="feature-icon-check"/> {t('subscriptionPage.features.noAds')}</li>
              <li><FaCheck className="feature-icon-check"/> {t('subscriptionPage.features.offlineMode')}</li>
            </ul>

            <div className="duration-selector mb-3">
              <div className={`duration-option ${selectedDuration === 1 ? 'active' : ''}`} onClick={() => setSelectedDuration(1)}>
                <div className="duration-title">1 {t('subscriptionPage.duration.month')}</div>
                <div className="duration-price">2.990 Ft</div>
              </div>
              <div className={`duration-option ${selectedDuration === 12 ? 'active' : ''}`} onClick={() => setSelectedDuration(12)}>
                <div className="discount-tag">{t('subscriptionPage.duration.discount')}</div>
                <div className="duration-title">12 {t('subscriptionPage.duration.month')}</div>
                <div className="duration-price">19.990 Ft</div>
              </div>
            </div>

            <div className="auto-renew-toggle mb-4">
              <label className="toggle-label">
                <input type="checkbox" checked={isAutoRenew} onChange={(e) => setIsAutoRenew(e.target.checked)} />
                <span className="checkmark"></span>
                {t('subscriptionPage.options.autoRenew')}
              </label>
            </div>

            <button 
              className={`cta-button ${currentPlan === 'premium' ? 'secondary' : 'primary'} w-100 mt-auto`}
              onClick={() => { if(token) setShowPaymentModal(true); else alert(t('subscriptionPage.errors.loginRequired')); }}
              disabled={currentPlan === 'premium' || loadingPlan === 'premium'}
            >
              {loadingPlan === 'premium' ? <Spinner animation="border" size="sm" /> : 
               currentPlan === 'premium' ? t('subscriptionPage.status.currentPlan') : t('subscriptionPage.status.startSubscription')}
            </button>
          </div>
        </div>
      </div>

      {/* --- FIZETÉSI MODAL --- */}
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal-content">
            <button className="payment-modal-close" onClick={handleClosePaymentModal}><FaTimes /></button>
            <h2 className="mb-4">{t('subscriptionPage.modal.paymentTitle')}</h2>
            <p className="mb-4">{t('subscriptionPage.modal.selectedPlan')}: <strong>Premium ({selectedDuration} {t('subscriptionPage.duration.month')})</strong></p>

            <div className="form-row d-flex gap-3 mb-3">
              <div className="flex-fill">
                <label>{t('subscriptionPage.modal.lastName')}</label>
                <input type="text" name="lastName" className="form-control" value={paymentData.lastName} onChange={handleInputChange} placeholder={t('subscriptionPage.modal.placeholderLastName')} />
              </div>
              <div className="flex-fill">
                <label>{t('subscriptionPage.modal.firstName')}</label>
                <input type="text" name="firstName" className="form-control" value={paymentData.firstName} onChange={handleInputChange} placeholder={t('subscriptionPage.modal.placeholderFirstName')} />
              </div>
            </div>

            <div className="mb-3">
              <label>{t('subscriptionPage.modal.cardNumber')}</label>
              <input type="text" name="cardNumber" className="form-control" value={paymentData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" maxLength="19" />
            </div>

            <div className="form-row d-flex gap-3 mb-4">
              <div className="flex-fill">
                <label>{t('subscriptionPage.modal.expiry')}</label>
                <input type="text" name="expiry" className="form-control" value={paymentData.expiry} onChange={handleInputChange} placeholder="HH/ÉÉ" maxLength="5" />
              </div>
              <div className="flex-fill">
                <label>{t('subscriptionPage.modal.cvv')}</label>
                <input type="password" name="cvv" className="form-control" value={paymentData.cvv} onChange={handleInputChange} placeholder="123" maxLength="3" />
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button 
                className={`cta-button ${isFormValid ? 'primary' : 'secondary disabled'}`}
                disabled={!isFormValid || loadingPlan === 'premium'}
                onClick={handlePaymentSubmit}
              >
                {loadingPlan === 'premium' ? <Spinner animation="border" size="sm" /> : t('subscriptionPage.modal.confirmPayment')}
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
            <h2>{t('subscriptionPage.modal.successTitle')}</h2>
            <p>{t('subscriptionPage.modal.successMessage')}</p>
          </div>
        </div>
      )}
    </div>
  );
}