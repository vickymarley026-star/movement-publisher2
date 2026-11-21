import React from "react";
import { ShieldCheck, FileCheck, Lock, HeartHandshake, Award, RefreshCw } from "lucide-react";
import Reveal from "./Reveal";

const trustItems = [
{ icon: ShieldCheck, title: "100% Rights Retained", desc: "You own your book, your copyright, and your royalties, always." },
{ icon: RefreshCw, title: "Satisfaction Guarantee", desc: "Not happy with the first edit? We'll revise until it's right." },
{ icon: Lock, title: "NDA Available", desc: "Your manuscript and ideas stay confidential. Your story is yours." },
{ icon: Award, title: "Bestseller-Caliber Team", desc: "Editors and designers who've worked on chart-topping books." },
{ icon: HeartHandshake, title: "Dedicated 1:1 Support", desc: "A personal team that knows you and your book. No call centers." },
{ icon: FileCheck, title: "Global Distribution", desc: "Your book on Amazon, Apple Books, Barnes & Noble, and 70+ retailers." }];

export default function WhyTrustUs() {
  return (
    <section id="trust" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-violet-900/30 to-slate-900" />
      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-orange-400 font-medium text-sm mb-2">Why Trust Us</p>
          <h2 className="text-3xl font-bold mb-3">Authors choose us because we put them first</h2>
          <p className="text-slate-300">We're not a publisher  we're your partner. Here's what that means in practice.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-11 h-11 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </Reveal>);

          })}
        </div>
      </div>
    </section>);

}