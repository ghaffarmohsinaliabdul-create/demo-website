import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar, CheckCircle2, Clock, MessageCircle, Phone, User, X } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicConfig';
import {
  buildWhatsAppUrl,
  formatWhatsAppAppointmentMessage,
  getTodayIsoDate,
  validateAppointmentForm,
  type AppointmentFormValues,
  type AppointmentValidationErrors,
} from '../utils/appointment';
import { ClinicLogo } from './ClinicLogo';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_VALUES: AppointmentFormValues = {
  patientName: '',
  phoneNumber: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
};

export function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [values, setValues] = useState<AppointmentFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<AppointmentValidationErrors>({});
  const [submittedState, setSubmittedState] = useState<{
    whatsappUrl: string;
    formattedMessage: string;
  } | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const focusTimer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  const todayIso = getTodayIsoDate();

  const handleFieldChange = (field: keyof AppointmentFormValues, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateAppointmentForm(values, todayIso);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setSubmittedState(null);
      if (validation.errors.patientName) {
        nameInputRef.current?.focus();
      } else if (validation.errors.phoneNumber) {
        phoneInputRef.current?.focus();
      } else if (validation.errors.preferredDate) {
        dateInputRef.current?.focus();
      } else if (validation.errors.preferredTime) {
        timeInputRef.current?.focus();
      }
      return;
    }

    setErrors({});
    const formattedMessage = formatWhatsAppAppointmentMessage(values);
    const whatsappUrl = buildWhatsAppUrl(formattedMessage);

    setSubmittedState({
      whatsappUrl,
      formattedMessage,
    });

    const externalLink = document.createElement('a');
    externalLink.href = whatsappUrl;
    externalLink.target = '_blank';
    externalLink.rel = 'noopener noreferrer';
    externalLink.click();
  };

  const handleResetAndClose = () => {
    setErrors({});
    setSubmittedState(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="appointment-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="appointment-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleResetAndClose();
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs sm:p-6"
        >
          <motion.div
            key="appointment-modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[18px] border border-gray-100 bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleResetAndClose}
              aria-label="Close appointment popup"
              className="absolute top-4 right-4 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-[#6B7280] transition-colors hover:bg-[#F0FDF4] hover:text-[#087F5B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="pr-10">
              <ClinicLogo variant="light" />
              <h2
                id="appointment-modal-title"
                className="mt-4 font-display text-2xl font-bold tracking-tight text-[#1F2937]"
              >
                Book Your Appointment
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">
                Fill in your details and contact us to request an appointment.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="modal-full-name"
                  className="block text-sm font-semibold text-[#1F2937]"
                >
                  Full Name <span className="text-[#087F5B]">*</span>
                </label>
                <div className="relative mt-1.5">
                  <User
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                    aria-hidden="true"
                  />
                  <input
                    ref={nameInputRef}
                    id="modal-full-name"
                    name="patientName"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={values.patientName}
                    onChange={(e) => handleFieldChange('patientName', e.target.value)}
                    aria-invalid={Boolean(errors.patientName)}
                    aria-describedby={errors.patientName ? 'modal-full-name-error' : undefined}
                    className={`min-h-[44px] w-full rounded-xl border bg-white py-2.5 pr-4 pl-10 text-sm text-[#1F2937] placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                      errors.patientName
                        ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                        : 'border-gray-300 focus:border-[#087F5B] focus:ring-[#087F5B]/20'
                    }`}
                  />
                </div>
                {errors.patientName && (
                  <p id="modal-full-name-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.patientName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="modal-phone-number"
                  className="block text-sm font-semibold text-[#1F2937]"
                >
                  Phone Number <span className="text-[#087F5B]">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Phone
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                    aria-hidden="true"
                  />
                  <input
                    ref={phoneInputRef}
                    id="modal-phone-number"
                    name="phoneNumber"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                    value={values.phoneNumber}
                    onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                    aria-invalid={Boolean(errors.phoneNumber)}
                    aria-describedby={errors.phoneNumber ? 'modal-phone-number-error' : undefined}
                    className={`min-h-[44px] w-full rounded-xl border bg-white py-2.5 pr-4 pl-10 text-sm text-[#1F2937] placeholder:text-gray-400 tabular-nums transition-colors focus:outline-none focus:ring-2 ${
                      errors.phoneNumber
                        ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                        : 'border-gray-300 focus:border-[#087F5B] focus:ring-[#087F5B]/20'
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p
                    id="modal-phone-number-error"
                    role="alert"
                    className="mt-1 text-xs text-red-600"
                  >
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="modal-preferred-date"
                    className="block text-sm font-semibold text-[#1F2937]"
                  >
                    Preferred Date <span className="text-[#087F5B]">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <Calendar
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                      aria-hidden="true"
                    />
                    <input
                      ref={dateInputRef}
                      id="modal-preferred-date"
                      name="preferredDate"
                      type="date"
                      required
                      min={todayIso}
                      value={values.preferredDate}
                      onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
                      aria-invalid={Boolean(errors.preferredDate)}
                      aria-describedby={
                        errors.preferredDate ? 'modal-preferred-date-error' : undefined
                      }
                      className={`min-h-[44px] w-full rounded-xl border bg-white py-2.5 pr-3 pl-10 text-sm text-[#1F2937] tabular-nums transition-colors focus:outline-none focus:ring-2 ${
                        errors.preferredDate
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                          : 'border-gray-300 focus:border-[#087F5B] focus:ring-[#087F5B]/20'
                      }`}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p
                      id="modal-preferred-date-error"
                      role="alert"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="modal-preferred-time"
                    className="block text-sm font-semibold text-[#1F2937]"
                  >
                    Preferred Time <span className="text-[#087F5B]">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <Clock
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                      aria-hidden="true"
                    />
                    <input
                      ref={timeInputRef}
                      id="modal-preferred-time"
                      name="preferredTime"
                      type="time"
                      required
                      value={values.preferredTime}
                      onChange={(e) => handleFieldChange('preferredTime', e.target.value)}
                      aria-invalid={Boolean(errors.preferredTime)}
                      aria-describedby={
                        errors.preferredTime ? 'modal-preferred-time-error' : undefined
                      }
                      className={`min-h-[44px] w-full rounded-xl border bg-white py-2.5 pr-3 pl-10 text-sm text-[#1F2937] tabular-nums transition-colors focus:outline-none focus:ring-2 ${
                        errors.preferredTime
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                          : 'border-gray-300 focus:border-[#087F5B] focus:ring-[#087F5B]/20'
                      }`}
                    />
                  </div>
                  {errors.preferredTime && (
                    <p
                      id="modal-preferred-time-error"
                      role="alert"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.preferredTime}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="modal-message"
                  className="block text-sm font-semibold text-[#1F2937]"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  rows={3}
                  placeholder="Tell us briefly how we can help you"
                  value={values.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'modal-message-error' : undefined}
                  className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-[#1F2937] placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                    errors.message
                      ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                      : 'border-gray-300 focus:border-[#087F5B] focus:ring-[#087F5B]/20'
                  }`}
                />
                {errors.message && (
                  <p id="modal-message-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#087F5B] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#064E3B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Send Appointment Request</span>
              </button>

              <p className="text-center text-xs text-[#6B7280]">
                Requests open WhatsApp ({CLINIC_INFO.whatsappInternationalDisplay}) and must be
                confirmed by the clinic.
              </p>
            </form>

            {submittedState && (
              <div
                role="status"
                aria-live="polite"
                className="mt-5 rounded-2xl border border-[#087F5B]/25 bg-[#F0FDF4] p-4"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#087F5B]"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold text-[#064E3B]">
                      WhatsApp Request Ready
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#1F2937]">
                      Your request is not confirmed yet—please send the message in WhatsApp so
                      Al-Shifa Clinic can confirm your appointment.
                    </p>
                    <a
                      href={submittedState.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl bg-[#087F5B] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#064E3B]"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Open WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
