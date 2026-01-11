import { useEffect, useRef, useState } from "react";

import StartScreen from "./components/StartScreen";
import ModeSelect from "./components/ModeSelect";
import GuessMode from "./components/GuessMode";
import HigherLowerMode from "./components/HigherLowerMode";
import GameOverModal from "./components/GameOverModal";
import ConfirmationModal from "./components/ConfirmationModal";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [score, setScore] = useState(0);
  const [lost, setLost] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [viewingLeaderboard, setViewingLeaderboard] = useState(false);

  const [professors, setProfessors] = useState([]);
  const [leftProf, setLeftProf] = useState(null);
  const [rightProf, setRightProf] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const lastSubmissionRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/professors.json");
        const data = await res.json();
        
        const transformed = data.map((item) => ({
          id: item.professor.legacy_id,
          name: `${item.professor.first_name} ${item.professor.last_name}`,
          department: item.professor.department,
          rating: item.professor.avg_rating,
          difficulty: item.professor.avg_difficulty,
          ratings: item.ratings || []
        }));
        
        setProfessors(transformed);
        setLeftProf(transformed[Math.floor(Math.random() * transformed.length)]);
        setRightProf(transformed[Math.floor(Math.random() * transformed.length)]);
      } catch (e) {
        console.error("Failed to load professors:", e);
      }
    }
    load();
  }, []);

  // Reset question counter when entering Best of 10 mode
  useEffect(() => {
    if (mode === "guess10") {
      setQuestionCount(0);
      setScore(0);
      setLost(false);
    }
  }, [mode]);

  const randomProf = () =>
    professors[Math.floor(Math.random() * professors.length)];

  const submitScoreToLeaderboard = async (finalScore) => {
    const trimmedName = playerName.trim();
    const modeKey = mode === "guess" ? "guess" : mode === "guess10" ? "guess10" : mode === "higherlower" ? "higherlower" : null;

    if (!trimmedName || !modeKey || !Number.isInteger(finalScore)) {
      return;
    }

    const submissionKey = `${trimmedName}|${modeKey}|${finalScore}`;
    if (lastSubmissionRef.current === submissionKey) {
      return;
    }
    lastSubmissionRef.current = submissionKey;

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: trimmedName,
          score: finalScore,
          mode: modeKey
        })
      });

      if (!res.ok) {
        throw new Error(`Submit failed: ${res.status}`);
      }
    } catch (e) {
      console.error("Failed to submit leaderboard:", e);
    }
  };

  const handleGuessRating = (guess) => {
    const difference = Math.abs(guess - leftProf.rating);

    if (mode === "guess") {
      if (difference > 0.5) {
        setLost(true);
      } else {
        const pointsAwarded = Math.round((1 - difference) * 10);
        setScore((s) => s + pointsAwarded);
        setLeftProf(randomProf());
      }
    } else if (mode === "guess10") {
      const pointsAwarded = Math.max(0, Math.round((1 - difference) * 10));
      setScore((s) => s + pointsAwarded);
      const nextCount = questionCount + 1;
      if (nextCount >= 10) {
        setLost(true);
      } else {
        setLeftProf(randomProf());
      }
      setQuestionCount(nextCount);
    }
  };

  const handleHigherLower = (choice) => {
    const correct =
      choice === "higher"
        ? leftProf.rating > rightProf.rating
        : leftProf.rating < rightProf.rating;

    if (correct) {
      setScore((s) => s + 1);
      setLeftProf(randomProf());
      setRightProf(randomProf());
    } else {
      setLost(true);
    }
  };

  const exitToModeSelect = () => {
    setShowConfirm(true);
    setConfirmAction("exit");
  };

  const handleConfirmYes = () => {
    if (confirmAction === "exit") {
      setLost(false);
      setMode(null);
      setDifficulty(null);
      setQuestionCount(0);
      setScore(0);
    }
    setShowConfirm(false);
    setConfirmAction(null);
  };

  const handleConfirmNo = () => {
    setShowConfirm(false);
    setConfirmAction(null);
  };

  const restartGame = () => {
    void submitScoreToLeaderboard(score);
    setScore(0);
    setLost(false);
    setLeftProf(randomProf());
    setRightProf(randomProf());
    setQuestionCount(0);
  };

  const goBackToMenu = async () => {
    await submitScoreToLeaderboard(score);
    setScore(0);
    setLost(false);
    setDifficulty(null);
    setMode(null);
    setViewingLeaderboard(false);
    setLeftProf(randomProf());
    setRightProf(randomProf());
    setQuestionCount(0);
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

  if (viewingLeaderboard) {
    return (
      <Leaderboard playerName={playerName} onBack={() => setViewingLeaderboard(false)} />
    );
  }

  if (!mode) {
    return (
      <ModeSelect 
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        playerName={playerName} 
        setMode={setMode}
        onViewLeaderboard={() => setViewingLeaderboard(true)}
      />
    );
  }

  if (!leftProf || !rightProf) {
    return <p style={{ padding: 30 }}>Loading professors...</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {mode === "guess" && (
          <GuessMode prof={leftProf} onGuess={handleGuessRating} onExit={exitToModeSelect} score={score} difficulty={difficulty} />
        )}

        {mode === "guess10" && (
          <GuessMode prof={leftProf} onGuess={handleGuessRating} onExit={exitToModeSelect} score={score} difficulty={difficulty} />
        )}

        {mode === "higherlower" && (
          <HigherLowerMode
            leftProf={leftProf}
            rightProf={rightProf}
            onChoose={handleHigherLower}
            onExit={exitToModeSelect}
            score={score}
          />
        )}
      </div>

      {lost && <GameOverModal mode={mode} score={score} leftProf={leftProf} rightProf={rightProf} onRestart={restartGame} onGoBackToMenu={goBackToMenu} />}
      {showConfirm && (
        <ConfirmationModal
          message="Leave this game and go back to mode selection?"
          onConfirm={handleConfirmYes}
          onCancel={handleConfirmNo}
        />
      )}
    </div>
  );
}
