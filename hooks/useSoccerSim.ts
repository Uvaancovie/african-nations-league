import { useState, useEffect, useRef, useCallback } from 'react';
import { SimulationState, GameState, Team, MatchEvent, MatchEventType } from '../types';
import { generateCommentary } from '../services/geminiService';

const SIMULATION_SPEED = 1000; // ms per game minute
const CHANCE_OF_EVENT = 0.25;
const CHANCE_OF_GOAL = 0.15;

const initialState: SimulationState = {
  gameState: GameState.SETUP,
  homeTeam: { name: 'Home', score: 0 },
  awayTeam: { name: 'Away', score: 0 },
  time: 0,
  matchLog: [],
  isLoading: false,
};

export const useSoccerSim = () => {
  const [state, setState] = useState<SimulationState>(initialState);
  const intervalRef = useRef<number | null>(null);

  const addLogEntry = (entry: Omit<MatchEvent, 'id'>) => {
    setState(prevState => ({
      ...prevState,
      matchLog: [...prevState.matchLog, entry],
    }));
  };
  
  const generateAndLogCommentary = useCallback(async (promptType: 'goal' | 'event' | 'kickoff' | 'halftime' | 'fulltime', team?: 'home' | 'away') => {
      setState(prevState => ({ ...prevState, isLoading: true }));
      try {
        const commentary = await generateCommentary(
          promptType,
          state.homeTeam,
          state.awayTeam,
          state.time
        );

        if (promptType === 'goal' && team) {
           addLogEntry({ text: `GOAL! ${team === 'home' ? state.homeTeam.name : state.awayTeam.name} scores!`, time: state.time, type: MatchEventType.GOAL, team });
        }
        
        addLogEntry({ text: commentary, time: state.time, type: MatchEventType.COMMENTARY });

      } catch (error) {
        console.error("Error generating commentary:", error);
        addLogEntry({ text: "The commentator seems to be having technical difficulties.", time: state.time, type: MatchEventType.SYSTEM });
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
  }, [state.homeTeam, state.awayTeam, state.time]);


  const runSimulationTick = useCallback(() => {
    setState(prevState => {
      const newTime = prevState.time + 1;
      
      // FIX: Moved resume logic before the early return to allow game to continue after halftime.
      // Resume after half-time
      if (prevState.gameState === GameState.HALFTIME && newTime > 45) {
        return { ...prevState, time: newTime, gameState: GameState.PLAYING };
      }

      if (prevState.gameState !== GameState.PLAYING) {
        return prevState;
      }
      
      // Half-time
      if (newTime === 45) {
        if(intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        
        addLogEntry({ text: "Half-Time", time: 45, type: MatchEventType.HALFTIME });
        generateAndLogCommentary('halftime');
        
        setTimeout(() => {
          intervalRef.current = window.setInterval(runSimulationTick, SIMULATION_SPEED);
        }, 5000); // 5 second pause for half-time
        
        return { ...prevState, time: newTime, gameState: GameState.HALFTIME };
      }

      // Full-time
      if (newTime >= 90) {
        if(intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        addLogEntry({ text: "Full-Time", time: 90, type: MatchEventType.FULLTIME });
        generateAndLogCommentary('fulltime');
        return { ...prevState, time: 90, gameState: GameState.FINISHED };
      }

      // Random event logic
      if (Math.random() < CHANCE_OF_EVENT && !prevState.isLoading) {
        if (Math.random() < CHANCE_OF_GOAL) {
          // Goal scored
          const scoringTeam = Math.random() > 0.5 ? 'home' : 'away';
          const newHomeTeam = { ...prevState.homeTeam, score: prevState.homeTeam.score + (scoringTeam === 'home' ? 1 : 0) };
          const newAwayTeam = { ...prevState.awayTeam, score: prevState.awayTeam.score + (scoringTeam === 'away' ? 1 : 0) };
          generateAndLogCommentary('goal', scoringTeam);
          return { ...prevState, time: newTime, homeTeam: newHomeTeam, awayTeam: newAwayTeam };
        } else {
          // General commentary event
          generateAndLogCommentary('event');
        }
      }

      return { ...prevState, time: newTime };
    });
  }, [generateAndLogCommentary]);
  
  useEffect(() => {
    if (state.gameState === GameState.PLAYING && !intervalRef.current) {
      intervalRef.current = window.setInterval(runSimulationTick, SIMULATION_SPEED);
    } else if (state.gameState !== GameState.PLAYING && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.gameState]);
  

  const setHomeTeamName = (name: string) => {
    setState(prevState => ({ ...prevState, homeTeam: { ...prevState.homeTeam, name } }));
  };

  const setAwayTeamName = (name: string) => {
    setState(prevState => ({ ...prevState, awayTeam: { ...prevState.awayTeam, name } }));
  };

  const startGame = () => {
    addLogEntry({ text: "The match is about to begin!", time: 0, type: MatchEventType.SYSTEM });
    setState(prevState => ({ ...prevState, gameState: GameState.PLAYING, time: 0 }));
    generateAndLogCommentary('kickoff');
  };

  const resetGame = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setState(initialState);
  };

  return {
    state,
    setHomeTeamName,
    setAwayTeamName,
    startGame,
    resetGame,
  };
};
