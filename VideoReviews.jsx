import React, { useState } from "react";
import { Play, X, Star } from "lucide-react";
import Reveal from "./Reveal";

const reviews = [
{
  name: "Empror Vee",
  book: "Ashes to the Ember Fae",
  quote: "They turned my vision into a bestseller.",
  fullQuote: "Working with Movement Publisher was incredible. From the first consultation to launch day, they handled everything: editing, cover design, formatting, and marketing. My book hit #3 in its category in the first week!",
  gradient: "from-violet-600 to-purple-800"
},
{
  name: "Sarah Mitchell",
  book: "Love in Bloom",
  quote: "The best publishing decision I ever made.",
  fullQuote: "I was nervous about self-publishing, but the team guided me through every step. The developmental editing transformed my story, and the cover design was exactly what I wanted but couldn't articulate.",
  gradient: "from-orange-500 to-rose-600"
},
{
  name: "James Okonkwo",
  book: "The Silent Witness",
  quote: "Professional from start to finish.",
  fullQuote: "Their marketing strategy was a game-changer. I went from barely any sales to consistent daily downloads. The ad campaigns they set up continue to perform months after launch.",
  gradient: "from-blue-600 to-indigo-800"
}];

export default function VideoReviews() {
  const [active, setActive] = useState(null);

  return (
    <section id="video-reviews" className="py-20 bg-slate-50 hidden">
      <div className="max-w-6xl mx-auto px-6 hidden">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-violet-700 font-medium text-sm mb-2">Video Reviews</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Hear directly from our authors</h2>
          <p className="text-slate-600">Watch these authors share their experience working with us.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) =>
          <Reveal key={r.name} delay={i * 0.1}>
              <button
              onClick={() => setActive(r)}
              className="block w-full text-left rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group">
              
                <div className={`relative aspect-video bg-gradient-to-br ${r.gradient} flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
                  <div className="relative w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition">
                    <Play className="w-7 h-7 text-slate-900 ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="font-semibold text-slate-900 text-sm">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.book}</p>
                  <p className="text-sm text-slate-500 italic mt-1">"{r.quote}"</p>
                </div>
              </button>
            </Reveal>
          )}
        </div>
      </div>

      {active &&
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className={`relative aspect-video bg-gradient-to-br ${active.gradient} flex items-center justify-center`}>
              <button onClick={() => setActive(null)} className="absolute top-3 right-3 text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <div className="text-center text-white px-6">
                <Play className="w-12 h-12 mx-auto mb-3 opacity-80" fill="currentColor" />
                <p className="text-lg font-semibold">{active.name}</p>
                <p className="text-sm text-white/70">{active.book}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) =>
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              )}
              </div>
              <p className="text-slate-600">"{active.fullQuote}"</p>
              <p className="font-semibold text-slate-900 mt-4">{active.name}</p>
              <p className="text-sm text-slate-400">Author of "{active.book}"</p>
            </div>
          </div>
        </div>
      }
    </section>);

}