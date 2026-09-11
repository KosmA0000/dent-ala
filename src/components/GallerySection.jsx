import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { MaskedHeading } from "./Reveal";
import { galeria } from "../data/clinicData";

const images = import.meta.glob("../assets/gallery/galeria-*.jpg", { eager: true, import: "default" });
const imgs = Array.from({ length: galeria.liczbaZdjec }, (_, i) => {
  const key = `../assets/gallery/galeria-${String(i + 1).padStart(2, "0")}.jpg`;
  return images[key];
}).filter(Boolean);

// Karuzela typu "Circular Wheel" - identyczna mechanika co w referencji (cristaldent/
// byrska): 3 zestawy zdjec dla niekonczacego sie obrotu, start od srodkowego zestawu,
// cichy skok modulo, offset centrujacy aktywna karte w viewporcie.
function Wheel() {
  const track = useRef(null);
  const cardOffsetsRef = useRef([]);
  const N = imgs.length;
  const currentIndexRef = useRef(N);
  const isAnimatingRef = useRef(false);
  const [activeNum, setActiveNum] = useState(1);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const displayImgs = [...imgs, ...imgs, ...imgs];

  const measure = useCallback(() => {
    const t = track.current;
    if (!t || !t.children || t.children.length < N * 3) return;
    const viewportW = t.parentElement ? t.parentElement.clientWidth : window.innerWidth;
    const offs = [];
    for (let i = 0; i < t.children.length; i++) {
      const child = t.children[i];
      offs.push(child.offsetLeft + child.offsetWidth / 2 - viewportW / 2);
    }
    cardOffsetsRef.current = offs;
    const curr = currentIndexRef.current;
    if (offs[curr] !== undefined) gsap.set(t, { x: -offs[curr] });
  }, [N]);

  useLayoutEffect(() => {
    currentIndexRef.current = N;
    setActiveNum(1);
    measure();
    const raf = requestAnimationFrame(measure);
    const handleResize = () => measure();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    const els = track.current ? [...track.current.querySelectorAll("img")] : [];
    els.forEach((i) => i.addEventListener("load", measure));
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      els.forEach((i) => i.removeEventListener("load", measure));
    };
  }, [measure, N]);

  const nudge = useCallback(
    (dir) => {
      const t = track.current;
      const offs = cardOffsetsRef.current;
      if (!t || !offs.length || isAnimatingRef.current) return;
      gsap.killTweensOf(t);

      let curr = currentIndexRef.current;
      if (curr >= 2 * N) {
        curr -= N;
        gsap.set(t, { x: -offs[curr] });
      } else if (curr < N) {
        curr += N;
        gsap.set(t, { x: -offs[curr] });
      }

      const nextTarget = curr + dir;
      currentIndexRef.current = nextTarget;
      isAnimatingRef.current = true;
      const normalizedIdx = ((nextTarget % N) + N) % N;
      setActiveNum(normalizedIdx + 1);

      gsap.to(t, {
        x: -offs[nextTarget],
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => {
          if (nextTarget >= 2 * N) {
            const resetIdx = nextTarget - N;
            currentIndexRef.current = resetIdx;
            gsap.set(t, { x: -offs[resetIdx] });
          } else if (nextTarget < N) {
            const resetIdx = nextTarget + N;
            currentIndexRef.current = resetIdx;
            gsap.set(t, { x: -offs[resetIdx] });
          }
          isAnimatingRef.current = false;
        },
      });
    },
    [N]
  );

  const onTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 40;
    if (diff > threshold) nudge(1);
    else if (diff < -threshold) nudge(-1);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Poprzednie zdjęcie"
          className="group w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#146B5D]/35 text-[#146B5D] flex items-center justify-center hover:bg-[#146B5D] hover:text-white shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
        >
          <ArrowLeft className="hover-pulse w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#146B5D] font-semibold px-3.5 py-1.5 bg-white rounded-full border border-[#146B5D]/20 shadow-sm flex items-center gap-1.5">
          <span>{String(activeNum).padStart(2, "0")}</span>
          <span className="text-[#146B5D]/40">/</span>
          <span>{String(N).padStart(2, "0")}</span>
        </div>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Następne zdjęcie"
          className="group w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#146B5D]/35 text-[#146B5D] flex items-center justify-center hover:bg-[#146B5D] hover:text-white shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
        >
          <ArrowRight className="hover-pulse w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
      >
        <div ref={track} className="flex gap-4 sm:gap-6 md:gap-7 px-4 sm:px-10 w-max will-change-transform transform-gpu">
          {displayImgs.map((src, i) => (
            <figure
              key={`${src}-${i}`}
              className="shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-[#EAF4F1] border border-[#146B5D]/[0.14] shadow-sm w-[78vw] sm:w-[34vw] md:w-[27vw] max-w-[460px]"
            >
              <img
                src={src}
                alt="Zdjęcie z gabinetu Dent-Ala"
                loading={i >= N && i < 2 * N ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-[52vw] sm:h-[24vw] md:h-[19vw] max-h-[340px] min-h-[190px] object-contain bg-[#EAF4F1] filter brightness-[0.98] hover:scale-[1.03] transition-transform duration-500 ease-out pointer-events-none"
              />
            </figure>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-1.5 mt-5 px-4 flex-wrap">
        {imgs.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              const currentNorm = activeNum - 1;
              const diff = idx - currentNorm;
              if (diff !== 0) nudge(diff);
            }}
            aria-label={`Przejdź do zdjęcia ${idx + 1}`}
            className={"h-1.5 rounded-full transition-all duration-300 cursor-pointer " + (idx === activeNum - 1 ? "w-6 bg-[#146B5D]" : "w-1.5 bg-[#146B5D]/25 hover:bg-[#146B5D]/50")}
          />
        ))}
      </div>
    </div>
  );
}

export default function GallerySection() {
  return (
    <section id="galeria" className="relative py-14 sm:py-20 md:py-24 bg-[#F1F7F5] border-t border-[#146B5D]/[0.14] overflow-hidden select-none">
      <div className="w-full">
        <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-6 sm:mb-10 w-full">
          <div className="relative">
            <span aria-hidden="true" className="hidden md:block absolute -top-12 -right-4 lg:-right-10 font-serif text-[9rem] lg:text-[12rem] leading-none text-[#146B5D]/[0.06] select-none pointer-events-none">
              03
            </span>
            <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <MaskedHeading className="relative font-serif font-medium text-[#0D3B32] tracking-[-0.03em] leading-[0.94] text-4xl sm:text-5xl lg:text-[4.6vw]">
                Galeria
              </MaskedHeading>
            </div>
          </div>
        </div>

        <Wheel />
      </div>
    </section>
  );
}
