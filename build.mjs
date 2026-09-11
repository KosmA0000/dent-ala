import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'site', 'index.html');

const css = `
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;900&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');

:root{
  --primary:#146B5D;
  --primary-ink:#0D453B;
  --secondary:#4FA394;
  --accent:#C98A1F;
  --accent-ink:#8F6109;
  --background:#FFFFFF;
  --tint:#F1F7F5;
  --surface:#FFFFFF;
  --foreground:#1B2C28;
  --muted:#4F6B63;
  --muted-bg:#EAF4F1;
  --border:#D3E6E1;
  --ring:#146B5D;
  --radius:14px;
  --shadow:0 10px 40px -12px rgba(13,69,59,.18);
  --font-display:'Lexend',system-ui,sans-serif;
  --font-body:'Source Sans 3',system-ui,sans-serif;
}

*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;background:var(--background);color:var(--foreground);
  font-family:var(--font-body);line-height:1.6;font-size:16px;
  -webkit-tap-highlight-color:transparent;
}
html.js body{cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M4 2 L4 20 L9 15.5 L12.5 22 L15 20.5 L11.5 14 L19 14 Z' fill='%23146B5D' stroke='white' stroke-width='1.2'/%3E%3C/svg%3E") 4 2, auto !important;}
@media (hover:hover) and (pointer:fine){
  html.js a, html.js button, html.js summary, html.js input, html.js textarea{
    cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='9' fill='%23C98A1F' fill-opacity='.85' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E") 17 17, pointer !important;
  }
}
img{max-width:100%;display:block}
a{color:inherit}
h1,h2,h3,h4{font-family:var(--font-display);margin:0;letter-spacing:-.01em}
p{margin:0 0 1em}
ul,ol{margin:0 0 1em;padding-left:1.2em;color:var(--muted)}
li{margin-bottom:.3em}
.container{width:min(1120px,92%);margin-inline:auto}
.skip-link{position:absolute;left:-999px;top:0;background:var(--primary);color:#fff;padding:.75em 1.25em;z-index:200;border-radius:0 0 8px 0}
.skip-link:focus{left:0}
:focus-visible{outline:3px solid var(--primary);outline-offset:2px}

.progress-bar{position:fixed;top:0;left:0;height:3px;width:100%;background:linear-gradient(90deg,var(--primary),var(--accent));transform:scaleX(0);transform-origin:0 0;z-index:100;transition:transform .05s linear}

header.site{position:sticky;top:0;z-index:90;background:rgba(255,255,255,.97);border-bottom:1px solid var(--border);transition:padding .25s ease,box-shadow .25s ease}
header.site .bar{display:flex;align-items:center;justify-content:space-between;padding:18px 0;transition:padding .25s ease}
header.site.is-scrolled .bar{padding:10px 0}
header.site.is-scrolled{box-shadow:0 4px 24px -8px rgba(13,69,59,.15)}
.brand{display:flex;align-items:center;gap:.6em;font-family:var(--font-display);font-weight:700;font-size:1.02rem;color:var(--primary-ink);text-decoration:none;line-height:1.15}
.brand .mark{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;color:#fff;flex:0 0 auto;transition:width .25s ease,height .25s ease}
header.site.is-scrolled .brand .mark{width:30px;height:30px}
nav.main{display:flex;gap:1.4em;list-style:none;margin:0;padding:0}
nav.main a{text-decoration:none;font-size:.92rem;font-weight:500;color:var(--muted);padding:.3em 0;border-bottom:2px solid transparent;transition:color .2s ease,border-color .2s ease;white-space:nowrap}
nav.main a:hover,nav.main a.active{color:var(--primary-ink);border-color:var(--accent)}
.nav-wrap{display:flex;align-items:center;gap:1.6em}
.call-pill{display:inline-flex;align-items:center;gap:.5em;background:var(--accent-ink);color:#fff;padding:.55em 1.1em;border-radius:999px;font-weight:600;font-size:.9rem;text-decoration:none;white-space:nowrap;transition:background .2s ease,transform .2s ease}
.call-pill:hover{background:var(--primary-ink);transform:translateY(-1px)}
.menu-toggle{display:none}

section{padding:clamp(3.5rem,7vw,6.5rem) 0;position:relative}
section.tint{background:var(--tint)}
.eyebrow{display:inline-block;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent-ink);font-weight:700;margin-bottom:.9em}
h2.section-title{font-size:clamp(1.7rem,3.4vw,2.5rem);font-weight:700;color:var(--primary-ink);margin-bottom:.5em}
.lede{font-size:1.08rem;color:var(--muted);max-width:66ch}

.hero{position:relative;overflow:clip;padding-top:clamp(3rem,8vw,6rem)}
.hero-blob{position:absolute;top:-140px;right:-160px;width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle at 30% 30%,var(--secondary),transparent 70%);opacity:.3;filter:blur(10px);pointer-events:none;z-index:0}
.hero-grid{position:relative;z-index:1;display:grid;grid-template-columns:1.1fr .9fr;gap:3rem;align-items:center}
.hero h1{font-size:clamp(2.1rem,4.4vw,3.2rem);color:var(--primary-ink);line-height:1.1;margin-bottom:.4em}
.hero .tagline{color:var(--accent-ink);font-weight:600;font-size:1.05rem;margin-bottom:1em}
.hero p.intro{color:var(--muted);font-size:1.05rem;max-width:58ch}
.hero-ctas{display:flex;gap:.9em;margin-top:1.6em;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:.5em;padding:.85em 1.5em;border-radius:10px;font-weight:600;text-decoration:none;font-size:.98rem;transition:transform .2s ease,box-shadow .2s ease,background .2s ease;border:2px solid transparent;touch-action:manipulation}
.btn-primary{background:var(--accent-ink);color:#fff}
.btn-primary:hover{background:var(--primary-ink);transform:translateY(-2px);box-shadow:var(--shadow)}
.btn-ghost{border-color:var(--border);color:var(--primary-ink);background:#fff}
.btn-ghost:hover{border-color:var(--primary);transform:translateY(-2px)}
.hero-photo{position:relative;border-radius:22px;overflow:hidden;box-shadow:var(--shadow)}
.hero-photo img{width:100%;height:420px;object-fit:cover}
.hero-badges{display:flex;gap:1.6rem;margin-top:2.4rem;flex-wrap:wrap}
.hero-badge{font-size:.85rem;color:var(--muted);max-width:220px;padding-left:1.1em;border-left:3px solid var(--accent)}

.mobile-callbar{display:none;position:fixed;bottom:0;left:0;right:0;z-index:95;background:var(--primary-ink);color:#fff;padding:.85em 1em;text-align:center;font-weight:600;text-decoration:none;font-size:.98rem;box-shadow:0 -6px 20px rgba(0,0,0,.15)}

.reveal{opacity:1;transform:none}
html.js .reveal{opacity:0;transform:translateY(16px)}
html.js .reveal.in{opacity:1;transform:none;transition:opacity .5s ease,transform .5s ease}
html.js .reveal.dir-l{transform:translateX(-24px)}
html.js .reveal.dir-l.in{transform:none}
html.js .reveal.dir-r{transform:translateX(24px)}
html.js .reveal.dir-r.in{transform:none}
.scrollcard{--p:0}
html.js .scrollcard{opacity:calc(1 - var(--p,0)*.6);transform:scale(calc(1 - var(--p,0)*.06))}

.highlights{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem}
.highlight-card{background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:1.6rem;box-shadow:var(--shadow)}
.highlight-card svg{color:var(--accent-ink);margin-bottom:.7em}
.highlight-card p{color:var(--muted);margin:0;font-size:.95rem}

.split{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
.split img{border-radius:var(--radius);box-shadow:var(--shadow);width:100%;height:320px;object-fit:cover}

.notice-box{display:flex;gap:1em;align-items:flex-start;background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:1.4em;margin-top:1.6em;box-shadow:var(--shadow)}
.notice-box svg{flex:0 0 auto;color:var(--accent-ink);margin-top:.2em}
.notice-box a{color:var(--primary);font-weight:700;text-decoration:underline}

.accordion-group{border-top:1px solid var(--border)}
details.accordion{border-bottom:1px solid var(--border)}
details.accordion summary{list-style:none;cursor:pointer;padding:1.15em .2em;display:flex;align-items:center;justify-content:space-between;gap:1em;font-family:var(--font-display);font-weight:600;color:var(--primary-ink);touch-action:manipulation}
details.accordion summary::-webkit-details-marker{display:none}
.accordion-title{font-size:1.02rem}
.accordion-ico{flex:0 0 auto;transition:transform .25s ease;color:var(--accent-ink)}
details.accordion[open] .accordion-ico{transform:rotate(90deg)}
.accordion-body{padding:0 .2em 1.4em;color:var(--muted);animation:fadein .3s ease}
.accordion-body p{margin:0 0 .5em}
@keyframes fadein{from{opacity:0}to{opacity:1}}

.gallery-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:.9rem}
.gallery-item{border-radius:12px;overflow:hidden;position:relative;box-shadow:var(--shadow)}
.gallery-item img{width:100%;height:150px;object-fit:cover;transition:transform .4s ease}
.gallery-item:hover img{transform:scale(1.06)}

.reg-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem;margin-top:1.6em}
.reg-step{background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;text-align:center;box-shadow:var(--shadow)}
.reg-step .num{width:36px;height:36px;border-radius:50%;background:var(--tint);color:var(--primary-ink);display:flex;align-items:center;justify-content:center;font-weight:700;font-family:var(--font-display);margin:0 auto .8em}
.reg-step p{margin:0;color:var(--muted);font-size:.92rem}

.cta-band{background:linear-gradient(120deg,var(--primary-ink),var(--primary));color:#fff;border-radius:20px;padding:clamp(2rem,5vw,3.5rem);display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap}
.cta-band h3{font-size:clamp(1.4rem,2.6vw,1.9rem);margin-bottom:.3em}
.cta-band p{color:rgba(255,255,255,.85);margin:0}
.cta-band .btn-primary{background:var(--accent-ink)}
.cta-band .btn-primary:hover{background:#fff;color:var(--primary-ink)}

.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem}
.contact-card{background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:2rem;box-shadow:var(--shadow)}
.contact-row{display:flex;gap:.9em;margin-bottom:1.2em;align-items:flex-start}
.contact-row svg{flex:0 0 auto;color:var(--accent-ink);margin-top:.15em}
.contact-row strong{display:block;color:var(--primary-ink);font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin-bottom:.2em}
.hours-table{width:100%;border-collapse:collapse;margin-top:.6em}
.hours-table td{padding:.4em 0;border-bottom:1px dashed var(--border);color:var(--muted);font-size:.94rem}
.hours-table td:last-child{text-align:right;font-weight:600;color:var(--primary-ink)}
.map-cta{display:flex;align-items:center;justify-content:center;background:var(--tint);border:1px solid var(--border);border-radius:var(--radius);min-height:260px;text-align:center;padding:2rem}
.map-cta a{color:var(--primary);font-weight:700;text-decoration:underline}

footer.site{background:var(--primary-ink);color:#fff;padding:3rem 0 2rem}
footer.site .foot-grid{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:2rem;margin-bottom:2rem}
footer.site h5{font-family:var(--font-display);font-size:.95rem;margin-bottom:.8em;color:#fff}
footer.site p, footer.site a{color:rgba(255,255,255,.75);text-decoration:none;font-size:.92rem}
footer.site a:hover{color:#fff}
footer.site .foot-bottom{border-top:1px solid rgba(255,255,255,.15);padding-top:1.4em;font-size:.82rem;color:rgba(255,255,255,.6);display:flex;justify-content:space-between;flex-wrap:wrap;gap:.5em}

@media (max-width:860px){
  nav.main{position:fixed;inset:64px 0 0 0;background:#fff;flex-direction:column;padding:2rem 1.4rem;gap:1.4rem;transform:translateX(100%);transition:transform .3s ease;overflow-y:auto}
  nav.main.open{transform:translateX(0)}
  nav.main a{font-size:1.1rem}
  .nav-wrap .call-pill{display:none}
  .menu-toggle{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:8px;border:1px solid var(--border);background:#fff}
  .hero-grid{grid-template-columns:1fr}
  .hero-photo img{height:260px}
  .highlights{grid-template-columns:1fr}
  .split{grid-template-columns:1fr;gap:1.5rem}
  .contact-grid{grid-template-columns:1fr}
  footer.site .foot-grid{grid-template-columns:1fr;gap:1.6rem}
  .reg-steps{grid-template-columns:1fr 1fr}
  body{padding-bottom:60px}
  .mobile-callbar{display:block}
}

@media (prefers-reduced-motion: reduce){
  *{animation:none !important;transition:none !important}
  html.js .reveal{opacity:1 !important;transform:none !important}
  .scrollcard{opacity:1 !important;transform:none !important}
  html{scroll-behavior:auto}
}
`;

