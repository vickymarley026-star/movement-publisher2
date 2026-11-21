import React, { useState, useMemo } from "react";

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
  { label: '216 x 280 mm', w: 216, h: 280 },
];

// Printing cost: fixed + per-page (USD)
const printingCosts = {
  paperback: {
    "black-white": { fixed: 1.00, perPage: 0.012 },
    "standard-color": { fixed: 3.65, perPage: 0.012 },
    "premium-color": { fixed: 3.65, perPage: 0.017 },
  },
  hardcover: {
    "black-white": { fixed: 1.50, perPage: 0.012 },
    "standard-color": { fixed: 4.15, perPage: 0.012 },
    "premium-color": { fixed: 4.15, perPage: 0.017 },
  },
};

const marketplaces = [
  { name: "Amazon.com", currency: "$", symbol: "USD", rate: 1, locale: "en-US" },
  { name: "Amazon.co.uk", currency: "£", symbol: "GBP", rate: 0.79, locale: "en-GB" },
  { name: "Amazon.de", currency: "€", symbol: "EUR", rate: 0.92, locale: "de-DE" },
  { name: "Amazon.fr", currency: "€", symbol: "EUR", rate: 0.92, locale: "fr-FR" },
  { name: "Amazon.es", currency: "€", symbol: "EUR", rate: 0.92, locale: "es-ES" },
  { name: "Amazon.it", currency: "€", symbol: "EUR", rate: 0.92, locale: "it-IT" },
  { name: "Amazon.nl", currency: "€", symbol: "EUR", rate: 0.92, locale: "nl-NL" },
  { name: "Amazon.pl", currency: "zł", symbol: "PLN", rate: 4.0, locale: "pl-PL" },
  { name: "Amazon.se", currency: "kr", symbol: "SEK", rate: 10.5, locale: "sv-SE" },
  { name: "Amazon.com.be", currency: "€", symbol: "EUR", rate: 0.92, locale: "nl-BE" },
  { name: "Amazon.ie", currency: "€", symbol: "EUR", rate: 0.92, locale: "en-IE" },
  { name: "Amazon.co.jp", currency: "¥", symbol: "JPY", rate: 150, locale: "ja-JP" },
  { name: "Amazon.ca", currency: "$", symbol: "CAD", rate: 1.36, locale: "en-CA" },
  { name: "Amazon.com.au", currency: "$", symbol: "AUD", rate: 1.52, locale: "en-AU" },
];

const ROYALTY_RATE = 0.60;

const inputCls = "flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500";
const labelCls = "text-sm font-medium text-slate-700 mb-1.5 block";

function formatPrice(value, currency, locale) {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency === "zł" ? "PLN" : currency === "kr" ? "SEK" : currency === "¥" ? "JPY" : currency === "£" ? "GBP" : currency === "€" ? "EUR" : currency === "$" ? "USD" : "USD",
      maximumFractionDigits: currency === "¥" || currency === "kr" ? 0 : 2,
    }).format(value);
  } catch {
    return `${currency}${value.toFixed(2)}`;
  }
}

