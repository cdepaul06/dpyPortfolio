import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Skills } from "./Skills";
import { Work } from "./Work";

export function About() {
  const [showWork, setShowWork] = useState(false);

  return (
    <section className='relative flex flex-col text-center rounded-lg bg-muted/20'>
      <div className='flex flex-col p-6'>
        <div className='flex w-full flex-col items-center'>
          <h2 className='text-2xl font-semibold'>About</h2>
          <div className='mt-4 max-w-2xl'>
            <p className='mt-2 text-muted-foreground'>
              My name is Chris DePaul, and I'm a passionate software developer
              with a love for solving complex problems and staying up-to-date
              with the latest technology trends.
            </p>
            <br />
            <p className='mt-2 text-muted-foreground'>
              I attended Kent State University, where I earned a Bachelor of
              Science in Information Technology degree with a focus on Software
              Development. During my time at Kent State, I had the opportunity
              to work on various projects that allowed me to apply my knowledge
              and skills in real-world scenarios.
            </p>
            <br />
            <p className='mt-2 text-muted-foreground'>
              I currently work as a Software Developer at a company called
              Pleasant Valley Corporation. In this role, I have been able to
              further develop my skills and contribute to the success of the
              company by creating efficient and effective software solutions.
            </p>
          </div>

          <Skills />

          <div className='mt-10 w-full max-w-2xl text-left'>
            <div className='relative'>
              {/* Blurred outer glow */}
              <div className='work-accordion-border pointer-events-none absolute -inset-1 rounded-xl opacity-50 blur-md' />
              {/* Sharp animated border wrapper */}
              <div className='work-accordion-border relative overflow-hidden rounded-lg p-[1.5px]'>
                <div
                  className={`relative overflow-hidden rounded-[calc(var(--radius)-1.5px)] transition-colors duration-300 ${
                    showWork ? "bg-card" : "bg-muted"
                  }`}
                >
                  <button
                    type='button'
                    onClick={() => setShowWork((open) => !open)}
                    aria-expanded={showWork}
                    className='flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary'
                  >
                    <span>Work Experience</span>
                    <motion.span
                      aria-hidden
                      animate={{ rotate: showWork ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className='flex'
                    >
                      <ChevronDownIcon className='h-5 w-5' />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {showWork && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { type: "spring", stiffness: 280, damping: 32 },
                          opacity: { duration: 0.2, ease: "easeOut" },
                        }}
                        className='overflow-hidden'
                      >
                        <motion.div
                          initial={{ y: -12, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -12, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className='border-t border-border px-4 pb-6 pt-6'
                        >
                          <Work />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
