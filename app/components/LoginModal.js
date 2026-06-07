"use client";

import { useState } from "react";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const success = await onLogin(password);
    if (success) {
      setPassword("");
      onClose();
    } else {
      setError("Incorrect admin credentials");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <h3>Admin Panel Access</h3>
        {error && <p style={{ color: "#dc3545", fontSize: "0.75rem", marginBottom: "1rem" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Verification Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setPassword("");
                setError("");
                onClose();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
