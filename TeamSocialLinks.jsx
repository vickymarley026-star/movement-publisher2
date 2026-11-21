import React from "react";
import { Linkedin, Instagram, Twitter } from "lucide-react";
import { socialsFor } from "@/data/teamSocials";

const LABELS = { instagram: "Instagram", linkedin: "LinkedIn", x: "X (Twitter)" };
const ICONS = { instagram: Instagram, linkedin: Linkedin, x: Twitter };

export default function TeamSocialLinks({ name }) {
  const socials = socialsFor(name);
  if (!socials.length) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      {socials.map((s) => {
        const Icon = ICONS[s.type] || Linkedin;
        return (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${name} on ${LABELS[s.type] || "LinkedIn"}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-violet-700 hover:text-white transition"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}