# AssetFlow — Product Requirements Document (PRD)

**Enterprise Asset & Resource Management System**
Version 1.0 | Prepared for Hackathon Build

---

## 1. Overview

### 1.1 Product Vision
AssetFlow is a centralized ERP platform that digitizes how organizations track, allocate, and maintain physical assets and shared resources — replacing spreadsheets and paper logs with structured lifecycles, conflict-free booking, and real-time visibility. It is industry-agnostic: any organization with equipment, furniture, vehicles, or shared spaces (offices, schools, hospitals, factories, agencies) can use it.

### 1.2 Problem Statement
Organizations lack a single source of truth for "who holds what, where it is, and its condition." Manual tracking causes double-allocation, missed maintenance, booking conflicts, and untraceable audits. AssetFlow solves this with structured workflows and role-based access.

### 1.3 Explicit Non-Goals
AssetFlow does **not** handle purchasing, invoicing, or accounting. Acquisition cost is stored only for reporting/ranking purposes and is never linked to a financial ledger.

### 1.4 Success Criteria (Hackathon Context)
- All 10 core screens functional end-to-end with real data flow (not mocked UI)
- Role-based access enforced server-side, not just hidden in UI
- Core business rules (no double-allocation, no overlapping bookings, no maintenance without approval) demonstrably unbreakable via the UI
- Live KPI dashboard reflecting real state changes
- Clean, reusable module architecture presentable to judges as "production-shaped," not a prototype

---

## 2. User Roles & Permissions

| Role | Created By | Key Permissions |
|---|---|---|
| **Employee** (default) | Self-signup | View own allocated assets, book shared resources, raise maintenance requests, initiate return/transfer requests |
| **Department Head** | Promoted by Admin | All Employee permissions + view department's allocated assets, approve allocation/transfer requests within department, book resources on behalf of department |
| **Asset Manager** | Promoted by Admin | Register/allocate assets, approve transfers, approve maintenance requests, approve asset returns & condition check-in |
| **Admin** | System seed / existing Admin | Manage departments, asset categories, audit cycles, promote employees, view org-wide analytics |

**Critical security rule:** No role is ever self-assigned. Signup always creates an Employee account. All elevation happens via Admin action in the Employee Directory (Screen 3, Tab C). This must be enforced at the API layer (server-side authorization checks on every privileged endpoint), not just conditionally rendered in the UI.

---

## 3. Core Domain Entities & Relationships

```
Organization
 └── Department (self-referencing: parent_department_id for hierarchy)
      └── Employee (belongs to Department, has Role)
Asset Category (org-level, with optional custom fields e.g. warranty_period)
 └── Asset (belongs to Category, optionally to Department via allocation)
      ├── Allocation (Asset ↔ Employee/Department)
      ├── Booking (only if asset.is_bookable = true)
      ├── Maintenance Request
      └── Audit Item (within an Audit Cycle)
Audit Cycle (scope: department/location, date range)
 └── Audit Item (per asset, per cycle)
Notification (polymorphic: linked to allocation, booking, maintenance, audit, transfer)
Activity Log (polymorphic: linked to any entity + actor + action + timestamp)
```

### 3.1 Entity Field Summary

**Department**: id, name, head_employee_id (nullable), parent_department_id (nullable), status (Active/Inactive), created_at

**AssetCategory**: id, name, custom_fields (JSON schema, e.g. `{ warranty_period_months: number }`)

**Employee**: id, name, email, password_hash, department_id, role (Employee/DeptHead/AssetManager/Admin), status (Active/Inactive), created_at

**Asset**: id, name, category_id, asset_tag (auto-generated, e.g. `AF-0001`), serial_number, acquisition_date, acquisition_cost, condition (New/Good/Fair/Poor/Damaged), location, photo_urls[], document_urls[], is_bookable (boolean), status (enum, see §4), qr_code_value, created_at

**Allocation**: id, asset_id, allocated_to_type (Employee/Department), allocated_to_id, allocated_by (Asset Manager id), allocation_date, expected_return_date (nullable), actual_return_date (nullable), return_condition_notes, status (Active/Returned/Overdue)

