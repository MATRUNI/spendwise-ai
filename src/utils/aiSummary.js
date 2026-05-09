export const generateAIRationales = async (recommendations) => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    console.warn("No Anthropic API Key found. Falling back to static rationales.");
    return recommendations.map(rec => rec.fallbackRationale);
  }

  try {
    const prompt = `You are an expert SaaS auditor. You are analyzing an AI software stack. 
I will provide a list of recommendations. For each recommendation, write a professional, personalized 2-sentence rationale explaining exactly why the user is wasting money and why they should take the suggested action.
Do not repeat the raw math in the rationale (we already show that to the user in the UI). Focus on the qualitative business logic (e.g. "Because your team is under 5, enterprise features are unused...").
Return the output strictly as a JSON array of strings, in the exact same order as the provided recommendations. Do not include any conversational text, only the JSON array.

Recommendations:
${JSON.stringify(recommendations.map(r => ({
  tool: r.toolName,
  action: r.action,
  currentSpend: r.currentSpend,
  proposedSpend: r.proposedSpend,
  reason: r.fallbackRationale
})), null, 2)}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Anthropic API Error:", errorData);
      return recommendations.map(rec => rec.fallbackRationale);
    }

    const data = await response.json();
    const aiText = data.content[0].text;
    
    try {
       // Clean markdown if present
       let cleanJson = aiText;
       if (aiText.includes('```json')) {
         cleanJson = aiText.split('```json')[1].split('```')[0].trim();
       } else if (aiText.includes('```')) {
         cleanJson = aiText.split('```')[1].split('```')[0].trim();
       }
       
       const parsedRationales = JSON.parse(cleanJson);
       
       if (Array.isArray(parsedRationales) && parsedRationales.length === recommendations.length) {
         return parsedRationales;
       } else {
         throw new Error("Mismatched array length");
       }
    } catch(e) {
       console.error("Failed to parse AI JSON response. Falling back.", e, aiText);
       return recommendations.map(rec => rec.fallbackRationale);
    }
    
  } catch (err) {
    console.error("Error calling Anthropic API:", err);
    return recommendations.map(rec => rec.fallbackRationale);
  }
};
