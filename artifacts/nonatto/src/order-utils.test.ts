import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DELIVERY_FEES, earliestReservation, latestReservation, localDateTime, randomDeliveryFee, validateReservation } from './order-utils';

const now = new Date(2026, 9, 10, 20, 45, 30);
test('earliest arrival rounds up and crosses midnight', () => {
  assert.equal(earliestReservation(now), '2026-10-11T00:16');
});
test('rejects missing and invalid dates', () => {
  assert.ok(validateReservation('', now));
  assert.ok(validateReservation('2026-02-30T12:00', now));
});
test('rejects less than three hours thirty minutes', () => {
  assert.ok(validateReservation('2026-10-11T00:15', now));
});
test('accepts reservations inside the 7-day window', () => {
  assert.equal(validateReservation(earliestReservation(now), now), null);
  assert.equal(validateReservation('2026-10-12T15:00', now), null);
  assert.equal(validateReservation(latestReservation(now), now), null);
});
test('rejects reservations beyond 7 days, including year 3000', () => {
  assert.ok(validateReservation('2026-10-17T20:46', now));
  assert.ok(validateReservation('3000-10-12T15:00', now));
});
test('validates again against actual submission time', () => {
  const arrival = earliestReservation(now);
  assert.ok(validateReservation(arrival, new Date(now.getTime() + 60_000)));
});
test('formats local time without UTC conversion', () => {
  assert.equal(localDateTime(now), '2026-10-10T20:45');
});
test('random delivery fees cover each ten-real step from R$50 to R$100', () => {
  const sampledFees = DELIVERY_FEES.map((_, index) => randomDeliveryFee(() => (index + 0.5) / DELIVERY_FEES.length));
  assert.deepEqual(sampledFees, [50, 60, 70, 80, 90, 100]);
});
