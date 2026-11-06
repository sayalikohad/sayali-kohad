import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   SAYALI KOHAD – PORTFOLIO (single file)
   Needs: React + Tailwind (v3 or v4). No other packages.
   Put your photo at  public/sayali.jpg   (falls back to "SK" if missing)
   Put your resume at public/Sayali_Kohad_Resume.pdf (you already have it)
   Usage: in App.jsx →  import Portfolio from "./Portfolio"; <Portfolio />
------------------------------------------------------------------- */

const ADBORN = "https://adbornsolutions.com/";
const PHOTO = "/sayali.jpeg";
const RESUME = "/Sayali_Kohad_Resume.pdf";
const IMG_EXT = "png"; // project image format: "png", "jpg" or "webp"
const GITHUB = "https://github.com/sayalikohad";
const LINKEDIN = "https://www.linkedin.com/in/sayali-kohad-7a7a47255/";
const EMAIL = "sayalikohad3@gmail.com";

const NAV = [
  ["about", "About"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["certifications", "Certifications"],
  ["contact", "Contact"],
];

const SKILLS = [
  ["CMS & platforms", ["Shopify", "WordPress", "Elementor"]],
  ["Front-end", ["HTML5", "CSS3", "JavaScript", "Bootstrap", "React", "Tailwind CSS"]],
  ["Backend & logic", ["Liquid", "PHP (basics)", "Java"]],
  ["Version control", ["Git", "GitHub"]],
  ["E-commerce", ["Theme setup", "Store customization", "UX optimization", "Payment gateways"]],
  ["Design & AI tools", ["Canva", "Graphic design", "ChatGPT", "AI prompting"]],
];

const PROJECTS = [
  { n: "Hum Threads", t: "Shopify", u: "https://humthreads.com/", d: "Apparel store with structured collections, dynamic product filters and mobile-first theme layouts built for conversion." },
  { n: "Keauty Beauty", t: "Shopify", u: "https://keautybeauty.in/", d: "Cosmetics store with an interactive catalog, multi-step checkout and optimized image loading for faster pages." },
  { n: "Deevyam", t: "Shopify", u: "https://deevyam.com/", d: "Premium store for brass pooja essentials and home décor with responsive layouts and a smooth shopping flow." },
  { n: "Vastuvann", t: "Shopify", u: "https://vastuvann.com/", d: "Luxury home décor platform with high-resolution visual sections, interactive banners and customized theme templates." },
  { n: "Khandelwal Gift Mart", t: "Shopify", u: "https://khandelwal-gift-mart.myshopify.com/", d: "Gift shop web store with tailored category structures and simple checkout navigation." },
  { n: "Scentalay", t: "Shopify", u: "https://www.scentalay.com/", d: "Fragrance brand store with clean visuals and full mobile responsiveness." },
  { n: "Samarth Agri Tourism", t: "WordPress", u: "https://samarthagritourism.com/", d: "Agri tourism and water park website with attraction pages, ticket pricing, a booking section and a responsive layout built with Elementor." },
  { n: "Strokes Design Studio", t: "WordPress", u: "https://strokesdesignstudio.com/", d: "Creative agency portfolio with work galleries, client testimonials and inquiry forms." },
  { n: "Divine Spaces by Studio 88", t: "WordPress", u: "https://divinespacesbystudio88.com/", d: "Interior and spatial design studio site with dynamic project showcases and responsive galleries." },
  { n: "Studio 88 by MPI", t: "WordPress", u: "https://studio88bympi.com/", d: "Architecture and interior design portfolio with seamless cross-device responsiveness." },
  { n: "The Supreme Decor", t: "WordPress", u: "https://thesupremedecor.com/", d: "Home décor showcase with structured product catalogs and optimized navigation." },
  { n: "EcoHygenix", t: "Custom code", u: "https://ecohygenix.com/", d: "Hand-coded site for hygiene and sanitation solutions using HTML, CSS, JavaScript and Bootstrap." },
  { n: "Mini Miracles Play School", t: "Custom code", u: "https://minimiraclesplayschool.com/", d: "Custom front end for a play school with course info, photo galleries and enrollment workflows." },
];

const FILTERS = ["All", "Shopify", "WordPress", "Custom code"];

/* EmailJS keys – get them from https://dashboard.emailjs.com */
const EMAILJS = { service: "YOUR_SERVICE_ID", template: "YOUR_TEMPLATE_ID", publicKey: "YOUR_PUBLIC_KEY" };

const TECH = {
  Shopify: ["Shopify", "Liquid", "JavaScript", "Responsive"],
  WordPress: ["WordPress", "Elementor", "PHP", "Responsive"],
  "Custom code": ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
};
const IN_PROGRESS = ["Deevyam", "Vastuvann", "Khandelwal Gift Mart"];
const FLOATERS = [
  { n: "WordPress", ic: "globe", c: "#21759B", pos: "-right-2 sm:-right-10 top-6", an: "sk-float" },
  { n: "Shopify", ic: "bag", c: "#5E8E3E", pos: "-left-2 sm:-left-12 top-[38%]", an: "sk-float2" },
  { n: "Liquid", ic: "spark", c: "#7C3AED", pos: "-left-1 sm:-left-6 bottom-6", an: "sk-float" },
  { n: "JavaScript", ic: "code", c: "#D49A00", pos: "-right-2 sm:-right-8 bottom-10", an: "sk-float2" },
];
const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const DUTIES = [
  "Architected, developed and deployed high-performance e-commerce platforms and custom corporate portals on Shopify and WordPress.",
  "Customized Shopify themes (Liquid/JS), configured product catalogs, set up payment gateways and streamlined checkout UX.",
  "Built responsive WordPress sites using Elementor, custom PHP templates and essential plugins with an optimized DOM structure.",
  "Ran regular audits for cross-browser compatibility, performance, mobile responsiveness and SEO-friendly structure.",
  "Worked directly with clients and graphic teams to turn visual designs into working web features.",
];

const ICONS = {
  sun: "M12 3v2M12 19v2M5 12H3M21 12h-2M6.3 6.3 4.9 4.9M19.1 19.1l-1.4-1.4M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4M12 8a4 4 0 100 8 4 4 0 000-8z",
  moon: "M21 13A9 9 0 1111 3a7 7 0 0010 10z",
  download: "M12 4v11m0 0-4-4m4 4 4-4M4 20h16",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  arrow: "M7 17 17 7M8 7h9v9",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  linkedin: "M4 9h4v11H4zM6 4a2 2 0 110 4 2 2 0 010-4zM10 9h4v2c.8-1.4 2.2-2.3 4-2.3 3 0 4 2 4 5V20h-4v-5.5c0-1.3-.5-2.2-1.800-2.200S14 13.200 14 14.500V20h-4z",
  github: "M9 19c-4 1.500-4-2-6-2m12 4v-3.500c0-1 .1-1.400-.5-2 2.800-.3 5.500-1.400 5.500-6a4.600 4.600 0 00-1.300-3.200 4.200 4.200 0 00-.1-3.200s-1.100-.3-3.500 1.300a12 12 0 00-6.200 0C6.500 2.800 5.400 3.100 5.400 3.100a4.200 4.200 0 00-.1 3.200A4.600 4.600 0 004 9.500c0 4.600 2.700 5.700 5.500 6-.6.600-.6 1.200-.5 2V21",
  pin: "M12 21s7-6.200 7-11a7 7 0 10-14 0c0 4.800 7 11 7 11zM12 7a3 3 0 100 6 3 3 0 000-6z",
  cap: "M2 9l10-5 10 5-10 5zM6 11.500V16c0 1.500 3 3 6 3s6-1.500 6-3v-4.500",
  bag: "M5 8h14l-1 12H6zM9 8V6a3 3 0 016 0v2",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  spark: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z",
  up: "M12 19V5m0 0-6 6m6-6 6 6",
  send: "M21 3 10 14M21 3l-7 18-4-7-7-4z",
};

const Icon = ({ name, className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d={ICONS[name]} />
  </svg>
);

/* ---------- theme tokens (blue + violet, light & dark) ---------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=DM+Sans:wght@400;500;600&display=swap');
@property --a{syntax:'<angle>';initial-value:0deg;inherits:false}
/* Fluid root size: the page looks the same at 100% and 75% browser zoom */
html{font-size:clamp(16px,1.1vw + 1px,22px);scroll-behavior:smooth}
.sk-root{--bg:#F8FAFC;--bg2:#EEF2FF;--card:rgba(255,255,255,.85);--card2:#EEF2FB;--ink:#0F172A;--muted:#475569;--accent:#2563EB;--btn:linear-gradient(135deg,#1456FF,#3F3FE6);--btn-ink:#FFFFFF;--err:#DC2626;--line:rgba(15,23,42,.1);--shadow:0 10px 30px -14px rgba(30,64,175,.28);--glow:0 20px 44px -16px rgba(37,99,235,.45);--hero:linear-gradient(135deg,#FFFFFF,#EEF2FF);--page:linear-gradient(180deg,#F8FAFC,#F3F6FD);--g1:#2563EB;--g2:#6D3BF0;--g3:#9333EA;--b1:rgba(147,180,255,.35);--b2:rgba(196,170,255,.30);--b3:rgba(125,211,252,.25);--orb1:rgba(147,190,255,.55);--orb2:rgba(206,180,255,.55);--ringglow:rgba(99,102,241,.38);
  position:relative;isolation:isolate;overflow-x:hidden;font-family:'DM Sans',system-ui,sans-serif;background:var(--page);color:var(--ink);transition:background .3s,color .3s}
.sk-root[data-theme=dark]{--bg:#0B1020;--bg2:#10172B;--card:rgba(22,30,52,.78);--card2:#1E2845;--ink:#EAF0FF;--muted:#A7B3D0;--accent:#8FB0FF;--btn:linear-gradient(135deg,#5B8DFF,#8B6CFF);--btn-ink:#071029;--err:#FF8A8A;--line:rgba(180,200,255,.14);--shadow:0 14px 34px -16px rgba(0,0,0,.8),inset 0 1px 0 rgba(200,215,255,.06);--glow:0 20px 48px -16px rgba(99,140,255,.45);--hero:linear-gradient(135deg,#17213D,#0F1629);--page:linear-gradient(180deg,#0B1020,#080C18);--g1:#7FA8FF;--g2:#A78BFF;--g3:#D58BFF;--b1:rgba(79,134,255,.22);--b2:rgba(140,92,255,.2);--b3:rgba(56,189,248,.12);--orb1:rgba(79,134,255,.35);--orb2:rgba(150,100,255,.32);--ringglow:rgba(110,130,255,.45)}
.sk-root .serif{font-family:'Fraunces',Georgia,serif}
.sk-root a:focus-visible,.sk-root button:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

/* floating colour blobs */
.sk-blobs{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none}
.sk-blobs span{position:absolute;border-radius:50%;filter:blur(70px);will-change:transform}
.sk-blobs span:nth-child(1){width:34rem;height:34rem;top:-8rem;right:-8rem;background:var(--b1);animation:sk-drift 18s ease-in-out infinite alternate}
.sk-blobs span:nth-child(2){width:30rem;height:30rem;top:40%;left:-10rem;background:var(--b2);animation:sk-drift 22s ease-in-out infinite alternate-reverse}
.sk-blobs span:nth-child(3){width:26rem;height:26rem;bottom:-8rem;right:15%;background:var(--b3);animation:sk-drift 20s ease-in-out infinite alternate}
@keyframes sk-drift{from{transform:translate(0,0) scale(1)}to{transform:translate(40px,-30px) scale(1.15)}}

/* cards, chips, buttons */
.sk-card{background:var(--card);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:1.75rem;backdrop-filter:blur(12px)}
.sk-lift{transition:transform .35s ease,box-shadow .35s ease,border-color .35s ease}
.sk-lift:hover{transform:translateY(-6px);box-shadow:var(--glow);border-color:var(--accent)}
.sk-lift img{transition:transform .6s ease}
.sk-lift:hover img{transform:scale(1.06)}
.sk-chip{background:var(--card2);border:1px solid var(--line);border-radius:999px;padding:.3rem .8rem;font-size:.82rem}
.sk-btn{position:relative;overflow:hidden;background:var(--btn);color:var(--btn-ink);border-radius:999px;font-weight:600;transition:filter .2s,transform .2s,box-shadow .3s}
.sk-btn:hover{filter:brightness(1.08);transform:translateY(-2px);box-shadow:var(--glow)}
.sk-btn::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.38) 50%,transparent 70%);transform:translateX(-130%);transition:transform .7s}
.sk-btn:hover::after{transform:translateX(130%)}
.sk-ghost{border:1px solid var(--line);background:var(--card);border-radius:999px;font-weight:500;transition:background .2s,transform .2s,border-color .2s}
.sk-ghost:hover{background:var(--card2);border-color:var(--accent);transform:translateY(-2px)}
.sk-input{width:100%;background:var(--card);border:1px solid var(--line);border-radius:1rem;padding:.8rem 1rem;color:var(--ink);font-size:.95rem;transition:border-color .2s,box-shadow .2s}
.sk-input::placeholder{color:var(--muted);opacity:.8}
.sk-input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 25%,transparent)}

