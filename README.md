# Budgetr

Budgetr is a cross-platform budgeting application built with Next.js (App Router), Supabase, and TailwindCSS. It allows individuals to manage their own budgets and create households for shared budgeting. The app is designed to run as a PWA (Progressive Web App) so it can be installed on desktop, iOS, and Android.

## Features

- User authentication with Supabase
- Environment-controlled account registration (public or private mode)
- Personal and shared household budgets
- Track expected vs actual expenses
- Monthly and yearly breakdowns for spending insights
- Works as a PWA across desktop and mobile
- Self-hostable with Supabase and Vercel (or any Next.js hosting)

## Tech Stack

- [Next.js 13+ (App Router)](https://nextjs.org/)
- [Supabase](https://supabase.com/) for authentication and database
- [TailwindCSS](https://tailwindcss.com/) for styling
- [next-pwa](https://github.com/shadowwalker/next-pwa) for PWA support

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project with authentication enabled

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/budgetr.git
cd budgetr

npm install
```

### Environment Variables

Create a .env.local file in the project root with the following values:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_ALLOW_REGISTRATION=true
```

NEXT_PUBLIC_ALLOW_REGISTRATION can be set to false to disable self-service registrations (useful for self-hosted private instances).

### Database Schema

Run the following SQL in your Supabase SQL editor:

```
create table households (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_by uuid references auth.users(id),
  created_at timestamp default now()
);

create table memberships (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  household_id uuid references households(id),
  role text default 'member'
);

create table budgets (
  id uuid primary key default uuid_generate_v4(),
  household_id uuid references households(id),
  month int not null,
  year int not null,
  created_at timestamp default now()
);

create table expenses (
  id uuid primary key default uuid_generate_v4(),
  budget_id uuid references budgets(id),
  title text not null,
  date date not null,
  expected_cost numeric not null,
  actual_cost numeric
);
```

Enable Row Level Security (RLS) and add appropriate access policies to secure user data.

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at http://localhost:3000

### Production

Build and start the production server:

```bash
npm run build
npm start
```

### Deployment

- Frontend: Deploy to Vercel
- Backend: Supabase provides authentication, database, and API.
- PWA: Can be installed on desktop, iOS, and Android.

## Roadmap

Phase 1 – MVP

- User authentication (login, register, logout)
- Personal budgets with expected vs actual expenses
- Dashboard with monthly totals
- PWA support for cross-platform use

Phase 2 – Households & Sharing

- Create and join households-
- Shared household budgets with multiple members
- Role-based permissions (owner, member)
- Realtime updates with Supabase

Phase 3 – Insights & History

- Yearly breakdown of spending
- Charts and trend analysis
- Expense categorization (e.g., groceries, rent, utilities)
- Data export (CSV, Excel)

Phase 4 – Mobile Enhancements

- Push notifications (bill reminders, budget overspend alerts)
- Offline-first mode with caching
- Receipt upload with file storage

Phase 5 – Advanced

- Insights into spending habits
- Bank API integrations for auto-imported transactions
- Multi-currency support

### License

This project is licensed under the GNU GPLv3 License.
