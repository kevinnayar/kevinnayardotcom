import Image from 'next/image'
import { ProjectType } from '../../types/typeDefs'

const ProjectList = ({ projects }: { projects: ProjectType[] }) => (
  <div className="project-list">
    {projects.map(({ title, content, link, tags }) => (
      <a
        key={title}
        className="project-list__item"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        <h3 className="project-list__title gradient-text">{title}</h3>
        <div className="project-list__content">
          <Image className="project-list__image" src={`/images/${title}.png`} alt={title} width={382} height={382} />
          <div className="project-list__text-content">
            <p className="project-list__text">{content}</p>
            <div className="project-list__tags">
              {tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      </a>
    ))}
  </div>
)

export default ProjectList