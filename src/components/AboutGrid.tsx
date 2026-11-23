import ToolLogos, { backendTools, designTools, editingTools, frontendTools } from '@/components/ToolLogos'
import { profile } from '@/data/profile'

const capabilities = [
  { title: 'Front-End Developer', tools: frontendTools },
  { title: 'Full-Stack Developer', tools: backendTools },
  { title: 'Graphic Designer', tools: designTools },
  { title: 'Video Editor', tools: editingTools },
]

export default function AboutGrid() {
  return (
    <section className="portfolio-section portfolio-about" id="about" aria-labelledby="about-title" tabIndex={-1}>
      <div className="portfolio-about__bio">
        <img className="portfolio-about__portrait" src={profile.hero.portraitSrc}
          alt={profile.hero.portraitAlt} width="400" height="400" loading="lazy" decoding="async" />
        <h2 id="about-title">Hi, I’m <strong>{profile.firstName}.</strong></h2>
        <p className="portfolio-about__lead">I build digital experiences, from responsive websites and full-stack applications to graphics and video.</p>
        <p className="portfolio-about__note">I’m based in {profile.location}, and I build through personal projects and community work.</p>
      </div>
      <ol className="portfolio-about__roles" role="list">
        {capabilities.map(({ title, tools }, index) => (
          <li key={title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{title}</h3>
              <ToolLogos items={tools} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
