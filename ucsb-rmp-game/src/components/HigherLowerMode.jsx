import React from "react";

export default function HigherLowerMode({ leftProf, rightProf, onChoose, onExit, score }) {
  if (!leftProf || !rightProf) return null;

  // Get 3 random comments for each professor
  const getRandomComments = (prof) => {
    if (!prof.ratings || prof.ratings.length === 0) return [];
    const shuffled = [...prof.ratings].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const leftComments = getRandomComments(leftProf);
  const rightComments = getRandomComments(rightProf);

  const ProfessorCard = ({ prof, comments, position }) => (
      <div style={{ flex: 1 }}>
      <div style={{
        background: "#ffffff",
        borderRadius: 0,
        padding: 24,
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}>
        <h3 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: 700, color: "#333333" }}>
          {prof.name}
        </h3>
        <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#666666" }}>
          {prof.department}
        </p>

        <div style={{
          background: "#f5f5f5",
          padding: 12,
          borderRadius: 0,
          marginBottom: 16
        }}>
          <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#666666" }}>Current Rating</p>
          <p style={{ margin: 0, fontSize: "24px", fontWeight: 700, color: "#0066cc" }}>
            {prof.rating.toFixed(1)} ⭐
          </p>
        </div>

        <h4 style={{ margin: "0 0 12px 0", fontSize: "13px", fontWeight: 600, color: "#333333" }}>
          Recent Reviews:
        </h4>

        <div style={{ flex: 1, overflowY: "auto", paddingRight: 8 }}>
          {comments.length > 0 ? (
            comments.map((comment, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 12,
                  padding: 10,
                  borderRadius: 0,
                  fontSize: "12px",
                  background: "#fafafa"
                }}
              >
                <p style={{ margin: "0 0 6px 0", fontStyle: "italic", color: "#333333" }}>
                  "{comment.comment}"
                </p>
                <div style={{ fontSize: "11px", color: "#999", marginTop: 6, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span>📚 {comment.class}</span>
                  <span>|</span>
                  <span>Grade: {comment.grade}</span>
                  <span>|</span>
                  <span>Clarity: {comment.clarityRating}</span>
                  <span>|</span>
                  <span>Difficulty: {comment.difficultyRating}</span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#999", fontSize: "13px" }}>No reviews available</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh", paddingBottom: 40, display: "flex", flexDirection: "column" }}>
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
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}>
        <button
          onClick={onExit}
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
        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 700, flex: 1, textAlign: "center" }}>Higher or Lower?</h2>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: 1200, margin: "0 auto", padding: "30px", paddingTop: 80, width: "100%", boxSizing: "border-box" }}>
        {/* Score - Top Left */}
        <div style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#333333",
          marginBottom: "20px"
        }}>
          Score: <span style={{ color: "#0066cc", fontSize: "18px" }}>{score}</span>
        </div>

        {/* Professors Comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 200px 1fr", gap: 20, alignItems: "flex-start", marginBottom: 30 }}>
          <ProfessorCard prof={leftProf} comments={leftComments} position="left" />

          {/* Buttons Center */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            justifyContent: "flex-start",
            paddingTop: 24
          }}>
            <button
              onClick={() => onChoose("higher")}
              style={{
                padding: "12px 16px",
                background: "#0066cc",
                color: "#ffffff",
                border: "none",
                borderRadius: 30,
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 600,
                transition: "all 0.2s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#003399";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#0066cc";
                e.target.style.transform = "scale(1)";
              }}
            >
              ⬆️ Higher
            </button>

            <button
              onClick={() => onChoose("lower")}
              style={{
                padding: "12px 16px",
                background: "#0066cc",
                color: "#ffffff",
                border: "none",
                borderRadius: 30,
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 600,
                transition: "all 0.2s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#003399";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#0066cc";
                e.target.style.transform = "scale(1)";
              }}
            >
              ⬇️ Lower
            </button>
          </div>

          <ProfessorCard prof={rightProf} comments={rightComments} position="right" />
        </div>
      </div>
    </div>
  );
}
