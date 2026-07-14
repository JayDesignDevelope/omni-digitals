# Omnis Digital — contact-form mailer

A tiny Express + Nodemailer backend so the contact form emails enquiries
**directly** to the team inbox (no third-party relay, no mail-app popup). It
also serves the static site, so you can run everything with one command.

## Setup

```bash
cd server
npm install
cp .env.example .env      # then edit .env with your SMTP details
npm start
```

Open **http://localhost:3000** and submit the form — the enquiry lands in the
inbox set by `MAIL_TO`.

## Gmail note

`SMTP_PASS` must be a Gmail **App Password** (16 characters), not your normal
password:

1. Turn on 2-Step Verification: https://myaccount.google.com/security
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Paste it into `.env` as `SMTP_PASS`.

Prefer another provider (Outlook, Zoho, SendGrid, Mailgun, …)? Just change
`SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` in `.env`.

## How the front-end finds the API

`script.js` POSTs the form to `window.CONTACT_API` (defaults to the same-origin
`/api/contact`). If you host the API on a different origin, set it before
`script.js` loads, e.g. in `index.html`:

```html
<script>window.CONTACT_API = 'https://api.yourdomain.com/api/contact';</script>
```

If the API is unreachable (e.g. the page is opened as a plain file with no
server running), the form falls back to opening a pre-filled `mailto:` so no
lead is ever lost.
