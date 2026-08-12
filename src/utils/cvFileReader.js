const MAX_FILE_SIZE = 8 * 1024 * 1024;
const MAX_TEXT_LENGTH = 50000;

const cleanText = (value) => value
  .replace(/\u0000/g, "")
  .replace(/[ \t]+\n/g, "\n")
  .replace(/\n{4,}/g, "\n\n\n")
  .trim()
  .slice(0, MAX_TEXT_LENGTH);

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
      pages.push(content.items.map((item) => item.str).join(" "));
    }
    text = pages.join("\n\n");
  } else if (extension === "docx" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const mammoth = await import("mammoth/mammoth.browser");
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    text = result.value;
  } else if (extension === "txt" || file.type === "text/plain") {
    text = await file.text();
  } else {
    throw new Error("Upload a PDF, DOCX or TXT CV.");
  }

  const cleaned = cleanText(text);
  if (cleaned.length < 120) throw new Error("We could not read enough text from this CV. Try a text-based PDF or DOCX file.");
  return cleaned;
}
