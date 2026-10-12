# CampusPath — Enterprise Student Placement & No-Dues Clearance Portal

> **Next-Generation Academic Career Services & Financial Clearance Platform**  
> Built with React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts, and an Express.js Backend with official **PhonePe Payment Gateway** integration and **Google/GitHub OAuth 2.0**.

---

## 🎓 Overview

**CampusPath** is a modern, unified university administration and student self-service platform engineered for Apex Institute of Technology. It synchronizes two mission-critical institutional operations:
1. **Corporate Placement & Recruitment Drive Management**: Tracking recruitment drives across compensation tiers (Super Dream, Dream, Core, Mass), eligibility cutoffs, multi-stage application pipelines, verified letterhead offer letters, and institutional compliance.
2. **Multi-Department No-Dues Clearance & PhonePe Settlement**: Real-time auditing of mandatory graduation clearances across 6 administrative sections (Library, Laboratories, Academic Departments, Training & Placement, Accounts/Finance, and Hostels) with automated fine settlement powered by the official **PhonePe Payment Gateway**.

All statistics, placement rates, clearance statuses, and financial ledgers are **computed dynamically from actual records** adhering strictly to institutional business logic.

---

## ⚡ Quick Start & Running Instructions

### Prerequisites
- **Node.js**: v18.0.0+ (Tested on v24.21.0)
- **npm**: v9.0.0+ (Tested on v11.19.0)

### 1. Installation
```bash
# Clone or navigate to the project directory
cd university

# Install all frontend and backend dependencies
npm install
```

### 2. Run Both Frontend and Backend Concurrently (Recommended)
```bash
npm run dev:all
```
This single command uses `concurrently` to spin up:
- **Express Backend & Payment Engine**: `http://localhost:5001`
- **Vite React Client (with API Proxy)**: `http://localhost:5173`

### 3. Alternative: Run Individually in Separate Terminals
```bash
# Terminal 1: Backend API & PhonePe Payment Engine
npm run server

# Terminal 2: Frontend Vite Development Server
npm run dev
```

### 4. Production Build Verification
```bash
npm run build
npm run preview
```

---

## 🔑 Demo Roles & Interactive Test Personas

CampusPath includes an interactive institutional switcher with pre-loaded fictional records:

| Role | Name | Email | Password / Identifier | Highlights |
|------|------|-------|------------------------|------------|
| **Placement In-Charge (TPO)** | Dr. Rajeshwari Raman | `placement.head@campuspath.edu` | `admin123` | Full admin control: Manage drives, student directory, assign dues, audit logs, and PhonePe reconciliation. |
| **Student (Dual Placed)** | Aarav Sharma | `aarav.sharma@student.campuspath.edu` | `student123` (`2021CS0101`) | Holds **2 confirmed offers** (Google Cloud ₹32 LPA & Microsoft ₹28 LPA); 100% Cleared No-Dues. |
| **Student (Dues Pending)** | Diya Patel | `diya.patel@student.campuspath.edu` | `student123` (`2021CS0102`) | Placed at Goldman Sachs; has **pending Library book due (₹250)**. Test PhonePe checkout! |
| **Student (Day Scholar)** | Pooja Hegde | `pooja.hegde@student.campuspath.edu` | `student123` (`2021EC0201`) | Placed at Cisco Systems; hostel marked *Not Applicable* as day scholar. |

> 💡 **Quick Switcher**: The persistent top banner and the Top Navigation profile menu allow **instant 1-click persona switching** with zero re-login friction.

---

## 💳 PhonePe Payment Gateway Integration

CampusPath implements the official **PhonePe Standard Checkout Flow** for paperless clearance fee settlement.

### Architecture & Security Workflow
1. **Server-Side Order Initiation (`POST /api/payments/phonepe/initiate`)**:
   - The client never dictates the fine amount. Outstanding charges are verified server-side.
   - Encodes order payload into Base64 (amount converted to paise).
   - Computes official `X-VERIFY` cryptographic checksum:
     $$\text{SHA256}(\text{base64Payload} + \text{"/pg/v1/pay"} + \text{saltKey}) + \text{"###"} + \text{saltIndex}$$
