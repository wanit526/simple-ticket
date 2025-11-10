# 🧾Simple Ticket System (IT Support Ticketing)

A simple IT issue reporting system built with **Next.js + Supabase + Tailwind CSS**.  
Users can submit IT support tickets, attach files, and track their progress in real-time through a clean dashboard.

---

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=nextdotjs)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-green?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 🚀 Features
- 📝 Submit IT issue reports  
- 📂 Upload screenshots or related files (Supabase Storage)  
- 🔐 Role-based Row-Level Security (RLS)  
- ⚙️ Dashboard for support staff (view & update ticket status)  
- 🌐 Multi-language UI (Thai / English)  
- 🌓 Light / Dark mode switch  

---

## 🧠 Tech Stack
| Layer | Technology |
|--------|-------------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Supabase (PostgreSQL, Storage, Auth) |
| Hosting | Vercel |
| Authentication | Supabase Auth (Email/Password) |

---

## ⚙️ Environment Setup

Create a `.env.local` file in the project root with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://hkgxivmowekblwxrn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

> ⚠️ Never commit your real keys to GitHub.  
> For sharing, use `.env.example` with mock data:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=example_anon_key
SUPABASE_SERVICE_ROLE_KEY=example_service_key
```

---

## 💻 Run the Project
```bash
pnpm install
pnpm dev
```
Then open [http://localhost:3000](http://localhost:3000)

---

## 🧩 System Architecture
```mermaid
flowchart TD
    A[🧑‍💻 User] -->|Submit issue form| B[🌐 Next.js Frontend]
    B -->|Send request| C[🧰 Next.js API Routes]
    C -->|Insert / Query data| D[(🗄️ Supabase Database)]
    C -->|Upload files| E[💾 Supabase Storage]
    D -->|Apply RLS Policies| F[🔒 Auth & Access Control]
    F -->|Return filtered data| B
    B -->|Display Dashboard| A

    subgraph "Access Roles"
      F1[anon → INSERT only] 
      F2[authenticated → SELECT only]
      F3[service_role → ALL privileges]
    end
```

---

### 🔄 System Flow
1. A user opens the website and fills out the issue submission form.  
2. The **Next.js frontend** sends the data via **API Routes** to **Supabase**.  
3. **Supabase Database** stores the ticket data, while attached files are saved to **Supabase Storage**.  
4. **RLS policies** control visibility and access based on user roles.  
5. The **Dashboard** displays all tickets and allows support staff to change their status.

---

## 🔐 Access Control (RLS Policy)
| Role | Permission | Purpose |
|------|-------------|----------|
| **anon** | `INSERT` | Used by public users for submitting tickets |
| **authenticated** | `SELECT` | Used by logged-in support staff to view tickets |
| **service_role** | `ALL` | Used by server-side APIs (admin operations) |

---

## 🖼️ Screenshots

| 🧾 Ticket Form | 📊 Dashboard |
|----------------|--------------|
| ![Ticket Form Screenshot](https://github.com/user-attachments/assets/190fd36f-9915-4f8e-bfe0-5ecec059105a) | ![Dashboard Screenshot](https://github.com/user-attachments/assets/3ee65fa9-1c4f-4c06-98f7-220484bde68a) |

## 🌍 Live Demo  - COMING SOON
> *(Optional — uncomment when deployed)*  
> [https://simple-ticket.vercel.app](#)

---

## 📜 License
MIT License © 2025  
Developed by [**Wanich Chawweing**](https://github.com/wanit526)

📧 **Email:** wanich.chawweing@gmail.com 
🌐 **Portfolio:** [https://github.com/wanit526](https://github.com/wanit526)

---
