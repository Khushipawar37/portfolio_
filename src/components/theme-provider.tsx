'use client'

import * as React from 'react'
import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  resolvedTheme: Theme
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
  resolvedTheme: 'light',
})

export function useTheme() {
  return useContext(ThemeContext)
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  /** Duration of the wipe animation in ms. Default: 750 */
  wipeDuration?: number
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'theme',
  wipeDuration = 750,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    return (localStorage.getItem(storageKey) as Theme) ?? defaultTheme
  })

  const isAnimating = useRef(false)

  const applyTheme = useCallback(
    (t: Theme) => {
      const root = document.documentElement
      if (t === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      localStorage.setItem(storageKey, t)
    },
    [storageKey]
  )

  // Sync on mount — handles SSR/hydration
  useEffect(() => {
    applyTheme(theme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTheme = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    const runToggle = () => {
      setTheme(next)
      applyTheme(next)
    }

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> }
    }

    if (doc.startViewTransition) {
      const transition = doc.startViewTransition(runToggle)
      transition.finished.finally(() => {
        isAnimating.current = false
      })
      return
    }

    runToggle()
    window.setTimeout(() => {
      isAnimating.current = false
    }, wipeDuration)
  }, [theme, applyTheme, wipeDuration])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, resolvedTheme: theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export type { ThemeProviderProps }