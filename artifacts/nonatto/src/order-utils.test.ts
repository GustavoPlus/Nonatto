import { test } from 'node:test';
import assert from 'node:assert/strict';
import { earliestReservation, localDateTime, validateReservation } from './order-utils';

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
test('accepts minimum selectable date and later dates', () => {
  assert.equal(validateReservation(earliestReservation(now), now), null);
  assert.equal(validateReservation('2026-10-12T15:00', now), null);
});
test('validates again against actual submission time', () => {
  const arrival = earliestReservation(now);
  assert.ok(validateReservation(arrival, new Date(now.getTime() + 60_000)));
});
test('formats local time without UTC conversion', () => {
  assert.equal(localDateTime(now), '2026-10-10T20:45');
});
