# AI-Powered Automatic Block Planning to Maximize Asset Availability for Train Operations on Indian Railways

**Finalized solution document**

---

## 0. Summary

| | |
|---|---|
| **What** | An AI-assisted planning system that reads maintenance/defect data from TMS, SMMS and TDMS, combines it with operational planning data from COA, and produces optimized weekly and monthly maintenance block plans. |
| **Why** | Each department scores urgency on its own incompatible scale and COA grants blocks with no visibility into that urgency or into overlapping cross-department demand — this directly causes deferred safety-critical maintenance and inefficient use of scarce corridor time. |
| **Where** | Applied at the divisional/zonal level, across the same Zone→Division→Section (asset) and Corridor→Block Section (traffic) hierarchies these systems already use. |
| **Who** | Railway maintenance planners and controlling/planning personnel who need a unified view of maintenance demand, risk and available planning windows. |
| **How** | A four-layer read-only pipeline: data integration, hybrid rule+AI priority scoring, custom block-planning optimization, and a planning dashboard with monthly, weekly and what-if views. |

---

## 1. Problem diagnosis (grounded in TMS, SMMS, TDMS, COA documentation)

- **TMS, SMMS, and TDMS** each digitize their own maintenance/defect data with independently-calibrated severity logic:
  - SMMS uses Good/Warning/Critical numeric bands (e.g. LED voltage/current ranges) per schedule code.
  - TMS tracks overdue-days against inspection periodicity, USFD defect results, and GMT carried.
  - TDMS tracks threshold/exception data against its own Master Defect Register.
  - These scores are **never compared across departments** — there is no shared sense of whose defect is more urgent when two departments want the same corridor window.
- **COA** holds the authoritative track geography and traffic picture (block section, line, direction, KM range, timetable, goods forecast) and grants maintenance blocks/disconnections on controller judgment, with **no visibility into why a department needs a block** (criticality, backlog, risk) and no automated way to notice when two departments' requests on the same corridor could be combined.
- **Net effect:** decentralized prioritization across departments, manual/ad-hoc coordination of overlapping requests, no linkage between block requests and actual corridor capacity, and no multi-week/month rollup — block planning today is per-block, per-date, and manual.

---

## 2. Solution scope and boundaries

A **thin, read-only decision-support layer** for maintenance block planning. It does **not** replace TMS, SMMS, TDMS, or COA, and does **not** write into any of them.

**In scope:**
- Reading maintenance/defect data from TMS, SMMS, TDMS.
- Reading corridor/traffic/timetable data from COA.
- Producing a ranked, cross-department priority score.
- Producing a weekly firm plan and a monthly indicative plan.
- Surfacing overlapping-request merge suggestions and capacity-overload warnings.
- Reacting to disruptions (delays, early returns) by re-planning and showing a diff.

**Out of scope (explicitly):**
- No write access into COA or any other operational system.
- No automatic block approval, grant or execution.
- No live safety or curtailment decision.
- Exact time-slot commitments beyond the near-term (weekly) horizon — the monthly view is a capacity plan, not a slot plan, because COA itself doesn't have firm data that far out.
- No dependency on Google OR-Tools or proprietary optimization tools.
- Any ML model or data field not traceable to something actually present in the TMS/SMMS/TDMS/COA documentation.

This scope was arrived at deliberately: removing write-access risk keeps the system deployable without touching a live safety-critical system, and preserving full human sign-off keeps the design honest about what should and shouldn't be automated in a railway operations context.

---

## 3. Geography model

Two distinct hierarchies exist across these systems and must not be conflated:

| Hierarchy | Purpose | Fields |
|---|---|---|
| **Administrative / asset-ownership** (SMMS, TMS, TDMS) | Identifies which office/depot owns an asset | Zone → Division → Section → Location type → Location/Station |
| **Operational / traffic** (COA) | Identifies the physical track unit a block occupies, and is the basis on which COA manages corridor availability | Corridor → Elementary Section / Block Area → Sub Section → Block Section (station-pair, e.g. `CYZ-GZB`) → Line → Direction (UP/DN/BOTH) → Start KM–End KM |

**Required integration component:** a **station-to-block-section mapping table**, joining each asset's install-location station (from SMMS/TMS/TDMS) to the COA Block Section(s) that station belongs to. Without this table, defect records and corridor slots cannot be joined at all — it is a first-class, necessary part of the data model, not an incidental lookup.

---

## 4. Four-layer pipeline (mapped to the four PS requirements)

