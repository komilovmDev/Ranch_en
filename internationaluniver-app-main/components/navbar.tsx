"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslation, type Language } from "@/lib/i18n";

type Theme = "light" | "dark";

interface FacultyLink {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavbarProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  onApplyNow?: () => void;
  faculties?: FacultyLink[];
  brand?: { href?: string; initials?: string; label?: string };
}

export default function Navbar({
  currentLang,
  onLanguageChange,
  onApplyNow,
  faculties,
  brand,
}: NavbarProps) {
  // ----- THEME (самостоятельно, с локалстором) -----
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) return saved;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // ----- LANGUAGE (самостоятельно + синхронизация с пропсами) -----
  const [lang, setLang] = useState<Language>(() => {
    if (currentLang) return currentLang;
    if (typeof window === "undefined") return "en";
    const saved = (localStorage.getItem("lang") as Language) || "en";
    return saved;
  });

  useEffect(() => {
    if (currentLang && currentLang !== lang) setLang(currentLang);
  }, [currentLang]); // eslint-disable-line

  const setLanguage = (l: Language) => {
    setLang(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
    onLanguageChange?.(l);
    // глобальное событие для страниц
    try {
      window.dispatchEvent(new CustomEvent("langchange", { detail: l }));
    } catch {}
  };

  // UI state
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [studentsOpen, setStudentsOpen] = useState(false);
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
        setStudentsOpen(false);
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

  const handleApplyNow = () => {
    if (onApplyNow) return onApplyNow();
    window.open("https://admission.utu-ranch.uz", "_blank");
  };

  const studentPages = useMemo(
    () => [
      { name: getTranslation("programs", lang), href: "/programs" },
      { name: "Student Mobility", href: "/student-mobility" },
      { name: "Grading Systems", href: "/grading-systems" },
      { name: getTranslation("visa", lang), href: "/visa" },
      { name: getTranslation("accommodation", lang), href: "/accommodation" },
      { name: getTranslation("studentResources", lang), href: "/resources" },
    ],
    [lang]
  );

  const langs: Language[] = ["en", "ru", "uz" as Language];
  const BrandInitials = brand?.initials ?? getTranslation("utu", lang);
  const BrandLabel = brand?.label ?? getTranslation("university", lang);
  const BrandHref = brand?.href ?? "/";

  return (
    <div
      className={`sticky top-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`relative border-b backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-950/60 ${
          atTop
            ? "bg-transparent border-transparent"
            : "bg-white/70 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 md:hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </button>

            <Link
              href={BrandHref}
              className="group inline-flex items-center gap-3"
            >
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white shadow">
                <span className="text-[10px] font-black">{BrandInitials}</span>
              </div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 group-hover:text-orange-600 dark:text-zinc-100">
                {BrandLabel}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-widest text-zinc-600 transition hover:text-orange-600 dark:text-zinc-300"
            >
              {getTranslation("home", lang)}
            </Link>
            <Link
              href="/about"
              className="text-xs font-bold uppercase tracking-widest text-zinc-600 transition hover:text-orange-600 dark:text-zinc-300"
            >
              {getTranslation("about", lang)}
            </Link>

            {/* Students */}
            <div
              className="relative"
              onMouseEnter={() => setStudentsOpen(true)}
              onMouseLeave={() => setStudentsOpen(false)}
            >
              <button
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-zinc-600 transition hover:text-orange-600 dark:text-zinc-300"
                aria-haspopup="true"
                aria-expanded={studentsOpen}
                onClick={() => setStudentsOpen((v) => !v)}
              >
                {getTranslation("students", lang)}
                <ChevronDown
                  className={`h-3 w-3 transition ${
                    studentsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full z-40 mt-2 w-56 rounded-xl border border-zinc-200 bg-white/95 p-1 shadow-2xl backdrop-blur transition ${
                  studentsOpen
                    ? "visible scale-100 opacity-100"
                    : "invisible scale-95 opacity-0"
                } dark:border-zinc-800 dark:bg-zinc-950/95`}
              >
                {studentPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest text-zinc-700 transition hover:bg-orange-50 hover:text-orange-600 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    onClick={() => setStudentsOpen(false)}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Faculties mega-dropdown */}
            {!!faculties?.length && (
              <div
                className="relative"
                onMouseEnter={() => setFacultiesOpen(true)}
                onMouseLeave={() => setFacultiesOpen(false)}
              >
                <button
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-zinc-600 transition hover:text-orange-600 dark:text-zinc-300"
                  aria-haspopup="true"
                  aria-expanded={facultiesOpen}
                  onClick={() => setFacultiesOpen((v) => !v)}
                >
                  {getTranslation("faculties", lang)}
                  <ChevronDown
                    className={`h-3 w-3 transition ${
                      facultiesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute left-1/2 top-full z-40 mt-3 w-[min(100vw-2rem,920px)] -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-2xl backdrop-blur transition ${
                    facultiesOpen
                      ? "visible scale-100 opacity-100"
                      : "invisible scale-95 opacity-0"
                  } dark:border-zinc-800 dark:bg-zinc-950/95`}
                >
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {faculties.map((f) => (
                      <Link
                        key={f.href}
                        href={f.href}
                        className="group flex items-center gap-3 rounded-xl border border-transparent p-3 hover:border-orange-200 hover:bg-orange-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                      >
                        <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                          {f.icon ? (
                            <f.icon className="h-4 w-4" />
                          ) : (
                            <span className="text-[10px] font-black">UTU</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-bold uppercase text-zinc-900 group-hover:text-orange-600 dark:text-zinc-100">
                            {f.name}
                          </div>
                          <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                            {getTranslation("heroAction.explore", lang)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Link
              href="/partners"
              className="text-xs font-bold uppercase tracking-widest text-zinc-600 transition hover:text-orange-600 dark:text-zinc-300"
            >
              {getTranslation("partners", lang)}
            </Link>
            <Link
              href="/news"
              className="text-xs font-bold uppercase tracking-widest text-zinc-600 transition hover:text-orange-600 dark:text-zinc-300"
            >
              {getTranslation("news", lang)}
            </Link>
            <Link
              href="/contact"
              className="text-xs font-bold uppercase tracking-widest text-zinc-600 transition hover:text-orange-600 dark:text-zinc-300"
            >
              {getTranslation("contact", lang)}
            </Link>
            <Link
              href="/mobility"
              className="text-xs font-bold uppercase tracking-widest text-zinc-600 transition hover:text-orange-600 dark:text-zinc-300"
            >
              Erasmus+
            </Link>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-orange-500 hover:text-orange-600 md:flex dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Language chips (всегда работают локально + шлют событие) */}
            <div className="hidden items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 text-[10px] font-bold uppercase tracking-widest dark:border-zinc-700 dark:bg-zinc-900 md:flex">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`rounded-full px-2 py-1 transition ${
                    lang === l
                      ? "bg-orange-500 text-white"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Theme toggle (всегда есть) */}
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* CTA */}
            <Button
              onClick={handleApplyNow}
              className="hidden h-9 rounded-full border-2 border-orange-500 bg-orange-500 px-4 text-[11px] font-black uppercase tracking-widest text-white hover:bg-orange-600 md:inline-flex"
            >
              {getTranslation("applyNow", lang)}
            </Button>
          </div>
        </div>
      </div>

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
                <span className="text-[10px] font-black">{BrandInitials}</span>
              </div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                {BrandLabel}
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
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {getTranslation("home", lang)}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {getTranslation("about", lang)}
            </Link>

            {/* Students (accordion) */}
            <details className="group rounded-xl">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900">
                {getTranslation("students", lang)}
                <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <div className="mt-1 grid grid-cols-1 gap-1 pl-3">
                {studentPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </details>

            {!!faculties?.length && (
              <details className="group rounded-xl">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900">
                  {getTranslation("faculties", lang)}
                  <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                </summary>
                <div className="mt-1 grid grid-cols-1 gap-1 pl-3">
                  {faculties.map((f) => (
                    <Link
                      key={f.href}
                      href={f.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    >
                      {f.name}
                    </Link>
                  ))}
                </div>
              </details>
            )}

            <Link
              href="/partners"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {getTranslation("partners", lang)}
            </Link>
            <Link
              href="/news"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {getTranslation("news", lang)}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {getTranslation("contact", lang)}
            </Link>
            <Link
              href="/mobility"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              Erasmus+
            </Link>

            <div className="pt-3 space-y-3">
              {/* Mobile language chips */}
              <div className="flex items-center gap-2">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`rounded-full border px-3 py-2 text-[11px] font-bold uppercase tracking-widest ${
                      lang === l
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
                    }`}
                  >
                    {l}
                  </button>
                ))}
                <button
                  onClick={toggleTheme}
                  className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>
              </div>

              <Button
                onClick={handleApplyNow}
                className="w-full rounded-full border-2 border-orange-500 bg-orange-500 text-white hover:bg-orange-600"
              >
                {getTranslation("applyNow", lang)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
