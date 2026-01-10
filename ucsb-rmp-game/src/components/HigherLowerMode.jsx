import React from "react";

export default function HigherLowerMode({ leftProf, rightProf, onChoose, onExit }) {
  if (!leftProf || !rightProf) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ width: "40%" }}>
        <h3>{leftProf.name}</h3>
        <p>{leftProf.course}</p>
        <p>Difficulty: {leftProf.difficulty}</p>
        <p>Tags: {leftProf.tags.join(", ")}</p>
      </div>

      <div style={{ width: "20%", textAlign: "center" }}>
        <button onClick={() => onChoose("higher")}>⬆ Higher</button>
        <br /><br />
        <button onClick={() => onChoose("lower")}>⬇ Lower</button>

        <div style={{ marginTop: 16 }}>
          <button onClick={onExit}>← Back to Modes</button>
        </div>
      </div>

      <div style={{ width: "40%" }}>
        <h3>{rightProf.name}</h3>
        <p>{rightProf.course}</p>
        <p>Difficulty: {rightProf.difficulty}</p>
        <p>Tags: {rightProf.tags.join(", ")}</p>
      </div>
    </div>
  );
}
