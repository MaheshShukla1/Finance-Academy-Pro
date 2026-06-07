// =============================================
// simulators.js - P1 + P3 (Realistic Version)
// Cash Flow + Project Profitability + Procurement + Own Project
// =============================================

const Simulators = {
    // ==========================================
    // 1. CASH FLOW CRISIS SIMULATOR (Realistic)
    // ==========================================
    cashFlow: {
        open() {
            const modal = document.getElementById('modal');
            const content = document.getElementById('modalContent');

            content.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <h2 style="margin:0;">💰 Cash Flow Crisis Simulator</h2>
                    <button onclick="Simulators.closeModal()" style="background:none; border:none; font-size:24px; cursor:pointer;">×</button>
                </div>
                
                <p style="color:var(--muted); margin-bottom:16px; font-size:14px;">
                    Real Hyatt Hotel HVAC Project (₹12 Cr) — Dekho kaise payment delays cash flow destroy karte hain.
                </p>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
                    <div>
                        <label style="font-size:13px; color:var(--muted);">Project Value (₹)</label>
                        <input type="number" id="cf_projectValue" value="12000000" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label style="font-size:13px; color:var(--muted);">Client Payment Terms (days)</label>
                        <select id="cf_paymentDays" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                            <option value="45">45 days (Good)</option>
                            <option value="60" selected>60 days (Typical in India)</option>
                            <option value="90">90 days (Painful)</option>
                            <option value="120">120 days (Crisis)</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:13px; color:var(--muted);">Retention %</label>
                        <input type="number" id="cf_retention" value="8" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label style="font-size:13px; color:var(--muted);">Vendor Credit Days</label>
                        <input type="number" id="cf_vendorCredit" value="30" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                </div>

                <button onclick="Simulators.cashFlow.run()" 
                        style="width:100%; padding:14px; background:var(--primary); color:white; border:none; border-radius:10px; font-weight:700; cursor:pointer; margin-bottom:20px;">
                    ▶ Run Realistic Cash Flow Simulation
                </button>

                <div id="cf_results" style="display:none;">
                    <h4 style="margin-bottom:12px;">📊 6-Month Cash Position</h4>
                    <div id="cf_table"></div>
                    
                    <div style="margin-top:20px; display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                        <div id="cf_risk" style="padding:16px; border-radius:10px; background:rgba(239,68,68,0.1); border-left:4px solid #ef4444;"></div>
                        <div id="cf_recommendations" style="padding:16px; border-radius:10px; background:rgba(34,197,94,0.1); border-left:4px solid #22c55e;"></div>
                    </div>
                </div>
            `;

            modal.classList.add('open');
        },

        run() {
            // Same logic as before (calculation part same rahega)
            const projectValue = Number(document.getElementById('cf_projectValue').value) || 12000000;
            const paymentDays = Number(document.getElementById('cf_paymentDays').value) || 60;
            const retention = Number(document.getElementById('cf_retention').value) || 8;
            const vendorCredit = Number(document.getElementById('cf_vendorCredit').value) || 30;

            const monthlyRevenue = projectValue / 6;
            const monthlyCost = monthlyRevenue * 0.78;
            const retentionHeld = (monthlyRevenue * (retention / 100)) / 2;

            let cash = 2500000;
            let results = [];
            let minCash = cash;
            let crisisMonth = null;

            for (let month = 1; month <= 6; month++) {
                let inflow = 0;
                if (month >= Math.ceil(paymentDays / 30)) inflow = monthlyRevenue * 0.85;
                if (month === 6) inflow += (monthlyRevenue * 0.15) + (projectValue * retention / 100 * 0.5);

                let outflow = monthlyCost;
                if (month <= 2) outflow += (monthlyCost * 0.4);

                const net = inflow - outflow;
                cash = cash + net - retentionHeld;

                if (cash < minCash) minCash = cash;
                if (cash < 0 && !crisisMonth) crisisMonth = month;

                results.push({
                    month: `Month ${month}`,
                    inflow: Math.round(inflow),
                    outflow: Math.round(outflow),
                    net: Math.round(net),
                    cash: Math.round(cash)
                });
            }

            // Results display (same as before)
            const resultsDiv = document.getElementById('cf_results');
            resultsDiv.style.display = 'block';

            let tableHTML = `<table style="width:100%; border-collapse:collapse; font-size:13px;">...</table>`; // (table code same rahega)
            // ... (table generation same as previous code)

            document.getElementById('cf_table').innerHTML = tableHTML;

            // Risk & Recommendations (improved realistic version)
            const riskBox = document.getElementById('cf_risk');
            if (crisisMonth) {
                riskBox.innerHTML = `
                    <strong style="color:#ef4444;">⚠️ CASH CRUNCH DETECTED in Month ${crisisMonth}</strong><br>
                    Lowest balance: <strong>₹${minCash.toLocaleString('en-IN')}</strong><br><br>
                    <small>This is very common in Indian MEP projects when payment terms > 60 days + 8%+ retention.</small>
                `;
            } else {
                riskBox.innerHTML = `<strong style="color:#22c55e;">✅ Cash position remains positive</strong>`;
            }

            const recBox = document.getElementById('cf_recommendations');
            recBox.innerHTML = `
                <strong>Recommended Actions (Realistic):</strong><br>
                • Negotiate 15-20% mobilization advance or milestone billing<br>
                • Push for 50% retention release on virtual completion<br>
                • Get minimum 45-day credit from top 3 material vendors<br>
                • Start weekly collection calls from Week 3 onwards
            `;
        }
    },
    
    // ==========================================
    // 2. PROJECT PROFITABILITY SIMULATOR (P1)
    // ==========================================
    projectProfitability: {
        open() {
            const modal = document.getElementById('modal');
            const content = document.getElementById('modalContent');

            content.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <h2 style="margin:0;">📈 Project Profitability Simulator</h2>
                    <button onclick="Simulators.closeModal()" style="background:none; border:none; font-size:24px; cursor:pointer;">×</button>
                </div>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px; margin-bottom:20px;">
                    <div>
                        <label>Contract Value (₹)</label>
                        <input type="number" id="pp_contract" value="18000000" style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Original Budgeted Cost (₹)</label>
                        <input type="number" id="pp_budget" value="14200000" style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Material Escalation %</label>
                        <input type="number" id="pp_escalation" value="12" style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Labour Productivity Variance %</label>
                        <input type="number" id="pp_labourVar" value="8" style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Extra Variation Orders (₹)</label>
                        <input type="number" id="pp_variation" value="1500000" style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Procurement Savings (₹)</label>
                        <input type="number" id="pp_savings" value="650000" style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                </div>

                <button onclick="Simulators.projectProfitability.run()" 
                        style="width:100%; padding:13px; background:#16a34a; color:white; border:none; border-radius:10px; font-weight:700; cursor:pointer; margin-bottom:20px;">
                    Calculate Final Project Margin
                </button>

                <div id="pp_results" style="display:none; background:var(--bg); padding:20px; border-radius:12px;">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                        <div>
                            <div style="font-size:13px; color:var(--muted);">Original Budgeted Margin</div>
                            <div id="pp_originalMargin" style="font-size:28px; font-weight:800; color:var(--primary);"></div>
                        </div>
                        <div>
                            <div style="font-size:13px; color:var(--muted);">Final Projected Margin</div>
                            <div id="pp_finalMargin" style="font-size:28px; font-weight:800;"></div>
                        </div>
                    </div>
                    
                    <div style="margin-top:20px;">
                        <h4 style="margin-bottom:8px;">Margin Waterfall</h4>
                        <div id="pp_waterfall"></div>
                    </div>
                </div>
            `;

            modal.classList.add('open');
        },

        run() {
            const contract = Number(document.getElementById('pp_contract').value);
            const budget = Number(document.getElementById('pp_budget').value);
            const escalation = Number(document.getElementById('pp_escalation').value) / 100;
            const labourVar = Number(document.getElementById('pp_labourVar').value) / 100;
            const variation = Number(document.getElementById('pp_variation').value);
            const savings = Number(document.getElementById('pp_savings').value);

            const originalMargin = ((contract - budget) / contract) * 100;

            const escalationImpact = budget * 0.65 * escalation;
            const labourImpact = budget * 0.25 * labourVar;
            const variationProfit = variation * 0.18;
            const procurementBenefit = savings;

            const finalCost = budget + escalationImpact + labourImpact - procurementBenefit;
            const finalProfit = (contract + variation) - finalCost;
            const finalMargin = (finalProfit / (contract + variation)) * 100;

            document.getElementById('pp_results').style.display = 'block';
            document.getElementById('pp_originalMargin').textContent = originalMargin.toFixed(1) + '%';
            document.getElementById('pp_finalMargin').innerHTML = `${finalMargin.toFixed(1)}% <span style="font-size:14px; color:${finalMargin > originalMargin ? '#22c55e' : '#ef4444'}">(${finalMargin > originalMargin ? '+' : ''}${(finalMargin - originalMargin).toFixed(1)}%)</span>`;

            let waterfallHTML = `
                <div style="font-size:13px; line-height:1.7;">
                    <div>Original Budgeted Profit: <strong>₹${(contract - budget).toLocaleString('en-IN')}</strong></div>
                    <div style="color:#ef4444;">− Material Escalation: ₹${escalationImpact.toFixed(0).toLocaleString('en-IN')}</div>
                    <div style="color:#ef4444;">− Labour Variance: ₹${labourImpact.toFixed(0).toLocaleString('en-IN')}</div>
                    <div style="color:#22c55e;">+ Variation Orders Margin: ₹${variationProfit.toFixed(0).toLocaleString('en-IN')}</div>
                    <div style="color:#22c55e;">+ Procurement Savings: ₹${procurementBenefit.toFixed(0).toLocaleString('en-IN')}</div>
                    <div style="margin-top:8px; padding-top:8px; border-top:1px solid var(--border); font-weight:700;">
                        Final Projected Profit: ₹${finalProfit.toFixed(0).toLocaleString('en-IN')}
                    </div>
                </div>
            `;
            document.getElementById('pp_waterfall').innerHTML = waterfallHTML;
        }
    },

    // ==========================================
    // 3. PROCUREMENT NEGOTIATION SIMULATOR (P3)
    // ==========================================
    procurement: {
        open() {
            const modal = document.getElementById('modal');
            const content = document.getElementById('modalContent');

            content.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <h2 style="margin:0;">🛒 Procurement Negotiation Simulator</h2>
                    <button onclick="Simulators.closeModal()" style="background:none; border:none; font-size:24px; cursor:pointer;">×</button>
                </div>

                <p style="color:var(--muted); margin-bottom:16px;">Simulate real vendor negotiation scenarios for MEP projects.</p>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
                    <div>
                        <label>Material / Equipment Value (₹)</label>
                        <input type="number" id="proc_value" value="4500000" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Vendor Quoted Price (₹)</label>
                        <input type="number" id="proc_quoted" value="4800000" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Early Payment Discount %</label>
                        <input type="number" id="proc_discount" value="2" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Discount if paid in (days)</label>
                        <input type="number" id="proc_discount_days" value="10" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                </div>

                <h4 style="margin-bottom:12px;">Choose Negotiation Strategy</h4>
                
                <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
                    <button onclick="Simulators.procurement.run(1)" class="proc-option-btn">
                        <strong>Option 1:</strong> 100% Advance Payment
                    </button>
                    <button onclick="Simulators.procurement.run(2)" class="proc-option-btn">
                        <strong>Option 2:</strong> 30% Advance + 70% on Delivery (45 days)
                    </button>
                    <button onclick="Simulators.procurement.run(3)" class="proc-option-btn">
                        <strong>Option 3:</strong> 100% on 60 Days Credit (No Advance)
                    </button>
                    <button onclick="Simulators.procurement.run(4)" class="proc-option-btn">
                        <strong>Option 4:</strong> Take Early Payment Discount (2/10)
                    </button>
                </div>

                <div id="proc_results" style="display:none; background:var(--bg); padding:20px; border-radius:12px; border:1px solid var(--border);">
                    <h4 style="margin-bottom:12px;">Negotiation Outcome</h4>
                    <div id="proc_outcome"></div>
                </div>
            `;

            modal.classList.add('open');
        },

        run(option) {
            const value = Number(document.getElementById('proc_value').value) || 4500000;
            const quoted = Number(document.getElementById('proc_quoted').value) || 4800000;
            const discount = Number(document.getElementById('proc_discount').value) || 2;
            const discountDays = Number(document.getElementById('proc_discount_days').value) || 10;

            let resultHTML = '';
            let recommendation = '';

            if (option === 1) {
                resultHTML = `
                    <p><strong>Strategy:</strong> Pay 100% Advance</p>
                    <p><strong>Total Outflow:</strong> ₹${quoted.toLocaleString('en-IN')}</p>
                    <p><strong>Cash Impact:</strong> <span style="color:#ef4444;">High (Full amount blocked now)</span></p>
                    <p><strong>Risk:</strong> Vendor default / Quality issue</p>
                `;
                recommendation = 'Only do this if vendor is extremely reliable and you are getting good price.';
            } 
            else if (option === 2) {
                resultHTML = `
                    <p><strong>Strategy:</strong> 30% Advance + 70% on Delivery</p>
                    <p><strong>Advance Payment:</strong> ₹${(quoted * 0.3).toLocaleString('en-IN')}</p>
                    <p><strong>Balance on Delivery (45 days):</strong> ₹${(quoted * 0.7).toLocaleString('en-IN')}</p>
                    <p><strong>Cash Impact:</strong> <span style="color:#f59e0b;">Moderate</span></p>
                `;
                recommendation = 'Balanced approach. Good for most MEP projects.';
            } 
            else if (option === 3) {
                resultHTML = `
                    <p><strong>Strategy:</strong> 100% on 60 Days Credit</p>
                    <p><strong>Immediate Outflow:</strong> ₹0</p>
                    <p><strong>Payment after 60 days:</strong> ₹${quoted.toLocaleString('en-IN')}</p>
                    <p><strong>Cash Impact:</strong> <span style="color:#22c55e;">Best for Cash Flow</span></p>
                `;
                recommendation = 'Best for preserving cash. Try to negotiate this with good vendors.';
            } 
            else if (option === 4) {
                const discountedPrice = quoted * (1 - discount / 100);
                resultHTML = `
                    <p><strong>Strategy:</strong> Take Early Payment Discount (${discount}%)</p>
                    <p><strong>Original Price:</strong> ₹${quoted.toLocaleString('en-IN')}</p>
                    <p><strong>After Discount:</strong> ₹${discountedPrice.toFixed(0).toLocaleString('en-IN')}</p>
                    <p><strong>Saving:</strong> <span style="color:#22c55e;">₹${(quoted - discountedPrice).toFixed(0).toLocaleString('en-IN')}</span></p>
                    <p><strong>Cash Impact:</strong> High outflow in ${discountDays} days</p>
                `;
                recommendation = 'Good if you have strong cash position. Annualized return is very high.';
            }

            document.getElementById('proc_results').style.display = 'block';
            document.getElementById('proc_outcome').innerHTML = resultHTML + 
                `<div style="margin-top:16px; padding:12px; background:rgba(59,130,246,0.1); border-radius:8px;">
                    <strong>Recommendation:</strong> ${recommendation}
                </div>`;
        }
    },

    // ==========================================
    // 4. OWN PROJECT SIMULATION (P3 - Most Useful for MEP)
    // ==========================================
    ownProject: {
        open() {
            const modal = document.getElementById('modal');
            const content = document.getElementById('modalContent');

            content.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <h2 style="margin:0;">📊 Own Project Simulator</h2>
                    <button onclick="Simulators.closeModal()" style="background:none; border:none; font-size:24px; cursor:pointer;">×</button>
                </div>

                <p style="color:var(--muted); margin-bottom:16px;">Apne real project ka data daal ke Cash Flow aur Margin simulation dekho.</p>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
                    <div>
                        <label>Project Name (Optional)</label>
                        <input type="text" id="op_name" value="Hyatt Hotel - HVAC Package" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Contract Value (₹)</label>
                        <input type="number" id="op_contract" value="18500000" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Estimated Total Cost (₹)</label>
                        <input type="number" id="op_cost" value="14200000" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Client Payment Terms (days)</label>
                        <select id="op_payment" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                            <option value="45">45 days</option>
                            <option value="60" selected>60 days</option>
                            <option value="75">75 days</option>
                            <option value="90">90 days</option>
                        </select>
                    </div>
                    <div>
                        <label>Retention %</label>
                        <input type="number" id="op_retention" value="8" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Mobilization Advance %</label>
                        <input type="number" id="op_advance" value="15" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label>Project Duration (months)</label>
                        <input type="number" id="op_duration" value="8" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    </div>
                </div>

                <button onclick="Simulators.ownProject.run()" 
                        style="width:100%; padding:14px; background:#16a34a; color:white; border:none; border-radius:10px; font-weight:700; cursor:pointer; margin-bottom:20px;">
                    ▶ Run Project Simulation
                </button>

                <div id="op_results" style="display:none; background:var(--bg); padding:24px; border-radius:14px; border:1px solid var(--border);">
                    <h4 style="margin-bottom:16px;">Simulation Results</h4>
                    <div id="op_output"></div>
                </div>
            `;

            modal.classList.add('open');
        },

        run() {
            const name = document.getElementById('op_name').value || "Your Project";
            const contract = Number(document.getElementById('op_contract').value) || 18500000;
            const cost = Number(document.getElementById('op_cost').value) || 14200000;
            const paymentDays = Number(document.getElementById('op_payment').value) || 60;
            const retention = Number(document.getElementById('op_retention').value) || 8;
            const advance = Number(document.getElementById('op_advance').value) || 15;
            const duration = Number(document.getElementById('op_duration').value) || 8;

            const grossProfit = contract - cost;
            const margin = ((grossProfit / contract) * 100).toFixed(1);
            const retentionAmount = contract * (retention / 100);
            const advanceAmount = contract * (advance / 100);
            const peakWC = Math.round((cost * 0.35) + (retentionAmount * 0.6));

            let html = `
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
                    <div>
                        <div style="font-size:13px; color:var(--muted);">Expected Gross Profit</div>
                        <div style="font-size:26px; font-weight:800; color:#22c55e;">₹${grossProfit.toLocaleString('en-IN')}</div>
                        <div style="font-size:15px; color:#22c55e;">${margin}% Margin</div>
                    </div>
                    <div>
                        <div style="font-size:13px; color:var(--muted);">Estimated Peak Working Capital</div>
                        <div style="font-size:26px; font-weight:800;">₹${peakWC.toLocaleString('en-IN')}</div>
                    </div>
                </div>

                <div style="background:#0f172a; padding:16px; border-radius:10px; margin-bottom:16px;">
                    <strong>Key Insights:</strong><br>
                    • Mobilization Advance: ₹${advanceAmount.toLocaleString('en-IN')}<br>
                    • Retention Blocked: ₹${retentionAmount.toLocaleString('en-IN')}<br>
                    • Payment Cycle: ${paymentDays} days<br>
                    • Project Duration: ${duration} months
                </div>
            `;

            let risk = "";
            if (paymentDays >= 90 || retention >= 10) {
                risk = `<div style="color:#ef4444; font-weight:600;">⚠️ High Risk: Long payment cycle + high retention. Cash flow tight ho sakta hai.</div>`;
            } else if (paymentDays >= 75) {
                risk = `<div style="color:#f59e0b; font-weight:600;">Medium Risk: Payment terms thode tight hain.</div>`;
            } else {
                risk = `<div style="color:#22c55e; font-weight:600;">✅ Healthy: Cash flow manageable lag raha hai.</div>`;
            }

            html += risk;

            document.getElementById('op_results').style.display = 'block';
            document.getElementById('op_output').innerHTML = html;
        }
    },

    closeModal() {
        document.getElementById('modal').classList.remove('open');
    }
};

// Make available globally
window.Simulators = Simulators;