# Reflection

**1. The hardest bug you hit this week, and how you debugged it**
The hardest bug I encountered was a critical failure in the lead-to-audit linking system. Even though the frontend appeared to be successfully capturing emails, the Supabase `audits` table consistently showed a `null` `lead_id`, effectively orphaning the audit reports and breaking the core lead-gen funnel.
*Hypotheses & Process:* I first hypothesized that the database insert was failing entirely, but I noticed the report was still generating, so the audit row existed. I then suspected a race condition where the lead wasn't finished saving before the audit update began. After adding aggressive logging, I discovered a `401 Unauthorized` error coming from the Supabase API specifically during the `upsert` call.
*What worked:* I realized there were two concurrent issues. First, the `upsert` command required an explicit `UPDATE` policy for the `anon` role, which was missing from my initial SQL migration. Second, Supabase's `.single()` method returns a direct object rather than an array, which caused my React mapping logic (which expected an array) to fail silently. After updating the RLS policies to allow anonymous updates and refactoring the component to handle the single object response, the system linked perfectly.

**2. A decision you reversed mid-week, and what made you reverse it**
Mid-week, I reversed my decision on how to handle the Lead Capture form. Originally, I planned to enforce a "Strict Magic Link" flow: the user inputs their email, we hide the report, and they *must* click a link in their inbox to see their results.
*Why I reversed it:* After thinking through the user experience, I realized this added massive friction to an "instant gratification" tool. If a founder just wants to see their savings, forcing them out of the app to check their email breaks their momentum. I reversed course and implemented an "Instant Unlock" flow: they submit their email, we capture it to the Supabase `leads` database, and the CSS blur instantly disappears. The magic link still sends to allow them to revisit the URL later, but we optimize for immediate value delivery.

**3. What you would build in week 2 if you had it**
If I had a second week, I would implement a **"Lead-First Persistence"** architecture. Currently, every audit generates a row in the database, which can lead to bloat and potential spam. In Week 2, I would refactor the backend so that the audit is only persisted to the database *after* the user provides their email. This would dramatically improve database efficiency, ensure we only store high-intent data, and allow us to implement a "Resume Audit" feature for returning users based on their lead ID.

**4. How you used AI tools**
I used an AI assistant extensively as a pair-programmer for this project. 
*Tasks:* I used it to help scaffold the repetitive boilerplate of the React components, map out the Supabase authentication flow, and draft the initial regex parser for the JSON string.
*Pivot:* I initially considered a simpler "Instant Rationale" approach using Anthropic Claude 3 Haiku, but pivoted to **Google Gemini (2.5/2.0 Flash)** to power our "Wise Fallback Chain." Gemini provided a more generous free tier and significantly better production reliability. By building a self-healing chain that falls back from Gemini 2.5 to 2.0 to 1.5, we eliminated the 401/404 errors we were seeing with other providers, ensuring the app delivers deep value even under high load.
**What I didn't trust it with:** I didn't trust the AI with anything without direct supervision. While it was a helpful "co-pilot," I manually verified every line of code, hand-tested every logic branch, and debugged errors myself. I treated the AI as a junior dev that needed constant code reviews to ensure the financial math and database security remained 100% accurate.
**When the AI was wrong:** At one point, I asked the AI to map the pricing data. It hallucinated an "Enterprise" tier for Claude with a fixed price of $50/mo. I caught this because I had manually verified the pricing pages, which stated Claude Enterprise requires "Contacting Sales." I manually corrected the data array to set the price to 0 and handle it via custom logic.

**5. Self-rating on a 1–10 scale**
- **Discipline (9/10):** Maintained consistent daily commits and focused strictly on the MVP requirements without getting distracted by scope creep.
- **Code Quality (8/10):** The component architecture is clean and modular, but some CSS could be abstracted better into a Tailwind configuration.
- **Design Sense (8/10):** Implemented a modern, vibrant aesthetic with glassmorphism that feels like a premium B2B SaaS tool.
- **Problem-solving (9/10):** Successfully navigated complex edge cases in both the financial logic and the LLM JSON parsing.
- **Entrepreneurial thinking (9/10):** Prioritized instant user gratification over strict authentication, optimizing for lead generation and conversion velocity.
