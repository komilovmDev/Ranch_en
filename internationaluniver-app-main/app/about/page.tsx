"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  FileText, 
  Shield, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Phone, 
  Mail,
  Play,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getTranslation, type Language } from "@/lib/i18n";

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/3 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-orange-500/30 via-purple-500/20 to-blue-500/20 blur-3xl dark:from-orange-500/20 dark:via-purple-500/10 dark:to-blue-500/10" />
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

function UserCard({ 
  name, 
  position, 
  department, 
  phone, 
  email, 
  imageSrc = "/placeholder-user.jpg",
  delay = 0 
}: {
  name: string;
  position: string;
  department: string;
  phone: string;
  email: string;
  imageSrc?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Image
            src={imageSrc}
            alt={name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-xl object-cover"
          />
        </div>
                 <div className="flex-1 min-w-0">
           <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-1">
             {name}
           </h3>
           {position && (
             <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
               {position}
             </p>
           )}
           {department && (
             <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3 uppercase tracking-wide">
               {department}
             </p>
           )}
           <div className="space-y-2">
             {phone && (
               <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                 <Phone className="h-4 w-4 text-orange-500" />
                 <span className="font-medium">{phone}</span>
               </div>
             )}
             {email && (
               <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                 <Mail className="h-4 w-4 text-orange-500" />
                 <span className="font-medium">{email}</span>
               </div>
             )}
           </div>
         </div>
      </div>
    </motion.div>
  );
}

function AboutSectionCard({ 
  section, 
  index, 
  onExpand 
}: {
  section: any;
  index: number;
  onExpand: (section: any) => void;
}) {
  const handleClick = () => {
    if (section.id === "rectorate") {
      // Scroll to rectorate section instead of opening modal
      const rectorateSection = document.getElementById("rectorate-section");
      if (rectorateSection) {
        rectorateSection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (section.id === "centers") {
      // Scroll to centers and departments section instead of opening modal
      const centersSection = document.getElementById("centers-section");
      if (centersSection) {
        centersSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // For other sections, open modal as usual
      onExpand(section);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition hover:shadow-xl cursor-pointer group dark:border-zinc-700 dark:bg-zinc-900"
      onClick={handleClick}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400">
        <section.icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-2">
        {section.title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-300 mb-4">
        {section.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
          {section.id === "rectorate" ? "Batafsil ma'lumot" : "Batafsil ma'lumot"}
        </span>
        <ChevronDown className="h-4 w-4 text-orange-600 transition-transform group-hover:translate-y-1" />
      </div>
    </motion.div>
  );
}

function ContentModal({ 
  section, 
  isOpen, 
  onClose 
}: {
  section: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !section) return null;

  const getContent = (sectionId: string) => {
    switch (sectionId) {
      case "university":
        return {
          title: "RANCH texnologiya universiteti",
          content: [
            {
              subtitle: "Universitet tarixi",
              text: "Urganch Ranch texnologiya universiteti o'z faoliyatini 2021-yilning 5-noyabrida 0038-sonli litsenziya asosida \"UrganchKormmash\" aksiyadorlik jamiyati tarkibida boshladi. \"UrganchKormmash\" aksiyadorlik jamiyati 1981-yil sentabr oyida Moskva viloyati, Uxtomskiy zavodining Lyubertsi ishlab chiqarish asosida tashkil etilgan. Universitet Urganch shahar markazida qulay nuqtada joylashgan."
            },
            {
              subtitle: "Universitet bugungi kunda",
              text: "Bugungi kunda universitetda jami 7000 dan ortiq talabaga 178 nafar yuqori malakali professor-o'qituvchilar kreativ yondashuv bilan dars bermoqda. Universitetda o'quv jarayoni HEMIS axborot tizimiga to'liq integratsiya qilingan. Universitet professor-o'qituvchilari va talabalari ushbu tizimdan samarali foydalanib kelmoqdalar. Ilmiy unvonga tavsiya etilgan professor-o'qituvchilar http://interaktiv.oak.uz elektron manzili orqali ro'yhatga olinadi va professor-o'qituvchilarning ilmiy ishlar mavzulari OAK byulletiniga https://mavzu/oak.uz manzili orqali muntazam joylashtirib boriladi. Hozirgi kunda 12 000 o'rinli yangi o'quv binosi qurilishi davom etyapti va shu yilning o'zida foydalanishga topshiriladi."
            },
            {
              subtitle: "Universitet moddiy - texnik bazasi",
              text: "Universitetda ta'lim jarayonlari zamonaviy texnologiyalardan foydalanilgan holda olib boriladi. Bugungi universitetda 6 ta ilmiy va o'quv laboratoriyalar mavjud: Fizika bo'yicha ilmiy laboratoriya, Kimyo bo'yicha ilmiy laboratoriya, Mexanika bo'yicha ilmiy laboratoriya, Elektrotexnika bo'yicha ilmiy laboratoriya, IT dasturlash bo'yicha ilmiy laboratoriya. Shuningdek: IT sinfxonasi - 7 ta (jami 330 ta kompyuter), Interaktiv doska - 20 dona, Televizor - 18 dona, Faollar zali - 2 ta, Oshxona - 2 ta (250 o'rinli)."
            }
          ]
        };
      case "faculties":
        return {
          title: "Fakultetlar, kafedralar va yo'nalishlar",
          content: [
            {
              subtitle: "Iqtisodiyot fakulteti",
              text: "Kafedralar: Iqtisodiyot kafedrasi. Yo'nalishlar: Iqtisodiyot, Buxgalteriya hisobi, Menejment, Marketing, Bank ishi"
            },
            {
              subtitle: "Pedagogika va filologiya fakulteti",
              text: "Kafedralar: Pedagogika va aniq fanlar kafedrasi, O'zbek va xorijiy tillar kafedrasi, Ijtimoiy fanlar kafedrasi. Yo'nalishlar: Maktabgacha ta'lim, Matematika, Boshlang'ich ta'lim, Filologiya va tillarni o'qitish (rus tili), Filologiya va tillarni o'qitish (ingliz tili), Filologiya va tillarni o'qitish (o'zbek tili), Jismoniy madaniyat, Sport faoliyati (boks), Sport faoliyati (voleybol), Sport faoliyati (yengil atletika), Sport faoliyati (futbol), Sport faoliyati (erkin kurash)"
            },
            {
              subtitle: "Innovatsion texnologiyalar fakulteti",
              text: "Kafedralar: Mashinasozlik va axborot texnologiyalari kafedrasi. Yo'nalishlar: Texnologik mashinalar va jihozlar (Mashinasozlik va metallga ishlov berish bo'yicha), Transport vositalari muhandisligi (Avtomobil transporti bo'yicha), Logistika (Transport faoliyati bo'yicha), Energetika muhandisligi (Elektr ta'minoti), Kompyuter injiniringi (Kompyuter inginiringi), Kompyuter injiniringi (Kompyuter tizimlari axborot xavfsizligi), Kompyuter injiniringi (Ma'lumorlar ilmi bo'yicha), Kompyuter injiniringi (Multimedia texnologiyalari), Kiberxavfsizlik injiniringi, Arxitektura, Shahar qurilishi va loyihalash"
            },
            {
              subtitle: "Tibbiyot fakulteti",
              text: "Yo'nalishlar: Davolash ishi, Pediatriya ishi, Stomatologiya"
            }
          ]
        };
      case "centers":
        return {
          title: "Markaz va bo'limlar",
          content: [
            {
              subtitle: "Xalqaro hamkorliklar",
              text: "Urganch Ranch texnologiya universiteti xalqaro hamkorliklar doirasida professor-o'qituvchilar va talabalar almashinuvi dasturlari bo'yicha: Angliyaning Northampton universiteti, Ispaniya Barselona universiteti, Italiyaning Podova universiteti, Yaponiyaning Nagoya iqtisodiyot universiteti, Ispaniyaning Lieida universiteti, Chexiyaning Janubiy Bogemiya universiteti, AQSHning New-York city universiteti, AQSHning Pennsylvania universitetlari bilan munosabatlar o'rnatgan. Jumladan, 2024-yilda Ispaniya qirolligining Barselona unversiteti va Lieida universiteti bilan hamkorlik memorandumi imzolandi. Yangi o'quv yilidan Urganch Ranch texnologiya universiteti professor-o'qituvchilari va talabalari Ispaniya universitetlarida amaliyot o'tash imkoniyatiga ega bo'ldilar."
            }
          ]
        };
      case "rectorate":
        return {
          title: "Rektorat",
          content: [
            {
              subtitle: "Rektorat tuzilmasi",
              text: "Rektorat universitetning oliy boshqaruvi va strategik yo'nalishini belgilaydigan asosiy organ hisoblanadi. Barcha muhim qarorlar va loyihalar rektorat tomonidan ko'rib chiqiladi va tasdiqlanadi."
            }
          ]
        };
      case "workRules":
        return {
          title: "Universitet ichki mehnat tartib qoidalar",
          content: [
            {
              subtitle: "Ichki tartib-qoidalari (ichki mehnat tartibi qoidalari)",
              text: "Mazkur Ichki tartib qoidalari (ichki mehnat tartibi qoidalari) (keyingi o'rinlarda – Qoidalar) O'zbekiston Respublikasining Mehnat kodeksi, \"Ta'lim to'g'risida\"gi qonuni va boshqa oliy ta'limga oid qonun va qonunosti hujjatlarni inobatga olgan holda ishlab chiqilgan hamda oliy ta'lim muassasasi(keyingi o'rinlarda – Universitet)dagi mehnat, o'quv, ilmiy faoliyat va ta'lim-tarbiya jarayoniga oid bo'lgan munosabatlarni tartibga soluvchi lokal normativ hujjat hisoblanadi."
            },
            {
              subtitle: "1-bob. Umumiy qoidalar",
              text: "1.1. Mazkur Qoidalarda quyidagi asosiy tushunchalardan foydalaniladi: xodim – belgilangan yoshga etgan hamda Universitet bilan mehnat shartnomasini tuzgan O'zbekiston Respublikasi fuqarolari, shuningdek, chet el fuqarolari va fuqaroligi bo'lmagan shaxslar; mehnat shartnomasi – xodim bilan Universitet o'rtasida muayyan mutaxassislik, malaka, lavozim bo'yicha ishni ichki mehnat tartibiga bo'ysungan holda taraflar kelishuvi, shuningdek, mehnat to'g'risidagi qonunlar va boshqa normativ hujjatlar bilan belgilangan shartlar asosida haq evaziga bajarish haqidagi kelishuv. 1.2. Qoidalar Universitetning barcha xodimlari uchun majburiy hisoblanadi va ularning mehnat faoliyatini tartibga soladi. 1.3. Qoidalar O'zbekiston Respublikasining amaldagi qonunlariga zid bo'lishi mumkin emas."
            },
            {
              subtitle: "2-bob. Xodimlarning huquq va majburiyatlari",
              text: "2.1. Xodimlar quyidagi huquqlarga ega: mehnat shartnomasida belgilangan ishni bajarish, mehnat shartnomasida ko'rsatilgan ish joyida ishlash, mehnat shartnomasida belgilangan ish vaqti davomida ishlash, mehnat shartnomasida belgilangan ish haqini olish, ta'til va dam olish vaqtlaridan foydalanish, mehnat shartnomasida belgilangan boshqa huquqlardan foydalanish. 2.2. Xodimlar quyidagi majburiyatlarga ega: mehnat shartnomasida belgilangan ishni sifatli va o'z vaqtida bajarish, mehnat shartnomasida belgilangan ish vaqtida ishlash, mehnat shartnomasida belgilangan ish joyida ishlash, mehnat shartnomasida belgilangan boshqa majburiyatlarni bajarish."
            },
            {
              subtitle: "3-bob. Ish vaqti va dam olish vaqti",
              text: "3.1. Ish vaqti haftada 40 soatdan oshmasligi kerak. 3.2. Dam olish vaqti haftada kamida 42 soat bo'lishi kerak. 3.3. Ta'til vaqti yiliga kamida 21 ish kuni bo'lishi kerak. 3.4. Qo'shimcha ta'til vaqti mehnat stajiga qarab belgilanadi."
            },
            {
              subtitle: "4-bob. Mehnat shartnomasi",
              text: "4.1. Mehnat shartnomasi yozma shaklda tuziladi. 4.2. Mehnat shartnomasida quyidagi ma'lumotlar ko'rsatiladi: xodimning familiyasi, ismi va otasining ismi, Universitetning nomi, ish joyi, ish vaqti, ish haqi, mehnat shartnomasi tuzilgan sana, mehnat shartnomasi amal qilish muddati. 4.3. Mehnat shartnomasi cheksiz muddatga yoki belgilangan muddatga tuzilishi mumkin."
            },
            {
              subtitle: "5-bob. Ish haqi va qo'shimcha to'lovlar",
              text: "5.1. Ish haqi mehnat shartnomasida belgilanadi va o'zbek so'mida to'lanadi. 5.2. Qo'shimcha to'lovlar mehnat shartnomasida belgilangan holda amalga oshiriladi. 5.3. Ish haqi har oyning 15-kuniga qadar to'lanadi. 5.4. Ish haqi bank orqali yoki naqd pulda to'lanadi."
            },
            {
              subtitle: "6-bob. Mehnat xavfsizligi",
              text: "6.1. Universitet xodimlarning mehnat xavfsizligini ta'minlash uchun zarur sharoitlarni yaratadi. 6.2. Xodimlar mehnat xavfsizligi qoidalariga rioya qilishlari shart. 6.3. Mehnat xavfsizligi bo'yicha o'qitish va ko'rsatma berish muntazam ravishda amalga oshiriladi. 6.4. Mehnat xavfsizligi bo'yicha joriy etilgan qoidalarga rioya qilmaganlik uchun javobgarlik belgilanadi."
            },
            {
              subtitle: "7-bob. Intizomiy javobgarlik",
              text: "7.1. Xodimlar mehnat intizomiga rioya qilishlari shart. 7.2. Mehnat intizomini buzganlik uchun quyidagi intizomiy choralar qo'llaniladi: ogohlantirish, tanbeh, og'ir tanbeh, ishdan bo'shatish. 7.3. Intizomiy choralar mehnat shartnomasini buzganlik darajasiga qarab belgilanadi. 7.4. Intizomiy choralar qo'llanilishidan oldin xodimning izohi olinadi."
            },
            {
              subtitle: "8-bob. Mehnat shartnomasini tugatish",
              text: "8.1. Mehnat shartnomasi quyidagi hollarda tugatiladi: mehnat shartnomasi muddati tugaganda, xodimning xohishiga ko'ra, Universitetning xohishiga ko'ra, mehnat shartnomasini buzganlik uchun, xodimning o'limi tufayli. 8.2. Mehnat shartnomasi tugatilganda xodimga hisob-kitob to'lanadi. 8.3. Mehnat shartnomasi tugatilganda xodimga ish kitobchasi beriladi. 8.4. Mehnat shartnomasi tugatilganda xodimga boshqa hujjatlar ham beriladi."
            },
            {
              subtitle: "9-bob. Yakuniy qoidalar",
              text: "9.1. Mazkur Qoidalar Universitet rektorining buyrug'i bilan tasdiqlanadi. 9.2. Qoidalarga o'zgartirish va qo'shimchalar kiritish Universitet rektorining buyrug'i bilan amalga oshiriladi. 9.3. Qoidalar barcha xodimlarga taqdim etiladi va ular bilan tanishtiriladi. 9.4. Qoidalar Universitetning rasmiy veb-saytida e'lon qilinadi. 9.5. Qoidalar O'zbekiston Respublikasining amaldagi qonunlariga zid bo'lishi mumkin emas."
            }
          ]
        };
      case "ethics":
        return {
          title: "Universitet odob-axloq qoidalari",
          content: [
            {
              subtitle: "Odob-axloq qoidalari",
              text: "Universitet odob-axloq qoidalari talabalar, professor-o'qituvchilar va barcha xodimlar uchun belgilangan axloqiy va odobiy qoidalar to'plamidir. Bu qoidalar universitet jamiyatida hurmat va hamjihatlikni ta'minlaydi."
            }
          ]
        };
      case "charter":
        return {
          title: "Universitet nizomi",
          content: [
            {
              subtitle: "Universitet nizomi",
              text: "Universitet nizomi universitetning asosiy hujjati bo'lib, uning maqsadi, vazifalari, tuzilmasi va faoliyat yo'nalishlari belgilangan. Bu hujjat universitet faoliyatining barcha sohalarini tartibga soladi."
            }
          ]
        };
      case "structure":
        return {
          title: "Universitet tashkiliy tuzilmasi",
          content: [
            {
              subtitle: "Tashkiliy tuzilma",
              text: "Universitet tashkiliy tuzilmasi universitetning barcha bo'limlari, fakultetlari va xizmat ko'rsatish tuzilmalarining to'liq tashkiliy sxemasi va ularning o'zaro aloqalari ko'rsatilgan."
            }
          ]
        };
      default:
        return { title: "", content: [] };
    }
  };

  const content = getContent(section.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl"
      >
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase text-zinc-900 dark:text-zinc-100">
              {content.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {content.content.map((item, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {item.subtitle}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const [currentLang, setCurrentLang] = useState<Language>("uz");
  const [expandedSection, setExpandedSection] = useState<any>(null);
  const t = (key: string) => getTranslation(key, currentLang);

  // global scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  const aboutSections = [
    {
      id: "university",
      title: t("aboutUniversity"),
      description: t("aboutUniversityDesc"),
      icon: Building2,
    },
    {
      id: "faculties",
      title: t("faculties"),
      description: t("facultiesDesc"),
      icon: GraduationCap,
    },
    {
      id: "centers",
      title: t("centersAndDepartments"),
      description: t("centersAndDepartmentsDesc"),
      icon: Users,
    },
    {
      id: "rectorate",
      title: t("rectorate"),
      description: t("rectorateDesc"),
      icon: Award,
    },
    {
      id: "workRules",
      title: t("internalWorkRules"),
      description: t("internalWorkRulesDesc"),
      icon: Shield,
    },
    {
      id: "ethics",
      title: t("ethicalStandards"),
      description: t("ethicalStandardsDesc"),
      icon: BookOpen,
    },
    {
      id: "charter",
      title: t("universityCharter"),
      description: t("universityCharterDesc"),
      icon: FileText,
    },
    {
      id: "structure",
      title: t("organizationalStructure"),
      description: t("organizationalStructureDesc"),
      icon: Building2,
    },
  ];

  const handleExpandSection = (section: any) => {
    setExpandedSection(section);
  };

  const handleCloseModal = () => {
    setExpandedSection(null);
  };

  return (
    <div className="min-h-screen bg-white font-mono text-zinc-900 selection:bg-orange-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />
      
      {/* top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-orange-500 via-amber-400 to-purple-500"
      />

      {/* HERO — matching home page style */}
      <section className="relative isolate overflow-hidden">
        {/* Background image anchored to the right */}
        <Image
          src="/images/university-interior.jpg"
          alt="About RANCH University"
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
                {t("about")}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-5xl font-black uppercase leading-[0.95] text-black dark:text-white md:text-7xl"
            >
              {t("aboutRanchUniversity")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-zinc-600 dark:text-zinc-300 md:text-lg"
            >
              {t("pioneeringEducation")}
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
                href="#sections"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase text-zinc-700 dark:text-zinc-200"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition group-hover:border-orange-500 dark:border-zinc-700 dark:bg-zinc-900">
                  <Play className="h-4 w-4" />
                </span>
                <span className="border-b border-dotted border-zinc-400 group-hover:border-orange-500 dark:border-zinc-600">
                  {t("exploreMore")}
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
            title={t("aboutUniversity")}
            description={t("aboutUniversityDesc")}
          />
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="text-4xl font-black text-orange-600 mb-3">1985</div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{t("established1985")}</div>
              <div className="text-zinc-600 dark:text-zinc-300">{t("foundedYear")}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="text-4xl font-black text-orange-600 mb-3">4</div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{t("faculties")}</div>
              <div className="text-zinc-600 dark:text-zinc-300">{t("academicPrograms")}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="text-4xl font-black text-orange-600 mb-3">50+</div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{t("countries")}</div>
              <div className="text-zinc-600 dark:text-zinc-300">{t("internationalStudents")}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTIONS */}
      <section id="sections" className="border-b border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
            <SectionTitle
            overline="Sections"
            title={t("universityStructure")}
              description={t("ourImpactInGlobalEducation")}
            />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aboutSections.map((section, index) => (
              <AboutSectionCard
                key={section.id}
                section={section}
                index={index}
                onExpand={handleExpandSection}
              />
            ))}
          </div>
        </div>
      </section>
      {/* RECTORATE */}
       <section id="rectorate-section" className="border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Leadership"
            title={t("rectorate")}
            description={t("rectorateDesc")}
          />
          
                     <div className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-6">
             {/* Left side - 2 prorektor cards */}
             <div className="flex flex-row gap-4 xl:w-auto">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.1 }}
                 className="rounded-2xl border border-zinc-200 bg-white shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 overflow-hidden w-64"
               >
                 {/* Header with image */}
                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 text-center">
                   <Image
                     src="/images/rector-2.jpg"
                     alt="Baltayev Jamol Ismailovich"
                     width={80}
                     height={80}
                     className="h-20 w-20 rounded-full object-cover border-4 border-blue-200 mx-auto mb-3"
                   />
                   <h3 className="text-base font-black uppercase text-zinc-900 dark:text-zinc-100 mb-1">
                     Baltayev Jamol Ismailovich
                   </h3>
                   <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                     O'quv ishlari bo'yicha prorektor
                   </p>
                 </div>
                 
                 {/* Contact information */}
                 <div className="p-4 space-y-2">
                   <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                     <Mail className="h-3 w-3 text-blue-500 flex-shrink-0" />
                     <span className="font-medium">b.jamol@utu-ranch.uz</span>
                   </div>
                 </div>
               </motion.div>
               
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.2 }}
                 className="rounded-2xl border border-zinc-200 bg-white shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 overflow-hidden w-64"
               >
                 {/* Header with image */}
                 <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 text-center">
                   <Image
                     src="/images/rector-3.jpg"
                     alt="Otaboyev Mavlonbek Jamoliddin o'g'li"
                     width={80}
                     height={80}
                     className="h-20 w-20 rounded-full object-cover border-4 border-green-200 mx-auto mb-3"
                   />
                   <h3 className="text-base font-black uppercase text-zinc-900 dark:text-zinc-100 mb-1">
                     Otaboyev Mavlonbek Jamoliddin o'g'li
                   </h3>
                   <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">
                     Moliya-iqtisod ishlari bo'yicha prorektor
                   </p>
                 </div>
                 
                 {/* Contact information */}
                 <div className="p-4 space-y-2">
                   <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                     <Phone className="h-3 w-3 text-green-500 flex-shrink-0" />
                     <span className="font-medium">+998 (88) 098 08 00</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                     <Mail className="h-3 w-3 text-green-500 flex-shrink-0" />
                     <span className="font-medium">o.mavlonbek@utu-ranch.uz</span>
                   </div>
                 </div>
               </motion.div>
             </div>

                                                     {/* Center - Main rektor (larger card) */}
               <div className="xl:w-76">
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.3 }}
                   className="rounded-2xl border border-zinc-200 bg-white shadow-lg transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 transform scale-105 overflow-hidden"
                 >
                   {/* Header with image */}
                   <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-5 text-center">
                     <Image
                       src="/images/rector-1.jpg"
                       alt="Atajonov Jur'atbek Atavayevich"
                       width={90}
                       height={90}
                       className="h-22 w-22 xl:h-26 xl:w-26 rounded-full object-cover border-4 border-orange-200 mx-auto mb-3"
                     />
                     <h3 className="text-base xl:text-lg font-black uppercase text-zinc-900 dark:text-zinc-100 mb-1">
                       Atajonov Jur'atbek Atavayevich
                     </h3>
                     <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                       Urganch Ranch texnologiya universiteti rektori v.v.b.
                     </p>
                   </div>
                   
                   {/* Contact information */}
                   <div className="p-5 space-y-2">
                     <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                       <Phone className="h-3 w-3 text-orange-500 flex-shrink-0" />
                       <span className="font-medium">+998 (91) 868 00 60</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                       <Mail className="h-3 w-3 text-orange-500 flex-shrink-0" />
                       <span className="font-medium">j.atajonov@utu-ranch.uz</span>
                     </div>
                   </div>
                 </motion.div>
               </div>

                         {/* Right side - 2 prorektor cards */}
             <div className="flex flex-row gap-4 xl:w-auto">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.4 }}
                 className="rounded-2xl border border-zinc-200 bg-white shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 overflow-hidden w-64"
               >
                 {/* Header with image */}
                 <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 text-center">
                   <Image
                     src="/images/rector-4.jpg"
                     alt="RUZMETOV DAVRON IBROGIMOVICH"
                     width={80}
                     height={80}
                     className="h-20 w-20 rounded-full object-cover border-4 border-purple-200 mx-auto mb-3"
                   />
                   <h3 className="text-base font-black uppercase text-zinc-900 dark:text-zinc-100 mb-1">
                     RUZMETOV DAVRON IBROGIMOVICH
                   </h3>
                   <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                     Xalqaro hamkorlik bo'yicha prorektor
                   </p>
                 </div>
                 
                 {/* Contact information */}
                 <div className="p-4 space-y-2">
                   <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                     <Phone className="h-3 w-3 text-purple-500 flex-shrink-0" />
                     <span className="font-medium">+998 (90) 323 99 23</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                     <Mail className="h-3 w-3 text-purple-500 flex-shrink-0" />
                     <span className="font-medium">d.ruzmetov@utu-ranch.uz</span>
                   </div>
                 </div>
               </motion.div>
               
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.5 }}
                 className="rounded-2xl border border-zinc-200 bg-white shadow-md transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 overflow-hidden w-64"
               >
                 {/* Header with image */}
                 <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 p-4 text-center">
                   <Image
                     src="/images/rector-5.jpg"
                     alt="Xudaybergenov Abidjon Adilovich"
                     width={80}
                     height={80}
                     className="h-20 w-20 rounded-full object-cover border-4 border-teal-200 mx-auto mb-3"
                   />
                   <h3 className="text-base font-black uppercase text-zinc-900 dark:text-zinc-100 mb-1">
                     Xudaybergenov Abidjon Adilovich
                   </h3>
                   <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide">
                     Yoshlar masalalari va ma'naviy-ma'rifiy ishlar bo'yicha prorektor
                   </p>
                 </div>
                 
                 {/* Contact information */}
                 <div className="p-4 space-y-2">
                   <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                     <Phone className="h-3 w-3 text-teal-500 flex-shrink-0" />
                     <span className="font-medium">+998 (93) 090 72 11</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                     <Mail className="h-3 w-3 text-teal-500 flex-shrink-0" />
                     <span className="font-medium">x.abidjon@utu-ranch.uz</span>
                   </div>
                 </div>
               </motion.div>
             </div>
          </div>
          </div>
      </section>

             {/* CENTERS AND DEPARTMENTS */}
       <section id="centers-section" className="border-b border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle
            overline="Departments"
            title={t("centersAndDepartments")}
            description={t("centersAndDepartmentsDesc")}
          />
          
          <div className="space-y-4">
                         <UserCard
               name="Axmedov Zafar Kadirovich"
               position="Bo'lim boshlig'i"
               department="YOSHLAR BILAN ISHLASH, MA'NAVIYAT VA MA'RIFAT BO'LIMI"
               phone="+998 91 381-01-61"
               email="z.axmedov@utu-ranch.uz"
               imageSrc="/images/department-1.jpg"
               delay={0.1}
             />
             <UserCard
               name="Kuryozov Furqat Odilbekovich"
               position="Bo'lim boshlig'i"
               department="O'QUV-USLUBIY BO'LIMI"
               phone="+998 (97) 510-80-64"
               email="k.furqat@utu-ranch.uz"
               imageSrc="/images/department-2.jpg"
               delay={0.2}
             />
             <UserCard
               name="Karimov Aziz Toshpulatovich"
               position="Bo'lim boshlig'i"
               department="XALQARO HAMKORLIK BO'LIMI"
               phone="+998 90 123-45-67"
               email="a.karimov@utu-ranch.uz"
               imageSrc="/images/department-3.jpg"
               delay={0.3}
             />
             <UserCard
               name="Nazarova Malika Rustamovna"
               position="Bo'lim boshlig'i"
               department="TALABALAR ISHLARI BO'LIMI"
               phone="+998 88 987-65-43"
               email="m.nazarova@utu-ranch.uz"
               imageSrc="/images/department-4.jpg"
               delay={0.4}
             />
             <UserCard
               name="Sobirov Rustam Karimovich"
               position="Bo'lim boshlig'i"
               department="ILMIY ISHLAR BO'LIMI"
               phone="+998 95 555-12-34"
               email="r.sobirov@utu-ranch.uz"
               imageSrc="/images/department-5.jpg"
               delay={0.5}
             />
             <UserCard
               name="Toshmatova Malika Azizovna"
               position="Bo'lim boshlig'i"
               department="XALQARO ALOQALAR BO'LIMI"
               phone="+998 93 777-88-99"
               email="m.toshmatova@utu-ranch.uz"
               imageSrc="/images/department-6.jpg"
               delay={0.6}
             />
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
            {t("joinOurGlobalCommunity")}
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
            {t("globalCommunityDescription")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button className="h-12 rounded-xl border-2 border-orange-500 bg-orange-500 px-8 font-bold text-white transition hover:-translate-y-0.5">
                {t("scheduleAVisit")}
            </Button>
            </Link>
            <Link href="/programs">
            <Button
              variant="outline"
                className="h-12 rounded-xl border-2 border-white/70 bg-transparent px-8 font-bold text-white transition hover:border-white hover:bg-white hover:text-black"
            >
                {t("explorePrograms")}
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content Modal */}
      <ContentModal
        section={expandedSection}
        isOpen={!!expandedSection}
        onClose={handleCloseModal}
      />

      <Footer />
    </div>
  );
}
