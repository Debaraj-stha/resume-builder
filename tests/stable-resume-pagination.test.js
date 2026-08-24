import test from "node:test";
import assert from "node:assert/strict";
import { packBlocksByHeight } from "../src/utils/stableResumePagination.js";

test("stable CV pagination fills the first page before continuing without losing blocks", () => {
  const heights = [140, 180, 160, 220, 210, 190];
  const pages = packBlocksByHeight(heights, 520, 900);
  assert.deepEqual(pages, [[0, 1, 2], [3, 4, 5]]);
  assert.deepEqual(pages.flat(), heights.map((_, index) => index));
});
