import React, { useState } from "react";

export default function ModeSelect({ playerName, setMode, difficulty, setDifficulty, onViewLeaderboard }) {
  const [showGuessMenu, setShowGuessMenu] = useState(false);
  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: "#000000ff",
        color: "#ffffff",
        padding: "10px 10px",
        textAlign: "center"
      }}>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>Select Gamemode</h1>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 30px" }}>
        {/* Difficulty Selector */}
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#333333", marginBottom: 16 }}>
            Select Difficulty
          </h3>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            {[
              { label: "Easy", value: "easy" },
              { label: "Normal", value: "normal" },
              { label: "Hard", value: "hard" }
            ].map((diff) => (
              <button
                key={diff.value}
                onClick={() => setDifficulty(diff.value)}
                style={{
                  padding: "10px 24px",
                  background: difficulty === diff.value ? "#0066cc" : "#ffffff",
                  color: difficulty === diff.value ? "#ffffff" : "#333333",
                  border: "2px solid " + (difficulty === diff.value ? "#0066cc" : "#e0e0e0"),
                  borderRadius: 25,
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  if (difficulty !== diff.value) {
                    e.target.style.borderColor = "#0066cc";
                    e.target.style.color = "#0066cc";
                  }
                }}
                onMouseLeave={(e) => {
                  if (difficulty !== diff.value) {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.color = "#333333";
                  }
                }}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Guess Mode Card */}
          <div style={{
            background: "#ffffff",
            borderRadius: 0,
            padding: 24,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)"
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#0066cc", margin: "0 0 12px 0" }}>
              🎮 Arcade: Guess the Rating
            </h3>
            <p style={{ color: "#666666", lineHeight: "1.6", marginBottom: 20 }}>
              Read student reviews and guess the professor's average rating. Choose a mode and play!
            </p>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => difficulty && setShowGuessMenu((v) => !v)}
                disabled={!difficulty}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  background: difficulty ? "#0066cc" : "#cccccc",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 30,
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: difficulty ? "pointer" : "not-allowed",
                  transition: "background-color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
                onMouseEnter={(e) => difficulty && (e.target.style.backgroundColor = "#003399")}
                onMouseLeave={(e) => difficulty && (e.target.style.backgroundColor = "#0066cc")}
              >
                Play <span style={{ fontSize: 12 }}>▾</span>
              </button>

              {showGuessMenu && (
                <div style={{
                  position: "absolute",
                  top: 50,
                  left: 0,
                  right: 0,
                  background: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: 12,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                  overflow: "hidden"
                }}>
                  <button
                    onClick={() => { setShowGuessMenu(false); difficulty && setMode("guess"); }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 16px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                  >
                    🎮 Arcade
                  </button>
                  <div style={{ height: 1, background: "#eaeaea" }} />
                  <button
                    onClick={() => { setShowGuessMenu(false); difficulty && setMode("guess10"); }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 16px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                  >
                    🏆 Best Out of 10
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Higher/Lower Mode Card */}
          <div style={{
            background: "#ffffff",
            borderRadius: 0,
            padding: 24,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)"
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#0066cc", margin: "0 0 12px 0" }}>
              ⬆️ Higher or Lower
            </h3>
            <p style={{ color: "#666666", lineHeight: "1.6", marginBottom: 20 }}>
              Compare two professors and decide who has the higher rating. One wrong answer and it's game over!
            </p>
            <button
              onClick={() => difficulty && setMode("higherlower")}
              disabled={!difficulty}
              style={{
                width: "100%",
                padding: "12px 20px",
                background: difficulty ? "#0066cc" : "#cccccc",
                color: "#ffffff",
                border: "none",
                borderRadius: 30,
                fontSize: "16px",
                fontWeight: 600,
                cursor: difficulty ? "pointer" : "not-allowed",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => difficulty && (e.target.style.backgroundColor = "#003399")}
              onMouseLeave={(e) => difficulty && (e.target.style.backgroundColor = "#0066cc")}
            >
              Play Now
            </button>
          </div>
        </div>

        {/* Leaderboard Button */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <button
            onClick={onViewLeaderboard}
            style={{
              padding: "12px 32px",
              background: "#f5f5f5",
              color: "#333333",
              border: "1px solid #e0e0e0",
              borderRadius: 30,
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#eeeeee";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#f5f5f5";
            }}
          >
            🏆 View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
