import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

export default function QuestsPanel({ quests }) {
  const { t } = useTranslation();
  return (
    <Card className="dashboard-card p-4 mb-4">
      <h4 className="fw-bold mb-4 text-uppercase text-muted" style={{ fontSize: '1rem', letterSpacing: '1px' }}>{t('dashboard.quests.title')}</h4>
      {quests.length === 0 ? (
        <p className="text-muted small">{t('dashboard.quests.noQuests')}</p>
      ) : (
        quests.map((quest, index) => (
          <div key={quest.id} className={index !== quests.length - 1 ? "mb-4" : ""}>
            <div className="d-flex justify-content-between align-items-start mb-1">
              <span className="fw-bold" style={{ fontSize: '1rem', color: quest.isCompleted ? '#a1a1aa' : '#f8fafc' }}>
                {quest.title}
              </span>
              <span className="fw-bold" style={{ color: quest.isCompleted ? '#58cc02' : '#f59e0b', fontSize: '0.9rem', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                {quest.isCompleted ? t('dashboard.quests.done') : `⚡ ${quest.rewardXp} XP`}
              </span>
            </div>
            <div className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.2' }}>
              {quest.description}
            </div>
            <div className="text-end mb-1">
              <small className="text-muted fw-bold" style={{ fontSize: '0.8rem' }}>
                {quest.progress} / {quest.target}
              </small>
            </div>
            <ProgressBar 
              now={(quest.progress / quest.target) * 100} 
              variant={quest.isCompleted ? "success" : "warning"}
              style={{ height: '10px', borderRadius: '10px', backgroundColor: '#334155' }}
            />
          </div>
        ))
      )}
    </Card>
  );
}