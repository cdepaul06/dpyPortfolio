import { motion, type Variants } from "framer-motion";
import { Badge, Button } from "dpyui";
import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";

export interface Project {
  name: string;
  description: string;
  tech: string[];
  githubUrl: string | null;
  image?: string;
}

const card: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      variants={card}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className='group relative'
    >
      {/* Blur glow — fades in on hover */}
      <div className='project-card-border pointer-events-none absolute -inset-1 rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50' />

      {/* Border wrapper — 1.5px gap acts as the border */}
      <div className='relative overflow-hidden rounded-lg p-[1.5px]'>
        {/* Static border — visible when not hovered */}
        <div className='absolute inset-0 rounded-lg bg-border transition-opacity duration-300 group-hover:opacity-0' />
        {/* Animated gradient border — appears on hover */}
        <div className='project-card-border absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

        {/* Card content */}
        <div className='relative flex flex-col overflow-hidden rounded-[calc(var(--radius)-1.5px)] bg-card shadow-sm transition-shadow duration-300 group-hover:shadow-lg'>
          <div className='relative flex h-40 items-center justify-center overflow-hidden bg-muted/50'>
            {project.image ? (
              <img
                src={project.image}
                alt={project.name}
                className='h-full w-full object-cover'
              />
            ) : (
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              >
                <CodeBracketSquareIcon className='h-16 w-16 text-primary' />
              </motion.div>
            )}
            <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-card/80 via-transparent to-transparent' />
          </div>

          <div className='flex flex-1 flex-col p-5 text-left'>
            <h3 className='text-lg font-semibold text-foreground transition-colors duration-200 group-hover:text-primary'>
              {project.name}
            </h3>
            <p className='mt-1 text-sm text-muted-foreground'>
              {project.description}
            </p>

            <div className='mt-3 flex flex-wrap gap-1.5'>
              {project.tech.map((tech) => (
                <Badge key={tech} variant='secondary' className='font-normal'>
                  {tech}
                </Badge>
              ))}
            </div>

            <div className='mt-4'>
              {project.githubUrl ? (
                <Button asChild variant='outline' size='sm'>
                  <a
                    href={project.githubUrl}
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    View on GitHub
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
