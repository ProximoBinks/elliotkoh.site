export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

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
        Subject: `New message from ${name} — elliotkoh.dev`,
        HtmlBody: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #080807;">New Contact Form Submission</h2>
            <hr style="border: none; border-top: 1px solid #e5e7eb;" />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: #f9fafb; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
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
    const firstName = name.split(' ')[0].toLowerCase();
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
        Subject: `hey ${firstName}, got your message!`,
        HtmlBody: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <p>hey ${firstName},</p>
            <p>thanks so much for reaching out! i really appreciate you taking the time to message me. i've got your note and i'll get back to you properly within 12 hours or so.</p>
            <p>in the meantime, feel free to submit another form if you think of anything else you'd like to add.</p>
            <p>talk soon,<br/>elliot</p>
          </div>
        `,
        TextBody: `hey ${firstName},\n\nthanks so much for reaching out — i really appreciate you taking the time to message me. i've got your note and i'll get back to you properly within 12 hours or so.\n\nin the meantime, feel free to reply to this email if you think of anything else you'd like to add.\n\ntalk soon,\nelliot`,
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
