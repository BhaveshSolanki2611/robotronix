import "server-only";

import { z } from "zod";

const requiredText = (field: string, maxLength: number) =>
  z
    .string()
    .trim()
    .min(1, `${field} is required.`)
    .max(maxLength, `${field} must be ${maxLength} characters or less.`);

const optionalText = (maxLength: number) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().max(maxLength).optional(),
  );

const email = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.")
  .max(254, "Email must be 254 characters or less.");

export const contactSubmissionSchema = z.object({
  name: requiredText("Name", 120),
  email,
  company: optionalText(160),
  phone: optionalText(40),
  service: optionalText(80),
  message: requiredText("Message", 2_000),
});

export const demoRequestSchema = z.object({
  name: requiredText("Name", 120),
  email,
  company: requiredText("Company", 160),
  phone: optionalText(40),
  demoType: requiredText("Demo type", 80),
  date: optionalText(40),
  notes: optionalText(2_000),
});

export const careerApplicationSchema = z.object({
  name: requiredText("Name", 120),
  email,
  phone: optionalText(40),
  position: requiredText("Position", 160),
  coverNote: optionalText(2_000),
});

export const newsletterSubscriptionSchema = z.object({
  email,
});

export function formatValidationError(error: z.ZodError) {
  return error.issues[0]?.message ?? "Invalid request body.";
}
