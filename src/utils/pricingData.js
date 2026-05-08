export const AI_TOOLS = [
  {
    name: "Cursor",
    plans: [
      { name: "Hobby", price: 0, billing: "monthly" },
      { name: "Pro", price: 20, billing: "monthly" },
      { name: "Pro+", price: 60, billing: "monthly" },
      { name: "Ultra", price: 200, billing: "monthly" },
      { name: "Pro (Yearly)", price: 16, billing: "yearly" },
      { name: "Pro+ (Yearly)", price: 48, billing: "yearly" },
      { name: "Ultra (Yearly)", price: 160, billing: "yearly" },
      { name: "Business", price: 40, billing: "monthly" }
    ]
  },
  {
    name: "GitHub Copilot",
    plans: [
      { name: "Pro", price: 10, billing: "monthly" },
      { name: "Pro+", price: 39, billing: "monthly" },
      { name: "Business", price: 19, billing: "monthly" },
      { name: "Enterprise", price: 39, billing: "monthly" }
    ]
  },
  {
    name: "Claude",
    plans: [
      { name: "Free", price: 0, billing: "monthly" },
      { name: "Pro", price: 17, billing: "monthly" },
      { name: "Max", price: 100, billing: "monthly" },
      { name: "Team (Standard)", price: 20, billing: "monthly" },
      { name: "Team (Premium)", price: 100, billing: "monthly" },
      { name: "Enterprise", price: 20, billing: "monthly" }
    ]
  },
  {
    name: "ChatGPT",
    plans: [
      { name: "Free", price: 0, billing: "monthly" },
      { name: "Go", price: 4.78, billing: "monthly" },
      { name: "Plus", price: 23.94, billing: "monthly" },
      { name: "Pro", price: 128.13, billing: "monthly" },
      { name: "Team", price: 30, billing: "monthly" },
      { name: "Team (Yearly)", price: 21.55, billing: "yearly" },
      { name: "Enterprise", price: 0, billing: "custom" }
    ]
  },
  {
    name: "Gemini",
    plans: [
      { name: "Plus", price: 7.99, billing: "monthly" },
      { name: "Pro", price: 19.99, billing: "monthly" },
      { name: "Ultra", price: 249.99, billing: "monthly" },
      { name: "Base", price: 1.19, billing: "monthly" },
      { name: "Starter", price: 3.23, billing: "monthly" },
      { name: "Standard", price: 10.35, billing: "monthly" }
    ]
  },
  {
    name: "Windsurf",
    plans: [
      { name: "Free", price: 0, billing: "monthly" },
      { name: "Pro", price: 20, billing: "monthly" },
      { name: "Max", price: 200, billing: "monthly" },
      { name: "Team (Yearly)", price: 40, billing: "yearly" }
    ]
  },
  {
    name: "v0",
    plans: [
      { name: "Premium", price: 30, billing: "monthly" },
      { name: "Business", price: 100, billing: "monthly" }
    ]
  },
  {
    name: "Perplexity",
    plans: [
      { name: "Free", price: 0, billing: "monthly" },
      { name: "Pro", price: 20, billing: "monthly" },
      { name: "Max", price: 167, billing: "monthly" },
      { name: "Enterprise Max", price: 271, billing: "monthly" }
    ]
  },
  {
    name: "Midjourney",
    plans: [
      { name: "Basic", price: 10, billing: "monthly" },
      { name: "Standard", price: 30, billing: "monthly" },
      { name: "Pro", price: 60, billing: "monthly" },
      { name: "Mega", price: 120, billing: "monthly" },
      { name: "Basic (Yearly)", price: 8, billing: "yearly" },
      { name: "Standard (Yearly)", price: 24, billing: "yearly" },
      { name: "Pro (Yearly)", price: 48, billing: "yearly" },
      { name: "Mega (Yearly)", price: 96, billing: "yearly" }
    ]
  }
];

export const getPlansForTool = (toolName) => {
  const tool = AI_TOOLS.find(t => t.name === toolName);
  return tool ? tool.plans : [];
};
