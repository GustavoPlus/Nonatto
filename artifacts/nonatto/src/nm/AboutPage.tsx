export function AboutPage() {
  const pts = [
    ['Natal, RN, 2026', 'O Nonatto nasceu em Natal, no Rio Grande do Norte, em 2026.'],
    ['Qualidade antes de quantidade', 'Uma seleção curta, escolhida com critério. Preferimos fazer menos e fazer bem.'],
    ['Carros híbridos e elétricos', 'Nossa operação usa, em sua maioria, carros e SUVs híbridos ou elétricos, para reduzir a emissão de carbono.'],
    ['Motoristas qualificados', 'Motoristas treinados e qualificados, atentos às necessidades de cada cliente.'],
  ];
  return (
    <main className="nm-page nm-wrap">
      <div className="nm-kicker">Sobre nós</div>
      <h1 className="nm-serif">Menos, e melhor.</h1>
      <p className="nm-lead">O Nonatto é um aplicativo de delivery com curadoria, pensado para quem valoriza a qualidade acima da quantidade. Da seleção das cozinhas ao cuidado na entrega, cada escolha tem uma intenção.</p>
      <div className="nm-points">{pts.map(([t, d]) => <div className="nm-point" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
    </main>
  );
}
