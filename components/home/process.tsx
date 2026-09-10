import Link from "next/link";
import { ArrowIcon, CodeIcon, CompassIcon, MessageIcon, RocketIcon } from "@/components/icons";
import { processSteps } from "@/lib/site";

const stepIcons = [MessageIcon, CompassIcon, CodeIcon, RocketIcon];

export function Process() {
  return (
    <section className="process section section-space" id="methode" aria-labelledby="process-title">
      <div className="section-heading process-heading" data-reveal>
        <div>
          <p className="eyebrow">Comment ça se passe</p>
          <h1 id="process-title">Quatre étapes. Vous savez toujours où on en est.</h1>
        </div>
        <p>
          Je vous indique ce que je prépare, ce que j’attends de vous et ce que l’on
          valide avant de continuer.
        </p>
      </div>

      <ol className="process-list">
        {processSteps.map((step, index) => {
          const Icon = stepIcons[index];
          return (
            <li key={step.number} data-reveal data-reveal-delay={index + 1}>
              <div className="process-icon"><Icon /></div>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          );
        })}
      </ol>

      <div className="inline-cta" data-reveal>
        <p><strong>Vous avez déjà un site, des textes ou une maquette ?</strong> Envoyez-les-moi, je pars de là.</p>
        <Link href="/contact" prefetch={false}>Me montrer l’existant <ArrowIcon /></Link>
      </div>
    </section>
  );
}
