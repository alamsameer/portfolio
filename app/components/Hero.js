"use client";

export default function Hero() {
  return (
    <header className="hero">
      <h1 className="hero-title">Sameer Alam</h1>
      <div className="hero-grid">
        <div className="hero-col">
          <span className="col-label">YOU'LL LIKE IT:</span>
          <span className="col-content">
            A Data Engineer &amp; Full Stack Developer focused on building high-performance data processing pipelines and robust full-stack applications.
          </span>
        </div>

        <div className="hero-col">
          <span className="col-label">PROFILE DETAILS:</span>
          <span className="col-content">
            Building reliable backend systems, designing distributed storage solutions, and orchestrating ETL workflows using modern engineering practices.
          </span>
          <span className="availability">AVAILABLE</span>
        </div>

        <div className="hero-col">
          <span className="col-label">SOCIALS:</span>
          <div className="social-links">
            <a href="https://github.com/alamsameer" target="_blank" rel="noreferrer">
              GITHUB
            </a>
            <a href="https://www.linkedin.com/in/sameer-alam-37a2701b5/" target="_blank" rel="noreferrer">
              LINKEDIN
            </a>
            <a href="https://twitter.com/sameer_alam_" target="_blank" rel="noreferrer">
              X/TWITTER
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
