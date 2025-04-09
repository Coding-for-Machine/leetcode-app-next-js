'use client'

import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // localStorage dan dark mode holatini o'qiymiz
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true')
    } else {
      // Agar localStorage da saqlanmagan bo'lsa, brauzerning default holatini olamiz
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(prefersDark)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      // Dark mode o'zgarganda localStorage ga saqlaymiz
      localStorage.setItem('darkMode', darkMode.toString())
      // HTML elementiga class qo'shamiz/o'chiramiz
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [darkMode, mounted])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return { darkMode, toggleDarkMode, mounted }
}