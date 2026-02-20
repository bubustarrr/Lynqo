import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCrown, FaCheck, FaArrowLeft, FaTimes } from "react-icons/fa";

// Importáld a globális stílusaidat (ha szükséges) és az új külön CSS-t
// import '../styles/MainPage.css'; // Módosítsd a saját elérési utadra
import './SubscriptionPage.css';

export default function SubscriptionPage() {
  const navigate = useNavigate();

  return (
    <div className="main-page-container">
      
      {/* Vissza gomb a navigációhoz */}
      <div className="w-100 px-4 pt-4" style={{ maxWidth: '1200px' }}>
        <button 
          className="cta-button secondary" 
          onClick={() => navigate('/shop')}
        >
          <FaArrowLeft className="me-2 mb-1" style={{ color: '#8b5cf6' }} /> 
        </button>
      </div>

      {/* Fejléc szekció */}
      <div className="text-center mt-4 mb-5 px-3">
        <h1 className="hero-title">Válaszd ki a csomagodat</h1>
        <p className="subtitle-text mx-auto">
          Csatlakozz a Lynqo Premiumhoz! Emeld új szintre a tanulási élményedet 
          exkluzív funkciókkal és reklámmentes környezettel.
        </p>
      </div>

      {/* Előfizetés Kártyák */}
      <div className="features-section">
        <div className="pricing-grid">
          
          {/* 1. Basic / Ingyenes Csomag */}
          <div className="pricing-card">
            <h3 className="mb-2 fw-bold">Alap</h3>
            <div className="price-display">
              Ingyenes
            </div>
            <ul className="pricing-features">
              <li><FaCheck className="feature-icon-check"/> Alap funkciók hozzáférése</li>
              <li><FaCheck className="feature-icon-check"/> Napi limitált leckék</li>
              <li className="feature-disabled"><FaTimes className="me-2"/> Nincs reklám</li>
              <li className="feature-disabled"><FaTimes className="me-2"/> Offline hozzáférés</li>
            </ul>
            <button className="cta-button primary w-100 mt-auto">Jelenlegi csomag</button>
          </div>

          {/* 2. Pro Csomag (Kiemelt) */}
          <div className="pricing-card highlighted">
            <div className="popular-badge">Legnépszerűbb</div>
            
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="fw-bold mb-0">Pro</h3>
              <FaCrown className="text-warning fs-3" />
            </div>
            
            <div className="price-display">
              2.990 Ft <span className="price-period">/hó</span>
            </div>
            
            <ul className="pricing-features">
              <li><FaCheck className="feature-icon-check"/> Korlátlan tanulás</li>
              <li><FaCheck className="feature-icon-check"/> Teljesen reklámmentes</li>
              <li><FaCheck className="feature-icon-check"/> Offline hozzáférés</li>
              <li><FaCheck className="feature-icon-check"/> Fejlett statisztikák</li>
            </ul>
            <button className="cta-button primary w-100 mt-auto">Előfizetés</button>
          </div>

          {/* 3. Ultimate / Éves Csomag */}
          <div className="pricing-card">
            <h3 className="mb-2 fw-bold">Ultimate</h3>
            <div className="price-display">
              24.990 Ft <span className="price-period">/év</span>
            </div>
            <ul className="pricing-features">
              <li><FaCheck className="feature-icon-check"/> Minden Pro funkció</li>
              <li><FaCheck className="feature-icon-check"/> Exkluzív profil jelvény</li>
              <li><FaCheck className="feature-icon-check"/> Személyre szabott tervek</li>
              <li className="fw-bold" style={{ color: '#8b5cf6' }}>
                <FaCheck className="me-2"/> 2 hónap ingyen!
              </li>
            </ul>
            <button className="cta-button primary w-100 mt-auto">Előfizetés (Éves)</button>
          </div>

        </div>
      </div>
    </div>
  );
}