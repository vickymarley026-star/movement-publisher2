import React, { useState, useMemo, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import CoverDiagram from "./CoverDiagram";

const trimSizesIn = [
  { label: '5" x 8"', w: 5, h: 8 },
  { label: '5.06" x 7.81"', w: 5.06, h: 7.81 },
  { label: '5.25" x 8"', w: 5.25, h: 8 },
  { label: '5.5" x 8.5"', w: 5.5, h: 8.5 },
  { label: '6" x 9"', w: 6, h: 9 },
  { label: '6.14" x 9.21"', w: 6.14, h: 9.21 },
  { label: '6.69" x 9.61"', w: 6.69, h: 9.61 },
  { label: '7" x 10"', w: 7, h: 10 },
  { label: '7.44" x 9.69"', w: 7.44, h: 9.69 },
  { label: '7.5" x 9.25"', w: 7.5, h: 9.25 },
  { label: '8" x 10"', w: 8, h: 10 },
  { label: '8.25" x 6"', w: 8.25, h: 6 },
  { label: '8.25" x 8.75"', w: 8.25, h: 8.75 },
  { label: '8.5" x 8.5"', w: 8.5, h: 8.5 },
  { label: '8.5" x 11"', w: 8.5, h: 11 },
];

const trimSizesMm = [
  { label: '127 x 203 mm', w: 127, h: 203 },
  { label: '129 x 198 mm', w: 129, h: 198 },
  { label: '133 x 203 mm', w: 133, h: 203 },
  { label: '140 x 216 mm', w: 140, h: 216 },
  { label: '152 x 229 mm', w: 152, h: 229 },
  { label: '156 x 234 mm', w: 156, h: 234 },
  { label: '170 x 244 mm', w: 170, h: 244 },
  { label: '178 x 254 mm', w: 178, h: 254 },
  { label: '189 x 246 mm', w: 189, h: 246 },
  { label: '191 x 235 mm', w: 191, h: 235 },
  { label: '203 x 254 mm', w: 203, h: 254 },
  { label: '210 x 152 mm', w: 210, h: 152 },
  { label: '210 x 222 mm', w: 210, h: 222 },
  { label: '216 x 216 mm', w: 216, h: 216 },
  { label: '216 x 280 mm', w: 216, h: 280 },
];

const paperThickness = {
  "white-bw": 0.002252,
  "cream-bw": 0.0025,
  "groundwood-bw": 0.00235,
  "white-color": 0.002347,
  "premium-color": 0.002347,
};

const BLEED = 0.125;
const MARGIN = 0.125;
const SPINE_MARGIN = 0.062;
const BARCODE_W = 0.25;
const BARCODE_H_PB = 0.25;
const BARCODE_H_HC = 0.375;
const WRAP = 0.591;
const HINGE = 0.394;
const BOARD = 0.071;
const HC_SPINE_EXTRA = 0.189;
const MM_PER_INCH = 25.4;

const inputCls = "flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500";
const labelCls = "text-sm font-medium text-slate-700 mb-1.5 block";

export default function KindleCoverCalculator() {
  const [binding, setBinding] = useState("paperback");
  const [interiorType, setInteriorType] = useState("black-white");
  const [paperType, setPaperType] = useState("white");
  const [readingDir, setReadingDir] = useState("ltr");
  const [units, setUnits] = useState("inches");
  const [trimIdx, setTrimIdx] = useState(4);
  const [pages, setPages] = useState(600);
  const [calculated, setCalculated] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const resultRef = useRef(null);

  const trimSizes = units === "inches" ? trimSizesIn : trimSizesMm;
  const trim = trimSizes[trimIdx];
  const isMm = units === "millimeters";
  const factor = isMm ? MM_PER_INCH : 1;
  const isHardcover = binding === "hardcover";

  const paperKey = interiorType === "black-white"
    ? `${paperType}-bw`
    : interiorType === "standard-color" ? "white-color" : "premium-color";

  const dims = useMemo(() => {
    const thickness = paperThickness[paperKey];
    const tW = trim.w / factor;
    const tH = trim.h / factor;

    const spineW = isHardcover
      ? Math.max(0, pages) * thickness + HC_SPINE_EXTRA
      : Math.max(0, pages) * thickness;

    let fullW, fullH, frontW, frontH;

    if (isHardcover) {
      fullW = spineW + 2 * (tW + BLEED + WRAP + BOARD);
      fullH = tH + 2 * (BLEED + WRAP);
      frontW = tW + BLEED + BOARD;
      frontH = fullH - 2 * WRAP;
    } else {
      fullW = spineW + 2 * tW + 2 * BLEED;
      fullH = tH + 2 * BLEED;
      frontW = tW;
      frontH = tH;
    }

    const safeW = tW - MARGIN;
    const safeH = tH - 2 * MARGIN;
    const spineSafeW = Math.max(0, spineW - 2 * SPINE_MARGIN);
    const spineSafeH = (isHardcover ? frontH : tH) - 2 * MARGIN;
    const barcodeH = isHardcover ? BARCODE_H_HC : BARCODE_H_PB;

    const conv = (v) => v * factor;

    return {
      full: { w: conv(fullW), h: conv(fullH) },
      front: { w: conv(frontW), h: conv(frontH) },
      trim: { w: conv(tW), h: conv(tH) },
      spine: { w: conv(spineW), h: conv(isHardcover ? frontH : tH) },
      bleed: { w: conv(BLEED), h: conv(BLEED) },
      margin: { w: conv(MARGIN), h: conv(MARGIN) },
      safe: { w: conv(safeW), h: conv(safeH) },
      spineSafe: { w: conv(spineSafeW), h: conv(spineSafeH) },
      spineMargin: { w: conv(SPINE_MARGIN), h: conv(SPINE_MARGIN) },
      barcode: { w: conv(BARCODE_W), h: conv(barcodeH) },
      wrap: { w: conv(isHardcover ? WRAP : 0), h: conv(isHardcover ? WRAP : 0) },
      hinge: { w: conv(isHardcover ? HINGE : 0), h: conv(isHardcover ? fullH : 0) },
      isHardcover,
    };
  }, [binding, paperKey, pages, trim, factor, isHardcover]);

  const fmt = (v) => (isMm ? v.toFixed(1) : v.toFixed(3));
  const u = isMm ? "mm" : "in";

  const rows = isHardcover ? [
    { n: 1, label: "Full Cover", ...dims.full },
    { n: 2, label: "Front Cover", ...dims.front },
    { n: 3, label: "Margin", ...dims.margin },
    { n: 4, label: "Wrap", ...dims.wrap },
    { n: 5, label: "Hinge", ...dims.hinge },
    { n: 6, label: "Spine", ...dims.spine },
    { n: 7, label: "Spine Safe Area", ...dims.spineSafe },
    { n: 8, label: "Spine Margin", ...dims.spineMargin },
    { n: 9, label: "Barcode Margin", ...dims.barcode },
  ] : [
    { n: 1, label: "Full Cover", ...dims.full },
    { n: 2, label: "Front Cover", ...dims.front },
    { n: 3, label: "Safe Area", ...dims.safe },
    { n: 4, label: "Bleed", ...dims.bleed },
    { n: 5, label: "Margin", ...dims.margin },
    { n: 6, label: "Spine", ...dims.spine },
    { n: 7, label: "Spine Safe Area", ...dims.spineSafe },
    { n: 8, label: "Spine Margin", ...dims.spineMargin },
    { n: 9, label: "Barcode Margin", ...dims.barcode },
  ];

  const leftRows = rows.slice(0, 5);
  const rightRows = rows.slice(5);

  const handleCalculate = () => setCalculated(true);

  const handleReset = () => {
    setBinding("paperback");
    setInteriorType("black-white");
    setPaperType("white");
    setReadingDir("ltr");
    setUnits("inches");
    setTrimIdx(4);
    setPages(600);
    setCalculated(false);
  };

  const handleInteriorChange = (val) => {
    setInteriorType(val);
    if (val !== "black-white") setPaperType("white");
    setCalculated(false);
  };

  const handleDownloadPdf = async () => {
    if (!resultRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const margin = 24;
      const imgW = pdfW - 2 * margin;
      const imgH = (canvas.height * imgW) / canvas.width;
      const y = imgH < pdfH - 2 * margin ? (pdfH - imgH) / 2 : margin;
      pdf.addImage(imgData, "PNG", margin, y, imgW, Math.min(imgH, pdfH - 2 * margin));
      pdf.save(`cover-dimensions-${binding}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  const paperOptions = interiorType === "black-white"
    ? [{ value: "white", label: "White paper" }, { value: "cream", label: "Cream paper" }, { value: "groundwood", label: "Groundwood paper" }]
    : [{ value: "white", label: "White paper" }];

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-4">Enter Your Book Information</h3>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Binding type</label>
              <select value={binding} onChange={(e) => { setBinding(e.target.value); setCalculated(false); }} className={inputCls}>
                <option value="paperback">Paperback</option>
                <option value="hardcover">Hardcover</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Interior type</label>
              <select value={interiorType} onChange={(e) => handleInteriorChange(e.target.value)} className={inputCls}>
                <option value="black-white">Black & white</option>
                <option value="standard-color">Standard color</option>
                <option value="premium-color">Premium color</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Paper type</label>
              <select value={paperType} onChange={(e) => { setPaperType(e.target.value); setCalculated(false); }} className={inputCls}>
                {paperOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Reading Direction</label>
              <select value={readingDir} onChange={(e) => setReadingDir(e.target.value)} className={inputCls}>
                <option value="ltr">Left to Right</option>
                <option value="rtl">Right to Left</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Measurement units</label>
              <select value={units} onChange={(e) => { setUnits(e.target.value); setTrimIdx(4); setCalculated(false); }} className={inputCls}>
                <option value="inches">Inches</option>
                <option value="millimeters">Millimeters</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Interior trim size</label>
              <select value={trimIdx} onChange={(e) => { setTrimIdx(Number(e.target.value)); setCalculated(false); }} className={inputCls}>
                {trimSizes.map((s, i) => (
                  <option key={s.label} value={i}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Page count</label>
              <input type="number" min="24" value={pages} onChange={(e) => { setPages(Number(e.target.value)); setCalculated(false); }} className={inputCls} />
              <p className="text-xs text-slate-400 mt-1">Number of pages at your formatted trim size.</p>
            </div>
            <div className="space-y-2 pt-2">
              <button
                onClick={handleCalculate}
                className="w-full rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-500 transition"
              >
                Calculate dimensions
              </button>
              <button
                onClick={handleDownloadPdf}
                disabled={!calculated || downloading}
                className="w-full rounded-lg border border-slate-400 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {downloading ? "Generating PDF..." : "Download Template"}
              </button>
              <button
                onClick={handleReset}
                className="w-full text-center text-sm text-violet-700 hover:text-violet-900 hover:underline"
              >
                Reset book information
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {calculated ? (
          <div ref={resultRef} className="bg-white p-4 rounded-xl">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <DimTable rows={leftRows} u={u} fmt={fmt} />
              <DimTable rows={rightRows} u={u} fmt={fmt} />
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <CoverDiagram dims={dims} isMm={isMm} fmt={fmt} u={u} readingDir={readingDir} />
              <p className="text-xs text-slate-400 mt-3 text-center flex items-center justify-center gap-1">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-300 text-slate-600 text-[9px] font-bold">i</span>
                Image for reference only
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-xl bg-slate-50 border border-dashed border-slate-300 p-12">
            <p className="text-sm text-slate-400 text-center">
              Fill in your book information and click <span className="font-medium text-slate-600">Calculate dimensions</span> to see your cover dimensions and a visual diagram.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function DimTable({ rows, u, fmt }) {
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-slate-200">
          <th className="px-1 py-1.5 text-left font-semibold text-slate-700 w-6">#</th>
          <th className="px-1 py-1.5 text-left font-semibold text-slate-700">Description</th>
          <th className="px-1 py-1.5 text-right font-semibold text-slate-700">W ({u})</th>
          <th className="px-1 py-1.5 text-right font-semibold text-slate-700">H ({u})</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.n} className="border-b border-slate-100">
            <td className="px-1 py-1.5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] font-bold">{r.n}</span>
            </td>
            <td className="px-1 py-1.5 text-slate-700">{r.label}</td>
            <td className="px-1 py-1.5 text-right font-medium text-slate-900 tabular-nums">{fmt(r.w)}</td>
            <td className="px-1 py-1.5 text-right font-medium text-slate-900 tabular-nums">{fmt(r.h)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}