### Layer 1 — Data integration
Scheduled adapters read available report/export data from TMS, SMMS, TDMS and COA. Data is extracted, cleaned, normalized, mapped from asset location to operational geography, and stored as unified planning data.

### Layer 2 — Hybrid priority scoring
```
priority_score = w1 × severity_band_score + w2 × normalized_failure_risk + w3 × overdue_urgency
```
- `severity_band_score` — taken directly from each department's own certified thresholds (rule-based, no ML).
- `normalized_failure_risk` — output of a trained ML classifier (Section 6).
- `overdue_urgency` — derived from each system's own overdue/periodicity data.
- Weights (`w1, w2, w3`) are set by domain experts, not learned, keeping the score auditable and each item's score breakdown (severity / risk / overdue) inspectable individually.

### Layer 3 — Block Planning Engine
- **Compatible work detection** identifies maintenance activities that may be planned together.
- **Operational compatibility checks** validate Block Section, Line, Direction, KM/location compatibility, time-window overlap and work requirements.
- **Hard constraints** are enforced before every assignment and before every annealing move.
- **Greedy assignment** creates the initial feasible plan.
- **Simulated annealing** improves the feasible plan by testing valid swaps/reassignments.
- No dependency on Google OR-Tools or proprietary optimization tools.

### Layer 4 — Multi-horizon output
- Backlog is bucketed into Week 1–4 + overflow using due dates.
- **Monthly plan** (regenerated weekly): demand-vs-capacity planning by week; the current week's actual capacity is reused as the planning baseline for Weeks 2–4. No forecasting model is used. Flags `AT_RISK_NEEDS_ESCALATION` when demand exceeds the assumed capacity.
- **Weekly plan** (regenerated daily): detailed exact recommended planning windows using the latest operational information.
- Monthly `target_week` assignments feed into weekly planning.

---

## 5. All scheduling constraints (hard and soft)

**Hard constraints — must never be violated:**
- No two incompatible items may be assigned to the same block section, line and direction with overlapping time windows.
- Every slot must include the safety buffer before and after the adjacent confirmed train path.
- If `disconnection_required = Y`, the assigned slot duration must cover disconnect + work + reconnect time, not just the raw work duration.
- An item can never be scheduled after its own `due_date` (derived from its periodicity cycle) — if no feasible slot exists before then, it is flagged, not silently dropped.
- The system never assigns a slot that conflicts with COA's confirmed timetable or goods paths.

**Soft constraints — optimized, not guaranteed:**
- Minimize total priority-weighted delay across all pending items.
- Prefer efficiently combining compatible maintenance work over scheduling it separately.
- Prefer earlier feasible slots over later ones when priority scores are close.

**Data/process constraints:**
- No write access into TMS, SMMS, TDMS, or COA — output is read-only and informational.
- No feature used in the ML model may be a post-outcome field (see leakage exclusions in Section 6) — only information available before a failure occurs.
- No corridor capacity number is invented — weeks 2–4 always borrow the actual, confirmed current-week figure, never a projected one.
- No live safety or curtailment decision is made or suggested by the system.

---

## 6. Where ML is used — and where it deliberately is not

| Decision | ML? | Approach |
|---|---|---|
| Decision | Method |
|---|---|
| Severity | Rule-based |
| Overdue urgency | Rule-based |
| Failure risk if maintenance is deferred | **XGBoost AI model** |
| Combined-work detection | Rule-based compatibility |
| Monthly capacity | Current-week capacity assumption |
| Block scheduling | **Greedy + Simulated Annealing** |

### Target variable
Binary: *does a Failure Entry (SMMS MT11) / Master Defect Register entry (TDMS) / USFD defect (TMS) occur within one periodicity cycle after a given maintenance record?* Window length is tied to each asset's own periodicity (Fortnightly/Monthly/Quarterly/Half-Yearly/Yearly), not a fixed arbitrary number.

### Features (all traceable to a named field in the docs)
Asset age (Codal Life / Date of Installation / laying date), days since last maintenance, days overdue, recent Good/Warning/Critical trend, prior failure count, prior cause-of-failure repeats, GMT carried (TMS), last USFD result (TMS), Make/Model/variant, Train Detained/Detention minutes (operational impact).

### Explicit leakage exclusions
Repaired Status, Repaired on/by, Rectification By, Failure Duration, Action Performed, Remarks — all post-failure fields, never used as model inputs.

### Class imbalance
Expected and named explicitly — failures are rare relative to total maintenance records. Use class weighting and precision/recall/F1, not raw accuracy.

