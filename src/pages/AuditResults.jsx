import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LeadCapture from '../components/LeadCapture';
import { TrendingDown, Sparkles, CheckCircle } from 'lucide-react'; // Optional: icon library
import '../styles/AuditResults.css';

const AuditResults = () => {
  const location = useLocation();
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!location.state || !location.state.report) {
    return <Navigate to="/" />;
  }

  const { report } = location.state;

  const getActionColor = (action) => {
    const a = action.toLowerCase();
    if (a.includes('switch')) return 'status-purple';
    if (a.includes('cancel')) return 'status-red';
    return 'status-blue';
  };

  return (
    <div className="audit-page">
      <Navbar />

      <main className="results-container">
        {/* Hero Section */}
        <header className="results-hero">
          <div className="percentage-badge">
            <TrendingDown size={18} />
            <span>Cut {report.percentageSaved.toFixed(0)}% of AI waste</span>
          </div>
          <h1 className="savings-amount">
            ${report.totalAnnualSavings.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
          </h1>
          <p className="savings-label">Estimated Total Annual Savings</p>
        </header>

        {report.recommendations.length > 0 ? (
          <div className="recommendations-section">
            <div className="section-header">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={24} color="var(--primary)" /> Optimization Roadmap
              </h2>
              <p>{report.recommendations.length} Immediate actions identified</p>
            </div>

            <div className="recommendations-list">
              {report.recommendations.map((rec, index) => (
                <div key={index} className="rec-card">
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

                  <div className="rec-body">
                    <p className={!isUnlocked ? "blurred-content" : "rationale-text"}>
                      {rec.rationale}
                    </p>
                    {!isUnlocked && index === 0 && (
                      <div className="blur-overlay-text">Unlock full report to see rationale</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!isUnlocked && (
              <div className="gate-wrapper">
                <LeadCapture onUnlock={() => setIsUnlocked(true)} />
              </div>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <CheckCircle size={48} color="#10b981" />
            <h3>Your stack is bulletproof!</h3>
            <p>We didn't find any unnecessary spending in your current setup.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AuditResults;