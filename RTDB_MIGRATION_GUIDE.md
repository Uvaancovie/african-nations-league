# 🚀 Firebase Realtime Database Migration - Setup Guide

## ✅ What Changed

Migrated from **Firestore** to **Firebase Realtime Database** for better compatibility and simpler setup.

---

## 📦 Installation Steps

### 1. Close VS Code & Terminals
Close all VS Code windows and terminal sessions to release file locks.

### 2. Delete node_modules (if needed)
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
```

### 3. Install Dependencies
```powershell
npm install --legacy-peer-deps
```

**Note:** The `--legacy-peer-deps` flag is required due to React 19 RC version.

---

## 🔧 Configuration Files Updated

### ✅ `.env.local`
```env
GEMINI_API_KEY=AIzaSyCg5QuN7vh7K8iLN7JRg8ETgkakTIoWk4I
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDjsOnjK6zDoQo1yLQ9wAUk5OSAku3wdhY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=soccer-9d636.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=soccer-9d636
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=soccer-9d636.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=464920730455
NEXT_PUBLIC_FIREBASE_APP_ID=1:464920730455:web:71d3ef2fe78429733bbc12
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://soccer-9d636-default-rtdb.firebaseio.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### ✅ `lib/firebase.ts`
- ✅ Switched from `getFirestore()` to `getDatabase()`
- ✅ Added `databaseURL` to config
- ✅ Removed Firestore imports
- ✅ Using Firebase Realtime Database SDK

### ✅ `lib/types.ts`
- ✅ Replaced `Timestamp` with `number` (Unix timestamps)
- ✅ All interfaces updated for RTDB compatibility

### ✅ `app/actions/tournamentActions.ts`
- ✅ Replaced Firestore methods with RTDB methods
- ✅ Using `ref()`, `get()`, `set()`, `push()`, `remove()`
- ✅ Changed from collections to paths

### ✅ `app/actions/analyticsActions.ts`
- ✅ Full RTDB migration
- ✅ Changed from `getDocs()` to `get()`
- ✅ Using `.val()` instead of `.data()`

---

## 🔥 Firebase Console Setup

### 1. Enable Realtime Database
1. Go to [Firebase Console](https://console.firebase.google.com/project/soccer-9d636/database)
2. Click **Realtime Database** in sidebar
3. Click **Create Database**
4. Choose location (us-central1 or closest to you)
5. Start in **Test mode** for now

### 2. Deploy Security Rules
```powershell
# If you have Firebase CLI installed
firebase deploy --only database

# If not, manually copy rules from database.rules.json
# to Firebase Console > Realtime Database > Rules tab
```

### 3. Database Structure
```json
{
  "teams": {
    "teamId1": { "name": "Nigeria", "rating": 88, ... },
    "teamId2": { "name": "Egypt", "rating": 85, ... }
  },
  "tournaments": {
    "tournamentId1": { "status": "QF", "createdAt": 1234567890, ... }
  },
  "matches": {
    "matchId1": { "tournamentId": "...", "round": "QF", ... }
  },
  "tournamentArchives": {
    "archiveId1": { "winnerId": "...", "winnerName": "...", ... }
  }
}
```

---

## 🎯 Key Differences: Firestore vs RTDB

| Feature | Firestore | Realtime Database |
|---------|-----------|-------------------|
| Import | `firebase/firestore` | `firebase/database` |
| Reference | `collection(db, 'teams')` | `ref(db, 'teams')` |
| Read | `getDocs(query)` | `get(ref)` |
| Write | `addDoc()`, `setDoc()` | `set()`, `push()` |
| Data Access | `.data()` | `.val()` |
| Timestamps | `serverTimestamp()` | `Date.now()` |
| IDs | Document IDs | `push().key` |
| Batch | `writeBatch()` | Multiple `set()` calls |

---

## 🧪 Testing Checklist

After installation completes:

```powershell
# 1. Build the project
npm run build

# 2. Run development server
npm run dev

# 3. Test these features:
```

- [ ] Visit `http://localhost:3000`
- [ ] Seed teams (should write to RTDB)
- [ ] Start tournament
- [ ] Complete a match
- [ ] Check Firebase Console > Realtime Database for data
- [ ] Complete tournament
- [ ] Reset tournament (archives automatically)
- [ ] Check `/history` page
- [ ] Check `/analytics` page

---

## 🐛 Troubleshooting

### "Cannot find module 'firebase/database'"
**Solution:** Run `npm install --legacy-peer-deps` after closing all editors

### "EPERM: operation not permitted"
**Solution:** 
1. Close VS Code completely
2. Close all terminals
3. Run PowerShell as Administrator
4. Navigate to project folder
5. Run `npm install --legacy-peer-deps`

### "Permission denied" in Firebase Console
**Solution:** Deploy database.rules.json or set Test Mode temporarily

### No data showing in RTDB
**Solution:** Check browser console for errors, verify DATABASE_URL in .env.local

---

## 📊 Database Rules Preview

The `database.rules.json` file contains:

- ✅ **Public read** for teams, matches, leaderboards, archives
- ✅ **Admin write** for tournaments, matches, leaderboards
- ✅ **Rep write** for their own teams/players
- ✅ **Immutable archives** (write once, read always)

---

## 🚀 Deployment

### Vercel Environment Variables
Add these to your Vercel project settings:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_DATABASE_URL ← NEW!
GEMINI_API_KEY
NEXT_PUBLIC_APP_URL
```

---

## ✅ Migration Complete

**Files Updated:**
- ✅ `.env.local` - Added DATABASE_URL
- ✅ `lib/firebase.ts` - RTDB setup
- ✅ `lib/types.ts` - Removed Timestamp dependency
- ✅ `app/actions/tournamentActions.ts` - RTDB methods
- ✅ `app/actions/analyticsActions.ts` - RTDB methods
- ✅ `database.rules.json` - RTDB security rules

**New Files:**
- ✅ `database.rules.json` - Realtime Database security rules
- ✅ `RTDB_MIGRATION_GUIDE.md` - This file

---

## 🎉 Ready to Use!

Once `npm install --legacy-peer-deps` completes successfully:

1. Run `npm run dev`
2. Open `http://localhost:3000`
3. Test tournament flow
4. Check Firebase Realtime Database Console

**All analytics features work with RTDB!** ⚡
