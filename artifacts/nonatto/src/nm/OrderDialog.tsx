import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Minus, Plus, X } from 'lucide-react';
import type { Restaurant } from '../catalog';
import { earliestReservation, validateReservation } from '../order-utils';

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
type Step = 'menu' | 'checkout' | 'done';

export function OrderDialog({ restaurant, onClose }: { restaurant: Restaurant; onClose: () => void }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [step, setStep] = useState<Step>('menu');
  const [mode, setMode] = useState<'now' | 'reserve'>('now');
  const [when, setWhen] = useState(() => earliestReservation());
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState('');
  const [minimumArrival, setMinimumArrival] = useState(() => earliestReservation());
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      const elements = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input, a[href]') ?? []);
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    const timer = window.setInterval(() => setMinimumArrival(earliestReservation()), 30_000);
    window.addEventListener('keydown', k);
    return () => {
      window.removeEventListener('keydown', k);
      window.clearInterval(timer);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  const lines = useMemo(() => restaurant.items.filter(i => (qty[i.id] ?? 0) > 0), [restaurant, qty]);
  const total = lines.reduce((s, i) => s + i.price * (qty[i.id] ?? 0), 0);
  const count = lines.reduce((s, i) => s + (qty[i.id] ?? 0), 0);
  const change = (id: string, d: number) => setQty(q => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + d) }));

  const confirm = () => {
    if (count === 0) { setStep('menu'); return; }
    if (mode === 'reserve') {
      const err = validateReservation(when, new Date());
      if (err) { setError(err); return; }
      setResult(`Chegada em ${new Date(when).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}`);
    } else setResult('Pedido imediato');
    setError(null);
    setStep('done');
  };

  return (
    <div className="nm-modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <section ref={dialogRef} className="nm-modal nm-order" role="dialog" aria-modal="true" aria-labelledby="nm-order-title">
        <button type="button" className="nm-modal-close" aria-label="Fechar" onClick={onClose}><X size={18} /></button>
        <div className="nm-kicker">{restaurant.name}</div>
        <h2 id="nm-order-title">{step === 'menu' ? 'Cardápio' : step === 'checkout' ? 'Finalizar' : 'Resumo'}</h2>

        {step === 'menu' && (<>
          <p className="nm-fine" style={{ marginTop: 6 }}>Cardápio e valores ilustrativos</p>
          <div>{restaurant.items.map(i => (
            <div className="nm-item" key={i.id}>
              <div><b>{i.name}</b><span>{i.description}</span><span>{brl(i.price)}</span></div>
              <div className="nm-qty">
                <button type="button" aria-label={`Remover ${i.name}`} disabled={!(qty[i.id] > 0)} onClick={() => change(i.id, -1)}><Minus size={14} /></button>
                <span aria-live="polite" style={{ minWidth: 14, textAlign: 'center' }}>{qty[i.id] ?? 0}</span>
                <button type="button" aria-label={`Adicionar ${i.name}`} onClick={() => change(i.id, 1)}><Plus size={14} /></button>
              </div>
            </div>))}
          </div>
          <div className="nm-total"><span>{count} {count === 1 ? 'item' : 'itens'}</span><span>{brl(total)}</span></div>
          <button type="button" className="nm-modal-action" disabled={count === 0} style={count === 0 ? { opacity: .45 } : undefined} onClick={() => setStep('checkout')}>Continuar</button>
        </>)}

        {step === 'checkout' && (<>
          <div style={{ marginTop: 12 }}>{lines.map(i => <div className="nm-item" key={i.id}><b>{qty[i.id]} × {i.name}</b><span>{brl(i.price * qty[i.id])}</span></div>)}</div>
          <div className="nm-total"><span>Total</span><span>{brl(total)}</span></div>
          <div className="nm-radio" role="group" aria-label="Quando">
            <button type="button" className="nm-chip" aria-pressed={mode === 'now'} onClick={() => { setMode('now'); setError(null); }}>Pedido imediato</button>
            <button type="button" className="nm-chip" aria-pressed={mode === 'reserve'} onClick={() => { setMode('reserve'); setWhen(earliestReservation()); }}>Reserva</button>
          </div>
          {mode === 'reserve' && (
            <label className="nm-field">Data e hora de chegada
              <input type="datetime-local" value={when} min={minimumArrival} onChange={e => { setWhen(e.target.value); setError(null); }} />
              <span className="nm-fine">Antecedência mínima de 3h30.</span>
            </label>)}
          {error && <p className="nm-error" role="alert">{error}</p>}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button type="button" className="nm-modal-action" onClick={confirm}>Confirmar</button>
            <button type="button" className="nm-card-link" style={{ marginTop: 21 }} onClick={() => setStep('menu')}>Voltar</button>
          </div>
        </>)}

        {step === 'done' && (<>
          <p style={{ marginTop: 12 }}><Check size={14} style={{ verticalAlign: -2 }} /> {result} · {restaurant.name} · {count} {count === 1 ? 'item' : 'itens'} · {brl(total)}</p>
          <div className="nm-notice" role="status">Demonstração: nada foi enviado, cobrado ou reservado.</div>
          <button type="button" className="nm-modal-action" onClick={onClose}>Fechar</button>
        </>)}
      </section>
    </div>
  );
}
