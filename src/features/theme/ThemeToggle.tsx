import { Switch } from 'dpyui'
import { useTheme } from './useTheme'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'


export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center space-x-2">
    <SunIcon className="w-6 h-6" />
    <Switch
      checked={theme === 'dark'}
      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
    />
    <MoonIcon className="w-6 h-6" />
    </div>
  )
}
