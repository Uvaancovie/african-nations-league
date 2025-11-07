# 🚀 Deployment Guide

## Backend Deployment (Render)

### 1. Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account and select: `Uvaancovie/afcon-backend`

### 2. Render Configuration

**Service Name:** `afcon-backend` (or your preferred name)

**Root Directory:** *(leave blank)*

**Environment:** `Node`

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

### 3. Environment Variables

Add these in Render's **Environment** tab:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://uvaancovenden:way2flymillionaire@2nd.aq0pult.mongodb.net/african-nations-league` |
| `GEMINI_API_KEY` | `AIzaSyB9lj7CRtvM50JUh1YYlw_AaVuVeXp69dM` |
| `NODE_ENV` | `production` |

### 4. Deploy

- Click **"Create Web Service"**
- Wait for deployment (5-10 minutes)
- Copy your backend URL: `https://afcon-backend.onrender.com` (or similar)

---

## Frontend Deployment (Vercel)

### 1. Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import: `Uvaancovie/african-nations-league`

### 2. Vercel Configuration

**Framework Preset:** `Next.js`

**Root Directory:** *(leave as is - root)*

**Build Command:** *(auto-detected)*

**Output Directory:** *(auto-detected)*

### 3. Environment Variables

Add this in Vercel's **Environment Variables** section:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://YOUR-BACKEND-URL.onrender.com/api` |

**Important:** Replace `YOUR-BACKEND-URL` with your actual Render backend URL!

### 4. Deploy

- Click **"Deploy"**
- Wait for deployment (2-3 minutes)
- Your app will be live at: `https://african-nations-league.vercel.app`

---

## Post-Deployment

### Test Your Deployment

1. Visit your Vercel URL
2. Go to `/admin` page
3. Click **"Seed 8 Teams (Demo)"**
4. Click **"Start Tournament"**
5. Click **"Simulate QUARTER FINALS"**
6. Watch the magic happen! ✨

### Update API URL Locally

After deploying, update your local `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
```

---

## Troubleshooting

### Backend Issues

**Build fails?**
- Check that `package.json` exists in root of backend repo
- Verify `tsconfig.json` has correct `rootDir: "./"`

**MongoDB connection fails?**
- Verify `MONGODB_URI` environment variable is set correctly
- Check MongoDB Atlas allows connections from all IPs (0.0.0.0/0)

**Gemini API errors?**
- Verify `GEMINI_API_KEY` environment variable is set
- Check API key is valid in Google AI Studio

### Frontend Issues

**API calls fail?**
- Verify `NEXT_PUBLIC_API_URL` points to your Render backend
- Check backend is deployed and running
- Open browser console to see exact error

**Build fails?**
- Check `package.json` has all dependencies
- Run `npm install` locally and commit `package-lock.json`

---

## Repository Links

- **Backend:** https://github.com/Uvaancovie/afcon-backend
- **Frontend:** https://github.com/Uvaancovie/african-nations-league

---

## ⚠️ Important Notes

1. **Render Free Tier:** Backend sleeps after 15 mins of inactivity. First request after sleep takes ~30 seconds.
2. **MongoDB:** Keep connection string secure. Consider using environment variables for production.
3. **Gemini API:** Monitor your usage to avoid hitting quota limits.

---

## 🎉 You're Live!

Your African Nations League simulator is now deployed and accessible worldwide!

**Live URLs:**
- Frontend: `https://YOUR-APP.vercel.app`
- Backend: `https://YOUR-BACKEND.onrender.com`

Enjoy! ⚽🏆
