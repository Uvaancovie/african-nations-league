// From Firebase Realtime Database Data Model
export interface Federation {
    id: string;
    country: string;
    repUserId: string;
    managerName: string;
    email: string;
}

export interface Team {
    id?: string;
    _id?: string;
    name: string;
    country: string;
    repName: string;
    repEmail: string;
    confederation: 'CAF' | 'CONCACAF' | 'CONMEBOL' | 'UEFA' | 'AFC' | 'OFC';
    rating?: number;
    isSeeded?: boolean;
    isEliminated?: boolean;
    createdAt?: number;
    // Legacy fields (kept for compatibility)
    countryCode?: string;
    captainPlayerId?: string;
    repUserId?: string;
    tournamentActive?: boolean;
}

export type PlayerPosition = "GK" | "DF" | "MD" | "AT";

export interface Player {
    id: string;
    teamId: string;
    name: string;
    naturalPos: PlayerPosition;
    natRating: number; // 50-100
    altRatings: {
        GK: number;
        DF: number;
        MD: number;
        AT: number;
    };
}

export interface Tournament {
    id?: string;
    _id?: string;
    name?: string;
    stage?: 'quarter_finals' | 'semi_finals' | 'final';
    status: "setup" | "pending" | "active" | "completed" | "QF" | "SF" | "F" | "done";
    createdBy?: string;
    createdAt?: number;
    currentMatchIndex?: number;
    startedAt?: number;
}

export interface Match {
    id?: string;
    _id?: string;
    tournamentId?: string;
    round?: "QF" | "SF" | "F";
    stage?: 'quarter_finals' | 'semi_finals' | 'final';
    matchNumber?: number;
    teamAId?: string;
    teamBId?: string;
    teamA?: string | Team; // Can be team name string or Team object
    teamB?: string | Team; // Can be team name string or Team object
    scoreA?: number | null;
    scoreB?: number | null;
    scorers?: Array<{ playerId: string; minute: number; playerName?: string }>;
    mode?: "play" | "simulate" | null;
    commentary?: string | string[] | null;
    endedAt?: number | null;
    status?: 'pending' | 'in_progress' | 'completed';
    winnerId?: string | null;
    winner?: string;
    createdAt?: number;
    completedAt?: number;
}

export interface Leaderboard {
    id: string; // tournamentId
    goalsByPlayer: Array<{ playerId: string; playerName: string; teamId: string; goals: number }>;
    goalsByTeam: Array<{ teamId: string; teamName: string; goals: number }>;
}

export interface AuditLog {
    id: string;
    actorUid: string;
    action: string;
    at: number; // Unix timestamp
    details?: Record<string, any>;
}

// Analytics and Historical Data
export interface TournamentArchive {
    id: string; // tournamentId
    winnerId: string;
    winnerName: string;
    finalistId: string;
    finalistName: string;
    completedAt: number; // Unix timestamp
    teamStats: Array<{
        teamId: string;
        teamName: string;
        repUserId: string;
        matchesPlayed: number;
        wins: number;
        losses: number;
        goalsFor: number;
        goalsAgainst: number;
        placement: 'Winner' | 'Finalist' | 'Semi-Finalist' | 'Quarter-Finalist';
    }>;
    topScorers: Array<{
        playerId: string;
        playerName: string;
        teamId: string;
        teamName: string;
        goals: number;
    }>;
}

export interface TeamAnalytics {
    teamId: string;
    repUserId: string;
    totalTournaments: number;
    wins: number;
    finals: number;
    semiFinals: number;
    totalMatches: number;
    matchesWon: number;
    totalGoalsFor: number;
    totalGoalsAgainst: number;
    winRate: number;
    bestFinish: 'Winner' | 'Finalist' | 'Semi-Finalist' | 'Quarter-Finalist' | null;
    topScorer?: { playerName: string; goals: number; tournamentId: string };
}