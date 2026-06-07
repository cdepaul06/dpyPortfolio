import './SideSlideName.css'

interface SideSlideNameProps {
  text: string
  className?: string
}

export function SideSlideName({ text, className }: SideSlideNameProps) {
  return (
    <h1 className={className}>
      {text.split('').map((char, i) => (
        <span key={i} className="side-slide" style={{ animationDelay: `${i * 0.05}s` }}>
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </h1>
  )
}
