
import '../styles/Hero.css';

const Hero = () => {
  return (
    <header className="hero-section">
      <div className="hero-content">
        <span className="hero-badge">
          <span className="pulse-dot"></span>
          New: Claude 3.5 Sonnet Benchmarks Added
        </span>
        <h1 className="hero-title">
          Stop overpaying for <br/>
          <span className="text-gradient">AI infrastructure.</span>
        </h1>
        <p className="hero-subtitle">
          Most startups waste 30% of their budget on idle seats and over-provisioned tokens. Get a <strong>60-second audit</strong> of your stack.
        </p>
      </div>
    </header>
  );
};

export default Hero;