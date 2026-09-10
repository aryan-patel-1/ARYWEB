import Image from "next/image";
import { ArrowIcon } from "@/components/icons";
import { projects } from "@/lib/site";

export function Projects() {
  return (
    <section className="projects section section-space" id="realisations" aria-labelledby="projects-title">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">Réalisations sélectionnées</p>
          <h1 id="projects-title">Des projets réels, pensés pour des usages concrets.</h1>
        </div>
        <p>
          Voici une sélection de sites auxquels j’ai contribué avec l’agence Patecode,
          ainsi qu’un projet personnel réalisé pendant mes études.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <a
            className="project-card"
            href={project.url}
            key={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Voir ${project.title} — ouverture dans un nouvel onglet`}
            data-reveal
            data-reveal-delay={(index % 2) + 1}
          >
            <div className="project-preview">
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={project.imageWidth}
                height={project.imageHeight}
                sizes="(max-width: 820px) calc(100vw - 24px), (max-width: 1220px) calc(50vw - 30px), 580px"
              />
              <span>{project.credit}</span>
            </div>
            <div className="project-body">
              <div className="project-meta">
                <span>{project.number}</span>
                <small>{project.category}</small>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span className="project-link">Voir le site <ArrowIcon /></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
