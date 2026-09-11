// Jedno zrodlo prawdy dla treści strony — dane 1:1 z dent-ala.pl, zweryfikowane
// wczesniej w build.mjs (statyczna wersja HTML) i tu tylko przeniesione do
// tej samej struktury eksportow uzywanej przez komponenty React.
const fs = require("fs");
const path = require("path");

const clinic = {
  nazwa: "Dent-Ala",
  nazwaPelna: 'Irmina Gralec — Niepubliczny Zakład Opieki Zdrowotnej "Dent-Ala"',
  miasto: "Starachowice",
  ulica: "ul. Spółdzielcza 21",
  kod: "27-200 Starachowice",
  telefon: "41 275 65 60",
  telefon2: "792 704 760",
  telefonOrto: "604 137 059",
  telefonHref: "tel:+48412756560",
  email: "dent-ala@outlook.com",
  opisKrotki:
    'Niepubliczny Zakład Opieki Zdrowotnej "Dent-Ala" istnieje ponad 18 lat, jednak swe doświadczenie opiera na ponad pięćdziesięcioletniej działalności stomatologicznej w prywatnym gabinecie. Dbając o Państwa piękny uśmiech dokładamy wszelkich starań, aby zabiegi przebiegały bezboleśnie i w miłej atmosferze.',
};

const nav = [
  { href: "#o-nas", label: "O nas" },
  { href: "#zakres-uslug", label: "Zakres usług" },
  { href: "#galeria", label: "Galeria" },
  { href: "#rejestracja", label: "Rejestracja" },
  { href: "#kontakt", label: "Kontakt" },
];

const hero = {
  badge: "Dentysta Starachowice",
  tytul: "Dent-Ala Gabinet Stomatologiczny",
  tagline: "Niepubliczny Zakład Opieki Zdrowotnej — ponad 18 lat doświadczenia",
  lokalizacjaKrotko: "ul. Spółdzielcza 21",
};

const oNas = {
  tytul: "Kim jesteśmy",
  akapity: [
    'Niepubliczny Zakład Opieki Zdrowotnej "Dent-Ala" istnieje ponad 18 lat, jednak swe doświadczenie opiera na ponad pięćdziesięcioletniej działalności stomatologicznej w prywatnym gabinecie. Personel naszej przychodni tworzy zespół lekarzy stomatologów specjalistów w dziedzinie ortodoncji, chirurgii stomatologicznej, protetyki stomatologicznej, pedodoncji, stomatologii ogólnej, radiolog, higienistki oraz asystentki stomatologiczne.',
    "Oferujemy Państwu wiedzę specjalistyczną w wyżej wymienionych gałęziach stomatologii. Możliwość objęcia pacjentów kompleksową opieką zagwarantowana jest również poprzez wysokospecjalistyczny sprzęt: profesjonalne unity stomatologiczne z kamerami, piaskarki, skalery, ssaki, mikromotor endodontyczny, lupy oraz pantomograf.",
    "Dbając o Państwa piękny uśmiech dokładamy wszelkich starań aby zabiegi przebiegały bezboleśnie i w miłej atmosferze.",
  ],
  dokumentSrodowiskowy: {
    tekst:
      'Informacja o wpływie działalności wykonywanej przez jednostkę organizacyjną na zdrowie ludzi i na środowisko w Irmina Gralec Niepubliczny Zakład Opieki Zdrowotnej "Dent-Ala":',
    plik: "informacja-srodowisko.jpg",
  },
  wyroznia: [
    "Zespół lekarzy specjalistów: ortodoncja, chirurgia stomatologiczna, protetyka, pedodoncja, stomatologia ogólna, radiolog",
    "Profesjonalne unity stomatologiczne z kamerami, piaskarki, skalery, ssaki, mikromotor endodontyczny, lupy oraz pantomograf",
    "Zabiegi przebiegające bezboleśnie i w miłej atmosferze",
  ],
};

