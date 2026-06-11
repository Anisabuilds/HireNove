# HireNove — Project Context

_Last updated: 2026-06-11_

---

## What HireNove Is

HireNove is a **workflow optimisation partner for recruitment agencies** — not a SaaS product.

We work directly with recruitment firms to identify operational bottlenecks, repetitive work, workflow inefficiencies, disconnected systems, and administrative friction. We then design and implement custom automation, AI workflows, and operational improvements around each agency's specific needs.

**Core message:** Recruiters should spend time recruiting — not updating systems, copying data, chasing information, or fighting disconnected tools.

**Founder:** Anisa Leci  
**Contact:** anisa@hirenove.com  
**Domain:** hirenove.com

---

## Current Project Status

| Area | Status |
|---|---|
| Website (Next.js) | ✅ Built and running locally at `http://localhost:3000` |
| Email (Resend) | ✅ Fully wired, domain verified, live |
| Discovery Call form | ✅ Sends to anisa@hirenove.com |
| Help Us Learn form (modal) | ✅ Sends to anisa@hirenove.com |
| Research database | ✅ Saves to `data/research.json` locally |
| Vercel deployment | ⏳ Not yet deployed |
| Custom domain on Vercel | ⏳ Not yet connected |
| LinkedIn URL | ⏳ Placeholder only — not set |

---

## Completed Setup

### Website
- Built with **Next.js 16 + TypeScript + Tailwind CSS + Framer Motion**
- Dark navy/violet design — premium, consultative, not AI-startup
- Fully responsive (mobile + desktop)
- Scroll-triggered animations throughout
- All content written and finalised

### Pages / Sections
1. **Hero** — headline, subheadline, two CTAs (Book a Discovery Call + Help Us Learn)
2. **Marquee** — scrolling strip of friction keywords
3. **How We Work** — interactive 4-step selector with animated detail panel
4. **Friction Areas** — bento grid of 8 example cards with hover states
5. **Why HireNove** — copy + outcomes checklist
6. **Discovery Call** — inline form with loading/success states
7. **About** — founder photo (Anisa), bio, LinkedIn link
8. **Footer** — logo, email, LinkedIn, nav links, copyright

### Forms
- **Discovery Call** (`/api/contact`) — collects: name, email, phone, company, size, preferred contact method, main challenge
- **Help Us Learn** (`/api/research`) — modal popup, 2-step: contact details + 10 research questions

### Assets
All brand assets are in `/public/`:
- `logo-white.png` — white logo (navbar + footer)
- `logo-color.png` — colour logo (available)
- `logo-symbol.png` — symbol only (available)
- `founder.png` — Anisa's photo (About section)

Original source files:
- `C:\Users\Anisa Leci\OneDrive\HireNove\RecruitOps\Logo\`
- `C:\Users\Anisa Leci\OneDrive\HireNove\RecruitOps\Picture of myself\`

---

## Resend Configuration

| Setting | Value |
|---|---|
| Provider | Resend (resend.com) |
| API Key | Stored in `.env.local` as `RESEND_API_KEY` |
| Domain | hirenove.com |
| DNS verification | ✅ Completed |
| Sender address | `noreply@hirenove.com` |
| All submissions go to | `anisa@hirenove.com` |
| Discovery Call subject | `Discovery Call Request — {Name} @ {Company}` |
| Research subject | `Research Response — {Name} @ {Company}` |

**Note:** The `.env.local` file is not committed to Git (it's in `.gitignore`). The API key must be added to Vercel manually — see NEXT_STEPS.md.

---

## DNS / Domain

- **Domain:** hirenove.com
- **Resend DNS records:** ✅ Added and verified
- **Vercel DNS:** Not yet configured — domain not yet pointed to Vercel

---

## Vercel Status

- `vercel.json` is present and configured
- CLI not yet run — project has not been deployed
- No Vercel project created yet
- `RESEND_API_KEY` environment variable must be added manually after first deploy

---

## Project Structure

```
hirenove/
├── app/
│   ├── api/
│   │   ├── contact/route.ts      ← Discovery Call form handler (sends email)
│   │   └── research/route.ts     ← Help Us Learn handler (saves + sends email)
│   ├── globals.css               ← Global styles, animations, Tailwind base
│   ├── layout.tsx                ← Root layout, fonts (Inter + Plus Jakarta Sans)
│   └── page.tsx                  ← Main page — wires all components together
├── components/
│   ├── Navbar.tsx                ← Fixed nav, scroll-aware, mobile hamburger
│   ├── Hero.tsx                  ← Full-screen hero with mesh gradients
│   ├── Marquee.tsx               ← Scrolling friction keywords strip
│   ├── HowWeWork.tsx             ← Interactive 4-step process section
│   ├── BentoFriction.tsx         ← Bento grid of friction area examples
│   ├── WhyHireNove.tsx           ← Why us section with outcomes list
│   ├── DiscoverySection.tsx      ← Discovery call form section
│   ├── About.tsx                 ← Founder section with photo
│   ├── HelpUsLearnModal.tsx      ← 2-step modal popup for research form
│   └── Footer.tsx                ← Footer with links and contact
├── lib/
│   └── utils.ts                  ← cn() utility (clsx + tailwind-merge)
├── data/
│   └── research.json             ← Local research submissions database (auto-created)
├── public/
│   ├── logo-white.png
│   ├── logo-color.png
│   ├── logo-symbol.png
│   └── founder.png
├── .env.local                    ← API keys (NOT in Git)
├── vercel.json                   ← Vercel deployment config
├── tailwind.config.ts
├── PROJECT_CONTEXT.md            ← This file
├── NEXT_STEPS.md                 ← Exact next actions
└── DECISIONS.md                  ← Key decisions log
```

---

## Important Notes for Future Sessions

- The research database (`data/research.json`) works locally. On Vercel, the filesystem is read-only — email is the source of truth for submissions until a proper database (Vercel KV or Supabase) is added.
- The LinkedIn link in `About.tsx` and `Footer.tsx` currently points to `https://linkedin.com` — it needs Anisa's real LinkedIn URL.
- The `NEXT_PUBLIC_SITE_URL` in `.env.local` is set to `https://hirenove.com` — update once Vercel domain is live.
