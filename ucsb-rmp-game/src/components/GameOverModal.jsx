import React from "react";

export default function GameOverModal({ score, onRestart }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#fff",
        padding: 40,
        borderRadius: 12,
        width: 400,
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        color: "#000"
      }}>
        <h2 style={{ margin: "0 0 16px 0", color: "#000", fontSize: "28px" }}>Game Over 🎓</h2>
        <p style={{ margin: "0 0 24px 0", color: "#333", fontSize: "18px" }}>Your score: <b style={{ fontSize: "24px", color: "#d32f2f" }}>{score}</b></p>
        <button 
          onClick={onRestart} 
          style={{ 
            marginTop: 12,
            padding: "12px 24px",
            fontSize: "16px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
