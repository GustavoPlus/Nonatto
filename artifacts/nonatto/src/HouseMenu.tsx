import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, Minus, Plus, ShoppingBag, X } from 'lucide-react';

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

const formatPrice = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;

type HouseMenuProps = { open: boolean; onClose: () => void };

export default function HouseMenu({ open, onClose }: HouseMenuProps) {
  const [category, setCategory] = useState('Tudo');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const filteredDishes = useMemo(
    () => category === 'Tudo' ? dishes : dishes.filter(dish => dish.category === category),
    [category],
  );
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.quantity * item.dish.price, 0);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (cartOpen) setCartOpen(false);
      else onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, cartOpen, onClose]);

  const add = (dish: Dish) => {
    setCart(current => {
      const found = current.find(item => item.dish.id === dish.id);
      return found
        ? current.map(item => item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { dish, quantity: 1 }];
    });
    setNotice(`${dish.name} adicionado à sua seleção`);
    window.setTimeout(() => setNotice(''), 2400);
  };

  const changeQuantity = (dishId: number, amount: number) => {
    setCart(current => current
      .map(item => item.dish.id === dishId ? { ...item, quantity: item.quantity + amount } : item)
      .filter(item => item.quantity > 0));
  };

  const closeMenu = () => {
    setCartOpen(false);
    onClose();
  };

  return (
    <>
      {open && (
        <div
          className="drawer-backdrop fixed inset-0 z-50 bg-[#15251e]/55"
          onMouseDown={event => { if (event.target === event.currentTarget) closeMenu(); }}
        >
          <aside role="dialog" aria-modal="true" aria-labelledby="house-menu-title" className="drawer-panel ml-auto flex h-full w-full max-w-[900px] flex-col bg-[#20392e] text-[#f4efe4]">
            <header className="flex items-center justify-between gap-5 border-b border-white/15 px-5 py-5 sm:px-8 sm:py-6">
              <div>
                <div className="eyebrow text-[#d58c72]">Menu demonstrativo do Nonatto</div>
                <h2 id="house-menu-title" className="serif mt-2 text-[26px] sm:text-[31px]">A seleção da casa<span className="text-[#d58c72]">.</span></h2>
              </div>
              <button type="button" onClick={closeMenu} aria-label="Fechar menu" className="shrink-0 p-2 text-[#f4efe4] hover:bg-white/10">
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
              <p className="max-w-[620px] text-[12px] leading-[1.8] text-[#c7cfc4]">
                Pratos autorais ilustrativos para demonstrar a experiência de seleção. Este menu é próprio do Nonatto e não representa os cardápios dos estabelecimentos apresentados na vitrine.
              </p>
              <div className="mt-7 flex gap-2 overflow-x-auto border-b border-white/20 pb-4" role="tablist" aria-label="Categorias do menu Nonatto">
                {categories.map(item => (
                  <button
                    type="button"
                    key={item}
                    role="tab"
                    aria-selected={category === item}
                    onClick={() => setCategory(item)}
                    className={`pill whitespace-nowrap border px-4 py-[10px] text-[9px] tracking-[.14em] uppercase ${category === item ? 'border-[#d58c72] bg-[#d58c72] text-[#20392e]' : 'border-white/25 text-[#e8e5db] hover:border-white/70'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="grid gap-x-8 pt-2 md:grid-cols-2">
                {filteredDishes.map(dish => (
                  <article key={dish.id} className={`menu-card flex gap-4 border-b border-white/15 py-6 ${dish.image ? 'min-h-[154px]' : 'min-h-[132px]'}`}>
                    {dish.image && (
                      <div className="h-[88px] w-[88px] shrink-0 overflow-hidden bg-[#395146] sm:h-[104px] sm:w-[104px]">
                        <img className="menu-photo h-full w-full object-cover" src={dish.image} alt="" />
                      </div>
                    )}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="serif text-[18px] leading-[1.25] sm:text-[19px]">{dish.name}</h3>
                            {dish.note && <span className="hidden border border-[#d58c72]/70 px-2 py-1 text-[8px] tracking-[.1em] text-[#e5a58d] uppercase sm:inline">{dish.note}</span>}
                          </div>
                          <p className="mt-2 max-w-[360px] text-[11px] leading-[1.6] text-[#bbc6bb]">{dish.description}</p>
                        </div>
                        <span className="shrink-0 pt-1 text-[11px] tabular-nums sm:text-[12px]">{formatPrice(dish.price)}</span>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button type="button" onClick={() => add(dish)} className="flex items-center gap-2 text-[9px] tracking-[.13em] uppercase text-[#e2a58d] transition-colors hover:text-white">
                          <Plus size={14} /> Adicionar
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <footer className="flex flex-col gap-3 border-t border-white/15 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-[10px] leading-[1.6] text-[#c1ccc1]">Prévia de seleção. Nenhum pedido ou pagamento será enviado.</p>
              <button type="button" onClick={() => setCartOpen(true)} className="flex w-fit items-center gap-3 text-[10px] tracking-[.14em] uppercase transition-colors hover:text-[#e3a189]">
                <ShoppingBag size={15} /> {count ? `Ver seleção · ${count} ${count === 1 ? 'item' : 'itens'}` : 'Abrir sua seleção'} <ArrowRight size={14} />
              </button>
            </footer>
          </aside>
        </div>
      )}

      {cartOpen && (
        <div
          className="drawer-backdrop fixed inset-0 z-[60] bg-[#15251e]/60"
          onMouseDown={event => { if (event.target === event.currentTarget) setCartOpen(false); }}
        >
          <aside role="dialog" aria-modal="true" aria-labelledby="house-cart-title" className="drawer-panel ml-auto flex h-full w-full max-w-[470px] flex-col bg-[#f4efe6] text-[#20392e]">
            <header className="flex items-center justify-between border-b border-[#d8d1c4] px-6 py-6 sm:px-8">
              <div>
                <div className="eyebrow text-[#bd7058]">Sua noite, à sua maneira</div>
                <h2 id="house-cart-title" className="serif mt-2 text-[29px]">Sua seleção<span className="text-[#bd7058]">.</span></h2>
              </div>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="Fechar seleção" className="p-2 hover:bg-[#e9e3d8]"><X size={20} /></button>
            </header>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#c9c1b3]"><ShoppingBag size={22} strokeWidth={1.2} /></div>
                <p className="serif mt-6 text-[25px]">Ainda há espaço<br />à mesa.</p>
                <p className="mt-3 max-w-[250px] text-[12px] leading-[1.7] text-[#657067]">A seleção de hoje começa com uma boa escolha.</p>
                <button type="button" onClick={() => setCartOpen(false)} className="mt-7 flex items-center gap-3 bg-[#20392e] px-5 py-4 text-[9px] tracking-[.13em] text-[#f4efe4] uppercase transition-colors hover:bg-[#bd7058]">
                  Explorar o menu <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-3 sm:px-8">
                  {cart.map(({ dish, quantity }) => (
                    <div key={dish.id} className="flex gap-4 border-b border-[#d8d1c4] py-5">
                      <div className="min-w-0 flex-1">
                        <h3 className="serif text-[17px]">{dish.name}</h3>
                        <p className="mt-1 text-[11px] leading-[1.5] text-[#667268]">{dish.description}</p>
                        <p className="mt-2 text-[11px]">{formatPrice(dish.price)}</p>
                      </div>
                      <div className="flex h-fit items-center border border-[#c9c1b3]">
                        <button type="button" className="p-2 hover:bg-[#e9e3d8]" aria-label={`Remover uma porção de ${dish.name}`} onClick={() => changeQuantity(dish.id, -1)}><Minus size={12} /></button>
                        <span className="w-6 text-center text-[11px]">{quantity}</span>
                        <button type="button" className="p-2 hover:bg-[#e9e3d8]" aria-label={`Adicionar uma porção de ${dish.name}`} onClick={() => changeQuantity(dish.id, 1)}><Plus size={12} /></button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => setCartOpen(false)} className="mt-5 flex items-center gap-2 py-2 text-[9px] tracking-[.13em] uppercase text-[#657067] hover:text-[#bd7058]"><Plus size={14} /> Adicionar mais à seleção</button>
                </div>
                <div className="border-t border-[#d8d1c4] px-6 py-6 sm:px-8">
                  <div className="flex justify-between text-[12px]"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
                  <div className="mt-2 flex justify-between text-[10px] text-[#69746a]"><span>Entrega calculada no próximo passo</span><span>A combinar</span></div>
                  <button
                    type="button"
                    onClick={() => { setNotice('Esta é apenas uma demonstração. Nenhum pedido ou pagamento será enviado.'); window.setTimeout(() => setNotice(''), 3000); }}
                    className="mt-6 flex w-full items-center justify-between bg-[#20392e] px-5 py-[17px] text-[10px] tracking-[.14em] text-[#f4efe4] uppercase transition-colors hover:bg-[#bd7058]"
                  >
                    <span>Continuar com esta seleção</span><ArrowRight size={15} />
                  </button>
                  <p className="mt-3 text-center text-[9px] leading-[1.6] text-[#7a8178]">Prévia de seleção. Nenhum pedido ou pagamento será enviado.</p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {notice && <div role="status" aria-live="polite" className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 bg-[#20392e] px-5 py-3 text-[11px] text-[#f4efe4] shadow-xl"><Check size={15} className="text-[#d58c72]" />{notice}</div>}
    </>
  );
}
