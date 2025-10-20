"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Tag, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

interface NewsDetailPageProps {
  params: {
    id: string
  }
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  const t = (key: string) => getTranslation(key, currentLang)

  // global scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  // Mock data - in real app this would come from API/database
  const newsData = {
    "international-medical-conference-2024": {
      title: {
        en: "International Medical Conference 2024",
        ru: "Международная медицинская конференция 2024",
        uz: "2024 yil xalqaro tibbiyot konferensiyasi",
        tr: "2024 Uluslararası Tıp Konferansı",
      },
      content: {
        en: `
          <p>RANCH University is proud to announce the upcoming International Medical Conference 2024, bringing together leading medical professionals, researchers, and students from around the world. This prestigious event will take place from March 15-17, 2024, at our state-of-the-art conference facilities.</p>
          
          <h3>Conference Highlights</h3>
          <p>The conference will feature over 50 distinguished speakers, including Nobel Prize laureates, renowned surgeons, and pioneering researchers in various medical fields. Attendees will have the opportunity to participate in:</p>
          
          <ul>
            <li>Keynote presentations on breakthrough medical technologies</li>
            <li>Interactive workshops on surgical techniques</li>
            <li>Panel discussions on global health challenges</li>
            <li>Networking sessions with industry leaders</li>
            <li>Poster presentations by young researchers</li>
          </ul>
          
          <h3>Registration and Participation</h3>
          <p>Early bird registration is now open for students, faculty, and medical professionals. Special discounts are available for RANCH University students and alumni. The conference will also feature virtual participation options for international attendees who cannot travel.</p>
          
          <p>This event represents our commitment to advancing medical education and fostering international collaboration in healthcare research and practice.</p>
        `,
        ru: `
          <p>Университет RANCH с гордостью объявляет о предстоящей Международной медицинской конференции 2024, которая объединит ведущих медицинских специалистов, исследователей и студентов со всего мира. Это престижное мероприятие пройдет с 15 по 17 марта 2024 года в наших современных конференц-залах.</p>
          
          <h3>Основные моменты конференции</h3>
          <p>В конференции примут участие более 50 выдающихся докладчиков, включая лауреатов Нобелевской премии, известных хирургов и пионеров исследований в различных медицинских областях. Участники смогут принять участие в:</p>
          
          <ul>
            <li>Ключевых презентациях о прорывных медицинских технологиях</li>
            <li>Интерактивных мастер-классах по хирургическим техникам</li>
            <li>Панельных дискуссиях о глобальных вызовах здравоохранения</li>
            <li>Сетевых сессиях с лидерами индустрии</li>
            <li>Постерных презентациях молодых исследователей</li>
          </ul>
          
          <h3>Регистрация и участие</h3>
          <p>Ранняя регистрация открыта для студентов, преподавателей и медицинских специалистов. Специальные скидки доступны для студентов и выпускников университета RANCH. Конференция также предусматривает возможности виртуального участия для международных участников, которые не могут приехать.</p>
          
          <p>Это мероприятие представляет нашу приверженность развитию медицинского образования и содействию международному сотрудничеству в исследованиях и практике здравоохранения.</p>
        `,
        uz: `
          <p>RANCH universiteti 2024 yil xalqaro tibbiyot konferensiyasini e'lon qilishdan faxrlanadi, bu konferensiya butun dunyodan yetakchi tibbiyot mutaxassislari, tadqiqotchilar va talabalarni birlashtiradi. Ushbu nufuzli tadbir 2024 yil 15-17 mart kunlari bizning zamonaviy konferens-zallarimizda bo'lib o'tadi.</p>
          
          <h3>Konferensiya asosiy jihatlari</h3>
          <p>Konferensiyada 50 dan ortiq taniqli ma'ruzachilar, jumladan Nobel mukofoti laureatlari, mashhur jarrohlar va turli tibbiyot sohalarida kashshof tadqiqotchilar ishtirok etadi. Ishtirokchilar quyidagilarda qatnashish imkoniyatiga ega bo'ladilar:</p>
          
          <ul>
            <li>Tibbiyotdagi yangi texnologiyalar bo'yicha asosiy taqdimotlar</li>
            <li>Jarrohlik texnikasi bo'yicha interaktiv seminarlar</li>
            <li>Global sog'liqni saqlash muammolari bo'yicha panel muhokamalar</li>
            <li>Soha yetakchilari bilan tarmoq seanslari</li>
            <li>Yosh tadqiqotchilarning poster taqdimotlari</li>
          </ul>
          
          <h3>Ro'yxatdan o'tish va ishtirok etish</h3>
          <p>Talabalar, professor-o'qituvchilar va tibbiyot mutaxassislari uchun erta ro'yxatdan o'tish ochiq. RANCH universiteti talabalari va bitiruvchilari uchun maxsus chegirmalar mavjud. Konferensiya, shuningdek, sayohat qila olmaydigan xalqaro ishtirokchilar uchun virtual ishtirok imkoniyatlarini taqdim etadi.</p>
          
          <p>Ushbu tadbir bizning tibbiy ta'limni rivojlantirishga va sog'liqni saqlash tadqiqotlari va amaliyotida xalqaro hamkorlikni rivojlantirishga sodiqligimizni ifodalaydi.</p>
        `,
        tr: `
          <p>RANCH Üniversitesi, dünyanın dört bir yanından önde gelen tıp uzmanları, araştırmacılar ve öğrencileri bir araya getiren 2024 Uluslararası Tıp Konferansı'nı duyurmaktan gurur duyar. Bu prestijli etkinlik, 15-17 Mart 2024 tarihleri arasında son teknoloji konferans tesislerimizde gerçekleşecektir.</p>
          
          <h3>Konferans Öne Çıkanları</h3>
          <p>Konferansta Nobel Ödülü sahipleri, ünlü cerrahlar ve çeşitli tıp alanlarında öncü araştırmacılar dahil olmak üzere 50'den fazla seçkin konuşmacı yer alacaktır. Katılımcılar şunlara katılma fırsatına sahip olacaklar:</p>
          
          <ul>
            <li>Çığır açan tıbbi teknolojiler üzerine ana sunumlar</li>
            <li>Cerrahi teknikler üzerine interaktif atölyeler</li>
            <li>Küresel sağlık zorlukları üzerine panel tartışmaları</li>
            <li>Sektör liderleri ile ağ oluşturma oturumları</li>
            <li>Genç araştırmacıların poster sunumları</li>
          </ul>
          
          <h3>Kayıt ve Katılım</h3>
          <p>Öğrenciler, öğretim üyeleri ve tıp uzmanları için erken kayıt şimdi açıktır. RANCH Üniversitesi öğrencileri ve mezunları için özel indirimler mevcuttur. Konferans ayrıca seyahat edemeyen uluslararası katılımcılar için sanal katılım seçenekleri de sunacaktır.</p>
          
          <p>Bu etkinlik, tıp eğitimini ilerletme ve sağlık araştırmaları ve uygulamalarında uluslararası işbirliğini teşvik etme konusundaki kararlılığımızı temsil etmektedir.</p>
        `,
      },
      category: "conference",
      date: "2024-03-15",
      author: {
        name: "Dr. Sarah Johnson",
        title: {
          en: "Dean of Medical Faculty",
          ru: "Декан медицинского факультета",
          uz: "Tibbiyot fakulteti dekani",
          tr: "Tıp Fakültesi Dekanı",
        },
        bio: {
          en: "Dr. Sarah Johnson is a renowned cardiologist with over 20 years of experience in medical education and research.",
          ru: "Доктор Сара Джонсон - известный кардиолог с более чем 20-летним опытом в медицинском образовании и исследованиях.",
          uz: "Doktor Sara Jonson - tibbiy ta'lim va tadqiqotlarda 20 yildan ortiq tajribaga ega taniqli kardiolog.",
          tr: "Dr. Sarah Johnson, tıp eğitimi ve araştırmalarında 20 yıldan fazla deneyime sahip ünlü bir kardiyologdur.",
        },
        avatar: "/placeholder-user.jpg",
      },
      image: "/images/medical-students.jpg",
      readTime: 5,
      tags: ["medicine", "conference", "international", "healthcare"],
    },
  }

