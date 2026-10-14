export const RESERVATION_LEAD_MINUTES = 210;
export const RESERVATION_MAX_DAYS = 7;
const leadTime = RESERVATION_LEAD_MINUTES * 60_000;
const maximumAdvance = RESERVATION_MAX_DAYS * 24 * 60 * 60_000;
export const DELIVERY_FEES = [50, 60, 70, 80, 90, 100] as const;

export function localDateTime(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function earliestReservation(now = new Date()): string {
  return localDateTime(new Date(Math.ceil((now.getTime() + leadTime) / 60_000) * 60_000));
}

export function latestReservation(now = new Date()): string {
  return localDateTime(new Date(Math.floor((now.getTime() + maximumAdvance) / 60_000) * 60_000));
}

export function randomDeliveryFee(random: () => number = Math.random): number {
  const index = Math.max(0, Math.min(Math.floor(random() * DELIVERY_FEES.length), DELIVERY_FEES.length - 1));
  return DELIVERY_FEES[index];
}

export function validateReservation(value: string, now = new Date()): string | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return 'Escolha a data e o horário de chegada.';
  const arrival = new Date(value);
  if (!Number.isFinite(arrival.getTime()) || localDateTime(arrival) !== value) return 'Escolha uma data e um horário válidos.';
  if (arrival.getTime() - now.getTime() < leadTime) return 'A reserva precisa de pelo menos 3h30 de antecedência.';
  if (arrival.getTime() - now.getTime() > maximumAdvance) return 'A reserva pode ser feita para até 7 dias.';
  return null;
}
