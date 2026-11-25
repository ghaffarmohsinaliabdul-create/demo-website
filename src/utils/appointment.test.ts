import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppUrl,
  formatReadableTime,
  formatWhatsAppAppointmentMessage,
  validateAppointmentForm,
} from './appointment';

test('validateAppointmentForm rejects empty required fields', () => {
  const result = validateAppointmentForm(
    {
      patientName: '',
      phoneNumber: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
    },
    '2026-11-23'
  );

  assert.equal(result.isValid, false);
  assert.ok(result.errors.patientName);
  assert.ok(result.errors.phoneNumber);
  assert.ok(result.errors.preferredDate);
  assert.ok(result.errors.preferredTime);
  assert.equal(result.errors.message, undefined);
});

test('validateAppointmentForm rejects invalid phone numbers and past dates', () => {
  const result = validateAppointmentForm(
    {
      patientName: 'Amina Tariq',
      phoneNumber: '12345',
      preferredDate: '2026-11-20',
      preferredTime: '14:30',
      message: '',
    },
    '2026-11-23'
  );

  assert.equal(result.isValid, false);
  assert.ok(result.errors.phoneNumber);
  assert.ok(result.errors.preferredDate);
  assert.equal(result.errors.patientName, undefined);
  assert.equal(result.errors.preferredTime, undefined);
});

test('validateAppointmentForm accepts valid Pakistani mobile numbers and today/future dates', () => {
  const result = validateAppointmentForm(
    {
      patientName: 'Bilal Ahmed',
      phoneNumber: '+92 321 2132497',
      preferredDate: '2026-11-23',
      preferredTime: '18:00',
      message: 'General consultation inquiry',
    },
    '2026-11-23'
  );

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('formatWhatsAppAppointmentMessage formats all details cleanly and omits empty optional note', () => {
  const withoutNote = formatWhatsAppAppointmentMessage({
    patientName: 'Sanaullah Khan',
    phoneNumber: '0300 1234567',
    preferredDate: '2026-11-25',
    preferredTime: '09:15',
    message: '   ',
  });

  assert.match(withoutNote, /Patient Name: Sanaullah Khan/);
  assert.match(withoutNote, /Phone Number: 0300 1234567/);
  assert.match(withoutNote, /Preferred Time: 9:15 AM/);
  assert.doesNotMatch(withoutNote, /Message:/);

  const withNote = formatWhatsAppAppointmentMessage({
    patientName: 'Sanaullah Khan',
    phoneNumber: '0300 1234567',
    preferredDate: '2026-11-25',
    preferredTime: '21:45',
    message: 'Need evening checkup',
  });
  assert.match(withNote, /Preferred Time: 9:45 PM/);
  assert.match(withNote, /Message: Need evening checkup/);
  assert.match(withNote, /Please confirm my appointment\.$/);
});

test('buildWhatsAppUrl constructs proper wa.me URL for clinic number', () => {
  const url = buildWhatsAppUrl('Assalam-o-Alaikum, I would like to get information about Al-Shifa Clinic.');
  assert.ok(url.startsWith('https://wa.me/923212132497?text='));
  assert.ok(url.includes('Al-Shifa%20Clinic'));
});

test('formatReadableTime handles midnight and noon accurately', () => {
  assert.equal(formatReadableTime('00:05'), '12:05 AM');
  assert.equal(formatReadableTime('12:00'), '12:00 PM');
  assert.equal(formatReadableTime('15:30'), '3:30 PM');
});
