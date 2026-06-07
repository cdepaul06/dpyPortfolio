import { ThemeToggle } from './ThemeToggle'

export function FloatingThemeToggle() {
  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-full border bg-card p-2 shadow-lg">
      <ThemeToggle />
    </div>
  )
}
