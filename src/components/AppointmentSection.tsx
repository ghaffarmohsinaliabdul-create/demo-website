import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Calendar, CheckCircle2, Clock, MessageCircle, Phone, User } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicConfig';
import {
  buildWhatsAppUrl,
  formatWhatsAppAppointmentMessage,
  getTodayIsoDate,
  validateAppointmentForm,
  type AppointmentFormValues,
  type AppointmentValidationErrors,
} from '../utils/appointment';

interface AppointmentSectionProps {
  selectedInquiryTopic: string;
  selectionNonce: number;
}

export function AppointmentSection({
  selectedInquiryTopic,
  selectionNonce,
}: AppointmentSectionProps) {
  const [values, setValues] = useState<AppointmentFormValues>({
    patientName: '',
    phoneNumber: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });
  const [errors, setErrors] = useState<AppointmentValidationErrors>({});
  const [submittedState, setSubmittedState] = useState<{
    whatsappUrl: string;
    formattedMessage: string;
  } | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const statusCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectionNonce > 0 && selectedInquiryTopic) {
      setValues((prev) => ({
        ...prev,
        message: selectedInquiryTopic,
      }));
      setSubmittedState(null);
    }
  }, [selectedInquiryTopic, selectionNonce]);

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

    requestAnimationFrame(() => {
      statusCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      const externalLink = document.createElement('a');
      externalLink.href = whatsappUrl;
      externalLink.target = '_blank';
      externalLink.rel = 'noopener noreferrer';
      externalLink.click();
    });
  };

  return (
    <section id="book-appointment" className="bg-[#F0FDF4] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-display text-sm font-semibold text-[#087F5B]">Appointments</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl text-balance">
            Book Your Appointment
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-[#6B7280] sm:text-lg">
            Get in touch with Al-Shifa Clinic to request an appointment.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-10">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="patient-name"
                  className="block text-sm font-semibold text-[#1F2937]"
                >
                  Patient Name <span className="text-[#087F5B]">*</span>
                </label>
                <div className="relative mt-2">
                  <User
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                    aria-hidden="true"
                  />
                  <input
                    ref={nameInputRef}
                    id="patient-name"
                    name="patientName"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Full name"
                    value={values.patientName}
                    onChange={(e) => handleFieldChange('patientName', e.target.value)}
                    aria-invalid={Boolean(errors.patientName)}
                    aria-describedby={errors.patientName ? 'patient-name-error' : undefined}
                    className={`min-h-[46px] w-full rounded-xl border bg-white py-2.5 pr-4 pl-10 text-sm text-[#1F2937] placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                      errors.patientName
                        ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                        : 'border-gray-300 focus:border-[#087F5B] focus:ring-[#087F5B]/20'
                    }`}
                  />
                </div>
                {errors.patientName && (
                  <p id="patient-name-error" role="alert" className="mt-1.5 text-xs text-red-600">
                    {errors.patientName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold text-[#1F2937]"
                >
                  Phone Number <span className="text-[#087F5B]">*</span>
                </label>
                <div className="relative mt-2">
                  <Phone
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                    aria-hidden="true"
                  />
                  <input
                    ref={phoneInputRef}
                    id="phone-number"
                    name="phoneNumber"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="e.g. 0300 1234567"
                    value={values.phoneNumber}
                    onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                    aria-invalid={Boolean(errors.phoneNumber)}
                    aria-describedby={errors.phoneNumber ? 'phone-number-error' : undefined}
                    className={`min-h-[46px] w-full rounded-xl border bg-white py-2.5 pr-4 pl-10 text-sm text-[#1F2937] placeholder:text-gray-400 tabular-nums transition-colors focus:outline-none focus:ring-2 ${
                      errors.phoneNumber
                        ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                        : 'border-gray-300 focus:border-[#087F5B] focus:ring-[#087F5B]/20'
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p id="phone-number-error" role="alert" className="mt-1.5 text-xs text-red-600">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="preferred-date"
                  className="block text-sm font-semibold text-[#1F2937]"
                >
                  Preferred Date <span className="text-[#087F5B]">*</span>
                </label>
                <div className="relative mt-2">
                  <Calendar
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                    aria-hidden="true"
                  />
                  <input
                    ref={dateInputRef}
                    id="preferred-date"
                    name="preferredDate"
                    type="date"
                    required
                    min={todayIso}
                    value={values.preferredDate}
                    onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
                    aria-invalid={Boolean(errors.preferredDate)}
                    aria-describedby={errors.preferredDate ? 'preferred-date-error' : undefined}
                    className={`min-h-[46px] w-full rounded-xl border bg-white py-2.5 pr-4 pl-10 text-sm text-[#1F2937] tabular-nums transition-colors focus:outline-none focus:ring-2 ${
                      errors.preferredDate
                        ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                        : 'border-gray-300 focus:border-[#087F5B] focus:ring-[#087F5B]/20'
                    }`}
                  />
                </div>
                {errors.preferredDate && (
                  <p
                    id="preferred-date-error"
                    role="alert"
                    className="mt-1.5 text-xs text-red-600"
                  >
                    {errors.preferredDate}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="preferred-time"
                  className="block text-sm font-semibold text-[#1F2937]"
                >
                  Preferred Time <span className="text-[#087F5B]">*</span>
                </label>
                <div className="relative mt-2">
                  <Clock
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                    aria-hidden="true"
                  />
                  <input
                    ref={timeInputRef}
                    id="preferred-time"
                    name="preferredTime"
                    type="time"
                    required
                    value={values.preferredTime}
                    onChange={(e) => handleFieldChange('preferredTime', e.target.value)}
                    aria-invalid={Boolean(errors.preferredTime)}
                    aria-describedby={errors.preferredTime ? 'preferred-time-error' : undefined}
                    className={`min-h-[46px] w-full rounded-xl border bg-white py-2.5 pr-4 pl-10 text-sm text-[#1F2937] tabular-nums transition-colors focus:outline-none focus:ring-2 ${
                      errors.preferredTime
                        ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                        : 'border-gray-300 focus:border-[#087F5B] focus:ring-[#087F5B]/20'
                    }`}
                  />
                </div>
                {errors.preferredTime && (
                  <p
                    id="preferred-time-error"
                    role="alert"
                    className="mt-1.5 text-xs text-red-600"
                  >
                    {errors.preferredTime}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="appointment-message"
                className="block text-sm font-semibold text-[#1F2937]"
              >
                Message (Optional)
              </label>
              <textarea
                id="appointment-message"
                name="message"
                rows={3}
                placeholder="Share any brief reason for your visit or question for the clinic"
                value={values.message}
                onChange={(e) => handleFieldChange('message', e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'appointment-message-error' : undefined}
                className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1F2937] placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                  errors.message
                    ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                    : 'border-gray-300 focus:border-[#087F5B] focus:ring-[#087F5B]/20'
                }`}
              />
              {errors.message && (
                <p
                  id="appointment-message-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-600"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start justify-between gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center">
              <p className="text-xs leading-relaxed text-[#6B7280]">
                Requests open directly in WhatsApp ({CLINIC_INFO.whatsappInternationalDisplay}) and
                must be confirmed by the clinic.
              </p>

              <button
                type="submit"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#087F5B] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#064E3B] sm:w-auto whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Send Appointment Request</span>
              </button>
            </div>
          </form>

          {submittedState && (
            <div
              ref={statusCardRef}
              role="status"
              aria-live="polite"
              className="mt-6 rounded-2xl border border-[#087F5B]/25 bg-[#F0FDF4] p-5"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#087F5B]"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold text-[#064E3B]">
                    Appointment Request Prepared for WhatsApp
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#1F2937]">
                    Please send the pre-filled message in WhatsApp. Your appointment is{' '}
                    <span className="font-semibold">not confirmed yet</span>—the Al-Shifa Clinic
                    team must confirm availability directly with you through WhatsApp.
                  </p>

                  <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl border border-[#087F5B]/15 bg-white p-3 font-sans text-xs leading-relaxed text-[#1F2937]">
                    {submittedState.formattedMessage}
                  </pre>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={submittedState.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#087F5B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#064E3B]"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Open WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
