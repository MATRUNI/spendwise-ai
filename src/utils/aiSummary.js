const MODEL_CHAIN = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-flash-latest',
  'gemma-4-31b-it'
];

export const generateAIRationales = async (recommendations, auditId) => {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  
  if (!apiKey) return recommendations.map(rec => rec.fallbackRationale);

  // 1. Check LocalStorage Cache
  if (auditId) {
    const cacheKey = `ai_rat_${auditId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.length === recommendations.length) return parsed;
      } catch(e) { localStorage.removeItem(cacheKey); }
    }
  }

  const prompt = `You are an expert SaaS auditor. Analyze this AI software stack and write a professional 2-sentence rationale for each recommendation.
Focus on qualitative logic, not the math. Return ONLY a JSON array of strings.

Recommendations:
${JSON.stringify(recommendations.map(r => ({
  tool: r.toolName,
  action: r.action,
  reason: r.fallbackRationale
})), null, 2)}`;

  // 2. Try the Fallback Chain
  for (const modelId of MODEL_CHAIN) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (!response.ok) continue;

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      const parsedRationales = JSON.parse(aiResponse);
      if (Array.isArray(parsedRationales) && parsedRationales.length === recommendations.length) {
        // 3. Cache the success
        if (auditId) {
          localStorage.setItem(`ai_rat_${auditId}`, JSON.stringify(parsedRationales));
        }
        return parsedRationales;
      }
    } catch (err) {
      continue;
    }
  }

  return recommendations.map(rec => rec.fallbackRationale);
};
