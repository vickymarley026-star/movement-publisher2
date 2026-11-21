import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import Reveal from "./Reveal";
import ChapterPreview from "@/components/portfolio/ChapterPreview";
import { getFeaturedWeek } from "@/data/featuredWorks";

export default function FeaturedThisWeek() {
  const featured = getFeaturedWeek();

  return (
    <section id="featured" className="py-14 sm:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-violet-700 font-medium text-sm mb-2">
            <Star className="w-4 h-4" /> Featured this week
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Our top work, and who made it</h2>
          <p className="text-slate-600">
            Six books from our portfolio this week, each with the specialist behind it.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {featured.books.map((book, i) => (
            <Reveal key={book.title} delay={i * 0.06}>
              <article className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition">
                <div className={`${book.aspect || "aspect-[3/4]"} overflow-hidden bg-slate-100`}>
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      loading="lazy"
                      className={`w-full h-full ${book.coverFit || "object-cover object-center"}`}
                    />
                  ) : (
                    <ChapterPreview pdf={book.pdf} page={book.previewPage || 1} title={book.title} />
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-xs font-medium text-violet-700">{book.genre}</span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug mt-1">{book.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">by {book.author}</p>

                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-3">
                    <img
                      src={book.expert.photo}
                      alt={book.expert.name}
                      loading="lazy"
                      className="h-10 w-10 shrink-0 rounded-full object-cover object-top ring-2 ring-violet-100"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{book.expert.name}</p>
                      <p className="text-xs text-slate-500 leading-tight">{book.work}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-lg bg-violet-700 text-white hover:bg-violet-800"
          >
            See the full portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}