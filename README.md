# Coy - Discover Tab 

A mobile-first, swipe-based discovery feature built alongside Coy's existing experience using React, Node.js, and Express.

## Features Implemented
- **Swipe Experience:** Smooth card drag gestures on mobile and action buttons on desktop.
- **Privacy-First Matching:** Likes remain completely hidden until a mutual match occurs ("It's a match!" screen).
- **Persistent State:** Swipes and matches are stored in a JSON database (`backend/data/db.json`) and persist across page reloads.
- **Seeded Data:** Pre-loaded with 30 diverse profiles, including profiles that have already liked the current user for demo purposes.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Lucide Icons, Axios
- **Backend:** Node.js, Express, CORS, File-based JSON storage

## How to Run Locally

### 1. Start the Backend Server
```bash
cd backend
npm install
npm run dev

### 2. Start the Frontend App
Open a new terminal window:

```bash
cd frontend
npm install
npm run dev

Open http://localhost:5173 in your browser.

---------------------------------------------------------

