# DriveMatch — Claude Code Project Context

## What is DriveMatch?

DriveMatch is a UK-based AI-powered vehicle matching website. The core pitch is:

> "DriveMatch tells you exactly which car fits your life — then finds it, checks it, and sorts it for you. No showroom visits, no endless scrolling, no guesswork."

The product is a free consumer tool that matches buyers to vehicles using a conversational questionnaire and Claude AI. Revenue comes from commission when Jayden (the owner) personally sources and closes a deal, and from flat listing fees charged to dealer partners. There is **no finance facilitation** at this stage — DriveMatch is a matching and sourcing service only, which keeps it outside FCA authorisation requirements.

**Owner:** Jayden  
**Market:** UK only  
**Year one goal:** 10 matches, at least 1 closed deal

---

## Tech Stack

This is a **plain static website** — no frameworks, no build step, no npm on the frontend. It runs as HTML, CSS, and vanilla JavaScript files.

| Layer | Technology |
|---|---|
| Frontend | Plain HTML5, CSS3, Vanilla JavaScript |
| Styling | Single CSS file with CSS custom properties |
| AI matching | Anthropic Claude API (`claude-sonnet-4-5`) |
| Serverless function | Netlify Functions (Node.js) |
| Vehicle database | Local JSON file (`data/vehicles.json`) |
| Form capture | Netlify Forms (hidden HTML forms) |
| Email notifications | Resend (configured in function, optional) |
| Local development | Netlify CLI (`netlify dev`) |
| Hosting | Netlify (static site + functions) |
| Fonts | Google Fonts — Plus Jakarta Sans, Geist Mono |

**There is no database, no backend server, no React, no Next.js, no TypeScript.** Everything is vanilla.

---

## File Structure

```
drivematch/
├── index.html                    # Homepage — hero, onboarding trigger, result display, modals
├── css/
│   └── style.css                 # Complete design system — ~1,600 lines
├── js/
│   └── app.js                    # All frontend logic — ~1,650 lines
├── pages/
│   ├── reviews.html              # Owner reviews — filter, paginate, submit
│   ├── blog.html                 # Blog listing with category filters
│   ├── post.html                 # Blog post reader (?slug= URL param)
│   ├── about.html                # About page
│   └── how-it-works.html         # How it works + FAQ accordion
├── data/
│   └── vehicles.json             # Vehicle database — 123 vehicles
├── netlify/
│   └── functions/
│       └── match.js              # Serverless function — secure Claude API call
├── netlify.toml                  # Netlify config — publish dir, functions dir, redirects
├── package.json                  # One dependency: @anthropic-ai/sdk
├── .env                          # Local env vars — ANTHROPIC_API_KEY (never commit)
└── .gitignore                    # Excludes .env, node_modules
```

**Key rule:** `node_modules/` is never committed or manually managed. It is created by running `npm install`.

---

## Running Locally

```bash
# Navigate to project folder
cd path/to/drivematch

# Install the one dependency (only needed once per machine)
npm install

# Install Netlify CLI globally (only needed once per machine)
npm install -g netlify-cli

# Start local dev server
netlify dev
```

Then open `http://localhost:8888`. The Netlify CLI:
- Serves static files at port 8888
- Runs Netlify Functions locally at `/.netlify/functions/`
- Injects `.env` variables into the function environment
- Proxies `/api/match` to `/.netlify/functions/match`

**Netlify Forms do not work locally.** They only work on the live Netlify deployment. Silent failures on localhost are expected and correct.

---

## Environment Variables

| Variable | Where it lives | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | `.env` (local) / Netlify dashboard (live) | Claude API authentication |
| `RESEND_API_KEY` | `.env` / Netlify dashboard | Email notifications (optional) |
| `RESEND_FROM_EMAIL` | `.env` / Netlify dashboard | From address for emails |
| `NOTIFICATION_EMAIL` | `.env` / Netlify dashboard | Jayden's email for lead alerts |

