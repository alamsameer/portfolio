"use client";

export default function Navbar({ onTimelineToggle }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#" className="logo-text">
          Sameer<span>Alam</span>
        </a>
      </div>
      <div className="nav-actions">
        <button className="pill-btn" onClick={onTimelineToggle}>
          Timeline <i className="fas fa-history"></i>
        </button>
      </div>
    </nav>
  );
}
