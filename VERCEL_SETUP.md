# 🚀 Vercel Environment Variable Setup

## Required Environment Variable

Add this environment variable in your Vercel project settings:

### Go to: https://vercel.com/Uvaancovie/african-nations-league/settings/environment-variables

**Variable Name:**
```
NEXT_PUBLIC_API_URL
```

**Value:**
```
https://afcon-backend.onrender.com/api
```

**Environments:** 
- ✅ Production
- ✅ Preview
- ✅ Development

---

## Steps to Add:

1. Go to your Vercel project: https://vercel.com/Uvaancovie/african-nations-league
2. Click **Settings** tab
3. Click **Environment Variables** in the left sidebar
4. Add the variable:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://afcon-backend.onrender.com/api`
   - Select all environments (Production, Preview, Development)
5. Click **Save**
6. Go to **Deployments** tab
7. Click the **...** menu on the latest deployment
8. Click **Redeploy**

---

## After Redeployment:

Your frontend at https://african-nations-league-ten.vercel.app/ will now connect to your backend at https://afcon-backend.onrender.com 🎉

Test by:
1. Going to `/admin`
2. Clicking "Seed 8 Teams"
3. Clicking "Start Tournament"
4. Clicking "Simulate QUARTER FINALS"

---

## Troubleshooting

**Still seeing localhost errors?**
- Make sure you redeployed AFTER adding the environment variable
- Check browser console for the actual API URL being used
- Verify backend is running: https://afcon-backend.onrender.com/api/teams

**Backend not responding?**
- Render free tier sleeps after 15 mins. First request takes ~30 seconds to wake up
- Check Render logs for errors

**CORS errors?**
- Backend needs to allow your Vercel domain
- Will fix if this occurs
