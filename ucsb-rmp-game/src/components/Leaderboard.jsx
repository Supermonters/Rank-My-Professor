/*
  VISUAL STYLE (canonical)

  - Refer to `src/index.css` for the canonical palette and utility classes.
  - Use CSS variables (e.g. `var(--primary-blue)`) for all color work. Do not hardcode hex values.
  - Use `.btn-primary` for blue buttons and `.btn-secondary` for gray/outlined buttons.
  - When generating or modifying components (including via AI), keep styling consistent with this guide.
*/

import React from "react";

const MODE_OPTIONS = [
  { value: "guess", label: "Arcade: Guess the Rating", emoji: "🎮" },
  { value: "guess10", label: "Best Out of 10", emoji: "🏆" },
  { value: "higherlower", label: "Higher or Lower", emoji: "⬆️" }
];

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Easy", emoji: "🌿" },
  { value: "normal", label: "Normal", emoji: "⚖️" },
  { value: "hard", label: "Hard", emoji: "🔥" }
];

const buildLeaderboardState = () =>
  Object.fromEntries(DIFFICULTY_OPTIONS.map(({ value }) => [value, []]));

const buildMetaState = () =>
  Object.fromEntries(
    DIFFICULTY_OPTIONS.map(({ value }) => [value, { total: 0, playerRank: null }])
  );

export default function Leaderboard({ playerName, onBack }) {
  const normalizedName = playerName.trim();
  const [selectedMode, setSelectedMode] = React.useState(MODE_OPTIONS[0].value);
  const [leaderboards, setLeaderboards] = React.useState(() => buildLeaderboardState());
  const [meta, setMeta] = React.useState(() => buildMetaState());
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;

    const loadLeaderboards = async () => {
      setLoading(true);
      setError("");
      setLeaderboards(buildLeaderboardState());
      setMeta(buildMetaState());

      try {
        const baseParams = new URLSearchParams({ limit: "10" });
        if (normalizedName) {
          baseParams.set("playerName", normalizedName);
        }

        const results = await Promise.all(
          DIFFICULTY_OPTIONS.map(async ({ value }) => {
            const params = new URLSearchParams(baseParams);
            params.set("mode", selectedMode);
            params.set("difficulty", value);
            const res = await fetch(`/api/leaderboard?${params.toString()}`);
            if (!res.ok) {
              throw new Error("Failed to load leaderboards");
            }
            const data = await res.json();
            return { difficulty: value, data };
          })
        );

        if (cancelled) {
          return;
        }

        const nextLeaderboards = buildLeaderboardState();
        const nextMeta = buildMetaState();

        results.forEach(({ difficulty, data }) => {
          nextLeaderboards[difficulty] = data.entries || [];
          nextMeta[difficulty] = {
            total: data.total ?? 0,
            playerRank: data.playerRank ?? null
          };
        });

        setLeaderboards(nextLeaderboards);
        setMeta(nextMeta);
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
  }, [normalizedName, selectedMode]);

  const LeaderboardTable = ({ difficulty, title, emoji }) => {
    const sorted = [...(leaderboards[difficulty] || [])].sort((a, b) => b.score - a.score).slice(0, 10);
    const playerRank = meta[difficulty]?.playerRank;

    return (
      <div style={{ flex: 1, minWidth: 280 }}>
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

  const selectedModeMeta =
    MODE_OPTIONS.find((option) => option.value === selectedMode) || MODE_OPTIONS[0];

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
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 30 }}>
          <div>
            <p style={{ margin: "0 0 6px 0", fontSize: "12px", color: "var(--muted-2)" }}>Showing leaderboards for</p>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "var(--black)" }}>
              {selectedModeMeta.emoji} {selectedModeMeta.label}
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <label htmlFor="leaderboard-mode" style={{ fontSize: "14px", fontWeight: 600, color: "var(--black)" }}>
              Gamemode
            </label>
            <select
              id="leaderboard-mode"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              style={{
                background: "var(--white)",
                color: "var(--black)",
                border: "1px solid var(--primary-blue)",
                borderRadius: 20,
                padding: "8px 14px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              {MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.emoji} {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
          {DIFFICULTY_OPTIONS.map((difficulty) => (
            <div
              key={difficulty.value}
              style={{
                background: "var(--white)",
                borderRadius: 0,
                padding: 24
              }}
            >
              <LeaderboardTable
                difficulty={difficulty.value}
                title={difficulty.label}
                emoji={difficulty.emoji}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
