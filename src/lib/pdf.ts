type PdfParseResult = { text: string };
type PdfParseFn = (buffer: Buffer) => Promise<PdfParseResult>;

function resolvePdfParse(mod: any): PdfParseFn {
  if (typeof mod === "function") return mod;
  if (typeof mod?.default === "function") return mod.default;
  if (typeof mod?.default?.default === "function") return mod.default.default;
  throw new Error("pdf-parse export not found");
}

export async function extractTextFromPDF(data: Uint8Array) {
  const mod = await import("pdf-parse");
  const pdfParse = resolvePdfParse(mod);

  const result = await pdfParse(Buffer.from(data));
  return result.text;
}
