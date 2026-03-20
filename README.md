# Phonts Team README

Deployed Site:
https://comp-4170-project.vercel.app/

# Project Description

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

## How to run the application locally

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

3. **Set up the database** (see "Database" below).
   If you don't have PostgreSQL yet, you can still run the app and view the page/
   The health check will fail and when you click "generate" it will return an error message.

5. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set `DATABASE_URL` to your PostgreSQL connection string.

6. **Start the server**:
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

## Team Contributions

### Sarah - Front-End UI & Interaction Design

Sarah was responsible for the core user interface and interactive features of the application. She designed and implemented the live preview system, including the style controls (font size, weight, and color) that dynamically update the DOM in real time. She also developed the editable text modal, allowing users to customize preview content for more realistic typography testing. Overall, her work focused on creating a responsive and intuitive user experience through direct frontend state updates without page reloads.


### Esteban - Front-End Logic & Client-Side Interaction

Esteban implemented the main frontend logic for generating and updating font combinations. He handled the integration between the UI and backend API, including sending requests to /api/random-combination and updating the preview with returned data. He also developed the font lock system, enabling users to preserve selected fonts while regenerating others. Additionally, he implemented dynamic Google Fonts loading by updating the <link> element, ensuring fonts are fetched and rendered correctly in real time.


### Emma - Database Design & Data Modeling

Emma designed and implemented the PostgreSQL database structure. She created and normalized the schema by separating data into fonts and font_combinations tables, using primary keys and foreign keys to maintain data integrity. She also added constraints (such as uniqueness) to prevent duplicate entries and ensure consistency. Emma was responsible for populating the database with curated font combinations and ensuring the data structure was scalable and efficient for retrieval.


### Kayla - Backend Development & API Integration

Kayla developed the backend using Node.js and Express, connecting the frontend to the PostgreSQL database. She implemented the API endpoint /api/random-combination, which queries the database to retrieve a random font combination using SQL joins. She ensured the server returns clean JSON responses that the frontend can immediately use. Kayla also handled database connection setup and optimized backend logic to keep the system simple, efficient, and responsive.