const ortoBody = [
  "Badanie narządu żucia dziecka w czasie wzrostu i rozwoju. Zapobieganie morfologicznym i czynnościowym zaburzeniom narządu żucia. Leczenie zaburzeń w obrębie narządu żucia u dzieci i dorosłych.",
];
const ortoRuchome = [
  "Aparaty dwuszczękowe",
  "Aparaty jednoszczękowe",
  "Aparaty miofunkcyjne",
  "Aparaty do leczenia zaburzeń i dysfunkcji stawu skroniowo-żuchwowego, leczenie nawyków, dysfunkcji języka, bruksizmu",
];
const ortoStale = [
  "Metalowe (również bezniklowe) w technikach łuku prostego",
  "Aparaty kosmetyczne-porcelanowe",
  "Aparaty stałe (metal+porcelana) w technice DAMONA dające doskonałe rezultaty w krótkim czasie i małej częstotliwości wizyt kontrolnych (również u pacjentów dorosłych)",
  "Łuki podniebienne i językowe (Hyrax, Rotator, Expander, Quod-helix, Bihelix, Twin-Force i in.)",
  "Aparaty lingwalne",
];

const zakres = {
  tytul: "Zakres usług",
  lead:
    'Niepubliczny Zakład Opieki Zdrowotnej "Dent-Ala" realizuje usługi zarówno na podstawie umowy z Narodowym Funduszem Zdrowia jak i prywatne. W naszej ofercie znajdziecie Państwo między innymi specjalistyczne świadczenia z zakresu: ortodoncji, chirurgii stomatologicznej, pedodoncji, stomatologii zachowawczej, endodoncji, protetyki, stomatologii estetycznej oraz rentgenodiagnostyki stomatologicznej.',
  kategorie: [
    {
      nazwa: "Higiena i Profilaktyka",
      pozycje: [
        "Indywidualny instruktaż higieny jamy ustnej",
        "Lakowanie",
        "Lakierowanie",
        "Leczenie nadwrażliwości zębów",
        "Piaskowanie",
        "Scaling (usunięcie kamienia nazębnego)",
        "Wybielanie zębów",
      ],
    },
    {
      nazwa: "Stomatologia zachowawcza",
      pozycje: [
        "Wypełnienia kompozytowe",
        "Wypełnienia glassjonomerowe",
        "Odbudowa estetyczna zęba",
        "Odbudowa na włóknie szklanym",
      ],
    },
    {
      nazwa: "Pedodoncja",
      pozycje: [
        "Wizyty adaptacyjne",
        "Profilaktyczne świadczenia stomatologiczne dla dzieci i młodzieży do 18 r. życia",
        "Wypełnienia kompozytowe w zębach mlecznych i stałych",
        "Wypełnienia kompozytowe kolorowe",
      ],
    },
    {
      nazwa: "Endodoncja",
      pozycje: [
        "Leczenie zapaleń miazgi odwracalnych – leczenie biologiczne miazgi",
        "Leczenie zapaleń nieodwracalnych miazgi",
        "Leczenie martwicy i zgorzeli miazgi",
        "Leczenie zapaleń tkanek okołowierzchołkowych",
        "Rewizja leczenia kanałowego – ponowne leczenie endodontyczne",
        "Wypełnianie kanałów",
      ],
    },
    {
      nazwa: "Chirurgia stomatologiczna",
      pozycje: [
        "Ekstrakcja zębów stałych oraz mlecznych",
        "Wyłuszczenie torbieli",
        "Chirurgia przyzębia – wycięcie kieszonki dziąsłowej, plastyka wędzidełka wargi lub języka",
        "Nacięcie ropnia",
      ],
    },
    {
      nazwa: "Protetyka",
      pozycje: [
        "Korony porcelanowe oraz kompozytowe",
        "Korony pełnoceramiczne",
        "Mosty porcelanowe oraz kompozytowe",
        "Wkłady koronowo-korzeniowe",
        "Wkłady koronowo–korzeniowe z włókna szklanego",
        "Inlay kompozytowy i porcelanowy – wkłady do wypełniania ubytków",
        "Protezy osiadające częściowe, całkowite, natychmiastowe",
        "Protezy nylonowe",
        "Protezy acetalowe",
        "Mikroprotezy do 3 zębów",
        "Naprawa protezy",
        "Podścielenie protezy",
        "Proteza szkieletowa",
        "Szynoproteza",
        "Szyna relaksacyjna",
      ],
    },
    {
      nazwa: "Ortodoncja",
      blocks: [
        { intro: ortoBody },
        { podtytul: "Aparaty ruchome (wyjmowane):", pozycje: ortoRuchome },
        { podtytul: "Aparaty stałe:", pozycje: ortoStale },
      ],
    },
    {
      nazwa: "Rentgenodiagnostyka stomatologiczna",
      pozycje: [
        "Zdjęcie RTG wewnątrzustne",
        "Standardowa ekspozycja panoramiczna",
        "Pediatryczna ekspozycja panoramiczna",
        "Ulepszona ekspozycja panoramiczna Ortho Zone",
        "Ekspozycja ortogonalna",
        "Szeroko łukowa ekspozycja panoramiczna",
        "Widok boczny czaszkowo–rdzeniowy",
        "Widok boczny",
        "Widok czaszkowy tylno–przedni (PA)",
        "Odwrotna projekcja Towen'a",
        "Projekcja Watersa",
        "Ekspozycja obrazów nadgarstka (uchwyt opcjonalny)",
        "Ekspozycja skrzydłowo–zgryzowa",
        "TMJ (staw skroniowo–żuchwowy) widok boczny",
        "Ortho TMJ (staw skroniowo–żuchwowy) widok boczny korygowany osiowo",
        "TMJ (staw skroniowo–żuchwowy) widok tylno–przedni",
        "Widok zatok szczękowych",
      ],
    },
  ],
};

