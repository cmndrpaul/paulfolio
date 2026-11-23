import type { PointerEvent } from 'react'
import { ArrowUp, ArrowUpRight, EnvelopeSimple, MapPin } from '@/components/slab'
import { profile } from '@/data/profile'

const contacts = [
  { label: 'Email', display: profile.email, href: `mailto:${profile.email}`, iconPath: '' },
  ...profile.socials.map(({ label, href, iconPath }) => ({
    label: label.replace(/ profile$/, ''),
    display: href.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href,
    iconPath,
  })),
]

function followPointer(event: PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType !== 'mouse') return
  const link = event.currentTarget
  const { left, width, right } = link.getBoundingClientRect()
  const distance = Math.max(0, Math.min(120, left - 6, document.documentElement.clientWidth - right - 6))
  const position = 2 * (event.clientX - left) / width - 1
  link.style.setProperty('--contact-row-offset', `${position * distance}px`)
}

export default function ContactGrid() {
  return (
    <section className="portfolio-contact-section" id="contact" aria-labelledby="contact-title" tabIndex={-1}>
      <header className="portfolio-contact-section__heading">
        <h2 id="contact-title">Let’s talk about <span>your project.</span></h2>
        <p>Email is the fastest way to reach me. I’ll reply within one business day.</p>
      </header>

      <ol className="portfolio-contact-section__links" role="list">
        {contacts.map(({ label, display, href, iconPath }, index) => (
          <li key={href}>
            <a href={href} target={iconPath ? '_blank' : undefined} rel={iconPath ? 'noopener noreferrer' : undefined}
              onPointerMove={followPointer}
              onPointerLeave={(event) => event.currentTarget.style.removeProperty('--contact-row-offset')}>
              <span className="portfolio-contact-section__row">
                <span className="portfolio-contact-section__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="portfolio-contact-section__icon" aria-hidden="true">
                  {iconPath ? <img src={iconPath} alt="" width="18" height="18" /> : <EnvelopeSimple size={19} />}
                </span>
                <strong>{label}</strong>
                <span className="portfolio-contact-section__address">{display}</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ol>

      <div className="portfolio-contact-section__footer">
        <p><MapPin size={17} aria-hidden="true" />Philippines · Remote-friendly worldwide</p>
        <a className="portfolio-contact-section__top" href="#home" aria-label="Back to top">
          <ArrowUp size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
