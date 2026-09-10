import { ContactForm } from "@/components/contact-form";
import { MailIcon, MapPinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export function Contact() {
  return (
    <section className="contact section section-space" id="contact" aria-labelledby="contact-title">
      <div className="contact-intro" data-reveal>
        <p className="eyebrow">On en parle ?</p>
        <h1 id="contact-title">Votre projet peut commencer par une simple idée.</h1>
        <p>
          Dites-moi ce que vous faites, où vous en êtes aujourd’hui et ce que vous
          aimeriez obtenir. Je vous réponds par e-mail pour organiser la suite.
        </p>

        <div className="contact-details">
          <a href={`mailto:${siteConfig.email}`}>
            <span><MailIcon /></span>
            <div><small>E-MAIL</small><strong>{siteConfig.email}</strong></div>
          </a>
          <div>
            <span><MapPinIcon /></span>
            <div><small>LOCALISATION</small><strong>{siteConfig.location}</strong></div>
          </div>
        </div>

        <p className="contact-note">
          Votre message reste confidentiel et sert uniquement à répondre à votre demande.
        </p>
      </div>

      <div data-reveal data-reveal-delay="1"><ContactForm contactEmail={siteConfig.email} /></div>
    </section>
  );
}
