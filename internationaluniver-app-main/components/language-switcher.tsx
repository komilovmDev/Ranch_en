"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Language } from "@/lib/i18n"

interface LanguageSwitcherProps {
  currentLang: Language
  onLanguageChange: (lang: Language) => void
}

export default function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  const languages = [
    { code: "en" as Language, name: "English", flag: "🇺🇸" },
    { code: "ru" as Language, name: "Русский", flag: "🇷🇺" },
    { code: "uz" as Language, name: "O'zbek", flag: "🇺🇿" },
    { code: "tr" as Language, name: "Türkçe", flag: "🇹🇷" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === currentLang)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentLanguage?.flag} {currentLanguage?.name}
          </span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={currentLang === language.code ? "bg-gray-100" : ""}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
