import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="fullscreen-loader">
      <div className="loader-visual">
        <div className="ripple"></div>
        <div className="ripple"></div>
        <div className="ripple"></div>
        <div className="core-circle">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
      </div>
      <div className="loader-text-content">
        <h2 className="main-title">Running Deep Audit</h2>
        <p className="description">
          We're analyzing your plan and your need.
        </p>
        <div className="progress-track">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;