import { motion } from 'framer-motion'
import { Button } from 'dpyui'
import { SideSlideName } from '../../shared/components/SideSlideName'
import { RotatingRoles } from './RotatingRoles'

interface HomeProps {
  onScrollNext?: () => void
}

export function Home({ onScrollNext }: HomeProps) {
  return (
    <section className="relative flex min-h-[75svh] flex-col items-center justify-center overflow-hidden text-center border rounded-lg">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/40 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <SideSlideName text="Chris DePaul" className="text-5xl font-bold sm:text-6xl" />

      <RotatingRoles
        roles={['Software Developer', 'Problem Solver', 'Tech Enthusiast']}
        className="mt-4 text-lg text-muted-foreground sm:text-xl"
      />

      <div className="mt-8 flex gap-4">
        <Button>Get in Touch</Button>
        <Button variant="outline">View Projects</Button>
      </div>

      <motion.button
        type="button"
        onClick={onScrollNext}
        aria-label="Scroll to About section"
        className="absolute bottom-6 cursor-pointer text-sm text-muted-foreground"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        ↓ Scroll
      </motion.button>
    </section>
  )
}
