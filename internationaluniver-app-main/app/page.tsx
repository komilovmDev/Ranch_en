"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import Marquee from "react-fast-marquee";

import {
  ArrowUpRight,
  Stethoscope,
  TrendingUp,
  Cpu,
  Languages,
  Play,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { getTranslation, type Language } from "@/lib/i18n";
import Navbar from "@/components/navbar";

/** ============================================
 *  THEME (light/dark)
 *  Tailwind must have `darkMode: 'class'`
 *  ============================================ */
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (
      (localStorage.getItem("theme") as "light" | "dark") ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

/** ============================================
 *  ELEVATED HEADER (replaces <Navbar/>)
 *  Hide on scroll down; glass, border, language + theme + CTA
 *  ============================================ */
function SiteHeader({
  currentLang,
  onLanguageChange,
  theme,
  setTheme,
  onApply,
  t,
}: {
  currentLang: Language;
  onLanguageChange: (l: Language) => void;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  onApply: () => void;
  t: (key: string) => string;
}) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [facultiesOpen, setFacultiesOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 8);
      setHidden(y > lastY && y > 80);
      lastY = y;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setFacultiesOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const langs: Language[] = ["en", "ru", "uz" as Language];

  return (
    <div
      className={`sticky top-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Navbar 
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        onApplyNow={onApply}
      />

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          mobileOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute left-0 right-0 top-0 rounded-b-3xl border-b border-zinc-200 bg-white p-4 pb-6 shadow-xl transition-transform dark:border-zinc-800 dark:bg-zinc-950 ${
            mobileOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
                          <div className="inline-flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white">
                  <span className="text-[10px] font-black">{t("utu")}</span>
                </div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                {t("university")}
              </span>
            </div>
            <button
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-2 grid gap-2">
            <Link
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {t("about")}
            </Link>
            <details className="group rounded-xl">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900">
                {t("faculties")}
                <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <div className="mt-1 grid grid-cols-1 gap-1 pl-3">
                {facultiesData.map((f) => (
                  <Link
                    key={f.href}
                    href={f.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                  >
                                         {t(f.nameKey)}
                  </Link>
                ))}
              </div>
            </details>
            <Link
              href="#news"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {t("news")}
            </Link>
          </div>

          <div className="mt-4 flex items-center gap-2">
            {/* Lang quick toggle */}
            <div className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 text-[10px] font-bold uppercase tracking-widest dark:border-zinc-700 dark:bg-zinc-900">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => onLanguageChange(l)}
                  className={`rounded-full px-2 py-1 transition ${
                    currentLang === l
                      ? "bg-orange-500 text-white"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
                          <Button
                onClick={() => {
                  setMobileOpen(false);
                  onApply();
                }}
                className="h-9 rounded-full border-2 border-orange-500 bg-orange-500 px-4 text-[11px] font-black uppercase tracking-widest text-white"
              >
                {t("applyNow")}
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** ============================================
 *  DATA (static fallback)
 *  ============================================ */
const facultiesData = [
  {
    nameKey: "medicine",
    descriptionKey: "medicineDesc",
    image: "/images/medical-students.jpg",
    href: "/faculties/medicine",
    icon: Stethoscope,
    accent: "#ef4444", // red-500
  },
  {
    nameKey: "economics",
    descriptionKey: "economicsDesc",
    image: "/images/university-interior.jpg",
    href: "/faculties/economics",
    icon: TrendingUp,
    accent: "#22c55e", // green-500
  },
  {
    nameKey: "innovativeTechnologies",
    descriptionKey: "technologiesDesc",
    image: "/images/ranch-exterior.jpg",
    href: "/faculties/technologies",
    icon: Cpu,
    accent: "#06b6d4", // cyan-500
  },
  {
    nameKey: "philology",
    descriptionKey: "philologyDesc",
    image: "/images/online-interview.jpg",
    href: "/faculties/philology",
    icon: Languages,
    accent: "#6366f1", // indigo-500
  },
];

const newsItemsData = [
  {
    id: "international-medical-conference-2024",
    titleKey: "news.conference2024.title",
    excerptKey: "news.conference2024.excerpt",
    typeKey: "conference",
    date: "2024-03-15",
  },
  {
    id: "european-partnership-announcement",
    titleKey: "news.partnership.title",
    excerptKey: "news.partnership.excerpt",
    typeKey: "news",
    date: "2024-02-20",
  },
  {
    id: "global-education-summit-2024",
    titleKey: "news.summit2024.title",
    excerptKey: "news.summit2024.excerpt",
    typeKey: "summit",
    date: "2024-04-10",
  },
];

/** ============================================
 *  DYNAMIC CONTENT (CMS hooks via /api/* with graceful fallback)
 *  ============================================ */
export type CmsNews = {
  id: string;
  title: string;
  excerpt: string;
  type: string;
  date: string;
};
export type CmsTickerItem = { label: string };

function useNews(fallback: CmsNews[]) {
  const [items, setItems] = useState<CmsNews[]>(fallback);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/news", {
          next: { revalidate: 60 } as any,
        });
        if (res.ok) {
          const data = (await res.json()) as CmsNews[];
          if (!cancelled && Array.isArray(data) && data.length) setItems(data);
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return { items };
}

function useTicker(fallback: CmsTickerItem[]) {
  const [items, setItems] = useState<CmsTickerItem[]>(fallback);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/ticker", {
          next: { revalidate: 60 } as any,
        });
        if (res.ok) {
          const data = (await res.json()) as CmsTickerItem[];
          if (!cancelled && Array.isArray(data) && data.length) setItems(data);
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return items;
}

/** ============================================
 *  SMALL UI PRIMITIVES
 *  ============================================ */
function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/3 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-orange-500/30 via-amber-400/20 to-fuchsia-500/20 blur-3xl dark:from-orange-500/20 dark:via-amber-400/10 dark:to-fuchsia-500/10" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[50vh] w-[50vw] rounded-full bg-gradient-to-tr from-sky-500/20 via-cyan-400/10 to-purple-500/10 blur-3xl" />
    </div>
  );
}

function SectionTitle({
  overline,
  title,
  description,
}: {
  overline?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      {overline && (
        <span className="inline-block rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          {overline}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-black dark:text-white md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-3xl text-zinc-600 dark:text-zinc-300 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900/60">
      <p className="text-5xl font-extrabold tracking-tight text-orange-500 md:text-6xl">
        {value}
      </p>
      <p className="mt-2 text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
    </div>
  );
}

/** ============================================
 *  FACULTIES — NEW MOSAIC DESIGN (accent + category + view switch)
 *  ============================================ */
function FacultyTile({
  faculty,
  variant = "standard",
  t,
}: {
  faculty: any;
  variant?: "wide" | "tall" | "standard";
  t: (key: string) => string;
}) {
  const span =
    variant === "wide"
      ? "col-span-12 xl:col-span-8 aspect-[16/9]"
      : variant === "tall"
      ? "col-span-12 sm:col-span-6 xl:col-span-4 aspect-[4/5]"
      : "col-span-12 sm:col-span-6 xl:col-span-4 aspect-[16/11]";

  return (
    <Link
      href={faculty.href}
      className={`group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-md ring-0 transition hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 ${span}`}
    >
      <Image
        src={faculty.image}
        alt={faculty.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* base overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      {/* accent glow */}
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          background: `linear-gradient(to top, ${
            faculty.accent || "#f97316"
          }33, transparent 60%)`,
        }}
      />

      {/* corner ribbon (category) */}
      {faculty.category && (
        <div className="absolute -right-8 top-6 rotate-45">
          <span
            className="inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow"
            style={{
              backgroundColor: faculty.accent || "#f97316",
              color: "#fff",
            }}
          >
            {faculty.category}
          </span>
        </div>
      )}

      {/* top-left badge */}
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <div
          className="grid h-9 w-9 place-items-center rounded-full shadow"
          style={{
            backgroundColor: `${faculty.accent || "#f97316"}1A`,
            color: faculty.accent || "#f97316",
          }}
        >
          <faculty.icon className="h-4 w-4" />
        </div>
                          <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-700">
                    {t(faculty.nameKey)}
                  </span>
      </div>

      {/* content bottom */}
      <div className="absolute inset-x-4 bottom-4">
        <h3 className="text-xl font-black uppercase text-white drop-shadow-md md:text-2xl">
          {faculty.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/80">
          {faculty.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
                        {typeof faculty.programs === "number" ? (
                <div className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-zinc-700">
                  {faculty.programs} {t("programs")}
                </div>
              ) : (
                <span />
              )}
          <span className="relative inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur transition">
            <span className="relative z-10">{t("explore")}</span>
            <ArrowUpRight className="relative z-10 h-4 w-4" />
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ backgroundColor: faculty.accent || "#f97316" }}
            />
          </span>
        </div>
      </div>

      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500 transition duration-300 group-hover:scale-x-100" />
    </Link>
  );
}

const facultyVariantForIndex = (idx: number): "wide" | "tall" | "standard" => {
  const pattern: Array<"wide" | "tall" | "standard"> = [
    "wide",
    "standard",
    "standard",
    "tall",
    "standard",
    "standard",
  ];
  return pattern[idx % pattern.length];
};

/** ============================================
 *  PAGE
 *  ============================================ */
export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const t = (key: string) => getTranslation(key, currentLang);
  const handleApplyNow = () =>
    window.open("https://admission.utu-ranch.uz", "_blank");

  // faculties with i18n + program counts (for badge) + accent + category
  const programCounts: Record<string, number> = {
    medicine: 12,
    economics: 9,
    innovativeTechnologies: 14,
    philology: 7,
  };
  
  const faculties = useMemo(
    () => {
      const categoriesMap: Record<string, string> = {
        medicine: t("health"),
        economics: t("business"),
        innovativeTechnologies: t("tech"),
        philology: t("humanities"),
      };
      
      return facultiesData.map((f) => ({
        ...f,
        key: f.nameKey,
        name: t(f.nameKey),
        description: t(f.descriptionKey),
        programs: programCounts[f.nameKey as keyof typeof programCounts],
        accent: (f as any).accent,
        category: categoriesMap[f.nameKey as keyof typeof categoriesMap],
      }));
    },
    [currentLang, t]
  );

  // NEWS & TICKER via CMS with fallback
  const fallbackNews = useMemo(() => 
    newsItemsData.map((n) => ({
      id: n.id,
      title: t(n.titleKey),
      excerpt: t(n.excerptKey),
      type: t(n.typeKey),
      date: n.date,
    })), [t]
  );
  const { items: newsItems } = useNews(fallbackNews);
  const tickerFallback = useMemo(() => 
    faculties.map((f) => ({ label: f.name })), [faculties]
  );
  const tickerItems = useTicker(tickerFallback);

  // global scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  // filter/search/sort/view for faculties
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [q, setQ] = useState("");
  const [sortAZ, setSortAZ] = useState(false);
  const [viewMode, setViewMode] = useState<"mosaic" | "cards">("mosaic");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(faculties.map((f) => f.category)))],
    [faculties]
  );

  const filteredFaculties = useMemo(() => {
    const base =
      activeFilter === "all"
        ? faculties
        : faculties.filter((f) => f.category === activeFilter);
    if (!q) return base;
    const qq = q.toLowerCase();
    return base.filter(
      (f) =>
        f.name.toLowerCase().includes(qq) ||
        f.description.toLowerCase().includes(qq)
    );
  }, [activeFilter, faculties, q]);

  const sortedFaculties = useMemo(
    () =>
      sortAZ
        ? [...filteredFaculties].sort((a, b) => a.name.localeCompare(b.name))
        : filteredFaculties,
    [filteredFaculties, sortAZ]
  );

  return (
    <div className="min-h-screen bg-white font-mono text-zinc-900 selection:bg-orange-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      {/* top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500"
      />

      {/* New header */}
      <SiteHeader
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        theme={theme}
        setTheme={setTheme}
        onApply={handleApplyNow}
        t={t}
      />

      {/* HERO (bg image with left→right gradient) */}
      <section className="relative isolate overflow-hidden">
        {/* Background image anchored to the right */}
        <Image
          src="/images/university-interior.jpg"
          alt="Campus"
          fill
          priority
          className="absolute inset-0 -z-10 select-none object-cover object-right"
        />
        {/* Soft light-to-transparent overlay for better text legibility (dark-mode aware) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/80 to-white/0 dark:from-zinc-950 dark:via-zinc-950/70 dark:to-transparent" />
        {/* Ambient glow behind content */}
        <Glow />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:px-8">
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-5xl font-black uppercase leading-[0.95] text-black dark:text-white md:text-7xl"
            >
              {t("welcomeTitle")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              {t("aboutDescription")}
            </motion.p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                onClick={handleApplyNow}
                className="h-12 rounded-xl border-2 border-orange-500 bg-orange-500 px-8 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-orange-600"
              >
                {t("applyNow")}
              </Button>
              <Link
                href="#video"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase text-zinc-700 dark:text-zinc-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition group-hover:border-orange-500 dark:border-zinc-700 dark:bg-zinc-900">
                  <Play className="h-4 w-4" />
                </span>
                <span className="border-b border-dotted border-zinc-400 group-hover:border-orange-500 dark:border-zinc-600">
                  {t("heroAction.explore")}
                </span>
              </Link>
            </div>
            {/* Dynamic Ticker */}
            <div className="mt-10 rounded-xl border border-zinc-200 bg-white/70 p-3 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/60">
              <Marquee gradient={false} speed={50} pauseOnHover>
                <div className="mx-6 text-xs font-bold uppercase tracking-widest text-orange-600">
                  # {t("faculties")}
                </div>
                {tickerItems.map((it, idx) => (
                  <div
                    key={idx}
                    className="mx-6 flex items-center gap-2 text-xs uppercase text-zinc-600 dark:text-zinc-300"
                  >
                    <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    {it.label}
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT + STATS */}
      <section
        id="about"
        className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-16 md:px-8 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <SectionTitle
              title={t("aboutTitle")}
              description={t("aboutDescription")}
            />
          </div>
          <div className="grid grid-cols-2 gap-6 lg:col-span-2">
            <Stat value="7K+" label={t("studentsLabel")} />
            <Stat value="50+" label={t("countriesLabel")} />
            <Stat value="850" label={t("availableSpotsLabel")} />
            <Stat value="15+" label={t("yearsExperienceLabel")} />
          </div>
        </div>
      </section>

      {/* FACULTIES — mosaic layout */}
      <section
        id="faculties"
        className="border-b border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 md:py-24"
      >
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline={t("heroAction.explore")}
            title={t("faculties")}
          />

          {/* Filters + search + sort + view */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveFilter(c)}
                  className={`rounded-full border px-4 py-1 text-[11px] font-bold uppercase tracking-widest transition ${
                    activeFilter === c
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-zinc-200 text-zinc-700 hover:border-orange-300 hover:bg-orange-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600"
                  }`}
                >
                  {c === "all" ? t("all") : c}
                </button>
              ))}
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t("searchFaculties")}
                  className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm text-zinc-700 outline-none ring-0 transition placeholder:text-zinc-400 focus:border-orange-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>
              <button
                onClick={() => setSortAZ((v) => !v)}
                className={`rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition ${
                  sortAZ
                    ? "border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400"
                    : "border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                }`}
                aria-pressed={sortAZ}
              >
                {sortAZ ? t("sortAZ") : t("default")}
              </button>
              <div className="hidden items-center rounded-full border border-zinc-200 p-1 dark:border-zinc-700 sm:flex">
                <button
                  onClick={() => setViewMode("mosaic")}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition ${
                    viewMode === "mosaic"
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                      : "text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  {t("mosaic")}
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition ${
                    viewMode === "cards"
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                      : "text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  {t("cards")}
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-8 grid grid-cols-12 gap-6">
            {sortedFaculties.map((faculty, idx) => (
              <FacultyTile
                key={faculty.key}
                faculty={faculty}
                variant={
                  viewMode === "mosaic"
                    ? facultyVariantForIndex(idx)
                    : "standard"
                }
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* NEWS (from CMS with fallback) */}
      <section
        id="news"
        className="border-b border-zinc-200 bg-zinc-50 px-4 py-16 dark:border-zinc-800 dark:bg-zinc-900 md:px-8"
      >
        <div className="container mx-auto">
          <SectionTitle title={t("newsEvents")} />
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {newsItems.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                prefetch
                className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-orange-600">
                      {item.type}
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-xl font-bold uppercase leading-tight text-black dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-300">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="hidden flex-col items-end text-right md:flex">
                    <div className="rounded-full border border-zinc-300 px-3 py-1 text-[10px] font-bold uppercase text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">
                      {new Date(item.date).toLocaleDateString(currentLang, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="mt-4 grid h-10 w-10 place-items-center rounded-full border-2 border-zinc-300 transition-all group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white dark:border-zinc-600">
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-rotate-12" />
                    </div>
                  </div>
                </div>
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with video */}
      <section
        id="video"
        className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-black px-4 py-20 text-center text-white md:px-8"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          poster="/images/ranch-exterior.jpg"
        >
          <source src="/videos/abstract-lines.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_70%)]" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-black uppercase md:text-6xl"
          >
            {t("readyToStartTitle")}
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
            {t("joinThousandsDesc")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={handleApplyNow}
              className="h-12 rounded-xl border-2 border-orange-500 bg-orange-500 px-8 font-bold text-white transition hover:-translate-y-0.5"
            >
              {t("applyNow")}
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-2 border-white/60 bg-transparent px-8 font-bold text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              {t("downloadBrochure")}
            </Button>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
    </div>
  );
}
