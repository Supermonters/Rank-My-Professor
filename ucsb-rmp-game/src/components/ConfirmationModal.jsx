import React from "react";

/* VISUAL STYLE APPLIED - See src/index.css for design documentation
   - All colors use CSS variables (--white, --light-gray, --primary-blue, --dark-blue, --black)
   - Primary buttons: var(--primary-blue) background with var(--dark-blue) on hover
   - Secondary buttons: var(--light-gray) background with var(--primary-blue) border/text, var(--dark-blue) fill on hover
   - Modal: dark overlay with var(--white) centered card on var(--light-gray) background
*/

export default function ConfirmationModal({ message, onConfirm, onCancel }) {
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
        background: "var(--white)",
        padding: 40,
        borderRadius: 0,
        width: 400,
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        color: "var(--black)"
      }}>
        <h2 style={{ margin: "0 0 16px 0", color: "var(--black)", fontSize: "20px" }}>Confirm</h2>
        <p style={{ margin: "0 0 24px 0", color: "var(--black)", fontSize: "16px" }}>{message}</p>
        
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button 
            onClick={onConfirm}
            style={{ 
              padding: "12px 24px",
              fontSize: "15px",
              background: "var(--primary-blue)",
              color: "var(--white)",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Yes
          </button>
          <button 
            onClick={onCancel}
            style={{ 
              padding: "12px 24px",
              fontSize: "15px",
              background: "var(--light-gray)",
              color: "var(--primary-blue)",
              border: "1px solid var(--primary-blue)",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "bold",
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
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
