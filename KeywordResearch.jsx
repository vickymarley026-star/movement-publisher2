const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from "react";

import { Search, Loader2 } from "lucide-react";

const inputCls = "flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500";
const labelCls = "text-sm font-medium text-slate-700 mb-1.5 block";

const compColor = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",
};

export default function KeywordResearch() {
  const [topic, setTopic] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setKeywords([]);
    try {
      const res = await db.functions.invoke("keywordResearch", { topic: topic.trim(), genre: genre.trim() });
      setKeywords(res.data?.keywords || []);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Book topic / description</label>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. a dark romance set in a fae court" className={inputCls} required />
        </div>
        <div>
          <label className={labelCls}>Genre (optional)</label>
          <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="e.g. Romantasy" className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-700 text-white text-sm font-medium hover:bg-violet-800 disabled:opacity-50">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Researching keywords…</> : <><Search className="w-4 h-4" /> Research keywords</>}
          </button>
        </div>
      </form>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      {keywords.length > 0 && (
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
            <p className="text-sm font-semibold text-slate-700">{keywords.length} keyword suggestions</p>
          </div>
          <div className="divide-y divide-slate-100">
            {keywords.map((k, i) => (
              <div key={i} className="px-4 py-3 flex items-start gap-3">
                <div className="flex-1">
                  <p className="font-medium text-slate-900 text-sm">{k.keyword}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{k.rationale}</p>
                </div>
                {k.competition && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${compColor[k.competition.toLowerCase()] || compColor.medium}`}>
                    {k.competition}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && keywords.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-8">Enter your book topic above to get AI-powered keyword suggestions.</p>
      )}
    </div>
  );
}