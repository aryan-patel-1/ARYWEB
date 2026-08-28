import { CheckIcon } from "@/components/icons";

export function About() {
  return (
    <section className="about section section-space" id="a-propos" aria-labelledby="about-title">
      <div className="about-visual" data-reveal>
        <div className="about-manifesto">
          <div className="manifesto-meta"><span>NOTE N° 01</span><span>ARYWEB / STUDIO WEB</span></div>
          <p className="manifesto-small">Mon principe de travail</p>
          <p className="manifesto-title">MOINS DE<br />BLABLA.</p>
          <p className="manifesto-title manifesto-title-blue">PLUS DE<br />CONCRET.</p>
        </div>
        <span className="paper-tape" aria-hidden="true" />
      </div>

      <div className="about-copy" data-reveal data-reveal-delay="1">
        <p className="eyebrow">Ma façon de travailler</p>
        <h2 id="about-title">Vous échangez directement avec moi, du premier message à la mise en ligne.</h2>
        <p className="about-lead">
          Je développe AryWeb en parallèle de mes études. Cette organisation légère me
          permet de proposer des tarifs accessibles et de rester votre interlocuteur direct.
        </p>
        <p>
          Je m’occupe de la structure, du design et du développement. Si votre budget ne
          permet pas de tout faire immédiatement, on commence par l’essentiel et on garde une suite possible.
        </p>
        <ul className="about-points">
          <li><CheckIcon /><span>Je réponds avec <strong>des mots compréhensibles.</strong></span></li>
          <li><CheckIcon /><span>Vous validez <strong>les étapes importantes.</strong></span></li>
          <li><CheckIcon /><span>Vous savez <strong>ce qui est compris dans le projet.</strong></span></li>
        </ul>
      </div>
    </section>
  );
}
