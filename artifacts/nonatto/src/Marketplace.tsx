import { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, Bookmark, Heart, Search, X } from 'lucide-react';
import { restaurants, type Restaurant } from './catalog';
import { OrderDialog } from './nm/OrderDialog';

const categories = ['Todos', 'Restaurantes', 'Cafés', 'Doces'] as const;
type Filter = typeof categories[number];

function PlaceLogo({ place }: { place: Restaurant }) {
  const [hasError, setHasError] = useState(false);
  return (
    <div className={`nm-place-logo-frame${place.id === 'pobre-juan' ? ' nm-place-logo-frame--dark' : ''}`}>
      {!hasError ? (
        <img className="nm-place-logo" src={place.logo} alt="" aria-hidden="true" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setHasError(true)} />
      ) : (
        <span className="nm-place-logo-fallback" role="img" aria-label={`Marca de ${place.name}`}>{place.name.charAt(0)}</span>
      )}
    </div>
  );
}

export function Marketplace() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Filter>('Todos');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selected, setSelected] = useState<Restaurant | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('pt-BR');
    return restaurants.filter(p =>
      (!q || `${p.name} ${p.category} ${p.note}`.toLocaleLowerCase('pt-BR').includes(q)) &&
      (category === 'Todos' || p.category === category) &&
      (!favoritesOnly || favorites.includes(p.id)));
  }, [query, category, favoritesOnly, favorites]);

  const toggleFavorite = (id: string) => setFavorites(c => c.includes(id) ? c.filter(i => i !== id) : [...c, id]);
  const reset = () => { setQuery(''); setCategory('Todos'); setFavoritesOnly(false); };
  const jump = () => document.getElementById('nm-discovery')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main id="nm-top">
      <section className="nm-hero nm-wrap" aria-labelledby="nm-title">
        <div className="nm-hero-copy">
          <div className="nm-kicker">Pedir</div>
          <h1 className="nm-serif" id="nm-title">O raro também<br />pode <em>chegar.</em></h1>
          <p className="nm-hero-intro">Escolha um lugar. Peça agora ou agende sua entrega.</p>
          <label className="nm-search">
            <Search size={17} strokeWidth={1.6} aria-hidden="true" />
            <input type="search" aria-label="Buscar estabelecimentos ou cozinhas" placeholder="Busque um lugar ou uma cozinha" value={query} onChange={e => setQuery(e.target.value)} />
            {query && <button type="button" className="nm-search-clear" aria-label="Limpar busca" onClick={() => setQuery('')}><X size={15} /></button>}
          </label>
          <button type="button" className="nm-hero-action" onClick={jump}>Ver a seleção <ArrowDown size={14} /></button>
        </div>
        <div className="nm-hero-photo">
          <img src="/hero-prato.jpg" alt="Vieira delicadamente selada com ervas frescas em prato artesanal" />
          <div className="nm-photo-caption">
            <div className="nm-kicker">Curadoria, sem pressa</div>
            <p>Um ingrediente no ponto.<br />Uma escolha com intenção.</p>
          </div>
        </div>
      </section>

      <section className="nm-discovery" id="nm-discovery" aria-labelledby="nm-discovery-title">
        <div className="nm-wrap">
          <div className="nm-section-top">
            <div><div className="nm-kicker">Seleção</div><h2 className="nm-serif" id="nm-discovery-title">Lugares que têm<br /><em>algo a dizer.</em></h2></div>
          </div>
          <div className="nm-controls">
            <div className="nm-categories" role="group" aria-label="Filtrar por categoria">
              {categories.map(c => <button type="button" key={c} className="nm-chip" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}
            </div>
            <button type="button" className="nm-fav-filter" aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly(v => !v)}>
              <Bookmark size={13} fill={favoritesOnly ? 'currentColor' : 'none'} /> {favoritesOnly ? 'Ver todos' : 'Minha lista'}{favorites.length > 0 && <span>· {favorites.length}</span>}
            </button>
          </div>
          <div className="nm-results-line" aria-live="polite">
            <span><strong>{visible.length}</strong> {visible.length === 1 ? 'lugar' : 'lugares'}</span>
            {(query || category !== 'Todos' || favoritesOnly) && <button type="button" className="nm-card-link" onClick={reset}>Limpar filtros <X size={12} /></button>}
          </div>
          <div className="nm-grid">
            {visible.length > 0 ? visible.map(p => {
              const saved = favorites.includes(p.id);
              return (
                <article className="nm-place-card" key={p.id}>
                  <div className="nm-card-top">
                    <PlaceLogo place={p} />
                    <span className="nm-place-category">{p.category}</span>
                    <button type="button" className={`nm-favorite ${saved ? 'is-saved' : ''}`} aria-label={saved ? `Remover ${p.name} da sua lista` : `Salvar ${p.name} na sua lista`} aria-pressed={saved} onClick={() => toggleFavorite(p.id)}><Heart size={16} fill={saved ? 'currentColor' : 'none'} strokeWidth={1.5} /></button>
                  </div>
                  <h3>{p.name}</h3>
                  <div className="nm-place-note">{p.note}</div>
                  <p className="nm-place-address">{p.address}</p>
                  <button type="button" className="nm-order-btn" onClick={() => setSelected(p)}>Pedir agora <ArrowRight size={13} /></button>
                </article>
              );
            }) : (
              <div className="nm-empty">
                <Search size={20} strokeWidth={1.4} aria-hidden="true" />
                <h3>Nenhum lugar por aqui.</h3>
                <p>{favoritesOnly && favorites.length === 0 ? 'Salve um lugar para vê-lo aqui.' : 'Tente outro nome ou categoria.'}</p>
                <button type="button" onClick={reset}>Ver todos os lugares</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="nm-editorial nm-wrap" aria-labelledby="nm-manifesto-title">
        <div className="nm-editorial-image"><img src="/massa-prato.jpg" alt="Massa fresca servida em prato artesanal com folhas e queijo" /></div>
        <div className="nm-editorial-copy">
          <div className="nm-kicker">Um ponto de vista</div>
          <h2 className="nm-serif" id="nm-manifesto-title">Não é sobre ter mais.<br /><em>É sobre escolher melhor.</em></h2>
          <p>A seleção é curta por escolha. O prazer, nunca.</p>
        </div>
      </section>

      {selected && <OrderDialog key={selected.id} restaurant={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

export default Marketplace;
