import React, { useState } from 'react';
import '../styles/LandingPage.css';
import Forms from './Forms';


const LandingPage = ({ onAuditComplete }) => {
  // State to manage form persistence
  const [formData, setFormData] = useState({
    tool: 'Cursor',
    plan: 'Pro',
    monthlySpend: '',
    seats: '',
    useCase: 'coding'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In your real app, this triggers the calculation engine
    onAuditComplete(formData);
  };

  return (
    <div className="landing-wrapper">
      <nav className="hero-nav">
        <div className="logo">SpendAudit</div>
        <div className="nav-links">
          <span>By Credex</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <span className="badge">New: Claude 3.5 Sonnet Benchmarks Added</span>
        <h1 className="hero-title">Stop overpaying for <br/>AI infrastructure.</h1>
        <p className="hero-subtitle">
          Most startups are over-provisioned by 30%. Paste your spend below for a 60-second audit.
        </p>
      </header>

      {/* The Form - Now on the Landing Page */}
      <Forms/>
      {/* <section className="form-container" id="audit-form">
        <div className="form-card">
          <h2 className="form-heading">Calculate Your Savings</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="input-group">
                <label>Primary AI Tool</label>
                <select 
                  value={formData.tool} 
                  onChange={(e) => setFormData({...formData, tool: e.target.value})}
                >
                  <option value="Cursor">Cursor</option>
                  <option value="ChatGPT">ChatGPT</option>
                  <option value="Claude">Claude</option>
                  <option value="OpenAI API">OpenAI API</option>
                </select>
              </div>

              <div className="input-group">
                <label>Current Plan</label>
                <select 
                  value={formData.plan} 
                  onChange={(e) => setFormData({...formData, plan: e.target.value})}
                >
                  <option value="Pro">Pro / Individual</option>
                  <option value="Team">Team / Business</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              <div className="input-group">
                <label>Monthly Bill ($)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 500"
                  required
                  value={formData.monthlySpend}
                  onChange={(e) => setFormData({...formData, monthlySpend: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label>Total Seats</label>
                <input 
                  type="number" 
                  placeholder="e.g. 10"
                  required
                  value={formData.seats}
                  onChange={(e) => setFormData({...formData, seats: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="cta-button full-width">
              Generate My Audit Report
            </button>
            <p className="form-footer">No credit card required. Free forever.</p>
          </form>
        </div>
      </section> */}
    </div>
  );
};

export default LandingPage;