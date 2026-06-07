// =============================================
// data.js - Complete Lesson Data for Finance Academy Pro (P1 Modular)
// All lessons standardized with Concept, Examples, Decision Scenarios, Quizzes etc.
// =============================================

const financeFoundations = [
    { 
        id: "revenue", 
        title: "Revenue", 
        module: "Finance Foundations", 
        concept: "Revenue is the total value earned from selling products or services before deducting any costs. In EPC/MEP, it is recognized on percentage-of-completion or milestone basis.", 
        realWorld: "An HVAC contractor executes a ₹1.2 Crore package in a Hyatt hotel project. Revenue recognized = ₹1.2 Crore on contract signing + milestones.", 
        construction: "RA Bill raised for ₹45 Lakh after structural work. Revenue booked even if payment is pending.", 
        mep: "Fire fighting package revenue recognized on material supply + installation certification.", 
        decisionScenario: {
            situation: "Client asks you to start work before formal PO. What do you do?",
            options: [
                { text: "Start work on good faith", consequence: "High risk of non-payment. Cash flow hit of ₹30L+." },
                { text: "Insist on LOI + 20% advance", consequence: "Protects cash. Professional boundary set." },
                { text: "Wait for signed contract", consequence: "Safe but may lose project to competitor." }
            ]
        },
        mistakes: ["Booking revenue before PO", "Ignoring milestone certification", "Confusing billed amount with recognized revenue"],
        interview: ["What is revenue recognition in construction?", "Difference between revenue and cash received?", "How do you handle variation orders in revenue?"],
        excel: "=SUM(B2:B20)  // Sum of all invoice lines",
        exercise: "List last 3 projects and note the exact revenue recognition trigger for each.",
        quiz: [
            { q: "Revenue is recognized when?", options: ["Cash is received", "Contract is signed or milestone achieved", "Invoice is raised"], correct: 1, explanation: "In EPC, usually on milestone certification or percentage completion." },
            { q: "Can you book revenue without a signed contract?", options: ["Yes, if work started", "Only with LOI or PO", "Never"], correct: 1, explanation: "Risk of dispute is very high without documentation." }
        ]
    },
    { 
        id: "cost", title: "Cost", module: "Finance Foundations", 
        concept: "Cost is the amount spent to generate revenue. Direct costs (material, labour, subcontractor) vs indirect/overheads.", 
        realWorld: "Material ₹52L + Labour ₹18L + Transport ₹4L + Subcontractor ₹9L = Total Direct Cost ₹83 Lakh on a ₹1.2 Cr project.", 
        construction: "Steel + copper pipes + insulation for HVAC package.", 
        mep: "Cables, panels, fire pumps, BMS integration costs.", 
        mistakes: ["Mixing direct and indirect costs", "Forgetting escalation clauses", "Not tracking site overhead separately"],
        interview: ["What are direct vs indirect costs in a project?", "How does cost escalation affect project margin?"],
        excel: "=SUM(C2:C25)",
        exercise: "Break down your current project costs into 5 major heads.",
        quiz: [
            { q: "Labour on site is usually a...", options: ["Direct cost", "Indirect cost", "Overhead"], correct: 0, explanation: "Directly attributable to project execution." }
        ]
    },
    { 
        id: "gross-profit", title: "Gross Profit", module: "Finance Foundations", 
        concept: "Gross Profit = Revenue − Direct Costs. The first and most important margin in project businesses.", 
        realWorld: "Revenue ₹1.2 Cr − Direct Cost ₹83 Lakh = Gross Profit ₹37 Lakh (30.8% GP Margin).", 
        construction: "Hotel HVAC package GP heavily depends on copper price fluctuation.", 
        mep: "Hospital OT HVAC has tighter GP due to validation & cleanroom costs.", 
        mistakes: ["Ignoring material price volatility", "Underestimating labour productivity"],
        interview: ["What affects gross margin in MEP projects?", "Why can GP be high but net profit low?"],
        excel: "=B2-C2",
        exercise: "Calculate GP% for your last 3 projects.",
        quiz: [
            { q: "Gross Profit excludes which cost?", options: ["Material", "Site labour", "Office rent"], correct: 2, explanation: "Office rent is indirect/overhead, comes after GP." }
        ]
    },
    { 
        id: "net-profit", title: "Net Profit", module: "Finance Foundations", 
        concept: "Net Profit = Gross Profit − All indirect expenses, interest, depreciation & tax.", 
        realWorld: "GP ₹37L − Site overhead ₹6L − Head office allocation ₹4L − Interest ₹2L = Net Profit ₹25 Lakh.", 
        mistakes: ["Treating all costs as direct", "Not allocating overhead correctly"],
        interview: ["Difference between gross profit and net profit in a contracting company?"],
        excel: "=GrossProfit - AllOverheads - Interest - Tax",
        exercise: "Prepare a simple P&L for one project including overhead allocation.",
        quiz: []
    },
    { 
        id: "margin", title: "Margin", module: "Finance Foundations", 
        concept: "Margin = Profit expressed as percentage of Revenue. Most watched metric by promoters & banks.", 
        realWorld: "₹25L Net Profit on ₹1.2 Cr Revenue = 20.8% Net Margin.", 
        construction: "Typical healthy net margin in HVAC contracting: 8–15%.",
        mistakes: ["Chasing revenue without margin discipline", "Accepting low-margin projects to 'keep the team busy'"],
        interview: ["What is a healthy net margin for an EPC contractor in India?"],
        excel: "=(NetProfit / Revenue) * 100",
        exercise: "Benchmark your company margin vs industry peers.",
        quiz: []
    },
    { 
        id: "markup", title: "Markup", module: "Finance Foundations", 
        concept: "Markup = Profit expressed as percentage of Cost. Used heavily in tendering & estimation.", 
        realWorld: "Cost ₹83L, Desired Markup 25% → Selling Price = ₹1.0375 Cr.", 
        mistakes: ["Confusing markup with margin", "Applying same markup % on every project"],
        interview: ["Difference between markup and margin? Which one should you target while bidding?"],
        excel: "=(SellingPrice - Cost) / Cost * 100",
        exercise: "Calculate required markup to achieve 12% net margin on a project.",
        quiz: []
    },
    { 
        id: "ebitda", title: "EBITDA", module: "Finance Foundations", 
        concept: "Earnings Before Interest, Tax, Depreciation & Amortization. Clean measure of operating cash generation.", 
        realWorld: "Used by investors and banks to compare project companies without financing noise.", 
        mistakes: ["Treating EBITDA as actual cash available", "Ignoring working capital changes"],
        interview: ["Why do PE funds love EBITDA?", "Can a company have positive EBITDA but negative cash flow?"],
        excel: "=OperatingProfit + Depreciation + Amortization",
        exercise: "Calculate EBITDA for your company last year.",
        quiz: []
    }
];