2. **PhonePe Standard Checkout UI**:
   - Interactive checkout modal supporting **UPI QR**, **PhonePe App / UPI Intent**, and **Cards/NetBanking**.
   - Generates merchant transaction reference IDs (`MT...` / `CP-...`) with duplicate prevention.
3. **Server-to-Server Status Verification (`POST /api/payments/phonepe/verify/:id`)**:
   - Client redirects are **never trusted as proof of payment**.
   - Server validates the payment status via PhonePe S2S endpoint (`/pg/v1/status/{merchantId}/{merchantTransactionId}`).
   - Checksum is validated using SHA256 and the private salt key.
   - Idempotency check prevents duplicate balance adjustments.
4. **Instant Clearance & Ledger Synchronization**:
   - Upon verified success, the specific department's clearance status flips to `Cleared`.
   - An immutable transaction record is ledgered with bank UTR and receipt number.
   - A printable, official tax-deductible E-Receipt is generated with digital seal.

### PhonePe Environment Configuration (`server/.env`)
By default, the backend runs in official **PhonePe UAT Sandbox Mode**:
```env
PHONEPE_MERCHANT_ID=PGTESTPAYUAT
PHONEPE_SALT_KEY=099eb0cd-02cf-4e2a-8aca-3e6c6aff0399
PHONEPE_SALT_INDEX=1
PHONEPE_ENV=SANDBOX
```