// ---------- copy deck (1:1 from dent-ala.pl) ----------
const phone1 = '41 275 65 60';
const phone2 = '792 704 760';
const phoneOrto = '604 137 059';
const phoneHref = 'tel:+48412756560';
const email = 'dent-ala@outlook.com';
const mapHref = 'https://maps.google.pl/maps?ie=UTF8&cid=4522754522977201912&q=Specjalistyczna+Przychodnia+Stomatologiczna+Dent-Ala&gl=PL&hl=pl&t=m&ll=51.041367,21.083815&spn=0.004722,0.013368&z=16&iwloc=A&source=embed';

function icon(name){
  const icons = {
    tooth:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3c-2.2 0-3 1.2-4.5 1.2S5 3 3.7 3.7C2.3 4.4 2 6.2 2.3 8c.4 2.3 1.7 3 1.9 5.6.2 2.7 1 6.4 2.6 6.4 1.7 0 1.5-4.5 2.6-4.5s.9 4.5 2.6 4.5c1.6 0 2.4-3.7 2.6-6.4.2-2.6 1.5-3.3 1.9-5.6.3-1.8 0-3.6-1.4-4.3C15 3 14.2 4.2 12 3Z"/></svg>`,
    users:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    heart:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6Z"/></svg>`,
    phone:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8 10.3a16 16 0 0 0 6 6l1.5-1.5a2 2 0 0 1 2-.5c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2Z"/></svg>`,
    mail:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>`,
    pin:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    clock:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    chevron:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m9 6 6 6-6 6"/></svg>`,
    doc:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>`,
    person:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>`,
    call:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8 10.3a16 16 0 0 0 6 6l1.5-1.5a2 2 0 0 1 2-.5c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2Z"/></svg>`,
    globe:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"/></svg>`,
  };
  return icons[name] || '';
}

