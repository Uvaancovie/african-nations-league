# 🎯 Quick Setup - Connect Frontend to Backend

## ✅ Step-by-Step Guide

### 1. Add Environment Variable to Vercel

Go to: **https://vercel.com/Uvaancovie/african-nations-league/settings/environment-variables**

Click **"Add New"** and enter:

```
Name:  NEXT_PUBLIC_API_URL
Value: https://afcon-backend.onrender.com/api
```

Select: ✅ Production ✅ Preview ✅ Development

Click **Save**

---

### 2. Redeploy Your Frontend

1. Go to: **https://vercel.com/Uvaancovie/african-nations-league**
2. Click **Deployments** tab
3. Find the latest deployment
4. Click **⋯** (three dots) → **Redeploy**
5. Confirm redeploy

**Wait 2-3 minutes for deployment to complete**

---

### 3. Test Your App

Visit: **https://african-nations-league-ten.vercel.app/**

#### Test Flow:
1. Click **"Admin Panel"** (or go to `/admin`)
2. Click **"Seed 8 Teams (Demo)"** 
   - Wait ~30 seconds (Render waking up from sleep)
   - Should see success message
3. Click **"Start Tournament"**
   - Redirects to `/tournament`
   - Shows 4 quarter-final matches
4. Click **"Simulate QUARTER FINALS"**
   - All matches complete with scores
   - 2 semi-final matches appear
5. Click **"Simulate SEMI FINALS"**
   - Matches complete
   - Final match appears
6. Click **"Simulate FINAL"**
   - Winner is crowned! 🏆

---

## 🔍 Troubleshooting

### "Failed to fetch" errors?

**Backend is sleeping (Render free tier)**
- First request takes 30-60 seconds to wake up
- Just wait and try again

**Check backend is running:**
- Open: https://afcon-backend.onrender.com/api/teams
- Should see `[]` or team data (not an error page)

### Still seeing localhost errors?

1. Open browser console (F12)
2. Look for API calls
3. Verify they're going to `afcon-backend.onrender.com` (not `localhost`)
4. If still localhost → redeploy didn't work, add env var again

### CORS errors?

Backend has CORS enabled, but if you see errors:
- Check Render logs for backend errors
- Verify environment variables are set in Render

---

## 📱 Your Live URLs

**Frontend:** https://african-nations-league-ten.vercel.app/  
**Backend:** https://afcon-backend.onrender.com/api  

**GitHub Repos:**
- Frontend: https://github.com/Uvaancovie/african-nations-league
- Backend: https://github.com/Uvaancovie/afcon-backend

---

## 🎉 Done!

Once you add the environment variable and redeploy, your app will be fully live and working! 

The backend will auto-deploy from GitHub pushes.  
The frontend will auto-deploy from GitHub pushes.

Happy simulating! ⚽🏆
