"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import { Calendar, ArrowRight, Filter, Search, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getTranslation, type Language } from "@/lib/i18n"

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/3 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-rose-500/30 via-pink-400/20 to-purple-500/20 blur-3xl dark:from-rose-500/20 dark:via-pink-400/10 dark:to-purple-500/10" />
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

export default function NewsPage() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // global scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  const t = (key: string) => getTranslation(key, currentLang)

  const getNewsItems = () => [
    {
      id: "international-medical-conference-2024",
      title:
        currentLang === "en"
          ? "International Medical Conference 2024"
          : currentLang === "ru"
            ? "Международная медицинская конференция 2024"
            : currentLang === "uz"
              ? "2024 yil xalqaro tibbiyot konferensiyasi"
              : "2024 Uluslararası Tıp Konferansı",
      excerpt:
        currentLang === "en"
          ? "Join leading medical professionals and researchers from around the world for groundbreaking discussions on healthcare innovation and the future of medicine."
          : currentLang === "ru"
            ? "Присоединяйтесь к ведущим медицинским специалистам и исследователям со всего мира для новаторских дискуссий об инновациях в здравоохранении и будущем медицины."
            : currentLang === "uz"
              ? "Sog'liqni saqlash innovatsiyalari va tibbiyotning kelajagi bo'yicha yangi muhokamalar uchun butun dunyodan yetakchi tibbiyot mutaxassislari va tadqiqotchilariga qo'shiling."
              : "Sağlık inovasyonları ve tıbbın geleceği konusunda çığır açan tartışmalar için dünyanın dört bir yanından önde gelen tıp uzmanları ve araştırmacılarına katılın.",
      date: "2024-03-15",
      category: "conferences",
      type:
        currentLang === "en"
          ? "Conference"
          : currentLang === "ru"
            ? "Конференция"
            : currentLang === "uz"
              ? "Konferensiya"
              : "Konferans",
      image: "/images/medical-students.jpg",
      featured: true,
    },
    {
      id: "european-partnership-announcement",
      title:
        currentLang === "en"
          ? "New Partnership with Leading European Universities"
          : currentLang === "ru"
            ? "Новое партнерство с ведущими европейскими университетами"
            : currentLang === "uz"
              ? "Yetakchi Yevropa universitetlari bilan yangi hamkorlik"
              : "Önde Gelen Avrupa Üniversiteleri ile Yeni Ortaklık",
      excerpt:
        currentLang === "en"
          ? "RANCH University announces strategic partnerships with five prestigious European institutions, expanding opportunities for student exchange, joint research projects, and dual degree programs."
          : currentLang === "ru"
            ? "Университет RANCH объявляет о стратегических партнерствах с пятью престижными европейскими учреждениями, расширяя возможности для студенческого обмена, совместных исследовательских проектов и программ двойного диплома."
            : currentLang === "uz"
              ? "RANCH universiteti beshta nufuzli Yevropa muassasasi bilan strategik hamkorlik e'lon qiladi, talabalar almashinuvi, qo'shma tadqiqot loyihalari va ikki tomonlama diplom dasturlari imkoniyatlarini kengaytiradi."
              : "RANCH Üniversitesi, beş prestijli Avrupa kurumu ile stratejik ortaklıklar açıklayarak öğrenci değişimi, ortak araştırma projeleri ve çift diploma programları için fırsatları genişletiyor.",
      date: "2024-02-20",
      category: "news",
      type:
        currentLang === "en" ? "News" : currentLang === "ru" ? "Новости" : currentLang === "uz" ? "Yangilik" : "Haber",
      image: "/images/university-interior.jpg",
      featured: false,
    },
    {
      id: "global-education-summit-2024",
      title:
        currentLang === "en"
          ? "Global Education Summit 2024"
          : currentLang === "ru"
            ? "Саммит глобального образования 2024"
            : currentLang === "uz"
              ? "2024 yil global ta'lim sammiti"
              : "2024 Küresel Eğitim Zirvesi",
      excerpt:
        currentLang === "en"
          ? "Leading educators and policymakers from over 50 countries will gather to discuss the future of international higher education, digital transformation, and sustainable development goals."
          : currentLang === "ru"
            ? "Ведущие педагоги и политики из более чем 50 стран соберутся, чтобы обсудить будущее международного высшего образования, цифровой трансформации и целей устойчивого развития."
            : currentLang === "uz"
              ? "50 dan ortiq mamlakatdan yetakchi pedagog va siyosatchilar xalqaro oliy ta'lim, raqamli transformatsiya va barqaror rivojlanish maqsadlarining kelajagini muhokama qilish uchun yig'ilishadi."
              : "50'den fazla ülkeden önde gelen eğitimciler ve politika yapıcılar, uluslararası yükseköğretimin, dijital dönüşümün ve sürdürülebilir kalkınma hedeflerinin geleceğini tartışmak için bir araya gelecek.",
      date: "2024-04-10",
      category: "summits",
      type:
        currentLang === "en" ? "Summit" : currentLang === "ru" ? "Саммит" : currentLang === "uz" ? "Sammit" : "Zirve",
      image: "/images/ranch-exterior.jpg",
      featured: false,
    },
    {
      id: "student-achievement-awards-2024",
      title:
        currentLang === "en"
          ? "Student Achievement Awards 2024"
          : currentLang === "ru"
            ? "Премии за достижения студентов 2024"
            : currentLang === "uz"
              ? "2024 yil talaba yutuqlari mukofotlari"
              : "2024 Öğrenci Başarı Ödülleri",
      excerpt:
        currentLang === "en"
          ? "Celebrating outstanding academic performance, research contributions, and community service by our exceptional students across all faculties."
          : currentLang === "ru"
            ? "Празднование выдающихся академических достижений, исследовательских вкладов и общественной работы наших исключительных студентов во всех факультетах."
            : currentLang === "uz"
              ? "Barcha fakultetlardagi ajoyib talabalarimizning ajoyib akademik natijalari, tadqiqot hissalari va jamiyat xizmatini nishonlash."
              : "Tüm fakültelerdeki olağanüstü öğrencilerimizin olağanüstü akademik performansını, araştırma katkılarını ve toplum hizmetini kutluyoruz.",
      date: "2024-01-25",
      category: "awards",
      type:
        currentLang === "en" ? "Awards" : currentLang === "ru" ? "Награды" : currentLang === "uz" ? "Mukofotlar" : "Ödüller",
      image: "/images/online-interview.jpg",
      featured: false,
    },
    {
      id: "research-grant-announcement",
      title:
        currentLang === "en"
          ? "Major Research Grant Awarded to RANCH University"
          : currentLang === "ru"
            ? "Университету RANCH присужден крупный исследовательский грант"
            : currentLang === "uz"
              ? "RANCH universitetiga katta tadqiqot granti berildi"
              : "RANCH Üniversitesi'ne Büyük Araştırma Hibesi Verildi",
      excerpt:
        currentLang === "en"
          ? "A $2.5 million research grant has been awarded to support innovative research projects in renewable energy, artificial intelligence, and sustainable agriculture."
          : currentLang === "ru"
            ? "Грант в размере 2,5 миллиона долларов был присужден для поддержки инновационных исследовательских проектов в области возобновляемой энергии, искусственного интеллекта и устойчивого сельского хозяйства."
            : currentLang === "uz"
              ? "Qayta tiklanadigan energiya, sun'iy intellekt va barqaror qishloq xo'jaligi sohasidagi innovatsion tadqiqot loyihalarini qo'llab-quvvatlash uchun 2,5 million dollarlik tadqiqot granti berildi."
              : "Yenilenebilir enerji, yapay zeka ve sürdürülebilir tarım alanlarındaki yenilikçi araştırma projelerini desteklemek için 2,5 milyon dolarlık araştırma hibesi verildi.",
      date: "2024-02-05",
      category: "research",
      type:
        currentLang === "en" ? "Research" : currentLang === "ru" ? "Исследования" : currentLang === "uz" ? "Tadqiqot" : "Araştırma",
      image: "/images/university-interior.jpg",
      featured: false,
    },
    {
      id: "international-student-success-story",
      title:
        currentLang === "en"
          ? "International Student Success Story: From RANCH to Global Career"
          : currentLang === "ru"
            ? "История успеха международного студента: от RANCH к глобальной карьере"
            : currentLang === "uz"
              ? "Xalqaro talaba muvaffaqiyat hikoyasi: RANCH dan global kareraga"
              : "Uluslararası Öğrenci Başarı Hikayesi: RANCH'tan Küresel Kariyere",
      excerpt:
        currentLang === "en"
          ? "Meet Sarah Chen, a former international student who graduated from RANCH University and now leads innovation at a Fortune 500 technology company."
          : currentLang === "ru"
            ? "Познакомьтесь с Сарой Чен, бывшей международной студенткой, которая окончила Университет RANCH и теперь возглавляет инновации в технологической компании из списка Fortune 500."
            : currentLang === "uz"
              ? "RANCH universitetini bitirgan va hozir Fortune 500 texnologiya kompaniyasida innovatsiyalarni boshqarayotgan sobiq xalqaro talaba Sara Chen bilan tanishing."
              : "RANCH Üniversitesi'nden mezun olan ve şimdi Fortune 500 teknoloji şirketinde inovasyonu yöneten eski uluslararası öğrenci Sarah Chen ile tanışın.",
      date: "2024-01-15",
      category: "success-stories",
      type:
        currentLang === "en"
          ? "Success Story"
          : currentLang === "ru"
            ? "История успеха"
            : currentLang === "uz"
              ? "Muvaffaqiyat hikoyasi"
              : "Başarı Hikayesi",
      image: "/images/medical-students.jpg",
      featured: false,
    },
  ]

  const newsItems = getNewsItems()
  const featuredNews = newsItems.filter((item) => item.featured)
  const regularNews = newsItems.filter((item) => !item.featured)

  const filteredNews = newsItems.filter((item) => {
    const matchesTab = activeTab === "all" || item.category === activeTab
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(currentLang === "en" ? "en-US" : currentLang === "ru" ? "ru-RU" : currentLang === "uz" ? "uz-UZ" : "tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-white font-mono text-zinc-900 selection:bg-rose-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      {/* top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-rose-500 via-pink-400 to-purple-500"
      />

      <Navbar />

      {/* HERO — matching home page style */}
      <section className="relative isolate overflow-hidden">
        {/* Background image anchored to the right */}
        <Image
          src="/images/university-interior.jpg"
          alt="News & Events - RANCH University"
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
              <span className="inline-block rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-rose-600">
                {t("newsEvents")}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-5xl font-black uppercase leading-[0.95] text-black dark:text-white md:text-7xl"
            >
              {t("latestNewsEvents")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              {t("stayUpdatedDescription")}
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
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition hover:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </span>
                {t("backToHome")}
              </Link>
              <Link
                href="#news"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase text-zinc-700 dark:text-zinc-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition group-hover:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900">
                  <Play className="h-4 w-4" />
                </span>
                <span className="border-b border-dotted border-zinc-400 group-hover:border-rose-500 dark:border-zinc-600">
                  {t("viewNews")}
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
            title={t("stayConnected")}
            description={t("stayConnectedDescription")}
          />
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Calendar className="h-8 w-8 text-rose-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{t("events")}</div>
              <div className="text-zinc-600 dark:text-zinc-300">{t("monthlyUpdates")}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Filter className="h-8 w-8 text-rose-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{t("categories")}</div>
              <div className="text-zinc-600 dark:text-zinc-300">{t("multipleTopics")}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Search className="h-8 w-8 text-rose-600 mx-auto mb-3" />
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{t("search")}</div>
              <div className="text-zinc-600 dark:text-zinc-300">{t("findWhatYouNeed")}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="border-b border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline={t("news")}
            title={t("latestUpdates")}
            description={t("latestUpdatesDescription")}
          />
          
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                placeholder={t("searchNews")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-5 md:w-auto">
                <TabsTrigger value="all">{t("all")}</TabsTrigger>
                <TabsTrigger value="news">{t("news")}</TabsTrigger>
                <TabsTrigger value="conferences">{t("conferences")}</TabsTrigger>
                <TabsTrigger value="awards">{t("awards")}</TabsTrigger>
                <TabsTrigger value="research">{t("research")}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Featured News */}
          {featuredNews.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-zinc-100 mb-6">
                {t("featuredNews")}
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {featuredNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-rose-500 text-white">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                        <Calendar className="h-4 w-4" />
                        {formatDate(item.date)}
                      </div>
                      <h4 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-rose-600 transition">
                        {item.title}
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">
                        {item.excerpt}
                      </p>
                      <Link
                        href={`/news/${item.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase text-rose-600 hover:text-rose-700 transition"
                      >
                        {t("readMore")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Regular News Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews
              .filter((item) => !item.featured)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                      <Calendar className="h-4 w-4" />
                      {formatDate(item.date)}
                    </div>
                    <h4 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-rose-600 transition">
                      {item.title}
                    </h4>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm">
                      {item.excerpt}
                    </p>
                    <Link
                      href={`/news/${item.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase text-rose-600 hover:text-rose-700 transition"
                    >
                      {t("readMore")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
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
            {t("stayUpdated")}
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
            {t("stayUpdatedDescription")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="h-12 rounded-xl border-2 border-rose-500 bg-rose-500 px-8 font-bold text-white transition hover:-translate-y-0.5">
              {t("subscribeToNewsletter")}
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-2 border-white/70 bg-transparent px-8 font-bold text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              {t("contactUs")}
            </Button>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
    </div>
  )
}
