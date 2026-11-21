import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[520px] sm:min-h-[640px] flex items-center overflow-hidden bg-violet-950 text-white">
      {/* People photo anchored to the right, fading into the empty banner */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-[70%] overflow-hidden">
        <img
          src="/hero-claimed-fae-1200.png"
          srcSet="/hero-claimed-fae-640.png 640w, /hero-claimed-fae-900.png 900w, /hero-claimed-fae-1200.png 1200w, /hero-claimed-fae.png 1536w"
          sizes="(min-width: 640px) 70vw, 100vw"
          alt="Two Movement Publisher editors reviewing a formatted book proof of Claimed by the Fae"
          className="w-full h-full object-cover object-center"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 22%, #000 55%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 22%, #000 55%)",
          }}
        />
      </div>

      {/* Tints so the text stays readable */}
      <div className="absolute inset-0 bg-violet-950/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-violet-950 via-violet-950/75 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24 lg:py-32 w-full">
        <motion.div
          className="max-w-xl"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-orange-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> Your trusted partner in self-publishing
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-5">
            Publish your book with confidence
          </motion.h1>
          <motion.p variants={fadeUp} className="text-base sm:text-lg text-slate-200 mb-6 sm:mb-8">
            From ghostwriting and editing to cover design, publishing, and marketing. Movement Publisher turns your manuscript into a book readers love.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/chat")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
            >
              Book a free discovery call <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/portfolio")}
              className="px-6 py-3.5 rounded-lg border border-white/30 text-white font-medium hover:bg-white/10 transition backdrop-blur-sm"
            >
              See our work
            </button>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 sm:mt-12 flex flex-wrap gap-6 sm:gap-10">
            <Stat value="100+" label="Books published" />
            <Stat value="100+" label="Happy authors" />
            <Stat value="4 yrs" label="Experience" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-2xl sm:text-3xl font-bold">{value}</p>
      <p className="text-sm text-slate-300">{label}</p>
    </div>
  );
}