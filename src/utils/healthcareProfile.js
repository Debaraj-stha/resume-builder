import { z } from "zod";

const optionalDate = z.string().max(10).optional().or(z.literal(""));
export const healthcareProfileSchema = z.object({
  profession: z.string().min(1, "Select your profession"),
  specialty: z.string().min(1, "Select or enter your speciality"),
  experienceLevel: z.string().min(1, "Select your experience level"),
  targetCountry: z.string().min(1, "Select a target country"),
  targetPosition: z.string().trim().min(2, "Enter the target position").max(100),
  cvType: z.string().min(1, "Select a CV type"),
  licence: z.object({
    type: z.string().max(100).optional(), authority: z.string().max(100).optional(),
    status: z.string().max(50).optional(), eligibilityStatus: z.string().max(50).optional(),
    dataflowStatus: z.string().max(50).optional(), examinationStatus: z.string().max(50).optional(),
    issueDate: optionalDate, expiryDate: optionalDate, verificationStatus: z.string().max(50).optional(),
  }),
  jobDescription: z.string().max(20000).optional(),
});

export const safeProfile = value => healthcareProfileSchema.safeParse(value);
export const containsSensitiveIdentifier = value => /\b(?:\d[ -]?){12}\b|passport\s*(?:no|number)?\s*[:#-]?\s*[a-z0-9]{6,}/i.test(value || "");
