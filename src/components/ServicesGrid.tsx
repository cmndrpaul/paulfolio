import type { CSSProperties } from 'react'
import { MagnetStraight, Timer, Trophy, CheckCircle, Code, Stack, PaintBrush, FilmSlate } from '@/components/slab'
import type { Icon } from '@/components/slab'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Two bands, top to bottom: your three-step method (on a dark plate so it
 * is the first thing the eye lands on) and four service cards that
 * carry the marks of what each one is built with. Same object language as Home and
 * Projects: the glass, the bento card, plated marks, orange for the index
 * and the accent.
 *
 * Every string below is a PLACEHOLDER. Replace it, or hand this file to your
 * AI assistant and tell it what to put in each spot.
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Understand',
    body: 'We clarify your goals, audience, and what the project needs to achieve.',
    Icon: MagnetStraight,
    chips: ['Goals', 'Audience', 'Scope'],
  },
  {
    index: '02',
    label: 'Create',
    body: 'I design and build a solution around the brief, with your feedback along the way.',
    Icon: Timer,
    chips: ['Design', 'Build', 'Review'],
  },
  {
    index: '03',
    label: 'Deliver',
    body: 'We polish the final work and prepare it for launch or handoff.',
    Icon: Trophy,
    chips: ['Refine', 'Launch', 'Handoff'],
  },
]

/* ---------- The services ---------- */

type Service = {
  index: string
  title: string
  description: string
  chip: string
  Icon: Icon
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Frontend Development',
    description: 'Responsive, accessible interfaces that look right and work smoothly on every screen.',
    chip: 'Web Interfaces',
    Icon: Code,
    bullets: ['Responsive layouts', 'Reusable components', 'Accessible interactions'],
  },
  {
    index: '02',
    title: 'Full Stack Development',
    description: 'Complete web applications, from the user interface through the backend and database.',
    chip: 'Web Applications',
    Icon: Stack,
    bullets: ['Frontend and backend integration', 'Database-driven features', 'Deployment-ready builds'],
  },
  {
    index: '03',
    title: 'Graphic Design',
    description: 'Clear, consistent visuals for digital products, brands, and online content.',
    chip: 'Visual Design',
    Icon: PaintBrush,
    bullets: ['Social media graphics', 'Web and app assets', 'Consistent brand styling'],
  },
  {
    index: '04',
    title: 'Video Editing',
    description: 'Engaging video edits shaped for your platform, audience, and message.',
    chip: 'Post-Production',
    Icon: FilmSlate,
    bullets: ['Clean cuts and pacing', 'Titles and captions', 'Audio and color polish'],
  },
]

/** A category icon on the same framed plate used for project logos. */
function ServiceMark({ Icon: ServiceIcon }: { Icon: Icon }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      <span className="bento__logo sgrid__service-mark">
        <ServiceIcon size={22} weight="duotone" aria-hidden="true" />
      </span>
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">Web, design, and video services for your ideas.</h1>
        <p className="pgrid__lede">
          I create responsive websites, full-stack applications, engaging visual designs, and polished video content.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">How I work</span>
            <h2 className="sgrid__method-title" id="method-title">
              Understand. Create. Deliver.
              <br />
              <span>A clear path from idea to launch.</span>
            </h2>
            <p className="sgrid__method-sub">
              I keep the process collaborative, focused, and shaped around your goals.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Five cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">What I can help you build.</h2>
            <p className="sgrid__offers-sub">Four ways to bring your ideas to life.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <ServiceMark Icon={s.Icon} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 04</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
