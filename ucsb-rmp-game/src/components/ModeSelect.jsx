import React from "react";

export default function ModeSelect({ playerName, setMode, onViewLeaderboard }) {
  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: "#000000ff",
        color: "#ffffff",
        padding: "10px 10px",
        textAlign: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>Select Gamemode</h1>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 30px", paddingTop: 80 }}>

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
              📊 Guess the Rating
            </h3>
            <p style={{ color: "#666666", lineHeight: "1.6", marginBottom: 20 }}>
              Read student reviews and guess the professor's average rating. Get closer for more points!
            </p>
            <button
              onClick={() => setMode("guess")}
              style={{
                width: "100%",
                padding: "12px 20px",
                background: "#0066cc",
                color: "#ffffff",
                border: "none",
                borderRadius: 30,
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#003399"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}
            >
              Play Now
            </button>
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
              onClick={() => setMode("higherlower")}
              style={{
                width: "100%",
                padding: "12px 20px",
                background: "#0066cc",
                color: "#ffffff",
                border: "none",
                borderRadius: 30,
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#003399"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}
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
