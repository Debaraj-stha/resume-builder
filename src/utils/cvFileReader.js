const MAX_FILE_SIZE = 8 * 1024 * 1024;
const MAX_TEXT_LENGTH = 50000;

const cleanText = (value) => value
  .replaceAll(String.fromCharCode(0), "")
  .replace(/[ \t]+\n/g, "\n")
  .replace(/\n{4,}/g, "\n\n\n")
  .trim()
  .slice(0, MAX_TEXT_LENGTH);

export const pdfPageToText = (items) => {
  const rows = [];
  const tolerance = 3;
  for (const item of items) {
    const value = String(item.str || "").trim();
    if (!value) continue;
    const x = Number(item.transform?.[4] || 0);
    const y = Number(item.transform?.[5] || 0);
    let row = rows.find((candidate) => Math.abs(candidate.y - y) <= tolerance);
    if (!row) {
      row = { y, fragments: [] };
      rows.push(row);
    }
    row.fragments.push({ x, value });
  }
  return rows
    .sort((a, b) => b.y - a.y)
    .map((row) => row.fragments.sort((a, b) => a.x - b.x).map((item) => item.value).join(" "))
    .join("\n");
};

export async function readCVFile(file) {
  if (!file) throw new Error("Choose a CV file first.");
  if (file.size > MAX_FILE_SIZE) throw new Error("Please upload a file smaller than 8 MB.");

  const extension = file.name.split(".").pop()?.toLowerCase();
  let text = "";

  if (extension === "pdf" || file.type === "application/pdf") {
    const [pdfjs, pdfWorker] = await Promise.all([
      import("pdfjs-dist/legacy/build/pdf.mjs"),
      import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url"),
    ]);
    pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker.default;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjs.getDocument({ data: bytes }).promise;
    const pages = [];
    for (let pageNumber = 1; pageNumber <= Math.min(pdf.numPages, 15); pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(pdfPageToText(content.items));
    }
    text = pages.join("\n\n");
  } else if (extension === "docx" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const mammoth = await import("mammoth/mammoth.browser");
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    text = result.value;
  } else {
    throw new Error("Upload a PDF or DOCX CV.");
  }

  const cleaned = cleanText(text);
  if (cleaned.length < 120) throw new Error("We could not read enough text from this CV. Try a text-based PDF or DOCX file.");
  return cleaned;
}
