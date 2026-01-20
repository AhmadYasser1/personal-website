"use server";

import { z } from "zod";
import { Resend } from "resend";

// Check if API key is configured
const resendApiKey = process.env.RESEND_API_KEY;

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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

export async function submitContactForm(
  prevState: ContactFormState,
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

  // If no API key is configured, provide fallback behavior
  if (!resendApiKey) {
    console.log("Email service not configured - providing fallback");
    
    // Log the contact attempt for manual follow-up
    console.log("Contact form submission:", {
      name,
      email,
      message: message.substring(0, 100) + "...",
      timestamp: new Date().toISOString(),
    });
    
    return {
      success: true,
      emailDelivered: false,
      message: "Thank you for your message! I'll get back to you soon. Note: Email service is currently unavailable - your message has been logged and I'll respond manually.",
    };
  }

  try {
    const resend = new Resend(resendApiKey);
    
    // Use Resend's verified domain to avoid verification issues
    const fromEmail = "onboarding@resend.dev"; // Resend's verified domain
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: ["ahmadyasser03@outlook.com"],
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
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
      console.error("Resend error details:", {
        message: error.message,
        name: error.name,
        statusCode: error.statusCode,
      });
      
      // Fallback to logging if email fails
      console.log("Email failed - logging contact submission:", {
        name,
        email,
        message: message.substring(0, 100) + "...",
        error: error.message,
        timestamp: new Date().toISOString(),
      });
      
      return {
        success: true,
        emailDelivered: false,
        message: "Thank you for your message! I'll get back to you soon. Note: There was an issue with email delivery - your message has been logged and I'll respond manually.",
      };
    }

    console.log("Email sent successfully:", data);
    return {
      success: true,
      emailDelivered: true,
      message: "Thank you for your message! I will get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form error:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    // Even on error, log the submission and return success to user
    console.log("Contact submission logged due to error:", {
      name,
      email,
      message: message.substring(0, 100) + "...",
      timestamp: new Date().toISOString(),
    });
    
    return {
      success: true,
      emailDelivered: false,
      message: "Thank you for your message! I'll get back to you soon. Note: A technical error occurred - your message has been logged and I'll respond manually.",
    };
  }
}
