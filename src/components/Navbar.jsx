
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-logo">
          <div className="logo-icon">SA</div>
          <span>SpendAudit</span>
        </div>
        <div className="nav-meta">
          <span className="by-line">Powered by <strong>Credex</strong></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;