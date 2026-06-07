// core.js - State Management
let currentLessonIndex = 0;
let currentModule = "Finance Foundations";
let currentView = "dashboard";

let completedLessons = JSON.parse(localStorage.getItem("completedLessons")) || [];
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function saveState() {
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    localStorage.setItem("currentLesson", currentLessonIndex);
    localStorage.setItem("currentView", currentView);
}

function loadState() {
    const saved = Number(localStorage.getItem("currentLesson"));
    if (!isNaN(saved) && saved >= 0 && saved < (window.academyData?.length || 0)) {
        currentLessonIndex = saved;
    }
    const savedView = localStorage.getItem("currentView");
    if (savedView) currentView = savedView;
}

function updateProgress() {
    const total = window.academyData ? window.academyData.length : 42;
    const percent = total > 0 ? Math.round((completedLessons.length / total) * 100) : 0;

    const fill = document.getElementById("progressFill");
    const text = document.getElementById("progressText");
    const hero = document.getElementById("heroCompleted");

    if (fill) fill.style.width = percent + "%";
    if (text) text.textContent = `${percent}% Complete • ${completedLessons.length}/${total} lessons`;
    if (hero) hero.textContent = completedLessons.length;
}

function initCore() {
    loadState();
    updateProgress();
    
    if (typeof academyData !== 'undefined') {
        window.academyData = academyData;
    }
}