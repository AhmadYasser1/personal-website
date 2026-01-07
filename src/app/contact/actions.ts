"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormState = {
  success: boolean;
  message: string;
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

  // In a real application, you would:
  // 1. Send an email using Resend, SendGrid, or similar
  // 2. Store the message in a database
  // 3. Send a notification

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For now, we'll just log and return success
  console.log("Contact form submission:", validatedFields.data);

  return {
    success: true,
    message: "Thank you for your message! I will get back to you soon.",
  };
}