const pnlModules = [
    { 
        id: "pnl-statement", title: "Profit & Loss Statement", module: "P&L Statement", 
        concept: "A financial statement showing revenue, expenses and profit over a period. The most important monthly report for any contractor.", 
        realWorld: "Monthly P&L for all running projects + overheads consolidated.", 
        construction: "Track project-wise contribution before overhead allocation.", 
        mep: "Hospital projects often show lower GP% due to stringent quality & documentation costs.", 
        mistakes: ["Preparing P&L only at year end", "Not doing project-wise P&L"],
        interview: ["What is the difference between P&L and Cash Flow Statement?"],
        excel: "Revenue - All Costs = Net Profit",
        exercise: "Create a monthly P&L format for your company.",
        quiz: []
    },
    { 
        id: "hotel-hvac-pnl", title: "Hotel HVAC P&L Analysis", module: "P&L Statement", 
        concept: "Deep dive into profitability of a typical 5-star hotel HVAC package.", 
        realWorld: "Revenue ₹1.8 Cr | Material ₹78L | Labour ₹32L | Subcontract ₹18L | Site OH ₹9L → GP ₹43L (23.9%)", 
        construction: "Chiller + AHU + Ducting + BMS. Copper price volatility is the biggest risk.", 
        mistakes: ["Underestimating commissioning & balancing time", "Not factoring seasonal labour premium"],
        interview: ["Which cost heads most affect hotel project margins?"],
        excel: "=Revenue-(Material+Labour+Subcontract+SiteOH)",
        exercise: "Build a sample P&L for a 150-room hotel HVAC project.",
        quiz: []
    },
    { 
        id: "hospital-project-pnl", title: "Hospital MEP P&L", module: "P&L Statement", 
        concept: "Hospital projects have unique cost structures and lower margins but steady cash flow if managed well.", 
        realWorld: "Revenue ₹4.8 Cr | Net Profit ₹58 Lakh (12.1% margin). High validation & documentation cost.", 
        mep: "OT HVAC, medical gas, UPS, nurse call, fire alarm — all need strict compliance.",
        mistakes: ["Ignoring validation & IQ/OQ/PQ costs", "Poor change management on medical equipment coordination"],
        interview: ["Why do hospital MEP projects usually have lower margins than commercial projects?"],
        excel: "=Revenue - AllDirect - ValidationCosts - Documentation",
        exercise: "Identify top 5 cost drivers unique to hospital MEP.",
        quiz: []
    },
    { 
        id: "mall-project-pnl", title: "Mall / Retail Project P&L", module: "P&L Statement", 
        concept: "High volume, tight timelines, aggressive procurement — margin comes from smart buying.", 
        realWorld: "Fire Fighting + HVAC package ₹2.1 Cr. Procurement savings of ₹14L directly improved GP.", 
        mistakes: ["Late procurement leading to air freight", "Not negotiating volume discounts with vendors"],
        interview: ["How can procurement team directly improve project P&L?"],
        excel: "=Revenue - (Material + Labour + OH) + ProcurementSavings",
        exercise: "List 3 recent procurement wins and their impact on margin.",
        quiz: []
    }
];

