// =============================================
// lesson.js - Lesson Rendering, Quiz & Decision Engine (P1)
// =============================================

function initLesson() {
    // Complete Button
    const completeBtn = document.getElementById("completeBtn");
    if (completeBtn) {
        completeBtn.onclick = () => {
            if (!window.academyData || !window.academyData[currentLessonIndex]) return;
            const id = window.academyData[currentLessonIndex].id;
            if (!completedLessons.includes(id)) completedLessons.push(id);
            saveState();
            updateProgress();
            if (typeof initNavigation === 'function') initNavigation();
            alert("Lesson Completed ✅");
        };
    }

    // Bookmark Button
    const bookmarkBtn = document.getElementById("bookmarkBtn");
    if (bookmarkBtn) {
        bookmarkBtn.onclick = () => {
            if (!window.academyData || !window.academyData[currentLessonIndex]) return;
            const id = window.academyData[currentLessonIndex].id;
            if (!bookmarks.includes(id)) {
                bookmarks.push(id);
                saveState();
                const countEl = document.getElementById("bookmarkCount");
                if (countEl) countEl.textContent = bookmarks.length;
                alert("Bookmarked ⭐");
            }
        };
    }

    // Previous Button
    const prev = document.getElementById("prevLesson");
    if (prev) {
        prev.onclick = () => {
            if (currentLessonIndex > 0 && typeof renderLesson === 'function') {
                renderLesson(currentLessonIndex - 1);
            }
        };
    }

    // Next Button
    const next = document.getElementById("nextLesson");
    if (next) {
        next.onclick = () => {
            if (window.academyData && currentLessonIndex < window.academyData.length - 1 && typeof renderLesson === 'function') {
                renderLesson(currentLessonIndex + 1);
            }
        };
    }
}

function renderLesson(index) {
    if (!window.academyData) return;
    currentLessonIndex = Math.max(0, Math.min(index, window.academyData.length - 1));
    const lesson = window.academyData[currentLessonIndex];
    if (!lesson) return;

    // Switch to Lesson View
    const dash = document.getElementById("dashboardView");
    const lessonV = document.getElementById("lessonView");
    if (dash) dash.style.display = "none";
    if (lessonV) lessonV.style.display = "block";

    document.getElementById("lessonTitle").textContent = lesson.title;
    document.getElementById("moduleTitle").textContent = lesson.module || "Lesson";
    document.getElementById("topbarSubtitle").textContent = "Real Construction & MEP Finance Training";

    const meta = document.getElementById("lessonMeta");
    if (meta) {
        meta.innerHTML = `<span style="background:var(--primary);color:white;padding:2px 8px;border-radius:4px;font-size:11px;">${lesson.module}</span>`;
    }

    let html = "";

    // Concept
    if (lesson.concept) {
        html += `<h4>📘 Concept</h4><p>${lesson.concept}</p>`;
    }

    // Business Cases
    if (lesson.realWorld || lesson.construction || lesson.mep) {
        html += `<h4>🏗️ Practical Business Cases</h4><div class="business-cases">`;
        if (lesson.realWorld) html += `<div class="case-card"><h5>Real World</h5><p>${lesson.realWorld}</p></div>`;
        if (lesson.construction) html += `<div class="case-card"><h5>Construction</h5><p>${lesson.construction}</p></div>`;
        if (lesson.mep) html += `<div class="case-card"><h5>MEP Example</h5><p>${lesson.mep}</p></div>`;
        html += `</div>`;
    }

    // Interactive Decision Scenario
    if (lesson.decisionScenario) {
        html += `
            <h4>🎯 Decision-Making Scenario</h4>
            <div class="decision-scenario">
                <p><strong>${lesson.decisionScenario.situation}</strong></p>
                <div id="decisionOptions">
                    ${lesson.decisionScenario.options.map((opt, i) => 
                        `<button class="decision-option" onclick="handleDecisionChoice(${currentLessonIndex}, ${i}, this)">${opt.text}</button>`
                    ).join("")}
                </div>
                <div id="decisionResult" class="decision-result" style="display:none;"></div>
            </div>
        `;
    }

    // Common Mistakes
    if (lesson.mistakes && lesson.mistakes.length) {
        html += `<h4>⚠️ Common Mistakes</h4><ul>`;
        lesson.mistakes.forEach(m => html += `<li>${m}</li>`);
        html += `</ul>`;
    }

    // Interview Questions
    if (lesson.interview && lesson.interview.length) {
        html += `<h4>🎤 Interview Questions</h4><ul>`;
        lesson.interview.forEach(q => html += `<li>${q}</li>`);
        html += `</ul>`;
    }

    // Excel Formula
    if (lesson.excel) {
        html += `<h4>📊 Excel Formula</h4><pre>${lesson.excel}</pre>`;
    }

    // Exercise
    if (lesson.exercise) {
        html += `<h4>✍️ Hands-on Exercise</h4><p>${lesson.exercise}</p>`;
    }

    // Interactive Quiz
    if (lesson.quiz && lesson.quiz.length > 0) {
        html += `<h4>✅ Quick Quiz</h4><div class="quiz-container" id="quizContainer"></div>`;
    }

    document.getElementById("lessonContent").innerHTML = html;

    // Initialize Quiz
    if (lesson.quiz && lesson.quiz.length > 0) {
        renderInteractiveQuiz(lesson, currentLessonIndex);
    }

    if (typeof updateActiveLessonInSidebar === 'function') {
        updateActiveLessonInSidebar();
    }
    saveState();
}

