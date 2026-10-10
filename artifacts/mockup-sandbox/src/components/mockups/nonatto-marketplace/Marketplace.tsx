import { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Bookmark, Check, ChevronDown, Coffee, Heart, MapPin, Search, Utensils, X } from 'lucide-react';
import './_group.css';

type Category = 'Restaurantes' | 'Cafés' | 'Doces';
type Place = { name: string; category: Category; note: string; description: string; mark: string };

const places: Place[] = [
  { name: 'Almanara', category: 'Restaurantes', note: 'Cozinha do Levante', description: 'Receitas de família, especiarias delicadas e uma mesa generosa.', mark: 'A' },
  { name: 'Rascal', category: 'Restaurantes', note: 'Italiana contemporânea', description: 'Clássicos italianos revisitados com leveza e bons ingredientes.', mark: 'R' },
  { name: 'Barbacoa', category: 'Restaurantes', note: 'Cortes & brasa', description: 'O tempo da brasa, cortes selecionados e acompanhamentos de casa.', mark: 'B' },
  { name: 'Fasano', category: 'Restaurantes', note: 'Tradição italiana', description: 'Uma cozinha de gestos precisos, massas e receitas atemporais.', mark: 'F' },
  { name: 'Bacio di Latte', category: 'Doces', note: 'Gelato artesanal', description: 'Gelato de textura sedosa e sabores que pedem uma pausa.', mark: 'B' },
  { name: 'Fahrenheit', category: 'Restaurantes', note: 'Cozinha de autor', description: 'Ingredientes de estação encontram técnica e personalidade.', mark: 'F' },
  { name: 'Dengo', category: 'Doces', note: 'Chocolate brasileiro', description: 'Cacau de origem e combinações inspiradas na biodiversidade brasileira.', mark: 'D' },
  { name: 'Jun Sakamoto', category: 'Restaurantes', note: 'Japonesa contemporânea', description: 'Uma leitura cuidadosa da tradição japonesa e do ingrediente.', mark: 'J' },
  { name: 'Kopenhagen', category: 'Doces', note: 'Chocolate & confeitaria', description: 'Clássicos da confeitaria feitos para presentear — ou guardar para si.', mark: 'K' },
  { name: 'Due Couchi', category: 'Restaurantes', note: 'Cozinha italiana', description: 'Sabores italianos de espírito acolhedor e execução cuidadosa.', mark: 'D' },
  { name: 'Pobre Juan', category: 'Restaurantes', note: 'Parrilla argentina', description: 'A tradição da parrilla, com fogo, cortes e bons encontros.', mark: 'P' },
  { name: 'Flakes', category: 'Cafés', note: 'Café & brunch', description: 'Um convite para prolongar o café da manhã, a qualquer hora.', mark: 'F' },
  { name: 'Starbucks', category: 'Cafés', note: 'Café & bebidas', description: 'Bebidas de café e pausas familiares para acompanhar o dia.', mark: 'S' },
  { name: 'Blaise', category: 'Restaurantes', note: 'Cozinha contemporânea', description: 'Uma cozinha urbana, elegante e guiada pelo prazer de compartilhar.', mark: 'B' },
  { name: 'The Coffee', category: 'Cafés', note: 'Café de especialidade', description: 'Café feito com atenção, em uma pausa simples e bem cuidada.', mark: 'T' },
];

const categories = ['Todos', 'Restaurantes', 'Cafés', 'Doces'] as const;
type Filter = typeof categories[number];

