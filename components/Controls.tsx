
import React from 'react';
import { GameState } from '../types';

interface ControlsProps {
  onReset: () => void;
  gameState: GameState;
}

const Controls: React.FC<ControlsProps> = ({ onReset, gameState }) => {
  return (
    <div className="bg-gray-900 bg-opacity-70 p-3 border-t border-gray-700 flex justify-center">
      <button
        onClick={onReset}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 shadow-md"
      >
        Reset Match
      </button>
    </div>
  );
};

export default Controls;
