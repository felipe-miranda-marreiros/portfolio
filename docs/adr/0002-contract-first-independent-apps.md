# Contract-first: the Contract is the seam between the API, Portfolio and CMS

Agents must build the three apps in parallel without waiting on each other, so the Contract is defined first and lives in a shared package. The Portfolio and CMS build against Contract-derived fixtures and the API implements the same definitions; integration is a late, separate ticket. Ticket dependencies are then limited to "Contract exists" and "monorepo exists".
