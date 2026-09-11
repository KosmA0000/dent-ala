import React from "react";
import { UserRound, Users2, Phone, Globe } from "lucide-react";
import { MaskedHeading, StaggerReveal } from "./Reveal";
import { rejestracja, clinic } from "../data/clinicData";

const ikony = [UserRound, Users2, Phone, Globe];

export default function RejestracjaSection() {
  return (
    <section id="rejestracja" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#146B5D]/[0.14]">
      <div className="max-w-5xl mx-auto">
        <div className="relative mb-10 sm:mb-14">
          <span aria-hidden="true" className="hidden md:block absolute -top-10 -right-4 lg:-right-10 font-serif text-[9rem] lg:text-[12rem] leading-none text-[#146B5D]/[0.07] select-none pointer-events-none">
            04
          </span>
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 max-w-3xl">
            <MaskedHeading className="font-serif font-medium text-[#0D3B32] tracking-[-0.03em] leading-[0.98] text-4xl sm:text-5xl lg:text-[4.6vw]">
              {rejestracja.tytul}
            </MaskedHeading>
          </div>
          <p className="relative mt-4 text-sm sm:text-base text-[#1B2C28]/70 max-w-2xl">{rejestracja.lead}</p>
        </div>

        <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-3.5">
          {rejestracja.kroki.map((krok, i) => {
            const Ikona = ikony[i] || UserRound;
            return (
              <div key={krok} className="group rounded-3xl bg-white border border-[#146B5D]/20 p-6 text-center hover:border-[#146B5D] hover:scale-[1.02] transition-all duration-200 shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-[#EAF4F1] text-[#146B5D] flex items-center justify-center mx-auto">
                  <Ikona className="hover-pulse w-5 h-5" strokeWidth={1.6} />
                </div>
                <p className="mt-3 text-sm text-[#1B2C28]/75 leading-relaxed">{krok}</p>
              </div>
            );
          })}
        </StaggerReveal>

        <div className="rounded-3xl bg-gradient-to-br from-[#0D3B32] via-[#123F35] to-[#0A2E27] text-[#FAF9F6] p-7 sm:p-11 border border-[#146B5D]/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF9F6] mb-2">{rejestracja.cta.tytul}</h3>
            <p className="text-[#FAF9F6]/75 text-sm sm:text-base max-w-xl">{rejestracja.cta.tekst}</p>
          </div>
          <a
            href={clinic.telefonHref}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#C98A1F] hover:bg-[#8F6109] text-white font-semibold text-sm shadow-lg hover:scale-[1.02] transition-all shrink-0"
          >
            <Phone size={18} /> Zadzwoń teraz
          </a>
        </div>
      </div>
    </section>
  );
}
