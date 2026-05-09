import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Forms from '../components/Forms';
import { generateAuditReport } from '../utils/auditEngine';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAuditComplete = (formData) => {
    const report = generateAuditReport(formData.teamSize, formData.tools);
    navigate('/results', { state: { report } });
  };

  return (
    <div className="landing-wrapper">
      <Navbar />
      <Hero />
      <Forms onAuditComplete={handleAuditComplete} />
    </div>
  );
};

export default LandingPage;
