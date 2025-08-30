'use client'

import { useRouter, usePathname, useParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Globe, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
]

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const locale = useLocale()

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use params.locale to get the current locale from URL to prevent hydration mismatch
  const currentLocale = (params.locale as string) || locale || 'en'
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2">
        <Globe className="w-4 h-4 text-gray-700" />
        <span className="hidden sm:block text-sm font-medium">🌍 Loading...</span>
        <span className="block sm:hidden text-sm">🌍</span>
      </div>
    )
  }

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const segments = pathname.split('/')
    // Check if the second segment is a locale
    if (segments[1] && languages.some(lang => lang.code === segments[1])) {
      segments[1] = newLocale
    } else {
      // If no locale in path, add it
      segments.splice(1, 0, newLocale)
    }
    const newPath = segments.join('/') || '/'
    router.push(newPath)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:block text-sm font-medium">{currentLanguage.flag} {currentLanguage.name}</span>
        <span className="block sm:hidden text-sm">{currentLanguage.flag}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-lg border border-white/30 py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                language.code === currentLocale
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
              {language.code === currentLocale && (
                <span className="ml-auto text-primary-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
