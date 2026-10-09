import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Minus, Plus, ShoppingBag, X } from 'lucide-react';

type Dish = { id: number; name: string; description: string; price: number; category: string; note?: string; image?: string };
type CartItem = { dish: Dish; quantity: number };

const categories = ['Tudo', 'Para começar', 'Pratos', 'Doces', 'Vinhos'];
const dishes: Dish[] = [
  { id: 1, name: 'Vieiras, cítrico & ervas', description: 'Vieiras seladas, óleo verde de coentro, ponzu de limão-cravo e folhas miúdas.', price: 68, category: 'Para começar', note: 'A escolha da casa', image: '/hero-prato.jpg' },
  { id: 2, name: 'Ravioli de ricota de búfala', description: 'Massa fresca, manteiga noisette, sálvia crocante e pecorino envelhecido.', price: 94, category: 'Pratos', note: 'Feito à mão' },
  { id: 3, name: 'Arroz de pato, ao próprio tempo', description: 'Pato confitado por 12 horas, arroz vermelho, linguiça artesanal e laranja amarga.', price: 112, category: 'Pratos' },
  { id: 4, name: 'Peixe do dia, brasa & maré', description: 'Pesca responsável na brasa, purê de couve-flor tostada e caldo de mariscos.', price: 126, category: 'Pratos' },
  { id: 5, name: 'Massa fresca, limão & manteiga', description: 'Tagliatelle de ovos caipiras, manteiga de cultura, limão siciliano e parmesão.', price: 88, category: 'Pratos', image: '/massa-prato.jpg' },
  { id: 6, name: 'Tartelete de chocolate 70%', description: 'Chocolate brasileiro de origem única, creme leve de cumaru e flor de sal.', price: 42, category: 'Doces' },
  { id: 7, name: 'Pera, mel & creme cru', description: 'Pera assada lentamente, mel de abelhas nativas e creme fresco batido.', price: 38, category: 'Doces' },
  { id: 8, name: 'Pinot Noir, Vale dos Vinhedos', description: 'Elegante, fruta vermelha fresca e final delicadamente especiado · 750 ml.', price: 189, category: 'Vinhos' },
  { id: 9, name: 'Espumante nature, Serra Gaúcha', description: 'Bolhas finas, maçã verde e mineralidade. Um começo sem cerimônia · 750 ml.', price: 164, category: 'Vinhos' },
];
const formatPrice = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  useEffect(() => {
    const node = document.querySelectorAll<HTMLElement>('.scroll-reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    node.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <div className={`scroll-reveal ${className}`}>{children}</div>;
}

function App() {
  const [category, setCategory] = useState('Tudo');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const filteredDishes = useMemo(() => category === 'Tudo' ? dishes : dishes.filter(d => d.category === category), [category]);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.quantity * item.dish.price, 0);

  const add = (dish: Dish) => {
    setCart(current => {
      const found = current.find(item => item.dish.id === dish.id);
      return found ? current.map(item => item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { dish, quantity: 1 }];
    });
    setNotice(`${dish.name} adicionado à sua seleção`);
    window.setTimeout(() => setNotice(''), 2400);
  };
  const changeQuantity = (dishId: number, amount: number) => {
    setCart(current => current.map(item => item.dish.id === dishId ? { ...item, quantity: item.quantity + amount } : item).filter(item => item.quantity > 0));
  };
  const scrollToMenu = () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="noise min-h-[100dvh] overflow-hidden">
      <div className="bg-[#20392e] text-[#f4efe4] text-center px-4 py-[9px] text-[9px] tracking-[.17em] uppercase">
        Uma seleção pequena. Uma noite que fica.
      </div>
      <header className="shell flex h-[82px] items-center justify-between border-b border-[#d8d1c4]">
        <a href="#top" aria-label="Nonatto, início" className="serif text-[31px] tracking-[-.065em] leading-none">nonatto<span className="text-[#bd7058]">.</span></a>
        <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[.12em] uppercase">
          <a href="#manifesto" className="hover:text-[#bd7058] transition-colors">Manifesto</a>
          <a href="#menu" className="hover:text-[#bd7058] transition-colors">Menu</a>
          <a href="#ritual" className="hover:text-[#bd7058] transition-colors">O nosso cuidado</a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-[10px] tracking-[.09em] text-[#647068]">Delivery com curadoria</span>
          <button aria-label={`Abrir sacola, ${count} itens`} onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 border border-[#c9c1b3] px-3 py-2 text-[10px] tracking-[.08em] hover:bg-[#20392e] hover:text-[#f4efe4] transition-colors">
            <ShoppingBag size={15} strokeWidth={1.5} /> <span className="hidden sm:inline">SUA SELEÇÃO</span>
            <span className="min-w-4 text-center">{count}</span>
          </button>
          <button className="md:hidden p-2" aria-label="Abrir navegação" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={19} /> : <span className="text-[10px] tracking-widest">MENU</span>}</button>
        </div>
      </header>
      {mobileMenu && <nav className="md:hidden flex flex-col gap-4 px-6 py-5 bg-[#e9e3d8] text-[11px] uppercase tracking-[.15em]"><a onClick={() => setMobileMenu(false)} href="#manifesto">Manifesto</a><a onClick={() => setMobileMenu(false)} href="#menu">Menu</a><a onClick={() => setMobileMenu(false)} href="#ritual">O nosso cuidado</a></nav>}

      <section id="top" className="shell relative grid min-h-[650px] grid-cols-1 items-center gap-8 py-16 md:min-h-[690px] md:grid-cols-[.92fr_1.08fr] md:py-12">
        <div className="relative z-10 pt-3 md:pr-0">
          <div className="eyebrow reveal text-[#bd7058]">Curadoria para comer melhor</div>
          <h1 className="serif reveal reveal-delay mt-7 max-w-[630px] text-[clamp(54px,7vw,100px)] leading-[.98] tracking-[-.065em]">
            O raro<br />também pode<br /><em className="text-[#bd7058]">chegar.</em>
          </h1>
          <p className="reveal reveal-late mt-7 max-w-[390px] text-[14px] leading-[1.8] text-[#58645b]">
            Bons ingredientes, mãos inquietas e o tempo certo. Uma seleção para quem sabe que jantar não precisa ser só jantar.
          </p>
          <div className="reveal reveal-late mt-9 flex items-center gap-6">
            <button onClick={scrollToMenu} className="group flex items-center gap-5 bg-[#20392e] px-6 py-[17px] text-[10px] tracking-[.16em] text-[#f4efe4] uppercase transition-colors hover:bg-[#bd7058]">
              Conheça a seleção <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <span className="hidden sm:block text-[10px] tracking-[.08em] text-[#6f776e]">Escolhida a dedo, todos os dias</span>
          </div>
          <div className="mt-16 hidden md:flex items-center gap-4 text-[9px] tracking-[.15em] uppercase text-[#737a71]"><span className="h-px w-12 bg-[#bd7058]" /> Desça sem pressa <ArrowDown size={12} /></div>
        </div>
        <div className="relative md:absolute md:right-0 md:top-10 md:h-[590px] md:w-[54%]">
          <div className="relative h-[390px] overflow-hidden md:h-full">
            <img src="/hero-prato.jpg" alt="Vieiras seladas com ervas e cítricos em prato artesanal" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18291f]/30 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-[-18px] left-[-20px] hidden w-[210px] border border-[#e1d9cb] bg-[#f3efe6] p-5 md:block">
            <span className="eyebrow text-[#bd7058]">01 / 09</span>
            <p className="serif mt-3 text-[19px] leading-tight">Vieiras, cítrico<br />& ervas</p>
            <p className="mt-3 text-[10px] tracking-wide text-[#778077]">A escolha da casa</p>
          </div>
            <div className="absolute right-4 top-4 border border-white/60 px-3 py-2 text-[9px] tracking-[.15em] text-white uppercase">Seleção de hoje · 09</div>
        </div>
      </section>

      <section className="border-y border-[#d8d1c4] bg-[#eae5da]">
        <div className="shell grid grid-cols-2 gap-y-7 py-8 md:grid-cols-4 md:py-10">
          {[['01', 'Poucos, excelentes'], ['02', 'Feito por gente de verdade'], ['03', 'Origem que importa'], ['04', 'À sua porta, com cuidado']].map(([n, label]) => (
            <div key={n} className="flex items-center gap-3 md:justify-center"><span className="serif text-[20px] italic text-[#bd7058]">{n}</span><span className="text-[9px] tracking-[.13em] uppercase text-[#46544b]">{label}</span></div>
          ))}
        </div>
      </section>

      <section id="manifesto" className="shell grid gap-10 py-24 md:grid-cols-[.7fr_1.3fr] md:py-32">
        <Reveal><div className="eyebrow text-[#bd7058]">Um ponto de vista</div><p className="serif mt-5 text-[30px] leading-[1.2] tracking-[-.03em] md:text-[40px]">Não é sobre ter mais.<br /><em>É sobre escolher melhor.</em></p></Reveal>
        <Reveal className="md:pt-12"><p className="max-w-[610px] text-[15px] leading-[1.9] text-[#546057]">Acreditamos na mesa como lugar de descoberta. Por isso, não reunimos tudo para todos. Reunimos o que merece ser provado: cozinhas autorais, produtores cuidadosos e sabores com alguma coisa a dizer.</p><p className="mt-5 max-w-[580px] text-[15px] leading-[1.9] text-[#546057]">O cardápio muda com a estação, com a pesca, com a vontade de quem cozinha. A seleção é curta por escolha. O prazer, nunca.</p></Reveal>
      </section>

      <section id="menu" className="bg-[#20392e] text-[#f4efe4]">
        <div className="shell py-20 md:py-24">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div><div className="eyebrow text-[#d58c72]">Para esta noite</div><h2 className="serif mt-4 text-[48px] leading-[1.02] tracking-[-.055em] md:text-[68px]">A seleção <em>Nonatto.</em></h2></div>
            <p className="max-w-[290px] pb-1 text-[12px] leading-[1.7] text-[#c7cfc4]">Poucas coisas, no seu melhor momento. Escolha com calma; nós cuidamos do resto.</p>
          </div>
          <div className="mt-10 flex gap-2 overflow-x-auto border-b border-white/20 pb-4" role="tablist" aria-label="Categorias do menu">
            {categories.map(item => <button key={item} role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={`pill whitespace-nowrap border px-4 py-[10px] text-[9px] tracking-[.14em] uppercase ${category === item ? 'border-[#d58c72] bg-[#d58c72] text-[#20392e]' : 'border-white/25 text-[#e8e5db] hover:border-white/70'}`}>{item}</button>)}
            <span className="ml-auto hidden self-center text-[9px] tracking-[.12em] text-[#aebbb0] uppercase md:block">Curadoria para a sua mesa</span>
          </div>
          <div className="grid gap-x-8 gap-y-0 pt-2 md:grid-cols-2">
            {filteredDishes.map(dish => (
              <article key={dish.id} className={`menu-card flex gap-4 border-b border-white/15 py-6 ${dish.image ? 'min-h-[154px]' : 'min-h-[132px]'}`}>
                {dish.image && <div className="h-[104px] w-[104px] shrink-0 overflow-hidden bg-[#395146]"><img className="menu-photo h-full w-full object-cover" src={dish.image} alt="" /></div>}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-3">
                    <div><div className="flex items-center gap-2"><h3 className="serif text-[19px] leading-[1.25]">{dish.name}</h3>{dish.note && <span className="hidden border border-[#d58c72]/70 px-2 py-1 text-[8px] tracking-[.1em] text-[#e5a58d] uppercase sm:inline">{dish.note}</span>}</div><p className="mt-2 max-w-[360px] text-[11px] leading-[1.6] text-[#bbc6bb]">{dish.description}</p></div>
                    <span className="shrink-0 pt-1 text-[12px] tabular-nums">{formatPrice(dish.price)}</span>
                  </div>
                  <div className="mt-3 flex justify-end"><button onClick={() => add(dish)} className="flex items-center gap-2 text-[9px] tracking-[.13em] uppercase text-[#e2a58d] hover:text-white transition-colors"><Plus size={14} /> Adicionar</button></div>
                </div>
              </article>
            ))}
            {filteredDishes.length === 0 && <p className="py-10 text-sm text-[#c7cfc4]">Esta seleção está em preparo. Volte em instantes.</p>}
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-7 sm:flex-row sm:items-center">
            <p className="text-[10px] tracking-wide text-[#c1ccc1]">Ingredientes e disponibilidade variam com a estação.</p>
            <button onClick={() => setCartOpen(true)} className="flex items-center gap-3 text-[10px] tracking-[.14em] uppercase hover:text-[#e3a189]">{count > 0 ? `Ver seleção · ${count} ${count === 1 ? 'item' : 'itens'}` : 'Abrir sua seleção'} <ArrowRight size={14} /></button>
          </div>
        </div>
      </section>

      <section id="ritual" className="shell grid items-center gap-12 py-24 md:grid-cols-[1.02fr_.98fr] md:py-32">
        <Reveal className="relative">
          <div className="serif relative min-h-[330px] overflow-hidden bg-[#d7d1c3] px-8 py-10 md:min-h-[405px] md:px-12">
            <div className="absolute right-[-55px] top-[-45px] h-[300px] w-[300px] rounded-full border border-[#20392e]/20" />
            <div className="absolute right-[-12px] top-[-4px] h-[220px] w-[220px] rounded-full border border-[#20392e]/20" />
            <div className="relative max-w-[330px] pt-10"><span className="eyebrow not-italic text-[#bd7058]">Origem · cuidado · detalhe</span><p className="mt-8 text-[40px] leading-[1.04] tracking-[-.05em] md:text-[52px]">Cada escolha<br />tem um <em>porquê.</em></p><div className="mt-8 h-px w-14 bg-[#bd7058]" /><p className="mt-4 font-sans text-[11px] leading-[1.7] text-[#526056]">Uma seleção feita com intenção, nunca por acaso.</p></div>
            <div className="absolute bottom-8 right-9 text-[9px] tracking-[.17em] uppercase text-[#526056]">Caderno de curadoria — 01</div>
          </div>
        </Reveal>
        <Reveal><div className="eyebrow text-[#bd7058]">O nosso cuidado</div><h2 className="serif mt-5 text-[43px] leading-[1.06] tracking-[-.05em] md:text-[58px]">A cozinha é de quem faz.<br /><em>A curadoria, nossa.</em></h2><p className="mt-7 max-w-[440px] text-[14px] leading-[1.9] text-[#58645b]">Trabalhamos perto de cozinhas que respeitam o ingrediente e não apressam o processo. Cada prato chega como deveria ser servido: protegido, no ponto, sem ruído entre a origem e a sua mesa.</p><a href="#menu" className="mt-8 inline-flex items-center gap-3 border-b border-[#20392e] pb-2 text-[10px] tracking-[.14em] uppercase hover:text-[#bd7058] hover:border-[#bd7058] transition-colors">Conheça quem cozinha <ArrowUpRight size={14} /></a></Reveal>
      </section>

      <section className="bg-[#d9ded3]">
        <div className="shell flex flex-col justify-between gap-10 py-16 md:flex-row md:items-center md:py-20">
          <div><div className="eyebrow text-[#bd7058]">O privilégio do simples</div><p className="serif mt-4 max-w-[720px] text-[34px] leading-[1.14] tracking-[-.04em] md:text-[48px]">Uma mesa posta.<br className="md:hidden" /> O telefone longe. <em>O resto, presente.</em></p></div>
          <button onClick={scrollToMenu} className="group flex w-fit items-center gap-5 border border-[#20392e] px-6 py-4 text-[9px] tracking-[.15em] uppercase hover:bg-[#20392e] hover:text-[#f4efe4] transition-colors">Escolher o jantar <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button>
        </div>
      </section>

      <footer className="bg-[#20392e] text-[#f4efe4]">
        <div className="shell grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end">
          <div><a href="#top" className="serif text-[34px] tracking-[-.065em]">nonatto<span className="text-[#d58c72]">.</span></a><p className="mt-3 text-[10px] tracking-[.07em] text-[#bac5b9]">Comer bem é um jeito de estar.</p></div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[9px] tracking-[.13em] uppercase text-[#cbd2c7]"><a href="#manifesto" className="hover:text-white">Manifesto</a><a href="#menu" className="hover:text-white">Menu de hoje</a><a href="#ritual" className="hover:text-white">Nosso cuidado</a></div>
          <div className="border-t border-white/20 pt-5 text-[9px] tracking-wide text-[#aebbb0] md:col-span-2 md:flex md:justify-between"><span>Curadoria gastronômica · Feito com atenção.</span><span>© Nonatto {new Date().getFullYear()} · Comer é um gesto.</span></div>
        </div>
      </footer>

      {notice && <div role="status" aria-live="polite" className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 bg-[#20392e] px-5 py-3 text-[11px] text-[#f4efe4] shadow-xl"><Check size={15} className="text-[#d58c72]" />{notice}</div>}
      {cartOpen && <div className="drawer-backdrop fixed inset-0 z-50 bg-[#15251e]/55" onMouseDown={event => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className="drawer-panel ml-auto flex h-full w-full max-w-[470px] flex-col bg-[#f4efe6] text-[#20392e]">
          <div className="flex items-center justify-between border-b border-[#d8d1c4] px-6 py-6 md:px-8"><div><div className="eyebrow text-[#bd7058]">Sua noite, à sua maneira</div><h2 id="cart-title" className="serif mt-2 text-[29px]">Sua seleção<span className="text-[#bd7058]">.</span></h2></div><button onClick={() => setCartOpen(false)} aria-label="Fechar seleção" className="p-2 hover:bg-[#e9e3d8]"><X size={20} /></button></div>
          {cart.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#c9c1b3]"><ShoppingBag size={22} strokeWidth={1.2} /></div><p className="serif mt-6 text-[25px]">Ainda há espaço<br />à mesa.</p><p className="mt-3 max-w-[250px] text-[12px] leading-[1.7] text-[#657067]">A seleção de hoje começa com uma boa escolha.</p><button onClick={() => { setCartOpen(false); scrollToMenu(); }} className="mt-7 flex items-center gap-3 bg-[#20392e] px-5 py-4 text-[9px] tracking-[.13em] text-[#f4efe4] uppercase hover:bg-[#bd7058] transition-colors">Explorar o menu <ArrowRight size={14} /></button></div> : <>
            <div className="flex-1 overflow-y-auto px-6 py-3 md:px-8">{cart.map(({ dish, quantity }) => <div key={dish.id} className="flex gap-4 border-b border-[#d8d1c4] py-5"><div className="min-w-0 flex-1"><h3 className="serif text-[17px]">{dish.name}</h3><p className="mt-1 text-[11px] leading-[1.5] text-[#667268]">{dish.description}</p><p className="mt-2 text-[11px]">{formatPrice(dish.price)}</p></div><div className="flex h-fit items-center border border-[#c9c1b3]"><button className="p-2 hover:bg-[#e9e3d8]" aria-label={`Remover uma porção de ${dish.name}`} onClick={() => changeQuantity(dish.id, -1)}><Minus size={12} /></button><span className="w-6 text-center text-[11px]">{quantity}</span><button className="p-2 hover:bg-[#e9e3d8]" aria-label={`Adicionar uma porção de ${dish.name}`} onClick={() => changeQuantity(dish.id, 1)}><Plus size={12} /></button></div></div>)}
            <button onClick={() => { setCartOpen(false); scrollToMenu(); }} className="mt-5 flex items-center gap-2 py-2 text-[9px] tracking-[.13em] uppercase text-[#657067] hover:text-[#bd7058]"><Plus size={14} /> Adicionar mais à seleção</button></div>
            <div className="border-t border-[#d8d1c4] px-6 py-6 md:px-8"><div className="flex justify-between text-[12px]"><span>Subtotal</span><span>{formatPrice(total)}</span></div><div className="mt-2 flex justify-between text-[10px] text-[#69746a]"><span>Entrega calculada no próximo passo</span><span>A combinar</span></div><button onClick={() => setNotice('Sua seleção está pronta. A finalização de pedidos estará disponível em breve.')} className="mt-6 flex w-full items-center justify-between bg-[#20392e] px-5 py-[17px] text-[10px] tracking-[.14em] text-[#f4efe4] uppercase hover:bg-[#bd7058] transition-colors"><span>Continuar com esta seleção</span><ArrowRight size={15} /></button><p className="mt-3 text-center text-[9px] leading-[1.6] text-[#7a8178]">Prévia de seleção. Nenhum pedido ou pagamento será enviado.</p></div>
          </>}
        </aside>
      </div>}
    </main>
  );
}

export default App;
