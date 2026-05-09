# Automated Tests

This project uses **Vitest** for incredibly fast, modern unit testing. 
The tests specifically cover the core mathematical logic of the Audit Engine to ensure all financial advice is defensible and mathematically accurate.

## How to Run Tests
From the root directory, simply run:
```bash
npm test
```

## Test Suite: `src/utils/auditEngine.test.js`

1. **Test:** `Rule 1: Detects Zombie Seats and calculates savings`
   - **Covers:** Validates that if `seats > globalCompanySize`, the engine correctly calculates the delta, flags them as zombie seats, and proposes a cancellation with the exact monthly savings math.

2. **Test:** `Rule 2: Recommends downgrade to Individual for small teams`
   - **Covers:** Verifies that if a user is paying for a "Business/Team" tier, but their team size is `< 5`, the engine recommends downgrading to a "Pro/Individual" tier and accurately calculates the price difference per seat.

3. **Test:** `Rule 3: Flags Use-Case Mismatch (Coding tool for Writing)`
   - **Covers:** Checks the logic that flags expensive, specialized tools (like Cursor) being used for generic tasks (like "Writing"). Ensures it proposes switching to a generic frontier model (like Claude) to optimize the stack.

4. **Test:** `Rule 4: Prompts for Annual Billing discount`
   - **Covers:** Validates the fallback rule. If no other savings are found, but the user is on a "Monthly" plan, it finds the equivalent "Annual" plan from the pricing data and calculates the prorated monthly savings.

5. **Test:** `Rule 5: Recommends API migration for large deployments (>30 seats)`
   - **Covers:** Ensures the volume-discount rule fires. If a company provisions more than 30 individual GUI seats, it triggers the API migration recommendation and calculates the estimated 30% consumption savings.

6. **Test:** `Calculates total potential savings correctly`
   - **Covers:** A compound integration test that passes multiple inefficient tools into the engine simultaneously to ensure `totalMonthlySavings` and `totalAnnualSavings` aggregate correctly without double-counting.