### Cold-start behavior
Asset types with too little failure history to train a reliable model use a neutral default risk value rather than a model prediction, so the system is usable from day one without waiting for sufficient historical data to accumulate.

---

## 7. Real-time disruption handling

### Real Disruption
- Delay within the existing safety buffer → log only.
- Localized disruption → scoped weekly re-plan for the affected corridor/day.
- Large disruption → early full weekly re-plan.
- Items already **IN_PROGRESS** are excluded from reassignment.
- Critical items may move ahead of lower-priority items with slack.
- Live safety/curtailment decisions remain with the human controller.
- Output is **Plan Changes** showing what moved and why.

### What-If Scenario
A hypothetical scenario does not overwrite the baseline plan.

```text
Baseline Weekly Plan
        ↓
Scenario Change
        ↓
Impact Detection
        ↓
Re-run Weekly Planning
        ↓
Updated Weekly Plan
        ↓
Plan Changes vs Baseline
```

Possible scenarios:
- Planning window unavailable
- New critical maintenance item
- Reduced available capacity
- Different compatible-work combination

---

## 8. System architecture and tech stack

- **Source systems** (TMS, SMMS, TDMS, COA): untouched, read-only via existing report/export mechanisms.
- **Data integration:** Python adapters + APScheduler/cron; includes the station-to-block-section mapping table.
- **Unified data store:** PostgreSQL — current-state tables + historical tables for ML training.
- **Intelligence layer:** rule engine (Python, no ML) + scikit-learn/XGBoost failure-risk model, served as simple functions or a lightweight FastAPI endpoint. No corridor forecasting model is used — the monthly plan reuses the current week's actual capacity.
- **Planning layer:** plain Python greedy + simulated annealing; optional PuLP+CBC formulation as a stretch goal.
- **Output layer:** a single **read-only planning dashboard** with monthly plan, weekly plan, risk/priority view, updated weekly plan and scenario comparison. React + FastAPI is the recommended prototype stack.
- Deliberately **no message queues, no microservices split, no Kubernetes** — the architecture remains lightweight and hackathon-ready.

---

## 9. Guardrails maintained throughout

- Every priority score is auditable — traceable to its rule-based and ML components, with weights set by domain experts.
- No proprietary/Google OR-Tools dependency; open-source or custom alternatives named explicitly.
- ML used only where genuine historical outcome data exists to support it (failure risk) — not applied to decisions that are already correctly rule-governed (severity bands) or that are structurally an optimization problem, not a prediction problem (slot assignment, corridor capacity).
- Human decision-making remains outside the planning engine; the system only produces recommendations and never automates or overrides live safety decisions.
- No fabricated data fields — every feature and geography term used is traced back to a specific field visible in the TMS, SMMS, TDMS, or COA documentation.
- No corridor capacity figure is projected or invented — always the actual current-week figure, reused with a stated assumption.

---

## 10. What This Solution Does Not Attempt

- Does not make or override live safety/curtailment decisions.
- Does not provide exact slot commitments beyond the near-term weekly planning horizon.
- Does not modify source operational systems.
- Does not build a corridor traffic forecasting model.

---

## 11. Final End-to-End Planning Flow

## 11. Final End-to-End Planning Flow

```text
TMS ─┐
SMMS ├──→ DATA INTEGRATION
TDMS ┤           ↓
COA ─┘    UNIFIED PLANNING DATA
                  ↓
          PRIORITY & RISK ENGINE
        ┌─────────┼──────────┐
        ↓         ↓          ↓
     Severity  Overdue   XGBoost
       Rules     Rules    Failure Risk
        └─────────┼──────────┘
                  ↓
            PRIORITY SCORE
                  ↓
       COMPATIBLE WORK DETECTION
                  ↓
     OPERATIONAL COMPATIBILITY
                  ↓
        HARD CONSTRAINT FILTER
                  ↓
          GREEDY ASSIGNMENT
                  ↓
      SIMULATED ANNEALING
                  ↓
        OPTIMIZED PLAN
           ┌──────┴──────┐
           ↓             ↓
      MONTHLY PLAN   WEEKLY PLAN
      Target Week   Exact Recommended
      Capacity      Planning Window
           │             │
           └──────┬──────┘
                  ↓
         WHAT-IF / REPLANNING
                  ↓
         UPDATED WEEKLY PLAN
                  ↓
            PLAN CHANGES
                  ↓
          PLANNING DASHBOARD
```
