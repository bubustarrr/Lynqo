import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useTranslation } from "react-i18next";

import kep1 from '../../assets/merch/kep1.png';
import kep2 from '../../assets/merch/kep2.png';
import kep3 from '../../assets/merch/kep3.png';
import kep4 from '../../assets/merch/kep4.png';
import kep5 from '../../assets/merch/kep5.png';
import kep6 from '../../assets/merch/kep6.png';
import kep7 from '../../assets/merch/kep7.png';

export const MERCH_ITEMS = [
  { id: 1, name: 'Hoodie', category: 'Clothing', price: 45, images: [kep3, kep4, kep5] },
  { id: 2, name: 'Water Bottle', category: 'Stationery', price: 18, images: [kep2] },
  { id: 3, name: 'Notebook', category: 'Accessories', price: 25, images: [kep1] },
  { id: 4, name: 'Mug', category: 'Stationery', price: 20, images: [kep7, kep6] },
];

const MerchCard = ({ item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const nextImage = (e) => { e.preventDefault(); setCurrentImageIndex((prev) => (prev + 1) % item.images.length); };
  const prevImage = (e) => { e.preventDefault(); setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length); };

  return (
    <div className="big-news-card h-100 d-flex flex-column">
      <div className="news-image-wrapper position-relative overflow-hidden">
        <div 
          className="slider-track"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {item.images.map((img, index) => (
            <div key={index} className="slider-item">
              <img src={img} alt={`${item.name} ${index + 1}`} className="news-img" />
            </div>
          ))}
        </div>
        <span className="news-tag">{t(`merch.categories.${item.category.toLowerCase()}`)}</span>
        {item.images.length > 1 && (
          <>
            <button className="img-nav-btn prev-btn" onClick={prevImage}><FaChevronLeft /></button>
            <button className="img-nav-btn next-btn" onClick={nextImage}><FaChevronRight /></button>
            <div className="img-indicators">
              {item.images.map((_, idx) => (
                <span key={idx} className={`dot ${idx === currentImageIndex ? 'active' : ''}`} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="news-content d-flex flex-column flex-grow-1">
        <span className="news-date">${item.price}</span>
        <h3 className="update-title fs-4">{t(`merch.items.${item.name.toLowerCase().replace(' ', '')}`)}</h3>
        <div className="mt-auto pt-3">
          <button className="read-more-btn w-100" onClick={() => addToCart(item)}>
            <FaShoppingCart className="me-2"/> {t('merch.cart.addBtn')}
          </button>
        </div>
      </div>
    </div>
  );
};

const ShopItems = ({ items }) => {
  return (
    <Row className="g-4">
      {items.map(item => (
        <Col md={6} key={item.id}>
          <MerchCard item={item} />
        </Col>
      ))}
    </Row>
  );
};

export default ShopItems;