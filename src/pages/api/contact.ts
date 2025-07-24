// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";

const resend = new Resend(process.env.RESEND_API_KEY);

const redis = new Redis(process.env.REDIS_URL!); // e.g., from Upstash or your own Redis server

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "contact-page",
  points: 3, // max 3 requests
  duration: 600, // per 10 minutes
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { firstName, lastName, email, message, recaptchaToken } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    await rateLimiter.consume(ip as string);
  } catch {
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
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Email sending failed." });
  }
}