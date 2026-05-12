import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Forms from '../components/Forms';
import { generateAuditReport } from '../utils/auditEngine';
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react';
import Loader from '../components/Loader';
import TestimonialCard from '../components/TestimonialCard';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading]=useState(false)

  const handleAuditComplete = async (formData) => {
    setIsLoading(true)
    const report = generateAuditReport(formData.teamSize, formData.tools);
    
    const { data, error } = await supabase
      .from('audits')
      .insert([{ 
        team_size: formData.teamSize || 1, 
        raw_stack_data: formData.tools, 
        audit_results: report 
      }])
      .select();
      setIsLoading(false)
    if (error) {
      return;
    }
    
    navigate(`/results/${data[0].id}`);
  };

  return (
      <div className="landing-wrapper">
        <Navbar /> 

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Hero />
            <TestimonialCard />
            <Forms onAuditComplete={handleAuditComplete} />
          </>
        )}
      </div>
  );
};

export default LandingPage;
