import { TeamRegistrationForm } from "@/components/TeamRegistrationForm";
import { Header } from "@/components/Header";

export default function RegisterTeamPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Team Registration
          </h1>
          <p className="text-lg text-gray-400 mt-2">Join the African Nations League</p>
        </div>
        <TeamRegistrationForm />
      </main>
    </>
  );
}
