import React from "react";

export default function StartScreen({ playerName, setPlayerName, onStart }) {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0066cc 0%, #003399 100%)" }}>
      <div style={{ 
        maxWidth: 600, 
        margin: "0 auto", 
        padding: "60px 30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh"
      }}>
        <div style={{
          background: "#ffffff",
          borderRadius: 8,
          padding: 40,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          width: "100%"
        }}>
          <h1 style={{ 
            textAlign: "center", 
            margin: "0 0 12px 0", 
            color: "#333333",
            fontSize: "32px",
            fontWeight: 700
          }}>
            🎓 RMP Game
          </h1>
          <p style={{ 
            textAlign: "center", 
            margin: "0 0 32px 0", 
            color: "#666666",
            fontSize: "16px"
          }}>
            Test your knowledge of UCSB professors
          </p>

          <div style={{ marginBottom: 24 }}>
            <label style={{ 
              display: "block", 
              marginBottom: 8,
              fontSize: "14px",
              fontWeight: 600,
              color: "#333333"
            }}>
              Enter your name
            </label>
            <input
              placeholder="e.g., John Doe"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #e0e0e0",
                borderRadius: 4,
                fontSize: "16px",
                fontFamily: "inherit",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#0066cc"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          <button
            disabled={!playerName}
            onClick={onStart}
            style={{
              width: "100%",
              padding: "14px 20px",
              background: playerName ? "#0066cc" : "#cccccc",
              color: "#ffffff",
              border: "none",
              borderRadius: 4,
              fontSize: "16px",
              fontWeight: 600,
              cursor: playerName ? "pointer" : "not-allowed",
              transition: "background-color 0.2s"
            }}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
