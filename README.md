# Expense Tracker | ACME

A modern expense tracker for the browser. Add, edit, and review spending with a clean SaaS-style dashboard, live charts, and data that stays on your device.

This is a frontend portfolio project by **Ivan Posavi**. There is no backend and no account system. Expenses and theme preference are saved in `localStorage`.

## Demo

**Live production version:** [https://ivanposavi.github.io/expense-tracker/](https://ivanposavi.github.io/expense-tracker/)

This is the deployed GitHub Pages build, not the local development server.

## Features

- Add, edit, and delete expenses
- Search, filter by category or date, and sort the list
- Dashboard totals for all time, this month, this week, and average amount
- Charts for spending by category and over the last six months
- Category totals across the same eight categories
- Light and dark theme, saved on this device
- Form validation with clear error messages
- Responsive layout from 320px upward
- Keyboard-friendly controls, labels, and a skip link to main content

Currency is **EUR**. Dates are stored as `YYYY-MM-DD`.

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19 |
| Bundler | Vite 8 |
| Language | JavaScript |
| Charts | Recharts |
| Icons | Lucide React |
| Persistence | `localStorage` |
| Styling | CSS3 (custom properties, no Tailwind or Bootstrap) |

## Getting started

You need [Node.js](https://nodejs.org/) 20 or newer.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

On first visit, the app seeds a few sample expenses so the dashboard and charts are not empty. After that, your list is what is stored in the browser. An empty list stays empty after refresh.

## Usage

1. Open **Expenses** and fill in title, amount, category, and date. Description is optional.
2. Use search, category, date range, and sort to find items.
3. Edit or delete from the list. Delete asks for confirmation.
4. Check **Dashboard** for totals and charts, and **Categories** for a full category breakdown.
5. Use **Settings** or the header control to switch light and dark mode.

Data never leaves the browser. Clearing site data for this origin removes expenses and the saved theme.

## Project structure

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

## Accessibility

The app uses semantic HTML, visible focus styles, labelled form fields, and real buttons for actions. Dialogs can be closed with Escape. A skip link jumps to main content.

## License

This project is proprietary. Copyright (c) 2026 Ivan Posavi. All rights reserved.

You may view the source code for portfolio, educational, recruitment, and evaluation purposes only. You may not copy, modify, redistribute, sublicense, sell, or use this source code in another project without prior written permission.

See the [LICENSE](LICENSE) file for the full terms.
