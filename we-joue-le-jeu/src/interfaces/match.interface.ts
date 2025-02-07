export interface MatchResult {
  score: {
    winner: { id: number; name: string; level: number } | null;
    sets: GamesResult[];
  };
  currentGame: {
    [player1: string]: number;
  };
  isTieBreak: boolean;
}

export interface GamesResult {
  games: {
    [key: string]: {
      [key: string]: number;
    };
  };
}

export interface Player {
  id: number;
  name: string;
  level: number;
}
