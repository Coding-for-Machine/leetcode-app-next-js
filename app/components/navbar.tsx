'use client'

import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-[#121212]/90 border-[#333]' : 'bg-white/95 border-[#E0E0E0]'} backdrop-blur-md border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 font-bold text-xl text-[#4285F4] dark:text-[#8AB4F8]">
              CodeUz
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {["Bosh Sahifa", "Masalalar", "Musobaqalar", "Forum", "Reyting"].map((item) => (
                  <a key={item} href="#" className={`${darkMode ? 'text-[#E0E0E0] hover:text-white' : 'text-[#5F6368] hover:text-[#202124]'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-[#4285F4]/10"
            >
              {darkMode ? <Sun className="h-5 w-5 text-[#E0E0E0]" /> : <Moon className="h-5 w-5 text-[#5F6368]" />}
            </Button>
            <Button 
              variant="outline" 
              className={`hidden md:block ${darkMode ? 'border-[#8AB4F8] text-[#8AB4F8] hover:bg-[#4285F4]/10' : 'border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/10'}`}
            >
              Kirish
            </Button>
            <Button className={`${darkMode ? 'bg-[#4285F4] hover:bg-[#3367D6]' : 'bg-[#4285F4] hover:bg-[#3367D6]'} text-white`}>
              Ro'yxatdan o'tish
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}