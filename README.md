# RailBlock AI — AI-Powered Automatic Block Planning System for Indian Railways

[![Indian Railways](https://img.shields.io/badge/Ministry%20of%20Railways-Government%20of%20India-850e0e?style=for-the-badge)](https://indianrailways.gov.in)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **SIH 2026 Prototype**: Integrated Decision-Support System for Automatic Maintenance Block Planning to Maximize Asset Availability for Train Operations on Indian Railways (Northern Railway, Delhi Division).

---

## 📌 Table of Contents
- [Executive Overview](#-executive-overview)
- [Key Features](#-key-features)
- [System Architecture & 5 Core Engines](#-system-architecture--5-core-engines)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started for Collaborators](#-getting-started-for-collaborators)
- [7-Step Demo Guide for SIH Jury](#-7-step-demo-guide-for-sih-jury)
- [Safety & Governance Guardrails](#-safety--governance-guardrails)

---

## 🚂 Executive Overview

Indian Railways relies on four major independent maintenance systems:
1. **TMS** (Track Management System) — Track repairs, tamping, BCM deep screening, rail grinding.
2. **SMMS** (Signal & Interlocking Maintenance Management System) — Point machine overhauls, signal calibrations.
3. **TDMS** (Traction Distribution Management System) — Overhead Equipment (OHE) wire tensioning and isolator inspections.
4. **COA** (Control Office Application) — Live train dispatching, timetables, and block grants.

Currently, maintenance block requests are filed independently by departments without automated cross-departmental coordination, leading to duplicate corridor disconnections and train delays. 

**RailBlock AI** normalizes demand across TMS, SMMS, and TDMS, detects overlapping maintenance work, ranks cross-departmental priority using audited formulas and XGBoost ML failure risk, and solves multi-objective block scheduling using a Greedy + Simulated Annealing optimization solver.

---

## ⚡ Key Features

- 🏛️ **Official Indian Railways Enterprise UI**: Designed following authentic CRIS / COA operational control room standards (Plus Jakarta Sans + JetBrains Mono typography, Indian Railways Crimson `#850e0e` palette).
- 🧮 **Auditable Cross-Department Priority Engine**: Calculates priority using domain-certified weights:
  $$\text{Priority Score} = 0.40 \times \text{Severity} + 0.40 \times \text{AI Failure Risk} + 0.20 \times \text{Overdue Urgency}$$
- 🤖 **Predictive Failure Risk Classifier (XGBoost)**: Evaluates 30-day asset failure probability using pre-outcome telemetry with SHAP feature attributions.
- 🔀 **Compatible Work Merging Engine**: Automatically detects requests on the same block section, line, direction, and time window, calculating net corridor hours saved (~18.5 hrs/week).
- 🛡️ **Hard & Soft Constraint Satisfaction Solver**: Validates 15-minute train timetable buffers, disconnection coverage, section capacity limits, and periodicity deadlines.
- 🧪 **What-If Scenario Sandbox**: Simulates corridor capacity drops, track blockages, or emergency maintenance insertions without altering the confirmed baseline schedule.
- 📜 **Weekly Plan Changes Diff Inspector**: Generates side-by-side visual diff logs for moved, added, or deferred block requests.

---

## 🏗️ System Architecture & 5 Core Engines

```
                           +-------------------------------------+
                           |   SOURCE SYSTEMS (Read-Only)        |
                           |   TMS   |   SMMS   |  TDMS  |  COA  |
                           +------------------+------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |  PIPELINE LAYER 1: DATA NORM.       |
                           |  Geography & Station-to-Block Join  |
                           +------------------+------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |  PIPELINE LAYER 2: PRIORITY ENGINE  |
                           |  40% Severity + 40% Risk + 20% Overdue|
                           +------------------+------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |  PIPELINE LAYER 3: WORK MERGING     |
                           |  Cross-Dept Compatibility Detection |
                           +------------------+------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |  PIPELINE LAYER 4: SOLVER ENGINE    |
                           |  Greedy + Simulated Annealing (2.5k)|
                           +------------------+------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |  PIPELINE LAYER 5: HUMAN APPROVAL   |
                           |  COA Controller Block Recommendation |
                           +-------------------------------------+
```

### Engine Implementations (`src/services/`):
1. [`priorityEngine.js`](file:///d:/SIHHH/src/services/priorityEngine.js): Domain severity scoring + overdue urgency logic.
2. [`aiRiskEngine.js`](file:///d:/SIHHH/src/services/aiRiskEngine.js): XGBoost failure risk prediction with SHAP explanations and data leakage guardrails.
3. [`compatibilityEngine.js`](file:///d:/SIHHH/src/services/compatibilityEngine.js): Cross-department corridor compatibility detection.
4. [`constraintEngine.js`](file:///d:/SIHHH/src/services/constraintEngine.js): 5 Hard constraints validator (train timetable buffer, disconnect coverage, section capacity, adjacent tracks, periodicity).
5. [`planningEngine.js`](file:///d:/SIHHH/src/services/planningEngine.js): Greedy + Simulated Annealing multi-objective scheduler.

---

## 📁 Project Directory Structure

```text
SIHHH/
├── index.html                    # Root HTML with Google Fonts (Plus Jakarta Sans & JetBrains Mono)
├── package.json                  # Dependencies (React 19, Vite, Tailwind CSS v3, Recharts, Lucide)
├── tailwind.config.js            # Tailwind v3 Configuration
├── postcss.config.js             # PostCSS Autoprefixer Configuration
├── vite.config.js                # Vite React Plugin Configuration
├── src/
│   ├── main.jsx                  # Application entry point
│   ├── App.jsx                   # Master routing & layout wrapper
│   ├── index.css                 # Design tokens, Indian Railways light theme styling, badges
│   ├── components/               # Reusable Enterprise Components
│   │   ├── Topbar.jsx            # IR-COA Header with Zone/Division/Horizon controls
│   │   ├── Sidebar.jsx           # Industrial navigation drawer
│   │   ├── KPICard.jsx           # Monospace operational metrics cards
│   │   ├── PriorityDetailsModal.jsx # Auditable priority formula inspector modal
│   │   ├── BlockDetailsDrawer.jsx  # Constraint validation drawer (Human Approval Required)
│   │   └── SimulatedAnnealingWidget.jsx # Scheduling solver pipeline widget
│   ├── data/
│   │   ├── mockData.js           # 184 maintenance items, timetable train paths, disruptions
│   │   └── geographicData.js     # Administrative vs Operational dual geography mapping
│   ├── services/                 # The 5 Core Computational Engines
│   │   ├── priorityEngine.js
│   │   ├── aiRiskEngine.js
│   │   ├── compatibilityEngine.js
│   │   ├── constraintEngine.js
│   │   └── planningEngine.js
│   └── pages/                    # 13 Application Views
│       ├── LandingPage.jsx       # Official Console Entry Screen
│       ├── CommandCenter.jsx     # Executive Operations Dashboard
│       ├── MonthlyPlan.jsx       # 4-Week Capacity Planning Rollup
│       ├── WeeklyPlan.jsx        # 7-Day Firm Schedule Board
│       ├── BlockRequests.jsx     # Maintenance Demand Backlog
│       ├── Compatibility.jsx     # Compatible Work Merge Proposals
│       ├── PriorityRisk.jsx      # Priority Matrix Scatter Plot & List
│       ├── AIRiskAnalysis.jsx    # Predictive Failure Risk & SHAP Features
│       ├── Disruptions.jsx       # Real-Time Corridor Disruption Re-planning
│       ├── WhatIfScenarios.jsx   # Non-destructive What-If Sandbox
│       ├── PlanChanges.jsx       # Weekly Plan Changes Diff Inspector
│       ├── UnifiedData.jsx       # Dual Geography Mapping Visualizer
│       ├── SourceSystems.jsx     # Read-Only Integration Adapters (TMS/SMMS/TDMS/COA)
│       └── AuditGuardrails.jsx   # Safety & Audit Compliance Guardrails
```

---

## 🛠️ Getting Started for Collaborators

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Step-by-Step Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Vasu3759/SIH-1.git
   cd SIH-1
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---

## 🎯 7-Step Demo Guide for SIH Jury

Follow this sequence during judge evaluation (3–5 minutes):

1. **Console Entry Screen** (`LandingPage`): Point out Zone (Northern Railway), Division (Delhi), and Read-Only Decision Support disclaimer. Click **"Enter Planning Console"**.
2. **Executive Command Center** (`CommandCenter`): Highlight 184 maintenance requests, 17 critical items, and 82% corridor utilization.
3. **Priority & Risk Inspector** (`PriorityRisk`): Click any item (e.g. `TMS-101`) to inspect the 40-40-20 formula breakdown.
4. **Work Merging Opportunities** (`Compatibility`): Show how 11 compatible work items on the same section save ~18.5 hours/week of corridor closure time.
5. **7-Day Weekly Schedule** (`WeeklyPlan`): Click a block slot to open the **Block Recommendation Drawer** and demonstrate the 5 hard constraint pass checks.
6. **What-If Sandbox** (`WhatIfScenarios`): Select *Reduced Corridor Capacity* and click **"Run Scenario"**. Show how the solver shifts low-priority blocks.
7. **Plan Changes Diff** (`PlanChanges`): View the side-by-side diff log showing exactly what changed, why, and the operational rationale.

---

## 🔒 Safety & Governance Guardrails

1. **Read-Only Architecture**: Zero write operations against TMS, SMMS, TDMS, or COA live databases.
2. **Human Control**: All generated block windows are advisory recommendations requiring explicit sign-off by controlling personnel (`RECOMMENDATION — HUMAN APPROVAL REQUIRED`).
3. **IN_PROGRESS Lock**: Active maintenance blocks in progress are protected against automated curtailment.

---

### 👥 Contributors
Developed for **Smart India Hackathon (SIH)** — Indian Railways Automatic Block Planning Problem Statement.
