/**
 * Shared contact-form validation — runs client-side (instant feedback)
 * and again server-side (never trust the browser).
 */

export interface ContactFields {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  const name = fields.name.trim();
  if (!name) errors.name = "Please tell me your name.";
  else if (name.length < 2) errors.name = "Name is too short.";
  else if (name.length > 80) errors.name = "Name is too long.";

  const email = fields.email.trim();
  if (!email) errors.email = "Please add your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "That doesn't look like a valid email.";
  else if (email.length > 254) errors.email = "Email is too long.";

  const message = fields.message.trim();
  if (!message) errors.message = "Please write a message.";
  else if (message.length < 10) errors.message = "A little more detail, please (10+ characters).";
  else if (message.length > 2000) errors.message = "Message is too long (max 2000 characters).";

  return errors;
}
