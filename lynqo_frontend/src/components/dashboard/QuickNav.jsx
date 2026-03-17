import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Globe, ShoppingCart, Trophy } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function QuickNav() {
  const { t } = useTranslation();
  return (
    <Row className="mt-4 mb-5 justify-content-center">
      <Col xs={12} md={10} lg={8}>
        <div className="d-grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <Link to="/leaderboard" className="dashboard-quick-btn p-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <div className="btn-icon-wrapper mb-2" style={{ backgroundColor: '#fef08a', color: '#ca8a04', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <Trophy size={24} />
            </div>
            <div className="btn-text fw-bold text-center w-100" style={{ fontSize: '0.9rem', marginTop: '5px' }}>{t('dashboard.nav.leaderboard')}</div>
          </Link>
          <Link to="/shop" className="dashboard-quick-btn p-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <div className="btn-icon-wrapper mb-2" style={{ backgroundColor: '#bfdbfe', color: '#2563eb', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <ShoppingCart size={24} />
            </div>
            <div className="btn-text fw-bold text-center w-100" style={{ fontSize: '0.9rem', marginTop: '5px' }}>{t('dashboard.nav.store')}</div>
          </Link>
          <Link to="/pick-language" className="dashboard-quick-btn p-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <div className="btn-icon-wrapper mb-2" style={{ backgroundColor: '#e0e7ff', color: '#4338ca', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <Globe size={24} />
            </div>
            <div className="btn-text fw-bold text-center w-100" style={{ fontSize: '0.9rem', marginTop: '5px' }}>{t('dashboard.nav.changeCourse')}</div>
          </Link>
        </div>
      </Col>
    </Row>
  );
}