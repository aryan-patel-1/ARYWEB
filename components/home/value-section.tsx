const deliverables = [
  {
    title: "Des pages organisées autour de vos contenus",
    text: "Chaque page a une raison d’être et guide le visiteur vers la suivante.",
  },
  {
    title: "Une version mobile vérifiée",
    text: "Les contenus, boutons et formulaires sont contrôlés sur les petits écrans.",
  },
  {
    title: "Les réglages essentiels",
    text: "Titres, descriptions et aperçus de partage sont préparés pour la mise en ligne.",
  },
  {
    title: "Des actions faciles à repérer",
    text: "Contacter, réserver ou acheter : la prochaine étape reste visible et compréhensible.",
  },
];

export function ValueSection() {
  return (
    <section className="value-section section section-space" aria-labelledby="value-title">
      <div className="value-intro" data-reveal>
        <p className="eyebrow">Exemples de livrables</p>
        <h2 id="value-title">Ce qui rend le site utilisable au quotidien.</h2>
        <p>
          Le design attire l’œil. La structure, les mots et les détails techniques
          font le reste du travail.
        </p>
        <a className="text-link" href="#contact">Faire le point sur mon besoin <span aria-hidden="true">↗</span></a>
      </div>

      <div className="delivery-sheet" data-reveal data-reveal-delay="1">
        <div className="delivery-sheet-head">
          <span>ARYWEB / LIVRABLES</span>
          <span>INCLUS SELON LE PROJET</span>
        </div>
        <div className="delivery-list">
          {deliverables.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
        <div className="delivery-stamp" aria-hidden="true">VÉRIFIÉ<br />AVANT MISE<br />EN LIGNE</div>
      </div>
    </section>
  );
}
