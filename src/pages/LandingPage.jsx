import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Forms from '../components/Forms';

const LandingPage = ({ onAuditComplete }) => {
  return (
    <div className="landing-wrapper">
      <Navbar />
      <Hero />
      <Forms onAuditComplete={onAuditComplete} />
    </div>
  );
};

export default LandingPage;
