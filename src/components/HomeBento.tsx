import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Stack,
  Globe,
  PaintBrush,
  FilmSlate,
} from '@/components/slab'
import { profile } from '@/data/profile'
import { portfolioProjects } from '@/data/portfolio-projects'

/**
 * Home's desktop showcase: project previews, about, credentials, and services.
 * Project previews come from the same data as the Projects page.
 */

const HOME_PROJECT_LIMIT = 2

const OFFERS = [
  { Icon: Globe, title: 'Frontend Development', note: 'Responsive, user-focused interfaces' },
  { Icon: Stack, title: 'Full Stack Development', note: 'Complete web apps and systems' },
  { Icon: PaintBrush, title: 'Graphic Design', note: 'Visual assets for digital projects' },
  { Icon: FilmSlate, title: 'Video Editing', note: 'Polished edits for online content' },
] as const

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc?: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      {desc && <p className="bento__desc">{desc}</p>}
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}
export default function HomeBento() {
  return (
    <nav className="bento" aria-label="Explore the portfolio">
      <section className="bento__card bento__card--projects" aria-labelledby="home-projects-title">
        <header className="bento__projects-head">
          <span className="bento__label">
            <span className="bento__icon"><FolderOpen size={20} weight="fill" aria-hidden="true" /></span>
            <h3 className="bento__title" id="home-projects-title">Projects</h3>
          </span>
          <Link className="bento__projects-all" to="/projects">
            View all projects
            <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </Link>
          <p className="bento__desc">Practical web systems I've built to automate repetitive work, simplify daily tasks, and help people get more done.</p>
        </header>
        <div className="bento__project-list">
          {portfolioProjects.slice(0, HOME_PROJECT_LIMIT).map((project) => (
            <Link key={project.id} to="/projects" className="bento__project-preview">
              <span className="bento__project-image">
                <img src={project.image} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="bento__project-caption">
                <span className="bento__project-copy">
                  <span className="bento__project-name">{project.name}</span>
                </span>
                <span className="bento__project-arrow" aria-hidden="true">
                  <ArrowUpRight size={15} weight="bold" />
                </span>
              </span>
            </Link>
          ))}
          {portfolioProjects.length === 0 && Array.from({ length: HOME_PROJECT_LIMIT }, (_, index) => (
            <span key={index} className="bento__project-preview bento__project-preview--empty" aria-hidden="true">
              <span className="bento__project-image" />
            </span>
          ))}
        </div>
      </section>

      {/* About: a portrait beside a short introduction. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" />
        <div className="bento__about">
          <img
            className="bento__about-image"
            src={profile.avatarSrc}
            alt={profile.hero.portraitAlt}
            loading="lazy"
            decoding="async"
          />
          <p className="bento__about-copy">{profile.hero.body}</p>
        </div>
      </Link>

      {/* Services: the five offers as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="PLACEHOLDER - what you offer, and to whom." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>
    </nav>
  )
}
