'use client';

import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MatchResult {
    _id: string;
    teamA: string;
    teamB: string;
    scoreA: number;
    scoreB: number;
    winner?: string;
    status: string;
    stage: string;
    commentary?: string;
}

interface TeamStats {
    team: string;
    played: number;
    won: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
}

export default function LeaderboardPage() {
    const [matches, setMatches] = useState<MatchResult[]>([]);
    const [teamStats, setTeamStats] = useState<TeamStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        // Auto-refresh every 5 seconds
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            // Fetch all completed matches
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches`);
            const allMatches = await response.json();
            
            const completedMatches = allMatches.filter((m: MatchResult) => m.status === 'completed');
            setMatches(completedMatches);

            // Calculate team stats
            const stats = new Map<string, TeamStats>();

            completedMatches.forEach((match: MatchResult) => {
                // Team A stats
                if (!stats.has(match.teamA)) {
                    stats.set(match.teamA, {
                        team: match.teamA,
                        played: 0,
                        won: 0,
                        lost: 0,
                        goalsFor: 0,
                        goalsAgainst: 0,
                        goalDifference: 0
                    });
                }
                
                const teamAStats = stats.get(match.teamA)!;
                teamAStats.played++;
                teamAStats.goalsFor += match.scoreA;
                teamAStats.goalsAgainst += match.scoreB;
                teamAStats.goalDifference = teamAStats.goalsFor - teamAStats.goalsAgainst;
                if (match.winner === match.teamA) teamAStats.won++;
                else if (match.winner) teamAStats.lost++;

                // Team B stats
                if (!stats.has(match.teamB)) {
                    stats.set(match.teamB, {
                        team: match.teamB,
                        played: 0,
                        won: 0,
                        lost: 0,
                        goalsFor: 0,
                        goalsAgainst: 0,
                        goalDifference: 0
                    });
                }
                
                const teamBStats = stats.get(match.teamB)!;
                teamBStats.played++;
                teamBStats.goalsFor += match.scoreB;
                teamBStats.goalsAgainst += match.scoreA;
                teamBStats.goalDifference = teamBStats.goalsFor - teamBStats.goalsAgainst;
                if (match.winner === match.teamB) teamBStats.won++;
                else if (match.winner) teamBStats.lost++;
            });

            const sortedStats = Array.from(stats.values()).sort((a, b) => {
                if (b.won !== a.won) return b.won - a.won;
                if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
                return b.goalsFor - a.goalsFor;
            });

            setTeamStats(sortedStats);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch leaderboard data:', error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Tournament Leaderboard
                    </h1>
                    <p className="text-lg text-gray-400 mt-2">Live standings and match results</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Team Standings */}
                    <Card className="bg-gray-800/60 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-yellow-400">Team Standings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <p className="text-center text-gray-400">Loading...</p>
                            ) : teamStats.length === 0 ? (
                                <p className="text-center text-gray-400">No matches completed yet</p>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-gray-300">Team</TableHead>
                                            <TableHead className="text-center text-gray-300">P</TableHead>
                                            <TableHead className="text-center text-gray-300">W</TableHead>
                                            <TableHead className="text-center text-gray-300">L</TableHead>
                                            <TableHead className="text-center text-gray-300">GF</TableHead>
                                            <TableHead className="text-center text-gray-300">GA</TableHead>
                                            <TableHead className="text-center text-gray-300">GD</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {teamStats.map((stat, index) => (
                                            <TableRow key={stat.team}>
                                                <TableCell className="font-medium">
                                                    {index < 3 && <span className="text-yellow-400 mr-2">🏆</span>}
                                                    {stat.team}
                                                </TableCell>
                                                <TableCell className="text-center">{stat.played}</TableCell>
                                                <TableCell className="text-center text-green-400">{stat.won}</TableCell>
                                                <TableCell className="text-center text-red-400">{stat.lost}</TableCell>
                                                <TableCell className="text-center">{stat.goalsFor}</TableCell>
                                                <TableCell className="text-center">{stat.goalsAgainst}</TableCell>
                                                <TableCell className="text-center font-bold">{stat.goalDifference > 0 ? '+' : ''}{stat.goalDifference}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Matches */}
                    <Card className="bg-gray-800/60 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-blue-400">Recent Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <p className="text-center text-gray-400">Loading...</p>
                            ) : matches.length === 0 ? (
                                <p className="text-center text-gray-400">No matches completed yet</p>
                            ) : (
                                <div className="space-y-4">
                                    {matches.slice().reverse().slice(0, 10).map((match) => (
                                        <div key={match._id} className="bg-gray-700/50 p-4 rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-400 uppercase">{match.stage.replace('_', ' ')}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className={`font-semibold ${match.winner === match.teamA ? 'text-green-400' : 'text-gray-300'}`}>
                                                    {match.teamA}
                                                </span>
                                                <span className="text-2xl font-bold text-yellow-400">
                                                    {match.scoreA} - {match.scoreB}
                                                </span>
                                                <span className={`font-semibold ${match.winner === match.teamB ? 'text-green-400' : 'text-gray-300'}`}>
                                                    {match.teamB}
                                                </span>
                                            </div>
                                            {match.commentary && (
                                                <p className="text-sm text-gray-400 mt-2 italic">{match.commentary}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}