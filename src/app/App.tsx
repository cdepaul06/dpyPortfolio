import { useEffect, useRef, useState } from 'react'
import './App.css'
import Navigation from '../features/navigation/Navigation'
import { Home } from '../features/home/Home'
import { About } from '../features/about/About'
import { Projects } from '../features/projects/Projects'
import { Contact } from '../features/contact/Contact'
import { FloatingThemeToggle } from '../features/theme/FloatingThemeToggle'
import { CursorGlow } from '../shared/components/CursorGlow'

function App() {
  const [active, setActive] = useState('home')
  const [snapEnabled, setSnapEnabled] = useState(true)
  const sectionRefs = useRef(new Map<string, HTMLElement>())
  const sectionRatios = useRef(new Map<string, number>())
  const isProgrammaticScroll = useRef(false)
  const scrollEndTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const scrollToSection = (id: string) => {
    isProgrammaticScroll.current = true
    setSnapEnabled(false)
    setActive(id)
    sectionRefs.current.get(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    clearTimeout(scrollEndTimeout.current)
    scrollEndTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false
      setSnapEnabled(true)
    }, 800)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return

        for (const entry of entries) {
          sectionRatios.current.set(entry.target.id, entry.intersectionRatio)
        }

        let maxId = ''
        let maxRatio = 0
        for (const [id, ratio] of sectionRatios.current) {
          if (ratio > maxRatio) {
            maxRatio = ratio
            maxId = id
          }
        }
        if (maxId) setActive(maxId)
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) },
    )

    sectionRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const registerSection = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el)
    else sectionRefs.current.delete(id)
  }

  return (
    <div className={`h-svh overflow-y-auto ${snapEnabled ? 'snap-y snap-mandatory' : ''}`}>
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur">
        <Navigation active={active} onActiveChange={scrollToSection} />
      </div>

      <section id="home" ref={registerSection('home')} className="flex min-h-svh snap-start items-center">
        <div className="container mx-auto w-full p-4">
          <Home onScrollNext={() => scrollToSection('about')} />
        </div>
      </section>

      <section id="about" ref={registerSection('about')} className="flex min-h-svh snap-start items-center">
        <div className="container mx-auto w-full p-4">
          <About />
        </div>
      </section>

      <section id="projects" ref={registerSection('projects')} className="flex min-h-svh snap-start items-center">
        <div className="container mx-auto w-full p-4">
          <Projects />
        </div>
      </section>

      <section id="contact" ref={registerSection('contact')} className="flex min-h-svh snap-start items-center">
        <div className="container mx-auto w-full p-4">
          <Contact />
        </div>
      </section>

      <FloatingThemeToggle />
      <CursorGlow />
    </div>
  )
}

export default App