const balanceSheetModules = [
    { id: "assets", title: "Assets", module: "Balance Sheet", concept: "Resources owned by the company that have future economic value.", realWorld: "Cash, Bank, Receivables, Inventory (material at site), Plant & Machinery, Retention Receivable.", excel: "=SUM(Assets)", interview: ["What are current assets in a contracting company?"] },
    { id: "liabilities", title: "Liabilities", module: "Balance Sheet", concept: "Obligations the company owes to outsiders.", realWorld: "Supplier payables, Contractor advances, Bank loans, Retention payable to sub-contractors, GST/TDS payable.", excel: "=SUM(Liabilities)", interview: ["What are current liabilities for an EPC contractor?"] },
    { id: "equity", title: "Equity / Net Worth", module: "Balance Sheet", concept: "Owner's residual interest after deducting liabilities from assets.", realWorld: "Assets ₹28 Cr − Liabilities ₹19.5 Cr = Equity / Net Worth ₹8.5 Cr.", excel: "=Assets - Liabilities", interview: ["Why must Assets = Liabilities + Equity?"] },
    { id: "working-example", title: "Real EPC Balance Sheet Example", module: "Balance Sheet", concept: "Typical mid-size MEP contractor balance sheet structure.", realWorld: "Current Assets ₹14 Cr (mostly receivables + site inventory) | Fixed Assets ₹6 Cr | Current Liabilities ₹11 Cr | Long-term loan ₹4 Cr | Equity ₹5 Cr.", excel: "=Assets - Liabilities", interview: ["What does a healthy current ratio look like for a contractor?"] }
];

