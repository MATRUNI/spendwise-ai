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
      <Forms/>
    </div>
  );
};

export default LandingPage;