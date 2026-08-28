import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export async function renderPdfToCanvas(pdfBytes: Uint8Array, canvas: HTMLCanvasElement) {
  // pdf.js transfers (detaches) the buffer of the array passed in `data` to its worker,
  // so we hand it a copy — the caller's original bytes (e.g. kept around for download) stay valid.
  const loadingTask = pdfjsLib.getDocument({ data: pdfBytes.slice() });
  const doc = await loadingTask.promise;
  const page = await doc.getPage(1);
  const scale = 1.6;
  const viewport = page.getViewport({ scale });

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: ctx, viewport }).promise;
  doc.destroy();
}
