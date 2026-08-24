// Keep long roles from becoming one indivisible block during A4 pagination.
// The page grouper can then place the first part in the space that remains on
// the current page instead of moving the complete employment history forward.
export const splitExperienceForPagination = (experience, maxCharacters = 520, maxItems = 4) => {
  const achievements = Array.isArray(experience?.achievements)
    ? experience.achievements.filter((item) => item?.value?.trim())
    : [];
  if (!achievements.length) return [{ ...experience, achievements: [] }];

  const chunks = [];
  let current = [];
  let characters = 0;
  achievements.forEach((item) => {
    const itemLength = item.value.trim().length;
    if (current.length && (current.length >= maxItems || characters + itemLength > maxCharacters)) {
      chunks.push(current);
      current = [];
      characters = 0;
    }
    current.push(item);
    characters += itemLength;
  });
  if (current.length) chunks.push(current);
  return chunks.map((items) => ({ ...experience, achievements: items }));
};