/* animated gradient text, photo ring, floating badges */
.sk-grad-text{background:linear-gradient(90deg,var(--g1),var(--g2),var(--g3),var(--g1));background-size:250% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:sk-shine 7s linear infinite}
@keyframes sk-shine{to{background-position:250% center}}
.sk-ring{position:relative;padding:.3rem;box-shadow:0 24px 90px -12px var(--ringglow)}
.sk-ring::before{content:"";position:absolute;inset:0;border-radius:inherit;background:conic-gradient(from var(--a),var(--g1),var(--g2),var(--g3),var(--g1));animation:sk-spin 6s linear infinite}
.sk-ring>*{position:relative}
@keyframes sk-spin{to{--a:360deg}}
.sk-badge{display:inline-flex;align-items:center;gap:.4rem;background:var(--card);border:1px solid var(--line);border-radius:999px;padding:.45rem .85rem;font-size:.8rem;font-weight:600;color:var(--ink);box-shadow:var(--shadow);backdrop-filter:blur(10px)}
.sk-orb{position:absolute;border-radius:50%}
@keyframes sk-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.sk-float{animation:sk-float 5s ease-in-out infinite}
.sk-float2{animation:sk-float 6s ease-in-out infinite reverse}
.sk-float-slow{animation:sk-float 8s ease-in-out infinite}

