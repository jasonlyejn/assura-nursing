# Put your work on GitHub and let Cloudflare deploy it for you

Right now you copy files by hand and run `wrangler pages deploy`. With GitHub,
you push once and Cloudflare builds and publishes on its own — and every version
is kept, so nothing is ever lost again.

---

## Part 1 — one-time setup (about 15 minutes)

**1. Make a GitHub account** at github.com (free).

**2. Install GitHub Desktop** from desktop.github.com — the app, not the command
line. Much easier on Windows.

**3. Create the repository**
- Open GitHub Desktop → **File → New repository**
- Name: `assura`
- Local path: `C:\` so it becomes `C:\assura` (your existing folder)
- Tick **Initialize with README** only if the folder is empty — yours is not, so
  leave it unticked
- Click **Create repository**
- Click **Publish repository** → tick **Keep this code private** → Publish

Your work is now backed up on GitHub.

**4. Whenever you change something**
- Open GitHub Desktop → it lists what changed
- Type a short note in the Summary box, e.g. "added medication chart"
- Click **Commit to main**, then **Push origin**

---

## Part 2 — Cloudflare deploys automatically

Do this once for each of your two sites.

**Staff app**
1. Cloudflare → **Workers & Pages** → **assura-staff** → **Settings** → **Build**
2. Click **Connect to Git** → authorise GitHub → pick the `assura` repository
3. Set:
   - Production branch: `main`
   - Build command: `cd app && npm install && npm run build`
   - Build output directory: `app/public`
   - Root directory: leave blank
4. Save

**Website**
1. Cloudflare → **Workers & Pages** → **assura-web** → **Settings** → **Build**
2. Connect the same `assura` repository
3. Set:
   - Production branch: `main`
   - Build command: leave blank
   - Build output directory: `website`
4. Save

From now on: **push in GitHub Desktop → Cloudflare deploys within a minute.**
No more `wrangler pages deploy`.

---

## Part 3 — the database still needs you

GitHub deploys *code*. It does not change your *database*. That mismatch is what
has been causing "Request failed (500)".

So the rule after every deploy is simply:

> **Staff → 🔧 Update database**

That button brings the database up to date, is safe to press any time, and
replaces all the `wrangler d1 execute` commands.

---

## What not to commit

`wrangler.toml` holds your database id and project name. It is fine in a
**private** repository. If you ever make the repo public, remove it first.

Never commit: your PINs, `.env` files, or anything with a password in it.