The `.env` file format:
```
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hello@drivematch.co.uk
NOTIFICATION_EMAIL=jayden@drivematch.co.uk
```

**Never put the API key in any JS file that the browser can access.** The key only ever lives in `netlify/functions/match.js` via `process.env.ANTHROPIC_API_KEY`.

---

## How the Matching Works

### User Journey
1. User clicks "Find My Match" on the homepage
2. **Conversational onboarding overlay** opens — full screen, dark navy, one question at a time
3. User answers 10 questions via pill buttons (auto-advances) and one free-text field
4. On completion, overlay closes, loader appears, quiz answers POST to `/.netlify/functions/match`
5. The function pre-filters `vehicles.json`, builds a prompt, calls Claude API
6. Claude returns JSON — vehicle, score, pros, cons, summary, alternatives, stats
7. Result renders on the page with hero image, stats bar, pros/cons, summary, alternatives
8. User can click "Find this car for me" (lead capture) or "Notify when available" (waitlist)
9. Both actions submit a Netlify Form silently in the background

### The Netlify Function (`netlify/functions/match.js`)

This is the only server-side code. It runs securely — the browser never touches the Claude API directly.

**Flow inside the function:**
1. Receives quiz answers as JSON via POST
2. Runs `preFilter(quiz)` — eliminates vehicles outside budget, wrong fuel type, wrong body style, wrong condition, wrong seat count. Caps results at 25 candidates.
3. Sorts candidates by relevance using `buildPriorityTags(quiz)` — matches quiz answers to `best_for` tags
4. Calls `buildPrompt(quiz, candidates)` — formats the shortlist and user profile into a prompt
5. Calls Claude API with `claude-sonnet-4-5`, max 1024 tokens
6. Parses the JSON response and returns it to the browser

**Budget tiers (valid values for `quiz.budget`):**
```
Under £5,000 | Under £10,000 | £10,000–£20,000 | £20,000–£35,000 | £35,000–£60,000 | £60,000–£100,000 | Over £100,000
```

### What Claude Returns

The function instructs Claude to return this exact JSON structure:
```json
{
  "vehicle": "Full Make Model Variant",
  "category": "e.g. Compact SUV",
  "priceRange": "e.g. £24,000–£28,000 new · £14,000–£20,000 used",
  "fuelType": "e.g. Petrol / Mild Hybrid",
  "matchScore": 91,
  "pros": ["string", "string", "string", "string", "string"],
  "cons": ["string", "string", "string"],
  "summary": "3-4 personalised sentences referencing the buyer's specific answers",
  "insuranceGroup": 16,
  "bootLitres": 311,
  "realMpg": 44,
  "realRangeMiles": 0,
  "seats": 5,
  "towingKg": 0,
  "reliability": "good",
  "runningCost": "low",
  "alternatives": [
    { "name": "Make Model Variant", "reason": "One sentence" },
    { "name": "Make Model Variant", "reason": "One sentence" },
    { "name": "Make Model Variant", "reason": "One sentence" }
  ]
}
```

---

## Vehicle Database (`data/vehicles.json`)

### Stats
- **Total vehicles:** 135
- **Price range (used):** £1,500 to £95,000
- **Makes:** 42 brands including all mainstream UK sellers, German premium brands, and Chinese EV brands

### Make breakdown (top brands)
Mercedes-Benz: 11 | Audi: 11 | BMW: 10 | Volkswagen: 11 | Toyota: 8 | Ford: 7 | Kia: 4 | Hyundai: 5

### By body style
Hatchback: 49 | SUV: 49 | Saloon: 18 | Estate: 10 | Coupe: 4 | MPV: 3 | Van: 2

### By fuel type
Petrol: 46 | Electric: 28 | Mild hybrid: 24 | Diesel: 15 | PHEV: 11 | Hybrid: 11