**TransferRequest**: id, asset_id, from_holder_id, to_holder_id, requested_by, status (Requested/Approved/Rejected), approved_by, approved_at

**Booking**: id, asset_id, booked_by, start_time, end_time, status (Upcoming/Ongoing/Completed/Cancelled), created_at

**MaintenanceRequest**: id, asset_id, raised_by, issue_description, priority (Low/Medium/High/Critical), photo_url, status (Pending/Approved/Rejected/TechnicianAssigned/InProgress/Resolved), assigned_technician, approved_by, resolved_at

**AuditCycle**: id, name, scope_department_id (nullable), scope_location (nullable), start_date, end_date, status (Draft/Active/Closed), created_by

**AuditItem**: id, audit_cycle_id, asset_id, auditor_id, result (Verified/Missing/Damaged), notes, verified_at

**Notification**: id, recipient_id, type (enum), message, related_entity_type, related_entity_id, is_read, created_at

**ActivityLog**: id, actor_id, action, entity_type, entity_id, metadata (JSON), timestamp

---

## 4. Asset Lifecycle — State Machine

**States:** `Available`, `Allocated`, `Reserved`, `Under Maintenance`, `Lost`, `Retired`, `Disposed`

**Valid transitions:**

| From | To | Trigger |
|---|---|---|
| Available | Allocated | Asset Manager allocates to employee/department |
| Available | Reserved | Booking created for a bookable shared asset |
| Available | Under Maintenance | Maintenance request approved |
| Allocated | Available | Return processed & condition check-in complete |
| Allocated | Under Maintenance | Holder raises maintenance request → approved |
| Under Maintenance | Available | Maintenance request resolved |
| Under Maintenance | Lost | Audit cycle closed with confirmed-missing result |
| Available/Allocated | Lost | Audit cycle closed with confirmed-missing result |
| Any (except Disposed) | Retired | Admin/Asset Manager manual action (end of useful life) |
| Retired | Disposed | Admin/Asset Manager manual action (final decommission) |

**Guard rules enforced server-side:**
- An asset cannot be allocated while in `Allocated`, `Reserved`, `Under Maintenance`, `Lost`, `Retired`, or `Disposed` state — must go through Transfer Request instead.
- A `Reserved`/booking status change only affects state at booking start/end time (see §5.2); it does not block allocation of the underlying asset unless business rule dictates exclusivity (configurable: bookable assets are generally not also individually allocable).
- Maintenance approval is the **only** path into `Under Maintenance`. No direct status edit bypassing the workflow.

---

## 5. Detailed Functional Requirements by Screen

### 5.1 Login / Signup
- Signup: name, email, password → creates Employee account only, department selection optional at signup (or assigned later by Admin)
- Login: email + password, JWT/session-based auth
- Forgot password: email-based reset link flow
- Session validation on every protected route; auto-logout on expiry
- **Acceptance criteria:** No UI element anywhere allows a new user to select Admin/Asset Manager/Department Head at signup.

### 5.2 Dashboard / Home
- KPI cards (role-scoped data): Assets Available, Assets Allocated, Maintenance Today, Active Bookings, Pending Transfers, Upcoming Returns
- Overdue returns section, visually distinct (e.g. red accent) from upcoming returns
- Quick action buttons: Register Asset (Asset Manager+), Book Resource (all roles), Raise Maintenance Request (all roles)
- **Acceptance criteria:** KPIs recompute from live DB queries, not cached/static; Employee dashboard scoped to self, Dept Head scoped to department, Admin/Asset Manager see org-wide.

### 5.3 Organization Setup (Admin only)
**Tab A — Department Management**
- CRUD department: name, head (dropdown of eligible employees), parent department (for hierarchy), status
- Deactivating a department should not delete historical allocation data

**Tab B — Asset Category Management**
- CRUD category: name + optional custom field schema (key-value: field name, type, required flag)
- Custom fields render dynamically on Asset Registration form based on selected category

**Tab C — Employee Directory**
- List/search employees: name, email, department, role, status
- **Role promotion action** (Employee → Department Head / Asset Manager) — this is the *only* place in the entire app where role changes happen
- Deactivate employee (soft delete, preserves allocation/audit history)

