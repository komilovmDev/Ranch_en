"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTranslation, type Language } from "@/lib/i18n";
import { useState } from "react";

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

export default function StudentMobilityPage() {
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const t = (key: string) => getTranslation(key, currentLang);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  return (
    <div className="min-h-screen bg-white font-mono text-zinc-900 selection:bg-orange-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar currentLang={currentLang} onLanguageChange={setCurrentLang} faculties={[]} brand={{ initials: "UTU", label: "University", href: "/" }} />

      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500"
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto grid min-h-[50vh] w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:px-8">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl font-black uppercase leading-[0.95] text-black dark:text-white md:text-6xl"
            >
              🌍 Student Mobility Programs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              Explore international opportunities through our comprehensive student mobility programs. Study abroad, gain global experience, and expand your academic horizons.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              Through Erasmus+ and bilateral agreements, UTU-RANCH provides opportunities for students to study, train, and experience different cultures around the world.
            </motion.p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/contact" className="inline-block">
                <Button className="h-11 rounded-xl border-2 border-orange-500 bg-orange-500 px-6 font-bold text-white">
                  Contact International Department
                </Button>
              </Link>
              <div className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-200">
                <a
                  href="mailto:internationaldepartment@utu-ranch.uz"
                  className="font-bold uppercase underline decoration-dotted underline-offset-4"
                >
                  📧 internationaldepartment@utu-ranch.uz
                </a>
                <span className="font-bold uppercase">
                  📞 +998 99 825 0297 | +998 93 754 3833
                </span>
              </div>
            </div>
          </div>
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

      {/* BENEFITS */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Benefits"
            title="Why Choose Student Mobility?"
            description="Discover the advantages of studying abroad"
          />
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-950"
            >
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">Global Perspective</h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                Gain international experience and develop a global mindset that enhances your career prospects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-950"
            >
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">Academic Excellence</h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                Study at prestigious partner universities and access world-class education and research facilities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-950"
            >
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">Cultural Exchange</h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                Build lifelong friendships and professional networks while experiencing different cultures.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-950">
            <h2 className="text-2xl font-black uppercase text-zinc-900 dark:text-zinc-100 mb-4">
              Ready to Start Your International Journey?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 mb-6 max-w-2xl mx-auto">
              Contact our International Relations Office to learn more about available opportunities and start your application process.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <Button className="h-12 rounded-xl border-2 border-orange-500 bg-orange-500 px-8 font-bold text-white">
                  Contact Us
                </Button>
              </Link>
              <Link href="/partners">
                <Button variant="outline" className="h-12 rounded-xl border-2 px-8 font-bold">
                  View Partners
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
    </div>
  );
}
