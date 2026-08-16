# Assura — Complete setup from zero

You have two folders:

- **website/**  → the public site (flyer + booking)  → becomes **assuranursing.com**
- **app/**      → the staff app (private)            → becomes your staff address

Do PART A first, then B, then C. Run one command at a time.
If PowerShell says "running scripts is disabled", run this once in that window:

    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

---

# PART A — Put the staff app online

Open PowerShell **in the `app` folder**.

**A1. Create the database**

    npx wrangler d1 create assura

It prints a long id like `e88c654a-269f-426c-9a73-001504ad8435`. **Copy it.**

**A2. Paste the id into the config**

    notepad wrangler.toml

Find this line:

    database_id = "PASTE_YOUR_DATABASE_ID_HERE"

Replace the middle part with your id, so it looks like:

    database_id = "e88c654a-269f-426c-9a73-001504ad8435"

Save (Ctrl+S), close.

**A3. Create the tables** (type `y` when asked)

    npx wrangler d1 execute assura --remote --file=db\schema.sql

    npx wrangler d1 execute assura --remote --file=db\mews.sql

**A3b. Load your rate card** — services + 391 items (supplies, instruments, equipment, medications)
(each with code, brand, size, unit and a picture)

    npx wrangler d1 execute assura --remote --file=db\images.sql

    npx wrangler d1 execute assura --remote --file=db\catalog.sql

**A3c. Load your real service rates + quotes**

    npx wrangler d1 execute assura --remote --file=db\rates.sql

**A3d. Staff profile fields**

    npx wrangler d1 execute assura --remote --file=db\staff.sql

**A3e. Shift handover**

    npx wrangler d1 execute assura --remote --file=db\handover.sql

**A3f. Staff roster**

    npx wrangler d1 execute assura --remote --file=db\roster.sql

**A3g. Staff requests + forgot-PIN**

    npx wrangler d1 execute assura --remote --file=db\requests.sql

    npx wrangler d1 execute assura --remote --file=db\pinreset.sql

**A3g. Per-patient chat + end-of-case feedback**

    npx wrangler d1 execute assura --remote --file=db\chat.sql

    npx wrangler d1 execute assura --remote --file=db\feedback.sql

**A3h. Staff self-service (own PIN + profile approval)**

    npx wrangler d1 execute assura --remote --file=db\selfservice.sql

(The images.sql line may say "duplicate column" if you have run it before — that is harmless.)

**A4. Publish the app**

    npx wrangler pages deploy public --project-name assura-staff

Copy the URL it prints, e.g. `https://assura-staff.pages.dev`

**A5. Set the login secret, then publish again**

    npx wrangler pages secret put SESSION_SECRET

(paste any long random text, 30+ characters, press Enter)

    npx wrangler pages deploy public --project-name assura-staff

**A6. Test it.** Open the URL from A4 in your browser.
First time it asks you to create the admin PIN. Create it and log in.

✅ Staff app is live.

---

# PART B — Put the website online

Open PowerShell **in the `website` folder**.

**B1. Publish the website**

(The booking form is already pointed at `https://staff.assuranursing.com` — nothing to edit.)

    npx wrangler pages deploy . --project-name assura-web

**B2. Test it.** Open the printed URL (e.g. `https://assura-web.pages.dev`)
and also `.../book` — both should load.

✅ Website is live.

---

# PART C — Attach your domain (assuranursing.com)

Your domain must be in your Cloudflare account first
(Cloudflare → Add a domain → follow steps → point nameservers at Cloudflare).

**C1.** Cloudflare dashboard → **Workers & Pages** → click **assura-web**
→ **Custom domains** → **Set up a custom domain**
→ type `assuranursing.com` → Continue → Activate.

**C2.** Do it again for `www.assuranursing.com`.

**C3.** Wait 5–10 minutes. Status goes **Verifying** → **Active** (green).

**C4.** Test **https://assuranursing.com** in a private/incognito window.

### Rules that avoid the problems you hit before

- Let Cloudflare create the DNS record itself in C1. Don't add records by hand.
- The DNS record must show **Proxied (orange cloud)** — never "DNS only".
- One domain belongs to **one** project only. `assuranursing.com` goes on
  **assura-web**, never on the staff project.
- Don't add an A record. Cloudflare may "recommend" one — ignore it, you use CNAME.

---

# PART D — Staff address (staff.assuranursing.com)

**D1.** Cloudflare → **Workers & Pages** → click **assura-staff**
→ **Custom domains** → **Set up a custom domain**
→ type `staff.assuranursing.com` → Continue → Activate.

**D2.** Wait 5–10 minutes until the status turns green **Active**.

**D3.** Test **https://staff.assuranursing.com** in a private window —
your staff login should appear.

Nothing else to change: the booking form already points here.

---

# PART E — Email addresses (free)

Cloudflare → your domain **assuranursing.com** → **Email** → **Email Routing**
→ Get started. Then create addresses that forward to your existing Gmail:

- info@assuranursing.com    → your Gmail
- admin@assuranursing.com   → your Gmail
- jason@assuranursing.com   → your Gmail

This is **free** and gives you professional addresses that land in your normal inbox.

Note: forwarding lets you **receive**. To also **send** from those addresses you
need a mailbox service (Google Workspace ≈ RM30/user/month, or Zoho Mail has a
free tier). Start with forwarding — it covers most needs.

---

# Final test

1. Open **assuranursing.com** → website shows
2. Open **assuranursing.com/book** → fill a test booking → send WhatsApp
3. Open your staff app → **Intake** → the booking is there with a blue 🌐 web badge

That means everything is connected.

---

# Note about app logins

The staff app uses **name + PIN** to log in (fast on ward phones/tablets), not
email addresses. Each staff member gets their own name + PIN, so every action is
recorded against that person. Your email addresses above are for mail — they are
separate from app logins.
