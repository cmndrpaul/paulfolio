import type { CSSProperties } from 'react'
import { MapPin, ShieldCheck } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left and your portrait on
 * the right. Sized to the panel, so nothing here scrolls.
 *
 * The left column is a ladder, not a paragraph block: one display statement,
 * one line of context, then the four things you do - each carrying the marks
 * of the tools it is built with. The tools are the proof, so they are the
 * visual. Swap the marks below for your own (any square SVG/PNG in public/).
 */

const REACT = { src: '/icons/ai/react.svg', name: 'React' }
const NEXT = { src: 'https://cdn.simpleicons.org/nextdotjs', name: 'Next.js' }
const JAVASCRIPT = { src: 'https://cdn.simpleicons.org/javascript', name: 'JavaScript' }
const TAILWIND = { src: '/icons/ai/tailwindcss.svg', name: 'Tailwind CSS' }
const HTML = { src: 'https://cdn.simpleicons.org/html5', name: 'HTML5/CSS3' }
const LARAVEL = { src: 'https://cdn.simpleicons.org/laravel', name: 'Laravel' }
const PHP = { src: 'https://cdn.simpleicons.org/php', name: 'PHP' }
const MYSQL = { src: 'https://cdn.simpleicons.org/mysql', name: 'MySQL' }
const SUPABASE = { src: 'https://cdn.simpleicons.org/supabase', name: 'Supabase' }
const CANVA = { src: '/icons/canva.svg', name: 'Canva', amber: true }
const CAPCUT = { src: '/icons/capcut.svg', name: 'CapCut', amber: true }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string; amber?: boolean }[]
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'Front-End Developer',
    marks: [REACT, NEXT, JAVASCRIPT, TAILWIND, HTML],
  },
  {
    index: '02',
    title: 'Full-Stack Developer',
    marks: [LARAVEL, PHP, MYSQL, SUPABASE],
  },
  {
    index: '03',
    title: 'Graphic Designer',
    marks: [CANVA],
  },
  {
    index: '04',
    title: 'Video Editor',
    marks: [CAPCUT],
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          I work across frontend and full-stack development, graphic design, and video editing.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            I build digital experiences.
            <span> From code to visuals, I make ideas clear, useful, and engaging.</span>
          </p>

          <p className="agrid__note">
            I enjoy turning ideas into practical digital work, from responsive websites and complete web
            applications to graphics and video content. I’m based in Cavite and continue building through
            personal projects and community work.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className={`agrid__mark${m.amber ? ' agrid__mark--amber' : ''}`}
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* Location and current community affiliation. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">Based in</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark agrid__cell-mark--plain">
                <ShieldCheck size={18} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Reserve Command Philippine Army</span>
                <span className="agrid__cell-meta">GMA Instructor</span>
              </span>
            </span>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src={profile.avatarSrc}
            alt={profile.hero.portraitAlt}
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
