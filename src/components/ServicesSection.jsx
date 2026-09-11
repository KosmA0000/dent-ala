import React, { useState, useRef, useLayoutEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { MaskedHeading } from "./Reveal";
import { zakres } from "../data/clinicData";
import zakresBg from "../assets/gallery/galeria-25.jpg";

function useAccordionScrollLock(openIndex) {
  const btnRefs = useRef([]);
  const pendingRef = useRef(null);
  const toggle = (idx, setOpenIndex) => {
    const btn = btnRefs.current[idx];
    pendingRef.current = { idx, beforeTop: btn ? btn.getBoundingClientRect().top : null };
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };
  useLayoutEffect(() => {
    const pending = pendingRef.current;
    pendingRef.current = null;
    if (!pending || pending.beforeTop == null) return;
    const btn = btnRefs.current[pending.idx];
    if (!btn) return;
    const delta = btn.getBoundingClientRect().top - pending.beforeTop;
    if (delta !== 0) window.scrollBy(0, delta);
  }, [openIndex]);
  return { btnRefs, toggle };
}

function ItemGrid({ items }) {
  return (
    <div className="grid sm:grid-cols-2 gap-2.5">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white border border-[#1B2C28]/[0.10] p-3 sm:p-3.5 flex items-start gap-2.5 shadow-sm hover:border-[#146B5D]/40 hover:shadow-md transition-all"
        >
          <div className="w-5 h-5 rounded-full bg-[#EAF4F1] text-[#146B5D] flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-3 h-3" strokeWidth={2.5} />
          </div>
          <span className="text-xs sm:text-sm text-[#1B2C28]/85 font-medium leading-snug">{item}</span>
        </div>
      ))}
    </div>
  );
}

function ZakresAkordeon() {
  const [openIndex, setOpenIndex] = useState(0);
  const { btnRefs, toggle } = useAccordionScrollLock(openIndex);
  const pozycje = zakres.kategorie;

  return (
    <div className="space-y-3.5">
      {pozycje.map((p, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={p.nazwa}
            className={
              "rounded-3xl border transition-all duration-300 overflow-hidden bg-white " +
              (isOpen ? "border-[#146B5D] shadow-lg ring-1 ring-[#146B5D]/20" : "border-[#1B2C28]/[0.12] shadow-sm hover:border-[#146B5D]/50 hover:scale-[1.012] hover:shadow-md")
            }
            style={{ contain: "layout paint" }}
          >
            <button
              ref={(el) => (btnRefs.current[idx] = el)}
              onClick={() => toggle(idx, setOpenIndex)}
              aria-expanded={isOpen}
              className="group w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#146B5D]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif font-bold text-base sm:text-xl text-[#0D3B32] mt-0.5 leading-snug pb-0.5">{p.nazwa}</h3>
              </div>
              <div
                className={
                  "hover-pulse w-8 h-8 rounded-full flex items-center justify-center border shrink-0 transition-transform duration-350 " +
                  (isOpen ? "bg-[#0D3B32] text-[#FAF9F6] border-[#0D3B32] rotate-180" : "bg-[#F1F7F5] text-[#1B2C28]/60 border-[#1B2C28]/15")
                }
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <div className={"grid " + (isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden min-h-0">
                <div
                  className={
                    "px-4 pb-6 sm:px-6 sm:pb-8 pt-4 border-t border-[#1B2C28]/[0.10] bg-[#F1F7F5] transition-[opacity,transform] duration-300 ease-out " +
                    (isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5")
                  }
                >
                  {p.pozycje && <ItemGrid items={p.pozycje} />}
                  {p.blocks &&
                    p.blocks.map((b, bi) => (
                      <div key={bi} className={bi > 0 ? "mt-3.5" : ""}>
                        {b.intro &&
                          b.intro.map((t, ti) => (
                            <div key={ti} className="rounded-2xl bg-white border border-[#1B2C28]/[0.10] p-4 sm:p-5 mb-3.5">
                              <p className="text-[#1B2C28]/80 text-xs sm:text-sm leading-relaxed">{t}</p>
                            </div>
                          ))}
                        {b.podtytul && (
                          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#146B5D] mb-2.5">{b.podtytul}</h4>
                        )}
                        {b.pozycje && <ItemGrid items={b.pozycje} />}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="zakres-uslug" className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#146B5D]/[0.14]">
      <div
        className="absolute inset-x-0 top-0 h-[420px] sm:h-[520px] lg:h-[600px] pointer-events-none select-none overflow-hidden"
        style={{ transform: "translateZ(0)", willChange: "transform", contain: "paint" }}
      >
        <img
          src={zakresBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-35 sm:opacity-45 object-center pointer-events-none"
          style={{ transform: "translateZ(0)" }}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/45 to-white" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="relative mb-10 sm:mb-14">
          <span aria-hidden="true" className="hidden md:block absolute -top-10 -right-4 lg:-right-10 font-serif text-[9rem] lg:text-[12rem] leading-none text-[#146B5D]/[0.07] select-none pointer-events-none">
            02
          </span>
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 max-w-3xl">
            <MaskedHeading className="font-serif font-medium text-[#0D3B32] tracking-[-0.03em] leading-[0.98] text-4xl sm:text-5xl lg:text-[4.6vw]">
              {zakres.tytul}
            </MaskedHeading>
          </div>
          <p className="relative mt-4 text-sm sm:text-base text-[#1B2C28]/70 max-w-2xl">{zakres.lead}</p>
        </div>
        <ZakresAkordeon />
      </div>
    </section>
  );
}