/* entrance + scroll reveal */
@keyframes sk-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.sk-hero>*{animation:sk-in .7s both}.sk-hero>*:nth-child(2){animation-delay:.12s}.sk-hero>*:nth-child(3){animation-delay:.2s}
.sk-reveal{opacity:0;transform:translateY(26px);transition:opacity .8s ease,transform .8s ease}
.sk-reveal.in{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}.sk-reveal{opacity:1;transform:none}}
`;
const Heading = ({ title, sub }) => (
  <div className="mb-8 md:mb-10">
    <h2 className="serif text-3xl md:text-4xl font-medium">{title}</h2>
    <span className="mt-3 block h-1 w-14 rounded-full" style={{ background: "var(--btn)" }} />
    {sub && <p className="mt-2 max-w-xl" style={{ color: "var(--muted)" }}>{sub}</p>}
  </div>
);

const Section = ({ id, children }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.06 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} className="scroll-mt-28 py-12 md:py-16">
      <div ref={ref} className="sk-reveal mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
};

/* ------------------------------ HEADER ------------------------------ */
function Header({ theme, toggle, active }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-3 z-50 px-3 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-full sk-card !shadow-lg" style={{ backdropFilter: "blur(10px)" }}>
        <nav className="flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5" aria-label="Main">
          <a href="#top" className="serif text-2xl font-semibold" style={{ color: "var(--accent)" }}>Sayali</a>

          <ul className="hidden lg:flex items-center gap-1 text-sm">
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="px-3 py-1.5 rounded-full transition-colors"
                  style={{
                    background: active === id ? "var(--card2)" : "transparent",
                    color: active === id ? "var(--ink)" : "var(--muted)",
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className="sk-ghost w-10 h-10 grid place-items-center">
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>
            <a href={RESUME} download className="sk-btn hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm">
              <Icon name="download" className="w-4 h-4" /> Resume
            </a>
            <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu" className="lg:hidden sk-ghost w-10 h-10 grid place-items-center">
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </nav>

        {open && (
          <div className="lg:hidden px-4 pb-4 pt-1 grid gap-1 border-t" style={{ borderColor: "var(--line)" }}>
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-2xl" style={{ background: active === id ? "var(--card2)" : "transparent" }}>
                {label}
              </a>
            ))}
            <a href={RESUME} download className="sk-btn sm:hidden mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm">
              <Icon name="download" className="w-4 h-4" /> Resume
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function ProjectImage({ name, src }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="aspect-[16/9] w-full overflow-hidden" style={{ background: "var(--card2)" }}>
      {ok ? (
        <img src={src} alt={`${name} website preview`} loading="lazy" onError={() => setOk(false)} className="w-full h-full object-cover object-top" />
      ) : (
        <div className="w-full h-full grid place-items-center serif text-2xl px-4 text-center" style={{ color: "var(--accent)" }}>{name}</div>
      )}
    </div>
  );
}

/* ------------------------------ PAGE ------------------------------- */
export default function Portfolio() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("sk-theme");
      if (saved) return saved;
    } catch (e) {}
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [active, setActive] = useState("about");
  const [filter, setFilter] = useState("All");
  const [photoOk, setPhotoOk] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const onField = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const sendMail = async (e) => {
    e.preventDefault();
    if (EMAILJS.service.startsWith("YOUR_")) return setStatus("config");
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS.service,
          template_id: EMAILJS.template,
          user_id: EMAILJS.publicKey,
          template_params: { from_name: form.name, from_email: form.email, reply_to: form.email, subject: form.subject, message: form.message },
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  const toggle = () =>
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      try { localStorage.setItem("sk-theme", next); } catch (e) {}
      return next;
    });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -55% 0px" }
    );
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && obs.observe(el); });
    document.documentElement.style.scrollBehavior = "smooth";
    return () => obs.disconnect();
  }, []);

  const shown = PROJECTS.filter((p) => filter === "All" || p.t === filter);
  const count = (t) => PROJECTS.filter((p) => p.t === t).length;

  const stats = [
    [`${PROJECTS.length}`, "Websites delivered"],
    ["1.7 yrs", "Professional experience"],
    [`${count("Shopify")}`, "Shopify stores"],
    [`${count("WordPress")}`, "WordPress sites"],
  ];

  return (
    <div id="top" className="sk-root min-h-screen pb-6" data-theme={theme}>
      <style>{CSS}</style>
      <div className="sk-blobs" aria-hidden="true"><span /><span /><span /></div>
      <Header theme={theme} toggle={toggle} active={active} />

      {/* HERO */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 md:pt-12">
        <div className="sk-card p-5 sm:p-8 md:p-10 grid md:grid-cols-[minmax(0,20rem)_1fr] gap-8 md:gap-12 items-center" style={{ background: "var(--hero)" }}>
          <div className="relative mx-auto w-full max-w-[19rem]">
            <span className="sk-orb sk-float absolute -top-4 -left-3 sm:-left-8 w-16 h-16" style={{ background: "var(--orb1)" }} />
            <span className="sk-orb sk-float2 absolute -bottom-6 right-[18%] w-12 h-12" style={{ background: "var(--orb2)" }} />
            <div className="sk-ring sk-float-slow" style={{ borderRadius: "50%" }}>
              <div className="aspect-square overflow-hidden grid place-items-center" style={{ borderRadius: "50%", background: "var(--card2)" }}>
                {photoOk ? (
                  <img src={PHOTO} alt="Sayali Kohad" onError={() => setPhotoOk(false)} className="w-full h-full object-cover" />
                ) : (
                  <span className="serif text-6xl" style={{ color: "var(--accent)" }}>SK</span>
                )}
              </div>
            </div>
            {FLOATERS.map(({ n, ic, c, pos, an }) => (
              <span key={n} className={`sk-badge ${an} absolute ${pos}`}>
                <span style={{ color: c }}><Icon name={ic} className="w-4 h-4" /></span> {n}
              </span>
            ))}
          </div>

          <div className="sk-hero text-center md:text-left">
            <p className="mb-3 text-sm tracking-[0.2em] uppercase font-semibold" style={{ color: "var(--accent)" }}>Hello, I'm</p>
            <h1 className="serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05]">Sayali <span className="sk-grad-text">Kohad</span></h1>
            <p className="mt-3 text-lg" style={{ color: "var(--accent)" }}>Shopify &amp; WordPress Developer</p>
            <p className="mt-5 max-w-xl mx-auto md:mx-0 leading-relaxed" style={{ color: "var(--muted)" }}>
              I build fast, responsive online stores and business websites. With 1.7 years of hands-on experience, I turn
              designs into stores and sites that load quickly, look right on every screen and help clients sell.
            </p>
            <div className="mt-7 flex flex-wrap justify-center md:justify-start gap-3">
              <a href="#projects" className="sk-btn px-6 py-3 text-sm">View my work</a>
              <a href="#contact" className="sk-ghost px-6 py-3 text-sm">Get in touch</a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-sm" style={{ color: "var(--muted)" }}>
              <span className="inline-flex items-center gap-1.5"><Icon name="pin" className="w-4 h-4" /> Nagpur, Maharashtra</span>
              <a href={ADBORN} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:underline underline-offset-4">
                <Icon name="bag" className="w-4 h-4" /> Adborn Solutions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about">
        <Heading title="About me" />
        <div className="grid md:grid-cols-3 gap-5">
          <div className="sk-card p-6 sm:p-8 md:col-span-2">
            <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
              I'm a Shopify and WordPress developer with 1.7 years of professional experience in end-to-end e-commerce
              store setup, custom theme development and responsive website engineering. I work with Liquid, PHP, HTML5,
              CSS3, JavaScript and Bootstrap.
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: "var(--muted)" }}>
              I've led client projects from first brief to launch, improved conversion funnels, cut page load times and
              delivered web solutions tailored to each business.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Theme development", "Conversion optimization", "Site speed", "Responsive design", "SEO-friendly builds"].map((c) => (
                <span key={c} className="sk-chip">{c}</span>
              ))}
            </div>
          </div>
          <div className="sk-card p-6 sm:p-8">
            <div className="flex items-center gap-2 serif text-xl"><Icon name="cap" /> Education</div>
            <p className="mt-4 font-semibold">B.E. in Information Technology</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>Nagpur University, Maharashtra · 2020–2024</p>
            <p className="mt-4 font-semibold">HSC (12th) &amp; SSC (10th)</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>Maharashtra State Board · 2020 | 2018</p>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills">
        <Heading title="Skills" sub="The tools and technologies I use every day." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map(([title, items]) => (
            <div key={title} className="sk-card sk-lift p-6">
              <h3 className="serif text-xl">{title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((s) => <span key={s} className="sk-chip">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience">
        <Heading title="Experience" />
        <div className="sk-card p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="serif text-2xl">Shopify &amp; WordPress Developer</h3>
              <a href={ADBORN} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline" style={{ color: "var(--accent)" }}>
                Adborn Solutions <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <span className="sk-chip">March 2025 – Present</span>
          </div>
          <ul className="mt-6 grid gap-3">
            {DUTIES.map((d) => (
              <li key={d} className="flex gap-3 leading-relaxed" style={{ color: "var(--muted)" }}>
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map(([n, l]) => (
            <div key={l} className="sk-card sk-lift p-5 sm:p-6 text-center">
              <div className="serif text-3xl sm:text-4xl" style={{ color: "var(--accent)" }}>{n}</div>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{l}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <Heading title="Featured Projects" sub="Live websites and online stores I've built for clients using Shopify, WordPress and custom code." />
        <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={filter === f ? "sk-btn px-5 py-2 text-sm" : "sk-ghost px-5 py-2 text-sm"}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {shown.map((p) => {
            const wip = IN_PROGRESS.includes(p.n);
            return (
              <article key={p.n} className="sk-card sk-lift overflow-hidden flex flex-col">
                <ProjectImage name={p.n} src={`/projects/${slug(p.n)}.${IMG_EXT}`} />
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="serif text-xl leading-tight">{p.n}</h3>
                    <span className="sk-btn px-3 py-1 text-xs shrink-0">{p.t}</span>
                  </div>
                  <span className="sk-chip mt-3 self-start !py-1 !text-xs" style={{ color: wip ? "var(--accent)" : "var(--muted)" }}>
                    {wip ? "In Development" : "Completed"}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>{p.d}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {TECH[p.t].map((t) => <span key={t} className="sk-chip !py-1 !text-xs">{t}</span>)}
                  </div>
                  <a href={p.u} target="_blank" rel="noreferrer" className="sk-btn mt-5 self-start inline-flex items-center gap-2 px-5 py-2.5 text-sm">
                    <Icon name="arrow" className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications">
        <Heading title="Certifications" />
        <div className="sk-card p-6 sm:p-8 flex items-start gap-4">
          <span className="w-12 h-12 rounded-2xl grid place-items-center shrink-0" style={{ background: "var(--card2)", color: "var(--accent)" }}>
            <Icon name="cap" />
          </span>
          <div>
            <h3 className="serif text-xl">Website Design and Full Stack Java Development</h3>
            <p style={{ color: "var(--muted)" }}>TechnoLearn Trainings</p>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <div className="mb-8 md:mb-10">
          <h2 className="serif text-3xl md:text-5xl font-medium">Let's <span style={{ color: "var(--accent)" }}>Connect</span></h2>
          <p className="mt-3 max-w-xl leading-relaxed" style={{ color: "var(--muted)" }}>
            Have a store or website in mind? I'm open to new projects, collaborations and interesting conversations. Feel free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6">
          <div className="grid gap-4 content-start">
            {[
              ["mail", "Email", EMAIL],
              ["phone", "Phone", "+91 72496 72150"],
              ["pin", "Location", "Nagpur, Maharashtra, India"],
            ].map(([ic, label, val]) => (
              <div key={label} className="sk-card sk-lift p-5 min-w-0">
                <span style={{ color: "var(--accent)" }}><Icon name={ic} /></span>
                <h3 className="serif text-lg mt-2">{label}</h3>
                <p className="text-sm break-words" style={{ color: "var(--muted)" }}>{val}</p>
              </div>
            ))}
            <div className="flex gap-3">
              {[["github", "GitHub", GITHUB], ["linkedin", "LinkedIn", LINKEDIN]].map(([ic, label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="w-11 h-11 rounded-full grid place-items-center transition-transform hover:-translate-y-0.5" style={{ background: "var(--card)", border: "1px solid var(--line)", boxShadow: "var(--shadow)" }}>
                  <Icon name={ic} />
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={sendMail} className="sk-card p-5 sm:p-8 grid gap-4 content-start">
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="sk-input" name="name" value={form.name} onChange={onField} placeholder="Your Name" aria-label="Your name" required />
              <input className="sk-input" type="email" name="email" value={form.email} onChange={onField} placeholder="Email Address" aria-label="Email address" required />
            </div>
            <input className="sk-input" name="subject" value={form.subject} onChange={onField} placeholder="Subject" aria-label="Subject" required />
            <textarea className="sk-input resize-y" rows={6} name="message" value={form.message} onChange={onField} placeholder="Write your message..." aria-label="Message" required />
            <button type="submit" disabled={status === "sending"} className="sk-btn w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm disabled:opacity-60">
              <Icon name="send" className="w-4 h-4" /> {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            <p role="status" className="text-sm min-h-[1.25rem]" style={{ color: status === "error" || status === "config" ? "var(--err)" : "var(--accent)" }}>
              {status === "success" && "Message sent. I'll get back to you soon."}
              {status === "error" && "Couldn't send your message. Please try again or email me directly."}
              {status === "config" && "EmailJS keys are not added yet. Set them at the top of Portfolio.jsx."}
            </p>
          </form>
        </div>
      </Section>

      <footer className="mt-10 border-t" style={{ borderColor: "var(--line)", background: "var(--bg2)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <a href="#top" className="serif text-3xl font-semibold">
                Sayali <span style={{ color: "var(--accent)" }}>Kohad</span>
              </a>
              <p className="mt-4 max-w-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                Shopify &amp; WordPress Developer building fast, responsive and conversion-focused websites and online stores.
              </p>
            </div>

            <div>
              <h3 className="serif text-lg font-semibold">Quick Links</h3>
              <ul className="mt-4 grid gap-2.5">
                {NAV.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="transition-colors hover:underline underline-offset-4" style={{ color: "var(--muted)" }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="serif text-lg font-semibold">Connect</h3>
              <div className="mt-4 flex gap-3">
                {[
                  ["github", "GitHub", GITHUB],
                  ["linkedin", "LinkedIn", LINKEDIN],
                  ["mail", "Email", `mailto:${EMAIL}`],
                ].map(([ic, label, href]) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="w-11 h-11 rounded-full grid place-items-center transition-transform hover:-translate-y-0.5"
                    style={{ background: "var(--card)", border: "1px solid var(--line)", boxShadow: "var(--shadow)" }}
                  >
                    <Icon name={ic} className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <a href="#top" className="sk-btn mt-7 inline-flex items-center gap-2 px-6 py-3 text-sm">
                <Icon name="up" className="w-4 h-4" /> Back To Top
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t text-center text-sm" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
            © {new Date().getFullYear()} Sayali Kohad • Built with React &amp; Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
}