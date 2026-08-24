import assert from "node:assert/strict";
import test from "node:test";
import { buildSourcePreservingDraft, parseProviderJson } from "../api/improve-cv.js";

test("provider JSON parser accepts strict JSON", () => {
  assert.deepEqual(parseProviderJson('{"summary":"complete"}'), { summary: "complete" });
});

test("provider JSON parser recovers fenced and prefixed JSON", () => {
  assert.deepEqual(parseProviderJson('Here is the result:\n```json\n{"summary":"complete"}\n```'), { summary: "complete" });
});

test("source preserving fallback returns usable CV data without an AI provider", () => {
  const draft = buildSourcePreservingDraft("Dr Anjali Kumar\nGeneral Practitioner\nanjali@example.com\n+971 50 123 4567\nSUMMARY\nDoctor with emergency care experience.\nEXPERIENCE\nMedical Officer, City Hospital\nManaged emergency presentations.\nEDUCATION\nMBBS, State University\nCERTIFICATIONS\nBLS");
  assert.equal(draft.personalDetails.name, "Dr Anjali Kumar");
  assert.equal(draft.personalDetails.email, "anjali@example.com");
  assert.match(draft.summary, /emergency care/i);
  assert.ok(draft.experiences.length);
  assert.ok(draft.educations.length);
  assert.ok(draft.certificates.length);
});
