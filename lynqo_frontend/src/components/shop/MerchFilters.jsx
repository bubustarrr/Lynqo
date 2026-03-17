import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

const CATEGORIES = ['All', 'Clothing', 'Accessories', 'Stationery'];

const MerchFilters = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  const { t } = useTranslation();

  return (
    <div className="update-card">
      <Form.Group className="mb-4">
        <Form.Label className="fw-bold small opacity-75">{t('merch.filters.searchLabel')}</Form.Label>
        <InputGroup className="custom-input-group">
          <Form.Control 
            placeholder={t('merch.filters.searchPlaceholder')} 
            className="bg-transparent border-0 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-bold small opacity-75">{t('merch.filters.categoryLabel')}</Form.Label>
        <div className="d-flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`version-badge border-0 ${selectedCategory === cat ? 'active-tag' : ''}`}
            >
              {t(`merch.categories.${cat.toLowerCase()}`)}
            </button>
          ))}
        </div>
      </Form.Group>

      <div className="promo-card mb-4">
        <h5>{t('merch.promo.title')}</h5>
        <p className="small">{t('merch.promo.text')}</p>
      </div>
    </div>
  );
};

export default MerchFilters;