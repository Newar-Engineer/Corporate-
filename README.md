# Newa Tech — Corporate Website

A full-stack, production-ready business/corporate website for **Newa Tech**, a trading, consultancy, and digital services company based in **Baneshwor, Kathmandu, Nepal**.

Built with Next.js 16, PostgreSQL (Prisma 7), TypeScript, and Tailwind CSS v4.

## Features

- **Public Website** — Home, About, Services (with detail pages), Portfolio (filterable), Blog, Contact (with Google Map), Careers (with application form)
- **Admin Dashboard** — Auth-protected (JWT + bcrypt), CRUD for all content, messages inbox, analytics, settings editor
- **Nepal Payment Stack** — eSewa, Khalti, and Cash on Delivery (COD) mentioned throughout services
- **SEO Optimized** — Dynamic meta tags, auto-generated sitemap.xml, robots.txt, Open Graph tags, semantic HTML
- **Mobile-First Responsive** — Tested at 375px, 768px, 1024px, 1440px
- **Real Content** — All content is realistic Nepali business data, editable via admin panel

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Auth | JWT + bcrypt |
| Email | Nodemailer (SMTP) |
| Icons | react-icons (Feather) |
| File Uploads | Local (public/uploads/) |

## Prerequisites

- **Node.js** 20.9+ (v24.14.1 recommended)
- **PostgreSQL** 14+ running locally or on a server
- **npm** 10+

## Quick Start

### 1. Clone & Install

```bash
cd newa-tech
npm install
```

### 2. Set Up Environment

Copy the example env file and update with your credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — Random secret for JWT signing
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — SMTP credentials for email notifications
- `ADMIN_EMAIL` — Email address to receive contact form submissions

### 3. Set Up Database

```bash
# Push the schema to your database
npx prisma db push

# Seed with realistic sample data
npm run seed
```

This creates:
- **Admin user**: `admin@newatech.com` / `Admin@123`
- **Editor user**: `editor@newatech.com` / `Editor@123`
- 6 services, 4 team members, 4 testimonials, 5 portfolio items, 3 blog posts, 3 jobs, 13 site settings, 7 page contents

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin — Login with admin credentials

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── admin/           # Admin dashboard pages (client components)
│   │   ├── blog/        # Blog CRUD
│   │   ├── careers/     # Careers CRUD
│   │   ├── services/    # Services CRUD
│   │   ├── team/        # Team CRUD
│   │   ├── testimonials/# Testimonials with approve/reject
│   │   ├── messages/    # Contact messages inbox
│   │   ├── applications/# Job applications viewer
│   │   ├── analytics/   # Dashboard analytics
│   │   ├── settings/    # Site settings editor
│   │   └── login/       # Admin login
│   ├── api/             # REST API routes
│   │   ├── auth/        # Login, register, me
│   │   ├── services/    # Services CRUD
│   │   ├── team/        # Team CRUD
│   │   ├── testimonials/# Testimonials CRUD
│   │   ├── contact/     # Contact form + inbox
│   │   ├── posts/       # Blog posts CRUD
│   │   ├── portfolio/   # Portfolio CRUD
│   │   ├── careers/     # Jobs CRUD
│   │   ├── applications/# Job applications
│   │   ├── upload/      # File uploads
│   │   ├── dashboard/   # Dashboard stats
│   │   ├── settings/    # Site settings
│   │   ├── seo/         # Page content
│   │   └── page-views/  # Page view tracking
│   ├── about/           # About page
│   ├── services/        # Services listing + [slug] detail
│   ├── portfolio/       # Portfolio gallery with filters
│   ├── blog/            # Blog listing + [slug] detail
│   ├── contact/         # Contact page with form + map
│   ├── careers/         # Careers listing + apply form
│   ├── sitemap.ts       # Auto-generated sitemap
│   └── robots.ts        # Robots.txt
├── components/
│   ├── ui/              # Reusable UI primitives (Button, Input, Modal, Toast, etc.)
│   ├── admin/           # Admin components (Sidebar, DataTable, StatsCard, ImageUpload)
│   └── *.tsx            # Public site components
├── lib/
│   ├── prisma.ts        # Prisma client (singleton with adapter)
│   ├── auth.ts          # JWT + bcrypt helpers
│   ├── mail.ts          # Nodemailer email notifications
│   └── utils.ts         # Formatting utilities
└── generated/prisma/    # Auto-generated Prisma client
prisma/
├── schema.prisma        # Database schema (12 models)
└── seed.ts              # Database seeder
```

## Database Schema

| Model | Purpose |
|-------|---------|
| `User` | Admin users (super-admin, editor roles) |
| `Service` | Services with dynamic icons, slug-based routing |
| `TeamMember` | Team profiles with photos and social links |
| `Testimonial` | Client testimonials with approve/reject workflow |
| `ContactMessage` | Contact form submissions with read/unread status |
| `Post` | Blog posts with draft/published workflow |
| `PortfolioItem` | Portfolio with category filtering |
| `Job` | Job listings with type/location/department |
| `JobApplication` | Job applications with resume URL |
| `PageView` | Analytics — page view counts by slug+date |
| `SiteSetting` | Key-value site configuration |
| `PageContent` | Per-page SEO metadata and content |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repo in Vercel
3. Set environment variables in Vercel dashboard
4. Add a PostgreSQL database (Vercel Postgres, Neon, or Supabase)
5. Deploy — Vercel automatically detects Next.js

### Render / VPS

```bash
# Build
npm run build

