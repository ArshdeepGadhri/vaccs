# vaccs

A private dashboard for managing gaming accounts — built as a full-stack portfolio project.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss)

---

## Overview

**vaccs** is a production-ready CRUD dashboard that lets authenticated users manage a private inventory of gaming accounts. It features a polished dark UI, full authentication flow, responsive design, and data export — all running on a serverless infrastructure.

## Features

- **Authentication** — Email/password login, sign-up, and a complete forgot/reset password PKCE flow via Supabase Auth
- **Account Management** — Create, edit, and delete accounts with fields for username, password, region, rank, status, and notes
- **Filtering & Search** — Live search by username with dynamic dropdowns for status and rank filters
- **Responsive Layout** — Table view on desktop, stacked card view on mobile
- **Settings** — Change account password inline, export all accounts to a dated `.csv` file
- **Smooth UX** — Lenis smooth scroll, GSAP-ready animation layer, and Vercel Analytics/Speed Insights baked in

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database & Auth | Supabase (Postgres + Auth) |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | GSAP, Lenis |
| Deployment | Vercel |

## Security Note

⚠️ **Password Storage Warning**: This application stores Valorant Alt passwords in plain text in the database. This is intentional for a gaming account management tool but should **not** be used for sensitive credentials. For production use with sensitive data, implement encryption or hash passwords with a strong algorithm like bcrypt.

## Screenshots

![Dashboard Screenshot](https://i.postimg.cc/RVbjPTtV/Screenshot-2026-05-01-182020.png)
> *Note: Replace the placeholder above with an actual screenshot once available.*

- **Dark UI** — Polished dark theme with Lenis smooth scroll
- **Responsive** — Desktop table view, mobile card layout
- **Live Search** — Filter accounts by username, rank, and status

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/vaccs.git
cd vaccs
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set up the database

Run the following SQL in your Supabase SQL Editor:

```sql
CREATE TABLE accounts (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  password text not null,
  region text not null,
  current_rank text not null,
  target_rank text not null,
  status text not null,
  notes text,
  login_email text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  user_id uuid references auth.users(id) on delete cascade not null
);

-- Enable Row Level Security
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own accounts"
  ON accounts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── actions/          # Server actions (auth, accounts)
│   ├── auth/callback/    # Supabase PKCE callback route
│   ├── dashboard/        # Protected dashboard & settings pages
│   ├── login/            # Auth page (login, signup, forgot password)
│   └── update-password/  # Password reset landing page
├── components/
│   ├── dashboard/        # AccountsList, AccountFormModal, ExportButton, etc.
│   └── ui/               # shadcn/ui primitives + PasswordInput
├── lib/supabase/         # Supabase server/client helpers
└── types/                # Database type definitions
```

## Contributing

Contributions are welcome! To contribute:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
