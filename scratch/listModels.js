/* eslint-disable */
import fs from 'fs';
import path from 'path';

// Manual .env.local parsing to avoid dependencies
const envPath = path.resolve('.env.local');
let apiKey = '';

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/VITE_AI_API_KEY=(.*)/);
  if (match) apiKey = match[1].trim().replace(/['"]/g, '');
} catch {
  console.error("❌ Could not read .env.local file.");
  process.exit(1);
}

if (!apiKey) {
  console.error("❌ No API key found in .env.local. Please make sure VITE_AI_API_KEY is set.");
  process.exit(1);
}

console.log("🔍 Fetching available models from Google AI Studio...");

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    if (data.error) {
      console.error("❌ API Error:", data.error.message);
      return;
    }

    console.log("\n✅ Available Models:");
    console.log("--------------------------------------------------");
    data.models.forEach(model => {
      const supportsChat = model.supportedGenerationMethods.includes('generateContent') ? "✅" : "❌";
      // Only show models that support content generation
      if (model.supportedGenerationMethods.includes('generateContent')) {
        console.log(`${supportsChat} ID: ${model.name}`);
        console.log(`   Description: ${model.description}`);
      }
    });

  } catch (error) {
    console.error("❌ Network Error:", error.message);
  }
}

listModels();
