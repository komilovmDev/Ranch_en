"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, Clock, Users, Award, Globe, BookOpen, Stethoscope, Heart, Brain, Play, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTranslation, type Language } from "@/lib/i18n"

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/3 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-500/30 via-indigo-400/20 to-purple-500/20 blur-3xl dark:from-blue-500/20 dark:via-indigo-400/10 dark:to-purple-500/10" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[50vh] w-[50vw] rounded-full bg-gradient-to-tr from-sky-500/20 via-cyan-400/10 to-blue-500/10 blur-3xl" />
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

export default function MedicineFaculty() {
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

  const programs = [
    {
      name: "General Medicine",
      duration: "6 years",
      degree: "MD",
      description: "Comprehensive medical education covering all aspects of human health and disease",
      specializations: ["Internal Medicine", "Surgery", "Pediatrics", "Gynecology"],
    },
    {
      name: "Dentistry",
      duration: "5 years",
      degree: "DDS",
      description: "Complete dental education focusing on oral health and dental procedures",
      specializations: ["Orthodontics", "Oral Surgery", "Periodontics", "Endodontics"],
    },
    {
      name: "Pharmacy",
      duration: "5 years",
      degree: "PharmD",
      description: "Pharmaceutical sciences and drug development program",
      specializations: ["Clinical Pharmacy", "Industrial Pharmacy", "Pharmacology", "Drug Research"],
    },
  ]

  const admissionRequirements = [
    "High school diploma with minimum 85% in sciences",
    "IELTS 6.0 or equivalent English proficiency",
    "Biology, Chemistry, and Physics background",
    "Medical entrance examination",
    "Personal interview",
    "Health certificate",
  ]

  const facilities = [
    {
      name: "Modern Laboratories",
      description: "State-of-the-art medical laboratories with latest equipment",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      name: "Clinical Training Hospital",
      description: "400-bed teaching hospital for practical training",
      icon: <Heart className="h-6 w-6" />,
    },
    {
      name: "Simulation Center",
      description: "Advanced medical simulation for hands-on learning",
      icon: <Stethoscope className="h-6 w-6" />,
    },
    {
      name: "Research Centers",
      description: "Multiple research facilities for medical innovation",
      icon: <BookOpen className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-white font-mono text-zinc-900 selection:bg-blue-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      {/* top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500"
      />

      {/* HERO — matching home page style */}
      <section className="relative isolate overflow-hidden">
        {/* Background image anchored to the right */}
        <Image
          src="/images/medical-students.jpg"
          alt="Faculty of Medicine - RANCH University"
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
              <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                Faculty
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-5xl font-black uppercase leading-[0.95] text-black dark:text-white md:text-7xl"
            >
              Faculty of Medicine
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              Leading medical education in Central Asia with world-class facilities and international standards
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase text-zinc-700 dark:text-zinc-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition hover:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900">
                  <ArrowLeft className="h-4 w-4" />
                </span>
                Back to Programs
              </Link>
              <Button
                onClick={handleApplyNow}
                className="h-12 rounded-xl border-2 border-blue-500 bg-blue-500 px-8 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-600"
              >
                Apply Now
              </Button>
              <Link
                href="#programs"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase text-zinc-700 dark:text-zinc-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition group-hover:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900">
                  <Play className="h-4 w-4" />
                </span>
                <span className="border-b border-dotted border-zinc-400 group-hover:border-blue-500 dark:border-zinc-600">
                  View Programs
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
            overline="Overview"
            title="About the Faculty"
            description="Our Faculty of Medicine is committed to excellence in medical education, research, and clinical practice, preparing students to become compassionate and skilled healthcare professionals."
          />
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Student Body</div>
              <div className="text-zinc-600 dark:text-zinc-300">2,500+ students</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Recognition</div>
              <div className="text-zinc-600 dark:text-zinc-300">WHO recognized</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Global Standards</div>
              <div className="text-zinc-600 dark:text-zinc-300">International partnerships</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="border-b border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Programs"
            title="Medical Programs"
            description="Comprehensive medical education programs designed to prepare students for successful careers in healthcare."
          />
          
          <div className="grid gap-6 md:grid-cols-2">
            {programs.map((program, index) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
              >
                <div className="mb-4">
                  <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {program.degree}
                  </Badge>
                  <Badge variant="outline" className="ml-2">
                    {program.duration}
                  </Badge>
                </div>
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">
                  {program.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  {program.description}
                </p>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Specializations:</div>
                  <div className="flex flex-wrap gap-2">
                    {program.specializations.map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION REQUIREMENTS */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Admission"
            title="Requirements"
            description="Academic and professional requirements for admission to our medical programs."
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {admissionRequirements.map((requirement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300">{requirement}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="border-b border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Facilities"
            title="Medical Resources"
            description="State-of-the-art medical facilities and resources to enhance your learning experience."
          />
          
          <div className="grid gap-6 md:grid-cols-2">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                  {facility.icon}
                </div>
                <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">
                  {facility.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  {facility.description}
                </p>
              </motion.div>
            ))}
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
          poster="/images/medical-students.jpg"
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
            Ready to Heal the World?
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
            Join our Faculty of Medicine and become part of the next generation of healthcare professionals.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={handleApplyNow}
              className="h-12 rounded-xl border-2 border-blue-500 bg-blue-500 px-8 font-bold text-white transition hover:-translate-y-0.5"
            >
              Apply Now
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-2 border-white/70 bg-transparent px-8 font-bold text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
