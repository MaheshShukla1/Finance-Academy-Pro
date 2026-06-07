// =============================================
// navigation.js - Sidebar, Modules, Search, Theme, Mobile (P1)
// =============================================

function initNavigation() {
    initCollapsibleModules();
    initThemeToggle();
    initMobileHamburger();
    initSearch();
    initViewTabs();
    
    // Update bookmark count
    const countEl = document.getElementById("bookmarkCount");
    if (countEl) countEl.textContent = (window.bookmarks || []).length;
}

function initCollapsibleModules() {
    const nav = document.getElementById("moduleNav");
    if (!nav || !window.academyData) return;

    nav.innerHTML = "";

    const moduleMap = {};
    window.academyData.forEach((lesson, index) => {
        if (!moduleMap[lesson.module]) moduleMap[lesson.module] = [];
        moduleMap[lesson.module].push({ lesson, index });
    });

    Object.keys(moduleMap).forEach(modName => {
        const lessonsInModule = moduleMap[modName];
        const completedInModule = lessonsInModule.filter(l => completedLessons.includes(l.lesson.id)).length;
        const progress = Math.round((completedInModule / lessonsInModule.length) * 100);

        const group = document.createElement("div");
        group.className = "module-group";

        const header = document.createElement("button");
        header.className = "module-header";
        header.innerHTML = `
            <span>${modName}</span>
            <span style="display:flex;align-items:center;gap:8px;">
                <span class="count">${lessonsInModule.length}</span>
                <span style="font-size:11px;color:var(--muted);">${progress}%</span>
            </span>
        `;

        const list = document.createElement("ul");
        list.className = "lesson-list";

        lessonsInModule.forEach(item => {
            const li = document.createElement("li");
            li.className = `lesson-item ${completedLessons.includes(item.lesson.id) ? 'completed' : ''}`;
            li.innerHTML = `<span class="lesson-title">${item.lesson.title}</span>`;
            
            li.onclick = (e) => {
                e.stopImmediatePropagation();
                if (typeof renderLesson === 'function') {
                    renderLesson(item.index);
                }
            };
            list.appendChild(li);
        });

        header.onclick = () => {
            list.classList.toggle("open");
            if (typeof renderLesson === 'function') {
                const first = lessonsInModule[0].index;
                renderLesson(first);
            }
        };

        group.appendChild(header);
        group.appendChild(list);
        nav.appendChild(group);
    });
}

function initThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    if (!toggle || !icon) return;

    const saved = localStorage.getItem("theme");
    if (saved === "light") {
        document.body.classList.add("light");
        icon.textContent = "☀️";
    }

    toggle.onclick = () => {
        document.body.classList.toggle("light");
        const isLight = document.body.classList.contains("light");
        icon.textContent = isLight ? "☀️" : "🌙";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    };
}

function initMobileHamburger() {
    const btn = document.getElementById("hamburgerBtn");
    const sidebar = document.getElementById("sidebar");
    if (!btn || !sidebar) return;

    btn.onclick = () => sidebar.classList.toggle("open");
}

function initSearch() {
    const input = document.getElementById("searchInput");
    if (!input || !window.academyData) return;

    input.addEventListener("keyup", function() {
        const term = this.value.toLowerCase().trim();
        if (!term) return;

        const found = window.academyData.findIndex(l => 
            l.title.toLowerCase().includes(term) || 
            (l.concept && l.concept.toLowerCase().includes(term))
        );
        
        if (found !== -1 && typeof renderLesson === 'function') {
            renderLesson(found);
        }
    });
}

function initViewTabs() {
    document.querySelectorAll(".view-tab").forEach(tab => {
        tab.onclick = () => {
            const view = tab.dataset.view;
            const dash = document.getElementById("dashboardView");
            const lessonV = document.getElementById("lessonView");

            document.querySelectorAll(".view-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            if (view === "dashboard") {
                if (dash) dash.style.display = "block";
                if (lessonV) lessonV.style.display = "none";
                if (typeof renderDashboard === 'function') renderDashboard();
            } else {
                if (dash) dash.style.display = "none";
                if (lessonV) lessonV.style.display = "block";
                if (typeof renderLesson === 'function' && window.academyData) {
                    renderLesson(currentLessonIndex || 0);
                }
            }
        };
    });
}

function updateActiveLessonInSidebar() {
    initCollapsibleModules();
}