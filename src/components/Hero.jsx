import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <header className="hero-section">
      <span className="badge">New: Claude 3.5 Sonnet Benchmarks Added</span>
      <h1 className="hero-title">Stop overpaying for <br/>AI infrastructure.</h1>
      <p className="hero-subtitle">
        Most startups are over-provisioned by 30%. Paste your spend below for a 60-second audit.
      </p>
    </header>
  );
};

export default Hero;
