import { motion, type Variants } from "framer-motion";
import { ProjectCard, type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    name: "CD Developer Portfolio",
    description:
      "A personal portfolio website showcasing my skills and projects as a software developer.",
    tech: ["React", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/your-username/project-one",
  },
  {
    name: "Project Two",
    description:
      "TODO: Replace with a short description of what this project does and why you built it.",
    tech: ["C#", ".NET", "SQL"],
    githubUrl: "https://github.com/your-username/project-two",
  },
  {
    name: "Project Three",
    description:
      "TODO: Replace with a short description of what this project does and why you built it.",
    tech: ["React", "Vite", "Framer Motion"],
    githubUrl: "https://github.com/your-username/project-three",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export function Projects() {
  return (
    <section className='relative flex h-[80svh] flex-col text-center border rounded-lg'>
      <div className='flex h-full flex-col overflow-y-auto p-6'>
        <div className='my-auto flex w-full flex-col items-center'>
          <h2 className='text-2xl font-semibold'>Projects</h2>
          <p className='mt-2 max-w-2xl text-muted-foreground'>
            A few things I've built — source code available on GitHub (for
            personal projects).
          </p>

          <motion.div
            className='mt-8 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
            variants={container}
            initial='hidden'
            animate='visible'
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
