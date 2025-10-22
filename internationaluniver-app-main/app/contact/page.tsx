"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, MapPin, Phone, Mail, Clock, MessageSquare, Calendar, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getTranslation, type Language } from "@/lib/i18n"

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

export default function ContactPage() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const t = (key: string) => getTranslation(key, currentLang)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // global scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  const departments = [
    {
      name: t("admissionsOffice"),
      description: t("admissionsOfficeDesc"),
      email: "admissions@utu-ranch.uz",
      phone: "+998 62 227 77 72",
      hours: t("mondayFriday") + ", " + t("sunday"),
      location: t("khanqaStreet") + ", " + t("urgenchCity"),
    },
    {
      name: t("internationalStudentServices"),
      description: t("internationalStudentServicesDesc"),
      email: "admissions@utu-ranch.uz",
      phone: "+998 62 227 77 72",
      hours: t("mondayFriday"),
      location: t("khanqaStreet") + ", " + t("urgenchCity"),
    },
    {
      name: t("medicalProgramsOffice"),
      description: t("medicalProgramsOfficeDesc"),
      email: "admissions@utu-ranch.uz",
      phone: "+998 62 227 77 72",
      hours: t("mondayFriday"),
      location: t("khanqaStreet") + ", " + t("urgenchCity"),
    },
    {
      name: t("studentSupport"),
      description: t("studentSupportDesc"),
      email: "admissions@utu-ranch.uz",
      phone: "+998 62 227 77 72",
      hours: t("mondayFriday"),
      location: t("telegramBot"),
    },
  ]

  return (
    <div className="min-h-screen bg-white font-mono text-zinc-900 selection:bg-orange-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      {/* top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500"
      />

      <Navbar currentLang={currentLang} onLanguageChange={setCurrentLang} faculties={[]} brand={{ initials: "UTU", label: "University", href: "/" }} />

      {/* HERO — matching home page style */}
      <section className="relative isolate overflow-hidden">
        {/* Background image anchored to the right */}
        <Image
          src="/images/ranch-exterior.jpg"
          alt="RANCH University contact"
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
                {t("contact")}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-5xl font-black uppercase leading-[0.95] text-black dark:text-white md:text-7xl"
            >
              {t("contact")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              {t("weAreHereToHelp")}
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
              <Link
                href="#contact-form"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase text-zinc-700 dark:text-zinc-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition hover:border-orange-500 dark:border-zinc-700 dark:bg-zinc-900">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <span className="border-b border-dotted border-zinc-400 group-hover:border-orange-500 dark:border-zinc-600">
                  {t("sendMessage")}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUICK CONTACT INFO */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline={t("contact")}
            title={t("quickContactInformation")}
            description={t("getInTouch")}
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Phone className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-100">{t("callUs")}</h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">+998 62 227 77 72</p>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">{t("monFriHours")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Mail className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-100">{t("emailUs")}</h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">admissions@utu-ranch.uz</p>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">{t("responseWithin24Hours")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-100">{t("visitUs")}</h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">26 Khanqa street</p>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">Urgench, Khorezm 220100</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-100">{t("officeHours")}</h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">{t("monFriHours")}</p>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">{t("sundayHours")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="border-b border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline={t("departments")}
            title={t("contactDepartments")}
            description={t("getInTouchRightDepartment")}
          />
          
          <div className="grid gap-6 md:grid-cols-2">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
              >
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">
                  {dept.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  {dept.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                    <Mail className="h-4 w-4 text-orange-600" />
                    {dept.email}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                    <Phone className="h-4 w-4 text-orange-600" />
                    {dept.phone}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                    <Clock className="h-4 w-4 text-orange-600" />
                    {dept.hours}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    {dept.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="International Relations Office"
            title="Leadership"
            description="Meet our international relations team"
          />
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="mb-4 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">Leadership Team</h3>
              <ul className="space-y-4 text-zinc-700 dark:text-zinc-300">
                <li>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">Vice-Rector for International Relations</div>
                  <div className="text-sm">PhD, dotsent, Ruzmetov Davron Ibrogimovich</div>
                  <a href="mailto:d.ruzmetov@utu-ranch.uz" className="text-orange-600 hover:underline text-sm">d.ruzmetov@utu-ranch.uz</a>
                </li>
                <li>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">Head of International Relations Department</div>
                  <div className="text-sm">Ataboev Javokhir Kamalovich</div>
                  <a href="mailto:a.javoxir@utu-ranch.uz" className="text-orange-600 hover:underline text-sm">a.javoxir@utu-ranch.uz</a>
                </li>
                <li>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">Erasmus+ Coordinator</div>
                  <div className="text-sm">Jumaniyozova Shakhodat Kudrat kizi</div>
                  <a href="mailto:internationaldepartment@utu-ranch.uz" className="text-orange-600 hover:underline text-sm">internationaldepartment@utu-ranch.uz</a>
                </li>
                <li>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">Specialist of International Relations</div>
                  <div className="text-sm">Rakhimboeva Mashkhura Bakhtiyor kizi</div>
                  <a href="mailto:mashkhuraitaly@gmail.com" className="text-orange-600 hover:underline text-sm">mashkhuraitaly@gmail.com</a>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="mb-4 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">General Contact</h3>
              <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">International Relations Office</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-orange-600" />
                      <a href="mailto:internationaldepartment@utu-ranch.uz" className="text-orange-600 hover:underline">
                        internationaldepartment@utu-ranch.uz
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-orange-600" />
                      +998 99 825 0297 | +998 93 754 3833
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    For general inquiries about international programs, partnerships, and mobility opportunities, please contact our International Relations Office.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" className="border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Message"
            title="Send Us a Message"
            description="Have a question? Fill out the form below and we'll get back to you as soon as possible."
          />
          
          <div className="mx-auto max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                    placeholder={t("enterYourEmail")}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-2">
                  {t("subject")}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                  placeholder={t("whatIsThisAbout")}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-2">
                  {t("message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="rounded-xl border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                  placeholder={t("tellUsMore")}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full h-12 rounded-xl border-2 border-orange-500 bg-orange-500 px-8 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-orange-600"
              >
                {t("sendMessage")}
              </Button>
            </form>
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
            {t("readyToStartJourney")}
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
            {t("contactUsToday")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={() => window.open("https://admission.utu-ranch.uz", "_blank")}
              className="h-12 rounded-xl border-2 border-orange-500 bg-orange-500 px-8 font-bold text-white transition hover:-translate-y-0.5"
            >
              {t("applyNow")}
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-2 border-white/70 bg-transparent px-8 font-bold text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              {t("scheduleCall")}
            </Button>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
    </div>
  )
}
