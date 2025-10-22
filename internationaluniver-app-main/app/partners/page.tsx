"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, Globe, Calendar, Users, BookOpen, Award, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getTranslation, type Language } from "@/lib/i18n"
import barcelona from '../../public/logo/barcelona.jpg'
import lleida from '../../public/logo/lleida.jpg'
import ege from '../../public/logo/ege.jpg'
import padova from '../../public/logo/padova.jpg'
import westrn from '../../public/logo/westrn.jpg'
import jihoceska from '../../public/logo/jihoceska.jpg'

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/3 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/30 via-blue-400/20 to-cyan-500/20 blur-3xl dark:from-indigo-500/20 dark:via-blue-400/10 dark:to-cyan-500/10" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[50vh] w-[50vw] rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-400/10 to-red-500/10 blur-3xl" />
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

export default function PartnersPage() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const t = (key: string) => getTranslation(key, currentLang)
  
  const handleApplyNow = () => {
    window.open("https://admission.utu-ranch.uz", "_blank")
  }

  // global scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  const europeanPartners = [
    {
      name: "University of Barcelona",
      country: "Spain",
      established: 2015,
      programs: ["Medicine", "Economics"],
      students: 25,
      description: "Leading Spanish university with excellence in medical and economic research.",
      image: "/images/medical-students.jpg",
    },
    {
      name: "University of Lleida",
      country: "Spain",
      established: 2017,
      programs: ["Medicine", "Innovative Technologies"],
      students: 18,
      description: "Renowned for agricultural sciences and technological innovation programs.",
      image: "/images/university-interior.jpg",
    },
    {
      name: "University of Padua",
      country: "Italy",
      established: 2016,
      programs: ["Medicine", "Philology"],
      students: 22,
      description: "One of the world's oldest universities with strong medical and humanities programs.",
      image: "/images/ranch-exterior.jpg",
    },
    {
      name: "South Bohemia University",
      country: "Czech Republic",
      established: 2018,
      programs: ["Economics", "Innovative Technologies"],
      students: 15,
      description: "Modern university focusing on sustainable development and technology.",
      image: "/images/online-interview.jpg",
    },
    {
      name: "Ege University",
      country: "Turkey",
      established: 2014,
      programs: ["Medicine", "Economics", "Philology"],
      students: 35,
      description: "Major Turkish university with comprehensive international programs.",
      image: "/images/medical-students.jpg",
    },
  ]

  const centralAsiaPartners = [
    {
      name: "Western Caspian University",
      country: "Azerbaijan",
      established: 2019,
      programs: ["Economics", "Innovative Technologies"],
      students: 20,
      description: "Leading private university in Azerbaijan with strong business programs.",
      image: "/images/university-interior.jpg",
    },
    {
      name: "National University of Uzbekistan named after Mirzo Ulugbek",
      country: "Uzbekistan",
      established: 2012,
      programs: ["All Faculties"],
      students: 45,
      description: "Premier national university with comprehensive academic collaboration.",
      image: "/images/ranch-exterior.jpg",
    },
    {
      name: "Tashkent State University of Economics",
      country: "Uzbekistan",
      established: 2013,
      programs: ["Economics"],
      students: 30,
      description: "Specialized economic university with strong research partnerships.",
      image: "/images/online-interview.jpg",
    },
    {
      name: "Urgench Branch of Tashkent Medical Academy",
      country: "Uzbekistan",
      established: 2020,
      programs: ["Medicine"],
      students: 40,
      description: "Regional medical academy with shared clinical training programs.",
      image: "/images/medical-students.jpg",
    },
  ]

  const corporatePartners = [
    {
      name: "Microsoft",
      type: "Technology",
      established: 2021,
      programs: ["Computer Science", "Information Technology"],
      students: 50,
      description: "Global technology leader providing software development and cloud computing training.",
      image: "/images/university-interior.jpg",
    },
    {
      name: "Google",
      type: "Technology",
      established: 2020,
      programs: ["Mobile Development", "AI/ML"],
      students: 35,
      description: "Innovation-focused company offering cutting-edge technology education.",
      image: "/images/ranch-exterior.jpg",
    },
    {
      name: "KPMG",
      type: "Professional Services",
      established: 2019,
      programs: ["Economics", "Business Administration"],
      students: 25,
      description: "Leading audit and consulting firm providing professional development opportunities.",
      image: "/images/online-interview.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-white font-mono text-zinc-900 selection:bg-indigo-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      {/* top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-500"
      />

      <Navbar currentLang={currentLang} onLanguageChange={setCurrentLang} faculties={[]} brand={{ initials: "UTU", label: "University", href: "/" }} />

      {/* HERO — matching home page style */}
      <section className="relative isolate overflow-hidden">
        {/* Background image anchored to the right */}
        <Image
          src="/images/university-interior.jpg"
          alt="International Partners - RANCH University"
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
              <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                {t("partnerships")}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-5xl font-black uppercase leading-[0.95] text-black dark:text-white md:text-7xl"
            >
              {t("internationalPartners")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              {t("internationalPartnersDescription")}
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
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition hover:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900">
                  <ArrowLeft className="h-4 w-4" />
                </span>
                {t("backToHome")}
              </Link>
              <Button
                onClick={handleApplyNow}
                className="h-12 rounded-xl border-2 border-indigo-500 bg-indigo-500 px-8 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-indigo-600"
              >
                Apply Now
              </Button>
              <Link
                href="#partners"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase text-zinc-700 dark:text-zinc-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition group-hover:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900">
                  <Play className="h-4 w-4" />
                </span>
                <span className="border-b border-dotted border-zinc-400 group-hover:border-indigo-500 dark:border-zinc-600">
                  {t("viewPartners")}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline={t("overview")}
            title={t("globalNetwork")}
            description={t("globalNetworkDescription")}
          />
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Globe className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{t("countries")}</div>
              <div className="text-zinc-600 dark:text-zinc-300">{t("countriesValue")}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Users className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{t("students")}</div>
              <div className="text-zinc-600 dark:text-zinc-300">{t("studentsValue")}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Award className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{t("partnerships")}</div>
              <div className="text-zinc-300">{t("partnershipsValue")}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="border-b border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline={t("partners")}
            title={t("ourNetwork")}
            description={t("ourNetworkDescription")}
          />
          
          <Tabs defaultValue="european" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="european">{t("european")}</TabsTrigger>
              <TabsTrigger value="central-asia">{t("centralAsia")}</TabsTrigger>
              <TabsTrigger value="corporate">{t("corporate")}</TabsTrigger>
            </TabsList>

            <TabsContent value="european" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {europeanPartners.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-2xl border border-zinc-200 bg-white shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        className="object-cover transition hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          {partner.country}
                        </Badge>
                        <Badge variant="outline">
                          {partner.established}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">
                        {partner.name}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">
                        {partner.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-semibold">{t("programsLabel")}</span>
                          <span>{partner.programs.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                          <Users className="h-4 w-4" />
                          <span className="font-semibold">{t("studentsLabel")}</span>
                          <span>{partner.students}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="central-asia" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {centralAsiaPartners.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-2xl border border-zinc-200 bg-white shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        className="object-cover transition hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          {partner.country}
                        </Badge>
                        <Badge variant="outline">
                          {partner.established}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">
                        {partner.name}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">
                        {partner.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-semibold">Programs:</span>
                          <span>{partner.programs.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                          <Users className="h-4 w-4" />
                          <span className="font-semibold">Students:</span>
                          <span>{partner.students}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="corporate" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {corporatePartners.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-2xl border border-zinc-200 bg-white shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        className="object-cover transition hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          {partner.type}
                        </Badge>
                        <Badge variant="outline">
                          {partner.established}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">
                        {partner.name}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">
                        {partner.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-semibold">Programs:</span>
                          <span>{partner.programs.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                          <Users className="h-4 w-4" />
                          <span className="font-semibold">Students:</span>
                          <span>{partner.students}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ERASMUS+ PARTNER UNIVERSITIES */}
      <section id="erasmus-partners" className="border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Erasmus+ Cooperation"
            title="🏛️ Erasmus+ Partner Universities"
            description="Active Erasmus+ and international cooperation with leading institutions"
          />
          <p className="max-w-4xl text-zinc-700 dark:text-zinc-300 mb-8">
            UTU-RANCH maintains active Erasmus+ and international cooperation with leading institutions, fostering global learning, joint research, and intercultural exchange.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* University of Lleida */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-950"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-16 bg-white rounded-xl flex items-center justify-center p-2 border border-zinc-200 dark:border-zinc-700">
                  <img src={lleida.src} alt="University of Lleida" className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100">University of Lleida</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">Spain</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                  <span>Erasmus+ Study Mobility</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <span>Staff Exchange Programs</span>
                </div>
              </div>
            </motion.div>

            {/* Ege University */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-950"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-16 bg-white rounded-xl flex items-center justify-center p-2 border border-zinc-200 dark:border-zinc-700">
                  <img src={ege.src} alt="Ege University" className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100">Ege University</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">Turkey</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                  <span>Erasmus+ Study Mobility</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <span>Staff Exchange Programs</span>
                </div>
              </div>
            </motion.div>

            {/* University of Padua */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-950"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-16 bg-white rounded-xl flex items-center justify-center p-2 border border-zinc-200 dark:border-zinc-700">
                  <img src={padova.src} alt="University of Padua" className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100">University of Padua</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">Italy</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                  <span>Erasmus+ Study Mobility</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <span>Staff Exchange Programs</span>
                </div>
              </div>
            </motion.div>

            {/* South Bohemian University */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-950"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-16 bg-white rounded-xl flex items-center justify-center p-2 border border-zinc-200 dark:border-zinc-700">
                  <img src={jihoceska.src} alt="South Bohemian University" className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100">South Bohemian University</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">Czech Republic</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                  <span>Erasmus+ Study Mobility</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <span>Staff Exchange Programs</span>
                </div>
              </div>
            </motion.div>

            {/* Caspian University */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-950"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-16 bg-white rounded-xl flex items-center justify-center p-2 border border-zinc-200 dark:border-zinc-700">
                  <img src={westrn.src} alt="Western Caspian University" className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100">Caspian University</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">Azerbaijan</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                  <span>Erasmus+ Study Mobility</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <span>Staff Exchange Programs</span>
                </div>
              </div>
            </motion.div>

            {/* Placeholder for future partners */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-6 text-center dark:border-zinc-600 dark:bg-zinc-800"
            >
              <div className="w-16 h-16 bg-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-4 dark:bg-zinc-700">
                <Globe className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-600 dark:text-zinc-300 mb-2">More Partners Coming Soon</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                We are continuously expanding our international network
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-black px-4 py-20 text-center text-white md:px-8">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          poster="/images/university-interior.jpg"
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
            {t("readyToGoGlobal")}
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
            {t("goGlobalCTA")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={handleApplyNow}
              className="h-12 rounded-xl border-2 border-indigo-500 bg-indigo-500 px-8 font-bold text-white transition hover:-translate-y-0.5"
            >
              {t("applyNow")}
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-2 border-white/70 bg-transparent px-8 font-bold text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              {t("learnMore")}
            </Button>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
    </div>
  )
}
