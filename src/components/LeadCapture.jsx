import { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import '../styles/LeadCapture.css';

const LeadCapture = ({ onUnlock }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Logic for saving to Supabase would go here
      console.log("Captured lead:", email);
      onUnlock();
    }
  };

  return (
    <div className="lead-capture-overlay">
      <div className="lead-capture-card">
        <div className="lock-icon-wrapper">
          <Lock size={24} />
        </div>

        <h3>Unlock Your Full Report</h3>
        <p>Enter your work email to reveal the exact rationale and optimization steps for your AI stack.</p>

        <form className="lead-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              className="lead-input"
              placeholder="work@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="unlock-btn">
            Get My Free Audit <ArrowRight size={18} />
          </button>
        </form>

        <div className="lead-footer">
          <ShieldCheck size={14} />
          <span>We respect your privacy. No spam, ever.</span>
        </div>
      </div>
    </div>
  );
};

export default LeadCapture;