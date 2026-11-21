const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from "react";

import { Mail, Loader2, CheckCircle, X, Gift, TrendingUp, BookOpen, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reasons = [
  { icon: Gift, text: "Free self-publishing starter kit" },
  { icon: TrendingUp, text: "Weekly Amazon KDP marketing tips" },
  { icon: BookOpen, text: "Author success stories & case studies" },
  { icon: Sparkles, text: "Early access to free author tools" },
];

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const dismissed = localStorage.getItem("newsletter_popup_dismissed");
    if (dismissed) return;
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("newsletter_popup_dismissed", "1");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setError("");
    try {
      await db.functions.invoke("newsletterSignup", { email: email.trim() });
      setStatus("success");
      localStorage.setItem("newsletter_popup_dismissed", "1");
      setTimeout(() => setOpen(false), 2500);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-slate-100 flex items-center justify-center text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="bg-gradient-to-br from-violet-700 to-purple-900 px-6 py-8 text-center text-white">
              <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Join the Author Insider List</h2>
              <p className="text-violet-200 text-sm">Get exclusive publishing resources delivered to your inbox.</p>
            </div>

            <div className="px-6 py-6">
              {status === "success" ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="font-semibold text-slate-900">You're subscribed!</p>
                  <p className="text-sm text-slate-500 mt-1">Welcome aboard. Check your inbox soon.</p>
                </div>
              ) : (
                <>
                  <ul className="space-y-3 mb-5">
                    {reasons.map((r) => {
                      const Icon = r.icon;
                      return (
                        <li key={r.text} className="flex items-center gap-3 text-sm text-slate-700">
                          <span className="w-8 h-8 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </span>
                          {r.text}
                        </li>
                      );
                    })}
                  </ul>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-50 transition"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Subscribing…
                        </>
                      ) : (
                        "Subscribe for free"
                      )}
                    </button>
                  </form>
                  {error && <p className="text-rose-500 text-sm mt-2 text-center">{error}</p>}
                  <p className="text-xs text-slate-400 text-center mt-3">No spam. Unsubscribe anytime.</p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}