### 5.4 Asset Registration & Directory
- Register form: Name, Category (dynamic custom fields), auto-generated Asset Tag (`AF-####` sequential), Serial Number, Acquisition Date, Acquisition Cost, Condition, Location, photo/document upload, `is_bookable` toggle
- Search/filter bar: Asset Tag, Serial Number, QR code scan/lookup, category, status, department, location
- Asset detail view: current status badge, full allocation history timeline, full maintenance history timeline
- **Acceptance criteria:** Asset Tag generation is atomic/sequential and collision-free even under concurrent registration.

### 5.5 Asset Allocation & Transfer
- Allocate form: select asset (status must be `Available`), select employee/department, optional expected return date
- **Conflict handling:** attempting to allocate an already-allocated asset is blocked with message "Currently held by {holder}" + a **Transfer Request** CTA in place of the blocked action
- Transfer workflow: `Requested` → `Approved` (Asset Manager or relevant Department Head) → system re-allocates asset and appends to allocation history automatically → old allocation marked `Returned`
- Return flow: mark returned, capture condition check-in notes (reviewed/approved by Asset Manager), asset status reverts to `Available`
- Overdue detection: scheduled job (or on-read computation) flags allocations past `expected_return_date`, surfaces on Dashboard + Notifications

### 5.6 Resource Booking
- Calendar view (day/week) per bookable resource showing existing bookings
- **Overlap validation** (server-side, not just UI): new booking `[start, end)` rejected if it intersects any existing non-cancelled booking for the same asset. Adjacent bookings (end == next start) are allowed.
- Booking status lifecycle: `Upcoming` → `Ongoing` (auto, time-based) → `Completed` (auto, time-based) / `Cancelled` (manual)
- Cancel/reschedule actions (reschedule = cancel + re-validate + create new)
- Reminder notification sent before slot start (configurable lead time, e.g. 15 min)

### 5.7 Maintenance Management
- Raise request: asset picker, issue description, priority (Low/Medium/High/Critical), photo attachment
- Approval workflow: `Pending` → `Approved`/`Rejected` (Asset Manager) → `Technician Assigned` → `In Progress` → `Resolved`
- **State sync:** asset auto-transitions to `Under Maintenance` exactly on `Approved`, and back to `Available` exactly on `Resolved` — no manual override path
- Full maintenance history retained per asset (visible in Screen 4 detail view)

### 5.8 Asset Audit
- Create Audit Cycle: name, scope (department and/or location filter), start/end date
- Assign one or more auditors (from eligible employees, typically Asset Managers or designated staff)
- Auditor working view: checklist of in-scope assets, mark each `Verified` / `Missing` / `Damaged`, with notes
- System auto-generates a **discrepancy report** listing all `Missing`/`Damaged` items on demand or at cycle close
- **Close Audit Cycle:** locks the cycle (no further edits), and for confirmed-missing items transitions asset status to `Lost`; damaged items can optionally trigger a maintenance request suggestion
- Audit history retained and browsable per cycle and per asset

### 5.9 Reports & Analytics
- Asset utilization trends (most-used vs. idle, based on allocation/booking frequency)
- Maintenance frequency by asset / by category
- Assets due for maintenance soon or nearing retirement (age/usage threshold-based)
- Department-wise allocation summary
- Resource booking heatmap (peak usage windows, by day/hour)
- Export to CSV/PDF

### 5.10 Activity Logs & Notifications
- Notification types: Asset Assigned, Maintenance Approved/Rejected, Booking Confirmed/Cancelled/Reminder, Transfer Approved, Overdue Return Alert, Audit Discrepancy Flagged
- In-app notification center (read/unread state); optionally email
- Full activity log: actor, action, entity, timestamp — filterable, admin-visible org-wide, others scoped to their own actions/entities

---

## 6. Business Rules Summary (Must Be Server-Enforced)

