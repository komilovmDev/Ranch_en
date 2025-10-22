"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, CheckCircle, Clock, FileText, Globe, DollarSign, Calendar, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function VisaPage() {
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
          alt="RANCH University - Visa Information"
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
                {t("visaGuide")}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-5xl font-black uppercase leading-[0.95] text-black dark:text-white md:text-7xl"
            >
              {t("visaInformationTitle")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              {t("visaInformationDescription")}
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
                  {t("watchGuide")}
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
            title={t("studentVisaTitle")}
            description={t("studentVisaDescription")}
          />
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{t("processingTime")}</div>
              <div className="text-zinc-600 dark:text-zinc-300">{t("processingTimeValue")}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{t("visaFee")}</div>
              <div className="text-zinc-600 dark:text-zinc-300">{t("visaFeeValue")}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{t("validity")}</div>
              <div className="text-zinc-600 dark:text-zinc-300">{t("validityValue")}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* REQUIRED DOCUMENTS */}
      <section className="border-b border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline={t("documents")}
            title={t("requiredDocuments")}
            description={t("requiredDocumentsDescription")}
          />
          
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center mb-4">
                <FileText className="mr-2 h-5 w-5 text-orange-600" />
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100">{t("essentialDocuments")}</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">{t("essentialDocumentsDescription")}</p>
              <ul className="space-y-3">
                {[
                  t("validPassport"),
                  t("completedVisaForm"),
                  t("officialInvitation"),
                  t("academicTranscripts"),
                  t("medicalCertificate"),
                  t("passportPhotos"),
                  t("proofOfFinancial"),
                  t("travelInsurance"),
                ].map((doc, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center mb-4">
                <Globe className="mr-2 h-5 w-5 text-orange-600" />
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100">{t("additionalRequirements")}</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">{t("additionalRequirementsDescription")}</p>
              <ul className="space-y-3">
                {[
                  t("policeClearance"),
                  t("birthCertificate"),
                  t("parentalConsent"),
                  t("bankStatements"),
                  t("employmentLetter"),
                  t("previousVisas"),
                  t("flightItinerary"),
                  t("accommodationConfirmation"),
                ].map((doc, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline={t("process")}
            title={t("visaApplicationProcess")}
            description={t("visaApplicationDescription")}
          />
          
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-orange-400/70 via-zinc-300 to-transparent md:left-1/2" />
              <div className="space-y-8">
                {[
                  {
                    step: "1",
                    title: t("universityAcceptance"),
                    description: t("universityAcceptanceDesc"),
                  },
                  {
                    step: "2",
                    title: t("documentPreparation"),
                    description: t("documentPreparationDesc"),
                  },
                  {
                    step: "3",
                    title: t("visaApplication"),
                    description: t("visaApplicationDesc"),
                  },
                  {
                    step: "4",
                    title: t("processing"),
                    description: t("processingDesc"),
                  },
                  {
                    step: "5",
                    title: t("visaCollection"),
                    description: t("visaCollectionDesc"),
                  },
                ].map((item, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative flex flex-col ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className={`md:w-1/2 ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                          <div className="text-2xl font-bold text-orange-600 mb-2">
                            {item.step}
                          </div>
                          <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-zinc-600 dark:text-zinc-300">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="relative hidden w-0 md:block md:w-1/2">
                        <span className="absolute left-[-6px] top-6 h-3 w-3 rounded-full bg-orange-500 ring-4 ring-white md:left-[calc(50%-6px)]" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSURANCE INFORMATION */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Insurance"
            title="🛡️ Insurance for Incoming Students and Staff"
            description="Urgench Ranch University of Technology"
          />
          
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-zinc-700 dark:text-zinc-300 text-lg">
              All international students and staff participating in exchange or mobility programs at Urgench Ranch University of Technology (UTU-RANCH) must have valid health and travel insurance for the entire duration of their stay in Uzbekistan.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Why Insurance Is Required */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="mr-2 h-5 w-5 text-orange-600" />
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100">Why Insurance Is Required</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Health insurance is a mandatory requirement for:
              </p>
              <ul className="space-y-3">
                {[
                  "Visa application and residence in Uzbekistan",
                  "Registration with migration authorities",
                  "Enrolment at UTU-RANCH"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-zinc-600 dark:text-zinc-300 mt-4 text-sm">
                Having valid insurance ensures access to medical treatment and emergency services while living in Uzbekistan.
              </p>
            </motion.div>

            {/* What Your Insurance Must Cover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center mb-4">
                <FileText className="mr-2 h-5 w-5 text-orange-600" />
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100">What Your Insurance Must Cover</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Your insurance policy should include:
              </p>
              <ul className="space-y-3">
                {[
                  "Medical treatment (outpatient and inpatient)",
                  "Emergency care and hospitalisation",
                  "Medical evacuation or repatriation",
                  "Coverage valid within Uzbekistan",
                  "Validity for the entire period of your mobility",
                  "English, Russian, or Uzbek version of the policy"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-zinc-600 dark:text-zinc-300 mt-4 text-sm">
                <strong>Optional but recommended:</strong> coverage for COVID-19, lost luggage, and personal liability.
              </p>
            </motion.div>

            {/* How to Obtain Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center mb-4">
                <Clock className="mr-2 h-5 w-5 text-orange-600" />
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100">How to Obtain Insurance</h3>
              </div>
              <ol className="space-y-3">
                {[
                  "Check the duration of your stay (semester, internship, or staff visit)",
                  "Select a suitable insurance provider in your home country or internationally",
                  "Purchase your policy online or through an agent before traveling",
                  "Submit a copy of your insurance policy to the International Relations Department",
                  "Keep both a printed and digital copy with you at all times"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <span className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* For Staff Mobility Participants */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center mb-4">
                <Globe className="mr-2 h-5 w-5 text-orange-600" />
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100">For Staff Mobility Participants</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Visiting lecturers, researchers, and administrative staff must also have valid medical insurance for the duration of their Erasmus+ or other mobility stay.
              </p>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">
                It should include:
              </p>
              <ul className="space-y-3">
                {[
                  "Accident and health coverage",
                  "Emergency evacuation and repatriation",
                  "Coverage for any work-related travel within Uzbekistan"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Useful Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-900"
          >
            <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100 mb-4">Useful Information</h3>
            <ul className="space-y-3">
              {[
                "In Uzbekistan, medical care for foreigners is paid. Insurance allows direct coverage or reimbursement",
                "Private clinics in Tashkent, Khiva, and Urgench often provide services to foreign citizens",
                "The national health insurance system is currently under development; therefore, private insurance is necessary for all foreign guests",
                "Keep all medical receipts and documents for reimbursement claims"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact for Assistance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-800 dark:bg-orange-900/20"
          >
            <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100 mb-4">📍 Contact for Assistance</h3>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <div>
                <strong>International Relations Department</strong><br/>
                Urgench Ranch University of Technology
              </div>
              <div>
                <strong>Email:</strong> <a href="mailto:internationaldepartment@utu-ranch.uz" className="text-orange-600 hover:underline">internationaldepartment@utu-ranch.uz</a>
              </div>
              <div>
                <strong>Phone:</strong> +998 93 754 38 33
              </div>
              <div>
                <strong>Address:</strong> Urgench, Khorezm region, Uzbekistan
              </div>
              <p className="mt-4 text-sm">
                For any questions regarding insurance coverage or document submission, please contact us before your arrival.
              </p>
            </div>
          </motion.div>
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
            {t("visaCTA")}
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
              className="h-12 rounded-xl border-2 border-white/70 bg-transparent px-8 font-bold text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              {t("contactSupport")}
            </Button>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
    </div>
  )
}
