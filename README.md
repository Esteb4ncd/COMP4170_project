https://comp-4170-project.vercel.app/

# Font Pairing App

A simple Coolors-style tool for exploring font combinations. Sidebar controls let you lock header, subheader, or body and randomize the rest.

## Tech stack

- HTML, CSS, JavaScript
- Node.js, Express, EJS
- PostgreSQL

## Repository

**https://github.com/Esteb4ncd/COMP4170_project**

To add this as remote and push (from the project folder):
```bash
git remote add origin git@github.com:Esteb4ncd/COMP4170_project.git
git push -u origin main
```

## For team members: clone and run

1. **Clone the repo**:
   ```bash
   git clone git@github.com:Esteb4ncd/COMP4170_project.git
   cd COMP4170_project
   ```
   (If you don't use SSH, use: `git clone https://github.com/Esteb4ncd/COMP4170_project.git`)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database** (see "Database" below). If you don't have PostgreSQL yet, you can still run the app and view the page; only the health check will fail.

4. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set `DATABASE_URL` to your PostgreSQL connection string.

5. **Start the server**:
   ```bash
   npm start
   ```
   Open **http://localhost:3000**.

## Database

- Create a PostgreSQL database (e.g. `font_pairing_db`), or use a free host like [ElephantSQL](https://www.elephantsql.com/).
- Create the table by running the SQL in `db/schema.sql` (in your DB client or ElephantSQL’s SQL tab).
- Put the connection URL in `.env` as `DATABASE_URL`.

## API

- `GET /` – Main page (sidebar + preview).
- `GET /api/health` – Checks that the app can connect to the database.
- `GET /api/random-combination` – Returns `{ header, subheader, body }` (three random font names). No database.

---

## Tasks by team member

### Person 1 (done)

- Project setup: `package.json`, dependencies (Express, EJS, pg, dotenv), `npm start`.
- Express server: `server.js`, EJS views, static files from `public/`, route `GET /`.
- Layout: one page with sidebar (left) and preview area (right) showing Heading, Subheading, Body.
- CSS: layout and styling in `public/css/style.css`.
- PostgreSQL: connection in code (`pg` + `DATABASE_URL`), table defined in `db/schema.sql`, route `GET /api/health` to test DB.
- Font list and random API: in-memory list of Google Fonts, route `GET /api/random-combination` (no DB).
- Sidebar and “Fetch fonts”: button, lock checkboxes for Header/Subheader/Body, font names in sidebar; JS in `public/js/main.js` to fetch, respect locks, and apply fonts to preview (Google Fonts loaded dynamically).
- README, `.env.example`, `.gitignore`, Git repo.

---

### Person 2: Save combination

- **Backend:** Add `POST /api/combinations`. Use `express.json()` middleware so you can read `req.body`. Expect `{ header, subheader, body }` (font names). Validate; insert one row into `font_combinations` (header_font, subheader_font, body_font). Return 201 or success message.
- **Front-end:** Add a “Save combination” button in the sidebar. In `main.js`, on click send a POST to `/api/combinations` with the current `fonts.header`, `fonts.subheader`, `fonts.body`. Show “Saved” or an error message.

---

### Person 3: List saved combinations

- **Backend:** Add `GET /api/combinations` (or a page like `GET /saved`). Query `font_combinations` (e.g. `ORDER BY created_at DESC`), return JSON or pass the list to an EJS view.
- **Front-end:** Add a way to see saved combos: e.g. a “Saved” link → new page/section that lists them. For each row show the three font names; optionally render a short preview (same three fonts) by loading them via Google Fonts. Optional: “Use this” button to apply a saved combo to the main preview.

---

### Person 4: Database setup, errors, polish, README

- **Database setup:** In README, add clear steps: create DB (e.g. ElephantSQL), run `db/schema.sql`, set `DATABASE_URL` in `.env`.
- **Error handling:** If DB is missing or down, handle gracefully (e.g. `/api/health` or startup message). For `POST /api/combinations`, return 400 if body is invalid; for list endpoint, return 500 with a generic message if the query fails.
- **Polish:** Responsive layout (sidebar stacks or collapses on small screens). Basic accessibility (labels, focus states). Optional: loading state when clicking “Fetch fonts” or “Save”.
- **README:** Update “Tasks by team member” with each person’s name when done. Ensure “How to run locally” is complete (clone, install, DB, `.env`, `npm start`). Optional: add “Deploy to Render” steps.
