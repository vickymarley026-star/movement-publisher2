import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import TeamSocialLinks from "./TeamSocialLinks";
import { team } from "@/data/team";

export default function TeamSnippet() {
  const navigate = useNavigate();
  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-violet-700 font-medium text-sm mb-2">Our Team</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">The Movement Team</h2>
          <p className="text-slate-600">A dedicated team of self-publishing professionals committed to your success.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition text-center group">
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900">{m.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{m.role}</p>
                  <TeamSocialLinks name={m.name} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-10" delay={0.2}>
          <button
            onClick={() => navigate("/about#team")}
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-lg bg-violet-700 text-white hover:bg-violet-800"
          >
            View full team <ArrowRight className="w-4 h-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}