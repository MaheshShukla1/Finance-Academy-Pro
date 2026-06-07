function initDashboard() {
    renderDashboard();
    if (typeof initCalculators === 'function') initCalculators();
}

function renderDashboard() {
    const grid = document.getElementById("moduleGrid");
    if (!grid || !window.academyData) return;

    grid.innerHTML = "";

    const moduleMap = {};
    window.academyData.forEach((lesson, idx) => {
        if (!moduleMap[lesson.module]) moduleMap[lesson.module] = [];
        moduleMap[lesson.module].push({ lesson, index: idx });
    });

    Object.keys(moduleMap).forEach(modName => {
        const lessons = moduleMap[modName];
        const completed = lessons.filter(l => completedLessons.includes(l.lesson.id)).length;
        const progress = Math.round((completed / lessons.length) * 100);

        const card = document.createElement("div");
        card.className = "module-card";
        card.style.cursor = "pointer";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <div style="width:52px; height:52px; border-radius:50%; background: conic-gradient(var(--primary) ${progress}%, var(--border) 0); display:flex; align-items:center; justify-content:center;">
                    <div style="width:38px; height:38px; background:var(--card); border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px;">
                        ${progress}%
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:13px; color:var(--muted);">${completed}/${lessons.length}</div>
                </div>
            </div>
            <h4 style="margin-bottom:6px;">${modName}</h4>
            <div style="font-size:13px; color:var(--muted);">${lessons.length} lessons</div>
        `;

        card.onclick = () => {
            const firstIndex = lessons[0].index;
            const dash = document.getElementById("dashboardView");
            const lessonV = document.getElementById("lessonView");
            
            if (dash) dash.style.display = "none";
            if (lessonV) lessonV.style.display = "block";
            
            if (typeof renderLesson === 'function') {
                renderLesson(firstIndex);
            }
        };

        grid.appendChild(card);
    });
}

function initCalculators() {
    const grid = document.getElementById("calculatorGrid");
    if (!grid) return;

    grid.innerHTML = `
        <div class="calculator-card">
            <h3>Profit & Margin</h3>
            <input type="number" id="calcRev" placeholder="Revenue ₹" value="12000000">
            <input type="number" id="calcCost" placeholder="Cost ₹" value="8700000">
            <button onclick="calculateProfit()" style="width:100%; margin-top:8px; padding:10px; background:var(--primary); color:white; border:none; border-radius:8px;">Calculate</button>
            <div id="calcProfitResult" style="margin-top:12px; font-weight:600;"></div>
        </div>
        
        <div class="calculator-card">
            <h3>Cash Conversion Cycle</h3>
            <input type="number" id="calcDSO" placeholder="DSO (days)" value="65">
            <input type="number" id="calcDIO" placeholder="DIO (days)" value="18">
            <input type="number" id="calcDPO" placeholder="DPO (days)" value="42">
            <button onclick="calculateCCC()" style="width:100%; margin-top:8px; padding:10px; background:var(--primary); color:white; border:none; border-radius:8px;">Calculate CCC</button>
            <div id="calcCCCResult" style="margin-top:12px; font-weight:600;"></div>
        </div>
    `;
}

function calculateProfit() {
    const rev = Number(document.getElementById("calcRev").value) || 0;
    const cost = Number(document.getElementById("calcCost").value) || 0;
    const profit = rev - cost;
    const margin = rev > 0 ? ((profit / rev) * 100).toFixed(1) : 0;
    document.getElementById("calcProfitResult").innerHTML = `Profit: ₹${profit.toLocaleString('en-IN')} <br> Margin: <strong>${margin}%</strong>`;
}

function calculateCCC() {
    const dso = Number(document.getElementById("calcDSO").value) || 0;
    const dio = Number(document.getElementById("calcDIO").value) || 0;
    const dpo = Number(document.getElementById("calcDPO").value) || 0;
    const ccc = dso + dio - dpo;
    const color = ccc > 60 ? "#ef4444" : ccc > 40 ? "#f59e0b" : "#22c55e";
    document.getElementById("calcCCCResult").innerHTML = `CCC = <strong style="color:${color}">${ccc} days</strong>`;
}