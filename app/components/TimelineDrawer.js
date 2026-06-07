"use client";

import AdminForms from "./AdminForms";

export default function TimelineDrawer({
  isOpen,
  onClose,
  updates,
  loading,
  isAdmin,
  topics,
  existingTags,
  onAddProject,
  onAddUpdate,
  onAddTopic,
  onDeleteTopic,
  onDeleteUpdate
}) {
  return (
    <>
      {isOpen && <div className="drawer-backdrop" onClick={onClose} />}

      <div className={`timeline-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Activity Log (Last 7 Days)</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="drawer-body">
          {loading ? (
            <p style={{ fontStyle: "italic", fontSize: "0.85rem", color: "rgba(0,0,0,0.5)" }}>
              Loading updates...
            </p>
          ) : updates.length === 0 ? (
            <p style={{ fontStyle: "italic", fontSize: "0.85rem", color: "rgba(0,0,0,0.4)" }}>
              No updates recorded in the last 7 days.
            </p>
          ) : (
            <div className="timeline-container">
              <div className="timeline-line"></div>
              {updates.map((upd) => (
                <div className="timeline-item" key={upd.id}>
                  <div className="timeline-badge" />
                  <div className="timeline-card">
                    <div className="card-header">
                      <h4>
                        {upd.tag === "learning" && upd.day_number ? `D${upd.day_number}: ` : ""}
                        {upd.title}
                      </h4>
                      <span className="date">
                        {upd.update_date
                          ? new Date(upd.update_date).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric"
                            })
                          : "Today"}
                      </span>
                    </div>
                    <div className="card-body">{upd.content}</div>

                    <div className="card-tags">
                      <span className={`badge-tag tag-${upd.tag}`}>{upd.tag}</span>
                      {upd.tag === "learning" && upd.topic_title && (
                        <span className="badge-tag tag-learning">{upd.topic_title}</span>
                      )}

                      {isAdmin && (
                        <button
                          className="btn-icon-del"
                          style={{ marginLeft: "auto" }}
                          onClick={() => onDeleteUpdate(upd.id)}
                          title="Delete log"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Admin forms render only inside drawer if authorized */}
          {isAdmin && (
            <AdminForms
              topics={topics}
              existingTags={existingTags}
              onAddProject={onAddProject}
              onAddUpdate={onAddUpdate}
              onAddTopic={onAddTopic}
              onDeleteTopic={onDeleteTopic}
            />
          )}
        </div>
      </div>
    </>
  );
}
