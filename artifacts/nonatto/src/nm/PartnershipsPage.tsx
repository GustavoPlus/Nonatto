export function PartnershipsPage() {
  const pts = [
    ['Jantares corporativos', 'Para empresas que recebem equipes, clientes e convidados.'],
    ['Eventos', 'Encontros e ocasiões empresariais com uma mesa à altura.'],
    ['Festas', 'Celebrações privadas, do íntimo ao mais animado.'],
    ['Cerimônias', 'Momentos marcantes que merecem atenção a cada detalhe.'],
  ];
  return (
    <main className="nm-page nm-wrap">
      <div className="nm-kicker">Parcerias</div>
      <h1 className="nm-serif">Abertos a parcerias.</h1>
      <p className="nm-lead">O Nonatto está aberto a empresas interessadas em jantares corporativos, eventos, festas e cerimônias.</p>
      <div className="nm-points">{pts.map(([t, d]) => <div className="nm-point" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
    </main>
  );
}
