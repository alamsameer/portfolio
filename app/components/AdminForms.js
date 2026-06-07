"use client";

import { useState } from "react";

export default function AdminForms({
  topics,
  existingTags,
  onAddProject,
  onAddUpdate,
  onAddTopic,
  onDeleteTopic
}) {
  // --- Project Form State ---
  const [projName, setProjName] = useState("");
  const [projYear, setProjYear] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projLink, setProjLink] = useState("");
  const [projGithub, setProjGithub] = useState("");
  const [projImage, setProjImage] = useState("");
  const [projVideo, setProjVideo] = useState("");
  const [projTags, setProjTags] = useState([]);
  const [customTagInput, setCustomTagInput] = useState("");
  const [projectError, setProjectError] = useState("");
  const [projectSuccess, setProjectSuccess] = useState("");

  // --- Update Form State ---
  const [updTag, setUpdTag] = useState("learning"); // 'learning' or 'thought'
  const [updTopicId, setUpdTopicId] = useState(topics[0]?.id?.toString() || "");
  const [updDay, setUpdDay] = useState("");
  const [updTitle, setUpdTitle] = useState("");
  const [updContent, setUpdContent] = useState("");
  const [updDate, setUpdDate] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  // --- Topic/Skill Form State ---
  const [skillTitle, setSkillTitle] = useState("");
  const [skillDesc, setSkillDesc] = useState("");
  const [skillStatus, setSkillStatus] = useState("in-progress");
  const [skillError, setSkillError] = useState("");
  const [skillSuccess, setSkillSuccess] = useState("");

  // Project Tags Helpers
  const handleToggleTag = (tag) => {
    if (projTags.includes(tag)) {
      setProjTags(projTags.filter((t) => t !== tag));
    } else {
      setProjTags([...projTags, tag]);
    }
  };

  const handleAddCustomTag = (e) => {
    e.preventDefault();
    const clean = customTagInput.trim();
    if (clean && !projTags.includes(clean)) {
      setProjTags([...projTags, clean]);
    }
    setCustomTagInput("");
  };

  // Submit Handlers
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setProjectError("");
    setProjectSuccess("");
    if (!projName || !projDesc) {
      setProjectError("Project name and description are required.");
      return;
    }

    const payload = {
      name: projName,
      year: projYear,
      description: projDesc,
      projectLink: projLink,
      githubLink: projGithub,
      imageSrc: projImage,
      videoSrc: projVideo,
      tags: projTags
    };

    const success = await onAddProject(payload);
    if (success) {
      setProjectSuccess("Project added successfully!");
      setProjName("");
      setProjYear("");
      setProjDesc("");
      setProjLink("");
      setProjGithub("");
      setProjImage("");
      setProjVideo("");
      setProjTags([]);
    } else {
      setProjectError("Failed to save project.");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateError("");
    setUpdateSuccess("");

    if (updTag === "learning" && !updTopicId) {
      setUpdateError("Please select an active skill for the learning log.");
      return;
    }

    const payload = {
      tag: updTag,
      title: updTitle,
      content: updContent,
      date: updDate || undefined,
      topicId: updTag === "learning" ? parseInt(updTopicId) : null,
      dayNumber: updTag === "learning" && updDay ? parseInt(updDay) : null
    };

    const success = await onAddUpdate(payload);
    if (success) {
      setUpdateSuccess("Log update posted!");
      setUpdTitle("");
      setUpdContent("");
      setUpdDay("");
      setUpdDate("");
    } else {
      setUpdateError("Failed to post update.");
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setSkillError("");
    setSkillSuccess("");

    const payload = {
      title: skillTitle,
      description: skillDesc,
      status: skillStatus
    };

    const success = await onAddTopic(payload);
    if (success) {
      setSkillSuccess("Skill track created!");
      setSkillTitle("");
      setSkillDesc("");
      setSkillStatus("in-progress");
    } else {
      setSkillError("Failed to save skill.");
    }
  };

  return (
    <div className="drawer-admin-box">
      
      {/* 1. Post Log Update Form */}
      <div style={{ marginBottom: "2rem" }}>
        <h4>Post Activity Log</h4>
        {updateError && <p style={{ color: "#dc3545", fontSize: "0.75rem", marginBottom: "0.8rem" }}>{updateError}</p>}
        {updateSuccess && <p style={{ color: "#28a745", fontSize: "0.75rem", marginBottom: "0.8rem" }}>{updateSuccess}</p>}
        <form onSubmit={handleUpdateSubmit}>
          <div className="form-group">
            <label>Log Type</label>
            <select value={updTag} onChange={(e) => setUpdTag(e.target.value)}>
              <option value="learning">Learning Log (Tied to Skill)</option>
              <option value="thought">General Thought (Global Tag)</option>
            </select>
          </div>

          {updTag === "learning" && (
            <div className="form-row">
              <div className="form-group">
                <label>Target Skill</label>
                <select
                  value={updTopicId}
                  onChange={(e) => setUpdTopicId(e.target.value)}
                  required
                >
                  <option value="">-- Choose Skill --</option>
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Day Number</label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 1"
                  value={updDay}
                  onChange={(e) => setUpdDay(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Log Title</label>
              <input
                type="text"
                placeholder="e.g. Docker multi-stage builds"
                value={updTitle}
                onChange={(e) => setUpdTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Log Date (Optional)</label>
              <input type="date" value={updDate} onChange={(e) => setUpdDate(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>Learnings &amp; Thoughts</label>
            <textarea
              placeholder="What did you learn or write today?"
              value={updContent}
              onChange={(e) => setUpdContent(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Post Log Update
          </button>
        </form>
      </div>

      {/* 2. Add Project Form */}
      <div style={{ marginBottom: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <h4>Add Portfolio Project</h4>
        {projectError && <p style={{ color: "#dc3545", fontSize: "0.75rem", marginBottom: "0.8rem" }}>{projectError}</p>}
        {projectSuccess && <p style={{ color: "#28a745", fontSize: "0.75rem", marginBottom: "0.8rem" }}>{projectSuccess}</p>}
        <form onSubmit={handleProjectSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Project Title</label>
              <input
                type="text"
                placeholder="e.g. ChronosDB"
                value={projName}
                onChange={(e) => setProjName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Completion Year</label>
              <input
                type="text"
                placeholder="e.g. 2026"
                value={projYear}
                onChange={(e) => setProjYear(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Project Description</label>
            <textarea
              placeholder="Provide a detailed summary of the architecture and goals..."
              value={projDesc}
              onChange={(e) => setProjDesc(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Live URL (Optional)</label>
              <input
                type="url"
                placeholder="https://..."
                value={projLink}
                onChange={(e) => setProjLink(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>GitHub Repository URL (Optional)</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={projGithub}
                onChange={(e) => setProjGithub(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Image URL (Optional)</label>
              <input
                type="text"
                placeholder="e.g. /images/proj.jpg"
                value={projImage}
                onChange={(e) => setProjImage(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Video URL (Optional)</label>
              <input
                type="text"
                placeholder="e.g. /shoppingify.mp4"
                value={projVideo}
                onChange={(e) => setProjVideo(e.target.value)}
              />
            </div>
          </div>

          {/* Technology Tags Field */}
          <div className="form-group">
            <label>Technology Tags</label>
            
            {/* Clickable pill select list from existing tags */}
            {existingTags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.8rem" }}>
                {existingTags.map((tag) => {
                  const selected = projTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleToggleTag(tag)}
                      style={{
                        fontSize: "0.65rem",
                        padding: "0.2rem 0.5rem",
                        border: "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "1rem",
                        cursor: "pointer",
                        backgroundColor: selected ? "#12868a" : "#ffffff",
                        color: selected ? "#ffffff" : "#000000"
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Custom tag addition */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                placeholder="Add custom tag..."
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                style={{
                  padding: "0 0.8rem",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.25rem",
                  cursor: "pointer"
                }}
              >
                +
              </button>
            </div>

            {/* List of currently selected project tags */}
            {projTags.length > 0 && (
              <div style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>
                <strong>Selected:</strong> {projTags.join(", ")}
              </div>
            )}
          </div>

          <button type="submit" className="btn-submit">
            Save Project
          </button>
        </form>
      </div>

      {/* 3. Manage Skills Forms */}
      <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <h4>Track New Skill Topic</h4>
        {skillError && <p style={{ color: "#dc3545", fontSize: "0.75rem", marginBottom: "0.8rem" }}>{skillError}</p>}
        {skillSuccess && <p style={{ color: "#28a745", fontSize: "0.75rem", marginBottom: "0.8rem" }}>{skillSuccess}</p>}
        <form onSubmit={handleSkillSubmit}>
          <div className="form-group">
            <label>Skill / Topic Title</label>
            <input
              type="text"
              placeholder="e.g. Distributed Database Systems"
              value={skillTitle}
              onChange={(e) => setSkillTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Learning Goal / Summary</label>
            <textarea
              placeholder="Describe what you plan to learn or build..."
              value={skillDesc}
              onChange={(e) => setSkillDesc(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={skillStatus} onChange={(e) => setSkillStatus(e.target.value)}>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
          </div>

          <button type="submit" className="btn-submit" style={{ backgroundColor: "#12868a" }}>
            Add Skill Track
          </button>
        </form>

        {/* Active Skill Deletion */}
        <div style={{ marginTop: "1.5rem" }}>
          <label className="form-group" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.7rem", fontWeight: "bold" }}>
            Delete Active Skill Tracks
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {topics.map((t) => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.8rem",
                  padding: "0.4rem",
                  backgroundColor: "#fff",
                  border: "1px solid rgba(0,0,0,0.05)"
                }}
              >
                <span>{t.title}</span>
                <button className="btn-icon-del" onClick={() => onDeleteTopic(t.id)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
