import { Match, Team } from "@/lib/types";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

interface MatchCardProps {
    match: Match;
    teamA?: Team;
    teamB?: Team;
}

const TeamDisplay = ({ team, score, isWinner }: { team?: Team; score: number | null, isWinner: boolean }) => {
    const hasScore = score !== null;

    if (!team) {
        return <div className="text-gray-500 italic">TBD</div>;
    }

    return (
        <div className={cn("flex items-center justify-between w-full", isWinner ? "font-bold text-white" : "text-gray-400")}>
            <span>{team.name}</span>
            {hasScore && <span className={cn("px-2 py-0.5 rounded", isWinner ? "bg-green-500/80" : "bg-gray-600/80")}>{score}</span>}
        </div>
    );
};


export function MatchCard({ match, teamA, teamB }: MatchCardProps) {
    const matchId = (match?.id || match?._id || '');
    if (matchId && !matchId.includes('placeholder') && (!teamA || !teamB)) {
         // This can happen if teams haven't been assigned to a SF/Final match yet
         teamA = teamA || { id: match.teamAId, name: 'Winner of...', country: 'TBD', repName: '', repEmail: '', confederation: 'CAF', countryCode: '??', rating: 0, captainPlayerId: '', repUserId: '', tournamentActive: false };
         teamB = teamB || { id: match.teamBId, name: 'Winner of...', country: 'TBD', repName: '', repEmail: '', confederation: 'CAF', countryCode: '??', rating: 0, captainPlayerId: '', repUserId: '', tournamentActive: false };
    }
    
    const isCompleted = match.status === 'completed';
    const teamAIsWinner = isCompleted && (match.winnerId === teamA?.id || match.winner === teamA?.name);
    const teamBIsWinner = isCompleted && (match.winnerId === teamB?.id || match.winner === teamB?.name);

    return (
        <Card className="bg-gray-800/60 border-gray-700 shadow-lg">
            <CardContent className="p-4 flex flex-col gap-2">
                {teamA ? (
                    <TeamDisplay team={teamA} score={match.scoreA ?? null} isWinner={teamAIsWinner} />
                ) : (
                    <div className="text-gray-500 h-6"></div> // Placeholder for spacing
                )}
                
                <div className="flex items-center gap-2">
                    <hr className="flex-grow border-gray-600" />
                    <span className="text-xs text-gray-500 font-mono">VS</span>
                    <hr className="flex-grow border-gray-600" />
                </div>
                
                {teamB ? (
                    <TeamDisplay team={teamB} score={match.scoreB ?? null} isWinner={teamBIsWinner} />
                ) : (
                     <div className="text-gray-500 h-6"></div> // Placeholder for spacing
                )}
            </CardContent>
        </Card>
    );
}