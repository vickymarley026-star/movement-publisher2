import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTASection({
  title = "Ready to start your story?",
  subtitle = "Book a free discovery call and let's talk about your book.",
}) {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-violet-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-950 via-violet-950/60 to-violet-900/40" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-violet-200 mb-8">{subtitle}</p>
          <button
            onClick={() => navigate("/chat")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-violet-900 font-semibold hover:bg-violet-100 transition shadow-lg shadow-violet-950/30"
          >
            Book a discovery call <ArrowRight className="w-4 h-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}