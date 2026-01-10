import { useEffect, useState } from "react";

import StartScreen from "./components/StartScreen";
import ModeSelect from "./components/ModeSelect";
import GuessMode from "./components/GuessMode";
import HigherLowerMode from "./components/HigherLowerMode";
import GameOverModal from "./components/GameOverModal";
import professorsData from "./data/professors";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState(null);
  const [score, setScore] = useState(0);
  const [lost, setLost] = useState(false);

  const [professors, setProfessors] = useState([]);
  const [leftProf, setLeftProf] = useState(null);
  const [rightProf, setRightProf] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:3004/professors");
        const data = await res.json();
        setProfessors(data);
        setLeftProf(data[Math.floor(Math.random() * data.length)]);
        setRightProf(data[Math.floor(Math.random() * data.length)]);
      } catch (e) {
        const data = professorsData; // fallback if db server not running
        setProfessors(data);
        setLeftProf(data[Math.floor(Math.random() * data.length)]);
        setRightProf(data[Math.floor(Math.random() * data.length)]);
      }
    }
    load();
  }, []);

  const randomProf = () =>
    professors[Math.floor(Math.random() * professors.length)];

  const handleGuessRating = (guess) => {
    const isCorrect = Math.abs(guess - leftProf.rating) <= 0.5;
    if (isCorrect) {
      setScore((s) => s + 1);
      setLeftProf(randomProf());
    } else {
      setLost(true);
    }
  };

  const handleHigherLower = (choice) => {
    const correct =
      choice === "higher"
        ? leftProf.rating > rightProf.rating
        : leftProf.rating < rightProf.rating;

    if (correct) setScore((s) => s + 1);

    setLeftProf(randomProf());
    setRightProf(randomProf());
  };

  const exitToModeSelect = () => {
    const ok = window.confirm("Leave this game and go back to mode selection?");
    if (ok) {
      setLost(false);
      setMode(null);
    }
  };

  const restartGame = () => {
    setScore(0);
    setLost(false);
    setLeftProf(randomProf());
    setRightProf(randomProf());
  };

  if (!started) {
    return (
      <StartScreen
        playerName={playerName}
        setPlayerName={setPlayerName}
        onStart={() => setStarted(true)}
      />
    );
  }

  if (!mode) {
    return <ModeSelect playerName={playerName} setMode={setMode} />;
  }

  if (!leftProf || !rightProf) {
    return <p style={{ padding: 30 }}>Loading professors...</p>;
  }

  return (
    <div style={{ padding: 30, position: "relative" }}>
      <h2>Score: {score}</h2>

      {mode === "guess" && (
        <GuessMode prof={leftProf} onGuess={handleGuessRating} onExit={exitToModeSelect} />
      )}

      {mode === "higherlower" && (
        <HigherLowerMode
          leftProf={leftProf}
          rightProf={rightProf}
          onChoose={handleHigherLower}
          onExit={exitToModeSelect}
        />
      )}

      {lost && <GameOverModal score={score} onRestart={restartGame} />}
    </div>
  );
}
