import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTACard() {
    return (
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Compete?</h2>
            <p className="text-lg text-green-100 mb-6 max-w-2xl mx-auto">
                Register your federation, assemble your squad, and prepare to battle for the ultimate prize in African football.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-white text-gray-900 hover:bg-gray-200">
                    <Link href="/register-team">Register Your Team</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white/10">
                    <Link href="/tournament">View Live Bracket</Link>
                </Button>
            </div>
        </div>
    );
}
