# HireNove — Decisions Log

_Last updated: 2026-06-11_

Key decisions made during the build, and the reasoning behind them.

---

## Technology Stack

**Decision:** Next.js 16 + TypeScript + Tailwind CSS + Framer Motion

**Why:**
- Next.js gives us API routes (for email) and server-side rendering in one framework — no separate backend needed
- TypeScript catches errors before they reach production
- Tailwind keeps styles consistent and fast to write
- Framer Motion is the standard for smooth, professional animations in React
- This stack deploys to Vercel in one command with zero configuration

**Alternatives considered:** Plain HTML/CSS (built first, then replaced — too limited for forms and animations), Astro (no built-in API routes)

---

## Email Provider: Resend

**Decision:** Resend over Mailgun, SendGrid, Formspree, or EmailJS

**Why:**
- Simplest API of any email provider — single `resend.emails.send()` call
- Free tier covers 3,000 emails/month, more than enough for this use case
- Domain verification is fast and the dashboard is clean
- Works natively in Next.js API routes with no extra configuration
- Developer-first — easy for non-technical founders to manage

**Status:** Domain `hirenove.com` verified. Sender `noreply@hirenove.com` active.

---

## "Help Us Learn" as a Modal

**Decision:** The research form opens as a modal popup, not a separate page or inline section

**Why:**
- The form has 10 open-ended questions — embedding it inline would make the page extremely long
- A modal keeps the main page clean and focused on the core message
- It can be triggered from multiple places (navbar, hero CTA) without duplicating markup
- The 2-step flow (contact details → questions) makes a long form feel less daunting

---

## Research Database: Local JSON + Email Fallback

**Decision:** Save submissions to `data/research.json` locally, with email as the primary source of truth on Vercel

**Why:**
- Keeps the initial build simple with zero external dependencies
- Email ensures no submission is ever lost, even if the file write fails
- `data/research.json` works perfectly for local development and testing
- A proper database (Vercel KV or Supabase) can be added in the next session without changing any frontend code — it's a contained backend change

**Known limitation:** Vercel's filesystem is read-only, so the JSON file does not persist on production. Email is the source of truth until a database is added.

---

## Design: Dark Theme, Not Light

**Decision:** Deep navy background (`#050D1A`) as the primary theme rather than a white/light design

**Why:**
- The reference site (nextautomation.us) uses a dark, premium dark aesthetic
- Dark themes read as more technical and premium in the automation/ops space
- Violet accents (`#7C3AED`, `#A78BFA`) stand out more dramatically against dark backgrounds
- The glassmorphism and gradient effects that create depth only work on dark backgrounds
- Competitors and generic recruitment tools tend to use light themes — dark differentiates

---

## No Cookie Banner / Analytics (for now)

**Decision:** No analytics or tracking added at launch

**Why:**
- Keeps the initial deployment clean and fast
- No GDPR cookie consent banner needed until tracking is added
- Analytics can be added in 10 minutes once the domain is live (Plausible recommended — no cookie banner required)

---

## Vercel for Hosting

**Decision:** Vercel over Netlify, Railway, or self-hosted

**Why:**
- Native Next.js support (built by the same company)
- Zero-config deployment — `vercel` in the terminal is all it takes
- Automatic SSL, CDN, preview deployments, and domain management
- Free tier is sufficient for this project
- Environment variables managed through the Vercel dashboard

---

## One Destination Email

**Decision:** All form submissions (both Discovery Call and Help Us Learn) go to `anisa@hirenove.com`

**Why:** HireNove is founder-led. All leads and research submissions should land in one inbox, managed directly by Anisa. No ticketing system, CRM, or routing logic needed at this stage.
