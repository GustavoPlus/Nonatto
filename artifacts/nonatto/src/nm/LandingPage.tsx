import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import './LandingPage.css';

const principles = [
  {
    number: '01',
    title: 'Escolha com critério',
    text: 'Uma seleção pequena, feita para quem sabe que bons momentos não precisam de excesso.',
  },
  {
    number: '02',
    title: 'O prato em primeiro lugar',
    text: 'Cozinhas de personalidade, receitas bem pensadas e ingredientes que têm o seu lugar.',
  },
  {
    number: '03',
    title: 'No seu tempo',
    text: 'Uma boa refeição merece chegar à mesa sem pedir que a noite mude de ritmo.',
  },
];

export function LandingPage() {
  return (
    <main className="n-landing">
      <section className="n-hero" aria-labelledby="n-hero-title">
        <div className="n-hero-inner">
          <div className="n-hero-copy">
            <p className="n-eyebrow"><span className="n-dot" /> Uma seleção para quem aprecia</p>
            <h1 id="n-hero-title">A noite pede<br />algo <span>especial.</span></h1>
            <p className="n-hero-intro">
              Comida escolhida com cuidado. Um convite a aproveitar melhor o momento, à mesa ou onde você estiver.
            </p>
            <Link href="/pedir" className="n-button">
              Descubra a seleção <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <div className="n-hero-foot">
              <span>Natal, Rio Grande do Norte</span>
              <span className="n-foot-rule" aria-hidden="true" />
              <span>Curadoria Nonatto</span>
            </div>
          </div>
          <figure className="n-hero-image">
            <img src="/hero-prato.jpg" alt="Prato cuidadosamente apresentado com vieira dourada, folhas frescas e molho verde" />
            <figcaption><span>01 / 03</span><span>O prazer está nos detalhes</span></figcaption>
            <span className="n-image-stamp" aria-hidden="true">N.</span>
          </figure>
        </div>
        <a className="n-scroll-cue" href="#manifesto">
          <span>Uma outra forma de escolher</span><ArrowDown aria-hidden="true" size={14} />
        </a>
      </section>

      <section className="n-manifesto" id="manifesto" aria-labelledby="n-manifesto-title">
        <div className="n-section-index"><span>01</span><span className="n-index-line" /> A ideia</div>
        <div className="n-manifesto-main">
          <h2 id="n-manifesto-title">Menos opções.<br /><span>Mais intenção.</span></h2>
          <div className="n-manifesto-aside">
            <p>O Nonatto acredita que pedir bem começa antes da primeira garfada. Começa por saber escolher.</p>
            <Link href="/sobre-nos" className="n-text-link">Conheça o Nonatto <ArrowUpRight aria-hidden="true" size={15} /></Link>
          </div>
        </div>
        <div className="n-rule" />
        <p className="n-manifesto-note">Uma seleção que deixa espaço para o que importa: a conversa, a pausa, o sabor.</p>
      </section>

      <section className="n-table" aria-labelledby="n-table-title">
        <div className="n-table-image">
          <img src="/massa-prato.jpg" alt="Massa fresca com lascas de queijo e ervas servida em prato artesanal" loading="lazy" />
          <span className="n-photo-index">NA MESA <span>—</span> 02</span>
        </div>
        <div className="n-table-copy">
          <p className="n-eyebrow">Um convite, não uma lista</p>
          <h2 id="n-table-title">Para a mesa<br />que você <span>imagina.</span></h2>
          <p>Um jantar sem pressa. Um almoço que vira encontro. Ou simplesmente o prazer de comer algo muito bom, hoje.</p>
          <Link href="/pedir" className="n-text-link">Ver o que está à mesa <ArrowUpRight aria-hidden="true" size={15} /></Link>
        </div>
      </section>

      <section className="n-principles" aria-labelledby="n-principles-title">
        <div className="n-principles-heading">
          <div className="n-section-index"><span>02</span><span className="n-index-line" /> O cuidado</div>
          <h2 id="n-principles-title">A diferença<br />está no <span>detalhe.</span></h2>
        </div>
        <div className="n-principles-list">
          {principles.map((item) => (
            <article className="n-principle" key={item.number}>
              <span className="n-principle-number">{item.number}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
              <span className="n-principle-mark" aria-hidden="true">+</span>
            </article>
          ))}
        </div>
      </section>

      <section className="n-last-call" aria-labelledby="n-last-title">
        <div className="n-last-copy">
          <p className="n-eyebrow">A mesa está posta</p>
          <h2 id="n-last-title">Escolha com<br />mais <span>calma.</span></h2>
          <Link href="/pedir" className="n-button n-button-light">Explore a seleção <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
        <div className="n-last-aside">
          <span className="n-last-mark" aria-hidden="true">N</span>
          <p>Nonatto<br />Comer bem é um jeito de estar.</p>
        </div>
      </section>
    </main>
  );
}
