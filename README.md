# Async Race — SPA

**Checklist: 400 / 400 pts** · **Deployed UI:** https://async-race-zeta.vercel.app/

Configure the API in production with `VITE_API_BASE_URL` (see `.env.example`). Reviewers run the [async-race-api](https://github.com/mikhama/async-race-api) mock server locally or on their network while testing the UI.

---

## Self-check checklist

### UI Deployment

- [x] **Deployment platform:** UI deployed on **Vercel** (allowed alternative to GitHub Pages, Netlify, Cloudflare Pages, or similar).

### Requirements to commits and repository

- [x] **Commit guidelines compliance:** Commits use clear, descriptive messages that reflect the changes (e.g. conventional style such as `feat:`, `fix:`, `docs:`). *Tip: if an early commit is only `init`, you can `git rebase -i --root` and reword it to `chore: initial commit` for a fully consistent history.*
- [x] **Checklist in README.md:** This checklist is included; implemented items are marked.
- [x] **Score calculation:** Total **400 / 400** for the sections below (excluding reviewer-only code quality). Sum: 80 + 90 + 50 + 170 + 10 = **400**.
- [x] **UI deployment link:** See the URL at the very top of this file, next to the score.

### Basic Structure (80 points)

- [x] **Two Views (10 points):** Garage and Winners.
- [x] **Garage view content (30 points):** View title; car create/update panel; race control panel; garage section with cars.
- [x] **Winners view content (10 points):** “Winners” title; winners table; pagination.
- [x] **Persistent state (30 points):** Garage and winners page indices, form/sort state preserved when switching views (Redux).

### Garage View (90 points)

- [x] **Car CRUD (20 points):** Create, update, delete cars (name + color). Empty / too-long names handled. Delete removes the car from winners as well.
- [x] **Color selection (10 points):** Color picker; car icon uses the selected color.
- [x] **Random cars (20 points):** Button creates 100 cars per click; name from two random parts (≥10 options each); random hex color.
- [x] **Car management controls (10 points):** Per-car select, remove, engine start (A), engine stop (B).
- [x] **Pagination (10 points):** Garage pagination — **7** cars per page.
- [x] **Extra — empty garage (10 points):** Friendly empty state when there are no cars.
- [x] **Extra — empty page (10 points):** Deleting the last car on a page moves to the previous page.

### Winners View (50 points)

- [x] **Display winners (15 points):** Cars that win appear in the Winners table.
- [x] **Pagination (10 points):** **10** winners per page.
- [x] **Winners table (15 points):** Columns №, car image, name, wins, best time (seconds); upsert increments wins and keeps best time only when improved.
- [x] **Sorting (10 points):** Sort by wins or best time, ascending or descending via API query params (full dataset sorted server-side, paginated responses).

### Race (170 points)

- [x] **Start engine / animation (20 points):** Start waits for engine `started`, animates using duration from distance/velocity, then `drive`. **500** from API stops animation via recovery.
- [x] **Stop engine / animation (20 points):** Stop waits for engine `stopped`, car returns to the start position.
- [x] **Responsive animation (30 points):** Animations work on viewports down to **500px** width.
- [x] **Start race (10 points):** Starts the race for **all cars on the current garage page**.
- [x] **Reset race (15 points):** Returns all cars on the page to their starting positions.
- [x] **Winner announcement (5 points):** Banner shows the winning car’s name after the batch race.
- [x] **Button states (20 points):** Start engine disabled while driving / inappropriate states; stop disabled at initial position / while starting; aligned with spec.
- [x] **Actions during race (50 points):** During a running page race, garage mutations and pagination are locked for predictable behavior; reset remains available; navigation between views still works.

### Prettier and ESLint (10 points)

- [x] **Prettier (5 points):** `npm run format` (write), `npm run ci:format` (check).
- [x] **ESLint (5 points):** Airbnb (+ TypeScript), `npm run lint`, aligned with strict `tsconfig`.

### 🌟 Overall code quality (100 points)

_Skipped during self-check — awarded by the reviewer (modularity, function size, readability, etc.)._

---

## Evaluation notes (from task)

- **Candidate:** Deploy the UI (e.g. Vercel, Netlify, GitHub Pages) and put the link in the README with the score.
- **Reviewer:** Clone and run the [async-race-api](https://github.com/mikhama/async-race-api) server during review; evaluate functional and non-functional requirements.
- Repeated start/stop or race/reset leading to **404** / **429** from the mock API is **not** treated as an app bug per task FAQ.

---

## Scripts

| Script              | Description                                      |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Local dev server                                 |
| `npm run build`     | Production build                                 |
| `npm run lint`      | ESLint (Airbnb + TypeScript)                     |
| `npm run format`    | Prettier write                                   |
| `npm run ci:format` | Prettier check                                   |

## Stack

- React 19 + TypeScript (strict)
- Redux Toolkit
- `fetch` API modules (garage / engine / winners)

## Local development

1. Clone and run [async-race-api](https://github.com/mikhama/async-race-api): `npm install && npm start` (default `http://127.0.0.1:3000`).
2. This app: `npm install && npm run dev`.
3. Optional: copy `.env.example` to `.env` and set `VITE_API_BASE_URL` if the API is not on `localhost:3000`.

## Deploy (Vercel)

- Import the **Git** repo; framework **Vite**; build `npm run build`; output **`dist`**.
- Set **`VITE_API_BASE_URL`** in the project environment to a reachable API URL when the deployed app cannot use localhost.

## Resources

- **Mock server:** [async-race-api](https://github.com/mikhama/async-race-api) (unmodified for evaluation).
