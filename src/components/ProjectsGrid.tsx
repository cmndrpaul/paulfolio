import { ArrowUpRight } from '@/components/slab'
import { portfolioProjects, type PortfolioProject } from '@/data/portfolio-projects'

function ProjectCard({ project }: { project: PortfolioProject }) {
  const visitLabel = <>Visit <ArrowUpRight size={15} aria-hidden="true" /></>

  return (
    <article className="project-card" aria-labelledby={project.id + '-title'}>
      <div className="project-card__preview" data-fit={project.previewFit}>
        <img src={project.image} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="project-card__body">
        <p className="project-card__category">{project.category}</p>
        <h3 id={project.id + '-title'}>{project.name}</h3>
        <p className="project-card__description">{project.description}</p>
        <ul className="project-card__technologies" role="list" aria-label="Technologies">
          {project.technologies.map((technology) => (
            <li className="project-card__tech" key={technology}>{technology}</li>
          ))}
        </ul>
        {project.websiteUrl ? (
          <a className="project-card__action" href={project.websiteUrl} aria-label={`Visit ${project.name}`}>
            {visitLabel}
          </a>
        ) : (
          <button className="project-card__action" type="button" disabled aria-label={`Visit ${project.name} (link unavailable)`}>
            {visitLabel}
          </button>
        )}
      </div>
    </article>
  )
}

export default function ProjectsGrid() {
  return (
    <section className="portfolio-section" id="projects" aria-labelledby="projects-title" tabIndex={-1}>
      <header className="portfolio-heading">
        <h2 id="projects-title">Projects</h2>
        <p>Web apps, interfaces, and tools I’ve built.</p>
      </header>
      <div className="project-cards">
        {portfolioProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  )
}
