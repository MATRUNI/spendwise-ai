import React from 'react';
import { Calendar } from 'lucide-react';

const CredexCTA = ({ totalAnnualSavings }) => {
  return (
    <div className="credex-cta-card">
      <div className="credex-content">
        <h3>Enterprise Savings Identified</h3>
        <p>You have <strong>${totalAnnualSavings.toLocaleString()}</strong> in identified annual savings. Implementing these changes across a team requires careful migration and vendor negotiation.</p>
        <p>Book a free 15-minute consultation with a Credex expert to help you execute this roadmap.</p>
      </div>
      <button className="credex-btn" onClick={() => alert("Calendly modal would open here!")}>
        <Calendar size={18} />
        Book Consultation
      </button>
    </div>
  );
};

export default CredexCTA;
