import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (no Redis needed)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 600 * 1000; // 10 minutes
  const maxRequests = 5; // 5 requests per 10 minutes

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  const record = rateLimitMap.get(ip)!;

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count++;
  return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { firstName, lastName, email, message, recaptchaToken } = req.body;
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || 'unknown';

  // Rate limiting
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  // Verify reCAPTCHA
  const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
  });

  const captchaData = await captchaRes.json();
  if (!captchaData.success) {
    return res.status(400).json({ error: "reCAPTCHA failed" });
  }

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    console.log('Attempting to send email...');
    console.log('From:', email);
    console.log('To:', process.env.RESEND_TO_EMAIL);
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);

    const emailResult = await resend.emails.send({
      from: "Oliver Do Personal Website <onboarding@resend.dev>", // Custom name with verified domain
      replyTo: email,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br/>")}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Sent at ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    console.log('Email sent successfully:', emailResult);
    return res.status(200).json({ success: true, emailId: emailResult.data?.id });
  } catch (err) {
    console.error('Email sending failed - Full error:', err);
    console.error('Error details:', JSON.stringify(err, null, 2));
    return res.status(500).json({ 
      error: "Email sending failed.", 
      details: err instanceof Error ? err.message : 'Unknown error' 
    });
  }
}