
import React from 'react';

interface TeamInputProps {
  homeTeamName: string;
  awayTeamName: string;
  setHomeTeamName: (name: string) => void;
  setAwayTeamName: (name: string) => void;
  onStartGame: () => void;
}

const TeamInput: React.FC<TeamInputProps> = ({
  homeTeamName,
  awayTeamName,
  setHomeTeamName,
  setAwayTeamName,
  onStartGame,
}) => {
  const canStart = homeTeamName.trim() !== '' && awayTeamName.trim() !== '' && homeTeamName.trim().toLowerCase() !== awayTeamName.trim().toLowerCase();

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-800/50">
      <h2 className="text-2xl font-semibold mb-8 text-gray-200">Set Up Your Match</h2>
      <div className="w-full max-w-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label htmlFor="home-team" className="block text-sm font-medium text-gray-400 mb-2">Home Team</label>
            <input
              id="home-team"
              type="text"
              value={homeTeamName}
              onChange={(e) => setHomeTeamName(e.target.value)}
              placeholder="e.g., Madrid Lions"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
          </div>
          <div>
            <label htmlFor="away-team" className="block text-sm font-medium text-gray-400 mb-2">Away Team</label>
            <input
              id="away-team"
              type="text"
              value={awayTeamName}
              onChange={(e) => setAwayTeamName(e.target.value)}
              placeholder="e.g., Barcelona Eagles"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
        </div>
        <button
          onClick={onStartGame}
          disabled={!canStart}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
        >
          Start Simulation
        </button>
        {!canStart && <p className="text-center text-xs text-red-400 mt-2">Please enter two different team names.</p>}
      </div>
    </div>
  );
};

export default TeamInput;
