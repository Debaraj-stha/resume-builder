/* global process */
import test from "node:test";
import assert from "node:assert/strict";
import { isTestingAccessEnabled } from "../api/_testing-access.js";

test("testing access is closed by default for production", () => {
  const previous = process.env.RESUAI_TESTING_ACCESS;
  delete process.env.RESUAI_TESTING_ACCESS;
  assert.equal(isTestingAccessEnabled(), false);
  if (previous !== undefined) process.env.RESUAI_TESTING_ACCESS = previous;
});

test("testing access can only be enabled explicitly", () => {
  const previous = process.env.RESUAI_TESTING_ACCESS;
  process.env.RESUAI_TESTING_ACCESS = "true";
  assert.equal(isTestingAccessEnabled(), true);
  if (previous === undefined) delete process.env.RESUAI_TESTING_ACCESS;
  else process.env.RESUAI_TESTING_ACCESS = previous;
});
