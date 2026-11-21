const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Resources", href: "/resources" },
];

export default function LandingNav() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.auth.isAuthenticated().then(setAuthed).catch(() => setAuthed(false));
  }, []);

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BrandLogo size="md" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l.href} onClick={() => go(l.href)} className="text-sm font-medium text-slate-600 hover:text-slate-900">{l.label}</button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {authed ? (
            <button onClick={() => go("/chat")} className="text-sm font-medium px-4 py-2 rounded-lg bg-violet-700 text-white hover:bg-violet-800">
              Chat with us
            </button>
          ) : (
            <>
              <button onClick={() => go("/login")} className="text-sm font-medium text-slate-700 hover:text-slate-900 hidden sm:block">Sign in</button>
              <button onClick={() => go("/register")} className="text-sm font-medium px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600">
                Get started
              </button>
            </>
          )}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden p-2 -mr-1 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="px-6 py-3 flex flex-col">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="text-left text-sm font-medium text-slate-700 py-3 border-b border-slate-100 last:border-0"
              >
                {l.label}
              </button>
            ))}
            {!authed && (
              <button onClick={() => go("/login")} className="text-left text-sm font-medium text-violet-700 py-3">
                Sign in
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}