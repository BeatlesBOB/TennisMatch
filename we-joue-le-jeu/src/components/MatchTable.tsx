import { MatchResult, Player } from "../interfaces/match.interface";

const MatchTable: React.FC<{ match: MatchResult; players: Array<Player> }> = ({
  match,
  players,
}) => {
  const getOpponentId = (currentId: number): number => {
    return players.find((player) => player.id !== currentId)!.id;
  };
  const formatPoints = (points: number, opponentPoints: number) => {
    const tennisPoints = ["0", "15", "30", "40"];
    if (points >= 3 && opponentPoints >= 3) {
      if (points === opponentPoints) return "40-40";
      return points > opponentPoints ? "AV-" : "-AV";
    }
    return tennisPoints[points] || "0";
  };
  const sets = match.score.sets.length; // Nombre de sets

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto border-collapse border border-gray-500 w-full text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-500 px-4 py-2">Joueur</th>
            {[...Array(sets)].map((_, idx) => (
              <th key={idx} className="border border-gray-500 px-4 py-2">
                Set {idx + 1}
              </th>
            ))}
            {!match.score.winner && (
              <th className="border border-gray-500 px-4 py-2">Jeu en cours</th>
            )}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="hover:bg-gray-100">
              <td className="border border-gray-500 px-4 py-2 font-bold">
                {player.name}
              </td>
              {match.score.sets.map((set) => {
                return (
                  <td className="border border-gray-500 px-4 py-2">
                    {set.games[player.id].length}
                  </td>
                );
              })}
              {!match.score.winner && (
                <td className="border border-gray-500 px-4 py-2">
                  {match.isTieBreak
                    ? match.currentGame[player.id]
                    : formatPoints(
                        match.currentGame[player.id],
                        match.currentGame[getOpponentId(player.id)]
                      )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
