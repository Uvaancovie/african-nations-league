'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AFRICAN_COUNTRIES } from '@/lib/constants';

interface FormState {
    message: string;
    success: boolean;
}

interface Player {
    name: string;
    naturalPosition: string;
    jerseyNumber: number;
    isCaptain: boolean;
    ratings: {
        GK: number;
        DF: number;
        MD: number;
        AT: number;
    };
}

export function TeamRegistrationForm() {
    const [state, setState] = useState<FormState>({ message: '', success: false });
    const [loading, setLoading] = useState(false);
    const [registeredSquad, setRegisteredSquad] = useState<Player[] | null>(null);
    const [teamRating, setTeamRating] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        country: '',
        managerName: '',
        repName: '',
        email: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setState({ message: '', success: false });

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    country: formData.country,
                    repName: formData.repName,
                    repEmail: formData.email,
                    managerName: formData.managerName,
                    autoGenerate: true
                })
            });

            if (!response.ok) {
                const error = await response.json();
                setState({
                    message: error.message || 'Registration failed',
                    success: false
                });
            } else {
                const data = await response.json();
                setRegisteredSquad(data.squad);
                setTeamRating(data.team.rating);
                setState({
                    message: 'Team registered successfully! Squad auto-generated.',
                    success: true
                });
                // Redirect after showing squad
                setTimeout(() => {
                    window.location.href = '/register-team/success';
                }, 5000);
            }
        } catch (error) {
            setState({
                message: error instanceof Error ? error.message : 'An error occurred',
                success: false
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card className="w-full max-w-lg mx-auto bg-gray-800/60 border-gray-700">
                <CardHeader>
                    <CardTitle>Register Your Federation</CardTitle>
                    <CardDescription>
                        Enter your details to join the tournament. A squad of 23 players will be auto-generated.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="country">Country</Label>
                            <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                                <SelectTrigger id="country">
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent>
                                    {AFRICAN_COUNTRIES.sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
                                        <SelectItem key={country.code} value={country.name}>
                                            {country.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="repName">Federation Representative Name</Label>
                            <Input
                                id="repName"
                                type="text"
                                placeholder="e.g., John Doe"
                                value={formData.repName}
                                onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="managerName">Team Manager Name</Label>
                            <Input
                                id="managerName"
                                type="text"
                                placeholder="e.g., Covie Moodley"
                                value={formData.managerName}
                                onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Contact Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="contact@federation.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        {state.message && (
                            <div className={`rounded-md p-3 text-center text-sm ${
                                state.success 
                                    ? 'bg-green-500/20 text-green-400' 
                                    : 'bg-red-500/20 text-red-400'
                            }`}>
                                {state.message}
                            </div>
                        )}
                        
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Registering...' : 'Register Federation & Auto-Generate Squad'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {registeredSquad && (
                <Card className="w-full max-w-4xl mx-auto bg-gray-800/60 border-gray-700">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Auto-Generated Squad</span>
                            <span className="text-sm text-blue-400">Team Rating: {teamRating}</span>
                        </CardTitle>
                        <CardDescription>
                            23 players with positions: 3 GK, 8 DF, 7 MD, 5 AT
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {registeredSquad
                                .sort((a, b) => {
                                    const posOrder = { GK: 1, DF: 2, MD: 3, AT: 4 };
                                    return posOrder[a.naturalPosition as keyof typeof posOrder] - posOrder[b.naturalPosition as keyof typeof posOrder];
                                })
                                .map((player, index) => (
                                <div key={index} className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl font-bold text-gray-400">#{player.jerseyNumber}</span>
                                            <div>
                                                <div className="font-semibold flex items-center gap-2">
                                                    {player.name}
                                                    {player.isCaptain && (
                                                        <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded">C</span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-400">{player.naturalPosition}</div>
                                            </div>
                                        </div>
                                        <div className="text-right text-xs space-y-0.5">
                                            <div className="flex gap-2">
                                                <span className="text-gray-500">GK:</span>
                                                <span className={player.naturalPosition === 'GK' ? 'text-green-400 font-bold' : 'text-gray-400'}>{player.ratings.GK}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-gray-500">DF:</span>
                                                <span className={player.naturalPosition === 'DF' ? 'text-green-400 font-bold' : 'text-gray-400'}>{player.ratings.DF}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-gray-500">MD:</span>
                                                <span className={player.naturalPosition === 'MD' ? 'text-green-400 font-bold' : 'text-gray-400'}>{player.ratings.MD}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-gray-500">AT:</span>
                                                <span className={player.naturalPosition === 'AT' ? 'text-green-400 font-bold' : 'text-gray-400'}>{player.ratings.AT}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-sm text-gray-400 text-center">
                            Redirecting to success page...
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
