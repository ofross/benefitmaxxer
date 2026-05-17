# BenefitMaxxer — Claude Code Context

## What this app is

BenefitMaxxer is a **100% client-side web app** (no backend, no build step, no framework) that helps users track credit card benefits against their actual spending. Users select their cards, upload bank CSV exports, and get a dashboard showing used vs. remaining benefits, cashback estimates, overlap detection, and card keep/cancel recommendations.

Live at: https://ofross.github.io/benefitmaxxer  
Repo: https://github.com/ofross/benefitmaxxer

## File structure

```
/
├── index.html          # Full app UI — 3-step wizard (Select Cards → Upload → Dashboard)
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── data.js         # Card database: 94 cards across Chase, Amex, Citi, BofA, Cap1, WF, Discover
│   ├── parser.js       # CSV parser — auto-detects bank format (Chase, Amex, Citi, BofA, Cap1, WF)
│   ├── correlator.js   # Matches transactions to benefits, computes used/remaining credits
│   └── app.js          # UI orchestration, wizard flow, DOM manipulation
└── README.md
```

**On first run: read all four JS files before making any changes.** They contain all the business logic and data structures.

## Tech stack

- Vanilla JS (no framework, no TypeScript, no bundler)
- Plain CSS (no preprocessor)
- Single external dependency: [PapaParse](https://www.papaparse.com/) loaded from CDN for CSV parsing
- No package.json, no node_modules, no build step
- Deployed via GitHub Pages — **every push to `master` auto-deploys**

## Deployment

GitHub Pages serves directly from the `master` branch root. There is no build step. To deploy a change: edit files, `git commit`, `git push origin master`. The live site updates within ~30 seconds.

Do not introduce a build step, bundler, or framework without explicit instruction.

## Key concepts in the codebase

- **Card database** (`data.js`): Each card object has an issuer, annual fee, and a `benefits` array. Each benefit has a type (`annual` | `monthly` | `quarterly` | `semi-annual`), a `credit` dollar amount, and merchant/category matching rules.
- **CSV parsing** (`parser.js`): Each bank exports slightly different column names and date formats. The parser normalizes everything into `{ date, merchant, amount }` objects.
- **Correlation** (`correlator.js`): Matches normalized transactions against benefit rules to determine which credits have been triggered. Handles benefit reset periods (monthly credits reset each month, annual credits reset on card anniversary, etc.).
- **Wizard UI** (`app.js`): Three panels (`#step-1`, `#step-2`, `#step-3`). Navigation handled by adding/removing the `active` class. State is held in module-level JS variables — no localStorage, no URL params.

## Coding conventions

- Vanilla JS only — no jQuery, no lodash, no utility libraries beyond PapaParse
- DOM manipulation via `document.getElementById` and `innerHTML` / `textContent`
- CSS class toggling for UI state (e.g., `.active`, `.selected`, `.used`)
- No ES modules (`import`/`export`) — scripts are loaded in order via `<script>` tags in index.html
- Keep all JS in the existing four files unless there's a strong reason to split

## Common tasks

**Adding a new card:** Edit `js/data.js`. Follow the existing object shape exactly — issuer, card name, annual fee, and benefits array with type/credit/matching fields.

**Fixing a CSV parser:** Edit `js/parser.js`. Each bank has its own detection heuristic (usually checking for a characteristic column header) and normalization function.

**UI changes:** Usually `index.html` + `css/styles.css` together. The wizard step panels are `#step-1`, `#step-2`, `#step-3`.

**Dashboard logic:** `js/correlator.js` for benefit matching math; `js/app.js` for how results are rendered.

## What NOT to do

- Do not add a framework (React, Vue, etc.) without explicit instruction
- Do not add a package.json or build pipeline
- Do not use localStorage or send any data off-device — the "100% local" guarantee is a core feature
- Do not change the GitHub Pages deployment setup
