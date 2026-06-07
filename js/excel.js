// =============================================
// excel.js - P1 Enhanced Excel Academy
// More templates + Downloadable CSV + Editable Preview
// =============================================

const ExcelAcademy = {
    templates: [
        {
            id: "project-pl",
            title: "Project P&L Template",
            description: "Full project P&L with budget vs actual + variance analysis",
            headers: ["Cost Head", "Budget (₹)", "Actual (₹)", "Variance (₹)", "Variance %"],
            sampleData: [
                ["Revenue", 18000000, 17850000, -150000, -0.83],
                ["Material", 7800000, 8120000, -320000, -4.10],
                ["Labour", 3200000, 2980000, 220000, 6.88],
                ["Subcontract", 1800000, 1750000, 50000, 2.78],
                ["Site Overheads", 950000, 1020000, -70000, -7.37],
                ["Gross Profit", 4100000, 3970000, -130000, -3.17],
                ["Head Office Allocation", 850000, 850000, 0, 0],
                ["Interest & Finance Cost", 320000, 380000, -60000, -18.75],
                ["Net Profit", 2930000, 2740000, -190000, -6.48]
            ]
        },
        {
            id: "cash-forecast-13week",
            title: "13-Week Cash Forecast",
            description: "Rolling weekly cash position with alerts",
            headers: ["Week", "Opening (₹)", "Collections (₹)", "Payments (₹)", "Net (₹)", "Closing (₹)", "Status"],
            sampleData: [
                ["Week 1", 4200000, 1850000, 2100000, -250000, 3950000, "Healthy"],
                ["Week 2", 3950000, 3200000, 2450000, 750000, 4700000, "Healthy"],
                ["Week 3", 4700000, 1200000, 3800000, -2600000, 2100000, "Monitor"],
                ["Week 4", 2100000, 4500000, 2650000, 1850000, 3950000, "Healthy"]
            ]
        },
        {
            id: "working-capital",
            title: "Working Capital Dashboard",
            description: "DSO, DPO, DIO, CCC + Ageing analysis",
            headers: ["Metric", "Current", "Target", "Gap", "Action Required"],
            sampleData: [
                ["DSO (Days)", 72, 55, 17, "Weekly collection calls + faster RA submission"],
                ["DPO (Days)", 38, 45, -7, "Negotiate better credit with top vendors"],
                ["DIO (Days)", 19, 15, 4, "Reduce site material buffer stock"],
                ["Cash Conversion Cycle", 53, 35, 18, "Critical - Focus on collections"]
            ]
        },
        {
            id: "tender-finance-summary",
            title: "Tender Finance Summary",
            description: "Pre-bid financial viability check",
            headers: ["Parameter", "Value", "Remarks"],
            sampleData: [
                ["Contract Value", "₹2.85 Cr", "Including 8% escalation"],
                ["Expected GP Margin", "24.5%", "Before overhead allocation"],
                ["Net Margin Target", "11.2%", "After all costs"],
                ["Working Capital Required", "₹68 Lakh", "Peak requirement"],
                ["BG Amount (Performance)", "₹28.5 Lakh", "3 year validity"],
                ["BG Commission Cost", "₹5.13 Lakh", "@1.8% p.a."],
                ["Go / No-Go Decision", "GO", "Margin acceptable if WC arranged"]
            ]
        },
        {
            id: "retention-tracker",
            title: "Retention Money Tracker",
            description: "Track all retention held + expected release dates",
            headers: ["Project", "Retention Held (₹)", "Expected Release Date", "Status", "Action"],
            sampleData: [
                ["Hyatt Hotel HVAC", 1450000, "2026-09-15", "Due", "Submit final account"],
                ["City Hospital MEP", 980000, "2027-03-01", "Pending DLP", "Monitor defect list"],
                ["Phoenix Mall FF", 620000, "2026-07-20", "Overdue", "Follow up with client"]
            ]
        }
    ],

    init(containerId = "excelGrid") {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = this.templates.map(t => `
            <div class="excel-card">
                <h3>${t.title}</h3>
                <p style="font-size:13px; color:var(--muted); margin:8px 0 16px;">${t.description}</p>
                
                <div style="display:flex; gap:8px;">
                    <button onclick="ExcelAcademy.download('${t.id}')" 
                            style="flex:1; padding:9px 12px; background:var(--primary); color:white; border:none; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px;">
                        ⬇ Download CSV
                    </button>
                    <button onclick="ExcelAcademy.preview('${t.id}')" 
                            style="flex:1; padding:9px 12px; background:#475569; color:white; border:none; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px;">
                        👁 Preview & Edit
                    </button>
                </div>
            </div>
        `).join('');
    },

    download(templateId) {
        const template = this.templates.find(t => t.id === templateId);
        if (!template) return;

        let csv = template.headers.join(',') + '\n';
        template.sampleData.forEach(row => {
            csv += row.map(cell => `"${cell}"`).join(',') + '\n';
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${template.title.replace(/\s+/g, '-')}.csv`;
        link.click();
    },

    preview(templateId) {
        const template = this.templates.find(t => t.id === templateId);
        if (!template) return;

        const modal = document.getElementById('modal');
        const content = document.getElementById('modalContent');

        let tableRows = template.sampleData.map((row, rowIndex) => {
            return `<tr>${row.map((cell, colIndex) => 
                `<td contenteditable="true" data-row="${rowIndex}" data-col="${colIndex}" style="padding:8px 10px; border:1px solid var(--border); min-width:90px;">${cell}</td>`
            ).join('')}</tr>`;
        }).join('');

        content.innerHTML = `
            <h3 style="margin-bottom:8px;">${template.title} — Live Preview</h3>
            <p style="color:var(--muted); font-size:13px; margin-bottom:16px;">You can edit cells directly. Changes are temporary (for practice).</p>
            
            <table style="width:100%; border-collapse:collapse; font-size:13px; margin-bottom:20px;">
                <thead>
                    <tr style="background:var(--bg);">
                        ${template.headers.map(h => `<th style="padding:10px; text-align:left; border:1px solid var(--border);">${h}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>

            <div style="display:flex; gap:12px;">
                <button onclick="ExcelAcademy.download('${templateId}')" 
                        style="flex:1; padding:12px; background:var(--primary); color:white; border:none; border-radius:10px; font-weight:600;">
                    Download as CSV
                </button>
                <button onclick="document.getElementById('modal').classList.remove('open')" 
                        style="flex:1; padding:12px; background:#64748b; color:white; border:none; border-radius:10px; font-weight:600;">
                    Close
                </button>
            </div>
        `;

        modal.classList.add('open');
    }
};

window.ExcelAcademy = ExcelAcademy;