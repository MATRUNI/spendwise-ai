import { TrendingDown } from 'lucide-react';

const AuditHero = ({ percentageSaved, totalAnnualSavings }) => {
  return (
    <header className="results-hero">
      <div className="percentage-badge">
        <TrendingDown size={18} />
        <span>Cut {percentageSaved.toFixed(0)}% of AI waste</span>
      </div>
      <h1 className="savings-amount">
        ${totalAnnualSavings.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })}
      </h1>
      <p className="savings-label">Estimated Total Annual Savings</p>
    </header>
  );
};

export default AuditHero;