### Vehicle object structure
```json
{
  "make": "Toyota",
  "model": "RAV4",
  "variant": "2.5 Hybrid Design",
  "body_style": "suv",
  "fuel_type": "hybrid",
  "seats": 5,
  "boot_litres": 580,
  "price_new_min": 36000,
  "price_new_max": 42000,
  "price_used_min": 24000,
  "price_used_max": 30000,
  "running_cost": "low",
  "reliability": "excellent",
  "towing_kg": 1650,
  "parking_size": "large",
  "best_for": ["family", "long_distance", "reliability", "practicality", "towing"],
  "avoid_for": ["city_only", "driving_enjoyment", "first_car"],
  "new_or_used": ["new", "nearly_new", "used"],
  "insurance_group": 23,
  "real_mpg": 47,
  "real_range_miles": 0,
  "notes": "Self-charging hybrid, no plugging in required. Class-leading reliability."
}
```

### Valid field values

**`body_style`:** `hatchback` | `saloon` | `estate` | `suv` | `coupe` | `convertible` | `mpv` | `van` | `pickup`

**`fuel_type`:** `petrol` | `diesel` | `electric` | `hybrid` | `phev` | `mild_hybrid`

**`running_cost`:** `very_low` | `low` | `medium` | `high` | `very_high`

**`reliability`:** `excellent` | `good` | `average` | `below_average`

**`parking_size`:** `small` | `medium` | `large` | `very_large`

**`best_for` / `avoid_for` tags:** `business` | `city_only` | `daily_commute` | `driving_enjoyment` | `family` | `first_car` | `long_distance` | `low_running_costs` | `off_road` | `practicality` | `prestige` | `reliability` | `towing` | `weekend_leisure`

**Adding a new vehicle:** Copy any existing entry, paste before the final `]` of the `vehicles` array, add a comma after the previous entry's closing `}`, update all fields. Validate at jsonlint.com before testing.

---

## Frontend Architecture (`js/app.js`)

The entire frontend is one JavaScript file (~1,650 lines). It is split into logical sections:

### Global State
```js
const TEST_MODE = false;        // Set true to use mock data, false for real API
let currentMatch = null;        // The current match result object
let currentQuizData = null;     // The quiz answers that produced currentMatch
let obCurrentStep = 0;          // Current onboarding step index (0-9)
let obAnswers = {};             // Accumulated onboarding answers
let loaderInterval = null;      // Loader step animation interval
let loaderStep = 0;             // Current loader step
let vehicleDatabase = null;     // Cached vehicles.json content
```

### Key Sections (in order in the file)

**TEST_MODE & Mock Data** — `MOCK_REVIEWS`, `MOCK_BLOG_POSTS`, `MOCK_BLOG_CONTENT`, `MOCK_MATCHES`. When `TEST_MODE = true`, all API calls return mock data. Used for development without API credits.

**API Wrapper** — `API.match()`, `API.getReviews()`, `API.postReview()`, `API.helpful()`, `API.submitLead()`, `API.submitNotify()`, `API.getBlogPosts()`, `API.getBlogPost()`. Each method checks `TEST_MODE` first.

**Utilities** — `delay()`, `getCarImage()`, `getAvatarColor()`, `formatDate()`, `getCatLabel()`, `toast()`, `setActiveNav()`

**Vehicle Modal** — `loadVehicleDatabase()`, `findVehicleByName()`, `openVehicleModal()`, `renderVehicleModal()`, `closeVehicleModal()`. Fetches `data/vehicles.json` once, caches it, powers the "Also consider" click-to-learn-more modals.

**Netlify Form Submissions** — `netlifySubmitMatch()`, `netlifySubmitNotify()`. Silent background POSTs to Netlify Forms. Non-critical — wrapped in try/catch, failures are silent.

**Nav & Footer Injection (`injectShell`)** — Called on `DOMContentLoaded`. Injects the sticky navbar and footer into every page. Uses path detection to build correct relative links:
```js
const inPages = window.location.pathname.includes('/pages/');
const root    = inPages ? '../' : '';
const pages   = inPages ? '' : 'pages/';
```
This is critical — without it, navigation breaks from `pages/` subdirectory.

