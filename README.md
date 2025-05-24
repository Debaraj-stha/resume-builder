
---

# 🧾 Resume Builder – React + Supabase + Vite + FastAPI

A powerful, modern resume builder built with **React**, **Supabase**, **Vite**, **Tailwind CSS**, and **styled-components**, now with a FastAPI backend for resume PDF upload and parsing using **pdfplumber** and **spaCy**.

Includes Google Sign-In, email/password auth, multiple template styles (Classical, Modern, Simple, Creative), persistent resume saving, auto-save, PDF export support, and intelligent resume parsing.

---

## 🚀 Features

* ✅ Google Sign-In & Email/Password Authentication (via Supabase Auth)
* 📝 Create and Edit Resumes with multiple templates:

  * Classical
  * Modern
  * Simple
  * Creative
* 🎨 Theme support (light/dark) using styled-components ThemeProvider
* 💾 Save resumes to Supabase (PostgreSQL) database
* ⏳ Auto-save: Resume input data is automatically saved to Supabase every **1 minute**
* ⬆️ Upload resume PDF files to create or update resume data:

  * FastAPI backend parses PDF with **pdfplumber**
  * Text processed with **spaCy** NLP for intelligent section extraction
  * Dynamic divider selection splits resume into sections like Education, Experience, Skills, etc.
* 🖼️ Upload profile images or attachments to Supabase Storage
* 📄 Export resumes to PDF (html2canvas + jspdf)
* ⚡ Built with Vite for blazing-fast development
* ❤️ Live preview of resume as you type on the other side

---

## 🛠 Tech Stack

| Tech              | Description                                      |
| ----------------- | ------------------------------------------------ |
| React             | UI Framework                                     |
| Vite              | Build Tool + HMR                                 |
| Supabase          | Backend-as-a-Service (Auth, Database, Storage)   |
| styled-components | Theming and component styling                    |
| Tailwind CSS      | Utility-first CSS framework                      |
| React Hook Form   | Form management                                  |
| React Router      | Navigation                                       |
| Zustand / Redux   | State management (optional)                      |
| html2canvas       | Converts HTML to canvas for PDF export           |
| jspdf             | Creates PDF files from canvas                    |
| FastAPI           | Backend server for resume PDF upload and parsing |
| pdfplumber        | PDF text extraction on backend                   |
| spaCy             | NLP parsing and section extraction               |

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Debaraj-stha/resume-builder.git
cd resume-builder
```

### 2. Install frontend dependencies

```bash
npm install
# or
yarn
```

### 3. Configure Supabase

Create a `.env` file in the root folder and add:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Make sure your Supabase project has:

* A `resumes` table with fields like `user_id`, `template`, `content`, `last_saved`, etc.
* Row-Level Security enabled with appropriate policies
* A public storage bucket (e.g., `files`) for image uploads

---

### 4. Setup and run FastAPI backend

Make sure you have Python 3.8+ installed.

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

* The FastAPI backend listens for resume PDF uploads
* It extracts text using `pdfplumber`
* Parses sections dynamically with regex-based dividers
* Processes text with `spaCy` for NLP parsing
* Returns structured resume sections to the frontend

---

### 5. Run the frontend app

```bash
npm run dev
```

Open `http://localhost:5173` (or your configured port) to access the app.

---

## 🧪 Development Notes

* **Authentication** is handled using Supabase Auth:

  * Google OAuth via Supabase
  * Email/password sign-up and login

* **Resume Templates** are modular React components styled with styled-components

* **Form Data** is managed using React Hook Form and auto-saved to Supabase every 60 seconds

* **Resume Upload & Parsing**:

  * Users can upload a PDF resume file
  * File is sent to FastAPI backend
  * Backend uses `pdfplumber` and `spaCy` to parse text and extract sections dynamically
  * Parsed data is sent back and used to prefill or update the resume form

* **Images** (e.g., profile pictures) are uploaded to Supabase Storage and linked to the user's profile

* **PDF Export**:

  * Uses `html2canvas` to convert the resume DOM into a canvas
  * Uses `jspdf` to create downloadable A4 PDF files
  * Supports multi-page export and high-quality rendering

* **Theming** controlled via `ThemeProvider` and JSON config files for light/dark modes

---

## 📁 Folder Structure

```
resume-builder/
├── backend/               # FastAPI backend for PDF parsing
│   ├── main.py
│   └── requirements.txt
├── node_modules/
├── public/
├── src/
│   ├── assets/            # Images, icons, and other static assets
│   ├── components/        # UI components (ResumeSections, Buttons, etc.)
│   ├── css/               # Global Tailwind styles or resets
│   ├── page/              # Pages like Home, Editor, Auth, etc.
│   ├── provider/          # Context and global providers (theme, auth)
│   ├── theme/             # Styled-components theme config (light/dark)
│   ├── static-data/       # Dummy resume content, descriptions, options
│   ├── helper/            # Helper functions and custom hooks (auto-save, file upload)
├── .env
├── .gitignore
├── CONTRIBUTING.md
├── eslint.config.js
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── supabaseClient.js
└── vite.config.js
```

---

## 🧑‍💻 Author

Built with ❤️ by [Debaraj-stha](https://github.com/Debaraj-stha/)

---

## Server repository

[Server](https://github.com/Debaraj-stha/resume-builder/tree/server)

---

## 📬 Feedback & Contributions

Feel free to open issues or pull requests. Contributions are welcome!

---

---
