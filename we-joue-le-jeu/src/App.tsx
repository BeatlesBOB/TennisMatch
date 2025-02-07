import { FormEvent, useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import MatchTable from "./components/MatchTable";
import { MatchResult, Player } from "./interfaces/match.interface";
import "./App.css";

function App() {
  const [player1, setPlayer1] = useState<Player>({
    id: 1,
    name: "",
    level: -1,
  });
  const [player2, setPlayer2] = useState<Player>({
    id: 2,
    name: "",
    level: -1,
  });

  const [points, setPoints] = useState<Array<Player>>([]);
  const [match, setMatch] = useState<MatchResult | null>(null);

  const handleGeneratePoints = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const generatedPoints: Array<Player> = [];
    for (let i = 0; i < 150; i++) {
      const probability = player1.level / (player1.level + player2.level);
      generatedPoints.push(Math.random() < probability ? player1 : player2);
    }
    setPoints(generatedPoints);
  };

  const handleMatchData = async () => {
    const response = await fetch("http://localhost:3000/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player1: {
          id: player1.id,
          name: player1.name,
        },
        player2: {
          id: player2.id,
          name: player2.name,
        },
        points,
      }),
    });
    const data = await response.json();
    setMatch(data);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Simulateur de Match de Tennis 🎾</h1>
      <form
        className="flex flex-col gap-y-1.5"
        onSubmit={(evt) => handleGeneratePoints(evt)}
      >
        <div className="flex gap-x-1.5">
          <Input
            required={true}
            placeholder="Joueur 1"
            value={player1.name}
            onChange={(e) =>
              setPlayer1((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Input
            required={true}
            type="number"
            min="1"
            max="10"
            value={player1.level}
            onChange={(e) => {
              const nLevel = Number(e.target.value);
              setPlayer1((prev) => ({ ...prev, level: nLevel }));
            }}
          />
        </div>
        <div className="flex gap-x-1.5">
          <Input
            required={true}
            placeholder="Joueur 2"
            value={player2.name}
            onChange={(e) =>
              setPlayer2((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Input
            required={true}
            type="number"
            min="1"
            max="10"
            value={player2.level}
            onChange={(e) => {
              const nLevel = Number(e.target.value);
              setPlayer2((prev) => ({ ...prev, level: nLevel }));
            }}
          />
        </div>

        <Button>Générer les points</Button>
      </form>

      {points.length > 0 && (
        <div className="mt-5">
          <h2 className="text-lg font-semibold">Points générés</h2>
          <ul className="flex flex-col gap-y-1.5 list-disc list-inside">
            {points.map((point, index) => {
              return (
                <li key={index}>
                  Point {index + 1} : remporté par {point.name}
                </li>
              );
            })}
          </ul>

          <Button className="mt-2" onClick={handleMatchData}>
            Envoyer au serveur
          </Button>
        </div>
      )}

      {match && (
        <div>
          <h2 className="text-lg font-semibold">Score final</h2>
          <p>
            <strong>Vainqueur:</strong>{" "}
            {match.score.winner?.name || "En cours..."}
          </p>
          <MatchTable match={match} players={[player1, player2]} />
        </div>
      )}
    </div>
  );
}

export default App;
