# Deployment Guide for TrustMaid

## Overview
This guide covers deploying TrustMaid to GitHub, Render (backend), and Vercel (frontend).

---

## Step 1: Push to GitHub

### 1.1 Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create repository: `trustmaid` (or your preferred name)
3. **Do NOT** initialize with README, .gitignore, or license (we have them already)

### 1.2 Add Remote and Push
```bash
cd C:\Users\saura\OneDrive\Desktop\TrustMaid
git remote add origin https://github.com/YOUR_USERNAME/trustmaid.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 2: Deploy Backend to Render

### 2.1 Connect Render to GitHub
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Select the `trustmaid` repository

### 2.2 Configure Backend Service
- **Name**: `trustmaid-backend`
- **Environment**: `Node`
- **Build Command**: `cd server && npm install`
- **Start Command**: `cd server && node server.js`
- **Plan**: Free (or Paid for better performance)

### 2.3 Set Environment Variables
In Render dashboard, add these environment variables for the backend:

```
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=trustmaid
JWT_SECRET=your_jwt_secret_key
PORT=5000
EMAIL_SERVICE=gmail
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=TrustMaid <your_gmail@gmail.com>
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 2.4 Database Setup
For production, use:
- **MySQL on AWS RDS** or
- **Render PostgreSQL** (if you want to migrate from MySQL)

Update `DB_HOST`, `DB_USER`, `DB_PASSWORD` accordingly.

### 2.5 Deploy
Click **"Deploy"** and wait for the backend to go live.  
**Note the public URL** (e.g., `https://trustmaid-backend.onrender.com`)

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Connect Vercel to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import the `trustmaid` GitHub repository

### 3.2 Configure Frontend
- **Framework Preset**: `Vite`
- **Build Command**: `cd client && npm run build`
- **Output Directory**: `client/dist`

### 3.3 Set Environment Variables
In Vercel project settings, add:

```
VITE_API_URL=https://trustmaid-backend.onrender.com/api
```

Replace with your actual Render backend URL.

### 3.4 Deploy
Click **"Deploy"** and Vercel will automatically build and deploy.

---

## Step 4: Update Frontend API Configuration

Update your `client/src/services/api.js` to use the environment variable:

```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

---

## Step 5: Verify Deployments

### Check Backend
```
curl https://trustmaid-backend.onrender.com/api/
```

### Check Frontend
Visit the Vercel URL provided after deployment.

---

## Troubleshooting

### Backend Won't Start
- Check Render logs: **Dashboard** → **Select Service** → **Logs**
- Verify all environment variables are set
- Ensure MySQL database is accessible from Render

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is correct in Vercel env vars
- Check CORS settings in `server/server.js`:
  ```javascript
  const cors = require('cors');
  app.use(cors({
    origin: 'https://your-vercel-domain.vercel.app',
    credentials: true
  }));
  ```

### Email Not Sending
- Use Gmail **App Password** (not regular password)
- Generated from: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- Set `EMAIL_USER` and `EMAIL_PASS` in Render env vars

---

## Maintenance

### Pull Requests & Auto-Deploy
Both Render and Vercel automatically redeploy on push to `main` branch.

### Database Migrations
If you update database models:
1. Update `server/models/` files
2. Push to GitHub
3. Render automatically runs migrations on deploy

---

## Production Checklist

- [ ] GitHub repository created and pushed
- [ ] Render backend deployed with all env vars
- [ ] Vercel frontend deployed with API URL updated
- [ ] MySQL database configured and accessible
- [ ] Email credentials working (test send)
- [ ] Domain names configured (optional)
- [ ] SSL certificates active (automatic on Vercel/Render)
- [ ] Monitoring and logging enabled

---

## Questions?

Refer to:
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Documentation](https://docs.github.com)
