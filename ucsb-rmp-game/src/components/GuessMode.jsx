import React, { useState, useMemo, useEffect } from "react";

export default function GuessMode({ prof, onGuess, onExit, score, difficulty }) {
  const [guess, setGuess] = useState(2.5);
  const [submitted, setSubmitted] = useState(false);
  const [fillPercentage, setFillPercentage] = useState(0);

  if (!prof) return null;

  const comments = useMemo(() => {
    if (!prof.ratings || prof.ratings.length === 0) return [];
    const shuffled = [...prof.ratings].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [prof]);

  // Animate the green bar fill on submit
  useEffect(() => {
    if (submitted) {
      let currentFill = 0;
      const targetFill = (prof.rating / 5) * 100;
      const interval = setInterval(() => {
        currentFill += (targetFill / 50); // 50 steps for smooth animation
        if (currentFill >= targetFill) {
          currentFill = targetFill;
          clearInterval(interval);
        }
        setFillPercentage(currentFill);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [submitted, prof.rating]);

  // Reset form when new professor is loaded
  useEffect(() => {
    setSubmitted(false);
    setGuess(2.5);
    setFillPercentage(0);
  }, [prof.id]);

  const handleSubmit = () => {
    setSubmitted(true);
    // Wait for animation (1.5s) + 2 seconds before moving to next question
    setTimeout(() => {
      onGuess(parseFloat(guess));
    }, 3500);
  };

  return (
    <div style={{ background: "var(--light-gray)", minHeight: "100vh", paddingBottom: 40, display: "flex", flexDirection: "column" }}>
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
          onClick={onExit}
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
        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 700, flex: 1, textAlign: "center" }}>Guess the Rating</h2>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: 1200, margin: "0 auto", padding: "30px", paddingTop: 80, width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
          {/* Score - Left Aligned */}
          <div style={{
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--black)",
              marginBottom: "20px"
            }}>
              Score: <span style={{ color: "var(--primary-blue)", fontSize: "18px" }}>{score}</span>
            </div>

            {/* Professor Info & Reviews */}
            <div style={{
              background: "var(--white)",
              borderRadius: 0,
              padding: 24
            }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "24px", fontWeight: 700, color: "var(--black)" }}>
              {prof.name}
            </h3>
            <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "var(--black)" }}>
              Department: {prof.department}
            </p>
            
           

            <h4 style={{ margin: "0 0 16px 0", fontSize: "14px", fontWeight: 600, color: "var(--black)" }}>
              Student Reviews
            </h4>
            <div style={{ maxHeight: "450px", overflowY: "auto", paddingRight: 8 }}>
              {comments.map((comment, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: 16,
                    padding: 12,
                    borderRadius: 0,
                    fontSize: "13px",
                    background: "var(--light-gray)"
                  }}
                >
                  <p style={{ margin: "0 0 8px 0", fontStyle: "italic", color: "var(--black)", lineHeight: "1.5" }}>
                    "{comment.comment}"
                  </p>
                  <div style={{
                    fontSize: "12px",
                    color: "var(--black)",
                    margin: "8px 0 0 0"
                  }}>
                    <span style={{ marginRight: 12 }}>📚 {comment.class}</span>
                    {difficulty !== "hard" && <span>Grade: {comment.grade}</span>}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--black)", marginTop: 4 }}>
                    {difficulty === "easy" && (
                      <>
                        <span style={{ marginRight: 12 }}>
                          💡 Clarity: {comment.clarityRating}/5
                        </span>
                        <span style={{ marginRight: 12 }}>
                          📊 Difficulty: {comment.difficultyRating}/5
                        </span>
                        <span>👍 Helpful: {comment.helpfulRating}/5</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* Guess Input */}
          <div style={{
            background: "var(--white)",
            borderRadius: 0,
            padding: 24,
            display: "flex",
            flexDirection: "column"
          }}>
            <h3 style={{ margin: "0 0 24px 0", fontSize: "24px", fontWeight: 700, color: "var(--black)" }}>
              What's the rating?
            </h3>

            <div style={{ flex: 1 }}>
              <div style={{
                background: "var(--light-gray)",
                padding: 24,
                borderRadius: 0,
                textAlign: "center",
                marginBottom: 24
              }}>
                <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "var(--black)" }}>Your Guess</p>
                <p style={{
                  margin: 0,
                  fontSize: "48px",
                  fontWeight: 700,
                  color: "var(--primary-blue)"
                }}>
                  {parseFloat(guess).toFixed(1)}
                </p>
                <p style={{ margin: "8px 0 0 0", fontSize: "18px", color: "var(--yellow)" }}>
                  {"⭐".repeat(Math.floor(parseFloat(guess)))}
                </p>
              </div>

              {/* Animated green bar showing correct rating */}
              {submitted && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{
                    background: "#f5f5f5",
                    padding: 24,
                    borderRadius: 0,
                    marginBottom: 24
                  }}>
                    <p style={{ margin: "0 0 12px 0", fontSize: "12px", color: "#666666" }}>Correct Rating</p>
                    <div style={{
                      position: "relative",
                      width: "100%",
                      height: 40,
                      background: "#e0e0e0",
                      borderRadius: 4,
                      overflow: "hidden"
                    }}>
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          height: "100%",
                          background: "#4caf50",
                          width: `${fillPercentage}%`,
                          transition: "width 0.03s linear",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          paddingRight: 12,
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "#ffffff"
                        }}
                      >
                        {fillPercentage > 10 && `${prof.rating.toFixed(1)}`}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <label style={{
                display: "block",
                marginBottom: 16,
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--black)"
              }}>
                Adjust Rating
              </label>

              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                disabled={submitted}
                style={{
                  width: "100%",
                  height: 6,
                  cursor: "pointer",
                  background: "var(--light-gray)",
                  borderRadius: 3,
                  WebkitAppearance: "none",
                  appearance: "none",
                  opacity: submitted ? 0.5 : 1
                }}
              />
              <style>{`
                input[type="range"]::-webkit-slider-thumb {
                  appearance: none;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: var(--primary-blue);
                  cursor: pointer;
                  box-shadow: 0 2px 4px rgba(0, 85, 253, 0.3);
                }
                input[type="range"]::-moz-range-thumb {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: var(--primary-blue);
                  cursor: pointer;
                  border: none;
                  box-shadow: 0 2px 4px rgba(0, 85, 253, 0.3);
                }
              `}</style>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "var(--black)",
                marginTop: 8,
                marginBottom: 24
              }}>
                <span>1</span>
                <span>5</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={handleSubmit}
                disabled={submitted}
                style={{
                  flex: 1,
                  padding: "14px 20px",
                  background: "var(--primary-blue)",
                  color: "var(--white)",
                  border: "none",
                  borderRadius: 30,
                  cursor: submitted ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  fontWeight: 600,
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "var(--dark-blue)"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "var(--primary-blue)"}
              >
                {submitted ? "Submitted" : "Submit Answer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







