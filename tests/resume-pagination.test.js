import test from "node:test";
import assert from "node:assert/strict";
import { splitExperienceForPagination } from "../src/utils/resumePagination.js";

test("long experience histories are split into page-friendly blocks without losing bullets", () => {
  const achievements = Array.from({ length: 11 }, (_, index) => ({
    value: `Clinical responsibility ${index + 1} with documented patient-care detail`,
  }));
  const experience = { position: "Medical Officer", company_name: "Hospital", achievements };
  const parts = splitExperienceForPagination(experience, 260, 4);

  assert.ok(parts.length > 1);
  assert.deepEqual(parts.flatMap((part) => part.achievements), achievements);
  assert.ok(parts.every((part) => part.achievements.length <= 4));
  assert.ok(parts.every((part) => part.position === experience.position));
});
