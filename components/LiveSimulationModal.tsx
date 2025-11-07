'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface SimulationEvent {
  type: 'kickoff' | 'goal' | 'halftime' | 'fulltime' | 'stage' | 'match';
  commentary: string;
  timestamp: number;
  score?: { home: number; away: number };
  stage?: string;
  matchInfo?: { teamA: string; teamB: string };
}

interface LiveSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournamentId: string;
}

export default function LiveSimulationModal({ isOpen, onClose, tournamentId }: LiveSimulationModalProps) {
  const [events, setEvents] = useState<SimulationEvent[]>([]);
  const [currentStage, setCurrentStage] = useState<string>('Quarter Finals');
  const [progress, setProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const advanceTournament = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tournaments/advance/${tournamentId}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to advance tournament');
      }
      
      const data = await response.json();
      console.log('Tournament advanced:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Advance tournament error:', error);
      throw error;
    }
  };

  const startSimulation = async () => {
    setIsSimulating(true);
    setEvents([]);
    setProgress(0);

    try {
      // Quarter Finals
      setEvents(prev => [...prev, {
        type: 'stage',
        commentary: '🏆 Quarter Finals Begin!',
        timestamp: Date.now(),
        stage: 'Quarter Finals'
      }]);
      setCurrentStage('Quarter Finals');
      setProgress(10);

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get pending quarter-final matches
      let matchesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches?tournamentId=${tournamentId}&stage=quarter_finals&status=pending`);
      let qfMatches = await matchesRes.json();
      
      // Simulate quarter finals
      for (const match of qfMatches) {
        await simulateAndDisplayMatch(match);
      }
      
      setProgress(40);

      // Advance to Semi Finals
      setEvents(prev => [...prev, {
        type: 'stage',
        commentary: '📊 Advancing to Semi Finals...',
        timestamp: Date.now()
      }]);
      await advanceTournament();

      // Semi Finals
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEvents(prev => [...prev, {
        type: 'stage',
        commentary: '🏆 Semi Finals Begin!',
        timestamp: Date.now(),
        stage: 'Semi Finals'
      }]);
      setCurrentStage('Semi Finals');
      setProgress(50);

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get pending semi-final matches
      matchesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches?tournamentId=${tournamentId}&stage=semi_finals&status=pending`);
      let sfMatches = await matchesRes.json();
      
      // Simulate semi-finals
      for (const match of sfMatches) {
        await simulateAndDisplayMatch(match);
      }
      
      setProgress(75);

      // Advance to Final
      setEvents(prev => [...prev, {
        type: 'stage',
        commentary: '📊 Advancing to Grand Final...',
        timestamp: Date.now()
      }]);
      await advanceTournament();

      // Final
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEvents(prev => [...prev, {
        type: 'stage',
        commentary: '🏆 The Grand Final!',
        timestamp: Date.now(),
        stage: 'Final'
      }]);
      setCurrentStage('Final');
      setProgress(85);

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get pending final match
      matchesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches?tournamentId=${tournamentId}&stage=final&status=pending`);
      let finalMatches = await matchesRes.json();
      
      // Simulate final
      for (const match of finalMatches) {
        await simulateAndDisplayMatch(match, true);
      }
      
      setProgress(100);

      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSimulating(false);
      // Don't auto-close - let user review results and close manually
    } catch (error) {
      console.error('Simulation error:', error);
      setEvents(prev => [...prev, {
        type: 'fulltime',
        commentary: '❌ Simulation failed. Please try again.',
        timestamp: Date.now()
      }]);
      setIsSimulating(false);
    }
  };

  const simulateAndDisplayMatch = async (match: any, isFinal: boolean = false) => {
    // Show match start
    setEvents(prev => [...prev, {
      type: 'match',
      commentary: `⚽ ${match.teamA} vs ${match.teamB} - ${isFinal ? 'THE FINAL!' : 'Kick Off!'}`,
      timestamp: Date.now(),
      matchInfo: { teamA: match.teamA, teamB: match.teamB }
    }]);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate the match
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/simulate/${match._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const errorData = await response.json();
      setEvents(prev => [...prev, {
        type: 'fulltime',
        commentary: `⚠️ ${match.teamA} vs ${match.teamB} - ${errorData.error || 'Already completed'}`,
        timestamp: Date.now()
      }]);
      return;
    }

    const result = await response.json();

    if (result.match) {
      // Show AI-generated play-by-play commentary from Groq
      if (result.match.playByPlay && result.match.playByPlay.length > 0) {
        for (const commentary of result.match.playByPlay) {
          await new Promise(resolve => setTimeout(resolve, isFinal ? 1500 : 1200));
          
          const isGoal = commentary.toLowerCase().includes('goal') || commentary.includes('🎯') || commentary.includes('⚽');
          const isHalftime = commentary.toLowerCase().includes('half');
          
          setEvents(prev => [...prev, {
            type: isGoal ? 'goal' : isHalftime ? 'halftime' : 'kickoff',
            commentary: commentary,
            timestamp: Date.now(),
            score: { home: result.match.scoreA, away: result.match.scoreB }
          }]);
        }
      }

      // Show final result
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isFinal) {
        setEvents(prev => [...prev, {
          type: 'fulltime',
          commentary: `🎉 TOURNAMENT CHAMPION: ${result.match.winner} | Final Score: ${match.teamA} ${result.match.scoreA} - ${result.match.scoreB} ${match.teamB}`,
          timestamp: Date.now(),
          score: { home: result.match.scoreA, away: result.match.scoreB }
        }]);
        
        // Add champion announcement
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEvents(prev => [...prev, {
          type: 'stage',
          commentary: `🏆👑 ${result.match.winner} are the African Nations League Champions! 👑🏆`,
          timestamp: Date.now(),
          stage: 'Champion'
        }]);
      } else {
        setEvents(prev => [...prev, {
          type: 'fulltime',
          commentary: `🏁 Full Time: ${match.teamA} ${result.match.scoreA} - ${result.match.scoreB} ${match.teamB} | Winner: ${result.match.winner}`,
          timestamp: Date.now(),
          score: { home: result.match.scoreA, away: result.match.scoreB }
        }]);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isSimulating && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col bg-white text-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">🔴 Live Tournament Simulation</DialogTitle>
          <DialogDescription className="text-gray-600">
            Watch the tournament unfold with real-time AI commentary from Groq AI
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-700">
              <span className="font-semibold">{currentStage}</span>
              <span className="text-gray-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Events Feed */}
          <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
            {events.length === 0 && !isSimulating && (
              <div className="text-center text-gray-700 py-8">
                <p className="text-lg mb-4 font-semibold">Ready to simulate the tournament?</p>
                <p className="text-sm text-gray-600 mb-6">Watch live as matches unfold with AI-generated commentary!</p>
                <button
                  onClick={startSimulation}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all"
                >
                  🚀 Start Live Simulation
                </button>
              </div>
            )}
            
            {events.map((event, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 animate-fade-in text-gray-900 ${
                  event.type === 'stage'
                    ? 'bg-blue-100 border-blue-600'
                    : event.type === 'match'
                    ? 'bg-purple-100 border-purple-600'
                    : event.type === 'goal'
                    ? 'bg-green-100 border-green-600'
                    : 'bg-white border-gray-400'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl flex-shrink-0">
                    {event.type === 'stage' && '🏆'}
                    {event.type === 'match' && '⚽'}
                    {event.type === 'kickoff' && '🎯'}
                    {event.type === 'goal' && '⚡'}
                    {event.type === 'halftime' && '⏸️'}
                    {event.type === 'fulltime' && '🏁'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-gray-900 ${event.type === 'stage' || event.type === 'match' ? 'font-bold text-lg' : 'text-base'}`}>
                      {event.commentary}
                    </p>
                    {event.matchInfo && (
                      <p className="text-sm text-gray-700 mt-1 font-semibold">
                        {event.matchInfo.teamA} vs {event.matchInfo.teamB}
                      </p>
                    )}
                    {event.score && (
                      <p className="text-sm text-gray-700 mt-1 font-mono bg-gray-200 inline-block px-2 py-1 rounded">
                        Score: {event.score.home} - {event.score.away}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            
            {isSimulating && events.length > 0 && (
              <div className="flex items-center justify-center space-x-2 text-gray-700 py-4">
                <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <span className="font-semibold">Generating live commentary...</span>
              </div>
            )}

            {!isSimulating && progress === 100 && (
              <div className="text-center py-6">
                <button
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all"
                >
                  ✅ Close & View Results
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
