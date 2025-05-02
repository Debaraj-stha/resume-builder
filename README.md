# 🧾 Resume Builder – React + Supabase + Vite

A powerful, modern resume builder built with **React**, **Supabase**, **Vite**, **Tailwind CSS**, and **styled-components**. Includes Google Sign-In, email/password auth, multiple template styles (Classical, Modern, Simple, Creative), persistent resume saving, and auto-save support for unfinished resumes.

---

## 🚀 Features

- ✅ Google Sign-In & Email/Password Authentication (via Supabase Auth)
- 📝 Create and Edit Resumes with multiple templates:
  - Classical
  - Modern
  - Simple
  - Creative
- 🎨 Theme support (light/dark) using `styled-components` ThemeProvider
- 💾 Save resumes to Supabase (PostgreSQL) database
- 💡 Auto-save: Resume is saved automatically if the user exits before completing
- ⬆️ Upload profile images or attachments to Supabase Storage
- ⚡ Built with Vite for blazing-fast development

---

## 🛠 Tech Stack

| Tech               | Description                                       |
|--------------------|---------------------------------------------------|
| React              | UI Framework                                      |
| Vite               | Build Tool + HMR                                  |
| Supabase           | Backend-as-a-Service (Auth, Database, Storage)    |
| styled-components  | Theming and component styling                     |
| Tailwind CSS       | Utility-first CSS framework                       |
| React Hook Form    | Form management                                   |
| React Router       | Navigation                                        |
| zustand or Redux   | State management (if used)                        |

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
```

## 🛠 Setup Instructions

### 2. Install dependencies

```bash
npm install
# or
yarn
```
### 3. Configure Supabase
create .env file in root folder and add
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

