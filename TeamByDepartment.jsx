const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import Reveal from "./Reveal";
import TeamSocialLinks from "./TeamSocialLinks";

const P = "https://media.db.com/images/public/6aa6a685c59b9c6221d8d5a1/";
const A = "https://db.app/api/apps/6ae56fc350b3f35b98b46ef3/files/mp/public/6ae56fc350b3f35b98b46ef3/";

const photos = {
  sunday: P + "2650c304c_17841685644971.png",
  victor: P + "dcb7b04cf_OgundokunVictor.jpg",
  ayomide: P + "21eaf17a6_AdewunmiAyomide.jpg",
  ifeoluwa: P + "b1bdc398c_AjibadeIfeoluwa.jpg",
  oluwadamilola: A + "db2359382_oluwadamilola.jpg",
  promise: A + "0aa133354_promise.png",
  pelumi: A + "233625f40_pelumi.png",
  suzan: "/team-suzan.jpg",
  opeyemi: "/team-opeyemi.png",
  bukola: "/team-florence.jpg",
  damilare: "https://cdn.phototourl.com/anon/2026-11-21-6bdac29e-69eb-4305-92a9-a60d55239518.jpg",
  aanu: "https://cdn.phototourl.com/anon/2026-11-21-0ad10d98-b495-44b8-ae13-0896376be79d.jpg",
};

const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

const departments = [
  {
    name: "Administration",
    work: "/portfolio#published-works",
    note: "Leads projects, keeps authors on schedule and runs the team.",
    members: [
      { name: "Sunday Adeoye", role: "Team Lead & Author Project Manager", photo: photos.sunday },
      { name: "Victor Ogundokun", role: "Secretary, Administration", photo: photos.victor },
    ],
  },
  {
    name: "Editorial",
    work: "/portfolio#published-works",
    note: "Developmental editing, line editing and proofreading for every manuscript.",
    members: [
      { name: "Oluwadamilola Adeniyi", role: "Editorial Team", photo: photos.oluwadamilola },
      { name: "Alabi Bukola Florence", role: "Editorial Team", photo: photos.bukola },
      { name: "Adeyemi Pelumi", role: "Editorial Team", photo: photos.pelumi },
    ],
  },
  {
    name: "Ghostwriting",
    work: "/portfolio#published-works",
    note: "Writers who draft, shape and finish manuscripts in your voice.",
    members: [
      { name: "Oluwadamilola Adeniyi", role: "Ghostwriter", photo: photos.oluwadamilola },
      { name: "Promise Abisola", role: "Ghostwriter", photo: photos.promise },
      { name: "Alabi Bukola Florence", role: "Ghostwriter", photo: photos.bukola },
      { name: "Adeyemi Pelumi", role: "Ghostwriter", photo: photos.pelumi },
      { name: "Aanu Adelakun", role: "Ghostwriter", photo: photos.aanu },
    ],
  },
  {
    name: "Publishing & Promotion",
    work: "/portfolio#published-works",
    note: "Launch strategy, distribution and the promotion that gets books read.",
    members: [
      { name: "Victor Ogundokun", role: "Publishing & Promotion Assistant", photo: photos.victor },
      { name: "Ayomide Adewunmi", role: "Publishing & Promotion Team", photo: photos.ayomide },
    ],
  },
  {
    name: "Amazon Book Positioning & Listing Optimisation",
    work: "/portfolio#published-works",
    note: "Keyword research, categories, descriptions and A+ content that put your book in front of the right readers on Amazon.",
    members: [
      { name: "Victor Ogundokun", role: "Amazon Positioning & Listing Optimisation Team", photo: photos.victor },
      { name: "Ayomide Adewunmi", role: "Amazon Positioning & Listing Optimisation Team", photo: photos.ayomide },
      { name: "Oluwadamilola Adeniyi", role: "Amazon Positioning & Listing Optimisation Team", photo: photos.oluwadamilola },
      { name: "Alabi Bukola Florence", role: "Amazon Positioning & Listing Optimisation Team", photo: photos.bukola },
      { name: "Adeyemi Pelumi", role: "Amazon Positioning & Listing Optimisation Team", photo: photos.pelumi },
      { name: "Promise Abisola", role: "Amazon Positioning & Listing Optimisation Team", photo: photos.promise },
      { name: "Ajibade Eunice", role: "Amazon Positioning & Listing Optimisation Team", photo: photos.ifeoluwa },
      { name: "Suzan Taiwo", role: "Amazon Positioning & Listing Optimisation Team", photo: photos.suzan },
      { name: "Opeyemi Adeniyi", role: "Amazon Positioning & Listing Optimisation Team", photo: photos.opeyemi },
      { name: "Abiodun Damilare James", role: "Amazon Positioning & Listing Optimisation Team", photo: photos.damilare },
      { name: "Aanu Adelakun", role: "Amazon Positioning & Listing Optimisation Team", photo: photos.aanu },
    ],
  },
  {
    name: "Formatting & Production",
    work: "/portfolio#formatting",
    note: "Interior layout and print-ready files for every retailer.",
    members: [
      { name: "Ayomide Adewunmi", role: "Formatting & Publishing Specialist", photo: photos.ayomide },
      { name: "Ajibade Eunice", role: "Formatting & Publishing Team", photo: photos.ifeoluwa },
      { name: "Oluwadamilola Adeniyi", role: "Formatting & Publishing Team", photo: photos.oluwadamilola },
      { name: "Promise Abisola", role: "Formatting & Publishing Team", photo: photos.promise },
      { name: "Adeyemi Pelumi", role: "Formatting & Publishing Team", photo: photos.pelumi },
      { name: "Suzan Taiwo", role: "Formatting & Publishing Team", photo: photos.suzan },
      { name: "Opeyemi Adeniyi", role: "Formatting & Publishing Team", photo: photos.opeyemi },
      { name: "Abiodun Damilare James", role: "Formatting & Production Team", photo: photos.damilare },
      { name: "Aanu Adelakun", role: "Formatting & Production Team", photo: photos.aanu },
    ],
  },
  {
    name: "Cover Design",
    work: "/portfolio#cover-design",
    note: "Jackets, typography and artwork that make a book impossible to walk past.",
    members: [
      { name: "Victor Ogundokun", role: "Cover Design Team", photo: photos.victor },
      { name: "Ayomide Adewunmi", role: "Cover Design Team", photo: photos.ayomide },
      { name: "Ajibade Eunice", role: "Cover Design Team", photo: photos.ifeoluwa },
      { name: "Oluwadamilola Adeniyi", role: "Cover Design Team", photo: photos.oluwadamilola },
      { name: "Promise Abisola", role: "Cover Design Team", photo: photos.promise },
      { name: "Adeyemi Pelumi", role: "Cover Design Team", photo: photos.pelumi },
      { name: "Suzan Taiwo", role: "Cover Design Team", photo: photos.suzan },
      { name: "Opeyemi Adeniyi", role: "Cover Design Team", photo: photos.opeyemi },
    ],
  },
];

