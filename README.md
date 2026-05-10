# Async Race — SPA

**Estimated self-check score: 310 / 400** (excludes the reviewer-only “Overall code quality” 100 pts).  
**Live demo:** _Add your deployed URL after publishing (e.g. GitHub Pages / Netlify / Vercel)._  
Configure the API base in production with `VITE_API_BASE_URL` (see `.env.example`). The interviewer runs the [async-race-api](https://github.com/mikhama/async-race-api) backend locally or on their network.

## Scripts

| Script        | Description                                      |
| ------------- | ------------------------------------------------ |
| `npm run dev` | Local dev server                                 |
| `npm run build` | Production build                             |
| `npm run lint`  | ESLint (Airbnb + TypeScript, max 40 lines/func) |
| `npm run format` | Prettier write                                |
| `npm run ci:format` | Prettier check                             |

## Stack

- React 19 + TypeScript (strict, `noImplicitAny`)
- Redux Toolkit
- `fetch` API client split by resource (garage / engine / winners)
- CSS layout responsive down to **500px** width

---

## Checklist (self-check) — **310 / 400** estimated

> **You must** deploy the frontend and replace the placeholder link above, then bump the score (+50).  
> Use [Conventional Commits](https://www.conventionalcommits.org/) for all commits (+10).

### 🚀 UI Deployment — **0 / 50** _(pending your deploy)_

- [ ] Deployment Platform: UI on GitHub Pages, Netlify, Vercel, Cloudflare Pages, or similar.

### ✅ Repository / process — **0 / 20** _(partial)_

- [ ] Commit guidelines compliance (Conventional Commits — verify on your branch).
- [x] Checklist included in README.md
- [x] Score calculation in README.md
- [ ] UI deployment link in README.md (replace placeholder at top when live)

### Basic Structure — **80 / 80**

- [x] Two Views: Garage & Winners
- [x] Garage: title, create/update panel, race panel, garage section, pagination (7/page)
- [x] Winners: title, table, pagination (10/page)
- [x] Persistent UI state (pages, forms, winners sort) in Redux when switching views

### Garage View — **90 / 90**

- [x] CRUD cars (name + color), validation (empty / max length), delete removes winner too
- [x] Color picker; icon uses selected color
- [x] Create 100 random cars (two random parts ≥10 each, random hex color)
- [x] Per-car select / delete / A / B controls
- [x] Garage pagination (7 per page)
- [x] **Extra:** friendly empty state
- [x] **Extra:** after deleting last car on a page, load jumps to previous page

### Winners View — **50 / 50**

- [x] Winners appear after a race win is recorded
- [x] Pagination (10 per page)
- [x] Columns: №, car image, name, wins, best time (seconds); upsert updates wins & best time
- [x] Sorting by wins or best time, ASC/DESC via API query params (`_sort`, `_order`)

### Race — **170 / 170**

- [x] A: start → await engine `started` → animate with duration from `distance`/`velocity` → `drive`; **500** stops animation / resets via recovery path
- [x] B: stop → await `stopped` → animate back to start
- [x] Animations fluid at small widths (track + layout from ~500px)
- [x] Race starts all cars on **current page**
- [x] Reset returns all on page to start (stops engines + clears motion)
- [x] Winner banner with car name on batch race completion
- [x] A disabled while starting/racing/finished-at-line; B disabled at initial/start phase as required
- [x] During batch race / busy track: garage mutations & pagination locked (predictable behavior); reset stays available; navigation between views still works

### Prettier & ESLint — **10 / 10**

- [x] Prettier scripts: `format`, `ci:format`
- [x] ESLint + Airbnb (+ TypeScript), `lint` script, aligned with strict TS

### 🌟 Overall code quality — **skipped (reviewer / 100)**

---

## Local development

1. Clone and run [async-race-api](https://github.com/mikhama/async-race-api) (`npm install && npm start` → default `http://127.0.0.1:3000`).
2. This app: `npm install && npm run dev`.
3. Optional: copy `.env.example` to `.env` and set `VITE_API_BASE_URL` if the API is not on localhost:3000.

## Deploy notes

- Set `VITE_API_BASE_URL` in the host’s environment to point at the reviewer’s API when applicable.
- For GitHub Pages subdirectory hosting, set `base` in `vite.config.ts` to your repo path and rebuild.
