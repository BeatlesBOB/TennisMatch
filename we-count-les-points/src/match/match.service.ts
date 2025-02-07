import { Injectable } from '@nestjs/common';
import { PointsMatchDto } from './dto/winner-match.dto';
import { Game, Match, Player, Set } from './interfaces/match.interface'; // Assurez-vous du nom du fichier

@Injectable()
export class MatchService {
  calculateMatchResult(pointsMatchDto: PointsMatchDto) {
    const { player1, player2, points } = pointsMatchDto;
    let currentGame: Game = this.generateNewGame(player1, player2);
    let currentSet: Set = this.generateNewSet(player1, player2);
    const match: Match = {
      winner: null,
      sets: [],
    };
    let isTieBreak = false;

    for (const currentPoint of points) {
      const { id: currentPointWinnerId } = currentPoint;
      const { id: currentPointLoserId } =
        currentPointWinnerId === player1.id ? player2 : player1;

      const currentGameWinnerScore = ++currentGame[currentPointWinnerId];
      const currentGameLoserScore = currentGame[currentPointLoserId];

      if (isTieBreak === true) {
        if (
          this.hasWonTieBreak(currentGameWinnerScore, currentGameLoserScore)
        ) {
          currentSet.games[currentPointWinnerId].push({ ...currentGame });
          match.sets.push({
            ...currentSet,
            winner: currentPoint,
          });

          currentSet = this.generateNewSet(player1, player2);
          currentGame = this.generateNewGame(player1, player2);
          isTieBreak = false;
        }
      } else {
        if (this.hasWonGame(currentGameWinnerScore, currentGameLoserScore)) {
          currentSet.games[currentPointWinnerId].push({ ...currentGame });
          currentGame = this.generateNewGame(player1, player2);

          if (
            this.hasToPlayTieBreak(
              currentSet.games[currentPointWinnerId],
              currentSet.games[currentPointLoserId],
            )
          ) {
            isTieBreak = true;
            continue;
          }
          if (
            this.hasWonSet(
              currentSet.games[currentPointWinnerId],
              currentSet.games[currentPointLoserId],
            )
          ) {
            match.sets.push({
              ...currentSet,
              winner: currentPoint,
            });

            currentSet = this.generateNewSet(player1, player2);
          }
        }
      }

      const currentPointWinnerWonSetList = match.sets.filter(
        (set) => set.winner?.id === currentPointWinnerId,
      ).length;

      if (currentPointWinnerWonSetList === 3) {
        match.winner = currentPoint;
      }
    }

    if (!match.winner) {
      match.sets.push({ ...currentSet });
    }

    return { score: match, currentGame, isTieBreak };
  }

  private hasToPlayTieBreak(winnerGames: Game[], loserGames: Game[]): boolean {
    return winnerGames.length === 6 && loserGames.length === 6;
  }

  private hasWonTieBreak(winnerScore: number, loserScore: number): boolean {
    return winnerScore >= 7 && winnerScore - loserScore >= 2;
  }

  private hasWonGame(winnerScore: number, loserScore: number): boolean {
    return winnerScore >= 4 && winnerScore - loserScore >= 2;
  }

  private hasWonSet(winnerGames: Game[], loserGames: Game[]) {
    return (
      winnerGames.length >= 6 && winnerGames.length - loserGames.length >= 2
    );
  }

  private generateNewGame(player1: Player, player2: Player): Game {
    return { [player1.id]: 0, [player2.id]: 0 };
  }

  private generateNewSet(player1: Player, player2: Player): Set {
    return { games: { [player1.id]: [], [player2.id]: [] }, winner: null };
  }
}
