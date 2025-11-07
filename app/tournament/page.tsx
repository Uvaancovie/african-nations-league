'use client';

import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { TournamentBracket } from "@/components/TournamentBracket";
import { Match, Team, Tournament } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function TournamentPage() {
    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [matches, setMatches] = useState<Match[]>([]);
    const [teams, setTeams] = useState<Map<string, Team>>(new Map());
    const [loading, setLoading] = useState(true);
    const [simulating, setSimulating] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTournamentData();
        // Auto-refresh every 5 seconds
        const interval = setInterval(fetchTournamentData, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchTournamentData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tournaments/active`, { cache: 'no-store' });
            const tournamentData = await res.json();
            
            if (!tournamentData || !tournamentData._id) {
                setTournament(null);
                setMatches([]);
                setTeams(new Map());
                setLoading(false);
                return;
            }

            setTournament(tournamentData);

            // Fetch matches
            const matchesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches?tournamentId=${tournamentData._id}`, { cache: 'no-store' });
            const matchesData = await matchesRes.json();
            setMatches(matchesData);

            // Fetch teams
            const teamsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, { cache: 'no-store' });
            const teamsArray = await teamsRes.json();
            
            const teamsMap = new Map<string, Team>();
            teamsArray.forEach((team: any) => {
                teamsMap.set(team._id, { id: team._id, ...team } as Team);
            });
            setTeams(teamsMap);
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tournament data:', error);
            setLoading(false);
        }
    };

    const handleSimulateRound = async () => {
        if (!tournament) return;
        
        setSimulating(true);
        setMessage('Simulating matches with AI...');
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/simulate/round/${tournament._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            
            if (response.ok) {
                setMessage(`Round completed! ${data.results.length} matches simulated.`);
                await fetchTournamentData();
            } else {
                setMessage(`Failed: ${data.error}`);
            }
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Error simulating round');
        } finally {
            setSimulating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <p>Loading tournament...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                        Tournament Bracket
                    </h1>
                    <p className="text-lg text-gray-400 mt-2">The Road to the Final</p>
                </div>

                {tournament && (
                    <div className="flex justify-center gap-4 mb-8">
                        <Button 
                            onClick={handleSimulateRound}
                            disabled={simulating || tournament.status === 'completed'}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500"
                        >
                            {simulating ? 'Simulating...' : `Simulate ${tournament.stage ? tournament.stage.replace('_', ' ').toUpperCase() : 'ROUND'}`}
                        </Button>
                    </div>
                )}

                {message && (
                    <div className="text-center mb-4">
                        <p className="text-sm text-yellow-400">{message}</p>
                    </div>
                )}
                
                {tournament ? (
                    <TournamentBracket matches={matches} teams={teams} />
                ) : (
                    <div className="flex flex-col items-center justify-center text-center bg-gray-800/50 p-10 rounded-lg">
                        <div className="w-16 h-16 text-yellow-500 mb-4 text-6xl">⚠️</div>
                        <h2 className="text-2xl font-bold mb-2">No Tournament Active</h2>
                        <p className="text-gray-400">The tournament has not started yet. Check back soon!</p>
                    </div>
                )}

                {tournament?.status === 'completed' && (
                    <div className="mt-16 text-center">
                        <div className="w-20 h-20 mx-auto text-yellow-400 mb-4 text-8xl">🏆</div>
                        <h2 className="text-3xl font-bold">Tournament Complete!</h2>
                    </div>
                )}
            </main>
        </div>
    );
}
