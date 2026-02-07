"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

interface ContactFormProps {
  onSendAnother: () => void;
}

export function ContactForm({ onSendAnother }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          state.emailDelivered ? 'bg-green-100' : 'bg-yellow-100'
        }`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={state.emailDelivered ? 'text-green-600' : 'text-yellow-600'}
          >
            {state.emailDelivered ? (
              <>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </>
            ) : (
              <>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </>
            )}
          </svg>
        </div>
        <h3 className="font-semibold text-lg mb-2">
          {state.emailDelivered ? 'Message Sent Successfully!' : 'Message Received!'}
        </h3>
        <p className="text-muted-foreground mb-6">{state.message}</p>
        {!state.emailDelivered && (
          <p className="text-sm text-yellow-600 mb-4">
            ⚠️ Email delivery failed - your message has been logged for manual follow-up
          </p>
        )}
        <Button onClick={onSendAnother} variant="outline">
          Send another message?
        </Button>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Your name"
          disabled={isPending}
        />
        {state.errors?.name && (
          <p className="text-sm text-destructive">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          disabled={isPending}
        />
        {state.errors?.email && (
          <p className="text-sm text-destructive">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message..."
          rows={5}
          disabled={isPending}
        />
        {state.errors?.message && (
          <p className="text-sm text-destructive">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