export function Marketplace() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Filter>('Todos');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selected, setSelected] = useState<Place | null>(null);

  const visiblePlaces = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');
    return places.filter(place => {
      const matchesQuery = !normalized || `${place.name} ${place.category} ${place.note} ${place.description}`.toLocaleLowerCase('pt-BR').includes(normalized);
      const matchesCategory = category === 'Todos' || place.category === category;
      const matchesFavorite = !favoritesOnly || favorites.includes(place.name);
      return matchesQuery && matchesCategory && matchesFavorite;
    });
  }, [query, category, favoritesOnly, favorites]);

  const toggleFavorite = (name: string) => {
    setFavorites(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  };

  const jumpToDiscovery = () => document.getElementById('nm-discovery')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="nm-marketplace" id="nm-top">
      <style>{`
        .nm-marketplace {
          --nm-ink: #20392e; --nm-ink-deep: #182d24; --nm-paper: #f5f1e8; --nm-paper-2: #eae5da;
          --nm-card: #fbf9f4; --nm-terracotta: #bd7058; --nm-muted: #68746b; --nm-line: #d9d2c5;
          min-height: 100dvh; overflow: clip; background: var(--nm-paper); color: var(--nm-ink);
          font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased;
        }
        .nm-marketplace *, .nm-marketplace *::before, .nm-marketplace *::after { box-sizing: border-box; }
        .nm-marketplace button, .nm-marketplace input { font: inherit; }
        .nm-marketplace button { color: inherit; }
        .nm-marketplace a { color: inherit; text-decoration: none; }
        .nm-marketplace button:focus-visible, .nm-marketplace a:focus-visible, .nm-marketplace input:focus-visible { outline: 2px solid var(--nm-terracotta); outline-offset: 3px; }
        .nm-wrap { width: min(1260px, calc(100% - 88px)); margin-inline: auto; }
        .nm-serif { font-family: 'Playfair Display', Georgia, serif; }
        .nm-kicker { font-size: 9px; font-weight: 600; letter-spacing: .18em; line-height: 1.5; text-transform: uppercase; }
        .nm-topline { min-height: 31px; display: flex; align-items: center; justify-content: center; padding: 7px 18px; background: var(--nm-ink); color: #e8e6da; text-align: center; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; }
        .nm-header { min-height: 76px; display: flex; align-items: center; justify-content: space-between; gap: 28px; border-bottom: 1px solid var(--nm-line); }
        .nm-wordmark { font-family: 'Playfair Display', Georgia, serif; font-size: 31px; letter-spacing: -.075em; line-height: 1; }
        .nm-wordmark span { color: var(--nm-terracotta); }
        .nm-nav { display: flex; align-items: center; gap: clamp(20px, 3vw, 42px); color: #4d5c52; font-size: 10px; letter-spacing: .1em; text-transform: uppercase; }
        .nm-nav a { transition: color .2s ease; }
        .nm-nav a:hover { color: var(--nm-terracotta); }
        .nm-location { display: flex; align-items: center; gap: 9px; padding: 10px 0; color: #5d695f; font-size: 11px; }
        .nm-location strong { display: block; color: var(--nm-ink); font-size: 9px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
        .nm-location span { display: block; margin-top: 3px; }
        .nm-hero { display: grid; grid-template-columns: .91fr 1.09fr; align-items: center; gap: 34px; padding-top: 49px; padding-bottom: 56px; }
        .nm-hero-copy { position: relative; z-index: 1; padding: 14px 0 20px; }
        .nm-hero-copy .nm-kicker { color: var(--nm-terracotta); }
        .nm-hero h1 { max-width: 570px; margin: 21px 0 0; font-size: clamp(54px, 7.1vw, 93px); font-weight: 500; letter-spacing: -.07em; line-height: .98; }
        .nm-hero h1 em { color: var(--nm-terracotta); font-weight: 500; }
        .nm-hero-intro { max-width: 405px; margin: 24px 0 0; color: #59665d; font-size: 13px; line-height: 1.85; }
        .nm-search { display: flex; align-items: center; gap: 12px; width: min(100%, 465px); min-height: 58px; margin-top: 31px; padding: 0 14px 0 17px; border: 1px solid #c8c1b4; background: #fbf9f4; box-shadow: 0 8px 26px #20392e0a; }
        .nm-search > svg { flex: 0 0 auto; color: #66736a; }
        .nm-search input { min-width: 0; flex: 1; border: 0; outline: 0; background: transparent; color: var(--nm-ink); font-size: 12px; }
        .nm-search input::placeholder { color: #81877e; }
        .nm-search-clear { display: grid; width: 30px; height: 30px; place-items: center; border: 0; background: transparent; color: #66736a; }
        .nm-search-hint { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 14px; color: #7a8178; font-size: 9px; letter-spacing: .03em; }
        .nm-search-hint span { display: flex; align-items: center; gap: 6px; }
        .nm-hero-action { display: inline-flex; align-items: center; gap: 18px; margin-top: 26px; padding: 14px 18px; border: 0; background: var(--nm-ink); color: var(--nm-paper) !important; font-size: 9px; letter-spacing: .13em; text-transform: uppercase; transition: background .2s ease, gap .2s ease; }
        .nm-hero-action:hover { gap: 23px; background: var(--nm-terracotta); }
        .nm-hero-photo { position: relative; min-height: 475px; }
        .nm-hero-photo img { display: block; width: 100%; height: 475px; object-fit: cover; object-position: center 56%; }
        .nm-photo-caption { position: absolute; right: -1px; bottom: 0; width: min(290px, 72%); padding: 21px 23px; background: var(--nm-paper); }
        .nm-photo-caption .nm-kicker { color: var(--nm-terracotta); }
        .nm-photo-caption p { margin: 7px 0 0; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; line-height: 1.24; }
        .nm-photo-caption small { display: block; margin-top: 8px; color: #737b72; font-size: 9px; letter-spacing: .06em; }
        .nm-discovery { padding: 72px 0 84px; background: #eae5da; }
        .nm-section-top { display: flex; align-items: end; justify-content: space-between; gap: 24px; }
        .nm-section-top .nm-kicker { color: var(--nm-terracotta); }
        .nm-section-top h2 { margin: 10px 0 0; font-size: clamp(36px, 5vw, 58px); font-weight: 500; letter-spacing: -.055em; line-height: 1.03; }
        .nm-section-top h2 em { color: var(--nm-terracotta); font-weight: 500; }
        .nm-section-note { max-width: 270px; margin: 0 0 3px; color: #667168; font-size: 11px; line-height: 1.7; }
        .nm-controls { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-top: 31px; padding-bottom: 15px; border-bottom: 1px solid #cfc8bb; }
        .nm-categories { display: flex; flex-wrap: wrap; gap: 8px; }
        .nm-chip { min-height: 34px; padding: 0 15px; border: 1px solid #c6bfb2; background: transparent; color: #59665c !important; font-size: 9px; letter-spacing: .1em; text-transform: uppercase; transition: background .2s ease, color .2s ease, border-color .2s ease; }
        .nm-chip:hover { border-color: var(--nm-ink); }
        .nm-chip[aria-pressed="true"] { border-color: var(--nm-ink); background: var(--nm-ink); color: var(--nm-paper) !important; }
        .nm-fav-filter { display: inline-flex; align-items: center; gap: 8px; flex: 0 0 auto; min-height: 34px; padding: 0 4px; border: 0; background: none; color: #68746b !important; font-size: 9px; letter-spacing: .1em; text-transform: uppercase; }
        .nm-fav-filter[aria-pressed="true"] { color: var(--nm-terracotta) !important; }
        .nm-results-line { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding: 15px 0 8px; color: #6a766c; font-size: 10px; }
        .nm-results-line strong { color: var(--nm-ink); font-weight: 500; }
        .nm-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 13px; margin-top: 10px; }
        .nm-place-card { position: relative; display: flex; min-height: 205px; flex-direction: column; align-items: flex-start; padding: 22px 21px 18px; border: 1px solid #d9d2c6; background: #f7f3eb; transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
        .nm-place-card:hover { transform: translateY(-3px); border-color: #b8ad9e; box-shadow: 0 12px 28px #20392e0d; }
        .nm-card-top { display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 14px; }
        .nm-place-monogram { display: grid; width: 39px; height: 39px; flex: 0 0 auto; place-items: center; border: 1px solid #d3c9b9; color: var(--nm-terracotta); font-family: 'Playfair Display', Georgia, serif; font-size: 19px; font-style: italic; }
        .nm-place-category { color: #7d8279; font-size: 8px; letter-spacing: .13em; text-align: right; text-transform: uppercase; }
        .nm-favorite { display: grid; width: 31px; height: 31px; flex: 0 0 auto; place-items: center; border: 1px solid transparent; background: transparent; color: #777f75 !important; transition: color .2s ease, background .2s ease; }
        .nm-favorite:hover, .nm-favorite.is-saved { color: var(--nm-terracotta) !important; background: #f0e7dd; }
        .nm-place-card h3 { margin: 15px 0 0; font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 500; letter-spacing: -.035em; line-height: 1.12; }
        .nm-place-note { margin: 5px 0 0; color: var(--nm-terracotta); font-size: 9px; letter-spacing: .07em; }
        .nm-place-description { max-width: 330px; margin: 9px 0 0; color: #69746a; font-size: 10px; line-height: 1.65; }
        .nm-card-link { display: inline-flex; align-items: center; gap: 7px; margin-top: auto; padding: 16px 0 0; border: 0; background: transparent; color: var(--nm-ink) !important; font-size: 8px; letter-spacing: .14em; text-transform: uppercase; }
        .nm-card-link svg { transition: transform .2s ease; }
        .nm-card-link:hover { color: var(--nm-terracotta) !important; }
        .nm-card-link:hover svg { transform: translateX(3px); }
        .nm-empty { grid-column: 1 / -1; display: flex; min-height: 225px; flex-direction: column; align-items: center; justify-content: center; padding: 28px; border: 1px dashed #c8c0b3; text-align: center; }
        .nm-empty h3 { margin: 13px 0 0; font-family: 'Playfair Display', Georgia, serif; font-size: 23px; font-weight: 500; }
        .nm-empty p { max-width: 340px; margin: 8px 0 0; color: #6d786f; font-size: 11px; line-height: 1.7; }
        .nm-empty button { margin-top: 15px; border: 0; border-bottom: 1px solid var(--nm-ink); background: none; font-size: 9px; letter-spacing: .1em; text-transform: uppercase; }
        .nm-editorial { display: grid; grid-template-columns: 1.03fr .97fr; align-items: stretch; gap: 0; padding-top: 82px; padding-bottom: 82px; }
        .nm-editorial-image { min-height: 360px; overflow: hidden; }
        .nm-editorial-image img { display: block; width: 100%; height: 100%; min-height: 360px; object-fit: cover; }
        .nm-editorial-copy { display: flex; flex-direction: column; justify-content: center; padding: clamp(30px, 6vw, 75px); background: #dedfd3; }
        .nm-editorial-copy .nm-kicker { color: var(--nm-terracotta); }
        .nm-editorial-copy h2 { margin: 17px 0 0; font-size: clamp(35px, 4.3vw, 56px); font-weight: 500; letter-spacing: -.055em; line-height: 1.04; }
        .nm-editorial-copy h2 em { color: var(--nm-terracotta); font-weight: 500; }
        .nm-editorial-copy p { max-width: 380px; margin: 19px 0 0; color: #5e6a61; font-size: 12px; line-height: 1.85; }
        .nm-editorial-copy a { display: inline-flex; align-items: center; gap: 11px; width: fit-content; margin-top: 24px; padding-bottom: 7px; border-bottom: 1px solid var(--nm-ink); font-size: 9px; letter-spacing: .12em; text-transform: uppercase; }
        .nm-editorial-copy a:hover { color: var(--nm-terracotta); border-color: var(--nm-terracotta); }
        .nm-principles { background: var(--nm-ink); color: var(--nm-paper); }
        .nm-principles-inner { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 22px; padding-top: 31px; padding-bottom: 31px; }
        .nm-principle { display: flex; align-items: center; gap: 14px; }
        .nm-principle span { color: #d58c72; font-family: 'Playfair Display', Georgia, serif; font-size: 22px; font-style: italic; }
        .nm-principle p { margin: 0; color: #e2e4da; font-size: 9px; letter-spacing: .12em; text-transform: uppercase; }
        .nm-footer { background: var(--nm-ink-deep); color: var(--nm-paper); }
        .nm-footer-main { display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 32px; padding-top: 39px; padding-bottom: 31px; }
        .nm-footer-brand p { margin: 10px 0 0; color: #b8c2b7; font-size: 10px; letter-spacing: .04em; }
        .nm-footer-nav { display: flex; flex-wrap: wrap; gap: 12px 25px; color: #d4d8ce; font-size: 9px; letter-spacing: .12em; text-transform: uppercase; }
        .nm-footer-nav a:hover { color: #e7a78e; }
        .nm-disclaimer { grid-column: 1 / -1; margin: 0; padding-top: 19px; border-top: 1px solid #ffffff2c; color: #c5cec2; font-size: 11px; line-height: 1.75; }
        .nm-footer-meta { display: flex; justify-content: space-between; gap: 15px; padding: 13px 0 20px; color: #96a69a; font-size: 9px; letter-spacing: .04em; }
        .nm-modal-backdrop { position: fixed; z-index: 80; inset: 0; display: grid; place-items: center; padding: 20px; background: #13251dcc; animation: nmFade .18s ease both; }
        .nm-modal { position: relative; width: min(100%, 470px); padding: 37px; background: var(--nm-paper); box-shadow: 0 25px 90px #10201855; animation: nmRise .25s ease both; }
        .nm-modal-close { position: absolute; top: 13px; right: 13px; display: grid; width: 36px; height: 36px; place-items: center; border: 1px solid var(--nm-line); background: transparent; }
        .nm-modal .nm-kicker { color: var(--nm-terracotta); }
        .nm-modal h2 { margin: 14px 0 0; font-family: 'Playfair Display', Georgia, serif; font-size: 38px; font-weight: 500; letter-spacing: -.045em; }
        .nm-modal .nm-modal-note { margin: 7px 0 0; color: var(--nm-terracotta); font-size: 10px; letter-spacing: .08em; }
        .nm-modal p { margin: 18px 0 0; color: #5d6a60; font-size: 12px; line-height: 1.8; }
        .nm-modal-disclaimer { padding-top: 15px; border-top: 1px solid var(--nm-line); font-size: 10px !important; }
        .nm-modal-action { display: inline-flex; align-items: center; gap: 10px; margin-top: 21px; padding: 13px 16px; border: 0; background: var(--nm-ink); color: var(--nm-paper) !important; font-size: 9px; letter-spacing: .12em; text-transform: uppercase; }
        @keyframes nmFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes nmRise { from { opacity: .7; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 850px) {
          .nm-wrap { width: min(100% - 48px, 680px); }
          .nm-header { min-height: 70px; }
          .nm-nav { gap: 17px; font-size: 9px; }
          .nm-hero { grid-template-columns: 1fr 1fr; gap: 20px; padding-top: 35px; padding-bottom: 40px; }
          .nm-hero-photo, .nm-hero-photo img { min-height: 410px; height: 410px; }
          .nm-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .nm-editorial { padding-top: 58px; padding-bottom: 58px; }
          .nm-editorial-copy { padding: 30px; }
        }
        @media (max-width: 620px) {
          .nm-wrap { width: calc(100% - 38px); }
          .nm-topline { min-height: 30px; font-size: 8px; }
          .nm-header { min-height: 66px; gap: 12px; }
          .nm-wordmark { font-size: 29px; }
          .nm-nav { display: none; }
          .nm-location { gap: 6px; font-size: 9px; }
          .nm-location strong { font-size: 8px; }
          .nm-hero { grid-template-columns: 1fr; gap: 27px; padding-top: 37px; padding-bottom: 41px; }
          .nm-hero-copy { padding: 0; }
          .nm-hero h1 { max-width: 470px; margin-top: 15px; font-size: clamp(52px, 14vw, 72px); }
          .nm-hero-intro { margin-top: 16px; font-size: 12px; }
          .nm-search { min-height: 54px; margin-top: 23px; }
          .nm-hero-action { margin-top: 19px; }
          .nm-hero-photo { min-height: 330px; margin-right: -19px; }
          .nm-hero-photo img { height: 330px; min-height: 330px; }
          .nm-photo-caption { width: 220px; padding: 16px 18px; }
          .nm-photo-caption p { font-size: 17px; }
          .nm-discovery { padding: 52px 0 58px; }
          .nm-section-top { align-items: flex-start; flex-direction: column; gap: 12px; }
          .nm-section-top h2 { font-size: 43px; }
          .nm-section-note { max-width: 350px; }
          .nm-controls { align-items: flex-start; flex-direction: column; gap: 10px; margin-top: 23px; }
          .nm-categories { gap: 6px; }
          .nm-chip { min-height: 32px; padding: 0 11px; font-size: 8px; }
          .nm-grid { grid-template-columns: 1fr; gap: 9px; }
          .nm-place-card { min-height: 190px; padding: 18px; }
          .nm-place-card h3 { margin-top: 11px; font-size: 23px; }
          .nm-editorial { grid-template-columns: 1fr; padding-top: 44px; padding-bottom: 44px; }
          .nm-editorial-image, .nm-editorial-image img { min-height: 275px; height: 275px; }
          .nm-editorial-copy { padding: 29px 25px 32px; }
          .nm-editorial-copy h2 { font-size: 41px; }
          .nm-principles-inner { grid-template-columns: 1fr; gap: 17px; padding-top: 24px; padding-bottom: 24px; }
          .nm-principle span { font-size: 20px; }
          .nm-footer-main { grid-template-columns: 1fr; align-items: start; gap: 24px; padding-top: 30px; }
          .nm-disclaimer { grid-column: 1; font-size: 10px; }
          .nm-footer-meta { flex-direction: column; gap: 7px; }
          .nm-modal { padding: 30px 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nm-marketplace *, .nm-marketplace *::before, .nm-marketplace *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; }
        }
      `}</style>

      <div className="nm-topline">Uma seleção pequena. Uma noite que fica.</div>
      <header className="nm-header nm-wrap">
        <a href="#nm-top" className="nm-wordmark" aria-label="Nonatto, início">nonatto<span>.</span></a>
        <nav className="nm-nav" aria-label="Navegação principal">
          <a href="#nm-discovery">Explorar</a>
          <a href="#nm-manifesto">Nossa curadoria</a>
          <a href="#nm-footer">Sobre o Nonatto</a>
        </nav>
         <div className="nm-location" aria-label="Local de exemplo: São Paulo, SP">
          <MapPin size={15} strokeWidth={1.5} aria-hidden="true" />
          <div><strong>Local de exemplo</strong><span>São Paulo, SP <ChevronDown size={10} aria-hidden="true" /></span></div>
        </div>
      </header>

      <section className="nm-hero nm-wrap" aria-labelledby="nm-title">
        <div className="nm-hero-copy">
          <div className="nm-kicker">Curadoria para comer melhor</div>
          <h1 className="nm-serif" id="nm-title">O raro também<br />pode <em>chegar.</em></h1>
          <p className="nm-hero-intro">Uma nova forma de descobrir cozinhas e sabores que merecem a sua atenção. Escolhas feitas com intenção, para comer bem no seu tempo.</p>
          <label className="nm-search">
            <Search size={17} strokeWidth={1.6} aria-hidden="true" />
            <input
              type="search"
              aria-label="Buscar estabelecimentos ou cozinhas"
              placeholder="Busque um lugar ou uma cozinha"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
            {query && <button type="button" className="nm-search-clear" aria-label="Limpar busca" onClick={() => setQuery('')}><X size={15} /></button>}
          </label>
          <div className="nm-search-hint"><span><Utensils size={12} /> Restaurantes escolhidos</span><span><Coffee size={12} /> Cafés & pausas</span></div>
          <button type="button" className="nm-hero-action" onClick={jumpToDiscovery}>Explore a seleção <ArrowDown size={14} /></button>
        </div>
        <div className="nm-hero-photo">
          <img src="/__mockup/images/nonatto-hero.jpg" alt="Vieira delicadamente selada com ervas frescas em prato artesanal" />
          <div className="nm-photo-caption">
            <div className="nm-kicker">Curadoria, sem pressa</div>
            <p>Um ingrediente no ponto.<br />Uma escolha com intenção.</p>
            <small>Uma ideia Nonatto para a sua mesa</small>
          </div>
        </div>
      </section>

      <section className="nm-discovery" id="nm-discovery" aria-labelledby="nm-discovery-title">
        <div className="nm-wrap">
          <div className="nm-section-top">
            <div><div className="nm-kicker">Descubra com calma</div><h2 className="nm-serif" id="nm-discovery-title">Lugares que têm<br /><em>algo a dizer.</em></h2></div>
            <p className="nm-section-note">Cozinhas, cafés e pequenos prazeres reunidos por afinidade de olhar — não por quantidade.</p>
          </div>
          <div className="nm-controls">
            <div className="nm-categories" role="group" aria-label="Filtrar por categoria">
              {categories.map(item => <button type="button" key={item} className="nm-chip" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <button type="button" className="nm-fav-filter" aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly(value => !value)}>
              <Bookmark size={13} fill={favoritesOnly ? 'currentColor' : 'none'} /> {favoritesOnly ? 'Ver todos os lugares' : 'Minha lista'}{favorites.length > 0 && <span>· {favorites.length}</span>}
            </button>
          </div>
          <div className="nm-results-line" aria-live="polite">
            <span><strong>{visiblePlaces.length}</strong> {visiblePlaces.length === 1 ? 'nome em' : 'nomes em'} destaque</span>
            {(query || category !== 'Todos' || favoritesOnly) && <button type="button" className="nm-card-link" onClick={() => { setQuery(''); setCategory('Todos'); setFavoritesOnly(false); }}>Limpar filtros <X size={12} /></button>}
          </div>
          <div className="nm-grid">
            {visiblePlaces.length > 0 ? visiblePlaces.map(place => (
              <article className="nm-place-card" key={place.name}>
                <div className="nm-card-top">
                  <div className="nm-place-monogram" aria-hidden="true">{place.mark}</div>
                  <span className="nm-place-category">{place.category}</span>
                  <button type="button" className={`nm-favorite ${favorites.includes(place.name) ? 'is-saved' : ''}`} aria-label={favorites.includes(place.name) ? `Remover ${place.name} da sua lista` : `Salvar ${place.name} na sua lista`} aria-pressed={favorites.includes(place.name)} onClick={() => toggleFavorite(place.name)}><Heart size={16} fill={favorites.includes(place.name) ? 'currentColor' : 'none'} strokeWidth={1.5} /></button>
                </div>
                <h3>{place.name}</h3>
                <div className="nm-place-note">{place.note}</div>
                <p className="nm-place-description">{place.description}</p>
                <button type="button" className="nm-card-link" onClick={() => setSelected(place)}>Conheça a ideia <ArrowRight size={13} /></button>
              </article>
            )) : (
              <div className="nm-empty">
                <Search size={20} strokeWidth={1.4} aria-hidden="true" />
                <h3>Nenhum lugar por aqui.</h3>
                <p>{favoritesOnly && favorites.length === 0 ? 'Sua lista começa quando você salva um lugar que gostaria de revisitar.' : 'Tente outro nome ou explore uma categoria diferente.'}</p>
                <button type="button" onClick={() => { setQuery(''); setCategory('Todos'); setFavoritesOnly(false); }}>Ver todos os lugares</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="nm-editorial nm-wrap" id="nm-manifesto" aria-labelledby="nm-manifesto-title">
         <div className="nm-editorial-image"><img src="/__mockup/images/nonatto-pasta.jpg" alt="Massa fresca servida em prato artesanal com folhas e queijo" /></div>
        <div className="nm-editorial-copy">
          <div className="nm-kicker">Um ponto de vista</div>
          <h2 className="nm-serif" id="nm-manifesto-title">Não é sobre ter mais.<br /><em>É sobre escolher melhor.</em></h2>
          <p>A mesa também é lugar de descoberta. Acreditamos em cozinhas autorais, ingredientes tratados com respeito e sabores que têm alguma coisa a dizer.</p>
          <p>A seleção é curta por escolha. O prazer, nunca.</p>
          <a href="#nm-discovery">Voltar a explorar <ArrowUpRight size={14} /></a>
        </div>
      </section>

      <section className="nm-principles" aria-label="Os princípios da curadoria Nonatto">
        <div className="nm-principles-inner nm-wrap">
          <div className="nm-principle"><span>01</span><p>Poucos, excelentes</p></div>
          <div className="nm-principle"><span>02</span><p>Origem que importa</p></div>
          <div className="nm-principle"><span>03</span><p>Escolhas com cuidado</p></div>
        </div>
      </section>

      <footer className="nm-footer" id="nm-footer">
        <div className="nm-footer-main nm-wrap">
          <div className="nm-footer-brand">
            <a href="#nm-top" className="nm-wordmark">nonatto<span>.</span></a>
            <p>Comer bem é um jeito de estar.</p>
          </div>
          <nav className="nm-footer-nav" aria-label="Navegação do rodapé">
            <a href="#nm-discovery">Explorar</a><a href="#nm-manifesto">Nossa curadoria</a><a href="#nm-top">Voltar ao início</a>
          </nav>
          <p className="nm-disclaimer">Protótipo demonstrativo. Os estabelecimentos e as marcas apresentados pertencem aos seus respectivos titulares. Sua exibição não implica parceria, autorização ou afiliação comercial com o Nonatto.</p>
        </div>
        <div className="nm-footer-meta nm-wrap"><span>Curadoria gastronômica · Feito com atenção.</span><span>© Nonatto {new Date().getFullYear()} · Comer é um gesto.</span></div>
      </footer>

      {selected && (
        <div className="nm-modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}>
          <section className="nm-modal" role="dialog" aria-modal="true" aria-labelledby="nm-modal-title">
            <button type="button" className="nm-modal-close" aria-label="Fechar detalhes" onClick={() => setSelected(null)}><X size={18} /></button>
            <div className="nm-kicker">Um nome para descobrir</div>
            <h2 id="nm-modal-title">{selected.name}</h2>
            <div className="nm-modal-note">{selected.note}</div>
            <p>{selected.description}</p>
            <p className="nm-modal-disclaimer">Este perfil faz parte de uma composição demonstrativa. Nenhuma disponibilidade, entrega ou parceria está sendo anunciada.</p>
            <button type="button" className="nm-modal-action" onClick={() => { toggleFavorite(selected.name); setSelected(null); }}>
              {favorites.includes(selected.name) ? <><Check size={14} /> Remover da minha lista</> : <><Heart size={14} /> Guardar na minha lista</>}
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default Marketplace;
