import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, TrendingUp, ListOrdered, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import CaseStudyPanel from "./CaseStudyPanel";

const results = [
  { icon: TrendingUp, label: "Kindle Store rank", value: "#1,015,254 to #194,284" },
  { icon: ListOrdered, label: "Best category rank", value: "#139 to #22" },
  { icon: Sparkles, label: "Series listing", value: "Book 1 of 1 added" },
  { icon: Star, label: "Customer reviews", value: "92 to 95" },
];

const beforeDetails = [
  { label: "ASIN", value: "B0DN4M97JH" },
  { label: "Publication date", value: "November 14, 2024" },
  { label: "Reading age", value: "16 - 18 years" },
];

const afterDetails = [
  { label: "ASIN", value: "B0DN4M97JH" },
  { label: "Publication date", value: "November 15, 2024" },
  { label: "Series", value: "Book 1 of 1: The Mutiny Brides" },
];

const beforeRanks = [
  "#139 in Biographies of the American Revolution",
  "#830 in Historical French Fiction",
  "#3,110 in Military & Spies Biographies",
];

const afterRanks = [
  "#22 in Biographies of the American Revolution",
  "#42 in 18th Century World History",
  "#76 in Colonial Period History of the U.S.",
];

const changes = [
  "Rebuilt the category set so the book sits in three high intent history categories instead of one broad fiction shelf.",
  "Added the series listing (Book 1 of 1), so the title now reads as a numbered book in a series.",
  "Rewrote the title and subtitle for search, leading with the genre promise and following with the hook.",
  "Held the price at $2.99 so conversion stayed strong while the rankings climbed.",
];

export default function FeaturedCaseStudy() {
  const navigate = useNavigate();

  return (
    <section id="mutiny-brides" className="py-14 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-3xl">
          <p className="text-violet-700 font-medium text-sm mb-2">
            Amazon Book Positioning & Listing Optimisation
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">The Mutiny Brides</h2>
          <p className="text-slate-600">
            Barbara Sontheimer's Louisiana historical fiction novel about the women of La Mutine, repositioned
            on Amazon for the readers most likely to buy it. Here is the same listing, before and after our work.
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg shadow-slate-900/5 bg-slate-50">
            <img
              src="/cs-before-after.png"
              alt="The Mutiny Brides Amazon listing before and after optimisation"
              className="w-full h-auto block"
            />
            <figcaption className="px-4 py-3 text-xs text-slate-500 border-t border-slate-200 bg-white">
              The actual Amazon listing, before and after our work.
            </figcaption>
          </figure>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
          {results.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.05}>
              <div className="h-full rounded-xl border border-slate-200 bg-slate-50 p-4">
                <r.icon className="w-5 h-5 text-violet-700 mb-2" />
                <p className="text-xs text-slate-500">{r.label}</p>
                <p className="text-sm font-bold text-slate-900 mt-1">{r.value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-8">
          <Reveal>
            <CaseStudyPanel
              tone="before"
              badge="Before"
              details={beforeDetails}
              rank="#1,015,254 in Kindle Store"
              ranks={beforeRanks}
              reviews="4.1 (92)"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <CaseStudyPanel
              tone="after"
              badge="After"
              details={afterDetails}
              rank="#194,284 in Kindle Store"
              ranks={afterRanks}
              reviews="4.1 (95)"
            />
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <h3 className="text-lg font-bold text-slate-900 mb-4">What we changed</h3>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {changes.map((c) => (
              <li key={c} className="flex gap-3 text-sm text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-700 shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate("/chat")}
            className="inline-flex items-center gap-2 mt-7 px-5 py-3 rounded-lg bg-violet-700 text-white text-sm font-medium hover:bg-violet-800"
          >
            Do this for my book <ArrowRight className="w-4 h-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}