"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTranslation, type Language } from "@/lib/i18n";
import { useState } from "react";
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  GraduationCap, 
  Scale, 
  BookOpen, 
  Users, 
  AlertTriangle,
  Calculator,
  Award,
  Calendar,
  Shield
} from "lucide-react";

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

export default function GradingSystemsPage() {
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const t = (key: string) => getTranslation(key, currentLang);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  const gradingScale = [
    { grade: "Excellent", points: "90-100", description: "Demonstrates deep understanding, creativity, and ability to apply knowledge independently" },
    { grade: "Good", points: "70-89", description: "Demonstrates good understanding and ability to use knowledge in practice" },
    { grade: "Satisfactory", points: "60-69", description: "Demonstrates basic understanding but limited application" },
    { grade: "Unsatisfactory", points: "0-59", description: "Fails to demonstrate understanding of the subject" }
  ];

  const assessmentTypes = [
    {
      title: "Continuous Assessment",
      icon: <BookOpen className="h-6 w-6" />,
      description: "Carried out throughout the semester and reflects day-to-day academic activity",
      includes: [
        "Participation in lectures, practical and laboratory classes",
        "Seminars and independent assignments",
        "Critical thinking and problem-solving skills",
        "Application of theoretical knowledge to practice"
      ]
    },
    {
      title: "Midterm Assessment",
      icon: <Calendar className="h-6 w-6" />,
      description: "Conducted during the semester after completion of specific sections or topics",
      includes: [
        "Written, oral, test, or project-based formats",
        "Progress measurement and timely feedback",
        "Contribution to final grade",
        "Format determined by academic department"
      ]
    },
    {
      title: "Final Assessment",
      icon: <GraduationCap className="h-6 w-6" />,
      description: "Held at the end of each semester to determine theoretical knowledge and practical skills",
      includes: [
        "Written, oral, test, or project defense formats",
        "Conducted by external teachers for impartiality",
        "Schedule announced at least two weeks in advance",
        "External examiners may be invited when necessary"
      ]
    }
  ];

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
              📊 Assessment and Examination System
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              An important stage of the educational process at Urgench Ranch University of Technology (UTU-RANCH) is the assessment and examination of students' academic performance.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              Examinations and evaluation procedures serve as a means of measuring students' knowledge, skills, and competencies, as well as determining the degree to which learning outcomes have been achieved for each module or subject.
            </motion.p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/contact" className="inline-block">
                <Button className="h-11 rounded-xl border-2 border-orange-500 bg-orange-500 px-6 font-bold text-white">
                  Contact Academic Office
                </Button>
              </Link>
              <div className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-200">
                <a
                  href="https://lex.uz/docs/-3916793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold uppercase underline decoration-dotted underline-offset-4"
                >
                  📋 Official Regulation Document
                </a>
                <span className="font-bold uppercase">
                  📞 Academic Affairs Office
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGULATORY BASIS */}
      <section className="border-b border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Legal Framework"
            title="📋 Regulatory Basis"
            description="The monitoring and assessment of students' knowledge at UTU-RANCH are conducted in accordance with official regulations"
          />
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-md dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
                <p>
                  The monitoring and assessment of students' knowledge at UTU-RANCH are conducted in accordance with the <strong>"Regulation on the System of Monitoring and Assessment of Students' Knowledge in Higher Education Institutions"</strong>, approved by the Order of the Minister of Higher Education, Science and Innovation of the Republic of Uzbekistan No. 19-2018 dated August 9, 2018.
                </p>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                  <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-orange-600" />
                    Official Reference
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                    For further reference, the official text of the regulation is available at:
                  </p>
                  <a 
                    href="https://lex.uz/docs/-3916793" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:underline font-semibold"
                  >
                    https://lex.uz/docs/-3916793
                  </a>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100">Implementation Process</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>All students are introduced to the requirements of this Regulation by their teachers during the first lessons of each semester</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Before the end of lecture and practical sessions, instructors once again explain the examination procedures, evaluation methods, and grading criteria</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>In case of online or hybrid examinations, students are trained to use the relevant digital platforms and online tools</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TYPES AND FORMS OF ASSESSMENT */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Assessment System"
            title="📚 Types and Forms of Assessment"
            description="The system of student assessment at UTU-RANCH is based on a three-level model"
          />
          
          <div className="grid gap-6 md:grid-cols-3">
            {assessmentTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
              >
                <div className="flex items-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400">
                    {type.icon}
                  </div>
                  <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 ml-3">
                    {type.title}
                  </h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">
                  {type.description}
                </p>
                <ul className="space-y-2">
                  {type.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                      <CheckCircle className="h-3 w-3 text-orange-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GRADING SCALE */}
      <section className="border-b border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Grading"
            title="📊 Grading Scale"
            description="Grades for continuous assessment are awarded based on the following scale"
          />
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {gradingScale.map((grade, index) => (
              <motion.div
                key={grade.grade}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl border p-6 shadow-md transition hover:shadow-xl ${
                  grade.grade === 'Excellent' 
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                    : grade.grade === 'Good'
                    ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                    : grade.grade === 'Satisfactory'
                    ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                    : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                }`}
              >
                <div className="text-center">
                  <div className={`text-3xl font-black mb-2 ${
                    grade.grade === 'Excellent' ? 'text-green-600' :
                    grade.grade === 'Good' ? 'text-blue-600' :
                    grade.grade === 'Satisfactory' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {grade.points.split('-')[0] === '90' ? '5' : 
                     grade.points.split('-')[0] === '70' ? '4' :
                     grade.points.split('-')[0] === '60' ? '3' : '2'}
                  </div>
                  <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">
                    {grade.grade}
                  </h3>
                  <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 mb-3">
                    {grade.points} points
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    {grade.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL RULES AND POLICIES */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Policies"
            title="⚖️ Special Rules and Academic Integrity"
            description="Important policies and procedures for assessment and examination"
          />
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Part-Time and Distance Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center mb-4">
                <Users className="mr-2 h-5 w-5 text-orange-600" />
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100">Part-Time and Distance Education</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                The assessment system for students enrolled in part-time or distance learning programs follows the same general principles but places greater emphasis on independent study and self-assessment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  Students are required to complete additional independent work
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  Submit periodic reports or projects to demonstrate progress
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  Greater emphasis on self-assessment and independent study
                </li>
              </ul>
            </motion.div>

            {/* Academic Integrity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center mb-4">
                <Shield className="mr-2 h-5 w-5 text-orange-600" />
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100">Academic Integrity</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                UTU-RANCH maintains a strict policy on academic integrity, honesty, and transparency.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  Cheating, plagiarism, or any other form of academic misconduct is strictly prohibited
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  Department of Educational and Methodological Studies oversees examination procedures
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  Assessment results may be annulled for violations
                </li>
              </ul>
            </motion.div>

            {/* Appeal Procedure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center mb-4">
                <Scale className="mr-2 h-5 w-5 text-orange-600" />
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100">Appeal Procedure</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                If a student disagrees with the results of an assessment, they have the right to submit an appeal within 48 hours after the announcement of grades.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  Appeal reviewed by Appeal Commission established by Dean
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  Commission includes Chairperson and at least four members
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  Student has right to attend appeal hearing
                </li>
              </ul>
            </motion.div>

            {/* Academic Debts and Retakes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center mb-4">
                <Clock className="mr-2 h-5 w-5 text-orange-600" />
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100">Academic Debts and Retakes</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Students who receive an "unsatisfactory" grade ("2") or fail to pass an exam are considered to have academic debts.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  Up to 3 failed subjects: retake within one month of new academic year
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  More than 4 failed subjects: must repeat the academic year
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  Each assessment may be retaken no more than two times
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GPA CALCULATION */}
      <section className="border-b border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Grading System"
            title="🧮 GPA Calculation and Progression"
            description="Grade Point Average calculation and academic progression requirements"
          />
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-md dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-orange-600" />
                    GPA Calculation Formula
                  </h3>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                        GPA = (K₁U₁ + K₂U₂ + K₃U₃ + ... + KₙUₙ) / (K₁ + K₂ + K₃ + ... + Kₙ)
                      </div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-300 space-y-1">
                        <p><strong>Where:</strong></p>
                        <p><strong>K</strong> = number of credits (loans) allocated to the subject/module</p>
                        <p><strong>U</strong> = student's final grade in that subject/module</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-4">Progression Requirements</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300">
                        <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Minimum GPA of 2.4</strong> required for progression to the next academic year</span>
                      </li>
                      <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300">
                        <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>Students are promoted based on GPA and successful completion of all required modules</span>
                      </li>
                      <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Students who do not achieve this average are required to repeat the year</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-4">Duration of Study</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300">
                        <Award className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Bachelor's degree programs:</strong> Maximum 8 years</span>
                      </li>
                      <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300">
                        <Award className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Master's degree programs:</strong> Maximum 4 years</span>
                      </li>
                      <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300">
                        <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>Students are not dismissed for academic debt but must retake necessary courses</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-950">
            <h2 className="text-2xl font-black uppercase text-zinc-900 dark:text-zinc-100 mb-4">
              Need More Information About Grading?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 mb-6 max-w-2xl mx-auto">
              Contact our Academic Affairs Office for detailed information about assessment procedures, grading criteria, or academic policies.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <Button className="h-12 rounded-xl border-2 border-orange-500 bg-orange-500 px-8 font-bold text-white">
                  Contact Academic Office
                </Button>
              </Link>
              <Link href="/student-mobility">
                <Button variant="outline" className="h-12 rounded-xl border-2 px-8 font-bold">
                  Student Mobility
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
