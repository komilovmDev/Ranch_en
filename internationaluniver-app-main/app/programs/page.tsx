// app/programs/page.tsx
"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Globe,
  GraduationCap,
  Users,
  BadgeCheck,
  Pill,
  Stethoscope,
  Baby,
  Search,
  Filter,
  SortAsc,
  ArrowUpRight,
  X,
  Check,
  Info,
  ChevronDown,
  Scale,
  Sparkles,
  Star,
  CalendarDays,
  Banknote,
  CreditCard,
  Wallet,
  ShieldCheck,
  Receipt,
  ChevronRight,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getTranslation, type Language } from "@/lib/i18n";

/* ===========================
   DATA
   =========================== */
type Program = {
  id: string;
  name: string;
  duration: string;
  years: number;
  level: "Specialist" | "Bachelor" | "Master";
  tuition: number;
  quota: number;
  description: string;
  icon: ComponentType<{ className?: string }>;
  highlights: string[];
  heroImage: string;
};

const BASE_TUITION = 2800;

const programs: Program[] = [
  {
    id: "dentistry",
    name: "Dentistry",
    duration: "5 years",
    years: 5,
    level: "Specialist",
    tuition: BASE_TUITION,
    quota: 200,
    description:
      "Comprehensive dental education with modern clinical training and hands-on experience across prosthodontics, endodontics, and oral surgery.",
    icon: ToothIcon,
    highlights: ["Clinical Labs", "Chairside Practice", "Digital Imaging"],
    heroImage: "/images/university-interior.jpg",
  },
  {
    id: "general-medicine",
    name: "General Medicine",
    duration: "6 years",
    years: 6,
    level: "Specialist",
    tuition: BASE_TUITION,
    quota: 200,
    description:
      "Full medical curriculum with strong foundational sciences, early clinical exposure, and evidence-based practice.",
    icon: Stethoscope,
    highlights: ["Early Clinical", "Simulation Center", "Evidence-Based"],
    heroImage: "/images/medical-students.jpg",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    duration: "6 years",
    years: 6,
    level: "Specialist",
    tuition: BASE_TUITION,
    quota: 200,
    description:
      "Specialized training focused on infants, children, and adolescents — growth, development, and pediatric emergency.",
    icon: Baby,
    highlights: ["Neonatology", "Child Development", "Peds ER"],
    heroImage: "/images/online-interview.jpg",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    duration: "5 years",
    years: 5,
    level: "Specialist",
    tuition: BASE_TUITION,
    quota: 200,
    description:
      "Pharmaceutical sciences covering pharmaceutics, pharmacology, and patient-centered care with compounding labs.",
    icon: Pill,
    highlights: ["Compounding Lab", "Pharmacology", "Patient Care"],
    heroImage: "/images/ranch-exterior.jpg",
  },
];

/* simple tooth icon (без внешних зависимостей) */
function ToothIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 22c-1 0-1.5-2.5-2-4-.6-1.7-1.4-3-3-3C3.5 15 2 10.9 2 8a6 6 0 0 1 6-6c2.1 0 3.4.9 4 2 .6-1.1 1.9-2 4-2a6 6 0 0 1 6 6c0 2.9-1.5 7-5 7-1.6 0-2.4 1.3-3 3-.5 1.5-1 4-2 4Z" />
    </svg>
  );
}

/* ===========================
   ANIMATIONS / PRIMITIVES
   =========================== */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, duration: 0.5 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

function SectionTitle({
  overline,
  title,
  description,
  id,
}: {
  overline?: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className="mb-8" id={id}>
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

function Stat({
  icon,
  value,
  label,
  color = "text-orange-600",
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color?: string;
}) {
  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(240px_240px_at_30%_-20%,rgba(253,186,116,0.18),transparent_60%)] opacity-0 transition group-hover:opacity-100" />
      <div className={`${color} mb-2 flex justify-center`}>{icon}</div>
      <div className={`text-2xl md:text-3xl font-extrabold ${color}`}>
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        {label}
      </div>
    </div>
  );
}

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/3 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-orange-500/30 via-amber-400/20 to-fuchsia-500/20 blur-3xl dark:from-orange-500/20 dark:via-amber-400/10 dark:to-fuchsia-500/10" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[50vh] w-[50vw] rounded-full bg-gradient-to-tr from-sky-500/20 via-cyan-400/10 to-purple-500/10 blur-3xl" />
    </div>
  );
}

const currency = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const smoothScrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top: y, behavior: "smooth" });
};

/* ===========================
   PAGE
   =========================== */
