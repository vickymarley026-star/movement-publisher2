const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from "react";

import { Mail, Loader2, CheckCircle } from "lucide-react";
import Reveal from "./Reveal";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setError("");
    try {
      await db.functions.invoke("newsletterSignup", { email: email.trim() });
      setStatus("success");
      setEmail("");
    } catch (err) {
      setError(err.message || "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-violet-700 to-purple-900 text-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <Mail className="w-10 h-10 mx-auto mb-4 text-orange-400" />
          <h2 className="text-3xl font-bold mb-3">Get publishing tips in your inbox</h2>
          <p className="text-violet-200 mb-8">Join our newsletter for weekly self-publishing insights, marketing tips, and author success stories.</p>

          {status === "success" ? (
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-lg px-6 py-4">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <p className="font-medium">You're subscribed! Welcome aboard.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-lg px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-50 transition"
              >
                {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing…</> : "Subscribe"}
              </button>
            </form>
          )}

          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
          <p className="text-xs text-violet-300 mt-4">No spam. Unsubscribe anytime.</p>
        </Reveal>
      </div>
    </section>
  );
}