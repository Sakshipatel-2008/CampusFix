/* ==========================================================
   CampusFix — script.js
   Beginner-friendly, organized into clear sections.
   Everything is stored in the browser using localStorage,
   so there is no backend/server involved.
   ========================================================== */

/* ----------------------------------------------------------
   1. CONSTANTS & STATE
---------------------------------------------------------- */

// The name of the currently "logged in" student.
// (There is no real login system — this is a frontend-only demo.)
const CURRENT_STUDENT = "Sakshi";

// The key we use to save/read issues from localStorage.
const STORAGE_KEY = "campusfix_issues";

// This array holds the issues currently loaded in memory.
// It always mirrors what is saved in localStorage.
let issues = [];

// Keeps track of which status filter is active on the "My Issues" page.
let activeFilter = "all";

/* ----------------------------------------------------------
   2. LOCAL STORAGE FUNCTIONS
---------------------------------------------------------- */

// Reads issues from localStorage. If nothing is saved yet,
// it falls back to a starter set of sample issues.
function loadIssues() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    issues = JSON.parse(saved);
  } else {
    issues = getSampleIssues();
    saveIssues(); // save the sample data so it persists after refresh
  }
}

// Saves the current `issues` array to localStorage as a JSON string.
function saveIssues() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
}

// Sample issues used only the very first time the site is opened.
function getSampleIssues() {
  const now = Date.now();
  const HOUR = 60 * 60 * 1000;
  const DAY = 24 * HOUR;

  return [
    {
      id: now - 1,
      title: "Wi-Fi not working in Lab 2",
      category: "Internet",
      location: "Academic Block, Lab 2",
      description: "The Wi-Fi keeps disconnecting every few minutes.",
      priority: "High",
      status: "Pending",
      reportedBy: CURRENT_STUDENT,
      createdAt: now - 30 * 60 * 1000
    },
    {
      id: now - 2,
      title: "Broken fan in Room 204",
      category: "Electricity",
      location: "Academic Block, 2nd Floor",
      description: "One of the ceiling fans has stopped working completely.",
      priority: "Medium",
      status: "In Progress",
      reportedBy: "Rahul",
      createdAt: now - 2 * HOUR
    },
    {
      id: now - 3,
      title: "Water cooler not working",
      category: "Water",
      location: "Library, 1st Floor",
      description: "No water is coming out of the cooler near the entrance.",
      priority: "Medium",
      status: "Resolved",
      reportedBy: "Priya",
      createdAt: now - 1 * DAY
    },
    {
      id: now - 4,
      title: "Slow internet in Hostel Block C",
      category: "Internet",
      location: "Hostel Block C, Common Room",
      description: "Internet speed drops drastically after 8 PM.",
      priority: "Medium",
      status: "Pending",
      reportedBy: CURRENT_STUDENT,
      createdAt: now - 5 * HOUR
    },
    {
      id: now - 5,
      title: "Projector not turning on",
      category: "Classroom",
      location: "Academic Block, Room 310",
      description: "The projector remote and power button both seem unresponsive.",
      priority: "High",
      status: "Pending",
      reportedBy: "Aman",
      createdAt: now - 3 * HOUR
    },
    {
      id: now - 6,
      title: "Overflowing dustbins near canteen",
      category: "Cleanliness",
      location: "Canteen Area",
      description: "Dustbins have not been cleared for two days.",
      priority: "Low",
      status: "In Progress",
      reportedBy: CURRENT_STUDENT,
      createdAt: now - 8 * HOUR
    },
    {
      id: now - 7,
      title: "Flickering tube light in corridor",
      category: "Electricity",
      location: "Academic Block, 1st Floor Corridor",
      description: "The tube light near the staircase keeps flickering.",
      priority: "Low",
      status: "Resolved",
      reportedBy: "Sneha",
      createdAt: now - 2 * DAY
    },
    {
      id: now - 8,
      title: "Router down in Reading Hall",
      category: "Internet",
      location: "Library, Reading Hall",
      description: "No Wi-Fi signal is reaching the reading hall at all.",
      priority: "High",
      status: "In Progress",
      reportedBy: CURRENT_STUDENT,
      createdAt: now - 6 * HOUR
    },
    {
      id: now - 9,
      title: "Broken chair in Room 108",
      category: "Classroom",
      location: "Academic Block, Room 108",
      description: "A chair leg is broken and unsafe to sit on.",
      priority: "Low",
      status: "Pending",
      reportedBy: "Rahul",
      createdAt: now - 12 * HOUR
    }
  ];
}

/* ----------------------------------------------------------
   3. UTILITY FUNCTIONS
---------------------------------------------------------- */

