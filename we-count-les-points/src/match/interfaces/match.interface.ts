export type PlayerID = string;

export type Player = {
  id: PlayerID;
  name: string;
};

export type Game = {
  [playerID: PlayerID]: number;
};

export type Set = {
  games: Record<PlayerID, Game[]>;
  winner: Player | null;
};

export type Match = {
  winner: Player | null;
  sets: Set[];
};
