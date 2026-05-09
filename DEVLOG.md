## Day 1 — 2026-05-07

**Hours worked:** 5

**What I did:** 
Initialized the project using Vite + React. Set up the foundational routing (`react-router-dom`) and created the core structural components (`LandingPage.jsx` and `Forms.jsx`). Built a dynamic form that allows users to add/remove multiple AI tools to their stack, and successfully implemented local state persistence using `localStorage` and `useEffect`.

**What I learned:** 
Integrated the `lucide-react` library for clean, modern iconography. Explored the nuances of lazy-initializing React `useState` hooks from `localStorage` to ensure the form hydrates correctly on initial load without unnecessary re-renders.

**Blockers / what I'm stuck on:** 
Deciding on the optimal backend provider (Supabase vs. Firebase) to handle the lead capture and dynamic routing for the unique public URLs.

**Plan for tomorrow:** 
Research and compile the official pricing data for all required AI models to populate `PRICING_DATA.md`. 
Begin drafting the logic for the "Audit Engine" that will calculate the actual savings.

## Day 2 — 2026-05-08

**Hours worked:** 5

**What I did:** 
Spent a significant amount of time researching the official, localized pricing for all the required AI models across their Monthly, Yearly, and Business tiers, and compiled it into `PRICING_DATA.md` and `pricingData.js`. Hooked this up to `Forms.jsx` for fully dynamic dropdowns. 
After that, I paid off some early technical debt. I refactored the monolithic `LandingPage.jsx` into modular components (`Navbar.jsx`, `Hero.jsx`) and moved the composition to a `/pages` directory, splitting the CSS for better maintainability.

**What I learned:** 
Pricing tiers for AI models are incredibly messy, and Enterprise plans are almost always custom volume pricing. Structuring this logic up front is crucial.

**Blockers / what I'm stuck on:** 
Now that the UI and data structures are perfect, the math for the Audit Engine is looming. It needs to be "defensible" to a finance person.

**Plan for tomorrow:** 
Build the core `auditEngine.js` logic to analyze the user's stack and calculate specific Monthly and Annual savings based on hardcoded financial rules.

## Day 3 — 2026-05-09

**Hours worked:** 7

**What I did:** 
Spent a huge amount of time debugging a critical "leads null" bug in Supabase. The problem was related to RLS policies and how I was linking the `audit_id` back to the lead. Successfully fixed it by implementing a robust `upsert` flow. Once the local build was stable, I deployed the entire application to Vercel and it's now live!

**What I learned:** 
RLS policies in Supabase can be extremely deceptive. I learned that you must explicitly allow `UPDATE` for the `anon` role if you're using `upsert`, even if you're only "inserting" a new email.

**Blockers / what I'm stuck on:** 
The AI rationale engine is currently broken on production. I'm hitting 404/401 errors with my Anthropic and Gemini API keys. It seems like the production endpoints or keys are being restricted.

**Plan for tomorrow:** 
Fix the AI rationale engine once and for all. I'll either debug the current keys or switch to a more reliable provider like Groq or OpenAI to ensure users get their personalized insights.