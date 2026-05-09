import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Forms from '../components/Forms';
import { generateAuditReport } from '../utils/auditEngine';
import { supabase } from '../utils/supabaseClient';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAuditComplete = async (formData) => {
    const report = generateAuditReport(formData.teamSize, formData.tools);
    
    const { data, error } = await supabase
      .from('audits')
      .insert([{ 
        team_size: formData.teamSize || 1, 
        raw_stack_data: formData.tools, 
        audit_results: report 
      }])
      .select();
      
    if (error) {
      console.error("Supabase insert error:", error);
      alert("Failed to generate report. Make sure your Supabase connection is valid.");
      return;
    }
    
    navigate(`/results/${data[0].id}`);
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
