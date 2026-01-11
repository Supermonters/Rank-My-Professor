import React from "react";

export default function GameOverModal({ mode, score, leftProf, rightProf, onRestart, onGoBackToMenu }) {
  const leftRmpUrl = `https://www.ratemyprofessors.com/professor/${leftProf?.id}`;
  const rightRmpUrl = `https://www.ratemyprofessors.com/professor/${rightProf?.id}`;

  const ProfessorCard = ({ prof, label }) => (
    <div style={{
      background: "#f5f5f5",
      borderRadius: 0,
      padding: 16,
      marginBottom: 8
    }}>
      <p style={{ margin: "0 0 8px 0", fontSize: "15px", fontWeight: 600, color: "#333333" }}>
        {prof.name}
      </p>
      <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#666666" }}>
        {prof.department}
      </p>
      <div style={{
        fontSize: "18px",
        fontWeight: 700,
        color: "#0066cc",
        marginBottom: 12
      }}>
        {prof.rating.toFixed(1)} ⭐
      </div>
      <a
        href={label === "Left" ? leftRmpUrl : rightRmpUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "8px 12px",
          background: "#0066cc",
          color: "#fff",
          textDecoration: "none",
          borderRadius: 20,
          fontSize: "12px",
          fontWeight: 600,
          transition: "background-color 0.2s"
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#003399"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}
      >
        View on RMP →
      </a>
    </div>
  );

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      flexDirection: "column",
      zIndex: 1000,
      backdropFilter: "blur(4px)"
    }}>
      {/* Header */}
      <div style={{
        background: "#000000ff",
        color: "#ffffff",
        padding: "10px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}>
        <button
          onClick={onGoBackToMenu}
          style={{
            background: "none",
            border: "none",
            color: "#ffffff",
            fontSize: "20px",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center"
          }}
        >
          ← Back
        </button>
        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 700, flex: 1, textAlign: "center" }}>Game Over 🎓</h2>
        <div style={{ width: 60 }} />
      </div>

      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px"
      }}>
        <div style={{
          background: "#ffffff",
          padding: 40,
          borderRadius: 0,
          width: mode === "higherlower" ? 600 : 500,
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
          color: "#333333",
        maxHeight: "90vh",
        overflowY: "auto"
      }}>
        <p style={{ margin: "0 0 24px 0", color: "#666666", fontSize: "16px" }}>
          Your Score: <span style={{ fontSize: "32px", fontWeight: 700, color: "#0066cc" }}>{score}</span>
        </p>

        {mode === "guess" && leftProf && (
          <div style={{
            margin: "24px 0",
            padding: "16px",
            background: "#f5f5f5",
            borderRadius: 0
          }}>
            <p style={{ margin: "0 0 12px 0", color: "#666666", fontSize: "13px", fontWeight: 600 }}>
              Professor Guessed:
            </p>
            <p style={{ margin: "0 0 12px 0", fontSize: "18px", fontWeight: 700, color: "#333333" }}>
              {leftProf.name}
            </p>
            <p style={{ margin: "0 0 12px 0", fontSize: "18px", color: "#0066cc", fontWeight: 700 }}>
              Actual Rating: {leftProf.rating.toFixed(1)} ⭐
            </p>
            <a
              href={leftRmpUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: 12,
                padding: "8px 16px",
                background: "#0066cc",
                color: "#fff",
                textDecoration: "none",
                borderRadius: 20,
                fontSize: "13px",
                fontWeight: 600,
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#003399"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}
            >
              View on RateMyProfessors →
            </a>
          </div>
        )}

        {mode === "higherlower" && (
          <div style={{
            margin: "24px 0",
            padding: "16px",
            background: "#f5f5f5",
            borderRadius: 0
          }}>
            <p style={{ margin: "0 0 16px 0", color: "#666666", fontSize: "13px", fontWeight: 600 }}>
              Professor Ratings Comparison:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ textAlign: "left" }}>
                <ProfessorCard prof={leftProf} label="Left" />
              </div>
              <div style={{ textAlign: "left" }}>
                <ProfessorCard prof={rightProf} label="Right" />
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
          <button
            onClick={onRestart}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              background: "#0066cc",
              color: "#ffffff",
              border: "none",
              borderRadius: 30,
              cursor: "pointer",
              fontWeight: 600,
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#003399"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}
          >
            Play Again
          </button>
          <button
            onClick={onGoBackToMenu}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              background: "#f5f5f5",
              color: "#333333",
              border: "1px solid #e0e0e0",
              borderRadius: 30,
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#eeeeee"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#f5f5f5"}
          >
            Back to Menu
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

