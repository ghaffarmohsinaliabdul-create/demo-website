import { Clock, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicConfig';
import { buildWhatsAppUrl } from '../utils/appointment';

export function AvailabilityBanner() {
  const whatsappHref = buildWhatsAppUrl(CLINIC_INFO.defaultWhatsAppMessage);

  return (
    <section
      aria-label="24/7 Clinic Availability"
      className="bg-[#064E3B] py-14 text-white sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto inline-flex items-center gap-2 text-sm font-medium text-[#DCFCE7]">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="tabular-nums">{CLINIC_INFO.openingHoursCombined}</span>
        </div>

        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
          Healthcare Access, Anytime You Need It.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-emerald-100 sm:text-lg">
          Al-Shifa Clinic is open 24 hours a day, seven days a week.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#064E3B] shadow-md transition-colors duration-150 hover:bg-[#F0FDF4] sm:text-base whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle className="h-5 w-5 shrink-0 text-[#087F5B]" aria-hidden="true" />
            <span>Contact Clinic on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
