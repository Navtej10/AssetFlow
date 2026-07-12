# AssetFlow — Enterprise Asset & Resource Management System

![AssetFlow Architecture](https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

AssetFlow is a centralized, robust ERP platform designed to digitize how organizations track, allocate, and maintain physical assets and shared resources. By replacing error-prone spreadsheets and paper logs, AssetFlow introduces structured lifecycles, conflict-free bookings, and real-time visibility across an entire organization.

## 🚀 Features

AssetFlow implements all 10 core modules of an enterprise lifecycle system:

1. **Authentication & RBAC:** Secure JWT sessions (via NextAuth) with hard-coded server-side enforcement for `ADMIN`, `ASSET_MANAGER`, `DEPT_HEAD`, and `EMPLOYEE` roles.
2. **Dashboard KPIs:** Real-time metrics querying SQLite directly to show assets available, active allocations, pending maintenance, and overdue returns.
3. **Asset Registration & Directory:** Comprehensive asset tracking with sequential auto-generated Asset Tags, custom categories, and condition tracking.
4. **Asset Allocation:** Direct assignment of assets to employees or departments with tracking for expected return dates.
5. **Transfer Requests:** Secure asset hand-offs. Attempting to allocate an already-assigned asset triggers a transfer request workflow that notifies the Asset Manager.
6. **Resource Bookings:** Calendar-based reservation system with built-in server-side overlap prevention logic.
7. **Maintenance Workflow:** Structured repair requests (Pending → In Progress → Resolved) that lock asset availability until repairs are completed.
8. **Audit Cycles:** Verification workflows allowing auditors to mark assets as Verified, Missing, or Damaged. 
9. **Reports & Exports:** Real-time CSV generation for Valuation, Custody, and Maintenance logs.
10. **Activity Logs & Notifications:** Global, filterable audit trails tracking every state-changing action, paired with an in-app notification center.

## 🏗️ Architecture & Tech Stack

AssetFlow was built entirely for speed, type-safety, and modularity:

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (End-to-End Type Safety)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/)
- **Database:** [Prisma ORM](https://www.prisma.io/) over a local **SQLite** database
- **Authentication:** [NextAuth.js (v5 beta)](https://authjs.dev/) with Credentials Provider

### 🔐 Server-Side Integrity
Every mutation in the application is executed via strict **React Server Actions**. Complex state transitions (e.g., allocating an asset while logging the activity) are wrapped in Prisma `$transaction` blocks to ensure atomic database writes and zero race-condition double-bookings.

---

## 💻 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Clone & Install
```bash
git clone https://github.com/your-username/assetflow.git
cd assetflow
npm install
```

### 2. Database Setup
Push the schema to the local SQLite database and seed it with initial admin data:
```bash
npx prisma db push
npx prisma db seed
```

### 3. Environment Variables
Ensure your `.env` contains the required keys for NextAuth:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-super-secret-auth-key-for-development"
```

### 4. Run the Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 👥 Roles for Testing

For the purposes of the hackathon, the following roles are seeded:
- **Admin**: `admin@assetflow.com` 
- **Asset Manager**: `manager@assetflow.com` 
- **Employee**: `employee@assetflow.com` 
*(All passwords default to `password123`)*

---

*Built for the Enterprise Hackathon 2026.*
