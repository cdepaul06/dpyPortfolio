import { Tabs, TabsTrigger, TabsList } from 'dpyui'
import { motion } from 'framer-motion'

const tabs = [
  { value: 'home', label: 'Home' },
  { value: 'about', label: 'About' },
  { value: 'projects', label: 'Projects' },
  { value: 'contact', label: 'Contact' },
]

interface NavigationProps {
  active: string
  onActiveChange: (value: string) => void
}

const Navigation = ({ active, onActiveChange }: NavigationProps) => {
  return (
    <div className="w-full border-b border-border/60 flex items-center justify-center px-4 py-3">
      <Tabs value={active} onValueChange={onActiveChange} className="flex justify-center overflow-x-auto">
        <TabsList className="w-full max-w-md justify-center gap-1 rounded-full border border-border/60 bg-muted/40 p-1 sm:gap-2">
          {tabs.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="group relative shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:scale-105 hover:bg-muted/60 hover:text-primary data-[state=active]:text-primary sm:text-base"
            >
              {active === value && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-background shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

export default Navigation