const cashFlowModules = [
    { 
        id: "cash-flow-basics", 
        title: "Cash Flow Basics", 
        module: "Cash Flow", 
        concept: "Cash Flow tracks actual movement of money in and out of the business. Profit ≠ Cash. Many profitable companies die due to poor cash management.", 
        realWorld: "Company shows ₹80L profit but has only ₹3L in bank because clients pay after 90 days and vendors demand advance.", 
        construction: "HVAC contractor raises RA Bill ₹35L but receives payment only after architect certification + client approval (45–75 days typical).", 
        mep: "Fire fighting contractor waits 60–90 days for final bill release even after successful testing & commissioning.", 
        mdView: "Can we pay salaries and vendor bills this month with current cash?", 
        procurementView: "Should we release advance to vendor or negotiate 45-day credit?", 
        financeView: "Daily cash position report is non-negotiable.", 
        mistakes: ["Confusing accounting profit with cash in hand", "Not forecasting cash needs 8–12 weeks ahead", "Accepting projects with poor payment terms"],
        interview: ["What is the difference between profit and cash flow?", "Why do profitable companies run out of cash?"],
        excel: "=CashIn - CashOut (Weekly/Monthly)",
        exercise: "Track your personal + company cash flow for next 30 days.",
        quiz: [
            { q: "A company can be profitable but still go bankrupt. True or False?", options: ["True", "False"], correct: 0, explanation: "Classic cash flow trap in contracting business." }
        ]
    },
    { 
        id: "cash-inflow", title: "Managing Cash Inflows", module: "Cash Flow", 
        concept: "Cash comes in mainly from client payments (RA bills, final bill, retention release). Speed of collection is everything.", 
        realWorld: "Average collection period in Indian construction: 75–110 days. Top performers bring it down to 45–60 days.", 
        construction: "Submit RA bill on 25th of every month. Follow up rigorously on 10th and 20th.", 
        mep: "Retention release (usually 5%) happens only after defect liability period + final account settlement.", 
        mistakes: ["Submitting incomplete RA bills", "Not maintaining proper measurement sheets", "Poor follow-up discipline"],
        interview: ["How can you reduce average collection period in a contracting company?"],
        excel: "=SUMIF(PaymentStatus,\"Received\",Amount)",
        exercise: "List all pending RA bills with expected receipt date.",
        quiz: []
    },
    { 
        id: "cash-outflow", title: "Managing Cash Outflows", module: "Cash Flow", 
        concept: "Cash goes out for material purchase, labour wages, subcontractor bills, site expenses, overheads, loan EMIs.", 
        realWorld: "Smart contractors negotiate 30–45 day credit from major vendors while collecting from clients in 60 days.", 
        construction: "Pay labour weekly/bi-weekly. Material vendors on 30-day credit. Never pay before material reaches site.", 
        mistakes: ["Paying vendors faster than client payment cycle", "Not using LC or bank guarantee where possible"],
        interview: ["What is the ideal cash conversion cycle for an MEP contractor?"],
        excel: "=SUM(WeeklyPayments) + SUM(VendorBillsPaid)",
        exercise: "Create a 8-week cash outflow forecast for your current project.",
        quiz: []
    },
    { 
        id: "retention", title: "Retention Money Management", module: "Cash Flow", 
        concept: "Retention (usually 5–10%) is held by client as security. It is your money but blocked for 12–24 months.", 
        realWorld: "On a ₹2 Cr project, 8% retention = ₹16 Lakh blocked. Released in two stages: 50% after virtual completion, 50% after DLP.", 
        construction: "Always track retention receivable ageing separately. It is not 'receivable' in normal sense.", 
        mep: "In hospital projects, retention can be 10% with longer DLP (24 months).", 
        mistakes: ["Forgetting to claim retention release on time", "Not negotiating lower retention % in tender stage"],
        interview: ["How does retention money affect your working capital?"],
        excel: "=TotalContractValue * RetentionPercent",
        exercise: "Calculate total retention blocked across all running projects.",
        quiz: []
    },
    { 
        id: "cash-forecasting", title: "Cash Flow Forecasting", module: "Cash Flow", 
        concept: "Weekly or monthly rolling cash forecast is the single most important financial discipline for a contractor.", 
        realWorld: "Best practice: Prepare 13-week rolling cash forecast every Monday morning.", 
        mdView: "Will we have enough cash to pay labour and key vendors next month?", 
        mistakes: ["Making only annual cash flow (useless for operations)", "Not updating forecast with actual collections"],
        interview: ["What should a good weekly cash forecast contain?"],
        excel: "Opening Cash + Inflows − Outflows = Closing Cash (Week by Week)",
        exercise: "Build your first 8-week cash forecast this week.",
        quiz: []
    }
];

const workingCapitalModules = [
    { id: "wc-basics", title: "Working Capital Basics", module: "Working Capital", concept: "Working Capital = Current Assets − Current Liabilities. The oxygen of any contracting business.", realWorld: "Typical MEP contractor needs 25–40% of annual turnover as working capital.", construction: "High inventory at site + high receivables = heavy working capital requirement.", mistakes: ["Growing revenue without arranging working capital", "Not monitoring Working Capital Days"], interview: ["What is the ideal working capital cycle for an EPC company?"], excel: "=CurrentAssets - CurrentLiabilities", exercise: "Calculate your company's working capital requirement for next quarter.", quiz: [] },
    { id: "dso-dpo", title: "DSO, DPO & Cash Conversion Cycle", module: "Working Capital", concept: "DSO (Days Sales Outstanding) + DIO − DPO = Cash Conversion Cycle. Lower is better.", realWorld: "Good contractor: DSO 55 days, DPO 42 days, CCC = 40–50 days.", construction: "Long DSO kills cash. Aggressive vendor negotiation improves DPO.", mistakes: ["Not tracking DSO project-wise", "Accepting 90+ day payment terms without premium"], interview: ["How can you improve DPO without damaging vendor relationships?"], excel: "=(Receivables / Revenue) * 365   // DSO", exercise: "Calculate your current DSO and DPO.", quiz: [] },
    { id: "retention-wc", title: "Retention & Working Capital", module: "Working Capital", concept: "Retention receivable is part of working capital but illiquid. It must be planned for.", realWorld: "₹80L retention blocked across projects = significant portion of WC tied up.", mistakes: ["Treating retention as normal receivable in WC calculation"], interview: ["How should retention be treated while calculating working capital requirement?"], excel: "=RetentionReceivable + NormalReceivables - Payables", exercise: "Prepare WC statement including retention ageing.", quiz: [] },
    { id: "wc-optimization", title: "Working Capital Optimization", module: "Working Capital", concept: "Practical levers: Better collection, vendor credit, advance from clients, inventory discipline, factoring of receivables.", realWorld: "One contractor reduced WC requirement by 18% simply by submitting bills on time + weekly collection calls.", mistakes: ["Buying excess material 'just in case'", "Not using bill discounting or invoice factoring when rates are good"], interview: ["What are practical ways to reduce working capital requirement without hurting operations?"], excel: "Track weekly: Receivables ageing + Payables due + Cash balance", exercise: "Identify 3 quick wins to improve your WC position this month.", quiz: [] }
];

