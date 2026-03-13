import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheck } from "react-icons/fa";
import { Spinner } from 'react-bootstrap';

export default function PaymentModal({ 
  show, 
  onClose, 
  onSuccess, 
  totalAmount, 
  token 
}) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState({
    lastName: '', firstName: '', address: '', phone: '', cardNumber: '', expiry: '', cvv: ''
  });

  // Zároljuk a görgetést
  useEffect(() => {
    if (show || showSuccess) {
      document.body.classList.add('payment-modal-open');
    } else {
      document.body.classList.remove('payment-modal-open');
    }
    return () => document.body.classList.remove('payment-modal-open');
  }, [show, showSuccess]);

  // Siker modal időzítője
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        onSuccess(); // Meghívjuk a szülő sikeres vásárlás függvényét (kosár ürítés)
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, onSuccess]);

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
    } else if (name === "phone") {
      formattedValue = value.replace(/[^\d+]/g, '');
    }
    
    setPaymentData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const isFormValid = 
    paymentData.lastName.trim().length > 0 &&
    paymentData.firstName.trim().length > 0 &&
    paymentData.address.trim().length > 5 &&
    paymentData.phone.trim().length > 8 &&
    paymentData.cardNumber.trim().length >= 19 && 
    paymentData.expiry.trim().length === 5 && 
    paymentData.cvv.trim().length >= 3;

  const handleSubmit = async () => {
    if (!token) return alert("Bejelentkezés szükséges!");
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      onClose(); // Bezárjuk a kitöltős modalt
    }, 2000);
  };

  if (!show && !showSuccess) return null;

  return (
    <>
      {/* Fő Fizetési Modal */}
      {show && (
        <div className="payment-modal-overlay">
          <div className="payment-modal-content">
            <button className="payment-modal-close" onClick={onClose}><FaTimes /></button>
            <h2 className="mb-4">Biztonságos Fizetés</h2>
            <p className="mb-4">Fizetendő összeg: <strong>${totalAmount}</strong></p>

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
              <label>Szállítási cím</label>
              <input type="text" name="address" className="form-control" value={paymentData.address} onChange={handleInputChange} placeholder="1234 Város, Utca házszám" />
            </div>

            <div className="mb-3">
              <label>Telefonszám</label>
              <input type="text" name="phone" className="form-control" value={paymentData.phone} onChange={handleInputChange} placeholder="+36 30 123 4567" />
            </div>

            <hr className="my-4" />

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
                disabled={!isFormValid || loading}
                onClick={handleSubmit}
              >
                {loading ? <Spinner animation="border" size="sm" /> : 'Fizetés megerősítése'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sikeres Vásárlás Modal */}
      {showSuccess && (
        <div className="payment-modal-overlay">
          <div className="payment-modal-content text-center py-5">
            <div className="mb-4 d-flex justify-content-center">
              <div style={{ backgroundColor: '#ec4899', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaCheck style={{ color: 'white', fontSize: '40px' }} />
              </div>
            </div>
            <h2>Köszönjük a vásárlást!</h2>
            <p>A kosarad kiürült, a rendelésedet pedig sikeresen rögzítettük.</p>
          </div>
        </div>
      )}
    </>
  );
}