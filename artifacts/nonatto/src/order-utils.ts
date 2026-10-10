export const RESERVATION_LEAD_MINUTES = 210;
const leadTime = RESERVATION_LEAD_MINUTES * 60_000;

export function localDateTime(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function earliestReservation(now = new Date()): string {
  return localDateTime(new Date(Math.ceil((now.getTime() + leadTime) / 60_000) * 60_000));
}

export function validateReservation(value: string, now = new Date()): string | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return 'Escolha a data e o horário de chegada.';
  const arrival = new Date(value);
  if (!Number.isFinite(arrival.getTime()) || localDateTime(arrival) !== value) return 'Escolha uma data e um horário válidos.';
  if (arrival.getTime() - now.getTime() < leadTime) return 'A reserva precisa de pelo menos 3h30 de antecedência.';
  return null;
}
