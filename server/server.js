/*
 * Omnis Digital — contact-form mailer
 * ------------------------------------
 * A tiny Express server that:
 *   1. serves the static site (index.html, styles.css, script.js, assets), and
 *   2. exposes POST /api/contact which emails each enquiry straight to the
 *      team inbox using Nodemailer over SMTP (Gmail by default).
 *
 * Setup (one time):
 *   1. cd server && npm install
 *   2. copy .env.example -> .env and fill in SMTP_USER / SMTP_PASS / MAIL_TO
 *      (for Gmail, SMTP_PASS must be a 16-char *App Password*, not your login
 *       password — https://myaccount.google.com/apppasswords, requires 2FA)
 *   3. npm start   ->   open http://localhost:3000
 */

const path = require('path');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());                    // allow the form to POST from any origin (e.g. Live Server)
app.use(express.json());            // parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// serve the static site that lives one directory up from /server
app.use(express.static(path.join(__dirname, '..')));

// build the SMTP transport once and reuse it
function makeTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: (process.env.SMTP_SECURE || 'true') === 'true', // 465 = SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, service, message, subject } = req.body || {};

  // minimal validation — name + phone are the required fields on the form
  if (!name || !phone) {
    return res.status(400).json({ ok: false, error: 'Name and phone are required.' });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(500).json({
      ok: false,
      error: 'Mailer not configured — set SMTP_USER and SMTP_PASS in server/.env'
    });
  }

  const to = process.env.MAIL_TO || process.env.SMTP_USER;
  const mailSubject = subject || `New Enquiry — ${name}`;

  const text = [
    'New Enquiry — Omnis Digital', '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || '—'}`,
    `Service: ${service || '—'}`,
    `Message: ${message || '—'}`
  ].join('\n');

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#160f2e">
      <h2 style="margin:0 0 12px">New Enquiry — Omnis Digital</h2>
      <table style="border-collapse:collapse;font-size:15px">
        <tr><td style="padding:6px 14px 6px 0;color:#6b6485">Name</td><td><b>${esc(name)}</b></td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#6b6485">Phone</td><td>${esc(phone)}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#6b6485">Email</td><td>${esc(email) || '—'}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#6b6485">Service</td><td>${esc(service) || '—'}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#6b6485;vertical-align:top">Message</td><td>${esc(message) || '—'}</td></tr>
      </table>
    </div>`;

  try {
    const transport = makeTransport();
    await transport.sendMail({
      from: `"Omnis Digital Website" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email || undefined,   // reply goes straight to the lead
      subject: mailSubject,
      text,
      html
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error('sendMail failed:', err && err.message);
    return res.status(502).json({ ok: false, error: 'Could not send the email right now.' });
  }
});

app.listen(PORT, () => {
  console.log(`\n  Omnis Digital site + mailer running at http://localhost:${PORT}`);
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('  ⚠  SMTP not configured yet — copy server/.env.example to server/.env and fill it in.\n');
  } else {
    console.log('  ✓  SMTP configured — contact form will deliver to', process.env.MAIL_TO || process.env.SMTP_USER, '\n');
  }
});
