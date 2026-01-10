import React from "react";

export default function Leaderboard({ playerName, onBack }) {
  const [leaderboards, setLeaderboards] = React.useState({ guess: [], higherlower: [] });

  React.useEffect(() => {
    const saved = localStorage.getItem("rmp_leaderboards");
    if (saved) setLeaderboards(JSON.parse(saved));
  }, []);

  const LeaderboardTable = ({ mode, title }) => {
    const sorted = [...leaderboards[mode]].sort((a, b) => b.score - a.score).slice(0, 10);
    return (
      <div style={{ flex: 1, minWidth: 320 }}>
        <h3 style={{ marginBottom: 12, color: "#1976d2" }}>{title}</h3>
        {sorted.length === 0 ? (
          <p style={{ color: "#999" }}>No scores yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1976d2", color: "#fff" }}>
                <th style={{ padding: 10, textAlign: "left" }}>Rank</th>
                <th style={{ padding: 10, textAlign: "left" }}>Player</th>
                <th style={{ padding: 10, textAlign: "center" }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry, i) => (
                <tr key={`${mode}-${entry.playerName}-${i}`} style={{ background: i % 2 ? "#fff" : "#f5f5f5" }}>
                  <td style={{ padding: 10 }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</td>
                  <td style={{ padding: 10, color: "#000" }}>{entry.playerName}</td>
                  <td style={{ padding: 10, textAlign: "center", fontWeight: "bold", color: "#000" }}>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ marginBottom: 20 }}>🏆 Leaderboard</h2>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <LeaderboardTable mode="guess" title="Guess the Rating" />
        <LeaderboardTable mode="higherlower" title="Higher or Lower" />
      </div>
      <button onClick={onBack} style={{ marginTop: 24, padding: "10px 16px" }}>← Back to Menu</button>
    </div>
  );
}
