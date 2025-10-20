"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { getTranslation, type Language } from "@/lib/i18n"

interface FooterProps {
  currentLang?: Language
}

export default function Footer({ currentLang = "en" }: FooterProps) {
  const t = (key: string) => getTranslation(key, currentLang)

  const getUniversityDescription = () => {
    switch (currentLang) {
      case "en":
        return "Leading international education in Central Asia with world-class programs and modern facilities."
      case "ru":
        return "Ведущее международное образование в Центральной Азии с программами мирового класса и современными объектами."
      case "uz":
        return "Markaziy Osiyoda jahon darajasidagi dasturlar va zamonaviy imkoniyatlar bilan yetakchi xalqaro ta'lim."
      case "tr":
        return "Orta Asya'da dünya standartlarında programlar ve modern tesislerle önde gelen uluslararası eğitim."
      default:
        return "Leading international education in Central Asia with world-class programs and modern facilities."
    }
  }

  const getLocationText = () => {
    switch (currentLang) {
      case "en":
        return "Urganch shahar, 26-uy, ko'chasi, Xonqa, Xorazm Viloyati"
      case "ru":
        return "Урганч, 26-й дом, улица, Хонка, Хорасандская область"
      case "uz":
        return "Urganch shahar, 26-uy, ko'chasi, Xonqa, Xorazm Viloyati"
      case "tr":
        return "Urganch, 26. sokak, Xonqa, Horezm Bölgesi"
      default:
        return "Urganch shahar, 26-uy, ko'chasi, Xonqa, Xorazm Viloyati"
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* University Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{t("ranchUniversity")}</h3>
            <p className="text-gray-300 mb-6 max-w-md">{getUniversityDescription()}</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/uturanch/" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/utu_ranch/" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("quickLinks")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-gray-300 hover:text-white transition-colors">
                  {t("programs")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white transition-colors">
                  {t("news")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("contactInfo")}</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm whitespace-pre-line">{getLocationText()}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+998 71 123 45 67</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@ranch.uz</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 RANCH University. {t("allRightsReserved")}.</p>
        </div>
      </div>
    </footer>
  )
}
