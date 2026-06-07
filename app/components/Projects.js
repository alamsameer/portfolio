"use client";

import { useEffect, useRef } from "react";

export default function Projects({ projects, isAdmin, onDeleteProject }) {
  const videoRefs = useRef([]);

  // Setup observer for each video
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play().catch(() => {});
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentVideos = videoRefs.current;
    currentVideos.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      currentVideos.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [projects]);

  return (
    <section className="projects">
      <div className="section-header">
        <span className="section-label">• FEATURED PROJECTS:</span>
        <i className="fas fa-arrow-down"></i>
      </div>

      <div className="project-container">
        {projects.map((project, idx) => (
          <div className="project" key={project.id || idx}>
            <div className="project-media-box">
              {project.video_src ? (
                <video
                  muted
                  autoPlay
                  playsInline
                  loop
                  ref={(el) => (videoRefs.current[idx] = el)}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                >
                  <source src={project.video_src} type="video/mp4" />
                </video>
              ) : project.image_src ? (
                <img
                  src={project.image_src}
                  alt={project.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <i
                    className="fas fa-project-diagram"
                    style={{ fontSize: "3rem", color: "rgba(0,0,0,0.15)" }}
                  ></i>
                </div>
              )}
            </div>

            <div className="project-meta-row">
              <span className="project-title">{project.name}</span>
              <span className="project-year">{project.year}</span>
            </div>

            <p className="project-desc">{project.description}</p>

            <div className="project-footer">
              <div className="tech-tags">
                {project.tags &&
                  project.tags.map((t, i) => (
                    <span className="tech-tag" key={i}>
                      {t}
                    </span>
                  ))}
              </div>
              <div className="project-links">
                {isAdmin && (
                  <button
                    className="btn-icon-del"
                    style={{ marginRight: "1rem" }}
                    onClick={() => onDeleteProject(project.id)}
                    title="Delete Project Card"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                )}
                {project.project_link && (
                  <a href={project.project_link} target="_blank" rel="noreferrer" title="Live Link">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                )}
                {project.github_link && (
                  <a href={project.github_link} target="_blank" rel="noreferrer" title="Github Code">
                    <i className="fab fa-github"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