export default function ProgramsPage() {
  // Language (синхроним с Navbar)
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return ((localStorage.getItem("lang") as Language) || "en") as Language;
  });
  useEffect(() => {
    try {
      localStorage.setItem("lang", currentLang);
    } catch {}
  }, [currentLang]);
  const t = (key: string) => getTranslation(key, currentLang);
  const handleApplyNow = () =>
    window.open("https://admission.utu-ranch.uz", "_blank");

  /* ---- Sticky subnav + progress ---- */
  const sections = [
    { id: "overview", label: t("overview") },
    { id: "spotlight", label: t("spotlight") },
    { id: "programs", label: t("programs") },
    { id: "requirements", label: t("requirements") },
    { id: "process", label: t("process") },
    { id: "timeline", label: t("timeline") },
    { id: "fees", label: t("fees") },
    { id: "faq", label: t("faq") },
  ];
  const [activeSec, setActiveSec] = useState("overview");
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(height > 0 ? scrolled / height : 0);

      const nearest = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return { id: s.id, d: Infinity };
          return {
            id: s.id,
            d: Math.abs(el.getBoundingClientRect().top - 120),
          };
        })
        .sort((a, b) => a.d - b.d)[0]?.id;
      if (nearest) setActiveSec(nearest);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Controls ---- */
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "name" | "duration">(
    "default"
  );
  const [view, setView] = useState<"cards" | "compact">("cards");

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return programs.filter(
      (p) =>
        !qq ||
        p.name.toLowerCase().includes(qq) ||
        p.description.toLowerCase().includes(qq) ||
        p.level.toLowerCase().includes(qq)
    );
  }, [q]);

  const sorted = useMemo(() => {
    if (sortBy === "name")
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "duration")
      return [...filtered].sort(
        (a, b) => a.years - b.years || a.name.localeCompare(b.name)
      );
    return filtered;
  }, [filtered, sortBy]);

  /* ---- Compare ---- */
  const [selected, setSelected] = useState<string[]>([]);
  const toggleSelect = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const clearSelected = () => setSelected([]);
  const [isCompareOpen, setCompareOpen] = useState(false);
  const selectedPrograms = useMemo(
    () => programs.filter((p) => selected.includes(p.id)),
    [selected]
  );

  /* ---- Spotlight autoplay ---- */
  const [spotIdx, setSpotIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setSpotIdx((p) => (p + 1) % programs.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  // global scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  return (
    <div className="min-h-screen bg-white font-mono text-zinc-900 selection:bg-orange-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      {/* top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500"
      />

      <Navbar currentLang={currentLang} onLanguageChange={setCurrentLang} faculties={[]} brand={{ initials: t("utu"), label: t("university"), href: "/" }} />

      {/* HERO — matching home page style */}
      <section className="relative isolate overflow-hidden">
        {/* Background image anchored to the right */}
        <Image
          src="/images/medical-students.jpg"
          alt="Medical students"
          fill
          priority
          className="absolute inset-0 -z-10 select-none object-cover object-center"
        />
        {/* Soft light-to-transparent overlay for better text legibility */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/80 to-white/0 dark:from-zinc-950 dark:via-zinc-950/70 dark:to-transparent" />
        {/* Ambient glow behind content */}
        <Glow />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:px-8">
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-600">
                {t("academicYear")}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-5xl font-black uppercase leading-[0.95] text-black dark:text-white md:text-7xl"
            >
              {t("medicalProgramsTitle")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              {t("medicalProgramsDescription")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase text-zinc-700 dark:text-zinc-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition hover:border-orange-500 dark:border-zinc-700 dark:bg-zinc-900">
                  <ArrowLeft className="h-4 w-4" />
                </span>
                {t("backToHome")}
              </Link>
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
                  {t("watchVideo")}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Sticky subnav + progress */}
        <div className="sticky top-[64px] z-30 border-t border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/80">
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 md:px-8">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => smoothScrollTo(s.id)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition ${
                  activeSec === s.id
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </section>

      {/* OVERVIEW — matching home page style */}
      <motion.section
        className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        id="overview"
      >
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-16 md:px-8 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <SectionTitle
              overline={t("overview")}
              title={t("programSnapshot")}
              description={t("programSnapshotDescription")}
            />
          </div>
          <div className="grid grid-cols-2 gap-6 lg:col-span-2">
            <motion.div variants={itemVariants}>
              <Stat
                icon={<BookOpen className="h-7 w-7" />}
                value="4"
                label={t("medicalPrograms")}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Stat
                icon={<GraduationCap className="h-7 w-7" />}
                value="800"
                label={t("totalSeats")}
                color="text-green-600"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Stat
                icon={<Globe className="h-7 w-7" />}
                value="$2,800"
                label={t("annualTuition")}
                color="text-purple-600"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Stat
                icon={<Users className="h-7 w-7" />}
                value={t("noExam")}
                label={t("required")}
                color="text-orange-600"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SPOTLIGHT */}
      <section
        className="border-b border-zinc-200 bg-white p-4 md:p-8"
        id="spotlight"
      >
        <div className="container mx-auto max-w-7xl">
          <SectionTitle
            overline={t("spotlight")}
            title={t("programShowcase")}
            description={t("programShowcaseDescription")}
          />
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <div className="relative aspect-[16/7] w-full">
              <Image
                src={programs[spotIdx].heroImage}
                alt={programs[spotIdx].name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <motion.div
                key={programs[spotIdx].id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45 }}
                className="absolute bottom-5 left-5 right-5 mx-auto max-w-3xl rounded-2xl border border-white/30 bg-white/20 p-4 text-white backdrop-blur"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-white/80">
                      {programs[spotIdx].level}
                    </div>
                    <h3 className="text-2xl font-black uppercase">
                      {programs[spotIdx].name}
                    </h3>
                    <p className="mt-1 text-sm text-white/85">
                      {programs[spotIdx].description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {programs[spotIdx].highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-zinc-800"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/programs/${programs[spotIdx].id}`}
                    className="group inline-flex h-10 items-center gap-2 rounded-full border border-white/70 bg-white/10 px-4 text-xs font-bold uppercase backdrop-blur transition hover:bg-white/20"
                  >
                    {t("details")}{" "}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
            <span className="block h-[2px] w-full bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500" />
          </div>
        </div>
      </section>

      {/* PROGRAMS — поиск/сортировка/вид */}
      <section
        className="border-b border-zinc-200 bg-white p-4 md:p-8"
        id="programs"
      >
        <div className="container mx-auto max-w-7xl">
          <SectionTitle title={t("medicalProgramsSectionTitle")} />
          {/* Controls */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("searchPrograms")}
                className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm text-zinc-700 outline-none ring-0 transition placeholder:text-zinc-400 focus:border-orange-400"
              />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white p-1">
              {(["default", "name", "duration"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`rounded-full px-3 py-1.5 text:[11px] text-[11px] font-bold uppercase tracking-widest ${
                    sortBy === key ? "bg-zinc-900 text-white" : "text-zinc-600"
                  }`}
                >
                  {key === "default" && (
                    <Filter className="mr-1 inline h-3.5 w-3.5" />
                  )}
                  {key === "name" && (
                    <SortAsc className="mr-1 inline h-3.5 w-3.5" />
                  )}
                  {key === "duration" && (
                    <Clock className="mr-1 inline h-3.5 w-3.5" />
                  )}
                  {key === "default"
                    ? t("default")
                    : key[0].toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
            <div className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1">
              {(["cards", "compact"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest ${
                    view === v ? "bg-zinc-900 text-white" : "text-zinc-600"
                  }`}
                >
                  {v === "cards" ? t("cards") : t("compact")}
                </button>
              ))}
            </div>
          </div>

          {/* Grid/List */}
          {view === "cards" ? (
            <div className="grid gap-6 md:grid-cols-2">
              {sorted.map((p) => (
                <ProgramCardPro
                  key={p.id}
                  program={p}
                  selected={selected.includes(p.id)}
                  onToggle={() => toggleSelect(p.id)}
                />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-zinc-200">
              <div className="grid grid-cols-12 bg-zinc-50 px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-600">
                <div className="col-span-5">{t("program")}</div>
                <div className="col-span-2">{t("level")}</div>
                <div className="col-span-2">{t("duration")}</div>
                <div className="col-span-2">{t("tuition")}</div>
                <div className="col-span-1 text-right">{t("seats")}</div>
              </div>
              {sorted.map((p, i) => (
                <div
                  key={p.id}
                  className={`grid grid-cols-12 items-center px-4 py-4 text-sm ${
                    i % 2 ? "bg-white" : "bg-white/60"
                  }`}
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-200 text-orange-600">
                      <p.icon className="h-4 w-4" />
                    </span>
                    <div className="font-semibold">{p.name}</div>
                  </div>
                  <div className="col-span-2">
                    <Badge variant="secondary">{p.level}</Badge>
                  </div>
                  <div className="col-span-2">{p.duration}</div>
                  <div className="col-span-2">{currency(p.tuition)}/{t("year")}</div>
                  <div className="col-span-1 text-right">
                    <Badge className="bg-red-100 text-red-700">{p.quota}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Compare bar */}
          <AnimatePresence>
            {selected.length > 0 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed inset-x-4 bottom-4 z-40 rounded-2xl border border-zinc-200 bg-white/95 p-3 shadow-xl backdrop-blur md:inset-x-auto md:right-6 md:w-[520px]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-zinc-900 text-white">
                      {selected.length}
                    </span>
                    <div className="text-sm font-semibold">
                      {t("selectedForComparison")}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setCompareOpen(true)}
                      className="h-9 rounded-full bg-zinc-900 text-white hover:bg-zinc-800"
                    >
                      {t("compare")}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={clearSelected}
                      className="h-9 rounded-full"
                    >
                      {t("clear")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <motion.section
        className="border-b border-zinc-200 bg-zinc-50 p-4 md:p-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        id="requirements"
      >
        <div className="container mx-auto max-w-7xl">
          <SectionTitle title={t("admissionRequirementsTitle")} />
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{t("generalRequirements")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-zinc-700">
                    <li>• {t("highSchoolDiploma")}</li>
                    <li>• {t("passportCopy")}</li>
                    <li>• {t("officialTranscript")}</li>
                    <li>• {t("recentPhoto")}</li>
                    <li>• {t("onlineMeeting")}</li>
                    <li>• {t("noEntranceExam")}</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{t("englishProficiency")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-zinc-700">
                    <li>• {t("basicCommunicationLevel")}</li>
                    <li>• {t("ieltsToeflOrInterview")}</li>
                    <li>• {t("englishMediumGraduatesExempt")}</li>
                    <li>• {t("friendlyOnlineAssessment")}</li>
                    <li>• {t("personalInvitation")}</li>
                    <li>• {t("assessmentWithinWeek")}</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* PROCESS — живой степпер */}
      <section
        className="border-b border-zinc-200 bg-zinc-50 p-4 md:p-8"
        id="process"
      >
        <div className="container mx-auto max-w-7xl">
          <SectionTitle
            overline={t("howItWorks")}
            title={t("applicationProcess")}
            description={t("processDescription")}
          />
          <ProcessInteractive />
        </div>
      </section>

      {/* TIMELINE — горизонтальный со скролл-прогрессом */}
      <section
        className="border-b border-zinc-200 bg-white p-4 md:p-8"
        id="timeline"
      >
        <div className="container mx-auto max-w-7xl">
          <SectionTitle
            overline={t("importantDates")}
            title={t("applicationTimelineTitle")}
            description={t("timelineDescription")}
          />
          <TimelineScroller />
        </div>
      </section>

      {/* FEES — luxe прайсинг */}
      <section
        className="border-b border-zinc-200 bg-white p-4 md:p-8"
        id="fees"
      >
        <div className="container mx-auto max-w-7xl">
          <SectionTitle
            overline={t("costs")}
            title={t("tuitionAndFees")}
            description={t("tuitionDescription")}
          />
          <FeesLuxury />
        </div>
      </section>

      {/* OUTGOING STUDENTS */}
      <section id="outgoing-students" className="border-b border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Students"
            title="🧳 Outgoing Students"
            description="Mobility opportunities for UTU-RANCH students"
          />

          <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
            <div>
              <p className="mb-4 font-semibold text-lg">Students of UTU-RANCH can participate in:</p>
              <ul className="list-disc space-y-3 pl-6">
                <li><strong>Erasmus+ Study Mobility</strong> — one or two semesters abroad at a partner university</li>
                <li><strong>Erasmus+ Traineeships</strong> — professional internships abroad</li>
                <li><strong>Guest Student Programs</strong> — short-term academic or cultural mobility</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="mb-3 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">Application Process</h3>
              <ol className="list-decimal space-y-3 pl-6 text-zinc-700 dark:text-zinc-300">
                <li>Check the current Erasmus+ or international mobility call.</li>
                <li>Choose a partner university and confirm available courses.</li>
                <li>Submit your application (transcript, motivation letter, passport copy).</li>
                <li>Attend the interview organized by the International Department.</li>
              </ol>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="mb-3 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">Pre-Departure Support</h3>
              <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                The International Department assists with visa, health/travel insurance, and accommodation arrangements. Students also receive guidance on grant procedures and travel planning.
              </p>
              <h4 className="mt-4 mb-2 font-semibold text-zinc-900 dark:text-zinc-100">Financial Support</h4>
              <p className="text-zinc-700 dark:text-zinc-300">
                Erasmus+ selected students receive mobility grants covering travel and living expenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INCOMING STUDENTS */}
      <section id="incoming-students" className="border-b border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Students"
            title="🎓 Incoming Students"
            description="Opportunities for international students to study at UTU-RANCH"
          />
          <p className="max-w-4xl text-zinc-700 dark:text-zinc-300 mb-6">
            UTU-RANCH welcomes international students from partner universities for Erasmus+ and short-term mobility programs.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="mb-3 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">Application Procedure</h3>
              <ol className="list-decimal space-y-3 pl-6 text-zinc-700 dark:text-zinc-300">
                <li>Be nominated by your home university.</li>
                <li>Submit your Application Form, Learning Agreement, Transcript, and Passport copy.</li>
                <li>Receive your official Letter of Acceptance from UTU-RANCH.</li>
              </ol>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="mb-3 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">Support Services</h3>
              <ul className="list-disc space-y-3 pl-6 text-zinc-700 dark:text-zinc-300">
                <li><strong>Orientation Week</strong> for incoming students</li>
                <li><strong>Buddy System:</strong> Each international student is assigned a UTU-RANCH student who helps with integration, housing, and local guidance</li>
                <li><strong>Free Uzbek and Russian language assistance</strong></li>
                <li><strong>Support with accommodation, insurance, and visa registration</strong></li>
              </ul>
              <div className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
                📩 Contact: internationaldepartment@utu-ranch.uz<br/>
                📞 +998 99 825 0297 | +998 93 754 3833
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-b border-zinc-200 bg-zinc-50 p-4 md:p-8"
        id="faq"
      >
        <div className="container mx-auto max-w-7xl">
          <SectionTitle title={t("faq")} />
          <div className="mx-auto grid max-w-3xl gap-3">
            {[
              {
                q: t("faqEntranceExamQ"),
                a: t("faqEntranceExamA"),
              },
              {
                q: t("faqIeltsQ"),
                a: t("faqIeltsA"),
              },
              {
                q: t("faqDecisionQ"),
                a: t("faqDecisionA"),
              },
              {
                q: t("faqSecurePlaceQ"),
                a: t("faqSecurePlaceA"),
              },
            ].map((it, i) => (
              <FAQItem key={i} q={it.q} a={it.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative flex min-h-[44vh] items-center justify-center overflow-hidden bg-black px-4 py-16 text-center text-white md:px-8">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          poster="/images/medical-students.jpg"
        >
          <source src="/videos/abstract-lines.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_70%)]" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55 }}
            className="text-4xl font-black uppercase md:text-6xl"
          >
            {t("readyToStartMedicalCareer")}
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
            {t("medicalCareerDescription")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={handleApplyNow}
              className="h-12 rounded-full border-2 border-orange-500 bg-orange-500 px-8 font-bold text-white transition hover:-translate-y-0.5"
            >
              {t("applyNow")}
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-full border-2 border-white/70 bg-transparent px-8 font-bold text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              {t("scheduleConsultation")}
            </Button>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />

      {/* Compare Modal */}
      <AnimatePresence>
        {isCompareOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setCompareOpen(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              className="absolute inset-x-4 top-[10vh] z-50 mx-auto max-w-5xl rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl md:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-lg font-bold">
                  <Star className="h-5 w-5 text-orange-500" /> {t("programComparison")}
                </div>
                <button
                  className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200"
                  onClick={() => setCompareOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {selectedPrograms.length === 0 ? (
                <div className="py-10 text-center text-sm text-zinc-600">
                  {t("noProgramsSelected")}
                </div>
              ) : (
                <div className="overflow-auto">
                  <table className="w-full min-w-[680px] text-sm">
                    <thead className="bg-zinc-50">
                      <tr className="text-left">
                        <th className="p-3 font-semibold">{t("program")}</th>
                        {selectedPrograms.map((p) => (
                          <th key={p.id} className="p-3 font-semibold">
                            {p.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: t("level"), get: (p: Program) => p.level },
                        { label: t("duration"), get: (p: Program) => p.duration },
                        {
                          label: t("tuition"),
                          get: (p: Program) => `${currency(p.tuition)}/${t("year")}`,
                        },
                        { label: t("seats"), get: (p: Program) => p.quota },
                        {
                          label: t("highlights"),
                          get: (p: Program) => p.highlights.join(", "),
                        },
                      ].map((row) => (
                        <tr key={row.label} className="border-t">
                          <td className="p-3 font-medium text-zinc-600">
                            {row.label}
                          </td>
                          {selectedPrograms.map((p) => (
                            <td key={p.id + row.label} className="p-3">
                              {row.get(p) as any}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-4 flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={clearSelected}
                  className="rounded-full"
                >
                  Clear selection
                </Button>
                <Button
                  onClick={() => setCompareOpen(false)}
                  className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800"
                >
                  Done
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===========================
   Program Card Pro
   =========================== */
function ProgramCardPro({
  program,
  selected,
  onToggle,
}: {
  program: Program;
  selected: boolean;
  onToggle: () => void;
}) {
  const Icon = program.icon;
  const [open, setOpen] = useState(false);

  return (
    <Card className="group relative overflow-hidden border border-zinc-200 bg-white shadow-md transition hover:shadow-2xl">
      {/* luxe glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-orange-300/60" />
      <CardHeader className="pb-2">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-zinc-200 bg-white text-orange-600">
              <Icon className="h-5 w-5" />
            </span>
            <CardTitle className="text-2xl text-zinc-900">
              {program.name}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-100 text-red-700">
              {program.quota} seats
            </Badge>
            <button
              onClick={onToggle}
              className={`grid h-8 w-8 place-items-center rounded-full border text-zinc-700 transition ${
                selected
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-zinc-200 bg-white hover:border-orange-400 hover:text-orange-600"
              }`}
              aria-pressed={selected}
              title="Select for comparison"
            >
              {selected ? (
                <Check className="h-4 w-4" />
              ) : (
                <Info className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        <CardDescription className="text-sm text-zinc-600">
          {program.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-zinc-700">
            <BadgeCheck className="h-3.5 w-3.5" />
            {program.level}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:flex sm:flex-wrap sm:items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-zinc-700">
            <Clock className="h-3.5 w-3.5" />
            {program.duration}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-600">
            <GraduationCap className="h-3.5 w-3.5" />
            {currency(program.tuition)}/year
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {program.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full bg-orange-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-600"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/programs/${program.id}`}
            className="relative inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-700 hover:border-orange-400 hover:text-orange-600"
          >
            Program details <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-zinc-300 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-700 hover:border-orange-400 hover:text-orange-600"
          >
            {open ? "Hide" : "More info"}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700"
            >
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Clinics/Practice
                  </div>
                  <div>Simulation center, partner hospitals</div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Language
                  </div>
                  <div>English-medium instruction</div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Intake
                  </div>
                  <div>Fall 2025</div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Location
                  </div>
                  <div>Main Campus</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500 transition duration-300 group-hover:scale-x-100" />
    </Card>
  );
}

/* ===========================
   TIMELINE (горизонтальный)
   =========================== */
function TimelineScroller() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const items = [
    {
      title: "Application Window",
      range: "July 1 – Sep 15",
      desc: "Подавай документы онлайн. Чем раньше, тем лучше.",
      c1: "from-orange-500 to-amber-400",
      icon: CalendarDays,
    },
    {
      title: "Document Review",
      range: "Within 1 Week",
      desc: "Проверим пакет и пришлём приглашение на онлайн-интервью.",
      c1: "from-green-500 to-emerald-400",
      icon: ShieldCheck,
    },
    {
      title: "Decision Day",
      range: "Same Day",
      desc: "Решение сообщаем в день онлайн-встречи.",
      c1: "from-indigo-500 to-fuchsia-500",
      icon: Receipt,
    },
  ];

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const p = el.scrollLeft / (el.scrollWidth - el.clientWidth || 1);
    setProgress(Math.max(0, Math.min(1, p)));
  };

  return (
    <div className="relative">
      {/* верхний прогресс */}
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {/* скролл-лента */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="grid snap-x snap-mandatory auto-cols-[86%] grid-flow-col gap-6 overflow-x-auto pb-2 md:auto-cols-[50%] lg:auto-cols-[40%]"
      >
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45 }}
              className="snap-start"
            >
              <div className="group relative h-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-2xl">
                {/* неоновая подложка */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${it.c1} opacity-0 mix-blend-multiply blur-2xl transition duration-300 group-hover:opacity-30`}
                />
                <div className="relative z-10 p-6">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                    <Icon className="h-3.5 w-3.5 text-orange-600" />
                    {it.range}
                  </div>
                  <h3 className="text-xl font-extrabold uppercase text-zinc-900">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600">{it.desc}</p>
                </div>
                <div className={`h-[2px] w-full bg-gradient-to-r ${it.c1}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-3 text-right text-[11px] uppercase tracking-widest text-zinc-500">
        Swipe / Scroll →
      </div>
    </div>
  );
}

/* ===========================
   PROCESS (интерактивный степпер)
   =========================== */
function ProcessInteractive() {
  const steps = [
    {
      id: "s1",
      title: "Submit Online Application",
      desc: "Заполни форму и приложи документы.",
    },
    { id: "s2", title: "Document Review", desc: "Проверим в течение недели." },
    {
      id: "s3",
      title: "Online Interview",
      desc: "Короткая дружелюбная беседа на английском.",
    },
    {
      id: "s4",
      title: "Admission Decision",
      desc: "Сообщаем решение в этот же день.",
    },
    {
      id: "s5",
      title: "Registration & Deposit",
      desc: "60 секунд — и место за тобой (50% депозита).",
    },
  ];

  const [done, setDone] = useState<string[]>([]);
  const toggle = (id: string) =>
    setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));
  const completeAll = () => setDone(steps.map((s) => s.id));
  const reset = () => setDone([]);

  const pct = Math.round((done.length / steps.length) * 100);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* stepper */}
      <div className="lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-semibold text-zinc-700">
            Progress: {done.length}/{steps.length}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={completeAll}
              className="h-9 rounded-full bg-zinc-900 text-white hover:bg-zinc-800"
            >
              Mark all
            </Button>
            <Button
              variant="outline"
              onClick={reset}
              className="h-9 rounded-full"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* визуальный прогресс */}
        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-zinc-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500"
          />
        </div>

        {/* змейка-степпер */}
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-[2px] rounded-full bg-gradient-to-b from-orange-300 via-amber-300 to-fuchsia-300 md:left-1/2" />
          <div className="space-y-6">
            {steps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-8 ${
                    right ? "md:direction-rtl" : ""
                  }`}
                >
                  <div
                    className={`pl-10 md:pl-0 ${right ? "md:col-start-2" : ""}`}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-xl">
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-500 via-amber-400 to-fuchsia-500" />
                      <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-600">
                        Step {i + 1}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-bold uppercase text-zinc-900">
                            {s.title}
                          </h4>
                          <p className="mt-1 text-sm text-zinc-600">{s.desc}</p>
                        </div>
                        <button
                          onClick={() => toggle(s.id)}
                          className={`mt-1 grid h-8 w-8 place-items-center rounded-full border transition ${
                            done.includes(s.id)
                              ? "border-orange-500 bg-orange-500 text-white"
                              : "border-zinc-300 text-zinc-600 hover:border-orange-400 hover:text-orange-600"
                          }`}
                          title="Mark step"
                        >
                          {done.includes(s.id) ? (
                            <ShieldCheck className="h-4 w-4" />
                          ) : (
                            <CalendarDays className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* стеклянная карточка с подсказками */}
      <div>
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-md">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-orange-500/15 blur-2xl" />
          <div className="pointer-events-none absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-2xl" />
          <h5 className="text-lg font-extrabold uppercase">Quick Tips</h5>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            <li>• Готовь сканы документов заранее.</li>
            <li>• На интервью — просто поговорим, это не экзамен.</li>
            <li>• Депозит 50% закрепляет квоту за тобой.</li>
          </ul>
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            No exam required — только дружелюбная беседа на английском.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===========================
   FEES (lux / receipt + конвертация)
   =========================== */
function FeesLuxury() {
  const [scholarship, setScholarship] = useState<number>(0); // %
  const discountedYear = Math.max(
    0,
    Math.round(BASE_TUITION * (1 - scholarship / 100))
  );
  const [plan, setPlan] = useState<"year" | "semester" | "monthly">("year");
  const amount =
    plan === "year"
      ? discountedYear
      : plan === "semester"
      ? Math.ceil(discountedYear / 2)
      : Math.ceil(discountedYear / 10);

  const [rate, setRate] = useState<string>(""); // курс UZS за 1 USD
  const rateNum = parseFloat(rate.replace(",", "."));
  const toUZS = (usd: number) =>
    rateNum > 0
      ? (usd * rateNum).toLocaleString("en-US", { maximumFractionDigits: 0 })
      : "";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* большая карточка с ценой */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-orange-500/5 p-6">
        <div className="pointer-events-none absolute -left-10 -top-10 h-52 w-52 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <CardHeader className="mb-4 p-0 text-center">
          <CardTitle className="text-2xl text-orange-600">
            All Medical Programs
          </CardTitle>
          <CardDescription>Одна годовая ставка на программу</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center">
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Base
              </div>
              <div className="mt-1 text-4xl font-extrabold text-zinc-900">
                ${BASE_TUITION}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 text-center">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(200px_200px_at_85%_15%,rgba(253,186,116,0.18),transparent_60%)]" />
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                After Scholarship
              </div>
              <div className="mt-1 text-4xl font-extrabold text-orange-600">
                ${discountedYear}
              </div>
              {scholarship > 0 && (
                <div className="mt-1 text-xs text-zinc-500">
                  <span className="line-through opacity-70">
                    ${BASE_TUITION}
                  </span>{" "}
                  &nbsp;−{scholarship}%
                </div>
              )}
              <div className="mt-4">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                  Scholarship %
                </label>
                <input
                  type="range"
                  min={0}
                  max={80}
                  step={5}
                  value={scholarship}
                  onChange={(e) => setScholarship(parseInt(e.target.value))}
                  className="mt-2 w-full accent-orange-500"
                />
              </div>
            </div>
          </div>

          {/* сегмент выбора плана */}
          <div className="mt-6 inline-flex rounded-full border border-zinc-200 bg-white p-1">
            {(["year", "semester", "monthly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest ${
                  plan === p ? "bg-zinc-900 text-white" : "text-zinc-700"
                }`}
              >
                {p === "year"
                  ? "Year"
                  : p === "semester"
                  ? "Semester"
                  : "Monthly"}
              </button>
            ))}
          </div>

          {/* «receipt» разбивка */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <div className="grid grid-cols-12 bg-zinc-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-600">
              <div className="col-span-6">Plan</div>
              <div className="col-span-3 text-right">USD</div>
              <div className="col-span-3 text-right">UZS</div>
            </div>

            <div className="divide-y">
              <Row
                plan="Selected"
                usd={amount}
                uzs={toUZS(amount)}
                icon={<Wallet className="h-4 w-4" />}
              />
              {plan !== "monthly" && (
                <>
                  <Row
                    plan="Deposit (50%)"
                    usd={Math.ceil(discountedYear / 2)}
                    uzs={toUZS(Math.ceil(discountedYear / 2))}
                    icon={<CreditCard className="h-4 w-4" />}
                  />
                  <Row
                    plan="Remainder"
                    usd={Math.floor(discountedYear / 2)}
                    uzs={toUZS(Math.floor(discountedYear / 2))}
                    icon={<Banknote className="h-4 w-4" />}
                  />
                </>
              )}
              {plan === "monthly" &&
                new Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <Row
                      key={i}
                      plan={`Month ${i + 1}`}
                      usd={amount}
                      uzs={toUZS(amount)}
                      icon={<Receipt className="h-4 w-4" />}
                    />
                  ))}
            </div>
          </div>

          {/* курс */}
          <div className="mt-4 flex items-center gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-600">
              Enter rate (UZS per $)
            </label>
            <input
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="например, 13000"
              className="w-40 rounded-lg border border-zinc-300 px-3 py-1 text-sm outline-none focus:border-orange-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* карточка «что включено» */}
      <Card className="p-6">
        <CardHeader className="p-0">
          <CardTitle className="text-xl">What’s Included</CardTitle>
          <CardDescription>Прозрачно и по делу</CardDescription>
        </CardHeader>
        <CardContent className="mt-4 grid gap-3 text-sm text-zinc-700">
          <Included line="Обучение на английском" />
          <Included line="Доступ к симуляционному центру" />
          <Included line="Клиническая практика на партнёрских базах" />
          <Included line="Экзамены и зачёты" />
          <Included line="Студенческий билет и кампус-сервисы" />
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            Примечание: административные/визовые платежи, проживание и
            медстраховка оплачиваются отдельно.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({
  plan,
  usd,
  uzs,
  icon,
}: {
  plan: string;
  usd: number;
  uzs: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 items-center px-4 py-3 text-sm">
      <div className="col-span-6 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700">
          {icon}
        </span>
        {plan}
      </div>
      <div className="col-span-3 text-right font-semibold">${usd}</div>
      <div className="col-span-3 text-right text-zinc-600">
        {uzs ? `so'm ${uzs}` : "—"}
      </div>
    </div>
  );
}

function Included({ line }: { line: string }) {
  return (
    <div className="flex items-center gap-2">
      <ShieldCheck className="h-4 w-4 text-orange-600" />
      <span>{line}</span>
    </div>
  );
}

/* ===========================
   FAQ Item
   =========================== */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <div className="text-sm font-semibold">{q}</div>
        <ChevronDown
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="px-4 pb-4 text-sm text-zinc-600"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
