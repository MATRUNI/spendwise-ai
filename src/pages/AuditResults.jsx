import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LeadCapture from '../components/LeadCapture';
import { Sparkles, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { supabase } from '../utils/supabaseClient';
import { generateAIRationales } from '../utils/aiSummary';
import AuditHero from '../components/AuditHero';
import RecommendationCard from '../components/RecommendationCard';
import CredexCTA from '../components/CredexCTA';
import '../styles/AuditResults.css';

const AuditResults = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [aiRationales, setAiRationales] = useState([]);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      const { data, error } = await supabase
        .from('audits')
        .select('audit_results')
        .eq('id', id)
        .single();
        
      if (data) {
        setReport(data.audit_results);
      } else {
        console.error("Failed to fetch report:", error);
      }
      setLoading(false);
    };
    
    if (id) fetchReport();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsUnlocked(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setIsUnlocked(true);
    });

    return () => subscription.unsubscribe();
  }, [id]);

  useEffect(() => {
    if (isUnlocked && report && aiRationales.length === 0 && !isGeneratingAI) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsGeneratingAI(true);
      generateAIRationales(report.recommendations).then(res => {
        setAiRationales(res);
        setIsGeneratingAI(false);
      });
    }
  }, [isUnlocked, report, aiRationales.length, isGeneratingAI]);

  if (loading) {
    return (
      <div className="audit-page">
        <Navbar />
        <main className="results-container" style={{textAlign: 'center', paddingTop: '100px'}}>
          <h3>Loading your audit...</h3>
        </main>
      </div>
    );
  }

  if (!report) {
    return <Navigate to="/" />;
  }

  return (
    <div className="audit-page">
      <Helmet>
        <title>SpendAudit - ${report.totalAnnualSavings.toLocaleString()} in AI Savings Identified</title>
        <meta property="og:title" content={`SpendAudit - $${report.totalAnnualSavings.toLocaleString()} in AI Savings Identified`} />
        <meta property="og:description" content="See how this startup can cut their AI stack costs by optimizing unused seats and inefficient plans." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=630" />
      </Helmet>
      <Navbar />

      <main className="results-container">
        <AuditHero 
          percentageSaved={report.percentageSaved} 
          totalAnnualSavings={report.totalAnnualSavings} 
        />

        {report.recommendations.length > 0 ? (
          <div className="recommendations-section">
            <div className="section-header">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={24} color="var(--primary)" /> Optimization Roadmap
              </h2>
              <p>{report.recommendations.length} Immediate actions identified</p>
            </div>

            <div className="recommendations-list">
              {report.recommendations.map((rec, index) => (
                <RecommendationCard 
                  key={index}
                  rec={rec}
                  index={index}
                  isUnlocked={isUnlocked}
                  isGeneratingAI={isGeneratingAI}
                  aiRationale={aiRationales[index]}
                />
              ))}
            </div>
            
            {isUnlocked && report.totalAnnualSavings >= 10000 && (
              <CredexCTA totalAnnualSavings={report.totalAnnualSavings} />
            )}

            {!isUnlocked && (
              <div className="gate-wrapper">
                <LeadCapture auditId={id} onUnlock={() => setIsUnlocked(true)} />
              </div>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <CheckCircle size={48} color="#10b981" />
            <h3>Your stack is bulletproof!</h3>
            <p>We didn't find any unnecessary spending in your current setup.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AuditResults;