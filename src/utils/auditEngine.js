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
        action: 'cancel',
        savingsMonthly: savings,
        rationale: `You are paying for ${seats} seats of ${tool.name}, but your total company size is only ${globalSize}. You are paying for ${zombieSeats} "zombie" seats (likely from offboarded employees or over-purchased licenses). Canceling these excess seats will instantly save you $${savings.toFixed(2)}/mo.`
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
          action: 'downgrade',
          savingsMonthly: savings,
          rationale: `You are currently spending $${spend.toFixed(2)}/mo on ${seats} seat(s) of ${tool.name} ${tool.plan}. Because your team size is under 5, enterprise management features are unnecessary. Downgrading to ${seats} seat(s) of ${tool.name} ${proPlan.name} at $${proPlan.price}/seat will cost $${(proPlan.price * seats).toFixed(2)}/mo. This provides identical core functionality while saving you exactly $${savings.toFixed(2)}/mo.`
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
          action: 'switch',
          savingsMonthly: savings,
          rationale: `You are paying a premium of $${spend.toFixed(2)}/mo for ${tool.name}, an IDE optimized specifically for complex software engineering. However, your stated primary use case is '${tool.useCase}'. Switching your ${seats} seat(s) to a general-purpose frontier model like Claude Pro or ChatGPT Plus ($20/seat) will cost only $${(20 * seats).toFixed(2)}/mo. This provides superior natural language capabilities for your use case and instantly saves you $${savings.toFixed(2)}/mo.`
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
            action: 'annual',
            savingsMonthly: savings,
            rationale: `You are currently paying the standard monthly retail rate of $${spend.toFixed(2)}/mo for ${tool.name} ${tool.plan}. By committing to the equivalent Annual plan at $${annualPlan.price}/seat, your effective monthly cost drops to $${(annualPlan.price * seats).toFixed(2)}/mo. This simple billing toggle yields guaranteed savings of $${savings.toFixed(2)}/mo ($${(savings * 12).toFixed(2)}/year) without changing your tech stack.`
         });
       }
    }
    if (monthlySavingsForTool === 0 && seats >= 30 && !tool.plan.toLowerCase().includes('enterprise')) {
        const savings = spend * 0.3;
        monthlySavingsForTool += savings;
        recommendations.push({
            toolId: tool.id,
            toolName: tool.name,
            action: 'api',
            savingsMonthly: savings,
            rationale: `You are paying full retail subscription pricing for a massive deployment of ${seats} ${tool.name} seats ($${spend.toFixed(2)}/mo). At this scale (>30 seats), per-seat retail licenses are highly inefficient. We recommend migrating power users to ${tool.name} API direct (via a custom UI or LibreChat) or negotiating an Enterprise volume agreement. Based on industry benchmarks, this reduces consumption costs by an average of 30%, which returns approximately $${savings.toFixed(2)}/mo to your bottom line.`
        });
    }

    totalMonthlySavings += monthlySavingsForTool;
  });

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
