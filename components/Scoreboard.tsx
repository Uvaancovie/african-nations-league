
import React from 'react';
import { Team, GameState } from '../types';

interface ScoreboardProps {
  homeTeam: Team;
  awayTeam: Team;
  time: number;
  gameState: GameState;
}

const getTeamInitial = (name: string) => {
    return name.trim().split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 3) || 'TEAM';
}

const Scoreboard: React.FC<ScoreboardProps> = ({ homeTeam, awayTeam, time, gameState }) => {
    const formatTime = (t: number) => {
        const displayTime = Math.min(t, 90);
        return `${String(displayTime).padStart(2, '0')}:00`;
    }

    const getStatusText = () => {
        switch (gameState) {
            case GameState.HALFTIME:
                return 'HALF TIME';
            case GameState.FINISHED:
                return 'FULL TIME';
            default:
                return formatTime(time);
        }
    }

  return (
    <div className="bg-gray-900 bg-opacity-70 p-4 shadow-md border-b border-gray-700">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {/* Home Team */}
        <div className="flex items-center gap-3 w-1/3 justify-end">
          <span className="hidden sm:inline text-lg font-semibold text-right truncate">{homeTeam.name}</span>
          <div className="w-12 h-12 bg-green-500 flex items-center justify-center text-xl font-bold rounded-full border-2 border-green-300">
            {getTeamInitial(homeTeam.name)}
          </div>
        </div>

        {/* Score and Time */}
        <div className="text-center w-1/3">
          <div className="text-4xl font-bold tracking-wider">
            <span>{homeTeam.score}</span>
            <span className="mx-2">-</span>
            <span>{awayTeam.score}</span>
          </div>
          <div className="text-sm font-semibold mt-1 text-yellow-400 tracking-widest">
            {getStatusText()}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex items-center gap-3 w-1/3 justify-start">
          <div className="w-12 h-12 bg-blue-500 flex items-center justify-center text-xl font-bold rounded-full border-2 border-blue-300">
             {getTeamInitial(awayTeam.name)}
          </div>
          <span className="hidden sm:inline text-lg font-semibold text-left truncate">{awayTeam.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
