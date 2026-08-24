export const professions = [
  "Nurse",
  "Doctor",
  "Pharmacist",
  "Pharmacy Technician",
  "Physiotherapist",
  "Medical Laboratory Professional",
  "Radiographer",
];

export const destinations = {
  UAE: { regulator: "DHA, DOH or MOHAP", verification: "Primary-source verification / DataFlow where required", language: "Employer and regulator requirements vary", cv: "2–3 page achievement-led healthcare CV", steps: ["Confirm the correct authority for the emirate and role", "Check professional title and experience eligibility", "Prepare verification-ready education and employment evidence"] },
  "Saudi Arabia": { regulator: "Saudi Commission for Health Specialties (SCFHS)", verification: "Professional classification, registration and verification requirements", language: "Employer requirements vary", cv: "2–3 page role-targeted healthcare CV", steps: ["Confirm SCFHS classification for the intended role", "Review verification and exam requirements", "Prepare authenticated qualification and experience evidence"] },
  Qatar: { regulator: "Department of Healthcare Professions (DHP)", verification: "Primary-source verification requirements may apply", language: "Employer and role requirements vary", cv: "2–3 page healthcare CV with licence status", steps: ["Confirm DHP scope and eligibility", "Review verification and examination requirements", "Prepare complete employment and licensing history"] },
  Oman: { regulator: "Oman Ministry of Health and relevant professional authority", verification: "Verification and examination requirements vary by profession", language: "Employer requirements vary", cv: "2–3 page chronological healthcare CV", steps: ["Confirm the applicable authority", "Check exam and experience criteria", "Prepare verified education and employment records"] },
  Bahrain: { regulator: "National Health Regulatory Authority (NHRA)", verification: "Verification requirements may apply", language: "Employer requirements vary", cv: "2–3 page healthcare CV", steps: ["Review NHRA professional requirements", "Confirm examination or exemption route", "Prepare licensing and good-standing evidence"] },
  Kuwait: { regulator: "Kuwait Ministry of Health", verification: "Employer, verification and examination processes may apply", language: "Employer requirements vary", cv: "2–3 page healthcare CV", steps: ["Confirm profession-specific MOH route", "Check employer sponsorship requirements", "Prepare qualification and experience documents"] },
  UK: { regulator: "Profession-specific regulator such as NMC, GMC or GPhC", verification: "Regulator registration and identity checks", language: "Approved English-language evidence may be required", cv: "2-page UK-style healthcare CV", steps: ["Identify the correct statutory regulator", "Check English-language and registration routes", "Align the CV to NHS or employer person specifications"] },
  Ireland: { regulator: "Profession-specific regulator such as NMBI, Medical Council or PSI", verification: "Recognition and registration checks", language: "Approved language evidence may be required", cv: "2-page competency-led healthcare CV", steps: ["Confirm qualification-recognition route", "Review registration and language requirements", "Prepare certified education and employment documents"] },
  Australia: { regulator: "AHPRA and the relevant National Board", verification: "Registration, identity and qualification assessment", language: "English-language standard may apply", cv: "2–4 page evidence-led healthcare CV", steps: ["Identify the applicable National Board pathway", "Check registration and English-language standards", "Prepare a complete practice-history record"] },
};

export const credentialOptions = [
  { id: "qualification", label: "Degree or professional qualification", weight: 18, essential: true },
  { id: "registration", label: "Current home-country registration/licence", weight: 16, essential: true },
  { id: "experience", label: "Signed experience certificates", weight: 14, essential: true },
  { id: "goodStanding", label: "Good Standing certificate", weight: 10 },
  { id: "passport", label: "Valid passport and matching identity details", weight: 8, essential: true },
  { id: "transcripts", label: "Academic transcripts / marksheets", weight: 8 },
  { id: "language", label: "Required language-test evidence", weight: 8 },
  { id: "lifeSupport", label: "Relevant BLS / ACLS or clinical certifications", weight: 6 },
  { id: "verification", label: "Primary-source verification completed or started", weight: 7 },
  { id: "cv", label: "Destination-ready healthcare CV", weight: 5 },
];

const rolePriorities = {
  Nurse: ["Current registration and clinical recency", "Ward/specialty competencies", "BLS and role-relevant certifications"],
  Doctor: ["Registration and verified postgraduate qualifications", "Clinical scope and procedure evidence", "Good Standing and continuous practice history"],
  Pharmacist: ["Pharmacy registration and qualification evidence", "Dispensing, safety and inventory achievements", "Good Standing and practice recency"],
  "Pharmacy Technician": ["Recognised technician qualification", "Dispensing-support and inventory competencies", "Accurate role title and experience evidence"],
  Physiotherapist: ["Registration and clinical qualification", "Caseload, rehabilitation and outcome evidence", "Practice recency and specialty skills"],
  "Medical Laboratory Professional": ["Laboratory qualification and registration", "Quality-control and analyser experience", "Biosafety and accreditation exposure"],
  Radiographer: ["Registration and radiography qualification", "Modality-specific competency evidence", "Radiation safety and equipment experience"],
};

export function calculateReadiness({ profession, destination, experienceYears, credentials }) {
  const country = destinations[destination];
  const selected = new Set(credentials);
  const documentScore = credentialOptions.reduce((score, item) => score + (selected.has(item.id) ? item.weight : 0), 0);
  const experienceScore = Math.min(10, Math.max(0, Number(experienceYears) || 0) * 2);
  const score = Math.min(100, documentScore + experienceScore);
  const missing = credentialOptions.filter(item => !selected.has(item.id));
  const status = score >= 80 ? "Application ready" : score >= 55 ? "Nearly ready" : "Foundation stage";
  return {
    score,
    status,
    country,
    missing,
    completed: credentialOptions.filter(item => selected.has(item.id)),
    priorities: rolePriorities[profession] || rolePriorities.Nurse,
    blockers: missing.filter(item => item.essential).map(item => item.label),
  };
}
