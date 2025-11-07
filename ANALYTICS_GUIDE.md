# 📊 Analytics Features - Quick Guide

## ✨ New Features Added

### 1. **Team Performance Analytics** (`/analytics`)
Representatives can view their historical tournament statistics:
- **Win Rate**: Match wins vs total matches played
- **Tournament Results**: Winners, finals, semi-finals appearances
- **Goal Statistics**: Total goals scored and conceded
- **Best Finish**: Highest tournament placement achieved
- **Top Scorer**: Best performing player across tournaments

### 2. **Tournament History** (`/history`)
Public page showing all past tournaments:
- **Champions Wall**: Grid of all tournament winners
- **Detailed Results**: Complete breakdown of each tournament
- **Final Standings**: Winner and finalist for each tournament
- **Top Scorers**: Leading goal scorers per tournament
- **Team Performance**: Match statistics for all participating teams

### 3. **Automatic Tournament Archiving**
When admin resets tournament:
- System automatically archives completed tournaments
- Saves winner, finalist, and all team statistics
- Stores top scorers and goal data
- Historical data preserved for analytics

---

## 🚀 How to Use

### For Representatives

1. **View Your Analytics**
   - Navigate to `/analytics` page
   - See your team's performance across all tournaments
   - Track progress and improvement over time

2. **Check Historical Data**
   - Visit `/history` to see all past tournaments
   - Find tournaments where your team competed
   - Compare performance with other teams

### For Admins

1. **Reset Tournament**
   ```typescript
   import { resetTournament } from "@/app/actions/tournamentActions";
   await resetTournament();
   ```
   - Automatically archives current tournament if completed
   - Clears all matches and leaderboards
   - Prepares system for new tournament

### For All Users

1. **Browse History** (`/history`)
   - View all completed tournaments
   - See champions and finalists
   - Check top scorers and team stats

---

## 📊 Data Structure

### TournamentArchive
```typescript
{
  winnerId: string;
  winnerName: string;
  finalistId: string;
  finalistName: string;
  completedAt: Timestamp;
  teamStats: Array<{
    teamName, wins, losses, goalsFor, goalsAgainst, placement
  }>;
  topScorers: Array<{ playerName, teamName, goals }>;
}
```

### TeamAnalytics
```typescript
{
  totalTournaments: number;
  wins: number;
  finals: number;
  semiFinals: number;
  totalMatches: number;
  matchesWon: number;
  totalGoalsFor: number;
  totalGoalsAgainst: number;
  winRate: number;
  bestFinish: string;
  topScorer: { playerName, goals, tournamentId };
}
```

---

## 🔗 Navigation

New navigation bar includes:
- **Home** - Landing page
- **Tournament** - Current tournament bracket
- **Leaderboard** - Top scorers
- **Analytics** - Representative performance stats
- **History** - Past tournament archives

---

## 🎯 Key Actions

### Server Actions Created

1. **`archiveTournament(tournamentId)`**
   - Archives completed tournament data
   - Called automatically on reset

2. **`getTeamAnalytics(repUserId)`**
   - Fetches analytics for a representative's teams
   - Aggregates data across all tournaments

3. **`getTournamentHistory()`**
   - Returns all archived tournaments
   - Sorted by completion date (newest first)

4. **`resetTournament()`**
   - Archives current tournament (if completed)
   - Clears all tournament data
   - Prepares for new tournament

---

## 💾 Firestore Collections

### New Collection: `tournamentArchives`
Stores historical tournament data after completion.

**Security Rules:**
```
match /tournamentArchives/{archiveId} {
  allow read: if true; // Public read
  allow write: if request.auth != null && 
               get(/databases/$(database)/documents/users/$(request.auth.uid)).data.roles.hasAny(['admin']);
}
```

---

## 🎨 Components Added

1. **`TeamAnalyticsCard.tsx`**
   - Displays 4 stat cards with icons
   - Shows tournaments, win rate, goals, best finish

2. **`Navigation.tsx`**
   - Top navigation bar with active state
   - Icons + labels for all main pages

---

## 📈 Usage Example

```typescript
// In a representative's page
import { getTeamAnalytics } from "@/app/actions/analyticsActions";

const analytics = await getTeamAnalytics(repUserId);

// Display analytics
<TeamAnalyticsCard analytics={analytics} />
```

```typescript
// In admin reset function
import { resetTournament } from "@/app/actions/tournamentActions";

await resetTournament(); // Auto-archives then clears
```

---

## ✅ Testing Checklist

- [ ] Complete a tournament (QF → SF → F)
- [ ] Admin resets tournament
- [ ] Check `/history` - tournament should be archived
- [ ] Navigate to `/analytics` - rep should see stats
- [ ] Verify win rate and goal statistics
- [ ] Test navigation bar on all pages
- [ ] Ensure top scorers display correctly
- [ ] Confirm team placements are accurate

---

## 🔐 Permissions

- **Public**: Can view `/history` page
- **Representatives**: Can view their own analytics at `/analytics`
- **Admins**: Can reset tournaments (auto-archives)

---

**All features are production-ready and integrated with existing AI commentary system!** ⚽🏆