### Production Merchant Onboarding Steps
To activate live production PhonePe processing:
1. Register and complete KYC on [PhonePe Business](https://business.phonepe.com/).
2. Request Payment Gateway credentials under Developer Settings.
3. Update `server/.env` with your production `PHONEPE_MERCHANT_ID`, `PHONEPE_SALT_KEY`, `PHONEPE_SALT_INDEX`, and set `PHONEPE_ENV=PRODUCTION`.

---

## 🔐 Authentication & OAuth 2.0 Setup

CampusPath features multi-modal enterprise authentication:
- **Email & Password**: With client validation, password reveal toggle, remember me, forgot password, and magic link simulator.
- **Google Workspace SSO**: For institutional accounts (`@apextech.edu.in`).
- **GitHub OAuth**: For developer candidates and technical faculty.

### Server-Side OAuth Security
- **Zero Secrets in Frontend**: Client secrets reside strictly in `server/.env`.
- **CSRF State Validation**: OAuth authorization URLs include cryptographically random `state` tokens validated during callback exchange.
- **Graceful Sandbox Fallback**: If OAuth credentials are not configured in `.env`, the server exposes an interactive Sandbox Handshake mode with detailed manual instructions.

### Manual OAuth Configuration Guide
Copy `server/.env.example` to `server/.env` and supply the following:

#### Google OAuth 2.0:
1. Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Create an **OAuth 2.0 Client ID** (Web application).
3. Set **Authorized redirect URI**: `http://localhost:5001/api/auth/google/callback`.
4. Add credentials to `server/.env`:
   ```env
   GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:5001/api/auth/google/callback
   ```

#### GitHub OAuth:
1. Go to [GitHub Developer Settings](https://github.com/settings/developers).
2. Create a **New OAuth App**.
3. Set **Authorization callback URL**: `http://localhost:5001/api/auth/github/callback`.
4. Add credentials to `server/.env`:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_REDIRECT_URI=http://localhost:5001/api/auth/github/callback
   ```

---

## 🖥️ Navigation & Page Guide

1. **Public Institutional Landing Page**:
   - Placement success metrics (96.8% rate, ₹32.5 LPA highest CTC, ₹11.4 LPA average CTC).
   - Recruiter showcase (Google, Microsoft, AWS, Cisco, Deloitte, TCS, Infosys).
   - Graduating student testimonials and one-click evaluator sandbox launchers.
2. **Placement KPI Analytics Dashboard (`/dashboard`)**:
   - Recharts department-wise placement comparison and salary package tier distribution.
   - Dual/multiple offers spotlight and recent offer feeds.
3. **Student Directory & Management (`/students`)**:
   - Searchable, filterable student records across CSE, ECE, and IT departments.
   - Add/edit student forms, profile inspection drawer, and batch CSV import preview.
4. **Companies & Recruitment Drives (`/drives`)**:
   - Super Dream, Dream, Core, and Mass hiring drives with CGPA cutoffs, backlogs, and applicant inspection.
   - Cancelled drive logic (voids associated offers from placement statistics).
5. **9-Stage Candidate Application Tracking (`/applications`)**:
   - Pipeline stages: *Registered, Shortlisted, Assessment, Interview, Selected, Offer Received, Joined, Rejected, Withdrawn*.
   - Filter by company and status; quick round advancement with notes.
6. **No-Dues Clearance & Admin Hub (`/nodues`)**:
   - 6-department clearance matrix (Library, Lab, Dept, Placement, Accounts, Hostel).
   - **Assign Student Due Modal**: Administrators can assign fines directly to any student record.
   - **PhonePe Reconciliation Ledger**: Full audit of transaction IDs, bank references, amounts, and statuses.
   - **Security Audit Trail**: Cryptographic log of all fee assignments, clearances, and administrative actions.
7. **My Dues & PhonePe Payments (`/dues`)**:
   - Dedicated student financial hub showing outstanding liabilities, due dates, and fine justifications.
   - **Pay with PhonePe** button invoking official checkout flow with UPI QR and card selectors.
   - Official printable E-Receipts with university letterhead, NAAC A++ seal, and bank UTR numbers.
8. **Student Self-Service Portal (`/student-portal`)**:
   - Real-time drive eligibility verification (checks CGPA cutoffs and active backlogs).
   - Verified Corporate Offer Letter modal (with Base, RSUs, and joining bonus breakdown).
   - Digital Smart Campus ID Card with barcode and verification QR code.
   - Printable Graduation No-Dues Certificate (unlocked once 100% cleared).
9. **Institutional Reports & Exports (`/reports`)**:
   - Live CSV exports: Placement Master Roll, No-Dues Defaulters List, and Department Summary.

---

## 🎨 Design System & Theme Support

- **Color Palette**: Sophisticated Deep Navy (`#0f172a`, `#0a0f1d`), Indigo (`#4f46e5`), and Violet (`#7c3aed`) with emerald accents.
- **Dark & Light Mode**: Seamless 1-click theme toggle in the top navbar (`TopNav.tsx`), synced with `document.documentElement` and persisted in `localStorage`.
- **Responsive Layout**: Collapsible sidebar on desktop, slide-out drawer on mobile and tablet.

---

## 📐 Business Rules Enforced

1. **Unique Placed vs Total Offers**: Multiple offers for a single student increment `totalOffers` by the offer count, but `uniquePlacedStudents` increments by strictly 1.
2. **Rejections & Withdrawals Voided**: Applications marked `Rejected` or `Withdrawn` never count as successful placements.
3. **Cancelled Drives Excluded**: Offers belonging to cancelled drives (e.g. Meta) are immediately excluded from active placement totals and average CTC calculations.
4. **Strict No-Dues Rule**: A student's overall clearance status is marked `Cleared` **strictly when all 6 sections** are either `Cleared` or `Not Applicable`.
5. **Dynamic Metric Calculation**: Zero hardcoded metric values; all KPIs are dynamically derived from memory and backend JSON store state.

---

## 🛡️ Verification & Test Summary

- ✅ **TypeScript Compiler (`tsc -b`)**: Zero errors.
- ✅ **Vite Production Bundling (`vite build`)**: Clean build output in `dist/`.
- ✅ **Backend API Server**: Health check, PhonePe initiate, verify, reconciliation, and audit logs passing.
- ✅ **Vite Proxy**: Seamless `/api` reverse-proxy to `http://localhost:5001`.
- ✅ **PhonePe Checksum Validation**: SHA256 `X-VERIFY` hash matching PhonePe standard API specification.

---

© 2025 Apex Institute of Technology • CampusPath Career Services & Institutional Clearance Portal
