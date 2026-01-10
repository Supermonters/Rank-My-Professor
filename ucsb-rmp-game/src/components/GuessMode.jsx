import React from "react";

export default function GuessMode({ prof, onGuess, onExit }) {
  if (!prof) return null;

  return (
    <div style={{ display: "flex", gap: 30 }}>
      <div style={{ width: "50%" }}>
        <h3>{prof.name}</h3>
        <p>{prof.department} – {prof.course}</p>
        <p><b>Difficulty:</b> {prof.difficulty}</p>
        <p><b>Tags:</b> {prof.tags.join(", ")}</p>
        <ul>
          {[...prof.comments]
            .sort(() => 0.5 - Math.random())
            .slice(0, 6)
            .map((c, i) => (
              <li key={i}>{c}</li>
            ))}
        </ul>
      </div>

      <div style={{ width: "50%" }}>
        <h3>Guess the Rating</h3>
        {[1, 2, 3, 4, 5].map((r) => (
          <button key={r} onClick={() => onGuess(r)} style={{ marginRight: 6 }}>
            {r}
          </button>
        ))}

        <div style={{ marginTop: 16 }}>
          <button onClick={onExit}>← Back to Modes</button>
        </div>
      </div>
    </div>
  );
}
