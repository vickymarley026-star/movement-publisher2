import React from "react";
import { PenLine, FileSearch, Edit3, LayoutTemplate, Palette, BookOpen, Megaphone, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";

const services = [
  { icon: PenLine, title: "Ghostwriting", desc: "Bring your idea to life with a skilled ghostwriter who captures your voice and vision." },
  { icon: FileSearch, title: "Manuscript Critique", desc: "Get detailed, constructive feedback on structure, plot, and character before you commit to full editing." },
  { icon: Edit3, title: "Editing", desc: "Developmental, line, and copy editing from editors who've worked on bestsellers." },
  { icon: LayoutTemplate, title: "Formatting", desc: "Professional interior formatting for print and eBook that meets every retailer's standards." },
  { icon: Palette, title: "Cover Design", desc: "Original, market-ready cover art designed to make your book stand out." },
  { icon: BookOpen, title: "Publishing", desc: "We handle the upload, metadata, and distribution to Amazon, Apple Books, and 70+ retailers." },
  { icon: Megaphone, title: "Promotion", desc: "Launch plans, PR outreach, and review campaigns that get your book noticed." },
  { icon: TrendingUp, title: "Marketing", desc: "Targeted ad campaigns and ongoing marketing strategies tailored to your genre and audience." },
];

export default function WhyUs() {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal variant="bounce" className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-violet-700 font-medium text-sm mb-2">Our Services</p>
          <AnimatedText as="h2" text="Everything you need to publish, under one roof" className="text-3xl font-bold text-slate-900 mb-3" />
          <p className="text-slate-600">From first draft to launch day, we handle every step so you can focus on writing.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} variant="bounce" delay={(i % 4) * 0.08}>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-11 h-11 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-slate-500">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}