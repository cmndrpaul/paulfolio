import { portfolioProjects } from '@/data/portfolio-projects'

function ProjectCard({ project }: { project: (typeof portfolioProjects)[number] }) {
  const content = (
    <>
      <span className="pgrid__project-image">
        <img src={project.image} alt={`${project.name} preview`} loading="lazy" decoding="async" />
      </span>
      <span className="pgrid__project-name">{project.name}</span>
    </>
  )

  if (!project.websiteUrl) {
    return <div className="pgrid__project pgrid__project--static">{content}</div>
  }

  return (
    <a className="pgrid__project" href={project.websiteUrl} target="_blank" rel="noreferrer">
      {content}
    </a>
  )
}

export default function ProjectsGrid() {
  return (
    <section className="pgrid pgrid--portfolio" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Selected Work</span>
        <h1 className="pgrid__title" id="projects-title">Projects built with purpose.</h1>
        <p className="pgrid__lede">A selection of digital products and systems designed to solve practical problems.</p>
      </header>

      <div className="home__glass pgrid__glass">
        <div className="pgrid__cards">
          {portfolioProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  )
}
