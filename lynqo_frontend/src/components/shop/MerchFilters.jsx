import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const CATEGORIES = ['All', 'Clothing', 'Accessories', 'Stationery'];

const MerchFilters = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="update-card">
      {/* Kereső */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-bold small opacity-75">Search Products</Form.Label>
        <InputGroup className="custom-input-group">
          <Form.Control 
            placeholder="What are you looking for?" 
            className="bg-transparent border-0 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      {/* Kategóriák */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-bold small opacity-75">Category</Form.Label>
        <div className="d-flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`version-badge border-0 ${selectedCategory === cat ? 'active-tag' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Form.Group>

      {/* Promo kártya */}
      <div className="promo-card mb-4">
        <h5>Free Shipping?</h5>
        <p className="small">On all orders over $100!</p>
      </div>
    </div>
  );
};

export default MerchFilters;