const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const FILES = "https://db.app/api/apps/6ae56fc350b3f35b98b46ef3/files/mp/public/6ae56fc350b3f35b98b46ef3/";

const books = [
  {
    title: "Ashes to the Ember Fae",
    author: "Empror Vee",
    genre: "Dark Fae Romantasy",
    result: "The Thorn Court, Book 3",
    cover: FILES + "7c91c3ee1_ashes-to-the-ember-fae.png",
    fit: "object-cover object-center",
  },
  {
    title: "Bride of the Dying World",
    author: "Empror Vee",
    genre: "Dark Romantasy",
    result: "Book 2 of the Bride of the Dying World series",
    cover: FILES + "5ff1112a9_bride-of-the-dying-world.png",
    fit: "object-contain",
  },
];

export default function Portfolio() {
  const navigate = useNavigate();
  return (
    <section id="portfolio" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-violet-700 font-medium text-sm mb-2">Portfolio</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Books we've helped bring to life</h2>
          <p className="text-slate-600">A few of the authors we've partnered with, and the results they achieved.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {books.map((book, i) => (
            <Reveal key={book.title} delay={i * 0.1}>
              <div className="group h-full rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition">
                <div className="aspect-[3/4] overflow-hidden bg-slate-100">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className={`w-full h-full ${book.fit} group-hover:scale-105 transition duration-500`}
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-violet-700">{book.genre}</span>
                  <h3 className="font-semibold text-slate-900 mt-1">{book.title}</h3>
                  <p className="text-xs text-slate-400 mb-2">by {book.author}</p>
                  <p className="text-sm text-emerald-600 font-medium">{book.result}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-3" delay={0.2}>
          <button onClick={() => navigate("/portfolio")} className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-lg bg-violet-700 text-white hover:bg-violet-800">
            View full portfolio <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => navigate("/book-consultation")} className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800">
            Start your story <ArrowRight className="w-4 h-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}