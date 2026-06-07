import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

interface Skill {
  name: string;
  blurb: string;
}

const skills: Skill[] = [
  {
    name: "React",
    blurb:
      "Building fast, component-driven UIs with hooks and modern patterns.",
  },
  {
    name: "TypeScript",
    blurb: "Typing my way to fewer bugs and more confident refactors.",
  },
  {
    name: "C#",
    blurb: "Writing robust backend services and business logic with .NET.",
  },
  {
    name: "HTML",
    blurb: "Semantic, accessible markup as the foundation of every UI.",
  },
  {
    name: "CSS",
    blurb: "Crafting responsive layouts and polished visual details.",
  },
  { name: "SQL", blurb: "Designing schemas and writing queries that scale." },
  {
    name: "Git",
    blurb: "Branching, merging, and collaborating without the headaches.",
  },
  {
    name: "Tailwind",
    blurb:
      "Styling quickly with utility classes and a consistent design system.",
  },
  {
    name: ".NET",
    blurb: "Shipping production-grade APIs and services on the .NET platform.",
  },
  {
    name: "Microservices",
    blurb: "Designing and implementing scalable, decoupled services.",
  },
  {
    name: "JavaScript",
    blurb: "The glue of the web — and where my developer journey started.",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

function randomTilt() {
  const sign = Math.random() < 0.5 ? -1 : 1;
  return sign * (4 + Math.random() * 10);
}

interface SkillBadgeProps {
  skill: Skill;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onToggle: () => void;
}

function SkillBadge({
  skill,
  active,
  onActivate,
  onDeactivate,
  onToggle,
}: SkillBadgeProps) {
  const baseTilt = useMemo(() => randomTilt(), []);
  const hoverTilt = useMemo(() => randomTilt(), []);

  const item: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.7, rotate: baseTilt },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 260, damping: 18 },
    },
  };

  return (
    <motion.span
      variants={item}
      onHoverStart={onActivate}
      onHoverEnd={onDeactivate}
      onTap={onToggle}
      whileHover={{ scale: 1.1, y: -6, rotate: hoverTilt }}
      whileTap={{ scale: 0.95 }}
      className={`block cursor-default rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-300 ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-muted/50 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
      }`}
    >
      {skill.name}
    </motion.span>
  );
}

export function Skills() {
  const [activeName, setActiveName] = useState<string | null>(null);
  const activeSkill = skills.find((skill) => skill.name === activeName) ?? null;

  return (
    <div className='mt-6 flex w-full flex-col items-center'>
      <motion.div
        className='flex flex-wrap justify-center gap-3'
        variants={container}
        initial='hidden'
        animate='visible'
      >
        {skills.map((skill) => (
          <SkillBadge
            key={skill.name}
            skill={skill}
            active={activeName === skill.name}
            onActivate={() => setActiveName(skill.name)}
            onDeactivate={() =>
              setActiveName((current) =>
                current === skill.name ? null : current,
              )
            }
            onToggle={() =>
              setActiveName((current) =>
                current === skill.name ? null : skill.name,
              )
            }
          />
        ))}
      </motion.div>

      <div className='pointer-events-none fixed inset-x-0 bottom-24 z-30 flex justify-center px-4 sm:absolute sm:bottom-6'>
        <AnimatePresence mode='wait'>
          {activeSkill && (
            <motion.div
              key={activeSkill.name}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className='pointer-events-none w-full max-w-md rounded-lg border border-border bg-card px-4 py-3 text-center text-sm shadow-lg'
            >
              <p className='font-semibold text-primary'>{activeSkill.name}</p>
              <p className='mt-1 text-muted-foreground'>{activeSkill.blurb}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