const budgetingModules = [
    { id: "project-budget", title: "Project Budget Preparation", module: "Budgeting", concept: "Detailed project budget is the financial blueprint. Must be prepared before mobilization.", realWorld: "Budget broken into 25–30 cost codes (Material, Labour, Plant, Subcontract, OH, Contingency).", mistakes: ["Copy-paste previous project budget without site-specific adjustments", "No contingency line item"], interview: ["What should be included in a good project budget?"], excel: "Create cost code structure + monthly cash flow linked to budget", exercise: "Prepare a zero-based budget for your next project.", quiz: [] },
    { id: "budget-vs-actual", title: "Budget vs Actual Tracking", module: "Budgeting", concept: "Weekly/Monthly variance analysis is how you stay in control of project finances.", realWorld: "Material variance +12%, Labour variance -4% → Overall project heading for 3% margin erosion.", mistakes: ["Reviewing budget vs actual only at project end", "Not drilling down into variance reasons"], interview: ["How frequently should project budget vs actual be reviewed?"], excel: "=Actual - Budget   // Variance", exercise: "Do budget vs actual for one running project this week.", quiz: [] },
    { id: "re-forecasting", title: "Project Re-forecasting", module: "Budgeting", concept: "When reality deviates from budget, re-forecast the remaining cost to complete (EAC).", realWorld: "Original budget margin 14%. After 40% progress, re-forecast shows only 9% final margin.", mistakes: ["Hiding bad news hoping it will improve later", "Not updating client on margin erosion early"], interview: ["What is Estimate at Completion (EAC) and why is it critical?"], excel: "Cost to Complete + Cost to Date = EAC", exercise: "Prepare EAC for one of your projects.", quiz: [] }
];

const costControlModules = [
    { id: "cost-control-philosophy", title: "Cost Control Mindset", module: "Cost Control", concept: "Cost control is not about cutting corners. It is about spending every rupee with maximum return.", realWorld: "Top contractors treat every ₹100 spent as an investment that must generate return.", mistakes: ["Treating cost control as finance department job only", "Sacrificing quality to save cost (leads to bigger losses later)"], interview: ["Who owns cost control on a project site?"], excel: "Daily/Weekly cost report by cost code", exercise: "Implement daily material consumption report on your site.", quiz: [] },
    { id: "material-cost-control", title: "Material Cost Control", module: "Cost Control", concept: "Material is usually 55–70% of project cost. Biggest lever for margin protection.", realWorld: "Copper price rose 22% in 4 months. Contractors who had price variation clause protected margin.", mistakes: ["Buying all material in one go without price hedge", "Poor site material management leading to theft/pilferage"], interview: ["How do you protect against material price escalation?"], excel: "Material reconciliation: Received vs Consumed vs Wastage", exercise: "Do material reconciliation for last month on your project.", quiz: [] },
    { id: "labour-productivity", title: "Labour Productivity & Cost", module: "Cost Control", concept: "Labour cost control comes from productivity, not just headcount reduction.", realWorld: "Ducting productivity improved from 18 sqm/man-day to 27 sqm/man-day after better supervision = 33% labour cost saving.", mistakes: ["Measuring only attendance, not output", "Not linking incentive to productivity"], interview: ["How do you measure and improve labour productivity on site?"], excel: "Output per man-day by activity", exercise: "Track productivity of 3 major activities this week.", quiz: [] }
];

