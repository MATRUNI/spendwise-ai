
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  let navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <div className="logo-icon">SA</div>
          <span>SpendAudit</span>
        </div>
        <div className="nav-meta">
          <span className="by-line">Powered by <a href="https://github.com/MATRUNI" target="_blank" rel="noopener noreferrer" className="founder-link"><strong>Matruni</strong></a></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;