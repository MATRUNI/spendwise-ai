import { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import '../styles/LeadCapture.css';

const LeadCapture = ({ auditId, onUnlock, isOptimized }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      
      // Use UPSERT to handle both new emails and existing ones gracefully
      const { data: leadData, error: dbError } = await supabase
        .from('leads')
        .upsert([{ email }], { onConflict: 'email' })
        .select()
        .single();
      
      if (dbError) {
        console.error("Supabase Leads Error:", dbError.message);
      }
      
      if (leadData && leadData.id && auditId) {
        // Update the audit record with the lead_id
        const { error: updateError } = await supabase
          .from('audits')
          .update({ lead_id: leadData.id })
          .eq('id', auditId);
          
        if (updateError) return;
      }

      // Send the magic link
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.href
        }
      });
      setLoading(false);
      
      if (authError) {
        console.error("Magic link error", authError);
        alert("Failed to send magic link: " + authError.message);
      } else {
        onUnlock();
      }
    }
  };

  return (
    <div className="lead-capture-overlay">
      <div className="lead-capture-card">
        <div className="lock-icon-wrapper">
          <Lock size={24} />
        </div>

        <h3>{isOptimized ? "Keep Your Stack Optimized" : "Unlock Your Full Report"}</h3>
        <p>
          {isOptimized 
            ? "Your stack looks great! Join our list to get notified when new vendor discounts or cheaper AI alternatives launch."
            : "Enter your work email to reveal the exact rationale and optimization steps for your AI stack."}
        </p>

        <form className="lead-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              className="lead-input"
              placeholder="work@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="unlock-btn" disabled={loading}>
            {loading ? "Sending..." : <><ArrowRight size={18} /> {isOptimized ? "Notify Me" : "Get My Free Audit"}</>}
          </button>
        </form>

        <div className="lead-footer">
          <ShieldCheck size={14} />
          <span>We respect your privacy. No spam, ever.</span>
        </div>
      </div>
    </div>
  );
};

export default LeadCapture;