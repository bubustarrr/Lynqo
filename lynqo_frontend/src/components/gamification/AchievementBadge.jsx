import React, { useEffect, useState } from 'react';
import { Spinner, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import "./AchievementBadge.css"

export default function Achievements({ t, userId, resolveMediaUrl }) {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Achievements Component loaded! The User ID given to me is:", userId);

  useEffect(() => {
    if (userId === undefined || userId === null) {
      console.warn("ABORTING FETCH: userId is undefined or null.");
      setError(t('achievements.waiting'));
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
    
    let isMounted = true;
    
    const fetchBadges = async () => {
      try {
        console.log(`Starting fetch for badges: https://localhost:7118/api/badges/user/${userId}`);
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://localhost:7118/api/badges/user/${userId}`);
        
        if (!response.ok) {
          throw new Error(`Backend returned error code: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Successfully fetched badges data:", data);
        
        if (isMounted) {
          setBadges(data);
        }
      } catch (err) {
        console.error("Error fetching badges inside Achievements.jsx:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBadges();
    
    return () => { isMounted = false; };
  }, [userId, t]);

  if (loading) {
    return (
      <div className="achievements-section mt-4 d-flex justify-content-center align-items-center" style={{ minHeight: '150px' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="achievements-section mt-4">
        <h4 className="fw-bold mb-4">{t('achievements.title')}</h4>
        <Alert variant="danger">
          <strong>{t('achievements.errorLoad')}</strong> {error}
        </Alert>
      </div>
    );
  }

  return (
    <div className="achievements-section mt-4">
      <h4 className="fw-bold mb-4">{t('achievements.title')}</h4>
      <div className="d-flex flex-wrap gap-4">
        {badges.length === 0 ? (
          <p className="text-muted">{t('achievements.noBadges')}</p>
        ) : (
          badges.map(badge => (
            <OverlayTrigger
              key={badge.id}
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${badge.id}`}>
                  <strong>{badge.name}</strong><br/>
                  {badge.description}
                </Tooltip>
              }
            >
              <div 
                className="badge-item text-center" 
                style={{ 
                  width: '110px',
                  opacity: badge.isOwned ? 1 : 0.4, 
                  filter: badge.isOwned ? 'none' : 'grayscale(100%)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <img 
                  src={resolveMediaUrl ? resolveMediaUrl(badge.iconUrl) : `https://localhost:7118/${badge.iconUrl}`} 
                  alt={badge.name} 
                  className="img-fluid mb-2 custom-badge" 
                  style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.onerror = null; 
                    const bgColors = ['#fee2e2', '#ffedd5', '#fef9c3', '#dcfce7', '#e0f2fe', '#e0e7ff', '#fae8ff', '#f3f4f6'];
                    const textColors = ['#991b1b', '#9a3412', '#854d0e', '#166534', '#075985', '#3730a3', '#86198f', '#374151'];
                    const charCode = badge.name ? badge.name.charCodeAt(0) : 0;
                    const index = charCode % bgColors.length;
                    const initial = badge.name ? badge.name.charAt(0).toUpperCase() : '?';
                    const svg = `
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
                        <rect width="80" height="80" rx="16" fill="${bgColors[index]}"/>
                        <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="36" font-weight="bold" fill="${textColors[index]}" text-anchor="middle" dy=".35em">${initial}</text>
                      </svg>
                    `;
                    e.target.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
                  }}
                />
                <div style={{ fontSize: '0.95rem', fontWeight: badge.isOwned ? '600' : '400', lineHeight: '1.2', marginTop: '5px' }}>
                  {badge.name}
                </div>
              </div>
            </OverlayTrigger>
          ))
        )}
      </div>
    </div>
  );
}