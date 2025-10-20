"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import {
  ArrowLeft,
  BookOpen,
  CreditCard,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  Phone,
  Users,
  Briefcase,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getTranslation, type Language } from "@/lib/i18n"

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/3 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-400/20 to-cyan-500/20 blur-3xl dark:from-emerald-500/20 dark:via-teal-400/10 dark:to-cyan-500/10" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[50vh] w-[50vw] rounded-full bg-gradient-to-tr from-blue-500/20 via-indigo-400/10 to-purple-500/10 blur-3xl" />
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

export default function ResourcesPage() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const t = (key: string) => getTranslation(key, currentLang)
  
  // global scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  const resources = [
    {
      category: "Academic Support",
      icon: <BookOpen className="h-6 w-6" />,
      color: "blue",
      services: [
        {
          name: "Academic Advising",
          description: "Personalized guidance on course selection, degree planning, and academic goals.",
          contact: "academic.advising@university.edu",
        },
        {
          name: "Tutoring Services",
          description: "Free peer tutoring and study groups for challenging subjects.",
          contact: "tutoring@university.edu",
        },
        {
          name: "Writing Center",
          description: "Help with essays, research papers, and academic writing skills.",
          contact: "writing.center@university.edu",
        },
        {
          name: "Library Services",
          description: "Research assistance, database access, and study spaces.",
          contact: "library@university.edu",
        },
      ],
    },
    {
      category: "Language Support",
      icon: <Globe className="h-6 w-6" />,
      color: "green",
      services: [
        {
          name: "English Language Institute",
          description: "Intensive English courses and conversation practice groups.",
          contact: "eli@university.edu",
        },
        {
          name: "Language Exchange Program",
          description: "Partner with native speakers to practice languages.",
          contact: "language.exchange@university.edu",
        },
        {
          name: "Academic English Support",
          description: "Specialized help with academic writing and presentation skills.",
          contact: "academic.english@university.edu",
        },
        {
          name: "Translation Services",
          description: "Document translation for official university purposes.",
          contact: "translation@university.edu",
        },
      ],
    },
    {
      category: "Health & Wellness",
      icon: <Heart className="h-6 w-6" />,
      color: "red",
      services: [
        {
          name: "Student Health Center",
          description: "Medical services, vaccinations, and health insurance guidance.",
          contact: "health@university.edu | +1 (123) 456-7890",
        },
        {
          name: "Counseling Services",
          description: "Mental health support, stress management, and personal counseling.",
          contact: "counseling@university.edu",
        },
        {
          name: "International Student Wellness",
          description: "Specialized support for cultural adjustment and homesickness.",
          contact: "wellness@university.edu",
        },
        {
          name: "Emergency Services",
          description: "24/7 emergency support and crisis intervention.",
          contact: "Emergency: 911 | Campus: +1 (123) 456-7899",
        },
      ],
    },
    {
      category: "Career Development",
      icon: <Briefcase className="h-6 w-6" />,
      color: "purple",
      services: [
        {
          name: "Career Counseling",
          description: "Resume writing, interview preparation, and career planning guidance.",
          contact: "career@university.edu",
        },
        {
          name: "Internship Programs",
          description: "Connect with local and international companies for work experience.",
          contact: "internships@university.edu",
        },
        {
          name: "Job Fairs",
          description: "Annual career fairs with leading employers and organizations.",
          contact: "jobfairs@university.edu",
        },
        {
          name: "Alumni Network",
          description: "Connect with successful graduates for mentorship and networking.",
          contact: "alumni@university.edu",
        },
      ],
    },
    {
      category: "Financial Support",
      icon: <CreditCard className="h-6 w-6" />,
      color: "orange",
      services: [
        {
          name: "Financial Aid Office",
          description: "Scholarship opportunities, grants, and financial planning assistance.",
          contact: "financial.aid@university.edu",
        },
        {
          name: "Student Employment",
          description: "On-campus and off-campus job opportunities for students.",
          contact: "student.jobs@university.edu",
        },
        {
          name: "Emergency Funds",
          description: "Short-term financial assistance for unexpected expenses.",
          contact: "emergency.funds@university.edu",
        },
        {
          name: "Budgeting Workshops",
          description: "Financial literacy and money management training.",
          contact: "budgeting@university.edu",
        },
      ],
    },
    {
      category: "Technology Support",
      icon: <GraduationCap className="h-6 w-6" />,
      color: "indigo",
      services: [
        {
          name: "IT Help Desk",
          description: "Technical support for computers, software, and online platforms.",
          contact: "it.help@university.edu | +1 (123) 456-7891",
        },
        {
          name: "Computer Labs",
          description: "Access to specialized software and high-performance computers.",
          contact: "computer.labs@university.edu",
        },
        {
          name: "Online Learning Support",
          description: "Help with learning management systems and digital tools.",
          contact: "online.learning@university.edu",
        },
        {
          name: "Digital Skills Training",
          description: "Workshops on essential software and digital tools.",
          contact: "digital.skills@university.edu",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white font-mono text-zinc-900 selection:bg-emerald-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      {/* top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"
      />

      <Navbar currentLang={currentLang} onLanguageChange={setCurrentLang} faculties={[]} brand={{ initials: "UTU", label: "University", href: "/" }} />

      {/* HERO — matching home page style */}
      <section className="relative isolate overflow-hidden">
        {/* Background image anchored to the right */}
        <Image
          src="/images/university-interior.jpg"
          alt="Student Resources - RANCH University"
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
              <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                Resources
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-5xl font-black uppercase leading-[0.95] text-black dark:text-white md:text-7xl"
            >
              Student Resources
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              Comprehensive support services and resources to help you succeed in your academic journey
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
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition hover:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900">
                  <ArrowLeft className="h-4 w-4" />
                </span>
                Back to Home
              </Link>
              <Link
                href="#resources"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase text-zinc-700 dark:text-zinc-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition group-hover:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900">
                  <Play className="h-4 w-4" />
                </span>
                <span className="border-b border-dotted border-zinc-400 group-hover:border-emerald-500 dark:border-zinc-600">
                  View Resources
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
            title="Support Services"
            description="We provide comprehensive support services to ensure your academic success and personal well-being throughout your university experience."
          />
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Users className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Services</div>
              <div className="text-zinc-600 dark:text-zinc-300">25+ support services</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Phone className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">24/7 Support</div>
              <div className="text-zinc-600 dark:text-zinc-300">Emergency assistance</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <FileText className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Resources</div>
              <div className="text-zinc-600 dark:text-zinc-300">Comprehensive guides</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section id="resources" className="border-b border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Services"
            title="Available Resources"
            description="Explore our comprehensive range of student support services designed to enhance your academic experience."
          />
          
          <div className="grid gap-8 md:grid-cols-2">
            {resources.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100">
                    {category.category}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                        {service.name}
                      </h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                        <Phone className="h-3 w-3" />
                        <span className="font-mono">{service.contact}</span>
                      </div>
                    </div>
                  ))}
                </div>
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
            Need Help?
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
            Our support team is here to help you succeed. Don't hesitate to reach out for assistance.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button className="h-12 rounded-xl border-2 border-emerald-500 bg-emerald-500 px-8 font-bold text-white transition hover:-translate-y-0.5">
                Contact Support
              </Button>
            </Link>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-2 border-white/70 bg-transparent px-8 font-bold text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
    </div>
  )
}
