import { CLINIC_INFO } from '../data/clinicConfig';

export interface AppointmentFormValues {
  patientName: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface AppointmentValidationErrors {
  patientName?: string;
  phoneNumber?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export interface AppointmentValidationResult {
  isValid: boolean;
  errors: AppointmentValidationErrors;
}

export function buildWhatsAppUrl(
  message: string = CLINIC_INFO.defaultWhatsAppMessage,
  whatsappDigits: string = CLINIC_INFO.whatsappDigits
): string {
  const cleanDigits = whatsappDigits.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanDigits}?text=${encodedMessage}`;
}

export function getTodayIsoDate(referenceDate: Date = new Date()): string {
  const year = referenceDate.getFullYear();
  const month = String(referenceDate.getMonth() + 1).padStart(2, '0');
  const day = String(referenceDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function normalizePhoneDigits(rawPhone: string): string {
  return rawPhone.replace(/[^\d+]/g, '');
}

export function validateAppointmentForm(
  values: AppointmentFormValues,
  todayIso: string = getTodayIsoDate()
): AppointmentValidationResult {
  const errors: AppointmentValidationErrors = {};

  const trimmedName = values.patientName.trim();
  if (!trimmedName) {
    errors.patientName = 'Please enter the patient name.';
  } else if (trimmedName.length < 2) {
    errors.patientName = 'Patient name must be at least 2 characters.';
  } else if (trimmedName.length > 100) {
    errors.patientName = 'Patient name must be under 100 characters.';
  }

  const trimmedPhone = values.phoneNumber.trim();
  const digitCount = trimmedPhone.replace(/\D/g, '').length;
  if (!trimmedPhone) {
    errors.phoneNumber = 'Please enter a valid phone or WhatsApp number.';
  } else if (!/^[+\d\s()-]+$/.test(trimmedPhone) || digitCount < 10 || digitCount > 15) {
    errors.phoneNumber = 'Enter a valid phone number (10 to 15 digits, e.g. 0321 2132497).';
  }

  const trimmedDate = values.preferredDate.trim();
  if (!trimmedDate) {
    errors.preferredDate = 'Please select a preferred date.';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmedDate)) {
    errors.preferredDate = 'Please enter a valid date.';
  } else if (trimmedDate < todayIso) {
    errors.preferredDate = 'Preferred date cannot be in the past.';
  }

  const trimmedTime = values.preferredTime.trim();
  if (!trimmedTime) {
    errors.preferredTime = 'Please select a preferred time.';
  } else if (!/^\d{2}:\d{2}$/.test(trimmedTime)) {
    errors.preferredTime = 'Please enter a valid time.';
  }

  if (values.message.trim().length > 600) {
    errors.message = 'Message must be 600 characters or fewer.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatReadableDate(isoDate: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return isoDate;
  }
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-PK', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatReadableTime(time24: string): string {
  if (!/^\d{2}:\d{2}$/.test(time24)) {
    return time24;
  }
  const [hoursRaw, minutes] = time24.split(':').map(Number);
  const period = hoursRaw >= 12 ? 'PM' : 'AM';
  const hours12 = hoursRaw % 12 === 0 ? 12 : hoursRaw % 12;
  return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
}

export function formatWhatsAppAppointmentMessage(values: AppointmentFormValues): string {
  const lines = [
    'Assalam-o-Alaikum, I would like to request an appointment at Al-Shifa Clinic.',
    '',
    `Patient Name: ${values.patientName.trim()}`,
    `Phone Number: ${values.phoneNumber.trim()}`,
    `Preferred Date: ${formatReadableDate(values.preferredDate.trim())}`,
    `Preferred Time: ${formatReadableTime(values.preferredTime.trim())}`,
  ];

  const optionalMessage = values.message.trim();
  if (optionalMessage) {
    lines.push(`Message: ${optionalMessage}`);
  }

  lines.push('', 'Please confirm my appointment.');
  return lines.join('\n');
}