const galeria = {
  lead: "Zobacz nasz gabinet — profesjonalne wyposażenie i przyjazną atmosferę.",
  liczbaZdjec: 32,
};

const rejestracja = {
  tytul: "Rejestracja",
  lead: 'Rejestracja pacjentów zgłaszających się do Niepublicznego Zakładu Opieki Zdrowotnej "Dent-Ala" odbywa się:',
  kroki: ["osobiście", "za pośrednictwem osoby trzeciej", "telefonicznie", "drogą elektroniczną"],
  cta: {
    tytul: "Zadzwoń i umów wizytę",
    tekst: "Rejestracja telefoniczna: 41 275 65 60 / 792 704 760. Prywatny Gabinet Ortodontyczny: 604 137 059.",
  },
};

const kontakt = {
  tytul: "Kontakt i dojazd",
  godziny: [
    { dni: "Poniedziałek – Czwartek", zakres: "07:30 – 19:30" },
    { dni: "Piątek", zakres: "07:30 – 14:00" },
  ],
  mapaQuery: "Dent-Ala Spółdzielcza 21 Starachowice",
};

function jsExport(name, value) {
  return `export const ${name} = ${JSON.stringify(value, null, 2)};\n\n`;
}

let out = "// Wygenerowane automatycznie przez gen_data.cjs — nie edytuj recznie.\n\n";
out += jsExport("clinic", clinic);
out += jsExport("nav", nav);
out += jsExport("hero", hero);
out += jsExport("oNas", oNas);
out += jsExport("zakres", zakres);
out += jsExport("galeria", galeria);
out += jsExport("rejestracja", rejestracja);
out += jsExport("kontakt", kontakt);

const outPath = path.join(__dirname, "src", "data", "clinicData.js");
fs.writeFileSync(outPath, out, "utf-8");
console.log("clinicData.js:", fs.statSync(outPath).size, "B");
