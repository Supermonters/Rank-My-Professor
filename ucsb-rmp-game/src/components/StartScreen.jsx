import React from "react";

/* VISUAL STYLE APPLIED - See src/index.css for design documentation
   - All colors use CSS variables (--white, --light-gray, --primary-blue, --dark-blue, --black)
   - Primary buttons: var(--primary-blue) background with var(--dark-blue) on hover
   - Fixed header: var(--black) background with var(--white) text, positioned at top: 0
   - Cards: var(--white) background with var(--light-gray) for highlights
*/

export default function StartScreen({ playerName, setPlayerName, onStart }) {
  const canStart = playerName.trim().length > 0;

  return (
    <div style={{ background: "var(--light-gray)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        background: "var(--black)",
        color: "var(--white)",
        padding: "10px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>RMP Game</h1>
      </div>

      <div style={{ 
        flex: 1,
        maxWidth: 600, 
        margin: "0 auto", 
        padding: "60px 30px",
        paddingTop: 110,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
      }}>
        <div style={{
          background: "var(--white)",
          borderRadius: 0,
          padding: 40,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          width: "100%"
        }}>
          <h1 style={{ 
            textAlign: "center", 
            margin: "0 0 12px 0", 
            color: "var(--black)",
            fontSize: "32px",
            fontWeight: 700
          }}>
            🎓 RMP Game
          </h1>
          <p style={{ 
            textAlign: "center", 
            margin: "0 0 32px 0", 
            color: "var(--black)",
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
              color: "var(--black)"
            }}>
              Enter your name
            </label>
            <input
              placeholder="e.g., John Doe"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={32}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 0,
                fontSize: "16px",
                fontFamily: "inherit"
              }}
            />
          </div>

          <button
            disabled={!canStart}
            onClick={onStart}
            style={{
              width: "100%",
              padding: "14px 20px",
              background: canStart ? "var(--primary-blue)" : "var(--light-gray)",
              color: "var(--white)",
              border: "none",
              borderRadius: 30,
              fontSize: "16px",
              fontWeight: 600,
              cursor: canStart ? "pointer" : "not-allowed",
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
