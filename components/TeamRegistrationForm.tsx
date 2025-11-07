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

export function TeamRegistrationForm() {
    const [state, setState] = useState<FormState>({ message: '', success: false });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        country: '',
        managerName: '',
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
                    name: formData.country,
                    country: formData.country,
                    repName: formData.managerName,
                    repEmail: formData.email,
                    confederation: 'CAF'
                })
            });

            if (!response.ok) {
                const error = await response.json();
                setState({
                    message: error.message || 'Registration failed',
                    success: false
                });
            } else {
                setState({
                    message: 'Team registered successfully!',
                    success: true
                });
                setFormData({ country: '', managerName: '', email: '' });
                // Redirect after success
                setTimeout(() => {
                    window.location.href = '/register-team/success';
                }, 1500);
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
        <Card className="w-full max-w-lg mx-auto bg-gray-800/60 border-gray-700">
            <CardHeader>
                <CardTitle>Register Your Federation</CardTitle>
                <CardDescription>Enter your details to join the tournament.</CardDescription>
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
                        <Label htmlFor="managerName">Manager Name</Label>
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
                        {loading ? 'Registering...' : 'Register Federation & Team'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