// Creates a unique id for a new issue using the current timestamp.
function generateId() {
  return Date.now();
}

// Converts a timestamp into a friendly "x ago" string.
function timeAgo(timestamp) {
  const diffMs = Date.now() - timestamp;
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Escapes user-entered text before inserting it into the page,
// so the app stays safe even if someone types HTML into a form field.
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Returns the CSS class used for a status badge.
function getStatusClass(status) {
  if (status === "Pending") return "status-pending";
  if (status === "In Progress") return "status-progress";
  return "status-resolved";
}

// Returns a small inline SVG icon based on the issue's category.
function getCategoryIcon(category) {
  const icons = {
    Internet: `<svg viewBox="0 0 24 24"><path d="M2 8.5a16 16 0 0 1 20 0"/><path d="M5.5 12.5a11 11 0 0 1 13 0"/><path d="M9 16.5a6 6 0 0 1 6 0"/><circle cx="12" cy="19.5" r="1"/></svg>`,
    Electricity: `<svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>`,
    Water: `<svg viewBox="0 0 24 24"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/></svg>`,
    Classroom: `<svg viewBox="0 0 24 24"><path d="M4 5h16v11H4z"/><path d="M9 21h6M12 16v5"/></svg>`,
    Cleanliness: `<svg viewBox="0 0 24 24"><path d="M12 2v6M9 4l3 4 3-4"/><path d="M6 22l2.5-12h7L18 22"/></svg>`,
    Other: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg>`
  };
  return icons[category] || icons.Other;
}

/* ----------------------------------------------------------
   4. RENDER FUNCTIONS
---------------------------------------------------------- */

// Updates the three statistic numbers at the top of the Home page.
// Values are always calculated from the current `issues` array.
function updateStatistics() {
  const total = issues.length;
  const pending = issues.filter(issue => issue.status === "Pending").length;
  const resolved = issues.filter(issue => issue.status === "Resolved").length;

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statPending").textContent = pending;
  document.getElementById("statResolved").textContent = resolved;
}

// Recalculates category percentages and redraws the Campus Pulse bars.
function updateCampusPulse() {
  const pulseList = document.getElementById("campusPulseList");
  pulseList.innerHTML = "";

  if (issues.length === 0) {
    pulseList.innerHTML = `<p class="empty-message">No data yet.</p>`;
    return;
  }

  // Count how many issues fall into each category.
  const counts = {};
  issues.forEach(issue => {
    counts[issue.category] = (counts[issue.category] || 0) + 1;
  });

  // Convert counts into percentages and sort from highest to lowest.
  const total = issues.length;
  const categoryData = Object.keys(counts)
    .map(category => ({
      category,
      percent: Math.round((counts[category] / total) * 100)
    }))
    .sort((a, b) => b.percent - a.percent);

  categoryData.forEach(item => {
    const row = document.createElement("div");
    row.className = "pulse-item";
    row.innerHTML = `
      <div class="pulse-item-label">
        <span class="pulse-name">${escapeHTML(item.category)}</span>
        <span class="pulse-percent">${item.percent}%</span>
      </div>
      <div class="pulse-bar-track">
        <div class="pulse-bar-fill" style="width: 0%" data-target="${item.percent}"></div>
      </div>
    `;
    pulseList.appendChild(row);
  });

  // Animate the bars filling up after they've been added to the page.
  requestAnimationFrame(() => {
    document.querySelectorAll(".pulse-bar-fill").forEach(bar => {
      bar.style.width = bar.dataset.target + "%";
    });
  });
}

// Builds the HTML for a single issue row.
// `showControls` adds a status dropdown + delete button (used on My Issues).
function createIssueRowHTML(issue, showControls) {
  const statusClass = getStatusClass(issue.status);

  const controls = showControls
    ? `
      <span class="priority-tag">${escapeHTML(issue.priority)} priority</span>
      <select class="status-select" data-id="${issue.id}" aria-label="Change status for ${escapeHTML(issue.title)}">
        <option value="Pending" ${issue.status === "Pending" ? "selected" : ""}>Pending</option>
        <option value="In Progress" ${issue.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option value="Resolved" ${issue.status === "Resolved" ? "selected" : ""}>Resolved</option>
      </select>
      <button class="delete-btn" data-id="${issue.id}" aria-label="Delete issue: ${escapeHTML(issue.title)}" type="button">
        <svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>
      </button>
    `
    : `<span class="status-badge ${statusClass}">${escapeHTML(issue.status)}</span>`;

  return `
    <div class="issue-row" data-id="${issue.id}">
      <div class="issue-icon">${getCategoryIcon(issue.category)}</div>
      <div class="issue-main">
        <p class="issue-title">${escapeHTML(issue.title)}</p>
        <p class="issue-meta">
          <svg viewBox="0 0 24 24"><path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
          ${escapeHTML(issue.location)} &middot; ${escapeHTML(issue.category)}
        </p>
      </div>
      <div class="issue-side">
        ${controls}
        <span class="issue-time">${timeAgo(issue.createdAt)}</span>
      </div>
    </div>
  `;
}

// Renders the "Recent Issues" list on the Home page (all campus issues).
function renderRecentIssues() {
  const container = document.getElementById("recentIssuesList");
  const emptyMsg = document.getElementById("recentIssuesEmpty");
  const searchTerm = document.getElementById("homeSearchInput").value.trim().toLowerCase();

  let list = [...issues].sort((a, b) => b.createdAt - a.createdAt);

  if (searchTerm) {
    list = list.filter(issue => matchesSearch(issue, searchTerm));
  }

  container.innerHTML = list.map(issue => createIssueRowHTML(issue, false)).join("");
  emptyMsg.hidden = list.length !== 0;
}

// Renders the "My Issues" list (only issues reported by the current student).
function renderMyIssues() {
  const container = document.getElementById("myIssuesList");
  const emptyMsg = document.getElementById("myIssuesEmpty");
  const searchTerm = document.getElementById("myIssuesSearchInput").value.trim().toLowerCase();

  let list = issues
    .filter(issue => issue.reportedBy === CURRENT_STUDENT)
    .sort((a, b) => b.createdAt - a.createdAt);

  if (activeFilter !== "all") {
    list = list.filter(issue => issue.status === activeFilter);
  }

  if (searchTerm) {
    list = list.filter(issue => matchesSearch(issue, searchTerm));
  }

  container.innerHTML = list.map(issue => createIssueRowHTML(issue, true)).join("");
  emptyMsg.hidden = list.length !== 0;
}

// Checks whether an issue matches a search term across several fields.
function matchesSearch(issue, term) {
  return (
    issue.title.toLowerCase().includes(term) ||
    issue.location.toLowerCase().includes(term) ||
    issue.category.toLowerCase().includes(term) ||
    (issue.description && issue.description.toLowerCase().includes(term))
  );
}

// Re-renders every dynamic part of the dashboard at once.
// Called after any change to the issues array.
function renderAll() {
  updateStatistics();
  updateCampusPulse();
  renderRecentIssues();
  renderMyIssues();
}

/* ----------------------------------------------------------
   5. ISSUE ACTIONS (add / delete / change status)
---------------------------------------------------------- */

// Adds a brand-new issue to the array, saves it, and re-renders the UI.
function addIssue(issueData) {
  const newIssue = {
    id: generateId(),
    title: issueData.title,
    category: issueData.category,
    location: issueData.location,
    description: issueData.description,
    priority: issueData.priority,
    status: "Pending",
    reportedBy: CURRENT_STUDENT,
    createdAt: Date.now()
  };

  issues.push(newIssue);
  saveIssues();
  renderAll();
}

// Removes an issue by id.
function deleteIssue(id) {
  issues = issues.filter(issue => issue.id !== id);
  saveIssues();
  renderAll();
}

// Updates the status of a single issue.
function changeStatus(id, newStatus) {
  const issue = issues.find(item => item.id === id);
  if (!issue) return;

  issue.status = newStatus;
  saveIssues();
  renderAll();
}

/* ----------------------------------------------------------
   6. MODAL (Report an Issue form)
---------------------------------------------------------- */

const modalOverlay = document.getElementById("modalOverlay");
const reportForm = document.getElementById("reportForm");
let lastFocusedElement = null; // remembers what to focus after closing the modal

function openModal() {
  lastFocusedElement = document.activeElement;
  modalOverlay.hidden = false;
  document.getElementById("issueTitle").focus();
  document.addEventListener("keydown", handleModalKeydown);
}

function closeModal() {
  modalOverlay.hidden = true;
  reportForm.reset();
  clearFormErrors();
  document.removeEventListener("keydown", handleModalKeydown);
  if (lastFocusedElement) lastFocusedElement.focus();
}

// Allows closing the modal with the Escape key.
function handleModalKeydown(event) {
  if (event.key === "Escape") closeModal();
}

function clearFormErrors() {
  document.getElementById("issueTitleError").textContent = "";
  document.getElementById("issueLocationError").textContent = "";
}

// Simple validation: makes sure required text fields aren't empty/whitespace.
function validateForm(data) {
  clearFormErrors();
  let isValid = true;

  if (!data.title) {
    document.getElementById("issueTitleError").textContent = "Please enter a title.";
    isValid = false;
  }
  if (!data.location) {
    document.getElementById("issueLocationError").textContent = "Please enter a location.";
    isValid = false;
  }
  if (!data.category) {
    showToast("Please select a category.");
    isValid = false;
  }
  if (!data.priority) {
    showToast("Please select a priority.");
    isValid = false;
  }

  return isValid;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const data = {
    title: document.getElementById("issueTitle").value.trim(),
    category: document.getElementById("issueCategory").value,
    location: document.getElementById("issueLocation").value.trim(),
    description: document.getElementById("issueDescription").value.trim(),
    priority: document.getElementById("issuePriority").value
  };

  if (!validateForm(data)) return;

  addIssue(data);
  closeModal();
  showToast("Issue reported successfully ✓");
}

/* ----------------------------------------------------------
   7. TOAST NOTIFICATION
---------------------------------------------------------- */

let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  clearTimeout(toastTimeout);
  toast.classList.remove("hide");
  toastMessage.textContent = message;
  toast.hidden = false;

  toastTimeout = setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => { toast.hidden = true; }, 280);
  }, 3000);
}

/* ----------------------------------------------------------
   8. NAVIGATION (switching between Home / My Issues)
---------------------------------------------------------- */

function switchView(viewName) {
  document.querySelectorAll(".view").forEach(section => {
    section.classList.toggle("active", section.id === `view-${viewName}`);
  });

  document.querySelectorAll(".nav-item[data-view]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  // Close the mobile sidebar after choosing a page.
  closeMobileSidebar();
}

/* ----------------------------------------------------------
   9. MOBILE SIDEBAR TOGGLE
---------------------------------------------------------- */

function openMobileSidebar() {
  document.getElementById("sidebar").classList.add("open");
  document.body.classList.add("sidebar-open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "true");
}

function closeMobileSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.body.classList.remove("sidebar-open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
}

/* ----------------------------------------------------------
   10. EVENT LISTENERS
---------------------------------------------------------- */

function setupEventListeners() {
  // Sidebar navigation (Home / My Issues)
  document.querySelectorAll(".nav-item[data-view]").forEach(btn => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });

  // Opening the report modal (from sidebar nav or either "+" button)
  document.getElementById("navReportBtn").addEventListener("click", openModal);
  document.getElementById("openReportModalBtn").addEventListener("click", openModal);
  document.getElementById("openReportModalBtnSecondary").addEventListener("click", openModal);

  // Closing the modal
  document.getElementById("closeModalBtn").addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", event => {
    if (event.target === modalOverlay) closeModal(); // only close on backdrop click
  });

  // Submitting the report form
  reportForm.addEventListener("submit", handleFormSubmit);

  // Live search on Home page
  document.getElementById("homeSearchInput").addEventListener("input", renderRecentIssues);

  // Live search on My Issues page
  document.getElementById("myIssuesSearchInput").addEventListener("input", renderMyIssues);

  // Status filter chips on My Issues page
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      activeFilter = chip.dataset.filter;
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderMyIssues();
    });
  });

  // Status change + delete buttons (delegated, since rows are re-rendered often)
  document.getElementById("myIssuesList").addEventListener("change", event => {
    if (event.target.classList.contains("status-select")) {
      const id = Number(event.target.dataset.id);
      changeStatus(id, event.target.value);
      showToast("Status updated ✓");
    }
  });

  document.getElementById("myIssuesList").addEventListener("click", event => {
    const deleteBtn = event.target.closest(".delete-btn");
    if (deleteBtn) {
      const id = Number(deleteBtn.dataset.id);
      deleteIssue(id);
      showToast("Issue deleted");
    }
  });

  // Sign out (demo only — no real authentication exists)
  document.getElementById("signOutBtn").addEventListener("click", () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      showToast("Signed out successfully (demo mode)");
    }
  });

  // Mobile sidebar controls
  document.getElementById("menuToggle").addEventListener("click", openMobileSidebar);
  document.getElementById("sidebarBackdrop").addEventListener("click", closeMobileSidebar);
}

/* ----------------------------------------------------------
   11. INITIALIZATION
---------------------------------------------------------- */

function init() {
  document.getElementById("studentNameDisplay").textContent = CURRENT_STUDENT;
  document.getElementById("studentNameLabel").textContent = CURRENT_STUDENT;

  loadIssues();
  setupEventListeners();
  renderAll();
}

// Run everything once the HTML has fully loaded.
document.addEventListener("DOMContentLoaded", init);
