import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaCrown, FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ShopPage.css'; // Same styles

export default function ShopLandingPage() {
  const navigate = useNavigate();

  return (
  <div className="shop-landing position-relative overflow-hidden">
    <div className="gradient-bg d-flex align-items-center justify-content-center min-vh-100 p-4">
      <div className="text-center text-white max-w-600 mx-auto">
        <h1 className="display-4 fw-bold mb-4 drop-shadow">Lynqo Store</h1>
        <p className="lead mb-5 px-4 drop-shadow">
          Upgrade your learning experience or show your love for Lynqo with exclusive merchandise.
        </p>

        <div className="d-grid gap-4 d-md-block mb-5">
          <Button 
            size="lg" 
            className="landing-btn subscription-btn me-md-3 mb-3 mb-md-0 px-5 py-3"
            onClick={() => navigate('/shoppage/subscriptions')}
          >
            <FaCrown className="fs-3 me-2 mb-1" />
            Subscriptions
          </Button>

          <Button 
            size="lg" 
            className="landing-btn shop-btn px-5 py-3"
            onClick={() => navigate('/shoppage/merch')}
          >
            <FaShoppingBag className="fs-3 me-2 mb-1" />
            Online Shop
          </Button>
        </div>

        <p className="text-white-50 drop-shadow">
          Secure checkout • Worldwide shipping • 30-day returns
        </p>
      </div>
    </div>
  </div>
);

}
