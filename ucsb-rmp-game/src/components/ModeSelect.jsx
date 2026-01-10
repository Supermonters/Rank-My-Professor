import React from "react";

export default function ModeSelect({ playerName, setMode, onViewLeaderboard }) {
  return (
    <div style={{ padding: 30 }}>
      <h2>Hello, {playerName} 👋</h2>
      <h3>Select Mode</h3>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button onClick={() => setMode("guess")}>Guess the Rating</button>
        <button onClick={() => setMode("higherlower")}>Higher or Lower</button>
        <button onClick={onViewLeaderboard} style={{ marginLeft: 10 }}>🏆 View Leaderboard</button>
      </div>
    </div>
  );
}
