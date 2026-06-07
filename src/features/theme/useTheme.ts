import { useCallback, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : null
}

function getInitialTheme(fallback: Theme): Theme {
  return getStoredTheme() ?? fallback
}

export function useTheme(initial: Theme = 'light') {
  const [theme, setTheme] = useState<Theme>(() => {
    const resolved = getInitialTheme(initial)
    applyTheme(resolved)
    return resolved
  })

  const setThemeAndApply = useCallback((next: Theme) => {
    setTheme(next)
    applyTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  return { theme, setTheme: setThemeAndApply }
}
