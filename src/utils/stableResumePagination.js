export const packBlocksByHeight = (heights, firstPageHeight, subsequentPageHeight) => {
  const pages = [];
  let page = [];
  let used = 0;
  let capacity = firstPageHeight;

  heights.forEach((rawHeight, index) => {
    const height = Math.max(0, Math.ceil(Number(rawHeight) || 0));
    if (page.length && used + height > capacity) {
      pages.push(page);
      page = [];
      used = 0;
      capacity = subsequentPageHeight;
    }
    page.push(index);
    used += height;
  });
  if (page.length) pages.push(page);
  return pages;
};