function accordion(id, title, bodyHtml, groupName){
  return `<details class="accordion" name="${groupName}"${id==='first'?' open':''}>
    <summary><span class="accordion-title">${title}</span><span class="accordion-ico">${icon('chevron')}</span></summary>
    <div class="accordion-body">${bodyHtml}</div>
  </details>`;
}

function ul(items){ return `<ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul>`; }

const services = [
  ['Higiena i Profilaktyka', [
    'Indywidualny instruktaż higieny jamy ustnej',
    'Lakowanie',
    'Lakierowanie',
    'Leczenie nadwrażliwości zębów',
    'Piaskowanie',
    'Scaling (usunięcie kamienia nazębnego)',
    'Wybielanie zębów',
  ]],
  ['Stomatologia zachowawcza', [
    'Wypełnienia kompozytowe',
    'Wypełnienia glassjonomerowe',
    'Odbudowa estetyczna zęba',
    'Odbudowa na włóknie szklanym',
  ]],
  ['Pedodoncja', [
    'Wizyty adaptacyjne',
    'Profilaktyczne świadczenia stomatologiczne dla dzieci i młodzieży do 18 r. życia',
    'Wypełnienia kompozytowe w zębach mlecznych i stałych',
    'Wypełnienia kompozytowe kolorowe',
  ]],
  ['Endodoncja', [
    'Leczenie zapaleń miazgi odwracalnych – leczenie biologiczne miazgi',
    'Leczenie zapaleń nieodwracalnych miazgi',
    'Leczenie martwicy i zgorzeli miazgi',
    'Leczenie zapaleń tkanek okołowierzchołkowych',
    'Rewizja leczenia kanałowego – ponowne leczenie endodontyczne',
    'Wypełnianie kanałów',
  ]],
  ['Chirurgia stomatologiczna', [
    'Ekstrakcja zębów stałych oraz mlecznych',
    'Wyłuszczenie torbieli',
    'Chirurgia przyzębia – wycięcie kieszonki dziąsłowej, plastyka wędzidełka wargi lub języka',
    'Nacięcie ropnia',
  ]],
  ['Protetyka', [
    'Korony porcelanowe oraz kompozytowe',
    'Korony pełnoceramiczne',
    'Mosty porcelanowe oraz kompozytowe',
    'Wkłady koronowo-korzeniowe',
    'Wkłady koronowo–korzeniowe z włókna szklanego',
    'Inlay kompozytowy i porcelanowy – wkłady do wypełniania ubytków',
    'Protezy osiadające częściowe, całkowite, natychmiastowe',
    'Protezy nylonowe',
    'Protezy acetalowe',
    'Mikroportezy do 3 zębów',
    'Naprawa protezy',
    'Podścielenie protezy',
    'Proteza szkieletowa',
    'Szynoproteza',
    'Szyna relaksacyjna',
  ]],
  ['Ortodoncja', null],
  ['Rentgenodiagnostyka stomatologiczna', [
    'Zdjęcie RTG wewnątrzustne',
    'Standardowa ekspozycja panoramiczna',
    'Pediatryczna ekspozycja panoramiczna',
    'Ulepszona ekspozycja panoramiczna Ortho Zone',
    'Ekspozycja ortogonalna',
    'Szeroko łukowa ekspozycja panoramiczna',
    'Widok boczny czaszkowo–rdzeniowy',
    'Widok boczny',
    'Widok czaszkowy tylno–przedni (PA)',
    'Odwrotna projekcja Towen\'a',
    'Projekcja Watersa',
    'Ekspozycja obrazów nadgarstka (uchwyt opcjonalny)',
    'Ekspozycja skrzydłowo–zgryzowa',
    'TMJ (staw skroniowo–żuchwowy) widok boczny',
    'Ortho TMJ (staw skroniowo–żuchwowy) widok boczny korygowany osiowo',
    'TMJ (staw skroniowo–żuchwowy) widok tylno–przedni',
    'Widok zatok szczękowych',
  ]],
];

