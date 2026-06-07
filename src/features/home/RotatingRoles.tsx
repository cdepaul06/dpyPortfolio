import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface RotatingRolesProps {
  roles: string[]
  intervalMs?: number
  className?: string
}

export function RotatingRoles({ roles, intervalMs = 2400, className }: RotatingRolesProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [roles.length, intervalMs])

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="inline-block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
