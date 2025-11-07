import { Match, Team } from "@/lib/types";
import { MatchCard } from "./MatchCard";
import { Separator } from "./ui/separator";

interface TournamentBracketProps {
    matches: Match[];
    teams: Map<string, Team>;
}

export function TournamentBracket({ matches, teams }: TournamentBracketProps) {
    // Filter by stage instead of round
    const qfMatches = matches.filter(m => m.stage === 'quarter_finals' || m.round === 'QF');
    const sfMatches = matches.filter(m => m.stage === 'semi_finals' || m.round === 'SF');
    const fMatch = matches.find(m => m.stage === 'final' || m.round === 'F');

    // For rendering placeholders if rounds are not yet generated
    while (qfMatches.length < 4) qfMatches.push({ id: `qf-placeholder-${qfMatches.length}` } as Match);
    while (sfMatches.length < 2) sfMatches.push({ id: `sf-placeholder-${sfMatches.length}` } as Match);

    const renderRound = (roundMatches: Match[], title: string) => (
        <div className="flex flex-col justify-around w-full md:w-1/3 gap-6">
            <h3 className="text-2xl font-bold text-center text-gray-300 mb-4">{title}</h3>
            {roundMatches.map(match => {
                // Handle both formats: teamAId (old) and teamA (new string-based)
                let teamA: Team | undefined;
                let teamB: Team | undefined;

                if (typeof match.teamA === 'string') {
                    // teamA is a team name string
                    teamA = { name: match.teamA, country: match.teamA } as Team;
                } else if (match.teamAId) {
                    teamA = teams.get(match.teamAId);
                }

                if (typeof match.teamB === 'string') {
                    // teamB is a team name string
                    teamB = { name: match.teamB, country: match.teamB } as Team;
                } else if (match.teamBId) {
                    teamB = teams.get(match.teamBId);
                }

                return <MatchCard key={match.id || match._id} match={match} teamA={teamA} teamB={teamB} />;
            })}
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-8 md:gap-4 font-sans">
            {renderRound(qfMatches.slice(0, 2), "Quarter-Finals")}
            {renderRound(sfMatches.slice(0, 1), "Semi-Finals")}

            <div className="flex flex-col justify-around w-full md:w-1/3 gap-6">
                <h3 className="text-2xl font-bold text-center text-yellow-400 mb-4">Final</h3>
                {fMatch ? (
                    <MatchCard 
                        match={fMatch} 
                        teamA={typeof fMatch.teamA === 'string' ? { name: fMatch.teamA, country: fMatch.teamA } as Team : (fMatch.teamAId ? teams.get(fMatch.teamAId) : undefined)} 
                        teamB={typeof fMatch.teamB === 'string' ? { name: fMatch.teamB, country: fMatch.teamB } as Team : (fMatch.teamBId ? teams.get(fMatch.teamBId) : undefined)} 
                    />
                ) : (
                    <MatchCard match={{ id: 'f-placeholder' } as Match} />
                )}
                
                <Separator className="my-6" />

                <h3 className="text-2xl font-bold text-center text-gray-300 mb-4">Semi-Finals</h3>
                {renderRound(sfMatches.slice(1, 2), "")}
            </div>
             
            {renderRound(qfMatches.slice(2, 4), "Quarter-Finals")}
        </div>
    );
}