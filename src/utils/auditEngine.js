import { AI_TOOLS } from './pricingData';

export const generateAuditReport = (globalTeamSize, userTools) => {
  let totalMonthlySavings = 0;
  let totalCurrentSpend = 0;
  const recommendations = [];

  userTools.forEach((tool) => {
    let seats = parseInt(tool.seats, 10) || 1;
    let spend = parseFloat(tool.spend) || 0;
    const globalSize = parseInt(globalTeamSize, 10) || seats;
    
    totalCurrentSpend += spend;
    let monthlySavingsForTool = 0;

    if (seats > globalSize) {
      const zombieSeats = seats - globalSize;
      const costPerSeat = spend / seats;
      const savings = zombieSeats * costPerSeat;
      
      monthlySavingsForTool += savings;
      recommendations.push({
        toolId: tool.id,
        toolName: tool.name,
        action: 'Cancel Seats',
        savingsMonthly: savings,
        currentSpend: spend,
        proposedSpend: spend - savings,
        seats: seats,
        fallbackRationale: `You are paying for ${seats} seats of ${tool.name}, but your total company size is only ${globalSize}. You are paying for ${zombieSeats} "zombie" seats (likely from offboarded employees or over-purchased licenses). Canceling these excess seats will instantly save you $${savings.toFixed(2)}/mo.`
      });
      
      seats = globalSize;
      spend = spend - savings;
    }
    if ((tool.plan.includes('Team') || tool.plan.includes('Business')) && seats < 5) {
      const toolData = AI_TOOLS.find(t => t.name === tool.name);
      const proPlan = toolData?.plans.find(p => p.name.includes('Pro') || p.name === 'Plus' || p.name === 'Premium');
      
      if (proPlan && (proPlan.price * seats) < spend) {
        const savings = spend - (proPlan.price * seats);
        monthlySavingsForTool += savings;
        recommendations.push({
          toolId: tool.id,
          toolName: tool.name,
          action: `Downgrade to ${proPlan.name}`,
          savingsMonthly: savings,
          currentSpend: spend,
          proposedSpend: proPlan.price * seats,
          seats: seats,
          fallbackRationale: `You are currently spending $${spend.toFixed(2)}/mo on ${seats} seat(s) of ${tool.name} ${tool.plan}. Because your team size is under 5, enterprise management features are unnecessary. Downgrading to ${seats} seat(s) of ${tool.name} ${proPlan.name} at $${proPlan.price}/seat will cost $${(proPlan.price * seats).toFixed(2)}/mo. This provides identical core functionality while saving you exactly $${savings.toFixed(2)}/mo.`
        });
      }
    }

    const expensiveCodeTools = ['Cursor', 'Windsurf', 'GitHub Copilot'];
    const nonCodeUseCases = ['writing', 'research', 'mixed'];
    if (expensiveCodeTools.includes(tool.name) && spend > (25 * seats) && nonCodeUseCases.includes(tool.useCase.toLowerCase())) {
      const savings = spend - (20 * seats);
      if (savings > 0) {
        monthlySavingsForTool += savings;
        recommendations.push({
          toolId: tool.id,
          toolName: tool.name,
          action: 'Switch to Claude/ChatGPT',
          savingsMonthly: savings,
          currentSpend: spend,
          proposedSpend: 20 * seats,
          seats: seats,
          fallbackRationale: `You are paying a premium of $${spend.toFixed(2)}/mo for ${tool.name}, an IDE optimized specifically for software engineering. Switching your ${seats} seat(s) to a general-purpose model like Claude Pro or ChatGPT Plus ($20/seat) will save you $${savings.toFixed(2)}/mo.`
        });
      }
    }

    if (monthlySavingsForTool === 0 && !tool.plan.includes('Yearly') && !tool.plan.includes('Annual')) {
       const toolData = AI_TOOLS.find(t => t.name === tool.name);
       const annualPlan = toolData?.plans.find(p => p.name === `${tool.plan} (Yearly)`);
       
       if (annualPlan && (annualPlan.price * seats) < spend) {
         const savings = spend - (annualPlan.price * seats);
         monthlySavingsForTool += savings;
         recommendations.push({
            toolId: tool.id,
            toolName: tool.name,
            action: 'Switch to Annual',
            savingsMonthly: savings,
            currentSpend: spend,
            proposedSpend: annualPlan.price * seats,
            seats: seats,
            fallbackRationale: `By committing to the equivalent Annual plan at $${annualPlan.price}/seat, your effective monthly cost drops to $${(annualPlan.price * seats).toFixed(2)}/mo, saving you $${savings.toFixed(2)}/mo.`
         });
       }
    }
    if (monthlySavingsForTool === 0 && seats >= 30 && !tool.plan.toLowerCase().includes('enterprise')) {
        const savings = spend * 0.3;
        monthlySavingsForTool += savings;
        recommendations.push({
            toolId: tool.id,
            toolName: tool.name,
            action: 'API Migration',
            savingsMonthly: savings,
            currentSpend: spend,
            proposedSpend: spend - savings,
            seats: seats,
            fallbackRationale: `At this scale (>30 seats), we recommend migrating to ${tool.name} API direct or negotiating an Enterprise agreement to save approximately 30% ($${savings.toFixed(2)}/mo).`
        });
    }

    // RULE 5: High-Spend API Optimization (Credits)
    if (monthlySavingsForTool === 0 && tool.name.toLowerCase().includes('api') && spend > 500) {
        const savings = spend * 0.5; // Credits usually cover 50-100%
        monthlySavingsForTool += savings;
        recommendations.push({
            toolId: tool.id,
            toolName: tool.name,
            action: 'Apply for Credits',
            savingsMonthly: savings,
            currentSpend: spend,
            proposedSpend: spend - savings,
            seats: seats,
            fallbackRationale: `You could qualify for AWS/Azure credits to offset your $${spend.toFixed(2)}/mo API spend by at least 50%.`
        });
    }

    // RULE 6: Cheaper Alternative Tool (e.g. Writing/General Case)
    if (monthlySavingsForTool === 0 && tool.name === 'ChatGPT' && tool.plan === 'Plus' && tool.useCase === 'writing') {
        const savings = 20; // Switch to Claude Free
        monthlySavingsForTool += savings;
        recommendations.push({
            toolId: tool.id,
            toolName: tool.name,
            action: 'Switch to Claude Free',
            savingsMonthly: savings,
            currentSpend: spend,
            proposedSpend: 0,
            seats: seats,
            fallbackRationale: `For writing use cases, Claude's free tier often provides superior results, saving you $20/mo.`
        });
    }

    totalMonthlySavings += monthlySavingsForTool;
  });

  // RULE 7: Multi-tool Redundancy (Cursor + Copilot)
  const hasCursor = userTools.find(t => t.name === 'Cursor');
  const hasCopilot = userTools.find(t => t.name === 'GitHub Copilot');
  if (hasCursor && hasCopilot) {
    const copilotSpend = parseFloat(hasCopilot.spend) || 0;
    totalMonthlySavings += copilotSpend;
    recommendations.push({
        toolId: hasCopilot.id,
        toolName: 'GitHub Copilot',
        action: 'Cancel Redundant Tool',
        savingsMonthly: copilotSpend,
        currentSpend: copilotSpend,
        proposedSpend: 0,
        seats: hasCopilot.seats,
        fallbackRationale: `You are paying for both Cursor and GitHub Copilot. Since Cursor is an IDE that already includes advanced autocomplete and chat features (powered by the same or better models), GitHub Copilot is 100% redundant. We recommend canceling your Copilot subscription to save $${copilotSpend.toFixed(2)}/mo.`
    });
  }

  // RULE 8: Frontier Model Consolidation (ChatGPT + Claude)
  const hasChatGPT = userTools.find(t => t.name === 'ChatGPT' && (t.plan === 'Plus' || t.plan === 'Pro'));
  const hasClaude = userTools.find(t => t.name === 'Claude' && (t.plan === 'Pro' || t.plan === 'Plus'));
  if (hasChatGPT && hasClaude && globalTeamSize < 10) {
    const cheaperSpend = Math.min(parseFloat(hasChatGPT.spend), parseFloat(hasClaude.spend));
    const toolToCancel = parseFloat(hasChatGPT.spend) < parseFloat(hasClaude.spend) ? 'ChatGPT' : 'Claude';
    totalMonthlySavings += cheaperSpend;
    recommendations.push({
        toolId: toolToCancel === 'ChatGPT' ? hasChatGPT.id : hasClaude.id,
        toolName: toolToCancel,
        action: 'Consolidate Frontier Models',
        savingsMonthly: cheaperSpend,
        currentSpend: cheaperSpend,
        proposedSpend: 0,
        seats: 1,
        fallbackRationale: `You are paying for both ChatGPT Plus and Claude Pro. For teams under 10, having both frontier models is often overkill. We recommend consolidating onto one (Claude for better prose/coding or ChatGPT for multi-modality) to save $${cheaperSpend.toFixed(2)}/mo.`
    });
  }

  const percentageSaved = totalCurrentSpend > 0 ? ((totalMonthlySavings / totalCurrentSpend) * 100) : 0;

  return {
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    totalCurrentSpend,
    percentageSaved,
    isOptimized: totalMonthlySavings < 10,
    recommendations
  };
};
