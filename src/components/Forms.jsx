import { useState, useEffect } from 'react';
import { Plus, Trash2, Cpu, Users, DollarSign, Briefcase, Zap } from 'lucide-react';
import { AI_TOOLS, getPlansForTool } from '../utils/pricingData';
import '../styles/Forms.css';

const Forms = ({ onAuditComplete }) => {
  const [teamSize, setTeamSize] = useState(() => {
    const saved = localStorage.getItem('spendwise_teamSize');
    return saved !== null ? JSON.parse(saved) : '';
  });

  const [tools, setTools] = useState(() => {
    const saved = localStorage.getItem('spendwise_tools');
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return [{ id: Date.now(), name: 'ChatGPT', plan: 'Plus', spend: '', seats: '', useCase: 'coding' }];
  });

  useEffect(() => {
    localStorage.setItem('spendwise_teamSize', JSON.stringify(teamSize));
    localStorage.setItem('spendwise_tools', JSON.stringify(tools));
  }, [teamSize, tools]);

  const addTool = () => {
    setTools([...tools, { id: Date.now() + Math.random(), name: 'Claude', plan: 'Pro', spend: '', seats: '', useCase: 'writing' }]);
  };

  const removeTool = (id) => {
    if (tools.length > 1) setTools(tools.filter(t => t.id !== id));
  };

  const updateTool = (id, field, value) => {
    setTools(tools.map(t => {
      if (t.id === id) {
        const updated = { ...t, [field]: value };
        if (field === 'name') updated.plan = getPlansForTool(value)[0]?.name || '';
        return updated;
      }
      return t;
    }));
  };

  return (
    <section className="audit-section">
      <div className="audit-card">
        <div className="audit-card-accent"></div>
        <header className="audit-card-header">
          <div className="header-icon"><Zap size={24} /></div>
          <div>
            <h2>AI Spend Audit</h2>
            <p>Calculate your optimization score in seconds.</p>
          </div>
        </header>

        <form onSubmit={(e) => { e.preventDefault(); onAuditComplete({ teamSize, tools }); }} className="audit-form">
          <div className="input-group-main">
            <label className="input-label"><Users size={16} /> Total Company Size</label>
            <input 
              type="number" 
              className="main-input"
              placeholder="How many people in your company?"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              required
            />
          </div>

          <div className="tools-stack">
            {tools.map((tool, index) => (
              <div key={tool.id} className="tool-card">
                <div className="tool-card-head">
                  <span className="tool-index">Tool #{index + 1}</span>
                  {tools.length > 1 && (
                    <button type="button" className="icon-btn-delete" onClick={() => removeTool(tool.id)}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="tool-input-grid">
                  <div className="field-group">
                    <label><Cpu size={14} /> Software</label>
                    <select value={tool.name} onChange={(e) => updateTool(tool.id, 'name', e.target.value)}>
                      {AI_TOOLS.map(ai => <option key={ai.name} value={ai.name}>{ai.name}</option>)}
                    </select>
                  </div>

                  <div className="field-group">
                    <label>Subscription Tier</label>
                    <select value={tool.plan} onChange={(e) => updateTool(tool.id, 'plan', e.target.value)}>
                      {getPlansForTool(tool.name).map(p => (
                        <option key={`${p.name}-${p.billing}`} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field-group">
                    <label>Active Seats</label>
                    <input type="number" placeholder="0" value={tool.seats} min={1} onChange={(e) => updateTool(tool.id, 'seats', e.target.value)} required />
                  </div>

                  <div className="field-group">
                    <label><DollarSign size={14} /> Monthly Bill</label>
                    <input type="number" placeholder="$0.00" value={tool.spend} min={1} onChange={(e) => updateTool(tool.id, 'spend', e.target.value)} required />
                  </div>

                  <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                    <label><Briefcase size={14} /> Primary Use Case</label>
                    <select value={tool.useCase} onChange={(e) => updateTool(tool.id, 'useCase', e.target.value)}>
                      <option value="coding">Coding/Engineering</option>
                      <option value="writing">Marketing/Writing</option>
                      <option value="data">Data Analysis</option>
                      <option value="research">General Research</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="btn-secondary" onClick={addTool}>
            <Plus size={18} /> Add another tool
          </button>

          <button type="submit" className="btn-primary">
            Run Spend Analysis
          </button>
        </form>
      </div>
    </section>
  );
};

export default Forms;