1. Signup never grants elevated roles; only Admin, via Employee Directory, assigns Department Head / Asset Manager.
2. An asset in any non-`Available` state cannot be newly allocated — only transferred via the Transfer Request flow.
3. Two bookings for the same resource cannot have overlapping time ranges; adjacent ranges are valid.
4. Maintenance work cannot begin (asset cannot enter `Under Maintenance`) without Asset Manager approval.
5. Audit Cycle edits are locked once closed; closing is the only path that can set `Lost` from audit findings.
6. Every role-gated action re-checks the actor's current role/department server-side on each request (no trust in client-held role state).

---

## 7. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Architecture | Modular services/domains (Auth, Org, Asset, Booking, Maintenance, Audit, Notification) — loosely coupled, independently testable |
| Security | Password hashing (bcrypt/argon2), JWT session tokens, server-side RBAC middleware on every route |
| Data integrity | Foreign-key constraints between Department/Employee/Asset/Allocation; soft-deletes for entities with historical dependencies |
| Performance | Dashboard KPIs and search/filter should respond in <500ms for typical hackathon-scale data (hundreds–low thousands of records) |
| Usability | Responsive layout (desktop-first, usable on tablet); clear status badges/color coding for lifecycle states |
| Auditability | Every state-changing action recorded in Activity Log with actor + timestamp |
| Extensibility | Category custom fields and notification types designed as data-driven/config, not hardcoded, to demonstrate scalable module design |

---

## 8. Suggested Technical Stack

Given the modular ERP nature and hackathon time constraints, a stack matched to a fast, type-safe full-stack build:

- **Frontend:** React + TypeScript + Vite, React Router, TanStack Query for server state, Zustand/Context for local UI state, Tailwind CSS for rapid, consistent styling
- **Backend:** FastAPI (Python) — fast to scaffold, native async, auto-generated OpenAPI docs (useful for demoing API contracts to judges), Pydantic models double as validation + DTOs
- **Database:** PostgreSQL — relational integrity is central to this domain (FKs across Department/Employee/Asset/Allocation/Booking); SQLAlchemy or SQLModel as ORM
- **Auth:** JWT-based sessions, FastAPI dependency-injected RBAC guards per route
- **Scheduled jobs** (overdue detection, booking status transitions): APScheduler or a simple polling cron in FastAPI background tasks for hackathon scope
- **File storage** (photos/documents): local disk or S3-compatible bucket depending on deployment target
- **Real-time/notifications:** polling initially (simplest for hackathon); WebSocket upgrade path if time allows

This mirrors a standard React/Vite + FastAPI split, keeping the frontend fully decoupled from backend business logic via a typed REST API.

---

## 9. Out of Scope (Explicit)

- Purchasing, procurement, invoicing, or accounting integration
- Payroll or HR management beyond the basic Employee Directory
- Multi-tenant SaaS billing (single-organization scope for hackathon)
- Native mobile apps (responsive web only)

---

## 10. Suggested Build Milestones (Hackathon Sequencing)

1. **Foundation:** Auth (signup/login), Employee/Department/Category data model, RBAC middleware
2. **Core Asset Loop:** Asset registration/directory, lifecycle state machine, Allocation with conflict blocking
3. **Booking Engine:** Resource booking with overlap validation, calendar view
4. **Maintenance Workflow:** Request → approval → status sync
5. **Audit Module:** Audit cycle creation, auditor assignment, discrepancy report, close-cycle status updates
6. **Cross-cutting:** Dashboard KPIs, Notifications, Activity Log, Reports/Analytics
7. **Polish:** Responsive UI pass, empty/error states, seed data for demo, README + architecture diagram for judges

---

## 11. Open Questions / Assumptions to Confirm

- Should `is_bookable` assets ever also be individually allocated to a specific employee, or are these mutually exclusive asset types?
- Are Department Heads allowed to approve transfers only *into* their department, or also *out of* it?
- Is multi-department employee membership needed, or is it strictly one employee → one department?
- What email/notification delivery mechanism is acceptable for hackathon demo (real SMTP vs. in-app only)?

---

*Reference mockup (POC):* https://app.excalidraw.com/l/65VNwvy7c4X/5ceOBMjbDby