**Conversational Onboarding** — `OB_STEPS` array defines all 10 questions with icons, sub-hints, and option lists. `startOnboarding()`, `closeOnboarding()`, `renderObStep()`, `obAdvance()`, `obBack()`, `obSkip()`, `obTextContinue()`, `obFinish()`, `runMatchFromOnboarding()`.

**Match Result Rendering (`showResult`)** — Builds the full result card HTML including: hero image with score ring, quick stats bar (insurance group, boot, seats, MPG/range, reliability, towing), pros/cons, summary, alternatives (clickable), low match panel (if score < 70%), CTAs. After rendering, calls `scheduleFindPrompt()` to show the find-car pop-up after 4 seconds.

**Find Car Prompt** — `scheduleFindPrompt(vehicle)`, `findPromptAccept()`, `dismissFindPrompt()`. A fixed bottom banner that slides up 4 seconds after the result renders. Copy: "Should I find your [Vehicle] for you?" with a "Yes, find it for me" CTA that opens the lead modal. Dismissed by × button, by opening the lead modal, or when a new result loads. State managed by `_findPromptTimer`. Styled via `.find-prompt` / `.fp-visible` in `style.css`.

**Low Match Suggestions** — `buildLowMatchSuggestions()` analyses quiz answers vs result and generates 2-3 specific actionable suggestions. Triggers at score < 70%. `tryLowMatchSuggestion()` patches one field and re-runs the match. Scores < 50% show a red "very difficult" panel.

**Modals** — `openLeadModal()`, `openNotifyModal()`, `closeModal()`, `submitLead()`, `submitNotify()`, `selectPref()`

### `showSection(section)` — Critical function

Controls what's visible in the result area. Only three valid values:
- `'loader'` — shows loader, hides result
- `'result'` — shows result, hides loader
- `'form'` — hides everything, re-opens onboarding overlay

Used by `tryLowMatchSuggestion` and error handling.

---

## Design System (`css/style.css`)

~1,600 lines. All values use CSS custom properties defined in `:root`.

### Colour Palette
```css
--brand-700: #1d4ed8;   /* Primary brand blue */
--brand-600: #2563eb;
--brand-500: #3b82f6;
--brand-100: #dbeafe;
--brand-50:  #eff6ff;
--navy:      #0f172a;   /* Dark backgrounds, headings */
--slate-50:  #f8fafc;   /* Page background */
--green:     #059669;   /* Strengths, success */
--amber:     #d97706;   /* Considerations, warnings */
```

### Typography
```css
--font-display: 'Plus Jakarta Sans', system-ui, sans-serif;  /* H1/H2 display headings, font-weight 700/800 */
--font-body:    'Plus Jakarta Sans', system-ui, sans-serif;  /* All body text, UI elements */
--font-mono:    'Geist Mono', monospace;                     /* Labels, stats, codes */
```

`--font-display` and `--font-body` both resolve to Plus Jakarta Sans. Headings are differentiated from body by weight (800 vs 400–600), not by typeface. Syne was the previous display font and has been removed entirely — do not re-add it.

### Key CSS sections (in order)
Reset & base → Design tokens → Typography → Layout → Test mode banner → Navbar → Buttons (`.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`) → Badges → Cards → Hero → Trust bar → **Pain section** → Section → Quiz (legacy, unused) → Matching loader → Match result → Modal → Reviews → Blog → Page headers → About page → How it works → How it works steps grid → Footer → Pagination → Empty state → Spinner → Skeleton → Utility → Animations → Responsive breakpoints → Alt card clickable → Vehicle detail modal → Low match panel → Result stats bar → Conversational onboarding

### Responsive breakpoints
```css
@media (max-width: 900px) { /* Tablet */ }
@media (max-width: 640px) { /* Mobile */ }
@media (max-width: 400px) { /* Small mobile */ }
```

