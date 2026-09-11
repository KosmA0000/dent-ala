import React from "react";
import { clinic, nav } from "../data/clinicData";

export default function Footer() {
  return (
    <footer className="bg-[#0D3B32] text-[#FAF9F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h5 className="font-serif text-lg mb-2">{clinic.nazwa}</h5>
            <p className="text-[#FAF9F6]/65 text-sm">
              {clinic.ulica}, {clinic.kod}
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#C98A1F] mb-2">Kontakt</h5>
            <p className="text-[#FAF9F6]/65 text-sm">
              <a href={clinic.telefonHref} className="hover:text-white transition-colors">
                {clinic.telefon}
              </a>
            </p>
            <p className="text-[#FAF9F6]/65 text-sm">
              <a href={"mailto:" + clinic.email} className="hover:text-white transition-colors">
                {clinic.email}
              </a>
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#C98A1F] mb-2">Nawigacja</h5>
            {nav.map((item) => (
              <p key={item.href}>
                <a href={item.href} className="text-[#FAF9F6]/65 text-sm hover:text-white transition-colors">
                  {item.label}
                </a>
              </p>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-5 text-xs text-[#FAF9F6]/50">{clinic.nazwaPelna}.</div>
      </div>
    </footer>
  );
}
