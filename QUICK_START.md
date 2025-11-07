# ⚡ Quick Start - Firebase Realtime Database

## 🎯 Installation (Choose One Method)

### Method 1: PowerShell Script (Recommended)
```powershell
# Close VS Code completely first!
# Run PowerShell as Administrator
cd d:\african-nations-league-simulator
.\install.ps1
```

### Method 2: Manual Installation
```powershell
# Close VS Code and all terminals first!
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install --legacy-peer-deps
```

---

## 🚀 Run Development Server

```powershell
npm run dev
```

Visit: `http://localhost:3000`

---

## 🔥 Firebase Realtime Database URL

```
https://soccer-9d636-default-rtdb.firebaseio.com
```

**Already configured in `.env.local`** ✅

---

## ✨ What's New

1. ✅ **Firebase Realtime Database** instead of Firestore
2. ✅ **Team Performance Analytics** - Track wins, goals, placements
3. ✅ **Tournament History** - Past winners and finalists
4. ✅ **Auto-Archiving** - Tournament data saved on reset
5. ✅ **Navigation Bar** - Easy access to all pages
6. ✅ **AI Commentary** - Integrated with Gemini

---

## 📄 New Pages

| Route | Description |
|-------|-------------|
| `/analytics` | Team performance dashboard (for reps) |
| `/history` | Tournament archives with winners/stats |

---

## 🧪 Quick Test

```powershell
# 1. Start dev server
npm run dev

# 2. Open browser
http://localhost:3000

# 3. Seed teams (creates data in RTDB)
# 4. Start tournament
# 5. Complete matches
# 6. Check Firebase Console > Realtime Database
```

---

## 📚 Documentation

- `RTDB_MIGRATION_GUIDE.md` - Full migration details
- `ANALYTICS_GUIDE.md` - Analytics features guide
- `DEPLOYMENT_CHECKLIST.md` - Production deployment
- `QUICK_REFERENCE.md` - Quick command reference

---

## 🐛 Common Issues

**"Cannot find module 'firebase/database'"**
→ Run `npm install --legacy-peer-deps`

**"EPERM: operation not permitted"**
→ Close VS Code completely, run PowerShell as Admin

**No data in Firebase Console**
→ Enable Realtime Database in Firebase Console first

---

## 🎉 Ready!

Everything is configured and ready to use with Firebase Realtime Database. Just run:

```powershell
npm run dev
```

**Enjoy building your African Nations League Simulator!** ⚽🏆
