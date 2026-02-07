"use server";

import { z } from "zod";
import { Resend } from "resend";

// Check if API key is configured
const resendApiKey = process.env.RESEND_API_KEY;

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(320, "Email must be 320 characters or fewer"),
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

const fallbackMessage =
  "Contact form is temporarily unavailable. Please email ahmadyasser03@outlook.com directly.";

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
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const validatedFields = contactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;

  if (!resendApiKey) {
    return {
      success: false,
      emailDelivered: false,
      message: fallbackMessage,
    };
  }

  try {
    const resend = new Resend(resendApiKey);
    const fromEmail = "onboarding@resend.dev"; // Resend's verified domain
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: ["ahmadyasser03@outlook.com"],
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
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
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from your portfolio website.
      `,
    });

    if (error) {
      console.error("Resend delivery failed:", {
        name: error.name,
        statusCode: error.statusCode,
      });

      return {
        success: false,
        emailDelivered: false,
        message: fallbackMessage,
      };
    }

    if (!data) {
      return {
        success: false,
        emailDelivered: false,
        message: fallbackMessage,
      };
    }

    return {
      success: true,
      emailDelivered: true,
      message: "Thank you for your message! I will get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form submission failed:", {
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      success: false,
      emailDelivered: false,
      message: fallbackMessage,
    };
  }
}
