"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { resend } from "@/lib/email";
import { contactLimiter } from "@/lib/rate-limit";
import { env } from "@/env";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be 254 characters or fewer"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be 5000 characters or fewer"),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  emailDelivered?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

async function verifyTurnstile(token: string): Promise<boolean> {
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    }
  );
  const data = await res.json();
  return data.success === true;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Layer 1: Honeypot — silently "succeed" to avoid revealing detection
  if (formData.get("website")) {
    return { success: true, message: "Thank you for your message!", emailDelivered: true };
  }

  // Layer 2: Turnstile verification
  const token = formData.get("cf-turnstile-response") as string;
  if (!token || !(await verifyTurnstile(token))) {
    return {
      success: false,
      message: "Verification failed. Please try again.",
    };
  }

  // Layer 3: Rate limiting by IP
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
  const { success: withinLimit } = await contactLimiter.limit(ip);
  if (!withinLimit) {
    return {
      success: false,
      message: "Too many messages. Please try again later.",
    };
  }

  // Validate input
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = parsed.data;

  try {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const { error } = await resend.emails.send({
      from: "Portfolio <noreply@yourdomain.com>",
      to: ["ahmadyasser03@outlook.com"],
      replyTo: email,
      subject: `Contact from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This message was sent from your portfolio website.</p>
        </div>
      `,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    if (error) throw new Error(error.message);

    return {
      success: true,
      emailDelivered: true,
      message: "Thank you for your message! I will get back to you soon.",
    };
  } catch {
    console.error("Resend email failed");
    return {
      success: false,
      emailDelivered: false,
      message:
        "Unable to send your message. Please email me directly at ahmadyasser03@outlook.com.",
    };
  }
}
