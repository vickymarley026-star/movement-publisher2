import React from "react";

export default function CaseStudyPanel({ tone, badge, details, rank, ranks, reviews }) {
  const isAfter = tone === "after";
  return (
    <div
      className={`h-full rounded-2xl border p-5 sm:p-6 ${
        isAfter
          ? "border-violet-200 bg-white shadow-lg shadow-violet-900/10"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
          isAfter ? "bg-violet-700 text-white" : "bg-slate-300 text-slate-700"
        }`}
      >
        {badge}
      </span>

      <dl className="mt-4 space-y-2 text-sm">
        {details.map((d) => (
          <div key={d.label} className="flex justify-between gap-4 border-b border-slate-200/70 pb-2">
            <dt className="text-slate-500">{d.label}</dt>
            <dd className="text-right font-medium text-slate-900">{d.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4">
        <p className="text-sm text-slate-500">Best Sellers Rank</p>
        <p className={`text-xl font-bold ${isAfter ? "text-violet-800" : "text-slate-900"}`}>{rank}</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-600">
          {ranks.map((r) => (
            <li key={r} className={isAfter ? "text-violet-800" : ""}>{r}</li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Customer reviews <span className="font-medium text-slate-900">{reviews}</span>
      </p>
    </div>
  );
}