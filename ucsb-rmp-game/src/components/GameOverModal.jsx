import React from "react";

/* VISUAL STYLE APPLIED - See src/index.css for design documentation
   - All colors use CSS variables (--white, --light-gray, --primary-blue, --dark-blue, --black)
   - Primary buttons: var(--primary-blue) background with var(--dark-blue) on hover
   - Secondary buttons: var(--light-gray) background with var(--primary-blue) border/text, var(--dark-blue) fill on hover
   - Modal: dark overlay with var(--white) centered card on var(--light-gray) background
   - Cards: var(--white) background with var(--light-gray) for highlights
*/

export default function GameOverModal({ mode, score, leftProf, rightProf, onRestart, onGoBackToMenu }) {
  const leftRmpUrl = `https://www.ratemyprofessors.com/professor/${leftProf?.id}`;
  const rightRmpUrl = `https://www.ratemyprofessors.com/professor/${rightProf?.id}`;

  const ProfessorCard = ({ prof, label }) => (
    <div style={{
      background: "var(--light-gray)",
      borderRadius: 0,
      padding: 16,
      marginBottom: 8
    }}>
      <p style={{ margin: "0 0 8px 0", fontSize: "15px", fontWeight: 600, color: "var(--black)" }}>
        {prof.name}
      </p>
      <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "var(--black)" }}>
        {prof.department}
      </p>
      <div style={{
        fontSize: "18px",
        fontWeight: 700,
        color: "var(--primary-blue)",
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
          background: "var(--primary-blue)",
          color: "var(--white)",
          textDecoration: "none",
          borderRadius: 20,
          fontSize: "12px",
          fontWeight: 600,
          transition: "background-color 0.2s"
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "var(--dark-blue)"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "var(--primary-blue)"}
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
        background: "var(--black)",
        color: "var(--white)",
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
          background: "var(--white)",
          padding: 40,
          borderRadius: 0,
          width: mode === "higherlower" ? 600 : 500,
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
          color: "var(--black)",
        maxHeight: "90vh",
        overflowY: "auto"
      }}>
        <p style={{ margin: "0 0 24px 0", color: "var(--black)", fontSize: "16px" }}>
          Your Score: <span style={{ fontSize: "32px", fontWeight: 700, color: "var(--primary-blue)" }}>{score}</span>
        </p>

        {mode === "guess" && leftProf && (
          <div style={{
            margin: "24px 0",
            padding: "16px",
            background: "var(--light-gray)",
            borderRadius: 0
          }}>
            <p style={{ margin: "0 0 12px 0", color: "var(--black)", fontSize: "13px", fontWeight: 600 }}>
              Professor Guessed:
            </p>
            <p style={{ margin: "0 0 12px 0", fontSize: "18px", fontWeight: 700, color: "var(--black)" }}>
              {leftProf.name}
            </p>
            <p style={{ margin: "0 0 12px 0", fontSize: "18px", color: "var(--primary-blue)", fontWeight: 700 }}>
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
                background: "var(--primary-blue)",
                color: "var(--white)",
                textDecoration: "none",
                borderRadius: 20,
                fontSize: "13px",
                fontWeight: 600,
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "var(--dark-blue)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "var(--primary-blue)"}
            >
              View on RateMyProfessors →
            </a>
          </div>
        )}

        {mode === "higherlower" && (
          <div style={{
            margin: "24px 0",
            padding: "16px",
            background: "var(--light-gray)",
            borderRadius: 0
          }}>
            <p style={{ margin: "0 0 16px 0", color: "var(--black)", fontSize: "13px", fontWeight: 600 }}>
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
              background: "var(--primary-blue)",
              color: "var(--white)",
              border: "none",
              borderRadius: 30,
              cursor: "pointer",
              fontWeight: 600,
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "var(--dark-blue)"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "var(--primary-blue)"}
          >
            Play Again
          </button>
          <button
            onClick={onGoBackToMenu}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              background: "var(--light-gray)",
              color: "var(--primary-blue)",
              border: "1px solid var(--primary-blue)",
              borderRadius: 30,
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--dark-blue)";
              e.target.style.color = "var(--white)";
              e.target.style.borderColor = "var(--dark-blue)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--light-gray)";
              e.target.style.color = "var(--primary-blue)";
              e.target.style.borderColor = "var(--primary-blue)";
            }}
          >
            Back to Menu
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

