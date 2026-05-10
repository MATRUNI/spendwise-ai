# 🚀 Spendwise AI - Smart AI Spend Auditor

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://spendwise-ai-phi.vercel.app/)

**Stop paying for "Zombie" AI seats and redundant tools.** Spendwise AI is a zero-knowledge audit engine that identifies 20-30% in hidden AI SaaS waste in under 60 seconds.

---

## ✨ Features

- **60-Second Deep Audit**: Instantly identify redundant subscriptions (e.g., Cursor vs. Copilot).
- **The "Wise Engine"**: 8+ proprietary financial rules that detect "Zombie" seats and over-provisioned plans.
- **AI-Powered Rationales**: Self-healing model chain (Gemini 2.0/Flash) that explains *exactly* why you should cancel or switch.
- **Zero-Knowledge Privacy**: No credit cards, no bank logins, and no OAuth required.
- **Lead-First Persistence**: Results are saved and shared via a secure Supabase backend.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite (Vanilla CSS for performance)
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI Engine**: Google Gemini (via "The Wise" self-healing fallback chain)
- **Icons**: Lucide React
- **Testing**: Vitest

---

## 🧠 The "Wise" Engine Logic

Spendwise doesn't just subtract numbers; it understands the AI ecosystem.
- **Redundancy Rules**: Flags when you're paying for frontier models (Claude/ChatGPT) across multiple tools.
- **API Migration**: Identifies when it's cheaper to move from seat-based plans to direct API credits.
- **Seat Optimization**: Detects when your seat count exceeds your actual team size (Zombie Seats).
- **Billing Intelligence**: Finds 20% savings by identifying missed annual billing opportunities.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MATRUNI/spendwise-ai.git
   cd spendwise-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file:
   ```env
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   VITE_AI_API_KEY=your_gemini_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 🧪 Testing

We maintain a rigorous test suite to ensure the accuracy of our financial recommendations.
```bash
npm test
```

---

**Built with ❤️ for the Spendwise AI Challenge.**
[Live Application](https://spendwise-ai-phi.vercel.app/)
