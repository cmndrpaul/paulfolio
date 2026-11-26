import { useEffect, useRef, useState } from 'react'
import { ArrowRight, EnvelopeSimple } from '@/components/slab'
import MagneticLink from '@/components/MagneticLink'
import ThemeButton from '@/components/ThemeButton'
import AccessMenu from '@/components/AccessMenu'
import Home from '@/components/Home'
import GitHubContributions from '@/components/GitHubContributions'
import ProjectsGrid from '@/components/ProjectsGrid'
import ServicesGrid from '@/components/ServicesGrid'
import AboutGrid from '@/components/AboutGrid'
import ContactGrid from '@/components/ContactGrid'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { profile } from '@/data/profile'

const navigation = [
  ['home', 'Home'],
  ['projects', 'Projects'],
  ['services', 'Services'],
  ['about', 'About'],
  ['contact', 'Contact'],
] as const

const sectionIds = navigation.map(([id]) => id)
const footerSocials = ['GitHub profile', 'LinkedIn profile', 'Facebook profile']
  .flatMap((label) => profile.socials.filter((social) => social.label === label))

export default function App() {
  const mobileHeader = useMediaQuery('(max-width: 800px)')
  const [menuOpen, setMenuOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const sentinel = useRef<HTMLDivElement>(null)
  const header = useRef<HTMLElement>(null)
  const menuToggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const marker = sentinel.current
    if (!marker) return
    const observer = new IntersectionObserver(([entry]) => setCompact(!entry.isIntersecting))
    observer.observe(marker)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1))
    target?.scrollIntoView({ behavior: 'instant' })

    const sections = sectionIds.map((id) => document.getElementById(id)).reverse()
    let frame = 0
    function updateActiveSection() {
      frame = 0
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollHeight)) : 0
      if (scrollHeight > 0 && window.scrollY >= scrollHeight - 2) {
        header.current?.style.setProperty('--scroll-progress', String(progress))
        setActiveSection('contact')
        return
      }
      const threshold = (header.current?.getBoundingClientRect().bottom ?? 0) + 64
      const section = sections.find((node) => node && node.getBoundingClientRect().top <= threshold)
      header.current?.style.setProperty('--scroll-progress', String(progress))
      setActiveSection(section?.id ?? 'home')
    }
    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updateActiveSection)
    }
    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="portfolio-shell">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="portfolio-scroll-marker" ref={sentinel} aria-hidden="true" />
      <header className="portfolio-header" data-compact={compact} data-menu-open={menuOpen} ref={header}
        onKeyDown={(event) => {
          if (event.key !== 'Escape' || !mobileHeader || !menuOpen) return
          setMenuOpen(false)
          menuToggle.current?.focus()
        }}>
        <div className="portfolio-header__bar">
          <a className="portfolio-brand" href="#home" aria-label={profile.name + ' home'} onClick={() => setMenuOpen(false)}>
            <img src="/favicon.svg" alt="" width="36" height="36" />
            <span>John Paul Gonzaga</span>
          </a>
          <div className="portfolio-header__menu" id="portfolio-menu" inert={mobileHeader && !menuOpen}>
            <div className="portfolio-header__menu-body">
              <nav className="portfolio-nav" aria-label="Main navigation">
                {navigation.map(([id, label]) => (
                  <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}
                    onClick={() => setMenuOpen(false)}>{label}</a>
                ))}
                <a className="portfolio-nav__contact" href="#contact"
                  onClick={() => setMenuOpen(false)}>Let’s Talk <ArrowRight size={15} aria-hidden="true" /></a>
              </nav>
            </div>
          </div>
          <div className="portfolio-header__actions">
            <ThemeButton className="portfolio-theme" />
            <MagneticLink className="portfolio-contact" href="#contact">
              Let’s Talk <ArrowRight size={15} aria-hidden="true" />
            </MagneticLink>
            <button className="portfolio-menu-toggle" type="button" ref={menuToggle}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen} aria-controls="portfolio-menu"
              onClick={(event) => {
                setMenuOpen(!menuOpen)
                if (!menuOpen && event.detail === 0) {
                  requestAnimationFrame(() => header.current?.querySelector<HTMLAnchorElement>('.portfolio-nav a')?.focus())
                }
              }}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <main className="portfolio-main" id="main-content" tabIndex={-1}>
        <Home />
        <GitHubContributions />
        <ProjectsGrid />
        <ServicesGrid />
        <AboutGrid />
        <ContactGrid />
      </main>
      <footer className="portfolio-footer">
        <span>© 2025 John Paul Gonzaga</span>
        <ul className="portfolio-footer__links" role="list" aria-label="Social and contact links">
          {footerSocials.map(({ label, href, iconPath }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <img src={iconPath} alt="" width="17" height="17" />
              </a>
            </li>
          ))}
          <li><a href={`mailto:${profile.email}`} aria-label="Email"><EnvelopeSimple size={18} aria-hidden="true" /></a></li>
        </ul>
      </footer>
      <AccessMenu />
    </div>
  )
}
