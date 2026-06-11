const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

// Per-IP rate limit: 5 submissions per 10 minutes. In-memory, so it resets on
// cold starts — fine as a speed bump against form spam bots.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const submissionLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (submissionLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    submissionLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissionLog.set(ip, recent);
  // Keep the map from growing unbounded
  if (submissionLog.size > 1000) {
    for (const [key, times] of submissionLog) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        submissionLog.delete(key);
      }
    }
  }
  return false;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, website } = req.body || {};

  // Honeypot: the visible form never fills this field. Bots that do get a
  // fake success so they don't retry.
  if (website) {
    return res.status(200).json({ success: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return res.status(400).json({ error: 'Submission is too long.' });
  }

  // Light email sanity check; Postmark does the real validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const ip =
    req.headers['x-nf-client-connection-ip'] ||
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many messages — please try again later.' });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  try {
    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': process.env.POSTMARK_SERVER_TOKEN,
      },
      body: JSON.stringify({
        From: 'support@hypertools.dev',
        To: process.env.CONTACT_TO_EMAIL,
        ReplyTo: email,
        Subject: `New message from ${name.replace(/[\r\n]/g, ' ')} — elliotkoh.dev`,
        HtmlBody: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #080807;">New Contact Form Submission</h2>
            <hr style="border: none; border-top: 1px solid #e5e7eb;" />
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: #f9fafb; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${safeMessage}</div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin-top: 24px;" />
            <p style="color: #9ca3af; font-size: 12px;">Sent from elliotkoh.dev contact form</p>
          </div>
        `,
        TextBody: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        MessageStream: 'outbound',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Postmark error:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }

    // Send confirmation email to the person who reached out
    const firstName = escapeHtml(name.split(' ')[0].toLowerCase());
    await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': process.env.POSTMARK_SERVER_TOKEN,
      },
      body: JSON.stringify({
        From: 'Elliot Koh <support@hypertools.dev>',
        To: email,
        Subject: `hey ${name.split(' ')[0].toLowerCase().replace(/[\r\n]/g, ' ')}, got your message!`,
        HtmlBody: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <p>hey ${firstName},</p>
            <p>thanks so much for reaching out! i really appreciate you taking the time to message me. i've got your note and i'll get back to you properly within 12 hours or so.</p>
            <p>in the meantime, feel free to submit another form if you think of anything else you'd like to add.</p>
            <p>talk soon,<br/>elliot</p>
          </div>
        `,
        TextBody: `hey ${name.split(' ')[0].toLowerCase()},\n\nthanks so much for reaching out — i really appreciate you taking the time to message me. i've got your note and i'll get back to you properly within 12 hours or so.\n\nin the meantime, feel free to reply to this email if you think of anything else you'd like to add.\n\ntalk soon,\nelliot`,
        MessageStream: 'outbound',
      }),
    }).catch((err) => {
      // Don't fail the whole request if the confirmation email fails
      console.error('Confirmation email error:', err);
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
