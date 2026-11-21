import React from "react";
import { Star, Quote } from "lucide-react";
import Reveal from "./Reveal";

const testimonials = [
  { name: "Empror Vee", role: "Dark Romantasy Author", rating: 5, text: "Working with Movement Publisher was the best decision I made for my writing career. They understood my vision and elevated it beyond what I imagined." },
  { name: "Sarah Mitchell", role: "Contemporary Romance Author", rating: 5, text: "The editing team caught things I never would have noticed. My book reads so much smoother now. The cover design also exceeded my expectations." },
  { name: "James Okonkwo", role: "Thriller Author", rating: 5, text: "From formatting to publishing on Amazon, everything was seamless. I felt supported every step of the way. Highly recommend!" },
  { name: "Linda Chen", role: "Self-Help Author", rating: 5, text: "Their marketing strategy helped me reach readers I never could have on my own. My launch week sales were incredible." },
  { name: "Michael Brown", role: "Sci-Fi Author", rating: 5, text: "Professional, responsive, and genuinely caring. They treated my book like it was their own. The results speak for themselves." },
  { name: "Aisha Bello", role: "Children's Book Author", rating: 5, text: "The cover design and formatting were perfect for my target audience. My book looks professional and kids love it!" },
];

const avatarColors = ["bg-violet-600", "bg-orange-500", "bg-blue-600", "bg-emerald-600", "bg-rose-600", "bg-amber-600"];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-violet-700 font-medium text-sm mb-2">Customer Feedback</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">What authors say about us</h2>
          <p className="text-slate-600">Real stories from real authors who trusted us with their books.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.1}>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <Quote className="w-8 h-8 text-violet-200 mb-3" />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 flex-1">{t.text}</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                  <div className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} text-white flex items-center justify-center font-semibold text-sm`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}