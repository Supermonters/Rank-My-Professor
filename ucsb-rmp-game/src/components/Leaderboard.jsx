import React from "react";

export default function Leaderboard({ playerName, onBack }) {
  const normalizedName = playerName.trim();
  const [leaderboards, setLeaderboards] = React.useState({ guess: [], higherlower: [] });
  const [meta, setMeta] = React.useState({
    guess: { total: 0, playerRank: null },
    higherlower: { total: 0, playerRank: null }
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;

    const loadLeaderboards = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({ limit: "10" });
        if (normalizedName) {
          params.set("playerName", normalizedName);
        }

        const [guessRes, higherRes] = await Promise.all([
          fetch(`/api/leaderboard?mode=guess&${params.toString()}`),
          fetch(`/api/leaderboard?mode=higherlower&${params.toString()}`)
        ]);

        if (!guessRes.ok || !higherRes.ok) {
          throw new Error("Failed to load leaderboards");
        }

        const [guessData, higherData] = await Promise.all([
          guessRes.json(),
          higherRes.json()
        ]);

        if (cancelled) {
          return;
        }

        setLeaderboards({
          guess: guessData.entries || [],
          higherlower: higherData.entries || []
        });
        setMeta({
          guess: {
            total: guessData.total ?? 0,
            playerRank: guessData.playerRank ?? null
          },
          higherlower: {
            total: higherData.total ?? 0,
            playerRank: higherData.playerRank ?? null
          }
        });
      } catch (e) {
        if (!cancelled) {
          setError("Unable to load the online leaderboard right now.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadLeaderboards();

    return () => {
      cancelled = true;
    };
  }, [normalizedName]);

  const LeaderboardTable = ({ mode, title, emoji }) => {
    const sorted = [...leaderboards[mode]].sort((a, b) => b.score - a.score).slice(0, 10);
    const playerRank = meta[mode]?.playerRank;

    return (
      <div style={{ flex: 1, minWidth: 400 }}>
        <h3 style={{ marginBottom: 20, color: "var(--primary-blue)", fontSize: "18px", fontWeight: 700 }}>
          {emoji} {title}
        </h3>
        {loading ? (
          <p style={{ color: "var(--muted-2)", textAlign: "center", padding: "40px 20px" }}>Loading leaderboard...</p>
        ) : error ? (
          <p style={{ color: "var(--red)", textAlign: "center", padding: "40px 20px" }}>{error}</p>
        ) : sorted.length === 0 ? (
          <p style={{ color: "var(--muted-2)", textAlign: "center", padding: "40px 20px" }}>No scores yet. Be the first!</p>
        ) : (
          <div>
            {playerRank && playerRank > 10 && (
              <p style={{ margin: "0 0 16px 0", color: "var(--black)", fontSize: "13px" }}>
                Your rank: #{playerRank}
              </p>
            )}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--light-gray)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "var(--black)" }}>Rank</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "var(--black)" }}>Player</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "13px", fontWeight: 600, color: "var(--black)" }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((entry, index) => {
                  const isCurrentPlayer = entry.playerName === normalizedName;
                  return (
                    <tr
                      key={index}
                      style={{
                        background: isCurrentPlayer ? "var(--light-gray)" : index % 2 === 0 ? "var(--white)" : "var(--light-gray)"
                      }}
                    >
                      <td style={{
                        padding: "12px 16px",
                        fontSize: "14px",
                        fontWeight: isCurrentPlayer ? 700 : 600,
                        color: index === 0 ? "var(--yellow)" : index === 1 ? "var(--light-gray)" : index === 2 ? "var(--yellow)" : "var(--black)"
                      }}>
                        {index === 0 && "🥇"}
                        {index === 1 && "🥈"}
                        {index === 2 && "🥉"}
                        {index >= 3 && `#${index + 1}`}
                      </td>
                      <td style={{
                        padding: "12px 16px",
                        fontSize: "14px",
                        fontWeight: isCurrentPlayer ? 700 : 600,
                        color: isCurrentPlayer ? "var(--primary-blue)" : "var(--black)"
                      }}>
                        {entry.playerName}
                        {isCurrentPlayer && " (You)"}
                      </td>
                      <td style={{
                        padding: "12px 16px",
                        textAlign: "right",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "var(--primary-blue)"
                      }}>
                        {entry.score}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ background: "var(--light-gray)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        background: "var(--black)",
        color: "var(--white)",
        padding: "10px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "var(--white)",
            fontSize: "20px",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center"
          }}
        >
          ← Back
        </button>
        <div style={{ flex: 1, textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>Leaderboard</h1>
        </div>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: 1200, margin: "0 auto", padding: "40px 30px", paddingTop: 80, width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, marginBottom: 40 }}>
          <div style={{
            background: "var(--white)",
            borderRadius: 0,
            padding: 24
          }}>
            <LeaderboardTable mode="guess" title="Guess the Rating" emoji="📊" />
          </div>

          <div style={{
            background: "var(--white)",
            borderRadius: 0,
            padding: 24
          }}>
            <LeaderboardTable mode="higherlower" title="Higher or Lower" emoji="⬆️" />
          </div>
        </div>
      </div>
    </div>
  );
}