# Start
npm start
```

Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start npm --name "newa-tech" -- start
```

## Default Admin Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@newatech.com | Admin@123 |
| Editor | editor@newatech.com | Editor@123 |

**Change these immediately after first login!**

## API Endpoints

All API routes are at `/api/*` and return JSON. Auth-protected routes require `Authorization: Bearer <token>` header.

| Endpoint | Methods | Auth | Description |
|----------|---------|------|-------------|
| `/api/auth/login` | POST | No | Login → JWT token |
| `/api/auth/me` | GET | Yes | Current user info |
| `/api/services` | GET/POST | POST: auth | List/Create services |
| `/api/services/[id]` | GET/PUT/DELETE | PUT/DELETE: auth | Manage service |
| `/api/team` | GET/POST | POST: auth | List/Create team members |
| `/api/team/[id]` | GET/PUT/DELETE | PUT/DELETE: auth | Manage team member |
| `/api/testimonials` | GET/POST | No | Public submit, auth to see all |
| `/api/testimonials/[id]` | GET/PUT/DELETE | PUT/DELETE: auth | Approve/reject |
| `/api/contact` | GET/POST | GET: auth | Submit message, admin list |
| `/api/contact/[id]` | PUT/DELETE | Auth | Mark read/delete |
| `/api/posts` | GET/POST | POST: auth | List/Create posts |
| `/api/posts/[id]` | GET/PUT/DELETE | PUT/DELETE: auth | Manage post |
| `/api/portfolio` | GET/POST | POST: auth | List/Create portfolio |
| `/api/portfolio/[id]` | GET/PUT/DELETE | PUT/DELETE: auth | Manage portfolio item |
| `/api/careers` | GET/POST | POST: auth | List/Create jobs |
| `/api/careers/[id]` | GET/PUT/DELETE | PUT/DELETE: auth | Manage job |
| `/api/applications` | GET/POST | GET: auth | Submit/List applications |
| `/api/upload` | POST | Auth | Upload images (max 5MB) |
| `/api/dashboard/stats` | GET | Auth | Analytics data |
| `/api/settings` | GET/PUT | PUT: auth | Site settings |
| `/api/seo/page-content` | GET/PUT | PUT: auth | Page SEO content |
| `/api/page-views` | POST | No | Track page views |
| `/api/admin/users` | GET/POST | Super-admin | Manage users |

## Admin Dashboard Guide

1. **Login** at `/admin` with your credentials
2. **Dashboard** — Overview with stats cards (services, team, messages, etc.)
3. **Services** — Add/edit/delete services; auto-generates slugs
4. **Team** — Add team members with photo uploads
5. **Testimonials** — Approve/reject client testimonials before they appear on the site
6. **Blog** — Write and publish blog posts (draft workflow)
7. **Messages** — View and manage contact form submissions
8. **Careers** — Post job openings and view applications
9. **Applications** — Review job applications with full details
10. **Analytics** — Message counts and page view statistics
11. **Settings** — Edit site-wide settings (company info, hero text, etc.)

## Customization

All site content is stored in the database and editable through the admin panel. No code changes needed for content updates:

- **Home page text** — Edit via Settings (hero_title, hero_subtitle)
- **About page content** — Edit via Settings (about_story, mission, vision) and Team section
- **Services** — CRUD via Services admin
- **Testimonials** — Approved testimonials appear on home page
- **Portfolio** — CRUD via Portfolio admin
- **Blog posts** — CRUD via Blog admin
- **Careers** — CRUD via Careers admin

## License

Private — All rights reserved. Built for Newa Tech.
