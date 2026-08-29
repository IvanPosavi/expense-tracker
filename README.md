# 💸 Expense Tracker | ACME

A modern browser-based expense tracker with a clean SaaS-style dashboard, live charts, local persistence, dark mode, and PWA support.

> Frontend portfolio project by **Ivan Posavi**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2ea44f?style=for-the-badge&logo=github)](https://ivanposavi.github.io/expense-tracker/)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=000)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=fff)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=for-the-badge&logo=pwa)
![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red?style=for-the-badge)

---

## 🚀 Live Demo

**Production:**  
<a href="[https://ivanposavi.github.io/chat-app/](https://ivanposavi.github.io/expense-tracker/)"> <img src="https://img.shields.io/badge/🌐%20Visit%20Website-21759B?style=for-the-badge" alt="Visit APP"> </a>

The live version is deployed through **GitHub Pages** and supports installation as a **Progressive Web App**.

---

## ✨ Features

- ➕ Add expenses
- ✏️ Edit existing expenses
- 🗑️ Delete expenses with confirmation
- 🔎 Search expenses by title, description, or category
- 🏷️ Filter by category
- 📅 Filter by date range
- ↕️ Sort by newest, oldest, highest, or lowest amount
- 📊 Dashboard totals and spending summaries
- 🍩 Spending by category chart
- 📈 Spending over time chart
- 🌗 Light and dark mode
- 💾 Persistent browser storage with `localStorage`
- 📱 Fully responsive layout from 320px upward
- ♿ Keyboard-friendly and accessible UI
- 📴 Offline support through a service worker
- 📲 Installable PWA
- 🛡️ Graceful handling of invalid stored data and form errors

Currency is **EUR (€)**.

Dates are stored internally as:

```text
YYYY-MM-DD
```

---

## 🖼️ App Overview

The application includes:

- **Dashboard** — totals, averages, category breakdown, charts, and recent expenses
- **Expenses** — add, edit, delete, search, filter, and sort expenses
- **Categories** — spending totals across all categories
- **Settings** — theme controls and application preferences

---

## 🛠️ Tech Stack

| Area | Technology |
| --- | --- |
| ⚛️ UI | React 19 |
| ⚡ Build tool | Vite 8 |
| 🟨 Language | JavaScript |
| 📊 Charts | Recharts |
| 🎨 Icons | Lucide React |
| 💾 Persistence | `localStorage` |
| 🧩 Styling | CSS3 |
| 📲 PWA | `vite-plugin-pwa` |
| 🚀 Deployment | GitHub Pages |
| 🔁 CI/CD | GitHub Actions |

No Tailwind CSS, Bootstrap, Redux, backend, database, or authentication system is used.

---

## 📲 Progressive Web App

Expense Tracker can be installed as a standalone application on supported desktop and mobile browsers.

The PWA includes:

- Web App Manifest
- 192×192 and 512×512 app icons
- Apple touch icon
- Service worker
- Static asset precaching
- Offline application shell
- Automatic service worker updates
- Cache cleanup for outdated versions

User expense data is not stored inside the service worker cache.

Expenses and theme preferences remain stored separately in `localStorage`.

---

## 💾 Data Storage

This application does not use a backend.

Expense data stays inside the browser using:

```text
acme-expense-tracker-expenses
```

Theme preference is stored under:

```text
acme-expense-tracker-theme
```

Each browser, browser profile, and device has its own independent data.

Clearing browser site data will remove stored expenses and preferences.

---

## 🧾 Expense Data Model

Each expense follows this structure:

```js
{
  id: "unique-id",
  title: "Groceries",
  amount: 45.90,
  category: "Food",
  date: "2026-08-23",
  description: "Weekly groceries"
}
```

IDs are generated uniquely and array indexes are not used as identifiers.

---

## 🏷️ Categories

The application uses one centralized category definition:

- 🍴 Food
- 🚗 Transport
- 🛍️ Shopping
- 🧾 Bills
- 🎬 Entertainment
- ❤️ Health
- ✈️ Travel
- ❓ Other

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Dashboard/
│   ├── EmptyState/
│   ├── ExpenseChart/
│   ├── ExpenseFilters/
│   ├── ExpenseForm/
│   ├── ExpenseList/
│   ├── ExpenseSummary/
│   ├── ExpensesPage/
│   ├── Header/
│   ├── Layout/
│   ├── Modal/
│   └── Sidebar/
│
├── data/
│   ├── categories.js
│   ├── navigation.js
│   └── sampleExpenses.js
│
├── hooks/
│   ├── useExpenses.js
│   └── useTheme.js
│
├── utils/
│   ├── createExpense.js
│   ├── expenseCalculations.js
│   ├── formatCurrency.js
│   ├── formatDate.js
│   ├── generateId.js
│   ├── storage.js
│   └── validateExpense.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Getting Started

**Requirements**

- Node.js 20+
- npm

Clone the repository and install dependencies:

```bash
git clone https://github.com/ivanposavi/expense-tracker.git
cd expense-tracker
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will usually serve the application at:

```text
http://localhost:5173/
```

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run the configured linter |

---

## ♿ Accessibility

Accessibility was included as a dedicated development phase.

The application includes:

- semantic HTML
- visible focus states
- keyboard navigation
- skip link to main content
- labelled form fields
- accessible validation messages
- focus management after navigation
- focus trapping inside dialogs
- Escape-to-close dialogs
- alertdialog confirmation for delete actions
- screen-reader summaries for charts
- screen-reader-friendly percentage change descriptions

---

## ✅ Validation & Error Handling

The form validates:

**Title**

- required
- minimum 2 characters
- maximum 80 characters

**Amount**

- required
- finite numeric value
- greater than 0

**Category**

- required

**Date**

- required
- accepted range: 2000–2100

**Description**

- optional
- maximum 300 characters

Malformed `localStorage` data is ignored safely so invalid stored content does not crash the application.

---

## 🌐 Deployment

The project is deployed through:

**GitHub Actions → GitHub Pages**

Production URL:

👉 [https://ivanposavi.github.io/expense-tracker/](https://ivanposavi.github.io/expense-tracker/)

The Vite production base path is configured for:

```text
/expense-tracker/
```

---

## 🔮 Possible Future Improvements

- User authentication
- Cloud database
- Multi-device synchronization
- Import / export JSON
- CSV export
- PDF reports
- Multiple currencies
- Recurring expenses
- Monthly budgets
- Budget warnings
- Backup and restore
- Advanced analytics
- Custom categories

---

## 📚 What This Project Demonstrates

This project demonstrates practical use of:

- React components
- props and state
- React hooks
- custom hooks
- CRUD operations
- form validation
- localStorage
- data filtering and sorting
- derived statistics
- charts and data visualization
- responsive CSS
- dark/light themes
- accessibility
- PWA development
- service workers
- Git
- GitHub
- GitHub Actions
- GitHub Pages deployment

---

## 🔒 License

Copyright © 2026 Ivan Posavi.  
All rights reserved.

This project is publicly available for portfolio, educational, recruitment, and evaluation purposes only.

You may view the source code, but you may not copy, modify, redistribute, sublicense, sell, or use this source code in another project without prior written permission.

See the [LICENSE](LICENSE) file for the full terms.

---

## 👤 Author

**Ivan Posavi**  
Frontend Developer  
[GitHub](https://github.com/ivanposavi)

⭐ If you are reviewing this project as part of my portfolio, feel free to explore the live demo and source code.
