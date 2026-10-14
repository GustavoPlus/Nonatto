export function PartnershipsPage() {
  const pts = [
    ['Empresas', 'Jantares corporativos, eventos e experiências para equipes e clientes.'],
    ['Investidores', 'Conversas com quem acredita no potencial de gastronomia e hospitalidade.'],
    ['Sócios', 'Abertos a conhecer pessoas alinhadas à visão e ao crescimento do Nonatto.'],
    ['Eventos privados', 'Festas e cerimônias planejadas com curadoria e atenção aos detalhes.'],
  ];
  return (
    <main className="nm-page nm-wrap">
      <div className="nm-kicker">Parcerias</div>
      <h1 className="nm-serif">Boas conexões, à mesa.</h1>
      <p className="nm-lead">Estamos abertos a parcerias com empresas, investidores e novos sócios para desenvolver o Nonatto e criar experiências memoráveis.</p>
      <div className="nm-points">{pts.map(([t, d]) => <div className="nm-point" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
      <a
        className="nm-founder-whatsapp"
        href="https://wa.me/5584994106895?text=Tenho%20interesse%20em%20conversar%20sobre%20parcerias%20com%20o%20Nonatto."
        target="_blank"
        rel="noopener noreferrer"
        data-testid="link-partnership-whatsapp"
      >
        Conversar sobre uma parceria ↗
      </a>
    </main>
  );
}
