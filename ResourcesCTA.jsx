import React from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, Search, LayoutTemplate, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const tools = [
{ icon: LayoutTemplate, title: "Kindle Cover Calculator", desc: "Get exact cover dimensions for your trim size and page count." },
{ icon: Calculator, title: "Royalty Calculator", desc: "Estimate your KDP earnings per book across formats." },
{ icon: Search, title: "Keyword Research Tool", desc: "Discover high-potential Amazon search keywords for your book." }];

export default function ResourcesCTA() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-violet-700 font-medium text-sm mb-2">Free Resources</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Tools every author needs  free</h2>
          <p className="text-slate-600">Plan your cover, estimate your royalties, and research keywords. No signup required.</p>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6">
          {tools.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.title} delay={i * 0.1}>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center h-full">
                  <div className="w-12 h-12 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1.5">{t.title}</h3>
                  <p className="text-sm text-slate-500">{t.desc}</p>
                </div>
              </Reveal>);

          })}
        </div>
        <Reveal className="text-center mt-10" delay={0.2}>
          <button onClick={() => navigate("/resources")} className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-lg bg-violet-700 text-white hover:bg-violet-800">
            Try the tools <ArrowRight className="w-4 h-4" />
          </button>
        </Reveal>
      </div>
    </section>);

}