# Font Pairing App

A simple Coolors-style tool for exploring font combinations. Sidebar controls let you lock header, subheader, or body and randomize the rest.

## Tech stack

- HTML, CSS, JavaScript
- Node.js, Express, EJS
- PostgreSQL

## Push this project to GitHub

1. On [GitHub](https://github.com/new), create a **new repository** (e.g. `font-pairing-app`). Do **not** add a README or .gitignore (this project already has them).
2. In the project folder, add the remote and push:
   ```bash
   cd font-pairing-app
   git remote add origin https://github.com/YOUR_USERNAME/font-pairing-app.git
   git push -u origin main
   ```
3. Share the repo URL with your team. Update the clone URL in the section below once the repo exists.

## For team members: clone and run

1. **Clone the repo** (replace with your actual repo URL):
   ```bash
   git clone https://github.com/YOUR_USERNAME/font-pairing-app.git
   cd font-pairing-app
   ```

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

## Tasks by team member

- **Part 1 (Foundation)**: Project setup, Express + EJS layout (sidebar + header/subheader/body), PostgreSQL table and connection, README and run instructions.
