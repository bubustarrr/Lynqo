import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

export default function StatsBar({ stats }) {
  const { t } = useTranslation();

  // Segédfüggvény az egységes érték-megjelenítéshez
  const renderStatValue = (value, isInfinity = false) => (
    <div 
      className="stat-value" 
      style={{ 
        color: isInfinity ? '#ef4444' : 'inherit',
        fontSize: isInfinity ? '2.5rem' : '1.8rem', // Konzisztensebb méretek
        height: '3.5rem', // Fix magasság, hogy ne ugráljon a felirat
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
      }}
    >
      {isInfinity ? '∞' : value}
    </div>
  );

  return (
    <Row className="g-4 mb-5">
      <Col md={3} xs={6}>
        <Card className="dashboard-card text-center p-3">
          <Card.Body>
            <div className="stat-icon">🔥</div>
            <div className="stat-value" style={{ color: '#f59e0b', height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold' }}>
              {stats.streak}
            </div>
            <div className="stat-label">{t('dashboard.stats.streak')}</div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3} xs={6}>
        <Card className="dashboard-card text-center p-3">
          <Card.Body>
            <div className="stat-icon">⚡</div>
            <div className="stat-value" style={{ color: '#eab308', height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold' }}>
              {stats.xp}
            </div>
            <div className="stat-label">{t('dashboard.stats.xp')}</div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3} xs={6}>
        <Card className="dashboard-card text-center p-3">
          <Card.Body>
            <div className="stat-icon">❤️</div>
            {renderStatValue(stats.hearts, stats.isPremium)}
            <div className="stat-label">{t('dashboard.stats.hearts')}</div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3} xs={6}>
        <Card className="dashboard-card text-center p-3">
          <Card.Body>
            <div className="stat-icon">💎</div>
            <div className="stat-value" style={{ color: '#0ea5e9', height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold' }}>
              {stats.gems}
            </div>
            <div className="stat-label">{t('dashboard.stats.gems')}</div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}