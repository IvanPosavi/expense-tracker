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
👉 [https://ivanposavi.github.io/expense-tracker/](https://ivanposavi.github.io/expense-tracker/)

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

## 🛠️ Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19 |
| Bundler | Vite 8 |
| Language | JavaScript |
| Charts | Recharts |
| Icons | Lucide React |
| Persistence | `localStorage` |
| PWA | `vite-plugin-pwa` |
| Styling | CSS3 (custom properties, no Tailwind or Bootstrap) |

There is no backend, database, or authentication. Data never leaves the browser.

---

## 📦 Getting started

You need [Node.js](https://nodejs.org/) 20 or newer.

```bash
npm install
npm run dev
```

Open the URL Vite prints. With the GitHub Pages base path, that is usually:

```text
http://localhost:5173/expense-tracker/
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

On first visit, the app seeds a few sample expenses so the dashboard and charts are not empty. After that, your list is what is stored in the browser. An empty list stays empty after refresh.

---

## 🖱️ Usage

1. Open **Expenses** and fill in title, amount, category, and date. Description is optional.
2. Use search, category, date range, and sort to find items.
3. Edit or delete from the list. Delete asks for confirmation.
4. Check **Dashboard** for totals and charts, and **Categories** for a full category breakdown.
5. Use **Settings** or the header control to switch light and dark mode.

Clearing site data for this origin removes expenses and the saved theme.

---

## 📲 PWA

The production app can be installed from Chrome or Edge and can open the application shell offline after it has loaded once.

- Manifest name: `Expense Tracker | ACME`
- Short name: `Expense Tracker`
- Service worker updates automatically so you are not stuck on an old cached build

---

## 📁 Project structure

```text
src/
  components/   UI pieces (layout, pages, form, list, charts, modal)
  data/         Categories, sample expenses, navigation
  hooks/        useExpenses(), useTheme()
  utils/        Validation, storage, filters, totals, formatting
  App.jsx       Page switching and edit/delete dialogs
  index.css     Design tokens and global styles
```

Expense objects look like this:

```js
{
  id: "unique-id",
  title: "Groceries",
  amount: 45.9,
  category: "Food",
  date: "2026-08-23",
  description: "Weekly groceries"
}
```

Categories live in one place: Food, Transport, Shopping, Bills, Entertainment, Health, Travel, Other.

Storage keys:

- `acme-expense-tracker-expenses`
- `acme-expense-tracker-theme`

Invalid JSON or malformed expenses are ignored so a bad stored value does not crash the app.

---

## ♿ Accessibility

The app uses semantic HTML, visible focus styles, labelled form fields, and real buttons for actions. Dialogs can be closed with Escape. A skip link jumps to main content.

---

## 📄 License

This project is proprietary. Copyright (c) 2026 Ivan Posavi. All rights reserved.

You may view the source code for portfolio, educational, recruitment, and evaluation purposes only. You may not copy, modify, redistribute, sublicense, sell, or use this source code in another project without prior written permission.

See the [LICENSE](LICENSE) file for the full terms.
