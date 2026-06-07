import { useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'

interface Job {
  title: string
  company: string
  period?: string
  highlights: string[]
}

const jobs: Job[] = [
  {
    title: 'Software Developer',
    company: 'Pleasant Valley Corporation',
    period: 'April 2026 - Present',
    highlights: [
      'Designing and implementing software solutions using C#, Blazor, React, and .NET.',
      'Collaborating with cross-functional teams to deliver high-quality products.',
      'Participating in code reviews and providing constructive feedback to peers.',
      'Continuously learning and staying up-to-date with industry trends and technologies.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Iron Mountain',
    period: 'Nov 2022 - June 2025',
    highlights: [
      'Developing and maintaining web applications using React.js and other related technologies.',
      'Collaborating with cross-functional teams including product managers and other developers to create high-quality products.',
      'Implementing responsive design and ensuring cross-browser compatibility.',
      'Participating in peer code reviews and providing meaningful feedback to internal developers.',
    ],
  },
  {
    title: 'Manager',
    company: 'Allstate Insurance Company',
    period: 'April 2015 - Nov 2022',
    highlights: [
      'Led highly specialized teams of 15-20 employees in the handling of complex insurance questions.',
      'Received numerous performance bonuses for going above and beyond to meet business goals.',
      'Received a peer award in 2016.',
      'Participated in bi-monthly coaching sessions, providing constructive feedback to direct report employees.',
    ],
  },
  {
    title: 'Project Manager',
    company: 'NorthStar Recovery Services',
    period: 'Aug 2013 - April 2015',
    highlights: [
      'Conducted disaster recovery services for commercial clients in which water, fire, or mold was present.',
      'Managed teams of 15-25 employees and ensured that all projects were completed on time and within budget.',
      'Ensured that all IICRC standards were met and that all work was completed to the highest quality.',
    ],
  },
  {
    title: 'Team Leader, Corporal (E-4)',
    company: 'United States Marine Corps',
    period: 'Sept 2008 - Aug 2013',
    highlights: [
      'Conducted combat operations in support of Operation Enduring Freedom in Afghanistan.',
      'Achieved the rank of Corporal (E-4) and served as a Team Leader.',
      'Implemented a battalion-wide physical training program.',
      'Received an honorable discharge in August 2013 after active duty service was complete.',
    ],
  },
]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const itemFromLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 220, damping: 24 },
  },
}

const itemFromRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 220, damping: 24 },
  },
}

interface JobDotProps {
  period?: string
}

function JobDot({ period }: JobDotProps) {
  const [open, setOpen] = useState(false)

  if (!period) {
    return <span className="block h-3 w-3 rounded-full border-2 border-primary bg-background" />
  }

  return (
    <motion.span
      className="relative block cursor-default"
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onTap={() => setOpen((current) => !current)}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/40"
        animate={{ rotate: 360, opacity: open ? 0 : 1 }}
        transition={{
          rotate: { duration: 7, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 0.15, ease: 'easeOut' },
        }}
      />
      <motion.span
        className="relative block h-3 w-3 rounded-full border-2 border-primary bg-background"
        animate={{ scale: open ? 1.2 : 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 max-w-[60vw] -translate-x-1 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground shadow-md sm:left-1/2 sm:max-w-none sm:-translate-x-1/2"
          >
            {period}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  )
}

export function Work() {
  return (
    <div className="w-full text-left">
      <motion.ol className="relative space-y-10" variants={container} initial="hidden" animate="visible">
        <div className="pointer-events-none absolute bottom-1 left-4 top-1 w-px bg-border sm:left-1/2" aria-hidden />

        {jobs.map((job, index) => {
          const onRight = index % 2 === 1
          return (
            <motion.li
              key={job.company}
              variants={onRight ? itemFromRight : itemFromLeft}
              className={`relative pl-10 sm:pl-0 ${
                onRight ? 'sm:pl-[calc(50%+1.5rem)]' : 'sm:pr-[calc(50%+1.5rem)]'
              }`}
            >
              <span className="absolute left-4 top-1.5 z-10 -translate-x-1/2 sm:left-1/2">
                <JobDot period={job.period} />
              </span>

              <h4 className="font-semibold text-foreground">{job.title}</h4>
              <p className="text-sm font-medium text-primary">{job.company}</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.li>
          )
        })}
      </motion.ol>
    </div>
  )
}
