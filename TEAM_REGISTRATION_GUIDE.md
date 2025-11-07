# Team Registration System - Complete Guide

## Overview
The African Nations League uses a voluntary registration system where African countries can join the tournament through their federation representatives.

## Features Implemented ✅

### 1. Federation Registration
- Representatives select their African country
- Provide federation representative name
- Provide team manager name
- Provide contact email
- Submit to register

### 2. Automatic Squad Generation
When a team registers, the system automatically:
- Creates a squad of **23 players**
- Assigns positions with proper distribution:
  - 3 Goalkeepers (GK)
  - 8 Defenders (DF)
  - 7 Midfielders (MD)
  - 5 Attackers (AT)
- Generates African player names
- Assigns unique jersey numbers (1-99)
- Designates a captain (first midfielder)

### 3. Player Rating System
Each player receives ratings for all 4 positions:
- **Natural Position**: 50-100 rating
- **Non-natural Positions**: 0-50 rating

**Example:**
- A natural Goalkeeper (GK):
  - GK: 75 (natural position)
  - DF: 32 (non-natural)
  - MD: 18 (non-natural)
  - AT: 5 (non-natural)

### 4. Team Rating Calculation
- Team rating = Average of all player ratings across all positions
- Displayed on team registration success
- Used for tournament seeding

## Registration Flow

1. **Navigate to Registration**
   - Go to `/register-team`
   - Fill out the registration form

2. **Form Fields**
   - Country (dropdown of African nations)
   - Federation Representative Name
   - Team Manager Name
   - Contact Email

3. **Submit**
   - Click "Register Federation & Auto-Generate Squad"
   - System creates team and generates 23-player squad
   - Squad is displayed with all player details

4. **Squad Display**
   - Shows all 23 players sorted by position
   - Displays jersey numbers, names, positions
   - Shows captain badge (C)
   - Shows all 4 position ratings for each player
   - Highlights natural position in green
   - Shows overall team rating

5. **Confirmation**
   - Redirects to success page after 5 seconds
   - Email confirmation sent to representative

## Demo Instructions

### For Demo: Prepare 7 Pre-registered Teams
```bash
# Use the API to create 7 teams before demo:
POST /api/teams
{
  "country": "Nigeria",
  "repName": "John Okocha",
  "repEmail": "nigeria@caf.com",
  "managerName": "Austin Eguavoen",
  "autoGenerate": true
}

# Repeat for: Egypt, Senegal, Morocco, Algeria, Ghana, Cameroon
```

### For Demo: Register 8th Team Live
1. Open `/register-team`
2. Select "Ivory Coast" (or any remaining country)
3. Enter representative name: "Didier Drogba"
4. Enter manager name: "Emerse Faé"
5. Enter email: "ivorycoast@caf.com"
6. Click Submit
7. Show the auto-generated 23-player squad
8. Point out:
   - Captain designation
   - Position distribution (3-8-7-5)
   - Rating system (50-100 vs 0-50)
   - Team overall rating

## API Endpoints

### Register Team
```
POST /api/teams
Content-Type: application/json

{
  "country": "string",
  "repName": "string",
  "repEmail": "string",
  "managerName": "string",
  "autoGenerate": true
}

Response:
{
  "team": {
    "_id": "string",
    "country": "string",
    "managerName": "string",
    "rating": number
  },
  "squad": [
    {
      "name": "string",
      "naturalPosition": "GK|DF|MD|AT",
      "jerseyNumber": number,
      "isCaptain": boolean,
      "ratings": {
        "GK": number,
        "DF": number,
        "MD": number,
        "AT": number
      }
    }
  ]
}
```

### Get All Teams
```
GET /api/teams
```

### Get Team with Squad
```
GET /api/teams/:id
```

### Get Team Squad
```
GET /api/teams/:id/squad
```

## Technical Implementation

### Backend (Node.js/Express/MongoDB)
- **Models:**
  - `Team.ts`: Stores team/federation info
  - `Player.ts`: Stores player info with ratings
  
- **Services:**
  - `playerGenerator.ts`: Auto-generates African player names and squads
  
- **Routes:**
  - `teams.ts`: Handles team registration and CRUD

### Frontend (Next.js/React)
- **Pages:**
  - `/app/(reps)/register-team/page.tsx`: Registration page
  - `/app/(reps)/register-team/success/page.tsx`: Success page
  
- **Components:**
  - `TeamRegistrationForm.tsx`: Main registration form with squad display

## Next Steps

After registration system is complete, the next features to implement:

1. ✅ Player Squad System
2. ✅ Federation Registration
3. ⏳ Match Play-by-Play Commentary (AI-generated)
4. ⏳ Email Notifications
5. ✅ Goal Scorers Leaderboard
6. ⏳ Tournament Reset (Admin)
7. ⏳ Analytics Dashboard
8. ⏳ Tournament Archive
9. ⏳ Authentication & Roles
10. ⏳ Public Match Pages