---

## Onboarding Questions (OB_STEPS)

The 10 steps in order, with their `id` field names (these map directly to the quiz data object sent to the API):

| Step | ID | Question |
|---|---|---|
| 1 | `budget` | What's your budget? |
| 2 | `primaryUse` | What will you mainly use it for? |
| 3 | `household` | Who's the car for? |
| 4 | `fuel` | Any preference on fuel type? |
| 5 | `mileage` | Roughly how many miles a year? |
| 6 | `priority` | What matters most to you? |
| 7 | `parking` | Where do you park at home? |
| 8 | `condition` | New or used? |
| 9 | `bodyStyle` | Any preference on body style? |
| 10 | `extraNotes` | Anything else we should know? (free text, optional) |

**Special handling:** If the user selects "I don't know" on mileage, `obFinish()` converts this to an empty string before sending to the API.

---

## Netlify Forms

Two hidden forms in `index.html` (detected by Netlify at deploy time):

**`drivematch-match`** — Fires silently after every successful match. Fields: vehicle, match_score, category, fuel_type, price_range, all quiz answers, summary (truncated to 500 chars), submitted_at timestamp.

**`drivematch-notify`** — Fires when user submits Notify When Available. Fields: name, email, vehicle, match_score, key quiz answers, submitted_at.

Access submissions: Netlify Dashboard → Site → Forms.  
Set up email notifications: Forms → `drivematch-notify` → Form notifications → Add email notification.

**These forms do not work on localhost.** This is expected.

---

## Pages

All pages in `pages/` share the same nav and footer injected by `injectShell()` from `app.js`. Each page loads `../js/app.js` and `../css/style.css` with `../` relative paths.

| Page | File | Key behaviour |
|---|---|---|
| Homepage | `index.html` | Hero → trust bar → pain section → result area → 4-step how-it-works teaser |
| Reviews | `pages/reviews.html` | Loads reviews from API, filter by star rating, paginate, submit new review |
| Blog listing | `pages/blog.html` | Loads posts from API, filter by category |
| Blog post | `pages/post.html` | Reads `?slug=` URL param, fetches post, renders markdown-like content |
| About | `pages/about.html` | Static content |
| How it works | `pages/how-it-works.html` | Steps + FAQ `<details>` accordion |

---

## Common Patterns

### Adding a new page
1. Create `pages/newpage.html`
2. Include `<link rel="stylesheet" href="../css/style.css" />`
3. Include `<script src="../js/app.js"></script>` at end of body
4. `injectShell()` will automatically inject nav and footer
5. Add the page to the nav links array inside `injectShell()` in `app.js`

### Adding a vehicle to the database
Edit `data/vehicles.json`. Copy an existing vehicle object, update all fields, ensure the JSON is valid (jsonlint.com). The `_instructions` section at the top of the file lists all valid field values.

### Modifying quiz questions
Edit the `OB_STEPS` array in `app.js`. Each step has: `id` (maps to quiz data field), `eyebrow`, `question`, `sub`, `type` (`pills` or `text`), `options` (array of `{label, icon}` for pills). If adding a new field ID, also add it to `obFinish()` where `quizData` is assembled, and update `netlify/functions/match.js` if the field should affect pre-filtering.

### Modifying the matching logic
`netlify/functions/match.js` — `preFilter()` for hard constraints, `buildPriorityTags()` for soft preference scoring, `buildPrompt()` for the Claude instruction. When changing the JSON response format Claude returns, update both the prompt template and `showResult()` in `app.js`.

### Changing the low match threshold
In `app.js`, find `showResult()`. The threshold is checked at `if (r.matchScore < 70)`. The very low threshold is `isVeryLow = r.matchScore < 50`. Both are hardcoded — change these numbers to adjust behaviour.

