
export enum GameState {
  SETUP = 'SETUP',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
  HALFTIME = 'HALFTIME',
}

export interface Team {
  name: string;
  score: number;
}

export enum MatchEventType {
  SYSTEM = 'SYSTEM',
  COMMENTARY = 'COMMENTARY',
  GOAL = 'GOAL',
  HALFTIME = 'HALFTIME',
  FULLTIME = 'FULLTIME',
}

export interface MatchEvent {
  time: number | null;
  text: string;
  type: MatchEventType;
  team?: 'home' | 'away';
}

export interface SimulationState {
  gameState: GameState;
  homeTeam: Team;
  awayTeam: Team;
  time: number;
  matchLog: MatchEvent[];
  isLoading: boolean;
}
