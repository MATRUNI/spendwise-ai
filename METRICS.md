# Metrics Framework

## The North Star Metric: "High-Savings" Reports Shared via UUID
**Why this matters:** For a B2B lead-generation tool like Spendwise, raw pageviews or Daily Active Users (DAU) are classic vanity metrics. A user doesn't need to audit their AI spend every day—ideally, they do it once a quarter. If we optimized for DAU, we'd be building the wrong product. 

The true North Star is the **Viral Share Rate of High-Value Reports.** When a VP of Finance generates a report showing >$10k in waste and shares that unique URL with their VP of Engineering, it proves two things: the tool provided immediate "Aha!" value, and our brand has successfully infiltrated the executive level of a target account. Success is defined by the tool moving from one inbox to a Slack channel.

## 3 Critical Input Metrics
1.  **Audit Completion Rate (Top-of-Funnel Health):** The percentage of users who land on the tool and successfully click "Analyze My Spend." This measures the friction of our UI. If this is low, our list of AI tools is likely too long or the UI feels like "work" rather than a "quick win."
2.  **Email Capture Rate (The Value Gate):** The percentage of users who, after seeing their blurred savings total, actually provide their email to unlock the full report. This is the ultimate "Hook" metric. It measures if the *perceived* value of the savings is worth the "cost" of a B2B lead's email address.
3.  **Consultation Booking CTR:** For reports that cross a high-savings threshold, what percentage of users click "Book a Credex Consultation"? This is our direct measure of bottom-of-funnel intent and lead quality.

## What We’d Instrument First
Before we worry about complex data warehouses, we will implement:
*   **Field-Level Drop-off Tracking:** We need to know exactly which tool in our list causes users to stop filling out the form. If 50% of users drop off when asked about "Midjourney" seats, we know that field is too niche or confusing.
*   **Share-Link Webhooks:** We will instrument the "Copy Link" button and the initial load of a UUID-gated page from a unique IP. This allows us to calculate our "Viral Coefficient"—how many new views each audit generates.
*   **AI Engine Efficiency:** Tracking the "Cost-per-Lead" by monitoring the tokens used in our Gemini fallback chain versus the number of emails captured.

## The Pivot Trigger
**Trigger:** If the **Email Capture Rate stays below 5%** after 1,000 completed audits.

**The Logic:** If 95% of people see they can save money but refuse to give an email to see how, it means the "AI Spend" pain point isn't a "hair-on-fire" problem. It’s a "nice-to-have." In this scenario, we would pivot the core engine logic to audit **Cloud/AWS Spend** or **Shadow IT**, where the financial leak is larger and the executive pain is already universally acknowledged.
