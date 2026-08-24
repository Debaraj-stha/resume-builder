import assert from "node:assert/strict";
import test from "node:test";
import { professionalTemplates } from "../src/static-data/professional-templates.js";
import { pdfPageToText } from "../src/utils/cvFileReader.js";

test("PDF extraction preserves visual rows and reading order", () => {
  const text = pdfPageToText([
    { str: "2018-Present", transform: [1, 0, 0, 1, 320, 650] },
    { str: "EXPERIENCE", transform: [1, 0, 0, 1, 40, 700] },
    { str: "Consultant", transform: [1, 0, 0, 1, 40, 650] },
    { str: "EDUCATION", transform: [1, 0, 0, 1, 40, 600] },
  ]);
  assert.equal(text, "EXPERIENCE\nConsultant 2018-Present\nEDUCATION");
});

test("medical users have multiple genuinely different CV formats", () => {
  const medical = professionalTemplates.filter((template) => template.track === "medical");
  assert.ok(medical.length >= 4);
  assert.ok(new Set(medical.map((template) => template.layoutType)).size >= 3);
});
