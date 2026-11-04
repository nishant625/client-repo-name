# Altera To-Do — Client App

React + Vite + Tailwind CSS responsive web app for Altera task management.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment (optional for local, required for production):
   ```env
   # .env
   VITE_API_URL=https://your-backend-api.onrender.com
   ```
   *In local development, omitting `VITE_API_URL` automatically proxies `/api` calls to `http://localhost:5000`.*

3. Run locally:
   ```bash
   npm run dev
   ```

## Deploying to Netlify

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**: Set `VITE_API_URL` to your live Render backend URL.
