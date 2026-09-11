import React from "react";
import { Quote, Users2, Stethoscope } from "lucide-react";
import { MaskedHeading, StaggerReveal } from "./Reveal";
import { oNas } from "../data/clinicData";
import kimJestesmyImg from "../assets/gallery/galeria-18.jpg";

const ikony = [Users2, Stethoscope];

export default function AboutSection() {
  const [wyr1, wyr2, wyr3] = oNas.wyroznia;

  return (
    <section id="o-nas" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F1F7F5] border-t border-[#146B5D]/[0.14]">
      <div className="max-w-5xl mx-auto">
        <div className="relative mb-10 sm:mb-14">
          <span aria-hidden="true" className="hidden md:block absolute -top-10 -right-4 lg:-right-10 font-serif text-[9rem] lg:text-[12rem] leading-none text-[#146B5D]/[0.07] select-none pointer-events-none">
            01
          </span>
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 max-w-3xl">
            <MaskedHeading className="font-serif font-medium text-[#0D3B32] tracking-[-0.03em] leading-[0.98] text-4xl sm:text-5xl lg:text-[4.6vw]">
              {oNas.tytul}
            </MaskedHeading>
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6 mb-3.5 items-start">
          <div className="rounded-3xl bg-white border border-[#146B5D]/[0.14] p-3 shadow-sm">
            <img
              src={kimJestesmyImg}
              alt="Gabinet Dent-Ala"
              className="w-full h-56 lg:h-full object-contain bg-[#F1F7F5] rounded-2xl"
            />
          </div>
          <StaggerReveal className="grid sm:grid-cols-1 gap-3.5">
            {oNas.akapity.map((p, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white border border-[#146B5D]/[0.14] p-6 hover:border-[#146B5D]/50 transition-colors shadow-sm"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#146B5D]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2.5 text-sm text-[#1B2C28]/75 leading-relaxed">{p}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>

        <StaggerReveal className="grid sm:grid-cols-2 gap-3.5 mb-3.5">
          {[wyr1, wyr2].map((tekst, i) => {
            const Ikona = ikony[i] || Users2;
            return (
              <div key={i} className="group rounded-3xl bg-white border border-[#146B5D]/20 p-6 hover:border-[#146B5D] hover:scale-[1.015] transition-all duration-200 shadow-sm">
                <Ikona className="hover-pulse w-7 h-7 text-[#C98A1F]" strokeWidth={1.6} />
                <p className="mt-3 text-sm text-[#1B2C28]/75 leading-relaxed">{tekst}</p>
              </div>
            );
          })}
        </StaggerReveal>

        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D3B32] via-[#123F35] to-[#0A2E27] text-[#FAF9F6] p-7 sm:p-11 border border-[#146B5D]/40 shadow-xl transition-all duration-500 hover:border-[#146B5D]/70 hover:shadow-2xl">
          <div className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#146B5D]/25 blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-60" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-[#C98A1F]/15 blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-40" />
          <div className="relative z-10 inline-block mb-5 transition-transform duration-500 group-hover:scale-105">
            <Quote className="w-10 h-10 text-[#C98A1F]/70 transition-colors duration-500 group-hover:text-[#C98A1F]" strokeWidth={1.3} />
          </div>
          <p className="relative z-10 font-serif text-lg sm:text-2xl leading-[1.5] text-[#FAF9F6] tracking-wide">{wyr3}</p>
        </div>
      </div>
    </section>
  );
}
