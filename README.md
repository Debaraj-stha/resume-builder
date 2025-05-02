Sure! Here's your complete and updated `README.md` with **PDF export support using `html2canvas` and `jspdf`**, along with your **folder structure**, all formatted cleanly:

---

# 🧾 Resume Builder – React + Supabase + Vite

A powerful, modern resume builder built with **React**, **Supabase**, **Vite**, **Tailwind CSS**, and **styled-components**. Includes Google Sign-In, email/password auth, multiple template styles (Classical, Modern, Simple, Creative), persistent resume saving, auto-save, and PDF export support.

---

## 🚀 Features

* ✅ Google Sign-In & Email/Password Authentication (via Supabase Auth)
* 📝 Create and Edit Resumes with multiple templates:

  * Classical
  * Modern
  * Simple
  * Creative
* 🎨 Theme support (light/dark) using `styled-components` ThemeProvider
* 💾 Save resumes to Supabase (PostgreSQL) database
* 💡 Auto-save: Resume is saved automatically if the user exits before completing
* ⬆️ Upload profile images or attachments to Supabase Storage
* 📄 Export resumes to PDF (`html2canvas` + `jspdf`)
* ⚡ Built with Vite for blazing-fast development

---

## 🛠 Tech Stack

| Tech              | Description                                    |
| ----------------- | ---------------------------------------------- |
| React             | UI Framework                                   |
| Vite              | Build Tool + HMR                               |
| Supabase          | Backend-as-a-Service (Auth, Database, Storage) |
| styled-components | Theming and component styling                  |
| Tailwind CSS      | Utility-first CSS framework                    |
| React Hook Form   | Form management                                |
| React Router      | Navigation                                     |
| zustand or Redux  | State management (if used)                     |
| html2canvas       | Converts HTML to canvas for export             |
| jspdf             | Creates PDF files from canvas                  |

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Configure Supabase

Create a `.env` file in the root folder and add:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Make sure your Supabase project has:

* A `resumes` table with fields like `user_id`, `template`, `content`, `last_saved`, etc.
* Row-Level Security enabled with appropriate policies
* A public storage bucket (e.g., `files`) for image uploads

---

### 4. Run the App

```bash
npm run dev
```

---

## 🧪 Development Notes

* **Authentication** is handled using Supabase Auth:

  * Google OAuth via Supabase
  * Email/password sign-up and login

* **Resume Templates** are modular components styled using `styled-components`

* **Form Data** is managed using `React Hook Form` and autosaved to Supabase every few seconds

* **Images** (e.g., profile pictures) are uploaded to Supabase Storage and linked to the user's profile

* **PDF Export**:

  * Uses `html2canvas` to convert the resume DOM into a canvas
  * Uses `jspdf` to convert the canvas into a downloadable A4-sized PDF
  * Supports multi-page export and high-quality rendering

* **Theming** is controlled via `ThemeProvider` and JSON config files for light/dark modes

---

## 📁 Folder Structure

```
resume-builder/
├── public/
├── src/
│   ├── assets/           # Images, icons, and other static assets
│   ├── components/       # UI components like ResumeSections, Buttons, etc.
│   ├── css/              # Global Tailwind styles or resets
│   ├── page/             # Pages like Home, Editor, Auth, etc.
│   ├── provider/         # Context and global providers (e.g., theme, auth)
│   ├── theme/            # Styled-components theme config (light/dark)
│   ├── static-data/      # Dummy resume content, descriptions, options
```

---

Let me know if you'd like a downloadable `.md` file or want to publish this on GitHub!
