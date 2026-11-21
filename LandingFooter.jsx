import React from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function LandingFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-violet-900/30 to-slate-900" />
      <div className="relative max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="mb-3">
            <span className="inline-flex items-center rounded-lg bg-white px-3 py-2">
              <BrandLogo size="md" />
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm">
            Your trusted partner in self-publishing. A full-service agency helping authors turn manuscripts into books they're proud to share.
          </p>
          <div className="flex items-center gap-4 mt-3">
            <a
              href="mailto:hello@movementpublisher.com"
              className="text-sm font-medium text-slate-200 hover:text-white"
            >
              hello@movementpublisher.com
            </a>
            <a
              href="https://www.linkedin.com/company/movement-publisher/"
              target="_blank"
              rel="noreferrer"
              aria-label="Movement Publisher on LinkedIn"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-200 hover:bg-white hover:text-violet-900 transition"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <p className="font-medium text-white mb-3">Company</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/case-studies" className="hover:text-white">Case Studies</Link></li>
            <li><Link to="/portfolio" className="hover:text-white">Portfolio</Link></li>
            <li><Link to="/resources" className="hover:text-white">Free Resources</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-white mb-3">Portal</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-white">Sign in</Link></li>
            <li><Link to="/register" className="hover:text-white">Get started</Link></li>
            <li><Link to="/book-consultation" className="hover:text-white">Book a call</Link></li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 text-sm text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p>© {new Date().getFullYear()} Movement Publisher. All rights reserved.</p>
          <p>Website designed and developed by Victor Ogomide and Sunday Adeoye</p>
        </div>
      </div>
    </footer>
  );
}