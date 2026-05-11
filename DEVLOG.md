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

## Day 4 — 2026-05-10

**Hours worked:** 6

**What I did:** 
Complete overhaul of the AI Rationale Engine. Migrated from Anthropic to a self-healing Google Gemini fallback chain (Gemini 2.0 → 1.5 → Gemma) to eliminate 404/429 errors on production. Implemented `localStorage` caching tied to `auditId` for instant reloads and API quota preservation. 
Added a high-fidelity full-screen Loader component to resolve the "frozen UI" UX issue during analysis. Hardened the codebase for production by stripping all console logs, resolving React key collision warnings in `pricingData.js`, and optimizing font loading (preconnect + display:swap) for Lighthouse. Finalized the CI/CD pipeline by aligning Vitest test assertions with new descriptive UI labels.

**What I learned:** 
Reliability is better than "smartness" for an MVP. Switching to a robust fallback model chain solved 100% of our production stability issues. I also learned that Lighthouse scores are heavily affected by dev-server overhead; running `npm run preview` is the only way to see the real production performance.

**Blockers / what I'm stuck on:** 
None! The project is technically complete, stable, and passes all 6 regression tests. Just the UI/UX needs a bit polishing, which I'll do tomorrow

**Plan for tomorrow:** 
Perform real-world user interviews with 3+ professionals to gather direct quotes and design feedback for the final submission report.

## Day 5 — 2026-05-11

**Hours worked:** 6

**What I did:** 
Today was all about "Hardening and Documentation." I initially integrated Resend for professional emails, but pivoted back to the **default Supabase mailer** after hitting the Sandbox restriction (which limited sends only to the account owner). To maintain a premium UX, I designed and implemented a high-fidelity HTML email template within Supabase that provides a branded experience for all users. Tested the live build on multiple mobile devices and fixed several responsive UI bugs in the results dashboard. Finalized the complete project documentation suite, including `ARCHITECTURE.md` (with Mermaid diagrams), `ECONOMICS.md`, `GTM.md`, `METRICS.md`, and `PROMPTS.md`. Rebranded the UI with a "Powered by Matruni" personal signature.

**What I learned:** 
I learned that even when a professional tool (like Resend) is technically integrated, "Sandbox" restrictions can break the MVP flow. The real skill is knowing when to pivot to a "Good Enough" solution (Supabase HTML templates) that works for 100% of the audience.

**Blockers / what I'm stuck on:** 
I am currently blocked on the **User Interviews**. I've reached out to several professionals but haven't received responses yet. I may need to use my own "Founder's Intuition" and competitive analysis to finalize the UX if the responses don't come in by the deadline.

**Plan for tomorrow:** 
Final review of the Vercel deployment, one last push for user feedback, and final submission of the project repository!