export default function RoyaltyCalculator() {
  const [bookType, setBookType] = useState("paperback");
  const [interiorType, setInteriorType] = useState("black-white");
  const [trimUnit, setTrimUnit] = useState("inches");
  const [trimIdx, setTrimIdx] = useState(3);
  const [marketplace, setMarketplace] = useState("all");
  const [pages, setPages] = useState(200);
  const [listPrice, setListPrice] = useState(40);
  const [submitted, setSubmitted] = useState(false);

  const trimSizes = trimUnit === "inches" ? trimSizesIn : trimSizesMm;

  const results = useMemo(() => {
    const cost = printingCosts[bookType][interiorType];
    const printingUsd = cost.fixed + cost.perPage * Math.max(0, pages);

    const selected = marketplace === "all"
      ? marketplaces
      : marketplaces.filter((m) => m.name === marketplace);

    return selected.map((m) => {
      const localPrinting = printingUsd * m.rate;
      const localListPrice = listPrice * m.rate;
      const royalty = localListPrice * ROYALTY_RATE - localPrinting;
      const minPrice = localPrinting / ROYALTY_RATE;
      return {
        name: m.name,
        currency: m.currency,
        locale: m.locale,
        listPrice: localListPrice,
        royaltyRate: ROYALTY_RATE,
        minPrice,
        printing: localPrinting,
        royalty: Math.max(0, royalty),
      };
    });
  }, [bookType, interiorType, pages, listPrice, marketplace]);

  const handleSubmit = () => setSubmitted(true);
  const handleReset = () => {
    setBookType("paperback");
    setInteriorType("black-white");
    setTrimUnit("inches");
    setTrimIdx(3);
    setMarketplace("all");
    setPages(200);
    setListPrice(40);
    setSubmitted(false);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-4">Printing Costs and Royalty Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Book Type</label>
              <select value={bookType} onChange={(e) => { setBookType(e.target.value); setSubmitted(false); }} className={inputCls}>
                <option value="paperback">Paperback</option>
                <option value="hardcover">Hardcover</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Interior Type</label>
              <select value={interiorType} onChange={(e) => { setInteriorType(e.target.value); setSubmitted(false); }} className={inputCls}>
                <option value="black-white">Black & white</option>
                <option value="standard-color">Standard color</option>
                <option value="premium-color">Premium color</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Trim Size Measurement Unit</label>
              <select value={trimUnit} onChange={(e) => { setTrimUnit(e.target.value); setTrimIdx(3); setSubmitted(false); }} className={inputCls}>
                <option value="inches">Inches</option>
                <option value="millimeters">Millimeters</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Trim Size</label>
              <select value={trimIdx} onChange={(e) => { setTrimIdx(Number(e.target.value)); setSubmitted(false); }} className={inputCls}>
                {trimSizes.map((s, i) => (
                  <option key={s.label} value={i}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Marketplace</label>
              <select value={marketplace} onChange={(e) => { setMarketplace(e.target.value); setSubmitted(false); }} className={inputCls}>
                <option value="all">All marketplaces</option>
                {marketplaces.map((m) => (
                  <option key={m.name} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Page Count</label>
              <input type="number" min="24" value={pages} onChange={(e) => { setPages(Number(e.target.value)); setSubmitted(false); }} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>List Price ($)</label>
              <input type="number" step="0.01" min="0" value={listPrice} onChange={(e) => { setListPrice(Number(e.target.value)); setSubmitted(false); }} className={inputCls} />
            </div>
            <div className="space-y-2 pt-2">
              <button
                onClick={handleSubmit}
                className="w-full rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-500 transition"
              >
                Submit
              </button>
              <button
                onClick={handleReset}
                className="w-full text-center text-sm text-violet-700 hover:text-violet-900 hover:underline"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {submitted ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="px-3 py-2.5 text-left font-semibold text-slate-700">Marketplace</th>
                  <th className="px-3 py-2.5 text-right font-semibold text-slate-700">List Price</th>
                  <th className="px-3 py-2.5 text-right font-semibold text-slate-700">Royalty Rate</th>
                  <th className="px-3 py-2.5 text-right font-semibold text-slate-700">Min. List Price</th>
                  <th className="px-3 py-2.5 text-right font-semibold text-slate-700">Printing Cost</th>
                  <th className="px-3 py-2.5 text-right font-semibold text-slate-700">Est. Royalty</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r.name} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-3 py-2 text-slate-700 font-medium">{r.name}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-900">{formatPrice(r.listPrice, r.currency, r.locale)}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-600">{(r.royaltyRate * 100).toFixed(0)}%</td>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-600">{formatPrice(r.minPrice, r.currency, r.locale)}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-600">{formatPrice(r.printing, r.currency, r.locale)}</td>
                    <td className="px-3 py-2 text-right tabular-nums font-semibold text-violet-700">{formatPrice(r.royalty, r.currency, r.locale)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-slate-400 mt-3">
              Estimates based on KDP's standard printing cost formulas and approximate exchange rates. Actual costs may vary.
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-xl bg-slate-50 border border-dashed border-slate-300 p-12">
            <p className="text-sm text-slate-400 text-center">
              Fill in your book details and click <span className="font-medium text-slate-600">Submit</span> to see printing costs and estimated royalties across marketplaces.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}