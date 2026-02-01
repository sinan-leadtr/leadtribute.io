# Leadtribute – Final Dashboard App

Unified **ad performance dashboard** (Next.js 16, React 19, Tailwind, Material 3 Expressive). KPIs, ROAS, campaign drill-downs, integrations, settings, landing, login/register. Dark theme, Recharts, Framer Motion, Sonner toasts.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Start the dev server

In a terminal (e.g. Cursor’s terminal or macOS Terminal.app):

```bash
cd /path/to/Development_Tool
npm run dev
```

Wait until you see **Ready** and `Local: http://127.0.0.1:3000`.

### 2. Open the app in a browser

**Option A – Cursor built-in browser (recommended)**  
1. `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)  
2. Type **Simple Browser: Show** and run it  
3. Enter: `http://127.0.0.1:3000` and press Enter  

**Option B – Your normal browser**  
1. Open Chrome, Safari, or Firefox  
2. In the address bar type: `http://127.0.0.1:3000`  
3. Press Enter  

**Option C – Cursor Ports**  
If the dev server is running, open the **Ports** view in Cursor, find port **3000**, and use **Open in Browser** (if shown).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel (fix DEPLOYMENT_NOT_FOUND)

**DEPLOYMENT_NOT_FOUND** means the URL you opened has no deployment. Fix it by creating a deployment and using the **correct URL**.

### 1. Create a deployment

1. Push your code to **GitHub** (if not already).
2. Go to [vercel.com/new](https://vercel.com/new).
3. **Import** your repository (e.g. `Development_Tool` or `leadtribute-dashboard`).
4. **Root Directory:** leave as is or set to the folder that contains `package.json`.
5. **Environment Variables:** add (from `.env.example`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**. Wait until the build finishes.

### 2. Use the correct URL

- **Production URL:** `https://your-project-name.vercel.app` (or your custom domain).  
  Use this for normal access; it always points to the latest production deployment.
- **Preview URLs** (e.g. `xxx-username.vercel.app`) are tied to one deployment. If that deployment is removed or replaced, the URL can show **DEPLOYMENT_NOT_FOUND**.  
  → Prefer the **production URL** for bookmarks and sharing.

### 3. If you already deployed

- Open [Vercel Dashboard](https://vercel.com/dashboard) → your project → **Deployments**.
- Open the **latest successful** deployment and use the URL shown there (or the production domain).
- Do **not** use an old or copied preview URL; it may no longer exist.

### 4. Supabase redirect (Google OAuth)

In **Supabase** → Authentication → URL Configuration, add:

- **Site URL:** `https://your-project-name.vercel.app`
- **Redirect URLs:** `https://your-project-name.vercel.app/auth/callback`