function renderInteractiveQuiz(lesson, lessonIndex) {
    const container = document.getElementById("quizContainer");
    if (!container) return;

    let qHTML = `<div class="quiz-options">`;
    lesson.quiz.forEach((qItem, qIdx) => {
        qHTML += `<div style="margin-bottom:16px;"><div class="quiz-question">${qIdx + 1}. ${qItem.q}</div>`;
        qItem.options.forEach((opt, oIdx) => {
            qHTML += `<label><input type="radio" name="q${qIdx}" value="${oIdx}"> ${opt}</label>`;
        });
        qHTML += `</div>`;
    });
    qHTML += `</div>
        <button onclick="submitQuiz(${lessonIndex})" 
                style="margin-top:10px; background:#16a34a; color:white; padding:10px 22px; border:none; border-radius:8px; font-weight:600; cursor:pointer;">
            Submit Answers
        </button>
        <div id="quizResult" style="display:none; margin-top:16px;"></div>`;

    container.innerHTML = qHTML;
}

function submitQuiz(lessonIndex) {
    const lesson = window.academyData[lessonIndex];
    if (!lesson.quiz) return;

    let score = 0;
    let feedback = "";

    lesson.quiz.forEach((qItem, qIdx) => {
        const selected = document.querySelector(`input[name="q${qIdx}"]:checked`);
        if (!selected) return;

        const ans = parseInt(selected.value);
        const correct = ans === qItem.correct;

        if (correct) score++;

        feedback += `<div style="margin:6px 0; padding:8px; border-radius:6px; background:${correct ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}">
            Q${qIdx+1}: ${correct ? "✅" : "❌"} ${qItem.explanation || ""}
        </div>`;
    });

    const percent = Math.round((score / lesson.quiz.length) * 100);
    const resultDiv = document.getElementById("quizResult");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `<strong>Score: ${score}/${lesson.quiz.length} (${percent}%)</strong><br>${feedback}`;

    if (percent >= 70) {
        const id = lesson.id;
        if (!completedLessons.includes(id)) {
            completedLessons.push(id);
            saveState();
            updateProgress();
        }
    }
}

function handleDecisionChoice(lessonIndex, optionIndex, btn) {
    const lesson = window.academyData[lessonIndex];
    if (!lesson.decisionScenario) return;

    const result = document.getElementById("decisionResult");
    const optionsDiv = document.getElementById("decisionOptions");

    const chosen = lesson.decisionScenario.options[optionIndex];
    result.innerHTML = `
        <strong>You chose:</strong> ${chosen.text}<br><br>
        <strong>Financial Impact:</strong> ${chosen.consequence}<br><br>
        <em>Key Lesson: Always protect cash flow and document commitments before starting work.</em>
    `;
    result.style.display = "block";
    optionsDiv.style.opacity = "0.5";
    optionsDiv.style.pointerEvents = "none";
}

// Make functions global
window.renderLesson = renderLesson;
window.submitQuiz = submitQuiz;
window.handleDecisionChoice = handleDecisionChoice;