'use client';

import { useState, useEffect } from 'react';
import { Team } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);
    const [starting, setStarting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`);
            if (response.ok) {
                const data = await response.json();
                setTeams(data);
            }
        } catch (error) {
            console.error('Failed to fetch teams:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSeedTeams = async () => {
        setSeeding(true);
        setMessage('');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tournaments/seed`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            if (response.ok) {
                setMessage('Teams seeded successfully!');
                await fetchTeams();
            } else {
                const errorData = await response.json();
                setMessage(`Failed to seed teams: ${errorData.error || 'Unknown error'}`);
            }
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Error seeding teams');
        } finally {
            setSeeding(false);
        }
    };

    const handleStartTournament = async () => {
        setStarting(true);
        setMessage('');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tournaments/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setMessage('Tournament started successfully! Redirecting to bracket...');
                setTimeout(() => {
                    window.location.href = '/tournament';
                }, 1500);
            } else {
                setMessage(`Failed to start tournament: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Error starting tournament');
        } finally {
            setStarting(false);
        }
    };

    const canStartTournament = teams.length >= 8;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Tournament Control</CardTitle>
                    <CardDescription>Manage and monitor the tournament state.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={handleSeedTeams}
                            variant="secondary"
                            disabled={seeding}
                        >
                            {seeding ? 'Seeding...' : 'Seed 7 Teams (Demo)'}
                        </Button>
                        <Button
                            onClick={handleStartTournament}
                            disabled={!canStartTournament || starting}
                        >
                            {starting ? 'Starting...' : 'Start Tournament'}
                        </Button>
                    </div>
                    {!canStartTournament && (
                        <p className="text-sm text-yellow-500">
                            You need at least 8 teams to start the tournament. Currently: {teams.length}
                        </p>
                    )}
                    {message && (
                        <p className={`text-sm ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                        </p>
                    )}
                </CardContent>
            </Card>
            
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Registered Teams</h2>
                <div className="border rounded-lg">
                    <Table>
                        <TableCaption>A list of all registered federations.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Country</TableHead>
                                <TableHead>Representative</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Rating</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!loading && teams.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-gray-500">
                                        No teams have registered yet.
                                    </TableCell>
                                </TableRow>
                            )}
                            {teams.map(team => (
                                <TableRow key={team._id || team.id || team.name}>
                                    <TableCell className="font-medium">{team.name}</TableCell>
                                    <TableCell>{team.repName}</TableCell>
                                    <TableCell>{team.repEmail}</TableCell>
                                    <TableCell className="text-right">{team.rating || 1500}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
