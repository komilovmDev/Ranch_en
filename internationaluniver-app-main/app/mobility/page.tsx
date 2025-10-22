"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function MobilityPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  return (
    <div className="min-h-screen bg-white font-mono text-zinc-900 selection:bg-orange-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />

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
              🌍 International Mobility and Erasmus+ at UTU-RANCH
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              The International Mobility and Erasmus+ Programme at Urgench Ranch University of Technology (UTU-RANCH) supports student and staff exchanges, cultural cooperation, and global academic engagement.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              Through Erasmus+ and bilateral agreements, UTU-RANCH provides opportunities for students, faculty, and administrative staff to study, teach, or train abroad — while welcoming international participants to our dynamic and innovative campus in Urgench.
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

      {/* OUTGOING STAFF */}
      <section id="outgoing-staff" className="border-b border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Staff"
            title="👩🏫 Outgoing Staff"
            description="Erasmus+ mobility for UTU-RANCH academic and administrative staff"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="mb-3 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">Mobility Types</h3>
              <ul className="list-disc space-y-3 pl-6 text-zinc-700 dark:text-zinc-300">
                <li><strong>Teaching Mobility</strong> (lectures, joint courses, seminars)</li>
                <li><strong>Training Mobility</strong> (professional development, job shadowing, and workshops)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="mb-3 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">Application Steps</h3>
              <ol className="list-decimal space-y-3 pl-6 text-zinc-700 dark:text-zinc-300">
                <li>Review Erasmus+ staff call announcements.</li>
                <li>Submit a signed Mobility Agreement and Invitation Letter.</li>
                <li>Attend a pre-departure briefing and sign the Grant Agreement.</li>
              </ol>
              <h4 className="mt-4 mb-2 font-semibold text-zinc-900 dark:text-zinc-100">Support Provided</h4>
              <p className="text-zinc-700 dark:text-zinc-300">
                Assistance with visa, insurance, and travel logistics; guidance for Erasmus+ documentation and reporting.
              </p>
            </div>
          </div>
          <div className="mt-6 text-sm text-zinc-700 dark:text-zinc-300">
            📩 Contact: internationaldepartment@utu-ranch.uz<br/>
            📞 +998 99 825 0297 | +998 93 754 3833
          </div>
        </div>
      </section>

      {/* INCOMING STAFF */}
      <section id="incoming-staff" className="border-b border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Staff"
            title="🏫 Incoming Staff"
            description="Hosting Erasmus+ visitors for teaching or training at UTU-RANCH"
          />
          <p className="max-w-4xl text-zinc-700 dark:text-zinc-300 mb-6">
            UTU-RANCH warmly welcomes professors, lecturers, researchers, and administrative personnel from partner institutions for Erasmus+ teaching or training mobility.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="mb-3 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">Before Arrival</h3>
              <ul className="list-disc space-y-3 pl-6 text-zinc-700 dark:text-zinc-300">
                <li>Coordinate your visit schedule with the International Relations Office.</li>
                <li>Submit your signed Mobility Agreement and Work Plan.</li>
              </ul>
              <h3 className="mt-6 mb-3 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">During Stay</h3>
              <ul className="list-disc space-y-3 pl-6 text-zinc-700 dark:text-zinc-300">
                <li>Access to UTU-RANCH facilities, laboratories, and classrooms</li>
                <li>Participation in academic and cultural activities</li>
                <li>Networking opportunities with local staff and students</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="mb-3 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">Buddy System for Staff</h3>
              <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                Each visiting staff member is supported by a UTU-RANCH colleague who provides professional and logistical assistance throughout the visit.
              </p>
              <h4 className="mt-4 mb-2 font-semibold text-zinc-900 dark:text-zinc-100">Accommodation & Insurance</h4>
              <p className="text-zinc-700 dark:text-zinc-300">
                The International Department offers help in finding suitable accommodation and arranging travel/medical insurance.
              </p>
              <div className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
                📩 Contact: internationaldepartment@utu-ranch.uz<br/>
                📞 +998 99 825 0297 | +998 93 754 3833
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT OFFICE */}
      {/* <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="International Relations Office"
            title="Contact Information"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="mb-2 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">Leadership</h3>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                <li><strong>Vice-Rector for International Relations</strong> — PhD, dotsent, Ruzmetov Davron Ibrogimovich<br/>
                  <a href="mailto:d.ruzmetov@utu-ranch.uz" className="text-orange-600 hover:underline">d.ruzmetov@utu-ranch.uz</a>
                </li>
                <li><strong>Head of International Relations Department</strong> — Ataboev Javokhir Kamalovich<br/>
                  <a href="mailto:a.javoxir@utu-ranch.uz" className="text-orange-600 hover:underline">a.javoxir@utu-ranch.uz</a>
                </li>
                <li><strong>Erasmus+ Coordinator</strong> — Jumaniyozova Shakhodat Kudrat kizi<br/>
                  <a href="mailto:internationaldepartment@utu-ranch.uz" className="text-orange-600 hover:underline">internationaldepartment@utu-ranch.uz</a>
                </li>
                <li><strong>Specialist of International Relations</strong> — Rakhimboeva Mashkhura Bakhtiyor kizi<br/>
                  <a href="mailto:mashkhuraitaly@gmail.com" className="text-orange-600 hover:underline">mashkhuraitaly@gmail.com</a>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <h3 className="mb-2 text-lg font-extrabold uppercase text-zinc-900 dark:text-zinc-100">Contact Details</h3>
              <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold">📧 Email:</span><br/>
                  <a href="mailto:internationaldepartment@utu-ranch.uz" className="underline decoration-dotted underline-offset-4">
                    internationaldepartment@utu-ranch.uz
                  </a>
                </div>
                <div>
                  <span className="font-semibold">📞 Phone:</span><br/>
                  +998 99 825 0297 | +998 93 754 3833
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="mailto:internationaldepartment@utu-ranch.uz">
                  <Button className="h-10 rounded-xl border-2 border-orange-500 bg-orange-500 px-4 text-white">Email</Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="h-10 rounded-xl border-2">Contact Page</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}


