# HireNove — Next Steps

_Last updated: 2026-06-11_

These are the exact remaining actions in priority order.

---

## 1. Deploy to Vercel (required before launch)

Run these commands in a terminal, in order:

```bash
# Step 1 — Install Vercel CLI (only needed once)
npm install -g vercel

# Step 2 — Go to the project folder
cd "C:\Users\Anisa Leci\OneDrive\HireNove\RecruitOps\Website\hirenove"

# Step 3 — Deploy
vercel
```

Answer the prompts like this:
- Set up and deploy? → `Y`
- Which scope? → select your account
- Link to existing project? → `N`
- Project name? → `hirenove` (press Enter)
- Directory? → press Enter

```bash
# Step 4 — Add the Resend API key to Vercel
vercel env add RESEND_API_KEY
# Paste the key when prompted
# Select: Production + Preview + Development
# Press Enter

# Step 5 — Deploy to production with env var active
vercel --prod
```

Vercel will give you a live URL (e.g. `hirenove.vercel.app`). Test both forms on that URL before going further.

---

## 2. Connect hirenove.com to Vercel

After deploying:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Open the `hirenove` project → **Settings → Domains**
3. Click **Add Domain** → type `hirenove.com`
4. Vercel will show you DNS records to add
5. Go to your domain registrar (wherever you bought hirenove.com) and add those records
6. Wait 5–30 minutes for propagation
7. Vercel will show a green checkmark when it's live

---

## 3. Fix the LinkedIn link

In two files, the LinkedIn URL is currently a placeholder (`https://linkedin.com`).

Tell Claude: **"Update the LinkedIn link to [your real LinkedIn URL]"**

Files to update:
- `components/About.tsx`
- `components/Footer.tsx`

---

## 4. Set up a persistent research database (optional but recommended)

Currently, "Help Us Learn" submissions are saved to `data/research.json` locally, but **Vercel's filesystem is read-only** — on production, only the email copy survives.

To fix this, add one of:
- **Vercel KV** (simplest — built into Vercel dashboard, Redis-based)
- **Supabase** (free tier, Postgres, gives you a proper table to browse submissions)

Tell Claude: **"Add Vercel KV to store research submissions"** and it will handle the full implementation.

---

## 5. Upgrade Resend sender name (optional)

Currently emails arrive from `HireNove <noreply@hirenove.com>`.

If you want a warmer sender name (e.g. `Anisa at HireNove <anisa@hirenove.com>`), tell Claude and it's a one-line change in both API routes.

---

## 6. Add Google Analytics or Plausible (optional)

For tracking visitors once the site is live.

Tell Claude: **"Add Plausible analytics to the site"** (privacy-friendly, no cookie banner needed) or **"Add Google Analytics"**.

---

## 7. Add a favicon

The browser tab currently shows a default icon.

- Source file available: `C:\Users\Anisa Leci\OneDrive\HireNove\RecruitOps\Logo\symbol.png`
- Tell Claude: **"Add the HireNove symbol as the favicon"**

---

## Testing checklist before launch

- [ ] Discovery Call form submits and email arrives at anisa@hirenove.com
- [ ] Help Us Learn modal opens from both navbar and hero CTA
- [ ] Help Us Learn form submits and email arrives at anisa@hirenove.com
- [ ] All nav links scroll to the correct sections
- [ ] Site looks correct on mobile (test on your phone)
- [ ] LinkedIn link is updated to real URL
- [ ] Custom domain `hirenove.com` is live and SSL is green
