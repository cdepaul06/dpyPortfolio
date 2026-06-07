import { motion, type Variants } from 'framer-motion'

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const word: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 14, stiffness: 120 },
  },
}

interface AnimatedTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'p' | 'span'
}

export function AnimatedText({ text, className, as = 'span' }: AnimatedTextProps) {
  const Tag = motion[as]

  return (
    <Tag className={className} variants={container} initial="hidden" animate="visible">
      {text.split(' ').map((w, i) => (
        <motion.span key={i} variants={word} className="mr-[0.25em] inline-block">
          {w}
        </motion.span>
      ))}
    </Tag>
  )
}
