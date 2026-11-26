import { useEffect, useRef } from 'react'
import MagneticLink from '@/components/MagneticLink'
import { ArrowUpRight } from '@/components/slab'
import { profile } from '@/data/profile'
import ToolLogos from '@/components/ToolLogos'

const contours = Array.from({ length: 29 }, (_, index) => {
  const points = Array.from({ length: 121 }, (_, step) => {
    const angle = step / 120 * Math.PI * 2
    const radius = 70 + index * 5 + 20 * Math.cos(angle * 3 + index * .11)
      + 14 * Math.sin(angle * 2 - index * .08)
    return [260 + Math.cos(angle) * radius * 1.08, 225 + Math.sin(angle) * radius * .79]
      .map((value) => value.toFixed(1)).join(',')
  })
  return 'M' + points.join('L') + 'Z'
})

function HairlineBlob() {
  const artwork = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = artwork.current
    if (!node) return
    let visible = false
    const update = () => {
      node.dataset.playing = String(visible && !document.hidden)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    })
    observer.observe(node)
    document.addEventListener('visibilitychange', update)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return (
    <div className="hairline" ref={artwork} aria-hidden="true">
      <svg viewBox="-12 -12 544 474" fill="none" stroke="currentColor" strokeWidth=".8">
        {contours.map((path) => <path key={path} d={path} />)}
      </svg>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <section className="portfolio-hero" id="home" aria-labelledby="home-title" tabIndex={-1}>
        <HairlineBlob />
        <div className="portfolio-hero__copy">
          <h1 id="home-title">{profile.displayName.line1}<br /><span>{profile.displayName.line2}</span></h1>
          <p className="portfolio-hero__lede">{profile.hero.body}</p>
          <div className="portfolio-hero__actions">
            <MagneticLink className="portfolio-button portfolio-button--accent" href="#projects">
              Explore projects <ArrowUpRight size={16} aria-hidden="true" />
            </MagneticLink>
            <a className="portfolio-button" href="#services">See services</a>
          </div>
        </div>
      </section>
      <section className="portfolio-tools" aria-label="Tools I work with">
        <ToolLogos />
      </section>
    </>
  )
}
