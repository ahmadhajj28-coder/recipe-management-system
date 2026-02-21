# Recipe Management System (RMS)

A fully featured, production-ready Recipe Management System built as a single React JSX application.

## Design

- **Aesthetic:** Warm editorial — high-end food magazine meets modern SaaS
- **Colors:** Deep cream (#FAF7F2), warm espresso (#2C1810), saffron (#E8930A), sage green (#6B8F71), soft terracotta (#C4704F)
- **Typography:** Playfair Display (headings) + DM Sans (body) via Google Fonts
- **Features:** Card-based layout, sticky nav, modals, dark/light mode, responsive (mobile bottom nav, desktop sidebar)

## Run the app

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. http://localhost:5173).

## Features

- **Recipe CRUD** — Add, edit, delete, duplicate recipes with full fields (title, description, category, cuisine, difficulty, times, servings, calories, ingredients, steps, tags, image, rating, notes, favorite)
- **Search & filter** — Fuzzy search; filter by category, cuisine, difficulty, favorites; sort by newest, oldest, rating, prep time, name, calories; recent search history
- **Meal planner** — 7-day grid (Mon–Sun), assign recipes to Breakfast/Lunch/Dinner/Snack, auto-generate, clear day/all, weekly summary
- **Grocery list** — Auto-generated from meal plan, grouped by category, check off items, add custom items, copy list
- **Collections** — Create collections, add/remove recipes, cover art, view collection as filtered recipe list
- **Recipe detail** — Hero image, scalable servings, ingredient checklist, steps, rating, notes, related recipes, share (copy text), print, export JSON/Markdown, cooking mode
- **Cooking mode** — Fullscreen step-by-step with optional per-step countdown timer
- **Dashboard** — Recipe of the day, stats (recipes, favorites, planned, collections), recently added, top rated, category quick filters
- **Import/Export** — Export single recipe as JSON or Markdown; export all as JSON backup; import from file or paste JSON (Settings)
- **Settings** — Dark/light mode, default servings, grid/list view
- **UI/UX** — Toasts, confirm dialogs for delete, keyboard shortcuts (/ to focus search, Esc to close modals), empty states, accessible labels

## Tech

- React 18 (useState, useReducer, useEffect, useMemo, useCallback, useRef)
- Tailwind CSS + custom theme (cream, espresso, saffron, sage, terracotta)
- Lucide React icons
- Vite
- In-memory state (no localStorage)

## Sample data

The app ships with 14 diverse recipes (Italian, Indian, American, Mexican, Middle Eastern, Thai, French, Greek, Japanese, etc.) across Breakfast, Lunch, Dinner, Snack, and Dessert.
