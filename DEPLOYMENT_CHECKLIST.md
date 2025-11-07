# 🚀 Deployment Checklist

## ✅ Pre-Deployment Steps

### 1. Environment Variables
- [x] `.env.local` configured with Firebase credentials
- [x] Gemini API key added
- [ ] Verify all `NEXT_PUBLIC_*` variables are correct
- [ ] Add production URL to `NEXT_PUBLIC_APP_URL`

### 2. Firebase Setup
- [ ] Deploy Firestore security rules: `firebase deploy --only firestore:rules`
- [ ] Create Firestore indexes (if prompted in console)
- [ ] Enable Firebase Authentication
- [ ] Set up custom claims for admin/rep roles

### 3. Code Verification
- [x] Analytics types defined
- [x] Server actions created
- [x] Pages created (`/analytics`, `/history`)
- [x] Components built
- [x] Navigation added
- [ ] Run `npm run build` to check for errors

---

## 🔧 Firebase Configuration

### Deploy Security Rules
```bash
firebase deploy --only firestore:rules
```

### Create Admin User
```javascript
// Run in Firebase Functions or Admin SDK
const admin = require('firebase-admin');
admin.initializeApp();

admin.auth().setCustomUserClaims('USER_UID_HERE', { 
  roles: ['admin'] 
});
```

### Create Rep User
```javascript
admin.auth().setCustomUserClaims('REP_UID_HERE', { 
  roles: ['rep'] 
});
```

---

## 📦 Install & Build

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Test production build
npm start
```

---

## 🌐 Vercel Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Add analytics and tournament history features"
git push origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (your Vercel domain)
4. Click Deploy

---

## 🧪 Testing Checklist

### Basic Functionality
- [ ] Home page loads
- [ ] Navigation bar works on all pages
- [ ] Tournament page displays
- [ ] Leaderboard shows data

### New Features
- [ ] Complete a tournament (QF → SF → F)
- [ ] Admin resets tournament successfully
- [ ] Tournament appears in `/history`
- [ ] Winner and finalist displayed correctly
- [ ] Team stats show accurate data
- [ ] Top scorers list populated
- [ ] Rep can view `/analytics` page
- [ ] Analytics shows correct win rate
- [ ] Best finish displays properly
- [ ] Top scorer highlighted

### Edge Cases
- [ ] `/history` empty state shows message
- [ ] `/analytics` with no data shows empty state
- [ ] Navigation active state works
- [ ] Mobile responsive design works
- [ ] Dark mode colors display correctly

---

## 🔐 Security Verification

- [ ] Firestore rules deployed
- [ ] Public can read archives
- [ ] Only admins can create archives
- [ ] Archives are immutable
- [ ] Reps can only access their analytics
- [ ] Test with different user roles

---

## 📊 Data Verification

### After First Tournament:
1. Complete tournament
2. Reset tournament (archives automatically)
3. Check Firestore console for `tournamentArchives` collection
4. Verify document contains:
   - `winnerId` and `winnerName`
   - `finalistId` and `finalistName`
   - `teamStats` array with all teams
   - `topScorers` array with players
   - `completedAt` timestamp

---

## 🎯 Feature Checklist

### Analytics Dashboard (`/analytics`)
- [ ] Win rate calculation correct
- [ ] Goals for/against accurate
- [ ] Best finish displayed
- [ ] Top scorer shown (if exists)
- [ ] Empty state for new users

### Tournament History (`/history`)
- [ ] Champions wall displays all winners
- [ ] Tournament dates formatted correctly
- [ ] Final standings show winner and finalist
- [ ] Top scorers table populated
- [ ] Team performance table sortable
- [ ] Placement badges color-coded

### Auto-Archiving
- [ ] `resetTournament()` calls `archiveTournament()`
- [ ] Archive created before data cleared
- [ ] Only completed tournaments archived
- [ ] Error handling for archive failures

---

## 🐛 Common Issues

### "Cannot find module 'firebase/firestore'"
**Solution**: The lint errors are expected. Run `npm install` to resolve.

### "Permission denied" on Firestore
**Solution**: Deploy security rules with `firebase deploy --only firestore:rules`

### Archives not showing
**Solution**: Ensure tournament status is 'done' before reset

### Analytics empty
**Solution**: Complete and reset at least one tournament first

---

## 📱 Mobile Testing

- [ ] Navigation collapses to icons only
- [ ] Analytics cards stack vertically
- [ ] History page scrollable
- [ ] Tables responsive
- [ ] Touch targets adequate size

---

## 🔗 Important URLs

After deployment, verify these routes work:
- `/` - Home
- `/tournament` - Tournament bracket
- `/leaderboard` - Top scorers
- `/analytics` - Rep analytics
- `/history` - Tournament history
- `/admin` - Admin panel

---

## 📝 Post-Deployment

### Monitor
- [ ] Check Vercel deployment logs
- [ ] Monitor Firebase usage
- [ ] Test with real users
- [ ] Collect feedback

### Optional Enhancements
- [ ] Add charts/graphs to analytics
- [ ] Email notifications for new archives
- [ ] Export analytics as PDF
- [ ] Advanced filtering on history page
- [ ] Comparison between tournaments

---

## ✅ Final Verification

Run through complete flow:
1. ✅ Register 8 teams
2. ✅ Start tournament as admin
3. ✅ Play/simulate all QF matches
4. ✅ System auto-advances to SF
5. ✅ Complete SF matches
6. ✅ Complete Final
7. ✅ Reset tournament (archives automatically)
8. ✅ Check `/history` - tournament visible
9. ✅ Check `/analytics` - stats updated
10. ✅ Start new tournament - system clean

---

## 🎉 Ready to Launch!

Once all checkboxes are complete:
- 🚀 Deploy to Vercel
- 📧 Notify stakeholders
- 📊 Share `/history` page with users
- 🏆 Celebrate first archived tournament!

---

**Need Help?** Check `ANALYTICS_GUIDE.md` and `IMPLEMENTATION_SUMMARY.md`
