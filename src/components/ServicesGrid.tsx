import { CheckCircle } from '@/components/slab'

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Understand',
    body: 'We clarify your goals, audience, and what the project needs to achieve.',
  },
  {
    index: '02',
    label: 'Create',
    body: 'I design and build a solution around the brief, with your feedback along the way.',
  },
  {
    index: '03',
    label: 'Deliver',
    body: 'We polish the final work and prepare it for launch or handoff.',
  },
]

/* ---------- The services ---------- */

type Service = {
  title: string
  description: string
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    title: 'Websites',
    description: 'Responsive, accessible interfaces that look right and work smoothly on every screen.',
    bullets: ['Responsive layouts', 'Reusable components', 'Accessible interactions'],
  },
  {
    title: 'Web Applications',
    description: 'Complete web applications, from the user interface through the backend and database.',
    bullets: ['Frontend and backend integration', 'Database-driven features', 'Deployment-ready builds'],
  },
  {
    title: 'Graphic Design',
    description: 'Clear, consistent visuals for digital products, brands, and online content.',
    bullets: ['Social media graphics', 'Web and app assets', 'Consistent brand styling'],
  },
  {
    title: 'Video Editing',
    description: 'Engaging video edits shaped for your platform, audience, and message.',
    bullets: ['Clean cuts and pacing', 'Titles and captions', 'Audio and color polish'],
  },
]


export default function ServicesGrid() {
  return (
    <section className="portfolio-section" id="services" aria-labelledby="services-title" tabIndex={-1}>
      <header className="portfolio-heading">
        <h2 id="services-title">Services</h2>
        <p>Web development, graphic design, and video editing.</p>
      </header>
      <ul className="portfolio-service-cards" role="list">
        {SERVICES.map(({ title, description, bullets }) => (
          <li className="portfolio-service-card" key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
            <ul role="list">
              {bullets.map((bullet) => (
                <li key={bullet}><CheckCircle size={17} aria-hidden="true" />{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <section className="portfolio-process" aria-labelledby="process-title">
        <h3 id="process-title">How I work</h3>
        <ol role="list">
          {STAGES.map(({ index, label, body }) => (
            <li key={index}><h4>{label}</h4><p>{body}</p></li>
          ))}
        </ol>
      </section>
    </section>
  )
}