### TEST_MODE
Top of `app.js`: `const TEST_MODE = false;`  
Set to `true` to use mock data for all API calls — no Claude credits consumed, no Netlify function needed, works from `file://` without a server. Mock data returns three preset matches: Golf (default), RAV4 Hybrid (family), Kia EV6 (electric).

---

## Business Rules & Constraints

- **No finance facilitation** — DriveMatch must never display monthly payment estimates, refer users to lenders, or earn commission on finance products. This would require FCA authorisation.
- **No inventory display** — DriveMatch tells users what car to buy. It never tells them a specific car is available at a specific location. Jayden personally sources the car after the lead is captured.
- **UK only** — All prices in GBP, all vehicles UK-spec, all guidance UK-relevant (MOT, V5C, HPI, AA/RAC inspection).
- **Independent** — No commercial relationship with any manufacturer or dealer at MVP stage. No sponsored recommendations.
- **Free for users** — The matching service is always free. Revenue is only on the backend (commission from dealers when a deal closes).

---

## Deployment to Netlify

### Live Site
- **Production URL:** https://drivematch-700.netlify.app
- **Netlify project:** `drivematch-700`
- **Admin dashboard:** https://app.netlify.com/projects/drivematch-700
- **Function logs:** https://app.netlify.com/projects/drivematch-700/logs/functions

The site is linked locally — run `netlify deploy --prod` from the project root to push updates.

```bash
# Deploy to production
netlify deploy --prod
```

After deploying:
1. Environment variables are already set in the Netlify dashboard
2. `ANTHROPIC_API_KEY` is configured (required — do not remove)
3. `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NOTIFICATION_EMAIL` are not set (email notifications not in use at MVP)

The `netlify.toml` configuration:
```toml
[build]
  publish = "."
  functions = "netlify/functions"

[[redirects]]
  from = "/api/match"
  to = "/.netlify/functions/match"
  status = 200
```

---

## Known Issues & Notes

- **`loaderInterval` and `loaderStep`** must be declared at the top of the onboarding section in `app.js` — they were previously in the old quiz config block. If they go missing, `startLoaderSteps()` throws a ReferenceError and the loader hangs.
- **Navigation from `pages/` subdirectory** requires the `inPages` path detection in `injectShell()`. If this logic is removed or broken, all nav links will 404 when navigating from any `pages/*.html` file.
- **Vehicle modal matching** uses partial name matching (`findVehicleByName`) — if Claude returns an alternative with a slightly different name than what's in `vehicles.json`, the modal will still open but show a "not in database" message rather than crashing.
- **Netlify Forms on localhost** — will silently fail. This is correct and expected. The `netlifySubmitMatch` and `netlifySubmitNotify` functions are wrapped in try/catch and failures are intentionally silent.
- **`resetQuiz()`** is defined twice in `app.js` — once in the onboarding section and once as a legacy stub. The second definition (lower in the file) overrides the first. The effective implementation is the second one which re-opens the onboarding overlay.
- **Pain section scroll animation** — `.pain-quote` elements start at `opacity:0; transform:translateY(36px)` and get an `in-view` class added by an IntersectionObserver defined in an inline `<script>` tag at the bottom of `index.html` (after `app.js`). The observer fires at `threshold: 0.4` and disconnects after triggering so quotes stay visible. No stagger delay — the generous per-quote padding ensures natural one-at-a-time reveals.
- **How it works grid** — the homepage teaser uses `.how-steps` which is `repeat(4, 1fr)` on desktop (4 steps), `repeat(2, 1fr)` at 900px, and `1fr` at 640px. The `pages/how-it-works.html` page has its own separate steps layout and is unaffected.

---

## Contact & Context

- **Project owner:** Jayden
- **Business type:** Solo operator, UK small business
- **Target customers:** UK car buyers — all segments from new drivers (under £5,000 budget) to premium buyers (over £100,000)
- **Philosophy:** Build lean. No unnecessary infrastructure. Everything should work as plain files where possible. Scale up only when volume justifies it.