const ortoBody = `
  <p>Badanie narządu żucia dziecka w czasie wzrostu i rozwoju. Zapobieganie morfologicznym i czynnościowym zaburzeniom narządu żucia. Leczenie zaburzeń w obrębie narządu żucia u dzieci i dorosłych.</p>
  <p><strong>Aparaty ruchome (wyjmowane):</strong></p>
  ${ul(['Aparaty dwuszczękowe','Aparaty jednoszczękowe','Aparaty miofunkcyjne','Aparaty do leczenia zaburzeń i dysfunkcji stawu skroniowo-żuchwowego, leczenie nawyków, dysfunkcji języka, bruksizmu'])}
  <p><strong>Aparaty stałe:</strong></p>
  ${ul([
    'Metalowe (również bezniklowe) w technikach łuku prostego',
    'Aparaty kosmetyczne-porcelanowe',
    'Aparaty stałe (metal+porcelana) w technice DAMONA dające doskonałe rezultaty w krótkim czasie i małej częstotliwości wizyt kontrolnych (również u pacjentów dorosłych)',
    'Łuki podniebienne i językowe (Hyrax, Rotator, Expander, Quod-helix, Bihelix, Twin-Force i in.)',
    'Aparaty lingwalne',
  ])}
`;

// gallery image dimensions (real, from source files)
const galDims = {1:[768,838],2:[1024,768],3:[1024,768],4:[768,1024],5:[1024,768],6:[768,1024],7:[1024,768],8:[768,1024],9:[768,1024],10:[1024,768],11:[1024,768],12:[1024,768],13:[1024,768],14:[1024,768],15:[1024,768],16:[1024,768],17:[1024,768],18:[1024,768],19:[1024,768],20:[1024,768],21:[1024,768],22:[1024,768],23:[768,1024],24:[1024,768],25:[1024,768],26:[1024,768],27:[1024,768],28:[1024,768],29:[1024,768],30:[1024,768],31:[1024,768],32:[1024,768],33:[1024,768],34:[1024,768],35:[768,1024],36:[1024,768],37:[1024,768],38:[1024,768],39:[1024,768],40:[1024,768],41:[1024,768],42:[1024,768],43:[1024,768],44:[1024,768],45:[943,768]};

