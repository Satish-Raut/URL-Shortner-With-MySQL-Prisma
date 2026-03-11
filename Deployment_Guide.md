# Professional Deployment Guide (Free Hosting)

This guide explains how to take your **URL Shortener** project from your local computer to the internet for free.

## 1. Core Deployment Concepts

### A. Client-Server Architecture
In production, your **Frontend** (React) and **Backend** (Node.js) will live on different servers.
- **Frontend:** A static "Build" (HTML/JS/CSS) served via a CDN (like Vercel).
- **Backend:** A running process that listens for requests (like Render).

### B. Environment Variables (`.env`)
**Never upload your passwords to GitHub.** In production:
1. You exclude `.env` from your Git repository (using `.gitignore`).
2. You manually "inject" these variables into the dashboard of Render or Vercel.

### C. CORS (Cross-Origin Resource Sharing)
By default, browsers block websites from talking to servers on different domains. 
- **Local:** `localhost:5173` talks to `localhost:3000`.
- **Production:** `my-frontend.vercel.app` must be "allowed" to talk to `my-backend.onrender.com`.

---

## 2. Step-by-Step Deployment Strategy

### Phase 1: The Database (Aiven or Clever Cloud)
Since Render doesn't offer a permanent free MySQL database, use **Aiven** or **Clever Cloud**.

1. **Sign up**: Go to [Aiven.io](https://aiven.io/) or [Clever-Cloud.com](https://www.clever-cloud.com/).
2. **Create MySQL Instance**: Choose the "Free" tier.
3. **Get Credentials**: You will receive a Host, User, Password, Port, and Database Name.
4. **Update your local .env**: Test your app locally with the cloud database to ensure it connects.

### Phase 2: The Backend (Render)
1. **GitHub**: Push your `Backend` folder to a GitHub repository.
2. **Render Dashboard**:
   - New -> **Web Service**.
   - Connect your Repo.
   - **Root Directory**: `Backend`.
   - **Build Command**: `npm install`.
   - **Start Command**: `node app.js`.
3. **Internal Environment Variables**:
   - Go to the **Environment** tab on Render.
   - Add all your values from `.env` (DB_HOST, DB_USER, etc.).
   - **IMPORTANT**: Set `PORT` to `10000` (Render's default).

### Phase 3: The Frontend (Vercel)
1. **GitHub**: Push your `Frontend` folder to the same (or different) repo.
2. **Vercel Dashboard**:
   - Import Project -> Choose your repo.
   - **Root Directory**: `Frontend`.
   - **Framework Preset**: `Vite`.
3. **Environment Variables**:
   - Add any variables your frontend needs (like your Backend API URL).
4. **Deploy**: Click Deploy!

---

## 3. Required Code Adjustments

Before deploying, we need to make your code "ready" for the cloud.

### A. Dynamic CORS in `app.js`
Modify your `Backend/app.js` to allow your *real* frontend URL:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
```

### B. Frontend API URL
In your React code (e.g., `UrlCards.jsx`), don't hardcode `localhost:3000`. Use an environment variable:
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const res = await axios.get(`${API_URL}/urlshortner`);
```

---

## 4. Troubleshooting
- **White Screen?** Check the Browser Console (F12) for CORS errors.
- **500 Error?** Check the Render logs to see if the database connection failed.
- **Port Error?** Ensure you are using `process.env.PORT` in your `app.listen()` code.
