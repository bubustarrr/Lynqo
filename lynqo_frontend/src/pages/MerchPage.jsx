import React, { useState } from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './MerchPage.css';
import { useCart } from '../context/CartContext';
import ShopCart from '../components/shop/ShopCart'; // Importáljuk a kosár komponenst

import kep1 from '../assets/merch/kep1.png';
import kep2 from '../assets/merch/kep2.png';
import kep3 from '../assets/merch/kep3.png';
import kep4 from '../assets/merch/kep4.png';
import kep5 from '../assets/merch/kep5.png';
import kep6 from '../assets/merch/kep6.png';
import kep7 from '../assets/merch/kep7.png';

const MERCH_ITEMS = [
  { id: 1, name: 'Hoodie', category: 'Clothing', price: 45, images: [kep3, kep4, kep5] },
  { id: 2, name: 'Water Bottle', category: 'Stationery', price: 18, images: [kep2] },
  { id: 3, name: 'Notebook', category: 'Accessories', price: 25, images: [kep1] },
  { id: 4, name: 'Mug', category: 'Stationery', price: 20, images: [kep7, kep6] },
];

const CATEGORIES = ['All', 'Clothing', 'Accessories', 'Stationery'];

// Kártya komponens a termékeknek
const MerchCard = ({ item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  return (
    <div className="big-news-card h-100 d-flex flex-column">
      <div className="news-image-wrapper position-relative overflow-hidden">
        <div 
          className="slider-track"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {item.images.map((img, index) => (
            <div key={index} className="slider-item">
              <img 
                src={img} 
                alt={`${item.name} ${index + 1}`} 
                className="news-img" 
              />
            </div>
          ))}
        </div>
        
        <span className="news-tag">{item.category}</span>

        {item.images.length > 1 && (
          <>
            <button className="img-nav-btn prev-btn" onClick={prevImage}>
              <FaChevronLeft />
            </button>
            <button className="img-nav-btn next-btn" onClick={nextImage}>
              <FaChevronRight />
            </button>
            
            <div className="img-indicators">
              {item.images.map((_, idx) => (
                <span 
                  key={idx} 
                  onClick={(e) => { e.preventDefault(); setCurrentImageIndex(idx); }}
                  className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="news-content d-flex flex-column flex-grow-1">
        <span className="news-date">${item.price}</span>
        <h3 className="update-title fs-4">{item.name}</h3>
        <div className="mt-auto pt-3">
          <button className="read-more-btn w-100" onClick={() => addToCart(item)}>
            <FaShoppingCart className="me-2"/> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MerchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = MERCH_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="news-page-container">
      <header className="news-header">
        <h1 className="news-hero-title">Lynqo Store</h1>
        <p className="news-subtitle">Exclusive gear for language lovers</p>
      </header>

      <div className="news-layout">
        <main className="shop-main-content">
          <h2 className="column-title">Our Collection</h2>
          <Row className="g-4">
            {filteredItems.map(item => (
              <Col md={6} key={item.id}>
                <MerchCard item={item} />
              </Col>
            ))}
          </Row>
        </main>

        <aside className="sidebar-wrapper">
          <h2 className="column-title">Filters & Cart</h2>
          <div className="update-card">
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold small opacity-75">Search Products</Form.Label>
              <InputGroup className="custom-input-group">
                <Form.Control 
                  placeholder="What are you looking for?" 
                  className="bg-transparent border-0 text-black"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold small opacity-75">Category</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`version-badge border-0 ${selectedCategory === cat ? 'active-tag' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Form.Group>

            <div className="promo-card mb-4">
              <h5>Free Shipping?</h5>
              <p className="small">On all orders over $100!</p>
            
            </div>

            {/* Itt jelenik meg a kosár tartalma a sidebarban */}
            <div className="cart-sidebar-section border-top pt-4">
               <ShopCart />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}