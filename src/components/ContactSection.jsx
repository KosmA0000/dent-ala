import React from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle2, FileText } from "lucide-react";
import { MaskedHeading, StaggerReveal } from "./Reveal";
import { clinic, kontakt, oNas } from "../data/clinicData";
import dokumentImg from "../assets/gallery/informacja-srodowisko.jpg";

export default function ContactSection() {
  const mapQuery = encodeURIComponent(kontakt.mapaQuery);

  return (
    <section id="kontakt" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F1F7F5]">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl bg-white border border-[#146B5D]/[0.14] p-6 shadow-sm flex gap-3 items-start mb-10 sm:mb-14">
          <FileText className="w-5 h-5 text-[#C98A1F] shrink-0 mt-0.5" strokeWidth={1.6} />
          <div>
            <p className="text-xs sm:text-sm text-[#1B2C28]/75 leading-relaxed">{oNas.dokumentSrodowiskowy.tekst}</p>
            <a
              href={dokumentImg}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs font-semibold uppercase tracking-wider text-[#146B5D] underline hover:text-[#C98A1F] transition-colors"
            >
              Zobacz dokument
            </a>
          </div>
        </div>

        <div className="relative mb-10 sm:mb-14">
          <span aria-hidden="true" className="hidden md:block absolute -top-10 -right-4 lg:-right-10 font-serif text-[9rem] lg:text-[12rem] leading-none text-[#146B5D]/[0.07] select-none pointer-events-none">
            05
          </span>
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 max-w-3xl">
            <MaskedHeading className="font-serif font-medium text-[#0D3B32] tracking-[-0.03em] leading-[0.98] text-4xl sm:text-5xl lg:text-[4.6vw]">
              {kontakt.tytul}
            </MaskedHeading>
          </div>
        </div>

        <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-3xl bg-[#0D3B32] text-[#FAF9F6] p-7 border border-[#146B5D]/40 shadow-lg flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#C98A1F]/20 text-[#C98A1F] flex items-center justify-center">
                <Phone className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#C98A1F] mt-5">Rejestracja telefoniczna</h3>
              <p className="text-xs text-[#FAF9F6]/70 mt-1 mb-4">Zadzwoń, aby ustalić dogodny termin wizyty:</p>
              <a
                href={clinic.telefonHref}
                className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.08] border border-white/10 hover:border-[#C98A1F] hover:bg-white/[0.14] transition-all group"
              >
                <span className="text-xs text-[#FAF9F6]/80">Telefon:</span>
                <span className="font-serif text-lg font-medium text-[#FAF9F6] group-hover:text-[#C98A1F] transition-colors tabular-nums">
                  {clinic.telefon}
                </span>
              </a>
              <p className="text-[11px] text-[#FAF9F6]/60 mt-2.5">
                Dodatkowo: {clinic.telefon2} · Prywatny Gabinet Ortodontyczny: {clinic.telefonOrto}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#FAF9F6]/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C98A1F] shrink-0" />
              <span>Szybka rezerwacja telefoniczna</span>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-[#146B5D]/25 p-7 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#EAF4F1] text-[#146B5D] flex items-center justify-center">
                <Clock className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#146B5D] mt-5">Godziny przyjęć</h3>
              <div className="grid gap-2 mt-3.5">
                {kontakt.godziny.map((g) => (
                  <div key={g.dni} className="rounded-2xl bg-[#F1F7F5] border border-[#146B5D]/[0.12] px-3.5 py-2.5">
                    <p className="text-xs text-[#1B2C28]/70">{g.dni}</p>
                    <p className="font-serif text-base text-[#0D3B32] font-medium tabular-nums mt-0.5">{g.zakres}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-[#146B5D]/[0.14] p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#EAF4F1] text-[#146B5D] flex items-center justify-center">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#146B5D] mt-5">E-mail</h3>
              <p className="text-xs sm:text-sm text-[#1B2C28]/80 mt-2 leading-relaxed">
                Napisz do nas wiadomość, odpiszemy najszybciej jak to możliwe.
              </p>
              <div className="mt-4">
                <a
                  href={"mailto:" + clinic.email}
                  className="block p-3 rounded-2xl bg-[#F1F7F5] border border-[#1B2C28]/10 hover:border-[#146B5D] transition-colors"
                >
                  <span className="block text-[10px] uppercase font-bold text-[#146B5D]">Adres:</span>
                  <span className="font-serif text-sm sm:text-base text-[#0D3B32] break-all">{clinic.email}</span>
                </a>
              </div>
            </div>
          </div>
        </StaggerReveal>

        <div className="mt-4 rounded-3xl bg-white border border-[#146B5D]/[0.14] p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#EAF4F1] text-[#146B5D] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#146B5D]">Adres gabinetu:</p>
              <address className="not-italic font-serif text-base sm:text-lg text-[#0D3B32] mt-0.5 leading-snug">
                {clinic.nazwaPelna}
                <br />
                {clinic.ulica}, {clinic.kod}
              </address>
            </div>
          </div>
          <a
            href={"https://www.google.com/maps?q=" + mapQuery}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#146B5D] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#0D3B32] transition-colors shrink-0 shadow-sm hover:scale-[1.02]"
          >
            Nawiguj w Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
