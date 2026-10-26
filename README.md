# 🏛️ Civic Portal

<div align="center">

![Civic Portal](https://img.shields.io/badge/Civic-Portal-2563eb?style=for-the-badge&logo=googlemaps&logoColor=white)
[![React](https://img.shields.io/badge/React-TypeScript-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A dual-interface civic issue reporting and management platform connecting citizens with municipal authorities.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started)

</div>

---

## 📖 Overview

Civic Portal is a web application that bridges the gap between citizens and municipal governments. It provides two distinct interfaces: a **Citizen Portal** for submitting and tracking civic complaints, and a **Municipal Dashboard** for authorities to manage, prioritize, and resolve reported issues.

---

## ✨ Features

### Citizen Portal
- 📝 **Issue Reporting** — Submit civic complaints with category, description, and location
- 📍 **Location Tagging** — Attach location data to issues for precise mapping
- 📊 **Track Status** — Real-time status updates on submitted complaints
- 🔔 **Notifications** — Get notified when your issue status changes
- 📸 **Photo Upload** — Attach photographic evidence to reports

### Municipal Dashboard
- 🗂️ **Issue Management** — View, prioritize, and assign issues to departments
- 📈 **Analytics** — Overview of open/closed issues, resolution times, and categories
- 🏷️ **Category Management** — Organize issues by type (roads, sanitation, water, electricity, etc.)
- ✅ **Status Workflow** — Move issues through Reported → In Progress → Resolved pipeline
- 👥 **Department Routing** — Assign issues to the correct municipal department

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 + TypeScript | UI framework |
| Create React App | Build tooling |
| React Router | Client-side navigation |
| Tailwind CSS | Styling |
| Supabase | Backend-as-a-Service (Auth + Database + Storage) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- A [Supabase](https://supabase.com) project (free tier works)

### Installation

```bash
git clone https://github.com/williamcsec/civic-portal.git
cd civic-portal
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

### Running Locally

```bash
npm start
```

App runs at `http://localhost:3000`

---

## 📁 Project Structure

```
civic-portal/
├── public/
└── src/
    ├── App.tsx                   # Root component + routing
    ├── components/
    │   ├── CitizenPortal.tsx     # Citizen-facing issue submission UI
    │   ├── MunicipalDashboard.tsx# Admin dashboard for issue management
    │   ├── citizen/              # Citizen-specific components
    │   ├── municipal/            # Municipal authority components
    │   └── ui/                   # Shared UI primitives
    ├── lib/                      # Supabase client, utilities
    ├── styles/                   # Global CSS and theme
    └── utils/                    # Helper functions
```

---

## 📄 License

MIT © williamcsec
