import React from 'react';
import { Sparkles } from 'lucide-react';

const getActionColor = (action) => {
  const a = action.toLowerCase();
  if (a.includes('switch')) return 'status-purple';
  if (a.includes('cancel')) return 'status-red';
  return 'status-blue';
};

const RecommendationCard = ({ rec, index, isUnlocked, isGeneratingAI, aiRationale }) => {
  return (
    <div className="rec-card">
      <div className="rec-header">
        <div className="tool-info">
          <span className={`action-badge ${getActionColor(rec.action)}`}>
            {rec.action}
          </span>
          <h3 className="rec-tool-name">{rec.toolName}</h3>
        </div>
        <div className="rec-savings-pill">
          +${rec.savingsMonthly.toFixed(0)}/mo
        </div>
      </div>

      <div className="rec-stats-grid">
         <div className="stat-box">
           <span className="stat-label">Current Spend</span>
           <span className="stat-value">${rec.currentSpend.toFixed(2)}/mo</span>
         </div>
         <div className="stat-box">
           <span className="stat-label">Target Spend</span>
           <span className="stat-value">${rec.proposedSpend.toFixed(2)}/mo</span>
         </div>
         <div className="stat-box highlight">
           <span className="stat-label">Monthly Waste</span>
           <span className="stat-value">${rec.savingsMonthly.toFixed(2)}/mo</span>
         </div>
      </div>

      <div className="rec-body">
        {isUnlocked && isGeneratingAI && (
           <div className="ai-loading">
             <Sparkles size={16} className="spin-slow" /> Generating personalized AI rationale...
           </div>
        )}
        <p className={!isUnlocked ? "blurred-content" : "rationale-text"}>
          {isUnlocked && aiRationale 
            ? aiRationale 
            : rec.fallbackRationale}
        </p>
        {!isUnlocked && index === 0 && (
          <div className="blur-overlay-text">Unlock full report to see rationale</div>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
