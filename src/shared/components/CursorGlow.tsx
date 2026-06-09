import { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

export function CursorGlow() {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  const glow = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.08), transparent 70%)`

  return (
    <motion.div
      aria-hidden
      className='pointer-events-none fixed inset-0 z-30'
      style={{ background: glow }}
    />
  )
}
