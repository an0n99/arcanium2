"use client"

import { useState, useEffect } from 'react'
import { Moon, Sun, Home, DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-900 dark:via-pink-900 dark:to-red-900 min-h-screen">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">DreamHome</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/" className="text-white hover:text-gray-200">Properties</Link>
            <Link href="/mortgages" className="text-white hover:text-gray-200">Mortgages</Link>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full bg-white dark:bg-gray-800"
            >
              {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" /> : <Moon className="h-[1.2rem] w-[1.2rem] text-gray-700" />}
            </Button>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-12">
          {children}
        </main>
      </div>
    </div>
  )
}