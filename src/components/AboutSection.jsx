import React, { useEffect, useRef, useState } from "react";
import { Quote, Users2, Stethoscope } from "lucide-react";
import { MaskedHeading, StaggerReveal } from "./Reveal";
import { oNas } from "../data/clinicData";
import kimJestesmyImg from "../assets/gallery/galeria-18.jpg";

const ikonyCech = [Users2, Stethoscope];

function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const val = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setP(val);
    };
    const schedule = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    const lenis = window.__lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", schedule);
      window.addEventListener("resize", schedule);
      return () => {
        lenis.off?.("scroll", schedule);
        window.removeEventListener("resize", schedule);
      };
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);
  return p;
}

function QuoteCard() {
  const [wyr1, wyr2, wyr3] = oNas.wyroznia;
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D3B32] via-[#123F35] to-[#0A2E27] text-[#FAF9F6] p-7 sm:p-11 border border-[#146B5D]/40 shadow-2xl max-w-2xl w-full">
      <div className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#146B5D]/25 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-[#C98A1F]/15 blur-3xl opacity-40" />

      <div className="relative z-10 inline-block mb-5">
        <Quote className="w-10 h-10 text-[#C98A1F]/70" strokeWidth={1.3} />
      </div>
      <p className="relative z-10 font-serif text-lg sm:text-2xl leading-[1.5] text-[#FAF9F6] tracking-wide">{wyr3}</p>

      <div className="relative z-10 grid sm:grid-cols-2 gap-3 mt-8">
        {[wyr1, wyr2].map((tekst, i) => {
          const Ikona = ikonyCech[i] || Users2;
          return (
            <div key={i} className="rounded-2xl bg-white/[0.06] border border-white/10 p-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-[#C98A1F] flex items-center justify-center">
                <Ikona className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <p className="text-xs text-[#FAF9F6]/75 leading-relaxed mt-3">{tekst}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TileGroup() {
  return (
    <div className="grid sm:grid-cols-3 gap-3.5 max-w-4xl w-full px-4">
      {oNas.akapity.map((p, i) => (
        <div key={i} className="rounded-3xl bg-white border border-[#146B5D]/20 p-6 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#146B5D]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-2.5 text-sm text-[#1B2C28]/80 leading-relaxed">{p}</p>
        </div>
      ))}
    </div>
  );
}

function DesktopStage() {
  const stageRef = useRef(null);
  const progress = useScrollProgress(stageRef);

  const overlayStart = 0.6;
  const pOverlay = Math.min(1, Math.max(0, (progress - overlayStart) / (1 - overlayStart)));

  // jedna grupa 3 kafelkow - zawsze widoczna od razu, blednie tylko przy
  // przejsciu do cytatu na koncu (tak samo jak w cristaldent)
  const headingOpacity = 1 - pOverlay;
  const tilesOpacity = 1 - pOverlay;

  const stageHeightVh = 260;

  return (
    <div ref={stageRef} style={{ height: `${stageHeightVh}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center gap-8 px-6 bg-[#F1F7F5]">
        <img
          src={kimJestesmyImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none select-none"
        />
        <h2
          style={{ opacity: headingOpacity }}
          className="relative font-serif font-medium text-[#0D3B32] tracking-[-0.03em] text-4xl sm:text-5xl text-center"
        >
          {oNas.tytul}
        </h2>

        <div className="relative" style={{ opacity: tilesOpacity }}>
          <TileGroup />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 bg-[#F1F7F5]"
          style={{ opacity: pOverlay, pointerEvents: pOverlay > 0.5 ? "auto" : "none" }}
        >
          <QuoteCard />
        </div>
      </div>
    </div>
  );
}

function MobileFallback() {
  const [wyr1, wyr2, wyr3] = oNas.wyroznia;
  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <MaskedHeading className="text-3xl sm:text-4xl font-serif font-medium text-[#0D3B32] tracking-tight">
            {oNas.tytul}
          </MaskedHeading>
        </div>

        <StaggerReveal className="grid sm:grid-cols-2 gap-3.5 mb-3.5">
          {oNas.akapity.map((p, i) => (
            <div key={i} className="rounded-3xl bg-white border border-[#146B5D]/20 p-6 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#146B5D]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2.5 text-sm text-[#1B2C28]/75 leading-relaxed">{p}</p>
            </div>
          ))}
        </StaggerReveal>

        <QuoteCard />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section id="o-nas" className="bg-[#F1F7F5] border-t border-[#146B5D]/[0.14]">
      {isDesktop ? <DesktopStage /> : <MobileFallback />}
    </section>
  );
}
