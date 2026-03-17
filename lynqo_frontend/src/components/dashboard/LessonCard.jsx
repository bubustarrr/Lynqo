import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function LessonCard({ nextLesson, activeCourseId }) {
  const { t } = useTranslation();
  return (
    <Card className="dashboard-card p-5 text-center d-flex flex-column justify-content-center mb-4" style={{ minHeight: '400px' }}>
      {nextLesson ? (
        <>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
          <h5 className="fw-bold text-uppercase text-muted" style={{ fontSize: '0.9rem' }}>{nextLesson.unitTitle}</h5>
          <h2 className="mb-4 fw-bold">{nextLesson.title}</h2>
          <p className="mb-5 text-muted" style={{ fontSize: '1.2rem' }}>{nextLesson.unitDesc}</p>
          <Link to={`/course/${activeCourseId}/lesson/${nextLesson.id}`} className="cta-button">
            {t('dashboard.lesson.start')}
          </Link>
        </>
      ) : (
        <>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 className="mb-3 fw-bold">{t('dashboard.lesson.complete')}</h2>
          <p className="mb-5 text-muted" style={{ fontSize: '1.2rem' }}>{t('dashboard.lesson.finished')}</p>
          <Link to="/pick-language" className="cta-button">{t('dashboard.lesson.newCourse')}</Link>
        </>
      )}
    </Card>
  );
}