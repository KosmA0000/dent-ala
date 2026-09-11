import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Odpalanie animacji przez IntersectionObserver, nie ScrollTrigger — ScrollTrigger liczy
 * pozycje wzgledem dokumentu i przy sekcjach z transformami czesc triggerow nigdy sie
 * nie odpala, zostawiajac kafelki na opacity 0. IO patrzy na viewport.
 */
export function useInView(ref, play, deps = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            play(el);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function MaskedHeading({ children, className = "", as: Tag = "h2" }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (reduced() || !ref.current) return;
    gsap.set(ref.current.querySelectorAll(".reveal-line"), { yPercent: 120, opacity: 0 });
  }, []);
  useInView(ref, (el) =>
    gsap.fromTo(
      el.querySelectorAll(".reveal-line"),
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: "power4.out", clearProps: "transform" }
    )
  );
  return (
    <Tag ref={ref} className={`overflow-hidden py-2.5 -my-2.5 px-2 -mx-2 leading-[1.2] ${className}`}>
      <span className="block reveal-line pb-2 pt-1 leading-[1.2] will-change-transform">{children}</span>
    </Tag>
  );
}

export function StaggerReveal({ children, className = "", y = 34, stagger = 0.07 }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (reduced() || !ref.current) return;
    gsap.set(ref.current.children, { y, opacity: 0 });
  }, [y]);
  useInView(
    ref,
    (el) =>
      gsap.fromTo(
        el.children,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: Math.min(stagger, 0.85 / Math.max(1, el.children.length)),
          ease: "power3.out",
          clearProps: "transform",
        }
      ),
    [y, stagger]
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Zdjecie odslaniane kurtyna od dolu + dojazd skali (bez klasy hover:scale na tym samym elemencie). */
export function CurtainImageReveal({ src, alt = "", className = "", imgClassName = "" }) {
  const box = useRef(null);
  const img = useRef(null);
  useInView(box, (el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.inOut" }
    );
    if (img.current) gsap.fromTo(img.current, { scale: 1.25 }, { scale: 1, duration: 1.4, ease: "power3.out" });
  });
  return (
    <div ref={box} className={`relative overflow-hidden ${className}`}>
      <img ref={img} src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
    </div>
  );
}

export function FadeUp({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (reduced() || !ref.current) return;
    gsap.set(ref.current, { y: 26, opacity: 0 });
  }, []);
  useInView(
    ref,
    (el) =>
      gsap.fromTo(
        el,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay, ease: "power3.out", clearProps: "transform" }
      ),
    [delay]
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
