# Refactor notes

## Logic fixes
- Chart labels used `getDay()` (a 0–6 weekday number) and the API returned newest-first, so the chart ran backwards. Data is now sorted oldest → newest with real date/time labels.
- Crash when the API returned no `results.values`; empty/invalid responses now show a clear message.
- Errors were stored as raw objects and rendered in JSX (React crash). Errors are mapped to readable messages (401/403, 404, 429, timeout, offline).
- `setInfo({ ...setInfo })` spread a function; symbol was never cleared after errors and the input was uncontrolled. Form is fully controlled and validated (`AAPL`, `BRK.B`).
- Race condition: slow older requests could overwrite newer ones; now cancelled with `AbortController`.
- `lineChart` was a lowercase component name, `tension` was a string, leftover `console.log`s and unused `loading.js`, `wiggle` keyframes and icon removed.
- Tailwind `content` glob was wrong (`"src/**/*{html,js,jsx}"`); fixed. CSS used `@import "tailwindcss/..."`; replaced by `@tailwind` directives.
- Workflow: `next export` (invalid with `output: "export"`), Node 16 and old actions; updated, adds lint and passes the key from a secret.

## Security
- `.env` with a real API key was committed and not git-ignored. It is removed from this zip, `.env*` is now ignored, and `.env.example` is provided. **Rotate that key.**

## UI/UX
- Responsive single-column layout (the old one used `h-[100vh]` and `w-fit`, overflowing on small screens), dark theme, Inter font, labelled form fields, focus rings, loading skeleton, empty state, retry button.
- Summary stats, gradient chart with tooltips, accessible data table, recent-search chips.
- Decorative background glow is `aria-hidden`, no longer moves off-screen, and stops for reduced-motion users.

## Notes
- I could not run `npm install` here (no registry access), so this was not compiled. Run `npm install && npm run lint && npm run build`.
- `package.json` is untouched so `package-lock.json` stays valid. Optional: move `eslint`, `eslint-config-next`, `postcss`, `autoprefixer`, `tailwindcss` to `devDependencies`.
