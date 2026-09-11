import React, { useRef, useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import gsap from "gsap";
import { clinic, hero } from "../data/clinicData";
import { useInView, MaskedHeading, FadeUp } from "./Reveal";
import heroImg from "../assets/gallery/galeria-28.jpg";

export default function Hero() {
  const sectionRef = useRef(null);
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);

  useInView(imgWrapRef, () => {
    gsap.fromTo(
      imgWrapRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power3.inOut" }
    );
    gsap.fromTo(imgRef.current, { scale: 1.55 }, { scale: 1.18, duration: 2.1, ease: "power3.out" });
  });

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reducedMotion || !finePointer) return;

    const xImg = gsap.quickTo(img, "x", { duration: 1, ease: "power3.out" });
    const yImg = gsap.quickTo(img, "y", { duration: 1, ease: "power3.out" });

    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      xImg(relX * -46);
      yImg(relY * -30);
    };

    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-start md:justify-center overflow-hidden bg-[#0D3B32]"
    >
      <div ref={imgWrapRef} className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          ref={imgRef}
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-75 sm:opacity-80"
          style={{ willChange: "transform" }}
        />
      </div>

      <div className="absolute -top-24 -right-24 w-[34rem] h-[34rem] rounded-full bg-[#146B5D]/25 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-[#C98A1F]/15 blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B32]/95 via-[#0D3B32]/55 to-[#0D3B32]/20" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:pt-28 sm:pb-20 max-w-6xl mx-auto">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C98A1F]/40 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C98A1F]">
            {hero.badge}
          </div>
        </FadeUp>

        <MaskedHeading
          as="h1"
          className="font-serif text-[10vw] sm:text-6xl md:text-[5.6vw] lg:text-[4.4vw] leading-[1.05] tracking-[-0.02em] text-[#FAF9F6] mt-5 sm:mt-6 max-w-4xl pb-1"
        >
          {hero.tytul}
        </MaskedHeading>

        <FadeUp delay={0.15} className="mt-6 sm:mt-7 grid sm:grid-cols-[auto_1fr] gap-3 max-w-3xl">
          <div className="flex flex-col gap-3">
            <a
              href={clinic.telefonHref}
              className="group rounded-3xl bg-[#146B5D] hover:bg-[#0D453B] text-white transition-all duration-300 p-5 sm:p-6 flex flex-col justify-center items-start gap-2 min-w-0 shadow-lg hover:shadow-xl hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#C98A1F]">
                <Phone className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Rejestracja telefoniczna</span>
              </div>
              <span className="font-serif text-xl sm:text-2xl text-white leading-tight tabular-nums font-medium">
                {clinic.telefon}
              </span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={"mailto:" + clinic.email}
                className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#C98A1F] transition-colors p-3.5 flex items-center gap-2 min-w-0"
              >
                <Mail className="w-4 h-4 text-[#C98A1F] shrink-0" strokeWidth={1.6} />
                <span className="text-xs text-[#FAF9F6]/90 truncate">{clinic.email}</span>
              </a>

              <a
                href="#kontakt"
                className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#C98A1F] transition-colors p-3.5 flex items-center gap-2 min-w-0"
              >
                <MapPin className="w-4 h-4 text-[#C98A1F] shrink-0" strokeWidth={1.6} />
                <span className="text-xs text-[#FAF9F6]/90 truncate">{hero.lokalizacjaKrotko}</span>
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-6">
            <div className="mb-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#C98A1F] font-semibold">{hero.tagline}</p>
            </div>
            <div className="grid gap-2">
              <div className="rounded-2xl bg-[#0D3B32]/50 border border-white/10 px-3.5 py-2.5 text-[13px] text-[#FAF9F6]/90 leading-snug">
                {clinic.opisKrotki}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
