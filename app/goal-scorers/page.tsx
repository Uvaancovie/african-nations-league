'use client';

import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GoalScorer {
    playerName: string;
    teamName: string;
    goals: number;
    minutes: number[];
}

export default function GoalScorersPage() {
    const [goalScorers, setGoalScorers] = useState<GoalScorer[]>([]);
    const [filteredScorers, setFilteredScorers] = useState<GoalScorer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [teamFilter, setTeamFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'goals' | 'name'>('goals');

    useEffect(() => {
        fetchGoalScorers();
        // Auto-refresh every 10 seconds
        const interval = setInterval(fetchGoalScorers, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        filterAndSortScorers();
    }, [goalScorers, searchTerm, teamFilter, sortBy]);

    const fetchGoalScorers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goal-scorers`);
            if (!response.ok) {
                console.error('API response not ok:', response.status, response.statusText);
                setLoading(false);
                return;
            }
            const data = await response.json();
            console.log('Goal scorers fetched:', data);
            setGoalScorers(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch goal scorers:', error);
            setLoading(false);
        }
    };

    const filterAndSortScorers = () => {
        let filtered = [...goalScorers];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(scorer =>
                scorer.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                scorer.teamName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply team filter
        if (teamFilter !== 'all') {
            filtered = filtered.filter(scorer => scorer.teamName === teamFilter);
        }

        // Apply sorting
        if (sortBy === 'goals') {
            filtered.sort((a, b) => b.goals - a.goals);
        } else {
            filtered.sort((a, b) => a.playerName.localeCompare(b.playerName));
        }

        setFilteredScorers(filtered);
    };

    const uniqueTeams = Array.from(new Set(goalScorers.map(s => s.teamName))).sort();

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                        ⚽ Goal Scorers Leaderboard
                    </h1>
                    <p className="text-lg text-gray-400 mt-2">Top scorers in the African Nations League</p>
                </div>

                <Card className="bg-gray-800/60 border-gray-700 max-w-5xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-yellow-400">Top Scorers</CardTitle>
                        
                        {/* Search and Filter Controls */}
                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Search player or team..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-gray-700 border-gray-600 text-white"
                                />
                            </div>
                            
                            <div>
                                <Select value={teamFilter} onValueChange={setTeamFilter}>
                                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                        <SelectValue placeholder="Filter by team" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Teams</SelectItem>
                                        {uniqueTeams.map((team) => (
                                            <SelectItem key={team} value={team}>
                                                {team}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Select value={sortBy} onValueChange={(val) => setSortBy(val as 'goals' | 'name')}>
                                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="goals">Most Goals</SelectItem>
                                        <SelectItem value="name">Player Name</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                                <p className="text-gray-400">Loading goal scorers...</p>
                            </div>
                        ) : filteredScorers.length === 0 ? (
                            <div className="text-center py-12">
                                {searchTerm || teamFilter !== 'all' ? (
                                    <>
                                        <p className="text-2xl mb-2">🔍</p>
                                        <p className="text-gray-400 text-lg mb-2">No goal scorers found</p>
                                        <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                                    </>
                                ) : goalScorers.length === 0 ? (
                                    <>
                                        <p className="text-4xl mb-4">⚽</p>
                                        <p className="text-gray-400 text-lg mb-2">No goals scored yet!</p>
                                        <p className="text-gray-500 text-sm">Start the tournament and play matches to see goal scorers here.</p>
                                        <div className="mt-6">
                                            <a href="/admin" className="text-blue-400 hover:text-blue-300 underline">
                                                Go to Admin Panel →
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-gray-400">No results found</p>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="mb-4 text-sm text-gray-400">
                                    Showing {filteredScorers.length} of {goalScorers.length} scorers
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-gray-300 w-16">Rank</TableHead>
                                            <TableHead className="text-gray-300">Player</TableHead>
                                            <TableHead className="text-gray-300">Team</TableHead>
                                            <TableHead className="text-center text-gray-300">Goals</TableHead>
                                            <TableHead className="text-gray-300">Minutes Scored</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredScorers.map((scorer, index) => (
                                            <TableRow key={`${scorer.playerName}-${scorer.teamName}`}>
                                                <TableCell className="font-bold">
                                                    {index === 0 && sortBy === 'goals' && (
                                                        <span className="text-yellow-400 text-2xl">🥇</span>
                                                    )}
                                                    {index === 1 && sortBy === 'goals' && (
                                                        <span className="text-gray-300 text-2xl">🥈</span>
                                                    )}
                                                    {index === 2 && sortBy === 'goals' && (
                                                        <span className="text-orange-400 text-2xl">🥉</span>
                                                    )}
                                                    {(index > 2 || sortBy !== 'goals') && (
                                                        <span className="text-gray-400">{index + 1}</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    {scorer.playerName}
                                                </TableCell>
                                                <TableCell className="text-blue-400">
                                                    {scorer.teamName}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="inline-flex items-center justify-center bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded-full">
                                                        {scorer.goals}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-400">
                                                    {scorer.minutes.sort((a, b) => a - b).join("', ")}' 
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {/* Statistics Summary */}
                                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-yellow-400">
                                            {filteredScorers.reduce((sum, s) => sum + s.goals, 0)}
                                        </div>
                                        <div className="text-sm text-gray-400">Total Goals</div>
                                    </div>
                                    <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-blue-400">
                                            {filteredScorers.length}
                                        </div>
                                        <div className="text-sm text-gray-400">Scorers</div>
                                    </div>
                                    <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-green-400">
                                            {filteredScorers.length > 0 ? filteredScorers[0].goals : 0}
                                        </div>
                                        <div className="text-sm text-gray-400">Top Scorer</div>
                                    </div>
                                    <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-purple-400">
                                            {filteredScorers.length > 0 
                                                ? (filteredScorers.reduce((sum, s) => sum + s.goals, 0) / filteredScorers.length).toFixed(1)
                                                : 0}
                                        </div>
                                        <div className="text-sm text-gray-400">Avg Goals/Player</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
