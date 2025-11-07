# Demo Flow - African Nations League

## Setup Instructions

### 1. Seed 7 Teams
First, seed 7 demo teams through the admin panel or API:

**Admin Panel:**
- Navigate to `/admin`
- Click "Seed 7 Demo Teams"
- Wait for confirmation

**OR via API:**
```bash
POST http://your-backend-url/api/tournaments/seed
```

**Response:**
```json
{
  "message": "7 teams seeded successfully. Register one more team to reach 8 teams.",
  "teams": [...],
  "teamsCount": 7
}
```

**Teams Created:**
1. Egypt
2. Nigeria
3. Senegal
4. Morocco
5. South Africa
6. Ghana
7. Cameroon

---

### 2. Register 8th Team (Live Demo)
Now demonstrate the team registration process:

**Steps:**
1. Navigate to `/register-team`
2. Fill in the form:
   - **Country:** Select "Tunisia" (or any other African country not yet registered)
   - **Federation Representative:** "Omar Ben Ali"
   - **Team Manager:** "Jalel Kadri"
   - **Contact Email:** "tunisia@afcon.com"
3. Click "Register Federation & Auto-Generate Squad"
4. **Show the audience:**
   - 23 auto-generated players
   - Position distribution (3 GK, 8 DF, 7 MD, 5 AT)
   - Player ratings (50-100 for natural position, 0-50 for non-natural)
   - Captain designation (marked with "C")
   - Team overall rating
5. System redirects to success page after 5 seconds

---

### 3. Start Tournament
Once you have 8 teams registered:

**Admin Panel:**
- Go to `/admin`
- Click "Start Tournament"
- Tournament creates quarter-final matches

**OR via API:**
```bash
POST http://your-backend-url/api/tournaments/start
```

---

### 4. View Tournament Features

#### Tournament Bracket (`/tournament`)
- Shows tournament structure
- Quarter-finals → Semi-finals → Final
- Real-time updates as matches complete

#### Leaderboard (`/leaderboard`)
- Team standings (Played, Won, Lost, Goals For/Against, Goal Difference)
- Recent match results
- Auto-refreshes every 5 seconds

#### Goal Scorers Leaderboard (`/goal-scorers`)
- Top scorers with goals count
- **Search:** Filter by player or team name
- **Filter by Team:** Dropdown to filter specific team
- **Sort:** By goals (default) or player name alphabetically
- Shows minutes when goals were scored
- Statistics: Total goals, number of scorers, top scorer, average goals/player
- Medals for top 3 scorers (🥇🥈🥉)
- Auto-refreshes every 10 seconds

---

## Demo Script

### Part 1: Team Registration (5 minutes)
1. **Show empty/7 teams state**
   - "We have 7 teams already registered"
   
2. **Navigate to registration page**
   - "Let's register the 8th team - Tunisia"
   
3. **Fill form while explaining**
   - "Federation representative provides their details"
   - "Manager name for the team"
   - "Contact email for notifications"
   
4. **Submit and highlight features**
   - "System auto-generates 23 players"
   - "Each player has ratings for all 4 positions"
   - "50-100 rating for natural position"
   - "0-50 rating for non-natural positions"
   - "Captain automatically assigned"
   - "Team rating calculated as average"

### Part 2: Tournament Start (2 minutes)
1. **Go to admin panel**
   - "Now we have 8 teams, we can start the tournament"
   
2. **Click Start Tournament**
   - "Creates quarter-final matches"
   - "Tournament bracket generated"

### Part 3: Match Simulation (3 minutes)
1. **Show tournament bracket**
   - "Quarter-finals ready to play"
   
2. **Simulate matches**
   - "Admin can simulate or play matches"
   - "Played matches show AI commentary"
   - "Simulated matches show final result only"

### Part 4: Leaderboards (5 minutes)
1. **Team Leaderboard**
   - "Live standings"
   - "Updates automatically"
   - "Shows team performance"
   
2. **Goal Scorers Leaderboard**
   - "Top scorers in the tournament"
   - **Demonstrate search:** Type player name
   - **Demonstrate filter:** Select team from dropdown
   - **Demonstrate sort:** Toggle between goals and name
   - "Shows when goals were scored"
   - "Real-time statistics"
   - "Top 3 get medals"

---

## Key Features to Highlight

### ✅ Completed Features
1. **Player Squad System**
   - 23 players per team
   - 4 positions (GK, DF, MD, AT)
   - Smart rating system
   - Captain designation

2. **Auto-Generation**
   - African player names
   - Automatic rating assignment
   - Position distribution (3-8-7-5)

3. **Team Registration**
   - Clean, intuitive form
   - Real-time validation
   - Squad preview on registration
   - Email capture for notifications

4. **Goal Scorers Leaderboard**
   - Search functionality
   - Team filtering
   - Sort options
   - Real-time statistics
   - Visual medals for top 3

5. **Tournament Management**
   - Quarter-finals → Semi-finals → Final
   - Match simulation
   - Real-time bracket updates

---

## API Endpoints Reference

### Teams
- `GET /api/teams` - Get all teams
- `POST /api/teams` - Register new team
- `GET /api/teams/:id` - Get team with squad
- `DELETE /api/teams` - Clear all teams

### Tournament
- `POST /api/tournaments/seed` - Seed 7 demo teams
- `POST /api/tournaments/start` - Start tournament
- `GET /api/tournaments/active` - Get active tournament
- `POST /api/tournaments/reset` - Reset tournament

### Matches
- `GET /api/matches` - Get all matches
- `POST /api/matches/:id/simulate` - Simulate match
- `POST /api/matches/:id/play` - Play match with AI

### Goal Scorers
- `GET /api/goal-scorers` - Get goal scorers leaderboard

---

## Troubleshooting

### "Exactly 8 teams required"
- Check team count: `GET /api/teams`
- If > 8: Clear teams and reseed
- If < 8: Register missing teams

### Tournament won't start
- Ensure no active tournament exists
- Reset if needed: `POST /api/tournaments/reset`
- Check all teams have squads

### Players not showing
- Verify team has `autoGenerate: true` in request
- Check MongoDB connection
- Review server logs

---

## Next Steps (Not Yet Implemented)

1. **Match Play-by-Play Commentary**
   - AI-generated commentary for "played" matches
   - Show key moments until winner emerges

2. **Email Notifications**
   - Notify representatives when match completes
   - Include scoreline, goal scorers, match link

3. **Tournament Reset**
   - Admin can restart from quarter-finals
   - Archive previous tournament data

4. **Analytics Dashboard**
   - Team performance metrics
   - Player statistics
   - Historical data

5. **Authentication**
   - 3 roles: Admin, Representative, Visitor
   - JWT token system

6. **Public Match Pages**
   - Match detail pages for all users
   - Play-by-play for played matches
   - Team lineups and goal scorers
