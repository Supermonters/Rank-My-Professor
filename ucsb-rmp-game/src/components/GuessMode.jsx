/*
  VISUAL STYLE (canonical)

  - See `src/index.css` for the source-of-truth palette and utility classes.
  - Use CSS variables (e.g. `var(--primary-blue)`) — do not add hex literals.
  - Use `.btn-primary` and `.btn-secondary` for consistent button behavior when possible.
  - Inline styles may reference variables: `style={{ background: 'var(--primary-blue)' }}`.
*/

import React, { useState, useMemo, useEffect, useRef } from "react";

export default function GuessMode({ prof, onGuess, onExit, score, difficulty, mode }) {
  const [guess, setGuess] = useState(3.0);
  const [submitted, setSubmitted] = useState(false);
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const canvasRef = useRef(null);
  const shakeElementRef = useRef(null);
  const submittedProfIdRef = useRef(null);

  if (!prof) return null;

  const comments = useMemo(() => {
    if (!prof.ratings || prof.ratings.length === 0) return [];
    const shuffled = [...prof.ratings].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
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

  // Check if answer is correct and trigger effects
  useEffect(() => {
    if (submitted && submittedProfIdRef.current === prof.id) {
      const difference = Math.abs(parseFloat(guess) - prof.rating);
      const correct = difference <= 0.5;
      
      if (correct) {
        setIsCorrect(true);
        setIsIncorrect(false);
        playSuccessSound();
        createConfetti();
      } else {
        setIsIncorrect(true);
        setIsCorrect(false);
        playErrorSound();
        shakeElement();
        setTimeout(() => {
          setIsIncorrect(false);
        }, 1500);
      }
    }
  }, [submitted, guess, prof.rating, prof.id, mode]);

  // Reset form when new professor is loaded
  useEffect(() => {
    setSubmitted(false);
    setGuess(3.0);
    setFillPercentage(0);
    setIsCorrect(false);
    setIsIncorrect(false);
    submittedProfIdRef.current = null;
  }, [prof.id]);

  const playSuccessSound = () => {
    // Create a simple success sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Create a cheerful ascending arpeggio
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.value = freq;
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0.3, now + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.2);
      
      osc.start(now + index * 0.1);
      osc.stop(now + index * 0.1 + 0.2);
    });
  };

  const playErrorSound = () => {
    // Create an error sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Create a descending buzzer
    const notes = [349.23, 293.66]; // F4, D4
    notes.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.value = freq;
      osc.type = 'square';
      
      gain.gain.setValueAtTime(0.2, now + index * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.15 + 0.25);
      
      osc.start(now + index * 0.15);
      osc.stop(now + index * 0.15 + 0.25);
    });
  };

  const shakeElement = () => {
    if (!shakeElementRef.current) return;
    
    const element = shakeElementRef.current;
    let shakes = 0;
    const maxShakes = 6;
    
    const shake = () => {
      const offset = (shakes % 2) * 10 - 5;
      element.style.transform = `translateX(${offset}px)`;
      shakes++;
      
      if (shakes < maxShakes) {
        setTimeout(shake, 50);
      } else {
        element.style.transform = 'translateX(0)';
      }
    };
    
    shake();
  };

  const createConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const confetti = [];
    
    // Create confetti pieces
    for (let i = 0; i < 50; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 5 + 3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 8 + 4,
        color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][Math.floor(Math.random() * 5)]
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let hasConfetti = false;
      confetti.forEach((piece) => {
        if (piece.y < canvas.height) {
          hasConfetti = true;
          piece.x += piece.vx;
          piece.y += piece.vy;
          piece.vy += 0.1; // gravity
          piece.rotation += piece.rotationSpeed;
          
          ctx.save();
          ctx.translate(piece.x, piece.y);
          ctx.rotate(piece.rotation);
          ctx.fillStyle = piece.color;
          ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
          ctx.restore();
        }
      });
      
      if (hasConfetti) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    submittedProfIdRef.current = prof.id;
    const difference = Math.abs(parseFloat(guess) - prof.rating);
    const isCorrectAnswer = difference <= 0.5;
    
    // For correct answers: 1500ms delay
    // For incorrect answers: 1500ms for message + 500ms delay = 2000ms total
    const delay = isCorrectAnswer ? 1500 : 2000;
    
    setTimeout(() => {
      onGuess(parseFloat(guess));
    }, delay);
  };

  return (
    <div style={{ background: "var(--light-gray)", minHeight: "100vh", paddingBottom: 40, display: "flex", flexDirection: "column" }}>
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 999
        }}
        width={typeof window !== 'undefined' ? window.innerWidth : 0}
        height={typeof window !== 'undefined' ? window.innerHeight : 0}
      />

      {/* Success Message Overlay */}
      {isCorrect && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "var(--green)",
          color: "var(--white)",
          padding: "30px 60px",
          borderRadius: 12,
          fontSize: "32px",
          fontWeight: 700,
          zIndex: 1001,
          animation: "scaleIn 0.3s ease-out",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)"
        }}>
          ✨ Correct! ✨
          <style>{`
            @keyframes scaleIn {
              from {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 0;
              }
              to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}

      {/* Incorrect Message Overlay */}
      {isIncorrect && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "var(--red)",
          color: "var(--white)",
          padding: "30px 60px",
          borderRadius: 12,
          fontSize: "32px",
          fontWeight: 700,
          zIndex: 1001,
          animation: "scaleIn 0.3s ease-out",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)"
        }}>
          ✗ Incorrect! ✗
          <style>{`
            @keyframes scaleIn {
              from {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 0;
              }
              to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}

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
      <div ref={shakeElementRef} style={{ flex: 1, maxWidth: 1200, margin: "0 auto", padding: "30px", paddingTop: 80, width: "100%", boxSizing: "border-box", transition: "transform 0.05s linear" }}>
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
                    background: "var(--light-gray)",
                    padding: 24,
                    borderRadius: 0,
                    marginBottom: 24
                  }}>
                    <p style={{ margin: "0 0 12px 0", fontSize: "12px", color: "var(--black)" }}>Correct Rating</p>
                    <div style={{
                      position: "relative",
                      width: "100%",
                      height: 40,
                      background: "var(--light-gray)",
                      borderRadius: 4,
                      overflow: "hidden"
                    }}>
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          height: "100%",
                          background: "var(--green)",
                          width: `${fillPercentage}%`,
                          transition: "width 0.03s linear",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          paddingRight: 12,
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "var(--white)"
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
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "var(--dark-blue)";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "var(--primary-blue)";
                  e.target.style.transform = "scale(1)";
                }}
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







