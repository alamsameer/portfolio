"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import TimelineDrawer from "./components/TimelineDrawer";
import LoginModal from "./components/LoginModal";

export default function Home() {
  // --- UI Layout State ---
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // --- Dynamic Data State ---
  const [projects, setProjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [drawerUpdates, setDrawerUpdates] = useState([]);
  const [loadingDrawerUpdates, setLoadingDrawerUpdates] = useState(false);

  // Load Admin auth and fetch page data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPwd = sessionStorage.getItem("admin_password");
      if (storedPwd) {
        setIsAdmin(true);
      }
    }
    fetchProjects();
    fetchTopics();
  }, []);

  // Fetch drawer activity logs whenever drawer is opened
  useEffect(() => {
    if (isDrawerOpen) {
      fetchDrawerUpdates();
    }
  }, [isDrawerOpen]);

  // --- API Handlers ---
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTopics = async () => {
    try {
      const res = await fetch("/api/topics");
      if (!res.ok) throw new Error("Failed to fetch skills");
      const data = await res.json();
      setTopics(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDrawerUpdates = async () => {
    setLoadingDrawerUpdates(true);
    try {
      const res = await fetch("/api/updates?limitDays=7");
      if (!res.ok) throw new Error("Failed to fetch timeline logs");
      const data = await res.json();
      setDrawerUpdates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDrawerUpdates(false);
    }
  };

  // --- Auth Handlers ---
  const handleLogin = async (password) => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAdmin(true);
        sessionStorage.setItem("admin_password", password);
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("admin_password");
  };

  // --- Project Add/Delete CRUD ---
  const handleAddProject = async (payload) => {
    const pwd = sessionStorage.getItem("admin_password");
    if (!pwd) return false;

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: pwd,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchProjects();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project card?")) return;
    const pwd = sessionStorage.getItem("admin_password");
    if (!pwd) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: pwd },
      });

      if (res.ok) {
        fetchProjects();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to delete project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- Update Add/Delete CRUD ---
  const handleAddUpdate = async (payload) => {
    const pwd = sessionStorage.getItem("admin_password");
    if (!pwd) return false;

    try {
      const res = await fetch("/api/updates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: pwd,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchDrawerUpdates();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const handleDeleteUpdate = async (id) => {
    if (!confirm("Are you sure you want to delete this activity log?")) return;
    const pwd = sessionStorage.getItem("admin_password");
    if (!pwd) return;

    try {
      const res = await fetch(`/api/updates/${id}`, {
        method: "DELETE",
        headers: { Authorization: pwd },
      });

      if (res.ok) {
        fetchDrawerUpdates();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to delete update");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- Topic/Skill Add/Delete CRUD ---
  const handleAddTopic = async (payload) => {
    const pwd = sessionStorage.getItem("admin_password");
    if (!pwd) return false;

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: pwd,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchTopics();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const handleDeleteTopic = async (id) => {
    if (!confirm("Are you sure you want to delete this skill track and all its learning logs?")) return;
    const pwd = sessionStorage.getItem("admin_password");
    if (!pwd) return;

    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "DELETE",
        headers: { Authorization: pwd },
      });

      if (res.ok) {
        fetchTopics();
        fetchDrawerUpdates();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to delete skill");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Aggregate all unique tags from active projects to suggest to the admin
  const existingTags = Array.from(
    new Set(projects.flatMap((p) => p.tags || []))
  );

  return (
    <>
      <Navbar onTimelineToggle={() => setIsDrawerOpen(true)} />
      
      <Hero />

      <Projects
        projects={projects}
        isAdmin={isAdmin}
        onDeleteProject={handleDeleteProject}
      />

      <TimelineDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        updates={drawerUpdates}
        loading={loadingDrawerUpdates}
        isAdmin={isAdmin}
        topics={topics}
        existingTags={existingTags}
        onAddProject={handleAddProject}
        onAddUpdate={handleAddUpdate}
        onAddTopic={handleAddTopic}
        onDeleteTopic={handleDeleteTopic}
        onDeleteUpdate={handleDeleteUpdate}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Footer Start */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Sameer Alam. All rights reserved.</p>
        <div>
          {isAdmin ? (
            <button className="admin-trigger" onClick={handleLogout}>
              Logout Admin
            </button>
          ) : (
            <button className="admin-trigger" onClick={() => setShowLoginModal(true)}>
              Admin Access
            </button>
          )}
        </div>
      </footer>
    </>
  );
}
