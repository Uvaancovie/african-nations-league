# 🔑 How to Get a Valid Gemini API Key

## The Problem
Your current API key (`AIzaSyB9lj7CRtvM50JUh1YYlw_AaVuVeXp69dM`) is either:
- Invalid/expired
- For an older API version (v1beta models not available)
- Doesn't have the right permissions

## Solution: Get a NEW API Key

### Step 1: Go to Google AI Studio
Visit: **https://aistudio.google.com/app/apikey**

### Step 2: Create API Key
1. Click **"Create API Key"**
2. Select **"Create API key in new project"** (or use existing project)
3. Copy the new API key

### Step 3: Update Your .env Files

**Local (.env):**
```bash
cd D:\african-nations-league-simulator\server
```

Edit `.env` file:
```
GEMINI_API_KEY=YOUR_NEW_KEY_HERE
```

**Render (Production):**
1. Go to https://dashboard.render.com/
2. Select your `afcon-backend` service
3. Go to **Environment** tab
4. Update `GEMINI_API_KEY` with your new key
5. Click **Save Changes**
6. Service will auto-redeploy

### Step 4: Restart Local Server
```powershell
# Stop current server (Ctrl+C)
npm run dev
```

---

## Alternative: Disable AI Commentary Temporarily

If you want to continue without fixing the API key right now, the system will automatically use fallback commentary like:

```
"Egypt 2 - 1 Nigeria. Winner: Egypt"
```

This is already working in your matches!

---

## Verify New Key Works

After getting a new key, test it:

```powershell
cd D:\african-nations-league-simulator\server
npx ts-node test-gemini.ts
```

You should see:
```
✅ SUCCESS with model: gemini-pro
Response: Hello! ...
```

---

## Important Notes

1. **Free Tier Limits:**
   - 60 requests per minute
   - 1,500 requests per day
   - Should be plenty for your tournament

2. **API Key Security:**
   - Never commit `.env` to GitHub (already in .gitignore)
   - Keep API keys private
   - Regenerate if exposed

3. **Current Behavior:**
   - Matches still complete successfully
   - Scores and winners are calculated
   - Only AI commentary fails
   - Fallback commentary is used instead

---

## Quick Fix Commands

```powershell
# 1. Get new key from https://aistudio.google.com/app/apikey

# 2. Update local .env
cd D:\african-nations-league-simulator\server
notepad .env
# Replace GEMINI_API_KEY value

# 3. Update Render environment variable
# Go to Render dashboard → afcon-backend → Environment

# 4. Restart local dev server
npm run dev

# 5. Test
npx ts-node test-gemini.ts
```

---

**The matches are working fine! The AI commentary is just a nice-to-have feature. Your tournament simulations are completing successfully with fallback commentary.** ✅
