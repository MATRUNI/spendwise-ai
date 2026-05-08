import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Cpu, Users, DollarSign, Briefcase } from 'lucide-react';
import { AI_TOOLS, getPlansForTool } from '../utils/pricingData';
import '../styles/LandingPage.css';

const Forms = ({ onAuditComplete }) => {
  const [teamSize, setTeamSize] = useState(() => {
    const saved = localStorage.getItem('spendwise_teamSize');
    return saved !== null ? JSON.parse(saved) : '';
  });

  const [tools, setTools] = useState(() => {
    const saved = localStorage.getItem('spendwise_tools');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse tools from localStorage");
      }
    }
    return [
      { 
        id: Date.now(), 
        name: 'ChatGPT', 
        plan: 'Plus', 
        spend: '', 
        seats: '', 
        useCase: 'coding' 
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('spendwise_teamSize', JSON.stringify(teamSize));
  }, [teamSize]);

  useEffect(() => {
    localStorage.setItem('spendwise_tools', JSON.stringify(tools));
  }, [tools]);

  const addTool = () => {
    setTools([
      ...tools,
      { 
        id: Date.now() + Math.random(), 
        name: 'Claude', 
        plan: 'Pro', 
        spend: '', 
        seats: '', 
        useCase: 'writing' 
      }
    ]);
  };

  const removeTool = (id) => {
    if (tools.length > 1) {
      setTools(tools.filter(t => t.id !== id));
    }
  };

  const updateTool = (id, field, value) => {
    setTools(tools.map(t => {
      if (t.id === id) {
        const updated = { ...t, [field]: value };
        // Auto-select the first available plan when changing tools
        if (field === 'name') {
          updated.plan = getPlansForTool(value)[0]?.name || '';
        }
        return updated;
      }
      return t;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuditComplete({ teamSize, tools });
  };

  return (
    <section className="audit-container">
      <div className="audit-card">
        <header className="audit-header">
          <h2>AI Spend Audit</h2>
          <p>Add all tools your team currently uses to see potential savings.</p>
        </header>

        <form onSubmit={handleSubmit} className="audit-form">
          {/* Global Team Size Section */}
          <div className="global-input">
            <label><Users size={16} /> Total Company Size</label>
            <input 
              type="number" 
              placeholder="e.g. 25"
              value={teamSize}
              min={1}
              onChange={(e) => setTeamSize(e.target.value)}
              required
            />
          </div>

          <div className="tools-stack">
            {tools.map((tool, index) => (
              <div key={tool.id} className="tool-item">
                <div className="tool-item-header">
                  <span className="tool-count">Tool #{index + 1}</span>
                  {tools.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => removeTool(tool.id)}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="tool-grid">
                  <div className="field">
                    <label><Cpu size={14} /> AI Tool</label>
                    <select value={tool.name} onChange={(e) => updateTool(tool.id, 'name', e.target.value)}>
                      {AI_TOOLS.map(ai => (
                        <option key={ai.name} value={ai.name}>{ai.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label><Briefcase size={14} /> Primary Use Case</label>
                    <select value={tool.useCase} onChange={(e) => updateTool(tool.id, 'useCase', e.target.value)}>
                      <option value="coding">Coding</option>
                      <option value="writing">Writing</option>
                      <option value="data">Data</option>
                      <option value="research">Research</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Plan</label>
                    <select value={tool.plan} onChange={(e) => updateTool(tool.id, 'plan', e.target.value)}>
                      {getPlansForTool(tool.name).map(p => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label><DollarSign size={14} /> Monthly Bill</label>
                    <input 
                      type="number" 
                      placeholder="Amount" 
                      value={tool.spend} 
                      min={1}
                      onChange={(e) => updateTool(tool.id, 'spend', e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <label>Seats</label>
                    <input 
                      type="number" 
                      placeholder="Quantity" 
                      value={tool.seats} 
                      min={1}
                      onChange={(e) => updateTool(tool.id, 'seats', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="add-btn" onClick={addTool}>
            <Plus size={18} /> Add Tool to Stack
          </button>

          <button type="submit" className="submit-btn">
            Analyze My Savings
          </button>
        </form>
      </div>
    </section>
  );
};

export default Forms;