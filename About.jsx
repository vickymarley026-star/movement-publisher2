const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";

export default function About() {
  return (
    <section id="about" className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        <Reveal variant="bounce-left">
          <div>
            <p className="text-violet-700 font-medium mb-2 text-4xl">Who we are</p>
            <AnimatedText as="h2" text="We're a group of self-publishing professionals obsessed with your success" className="text-2xl font-bold text-slate-900 mb-4" />
            <p className="text-slate-600 mb-4">
              Movement Publisher is a self-publishing agency built for authors who want professional results without losing creative control. We've guided hundreds of writers from rough draft to bookstore shelves.
            </p>
            <p className="text-slate-600 mb-6">
              We believe every great book deserves expert care. That's why we pair each author with a dedicated team of developmental editors, cover designers, and marketing strategists to bring your vision to life.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <Pillar value="100%" label="Author-owned rights" />
              <Pillar value="1:1" label="Dedicated team" />
              <Pillar value="40+" label="Genres served" />
            </div>
          </div>
        </Reveal>
        <Reveal variant="bounce-right" delay={0.15}>
          <div className="rounded-2xl overflow-hidden shadow-xl bg-slate-50">
            <Image src="https://media.db.com/images/public/6ae56fc350b3f35b98b46ef3/fd4e20776_ipxTWD4TkFuLyGdJ6e3nkrKlS3UxhcrOfmvD50JkyrOf8rSOjlufezWccTcCisZ-Nx82Q-5ixU8KjoDMyIvNXzr_ERd6X08LLNaCMm40q8GIxhEvxVKcUyaXlq3Qg_VVe_F1iNUwB_q8ccUsaxOvp7VNksJSQG_BQqz42JDXYdDaoaTZ-_ZA_UJ13lCVx8oc.jpg"

            alt="Editor reviewing a manuscript"
            fittingType="fit"
            className="w-full h-[340px]" />
            
          </div>
        </Reveal>
      </div>
    </section>);

}

function Pillar({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
      <p className="text-xl font-bold text-violet-700">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>);

}