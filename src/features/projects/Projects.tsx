import { motion, type Variants } from "framer-motion";
import { ProjectCard, type Project } from "./ProjectCard";
import portfolioImage from "../../assets/projects/portfolio.png";
import portfolioImageV1 from "../../assets/projects/portfolio-v1.png";
import moodyImage from "../../assets/projects/moody.png";
import spinwheelImage from "../../assets/projects/spinwheel.png";

const projects: Project[] = [
  {
    name: "CD Developer Portfolio v2",
    description:
      "A personal portfolio website showcasing my skills and projects as a software developer.",
    tech: ["React", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/cdepaul06/dpyPortfolio",
    image: portfolioImage,
  },
  {
    name: "CD Developer Portfolio v1",
    description:
      "A personal portfolio website showcasing my skills and projects as a software developer.",
    tech: ["React", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/cdepaul06/developer-cd",
    image: portfolioImageV1,
  },
  {
    name: "Moody App",
    description:
      "A personal project I developed using React Native/TypeScript so that my wife and I could track our moods and see what activities, foods, and other factors correlate with our mental health.",
    tech: ["React Native", "TypeScript", "Vite"],
    githubUrl: "https://github.com/cdepaul06/Moody",
    image: moodyImage,
  },
  {
    name: "Spinner Wheel",
    description:
      "A simple spinner wheel app built with React Native and TypeScript. It allows users to save a list locally and spin a wheel to make random selections from that list.",
    tech: ["React Native", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/cdepaul06/Spinwheel",
    image: spinwheelImage,
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export function Projects() {
  return (
    <section className='relative flex flex-col text-center rounded-lg bg-muted/20'>
      <div className='flex flex-col p-6'>
        <div className='flex w-full flex-col items-center'>
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
