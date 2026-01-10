import React, { useState, useMemo } from "react";

export default function GuessMode({ prof, onGuess, onExit }) {
  const [guess, setGuess] = useState(2.5);

  if (!prof) return null;

  const comments = useMemo(() => {
    if (!prof.ratings || prof.ratings.length === 0) return [];
    const shuffled = [...prof.ratings].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [prof]);

  const handleSubmit = () => {
    onGuess(parseFloat(guess));
  };

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0066cc 0%, #003399 100%)",
        color: "#ffffff",
        padding: "30px",
        borderBottom: "1px solid #e0e0e0"
      }}>
        <h2 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>Guess the Rating</h2>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
          {/* Professor Info & Reviews */}
          <div style={{
            background: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: 8,
            padding: 24
          }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "24px", fontWeight: 700, color: "#333333" }}>
              {prof.name}
            </h3>
            <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#666666" }}>
              Department: {prof.department}
            </p>
            
           

            <h4 style={{ margin: "0 0 16px 0", fontSize: "14px", fontWeight: 600, color: "#333333" }}>
              Student Reviews
            </h4>
            <div style={{ maxHeight: "450px", overflowY: "auto", paddingRight: 8 }}>
              {comments.map((comment, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: 16,
                    padding: 12,
                    border: "1px solid #e0e0e0",
                    borderRadius: 6,
                    fontSize: "13px",
                    background: "#fafafa"
                  }}
                >
                  <p style={{ margin: "0 0 8px 0", fontStyle: "italic", color: "#333333", lineHeight: "1.5" }}>
                    "{comment.comment}"
                  </p>
                  <div style={{
                    fontSize: "12px",
                    color: "#666666",
                    margin: "8px 0 0 0"
                  }}>
                    <span style={{ marginRight: 12 }}>📚 {comment.class}</span>
                    <span>Grade: {comment.grade}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#666666", marginTop: 4 }}>
                    <span style={{ marginRight: 12 }}>
                      💡 Clarity: {comment.clarityRating}/5
                    </span>
                    <span style={{ marginRight: 12 }}>
                      📊 Difficulty: {comment.difficultyRating}/5
                    </span>
                    <span>👍 Helpful: {comment.helpfulRating}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guess Input */}
          <div style={{
            background: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: 8,
            padding: 24,
            display: "flex",
            flexDirection: "column"
          }}>
            <h3 style={{ margin: "0 0 24px 0", fontSize: "24px", fontWeight: 700, color: "#333333" }}>
              What's the rating?
            </h3>

            <div style={{ flex: 1 }}>
              <div style={{
                background: "#f5f5f5",
                padding: 24,
                borderRadius: 8,
                textAlign: "center",
                marginBottom: 24,
                borderLeft: "4px solid #ffc107"
              }}>
                <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#666666" }}>Your Guess</p>
                <p style={{
                  margin: 0,
                  fontSize: "48px",
                  fontWeight: 700,
                  color: "#0066cc"
                }}>
                  {parseFloat(guess).toFixed(1)}
                </p>
                <p style={{ margin: "8px 0 0 0", fontSize: "18px", color: "#ffc107" }}>
                  {"⭐".repeat(Math.round(parseFloat(guess)))}
                </p>
              </div>

              <label style={{
                display: "block",
                marginBottom: 16,
                fontSize: "14px",
                fontWeight: 600,
                color: "#333333"
              }}>
                Adjust Rating
              </label>

              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                style={{
                  width: "100%",
                  height: 6,
                  cursor: "pointer",
                  background: "#e0e0e0",
                  borderRadius: 3,
                  WebkitAppearance: "none",
                  appearance: "none"
                }}
              />
              <style>{`
                input[type="range"]::-webkit-slider-thumb {
                  appearance: none;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #0066cc;
                  cursor: pointer;
                  box-shadow: 0 2px 4px rgba(0, 102, 204, 0.3);
                }
                input[type="range"]::-moz-range-thumb {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #0066cc;
                  cursor: pointer;
                  border: none;
                  box-shadow: 0 2px 4px rgba(0, 102, 204, 0.3);
                }
              `}</style>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "#666666",
                marginTop: 8,
                marginBottom: 24
              }}>
                <span>0</span>
                <span>5</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={handleSubmit}
                style={{
                  flex: 1,
                  padding: "14px 20px",
                  background: "#0066cc",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: 600,
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#003399"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}
              >
                Submit Answer
              </button>
              <button
                onClick={onExit}
                style={{
                  padding: "14px 20px",
                  background: "#f5f5f5",
                  color: "#333333",
                  border: "1px solid #e0e0e0",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: 600,
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#eeeeee"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#f5f5f5"}
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