const procurementFinanceModules = [
    { id: "procurement-finance-link", title: "Procurement & Finance Linkage", module: "Procurement Finance", concept: "Procurement decisions directly impact cash flow, working capital, and project margin.", realWorld: "Negotiating 45-day credit instead of advance payment improved cash position by ₹48L on one project.", mistakes: ["Procurement team buying cheapest without considering payment terms", "Not involving finance in major vendor negotiations"], interview: ["How should procurement and finance teams work together?"], excel: "Vendor-wise: Price + Payment Terms + Quality + Lead Time matrix", exercise: "Review payment terms of your top 10 vendors.", quiz: [] },
    { id: "vendor-payment-terms", title: "Vendor Payment Terms Strategy", module: "Procurement Finance", concept: "Smart payment term negotiation is a powerful but under-used profit lever.", realWorld: "Major chiller vendor agreed to 30% on PO, 40% on delivery, 30% after commissioning instead of 100% advance.", mistakes: ["Paying 100% advance for long lead items", "Not using bank guarantee / LC to protect both sides"], interview: ["What payment terms should you target for major equipment vs commodity items?"], excel: "Cash outflow schedule linked to PO terms", exercise: "Renegotiate payment terms with one critical vendor this month.", quiz: [] },
    { id: "early-payment-discount", title: "Early Payment Discount vs Cash", module: "Procurement Finance", concept: "Sometimes taking 2/10 net 30 discount makes sense. Sometimes preserving cash is more important.", realWorld: "2% discount for payment in 10 days vs 30 days = ~36% annualized return. Better than most bank deposits.", mistakes: ["Always taking early payment discount even when cash is tight", "Never asking for early payment discount"], interview: ["When should you take early payment discount from vendors?"], excel: "Compare: Discount benefit vs Cost of capital / Cash crunch impact", exercise: "Calculate whether early payment discount makes sense on your top 5 POs.", quiz: [] }
];

const projectFinanceModules = [
    { id: "project-finance-intro", title: "Introduction to Project Finance", module: "Project Finance", concept: "Project Finance is financing a specific project where repayment comes primarily from project cash flows, not sponsor balance sheet.", realWorld: "Large hospital MEP package financed through project-specific term loan + escrow of receivables.", mistakes: ["Treating every project as balance sheet funded", "Not ring-fencing project cash flows"], interview: ["When is project finance suitable vs corporate finance for contractors?"], excel: "Project cash flow model for debt sizing", exercise: "Identify one project in your pipeline that could be project-financed.", quiz: [] },
    { id: "tender-finance", title: "Tender Stage Finance Considerations", module: "Project Finance", concept: "Financial viability must be checked at tender stage itself — not after winning.", realWorld: "Bid bond, performance guarantee, advance bank guarantee, retention — all have cost and cash impact.", mistakes: ["Bidding without calculating BG cost and margin impact", "Ignoring escalation clause in tender"], interview: ["What financial checks should be done before submitting a tender?"], excel: "Tender financial summary: Revenue, Cost, Margin, WC requirement, BG cost", exercise: "Prepare tender finance checklist for your next bid.", quiz: [] },
    { id: "advance-recovery", title: "Advance & Its Recovery", module: "Project Finance", concept: "Mobilization advance (10–20%) is common. Recovery mechanism must be clearly understood.", realWorld: "10% advance on ₹3 Cr project = ₹30L. Usually recovered @ 10–15% from each RA bill.", mistakes: ["Spending advance on other projects", "Not planning recovery schedule leading to cash crunch later"], interview: ["How should mobilization advance be utilized and recovered?"], excel: "Advance received vs % recovered per RA bill", exercise: "Map advance recovery schedule for all running projects.", quiz: [] },
    { id: "bg-finance", title: "Bank Guarantee & Finance Cost", module: "Project Finance", concept: "BG commission (1–2.5% p.a.) + cash margin (15–25%) is a real cost that must be built into tender.", realWorld: "Performance BG of ₹40L for 3 years @ 1.8% = ₹2.16L finance cost + opportunity cost of margin money.", mistakes: ["Not including BG cost in project overhead", "Keeping BG alive longer than required"], interview: ["How do you optimize bank guarantee cost on projects?"], excel: "BG cost calculator: Amount × Rate × Period + Margin opportunity cost", exercise: "Calculate total BG-related finance cost for your current projects.", quiz: [] }
];

// Combine all modules
const academyData = [
    ...financeFoundations,
    ...pnlModules,
    ...balanceSheetModules,
    ...cashFlowModules,
    ...workingCapitalModules,
    ...budgetingModules,
    ...costControlModules,
    ...procurementFinanceModules,
    ...projectFinanceModules
];

window.academyData = academyData;