  const currentNews = newsData[params.id as keyof typeof newsData]

  if (!currentNews) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar currentLang={currentLang} onLanguageChange={setCurrentLang} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">News not found</h1>
          <Link href="/news">
            <Button>Back to News</Button>
          </Link>
        </div>
        <Footer currentLang={currentLang} />
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }

    const locales = {
      en: "en-US",
      ru: "ru-RU",
      uz: "uz-UZ",
      tr: "tr-TR",
    }

    return date.toLocaleDateString(locales[currentLang], options)
  }

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      conference: "bg-blue-100 text-blue-800",
      partnership: "bg-green-100 text-green-800",
      achievement: "bg-purple-100 text-purple-800",
      summit: "bg-orange-100 text-orange-800",
      events: "bg-pink-100 text-pink-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="min-h-screen bg-white font-mono text-zinc-900 selection:bg-orange-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      {/* top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500"
      />

      <Navbar currentLang={currentLang} onLanguageChange={setCurrentLang} faculties={[]} brand={{ initials: "UTU", label: "University", href: "/" }} />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold uppercase text-zinc-700 dark:text-zinc-200 mb-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition hover:border-orange-500 dark:border-zinc-700 dark:bg-zinc-900">
              <ArrowLeft className="h-4 w-4" />
            </span>
            Back to News
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-8"
              >
                <Badge className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-600">
                  {currentNews.category}
                </Badge>
                <h1 className="mt-4 text-4xl font-black uppercase leading-tight text-black dark:text-white md:text-6xl">
                  {currentNews.title[currentLang]}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span>{formatDate(currentNews.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>{currentNews.readTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-orange-500" />
                    <span>{currentNews.author.name}</span>
                  </div>
                </div>
              </motion.div>

              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative h-64 lg:h-96 w-full overflow-hidden rounded-2xl mb-8"
              >
                <Image
                  src={currentNews.image || "/placeholder.svg"}
                  alt={currentNews.title[currentLang]}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="prose prose-lg max-w-none mb-8 text-zinc-600 dark:text-zinc-300"
                dangerouslySetInnerHTML={{ __html: currentNews.content[currentLang] }}
              />

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                <Tag className="h-4 w-4 text-orange-500" />
                {currentNews.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-600 backdrop-blur transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
                    #{tag}
                  </Badge>
                ))}
              </motion.div>

              {/* Share Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur transition hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900/60 mb-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-zinc-900 dark:text-white flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-orange-500" />
                    Share this article
                  </h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-10 w-10 rounded-xl border border-zinc-300 bg-white p-0 transition hover:border-orange-500 dark:border-zinc-700 dark:bg-zinc-900">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-10 w-10 rounded-xl border border-zinc-300 bg-white p-0 transition hover:border-orange-500 dark:border-zinc-700 dark:bg-zinc-900">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-10 w-10 rounded-xl border border-zinc-300 bg-white p-0 transition hover:border-orange-500 dark:border-zinc-700 dark:bg-zinc-900">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur transition hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900/60"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={currentNews.author.avatar || "/placeholder.svg"} alt={currentNews.author.name} />
                    <AvatarFallback>
                      {currentNews.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white">{currentNews.author.name}</h4>
                    <p className="text-orange-500 font-medium mb-2">{currentNews.author.title[currentLang]}</p>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{currentNews.author.bio[currentLang]}</p>
                  </div>
                </div>
              </motion.div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Related Articles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur transition hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900/60"
              >
                <h3 className="text-lg font-bold uppercase tracking-wide text-zinc-900 dark:text-white mb-4">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 group">
                      <div className="relative h-16 w-16 overflow-hidden rounded-xl flex-shrink-0 transition group-hover:scale-105">
                        <Image
                          src="/images/university-interior.jpg"
                          alt="Related article"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-bold line-clamp-2 mb-1 text-zinc-900 dark:text-white group-hover:text-orange-500 transition">
                          Related Article Title {i}
                        </h5>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate("2024-03-01")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-orange-50 to-amber-50 p-6 backdrop-blur transition hover:shadow-lg dark:border-zinc-700 dark:from-orange-950/20 dark:to-amber-950/20"
              >
                <h3 className="text-lg font-bold uppercase tracking-wide text-zinc-900 dark:text-white mb-4">
                  Stay Updated
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Get the latest news and updates from RANCH University.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                  />
                  <Button size="sm" className="w-full h-12 rounded-xl border-2 border-orange-500 bg-orange-500 px-8 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-orange-600">
                    Subscribe
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA with video */}
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
            Stay Connected
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
            Get the latest news and updates from RANCH University and join our global community.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={() => window.open("https://admission.utu-ranch.uz", "_blank")}
              className="h-12 rounded-xl border-2 border-orange-500 bg-orange-500 px-8 font-bold text-white transition hover:-translate-y-0.5"
            >
              Apply Now
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-2 border-white/60 bg-transparent px-8 font-bold text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
    </div>
  )
}
