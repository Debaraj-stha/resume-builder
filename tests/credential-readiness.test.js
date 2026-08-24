import test from "node:test";
import assert from "node:assert/strict";
import { calculateReadiness, credentialOptions } from "../src/data/credentialReadiness.js";

test("credential readiness rewards verified evidence and experience", () => {
  const empty = calculateReadiness({ profession: "Nurse", destination: "UAE", experienceYears: 0, credentials: [] });
  const ready = calculateReadiness({ profession: "Nurse", destination: "UAE", experienceYears: 5, credentials: credentialOptions.map(item => item.id) });
  assert.equal(empty.score, 0);
  assert.equal(ready.score, 100);
  assert.equal(ready.blockers.length, 0);
  assert.ok(empty.blockers.includes("Degree or professional qualification"));
});

test("destination report returns the selected regulatory route", () => {
  const report = calculateReadiness({ profession: "Pharmacist", destination: "UK", experienceYears: 2, credentials: ["qualification", "registration"] });
  assert.match(report.country.regulator, /GPhC/);
  assert.equal(report.priorities.length, 3);
  assert.equal(report.status, "Foundation stage");
});
