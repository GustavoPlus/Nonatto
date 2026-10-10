import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import '../nonatto.css';

const links = [
  { href: '/', label: 'Pedir' },
  { href: '/sobre-nos', label: 'Sobre nós' },
  { href: '/parcerias', label: 'Parcerias' },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setOpen(false);
  }, [location]);
  const cur = (h: string) => (location === h ? 'page' : undefined);
  return (
    <div className="nm-marketplace">
      <div className="nm-topline">Uma seleção pequena. Uma noite que fica.</div>
      <header className="nm-header nm-wrap">
        <Link href="/" className="nm-wordmark" aria-label="Nonatto, início">nonatto<span>.</span></Link>
        <nav className="nm-nav" aria-label="Navegação principal">
          {links.map(l => <Link key={l.href} href={l.href} aria-current={cur(l.href)}>{l.label}</Link>)}
        </nav>
        <button type="button" className="nm-burger" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="nm-mobile-nav" onClick={() => setOpen(v => !v)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>
      {open && (
        <nav id="nm-mobile-nav" className="nm-mobile-nav nm-wrap" aria-label="Navegação principal móvel">
          {links.map(l => <Link key={l.href} href={l.href} aria-current={cur(l.href)} onClick={() => setOpen(false)}>{l.label}</Link>)}
        </nav>
      )}
      {children}
      <footer className="nm-footer" id="nm-footer">
        <div className="nm-footer-main nm-wrap">
          <div className="nm-footer-brand">
            <Link href="/" className="nm-wordmark">nonatto<span>.</span></Link>
            <p>Comer bem é um jeito de estar.</p>
          </div>
          <nav className="nm-footer-nav" aria-label="Navegação do rodapé">
            {links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
          </nav>
          <p className="nm-disclaimer">Protótipo demonstrativo. Os estabelecimentos e as marcas apresentados pertencem aos seus respectivos titulares. Sua exibição não implica parceria, autorização ou afiliação comercial com o Nonatto.</p>
        </div>
        <div className="nm-footer-meta nm-wrap"><span>Natal, RN</span><span>© Nonatto {new Date().getFullYear()}</span></div>
      </footer>
    </div>
  );
}