const html = `<!doctype html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<script>document.documentElement.className+=' js'</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dentysta Starachowice — Dent-Ala Gabinet Stomatologiczny</title>
<meta name="description" content="Niepubliczny Zakład Opieki Zdrowotnej Dent-Ala w Starachowicach — ortodoncja, chirurgia stomatologiczna, protetyka, pedodoncja, stomatologia ogólna. ul. Spółdzielcza 21. Rejestracja: 41 275 65 60.">
<meta name="theme-color" content="#146B5D">
<meta name="color-scheme" content="light">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<style>${css}</style>
</head>
<body>
<a href="#main-content" class="skip-link">Przejdź do treści</a>
<div class="progress-bar" id="progressBar"></div>

<header class="site" id="siteHeader">
  <div class="container bar">
    <a href="#hero" class="brand"><span class="mark">${icon('tooth')}</span>Dent-Ala<br>Gabinet Stomatologiczny</a>
    <div class="nav-wrap">
      <nav class="main" id="mainNav">
        <a href="#o-nas">O nas</a>
        <a href="#zakres-uslug">Zakres usług</a>
        <a href="#galeria">Galeria</a>
        <a href="#rejestracja">Rejestracja</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
      <a class="call-pill" href="${phoneHref}">${icon('phone')} ${phone1}</a>
      <button class="menu-toggle" id="menuToggle" aria-label="Otwórz menu" aria-expanded="false" aria-controls="mainNav">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
</header>

<main id="main-content">

<section class="hero" id="hero">
  <div class="hero-blob" id="heroBlob"></div>
  <div class="container hero-grid">
    <div class="reveal dir-l">
      <span class="eyebrow">Dentysta Starachowice</span>
      <h1>Dent-Ala Gabinet Stomatologiczny</h1>
      <p class="tagline">Niepubliczny Zakład Opieki Zdrowotnej — ponad 18 lat doświadczenia</p>
      <p class="intro">Niepubliczny Zakład Opieki Zdrowotnej „Dent-Ala” istnieje ponad 18 lat, jednak swe doświadczenie opiera na ponad pięćdziesięcioletniej działalności stomatologicznej w prywatnym gabinecie.</p>
      <p class="intro">Personel naszej przychodni tworzy zespół lekarzy stomatologów specjalistów w dziedzinie ortodoncji, chirurgii stomatologicznej, protetyki stomatologicznej, pedodoncji, stomatologii ogólnej, radiolog, higienistki oraz asystentki stomatologiczne.</p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="${phoneHref}">${icon('phone')} Zadzwoń: ${phone1}</a>
        <a class="btn btn-ghost" href="#rejestracja">Rejestracja</a>
      </div>
      <div class="hero-badges">
        <div class="hero-badge">Ponad 18 lat NZOZ Dent-Ala</div>
        <div class="hero-badge">Zespół specjalistów: ortodoncja, chirurgia, protetyka, pedodoncja</div>
        <div class="hero-badge">Profesjonalne unity z kamerami, mikromotor endodontyczny, pantomograf</div>
      </div>
    </div>
    <div class="hero-photo reveal dir-r" data-parallax="0.08">
      <img src="img/galeria-10.jpg" alt="Gabinet stomatologiczny Dent-Ala" width="1024" height="768" fetchpriority="high">
    </div>
  </div>
</section>

<section class="tint" id="o-nas">
  <div class="container">
    <span class="eyebrow reveal">O nas</span>
    <h2 class="section-title reveal">Kim jesteśmy</h2>
    <div class="split">
      <div class="reveal dir-l">
        <p>Niepubliczny Zakład Opieki Zdrowotnej „Dent- Ala” istnieje ponad 18 lat, jednak swe doświadczenie opiera na ponad pięćdziesięcioletniej działalności stomatologicznej w prywatnym gabinecie. Personel naszej przychodni tworzy zespół lekarzy stomatologów specjalistów w dziedzinie ortodoncji, chirurgii stomatologicznej, protetyki stomatologicznej, pedodoncji, stomatologii ogólnej, radiolog, higienistki oraz asystentki stomatologiczne. Oferujemy Państwu wiedzę specjalistyczną w wyżej wymienionych gałęziach stomatologii. Możliwość objęcia pacjentów kompleksową opieką zagwarantowana jest również poprzez wysokospecjalistyczny sprzęt: profesjonalne unity stomatologiczne z kamerami, piaskarki, skalery, ssaki, mikromotor endodontyczny, lupy oraz pantomograf.</p>
        <p>Dbając o Państwa piękny uśmiech dokładamy wszelkich starań aby zabiegi przebiegały bezboleśnie i w miłej atmosferze.</p>
        <div class="notice-box">
          ${icon('doc')}
          <div>
            <p style="margin:0">Informacja o wpływie działalności wykonywanej przez jednostkę organizacyjną na zdrowie ludzi i na środowisko w Irmina Gralec Niepubliczny Zakład Opieki Zdrowotnej "Dent-Ala":</p>
            <a href="img/informacja-srodowisko.jpg" target="_blank" rel="noopener">Zobacz dokument</a>
          </div>
        </div>
      </div>
      <img class="reveal dir-r" src="img/galeria-02.jpg" alt="Wnętrze przychodni Dent-Ala" width="1024" height="768" loading="lazy">
    </div>
    <div class="highlights" style="margin-top:3rem">
      <div class="highlight-card reveal scrollcard">${icon('users')}<p>Zespół lekarzy specjalistów: ortodoncja, chirurgia stomatologiczna, protetyka, pedodoncja, stomatologia ogólna, radiolog</p></div>
      <div class="highlight-card reveal scrollcard" style="transition-delay:80ms">${icon('tooth')}<p>Profesjonalne unity stomatologiczne z kamerami, piaskarki, skalery, ssaki, mikromotor endodontyczny, lupy oraz pantomograf</p></div>
      <div class="highlight-card reveal scrollcard" style="transition-delay:160ms">${icon('heart')}<p>Zabiegi przebiegające bezboleśnie i w miłej atmosferze</p></div>
    </div>
  </div>
</section>

<section id="zakres-uslug">
  <div class="container">
    <span class="eyebrow reveal">Nasza oferta</span>
    <h2 class="section-title reveal">Zakres usług</h2>
    <p class="lede reveal">Niepubliczny Zakład Opieki Zdrowotnej "Dent-Ala" realizuje usługi zarówno na podstawie umowy z Narodowym Funduszem Zdrowia jak i prywatne. W naszej ofercie znajdziecie Państwo między innymi specjalistyczne świadczenia z zakresu: ortodoncji, chirurgii stomatologicznej, pedodoncji, stomatologii zachowawczej, endodoncji, protetyki, stomatologii estetycznej oraz rentgenodiagnostyki stomatologicznej.</p>
    <div class="accordion-group reveal" style="margin-top:2rem">
      ${services.map(([title, items], i)=>accordion(i===0?'first':'', title, items ? ul(items) : ortoBody, 'uslugi-accordion')).join('\n')}
    </div>
  </div>
</section>

<section id="galeria" class="tint">
  <div class="container">
    <span class="eyebrow reveal">Zobacz nasz gabinet</span>
    <h2 class="section-title reveal">Galeria</h2>
    <div class="gallery-grid">
      ${Array.from({length:45},(_,i)=>i+1).map(n=>{
        const [w,h] = galDims[n];
        return `<div class="gallery-item reveal scrollcard" style="transition-delay:${(n%4)*50}ms"><img src="img/galeria-${String(n).padStart(2,'0')}.jpg" alt="Zdjęcie z gabinetu Dent-Ala ${n}" width="${w}" height="${h}" loading="lazy"></div>`;
      }).join('\n')}
    </div>
  </div>
</section>

<section id="rejestracja">
  <div class="container">
    <span class="eyebrow reveal">Umów wizytę</span>
    <h2 class="section-title reveal">Rejestracja</h2>
    <p class="lede reveal">Rejestracja pacjentów zgłaszających się do Niepublicznego Zakładu Opieki Zdrowotnej "Dent-Ala" odbywa się:</p>
    <div class="reg-steps">
      <div class="reveal scrollcard reg-step">${icon('person')}<p>osobiście</p></div>
      <div class="reveal scrollcard reg-step" style="transition-delay:60ms">${icon('users')}<p>za pośrednictwem osoby trzeciej</p></div>
      <div class="reveal scrollcard reg-step" style="transition-delay:120ms">${icon('call')}<p>telefonicznie</p></div>
      <div class="reveal scrollcard reg-step" style="transition-delay:180ms">${icon('globe')}<p>drogą elektroniczną</p></div>
    </div>
    <div class="cta-band reveal" style="margin-top:3rem">
      <div>
        <h3>Zadzwoń i umów wizytę</h3>
        <p>Rejestracja telefoniczna: ${phone1} / ${phone2}. Prywatny Gabinet Ortodontyczny: ${phoneOrto}.</p>
      </div>
      <a class="btn btn-primary" href="${phoneHref}">${icon('phone')} Zadzwoń teraz</a>
    </div>
  </div>
</section>

<section id="kontakt" class="tint">
  <div class="container">
    <span class="eyebrow reveal">Jak do nas trafić</span>
    <h2 class="section-title reveal">Kontakt i dojazd</h2>
    <div class="contact-grid">
      <div class="contact-card reveal dir-l">
        <div class="contact-row">${icon('pin')}<div><strong>Adres</strong>Irmina Gralec — Niepubliczny Zakład Opieki Zdrowotnej „Dent-Ala”<br>ul. Spółdzielcza 21<br>27–200 Starachowice</div></div>
        <div class="contact-row">${icon('phone')}<div><strong>Telefon</strong>tel. ${phone1}, ${phone2}<br>Prywatny Gabinet Ortodontyczny: tel. ${phoneOrto}</div></div>
        <div class="contact-row">${icon('mail')}<div><strong>E-mail</strong><a href="mailto:${email}">${email}</a></div></div>
        <div class="contact-row">${icon('clock')}<div><strong>Godziny przyjęć</strong>
          <table class="hours-table"><tbody>
            <tr><td>Poniedziałek – Czwartek</td><td>07:30 – 19:30</td></tr>
            <tr><td>Piątek</td><td>07:30 – 14:00</td></tr>
          </tbody></table>
        </div></div>
        <div class="hero-ctas">
          <a class="btn btn-primary" href="${phoneHref}">${icon('phone')} Zadzwoń teraz</a>
        </div>
      </div>
      <div class="map-cta reveal dir-r">
        <div>
          <p style="color:var(--muted)">Jak do nas trafić?</p>
          <a href="${mapHref}" target="_blank" rel="noopener">Wyświetl większą mapę</a>
        </div>
      </div>
    </div>
  </div>
</section>

</main>

<a class="mobile-callbar" href="${phoneHref}">${icon('phone')} Zadzwoń: ${phone1}</a>

<footer class="site">
  <div class="container">
    <div class="foot-grid">
      <div>
        <h5>Dent-Ala Gabinet Stomatologiczny</h5>
        <p>ul. Spółdzielcza 21, 27–200 Starachowice</p>
      </div>
      <div>
        <h5>Kontakt</h5>
        <p><a href="${phoneHref}">${phone1}</a></p>
        <p><a href="tel:+48792704760">${phone2}</a></p>
        <p><a href="mailto:${email}">${email}</a></p>
      </div>
      <div>
        <h5>Nawigacja</h5>
        <p><a href="#zakres-uslug">Zakres usług</a></p>
        <p><a href="#galeria">Galeria</a></p>
        <p><a href="#kontakt">Kontakt</a></p>
      </div>
    </div>
    <div class="foot-bottom">
      <span>Irmina Gralec — Niepubliczny Zakład Opieki Zdrowotnej „Dent-Ala”.</span>
    </div>
  </div>
</footer>

<script>
(function(){
  var header = document.getElementById('siteHeader');
  var progressBar = document.getElementById('progressBar');
  var blob = document.getElementById('heroBlob');
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');

  toggle && toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav && nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); });
  });

  var ticking = false;
  function onScroll(){
    var y = window.scrollY || 0;
    header.classList.toggle('is-scrolled', y > 8);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    if (blob) blob.style.transform = 'translateY(' + (y * 0.15) + 'px)';

    var vh = window.innerHeight;
    var center = vh / 2;
    document.querySelectorAll('.scrollcard').forEach(function(el){
      var r = el.getBoundingClientRect();
      var elCenter = r.top + r.height / 2;
      var dist = Math.abs(elCenter - center);
      var p = Math.min(dist / (vh * 0.8), 1);
      el.style.setProperty('--p', p.toFixed(3));
    });
    ticking = false;
  }
  window.addEventListener('scroll', function(){
    if (!ticking){ window.requestAnimationFrame(onScroll); ticking = true; }
  }, {passive:true});
  onScroll();

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ en.target.classList.toggle('in', en.isIntersecting); });
  }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  var navLinks = document.querySelectorAll('nav.main a');
  var sections = Array.from(navLinks).map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  var spy = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){
        navLinks.forEach(function(a){ a.classList.remove('active'); });
        var match = Array.from(navLinks).find(function(a){ return a.getAttribute('href') === '#' + en.target.id; });
        if (match) match.classList.add('active');
      }
    });
  }, {rootMargin:'-45% 0px -50% 0px'});
  sections.forEach(function(s){ spy.observe(s); });

  var ctx;
  function playClick(){
    try{
      if(!ctx) ctx = new (window.AudioContext||window.webkitAudioContext)();
      var t = ctx.currentTime, osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type='sine'; osc.frequency.setValueAtTime(210,t); osc.frequency.exponentialRampToValueAtTime(110,t+0.1);
      gain.gain.setValueAtTime(0.0001,t); gain.gain.exponentialRampToValueAtTime(0.45,t+0.008); gain.gain.exponentialRampToValueAtTime(0.0001,t+0.16);
      osc.connect(gain).connect(ctx.destination); osc.start(t); osc.stop(t+0.16);
    }catch(e){}
  }
  document.addEventListener('click', function(e){ if (e.target.closest('a,button,summary')) playClick(); });
})();
</script>
</body>
</html>`;

fs.writeFileSync(OUT, html, 'utf-8');
console.log('Written', OUT, html.length, 'chars');
