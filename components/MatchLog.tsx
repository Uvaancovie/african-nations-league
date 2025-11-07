
import React, { useEffect, useRef } from 'react';
import { MatchEvent, MatchEventType } from '../types';
import { SoccerBallIcon } from './icons/SoccerBallIcon';

interface MatchLogProps {
  log: MatchEvent[];
  isLoading: boolean;
}

const getEventStyles = (type: MatchEventType, team?: 'home' | 'away') => {
    switch (type) {
        case MatchEventType.GOAL:
            const baseGoalStyle = "font-bold text-lg my-2 px-4 py-2 rounded-lg flex items-center gap-2 animate-pulse-fast";
            return team === 'home' ? 
                `${baseGoalStyle} bg-green-500/20 text-green-300 border-l-4 border-green-400` : 
                `${baseGoalStyle} bg-blue-500/20 text-blue-300 border-l-4 border-blue-400`;
        case MatchEventType.HALFTIME:
        case MatchEventType.FULLTIME:
            return "text-center font-bold text-yellow-400 my-3 py-2 border-y-2 border-yellow-400/50 bg-yellow-500/10";
        case MatchEventType.SYSTEM:
            return "text-center text-gray-500 italic text-sm my-2";
        case MatchEventType.COMMENTARY:
        default:
            return "text-gray-300 my-2 leading-relaxed";
    }
}

const MatchLog: React.FC<MatchLogProps> = ({ log, isLoading }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log, isLoading]);

  return (
    <div className="flex-grow p-4 overflow-y-auto bg-black/20">
      <div className="max-w-3xl mx-auto">
        {log.map((event, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="w-12 text-center font-mono text-sm text-gray-500 pt-2.5">
              {event.time !== null && `${String(event.time).padStart(2, '0')}'`}
            </div>
            <div className={`flex-1 ${getEventStyles(event.type, event.team)}`}>
              {event.type === MatchEventType.GOAL && <SoccerBallIcon className="w-6 h-6 animate-spin-slow" />}
              {event.text}
            </div>
          </div>
        ))}
         {isLoading && (
            <div className="flex gap-4 items-start">
              <div className="w-12 text-center font-mono text-sm text-gray-500 pt-2.5">...</div>
              <div className="flex-1 text-gray-400 italic my-2 animate-pulse">AI is generating commentary...</div>
            </div>
          )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default MatchLog;
