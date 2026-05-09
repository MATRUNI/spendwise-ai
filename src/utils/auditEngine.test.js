import { describe, it, expect } from 'vitest';
import { generateAuditReport } from './auditEngine';

describe('Audit Engine Logic', () => {
  it('Rule 1: Detects Zombie Seats and calculates savings', () => {
    // 5 company size, but 10 seats of Cursor
    const tools = [{ name: 'Cursor', plan: 'Pro', spend: 200, seats: 10, useCase: 'Coding' }];
    const result = generateAuditReport(5, tools);
    
    expect(result.recommendations.length).toBeGreaterThan(0);
    const rec = result.recommendations.find(r => r.toolName === 'Cursor' && r.action === 'cancel');
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
    const rec = result.recommendations.find(r => r.toolName === 'GitHub Copilot' && r.action === 'downgrade');
    expect(rec).toBeDefined();
    // Business is $19, Individual is $10. Saving $9/seat * 3 = $27
    expect(rec.savingsMonthly).toBe(27);
    expect(rec.proposedSpend).toBe(30);
  });

  it('Rule 3: Flags Use-Case Mismatch (Coding tool for Writing)', () => {
    const tools = [{ name: 'Cursor', plan: 'Pro', spend: 200, seats: 1, useCase: 'Writing' }];
    const result = generateAuditReport(1, tools);
    
    expect(result.recommendations.length).toBeGreaterThan(0);
    const rec = result.recommendations.find(r => r.toolName === 'Cursor' && r.action === 'switch');
    expect(rec).toBeDefined();
  });

  it('Rule 4: Prompts for Annual Billing discount', () => {
    // Cursor Pro is $20/mo. Cursor Pro (Yearly) is $16/mo.
    const tools = [{ name: 'Cursor', plan: 'Pro', spend: 20, seats: 1, useCase: 'Coding' }];
    const result = generateAuditReport(1, tools);
    
    expect(result.recommendations.length).toBeGreaterThan(0);
    const rec = result.recommendations.find(r => r.toolName === 'Cursor' && r.action === 'annual');
    expect(rec).toBeDefined();
    expect(rec.savingsMonthly).toBeGreaterThan(0);
  });

  it('Rule 5: Recommends API migration for large deployments (>30 seats)', () => {
    // 50 seats of Claude Pro ($20/mo) = $1000
    const tools = [{ name: 'Claude', plan: 'Pro', spend: 1000, seats: 50, useCase: 'Mixed' }];
    const result = generateAuditReport(50, tools);
    
    expect(result.recommendations.length).toBeGreaterThan(0);
    const rec = result.recommendations.find(r => r.toolName === 'Claude' && r.action === 'api');
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
});
