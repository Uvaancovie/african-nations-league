import { Header } from "@/components/Header";
import { CTACard } from "@/components/landing/CTACard";
import { FeatureCard } from "@/components/landing/FeatureCard";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="text-center py-20 md:py-32 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-8xl mb-6">🏆</div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              African Nations League Simulator
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the thrill of a continental knockout tournament. Register your team, watch AI-powered match simulations, and climb the leaderboard to glory.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Core Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<div className="text-5xl">🤖</div>}
                title="AI-Powered Simulation"
                description="Matches are simulated using Gemini, with options for full play-by-play commentary or quick results."
              />
              <FeatureCard
                icon={<div className="text-5xl">🏆</div>}
                title="Knockout Bracket"
                description="Follow the 'Road to the Final' with a full tournament bracket from Quarter-Finals to the championship match."
              />
              <FeatureCard
                icon={<div className="text-5xl">📊</div>}
                title="Live Leaderboards"
                description="Track top goal scorers and team performance throughout the tournament."
              />
              <FeatureCard
                icon={<div className="text-5xl">📧</div>}
                title="Instant Notifications"
                description="Federations receive match results and summaries directly to their inbox via email."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-800/50">
           <div className="container mx-auto px-4">
                <CTACard />
           </div>
        </section>
      </main>

      <footer className="text-center py-6 text-gray-500 border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} African Nations League Simulator. An MVP by Way2Fly Digital.</p>
      </footer>
    </div>
  );
}