export default function TeamByDepartment() {
  const navigate = useNavigate();

  return (
    <section id="team" className="py-14 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-violet-700 font-medium text-sm mb-2">Our Team</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">The people behind your book</h2>
          <p className="text-slate-600">
            Every department that touches your manuscript, and who you'll be working with in each one.
          </p>
          <a
            href="https://www.linkedin.com/company/movement-publisher/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-lg border border-violet-700 text-violet-700 text-sm font-medium hover:bg-violet-700 hover:text-white transition"
          >
            <Linkedin className="w-4 h-4" /> Follow the team on LinkedIn
          </a>
        </Reveal>

        <div className="space-y-10">
          {departments.map((d, di) => (
            <Reveal key={d.name} delay={di * 0.05}>
              <div className="mb-4 border-l-4 border-violet-700 pl-4">
                <h3 className="text-lg font-bold text-slate-900">{d.name}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{d.note}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-5">
                {d.members.map((m) => (
                  <div
                    key={m.name}
                    className="w-full max-w-sm sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)] lg:max-w-none rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition text-center group"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-slate-100 flex items-center justify-center">
                      {m.photo ? (
                        <img
                          src={m.photo}
                          alt={m.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <span className="text-4xl font-heading font-bold text-slate-400">{initials(m.name)}</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-slate-900 text-sm">{m.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{m.role}</p>
                      <TeamSocialLinks name={m.name} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <button
                  onClick={() => navigate(d.work)}
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg bg-violet-700 text-white hover:bg-violet-800"
                >
                  See our work <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-10" delay={0.2}>
          <button
            onClick={() => navigate("/portfolio")}
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-lg bg-violet-700 text-white hover:bg-violet-800"
          >
            See our work <ArrowRight className="w-4 h-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}