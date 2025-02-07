import { Player } from '../interfaces/match.interface';

export interface PointsMatchDto {
  player1: Player;
  player2: Player;
  points: Array<Player>;
}
