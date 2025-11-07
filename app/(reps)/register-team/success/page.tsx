import Link from 'next/link';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegistrationSuccessPage() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-gray-800 border-gray-700">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="text-6xl">✅</div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-white">Registration Successful!</CardTitle>
                        <CardDescription>
                            Your team has been registered. The tournament admin will be notified.
                            You will receive email updates once the tournament begins.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Button asChild>
                            <Link href="/admin">View Registered Teams</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/">Back to Tournament Bracket</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
