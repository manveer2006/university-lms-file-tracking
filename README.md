# University LMS File Tracker — UniTrack
### Git-Based File Change Tracking for LMS Modules

**Course:** CSE2480 — Version Control Systems  
**Institute:** IILM University, Gurugram  
**Semester:** B.Tech SEM 4 A, 2025–26  
**Guide:** Ms. Ishita Tandon, Assistant Professor, Data & Infrastructure  

---

## 📌 Project Overview
UniTrack is a fully functional university Learning Management System (LMS) with built-in Git-based file version control. It solves the critical problem of untracked file exchanges in existing LMS platforms by embedding commit history, diff viewing, and rollback capabilities directly into the portal interface.

---

## 👥 Team Members

| S.No | URN | Name | Role |
|------|-----|------|------|
| 1 | 22CSE001 | Aryan Sharma (LEAD) | Backend Development & Git Integration |
| 2 | 22CSE002 | Priya Singh | Frontend UI/UX Development |
| 3 | 22CSE003 | Rahul Gupta | Database Design (MySQL) |
| 4 | 22CSE004 | Sneha Verma | Testing & Documentation |
| 5 | 22CSE005 | Karan Mehta | VCS Logic & GitHub Integration |

---

## 🚀 Features

- **Dashboard** — Personalized view with today's classes, pending tasks, active quizzes, announcements
- **Timetable** — Full IILM SEM 4-A weekly schedule with color-coded subjects
- **Academic Calendar** — Monthly view with holidays, exams, deadlines, events
- **Assignments** — Post/submit/grade assignments with real PDF file upload (drag & drop)
- **Announcements** — Filterable notices from teachers with priority indicators
- **Quizzes** — Timed online quizzes with auto-submission and instant scoring
- **VCS File Tracker** — Git-style commit log, diff viewer, rollback capabilities
- **Grades** — Course-wise performance with progress bars and letter grades
- **Resources** — Downloadable lecture notes, lab manuals, slides
- **Profile** — Edit personal info, change password
- **Role System** — Switch between Teacher and Student roles (click username)

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Backend | Node.js v18+ (optional for production) |
| Database | MySQL 8.0 |
| Version Control | Git 2.x, GitHub |
| File Upload | multer (Node.js middleware) |
| Auth | express-session |

---

## ▶ How to Run

### Option 1 — Direct (No Install Required)
```bash
# Just open index.html in any modern browser
open index.html   # macOS
start index.html  # Windows
```

### Option 2 — With Local Server (Recommended)
```bash
# Install Node.js from nodejs.org, then:
npm install -g live-server
live-server
# Opens automatically at http://localhost:8080
```

### Option 3 — With Node.js Backend
```bash
npm install
node server.js
# Opens at http://localhost:3000
```

---

## 📁 Project Structure

```
university-lms-file-tracker/
├── index.html              # Main LMS portal
├── css/
│   └── style.css           # All styles (Inter font, CSS variables, dark mode ready)
├── js/
│   └── app.js              # All application logic, data, rendering
├── assets/                 # Images, icons (if any)
├── README.md               # This file
├── VCS_LMS_Presentation_FINAL.pptx
└── VCS_Synopsis_FINAL.docx
```

---

## 📋 Evaluation Checklist

- [x] GitHub repository created and all files pushed
- [x] README.md with team names, URNs, roles, run instructions
- [x] Group Leader updated Google Drive sheet (Section-A)
  - Link: https://docs.google.com/spreadsheets/d/1RTQEvIjFdmov0UvfH-YfHcxkpxNQrR2dmiY66GF5qRE/
- [x] Synopsis Report completed (all 8 sections, page numbers, index)
- [x] Presentation in prescribed IILM format (11 slides)
- [x] Live demo working in browser

---

## 🌐 GitHub Links (Update with your actual links)

| Member | GitHub Profile |
|--------|---------------|
| Aryan Sharma (LEAD) | https://github.com/aryan-22cse001 |
| Priya Singh | https://github.com/priya-22cse002 |
| Rahul Gupta | https://github.com/rahul-22cse003 |
| Sneha Verma | https://github.com/sneha-22cse004 |
| Karan Mehta | https://github.com/karan-22cse005 |

---

*Timetable generated: 24-03-2026 · IILM University, Gurugram*
