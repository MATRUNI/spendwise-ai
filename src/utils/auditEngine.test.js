import { describe, it, expect } from 'vitest';
import { generateAuditReport } from './auditEngine';

describe('Audit Engine Logic', () => {
  it('Rule 1: Detects Zombie Seats and calculates savings', () => {
    // 5 company size, but 10 seats of Cursor
    const tools = [{ name: 'Cursor', plan: 'Pro', spend: 200, seats: 10, useCase: 'Coding' }];
    const result = generateAuditReport(5, tools);
    
    expect(result.recommendations.length).toBeGreaterThan(0);
    const rec = result.recommendations.find(r => r.toolName === 'Cursor' && r.action === 'Cancel Seats');
    expect(rec).toBeDefined();
    // 5 zombie seats * $20/mo (derived from 200/10) = $100 savings
    expect(rec.savingsMonthly).toBe(100);
    expect(rec.currentSpend).toBe(200);
    expect(rec.proposedSpend).toBe(100);
  });

  it('Rule 2: Recommends downgrade to Individual for small teams', () => {
    // 3 company size, paying for GitHub Copilot Business ($19/mo/seat = $57)
    const tools = [{ name: 'GitHub Copilot', plan: 'Business', spend: 57, seats: 3, useCase: 'Coding' }];
    const result = generateAuditReport(3, tools);
    
    expect(result.recommendations.length).toBeGreaterThan(0);
    const rec = result.recommendations.find(r => r.toolName === 'GitHub Copilot' && r.action.includes('Downgrade'));
    expect(rec).toBeDefined();
    // Business is $19, Individual is $10. Saving $9/seat * 3 = $27
    expect(rec.savingsMonthly).toBe(27);
    expect(rec.proposedSpend).toBe(30);
  });

  it('Rule 3: Flags Use-Case Mismatch (Coding tool for Writing)', () => {
    const tools = [{ name: 'Cursor', plan: 'Pro', spend: 200, seats: 1, useCase: 'Writing' }];
    const result = generateAuditReport(1, tools);
    
    expect(result.recommendations.length).toBeGreaterThan(0);
    const rec = result.recommendations.find(r => r.toolName === 'Cursor' && r.action === 'Switch to Claude/ChatGPT');
    expect(rec).toBeDefined();
  });

  it('Rule 4: Prompts for Annual Billing discount', () => {
    // Cursor Pro is $20/mo. Cursor Pro (Yearly) is $16/mo.
    const tools = [{ name: 'Cursor', plan: 'Pro', spend: 20, seats: 1, useCase: 'Coding' }];
    const result = generateAuditReport(1, tools);
    
    expect(result.recommendations.length).toBeGreaterThan(0);
    const rec = result.recommendations.find(r => r.toolName === 'Cursor' && r.action === 'Switch to Annual');
    expect(rec).toBeDefined();
    expect(rec.savingsMonthly).toBeGreaterThan(0);
  });

  it('Rule 5: Recommends API migration for large deployments (>30 seats)', () => {
    // 50 seats of Claude Pro ($20/mo) = $1000
    const tools = [{ name: 'Claude', plan: 'Pro', spend: 1000, seats: 50, useCase: 'Mixed' }];
    const result = generateAuditReport(50, tools);
    
    expect(result.recommendations.length).toBeGreaterThan(0);
    const rec = result.recommendations.find(r => r.toolName === 'Claude' && r.action === 'API Migration');
    expect(rec).toBeDefined();
    // Assume 30% savings on $1000 = $300
    expect(rec.savingsMonthly).toBe(300);
    expect(rec.proposedSpend).toBe(700);
  });

  it('Calculates total potential savings correctly', () => {
    const tools = [
      { name: 'Cursor', plan: 'Pro', spend: 200, seats: 10, useCase: 'Coding' }, // 5 zombie seats (100 saved)
    ];
    const result = generateAuditReport(5, tools); // global team size 5
    
    expect(result.totalMonthlySavings).toBeGreaterThan(0);
  });

  it('Rule 7: Detects Redundancy (Cursor + GitHub Copilot)', () => {
    const tools = [
      { id: '1', name: 'Cursor', plan: 'Pro', spend: 20, seats: 1, useCase: 'Coding' },
      { id: '2', name: 'GitHub Copilot', plan: 'Individual', spend: 10, seats: 1, useCase: 'Coding' }
    ];
    const result = generateAuditReport(1, tools);
    
    const rec = result.recommendations.find(r => r.toolName === 'GitHub Copilot' && r.action === 'Cancel Redundant Tool');
    expect(rec).toBeDefined();
    expect(result.totalMonthlySavings).toBeGreaterThanOrEqual(10);
  });

  it('Rule 8: Frontier Model Consolidation (ChatGPT + Claude)', () => {
    const tools = [
      { id: '1', name: 'ChatGPT', plan: 'Plus', spend: 20, seats: 1, useCase: 'Mixed' },
      { id: '2', name: 'Claude', plan: 'Pro', spend: 20, seats: 1, useCase: 'Mixed' }
    ];
    const result = generateAuditReport(1, tools); // Team size < 10
    
    const rec = result.recommendations.find(r => r.action === 'Consolidate Frontier Models');
    expect(rec).toBeDefined();
    expect(result.totalMonthlySavings).toBe(20);
  });

  it('Edge Case: Handles Empty Tool Stack', () => {
    const result = generateAuditReport(10, []);
    expect(result.totalCurrentSpend).toBe(0);
    expect(result.totalMonthlySavings).toBe(0);
    expect(result.recommendations.length).toBe(0);
  });

  it('Edge Case: Handles Zero Team Size (Defaults to Tool Seats)', () => {
    const tools = [{ name: 'Cursor', plan: 'Pro (Yearly)', spend: 16, seats: 1, useCase: 'Coding' }];
    const result = generateAuditReport(0, tools);
    // Should NOT trigger zombie seats if team size is 0 (assumes 1)
    // And should NOT trigger Annual discount because it is already Yearly
    expect(result.totalMonthlySavings).toBe(0);
  });
});
