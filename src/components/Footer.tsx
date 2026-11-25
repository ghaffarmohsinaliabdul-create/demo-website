import { Clock, MapPin, MessageCircle } from 'lucide-react';
import { CLINIC_INFO, NAV_ITEMS } from '../data/clinicConfig';
import { buildWhatsAppUrl } from '../utils/appointment';
import { ClinicLogo } from './ClinicLogo';

interface FooterProps {
  onOpenAppointmentModal: () => void;
}

export function Footer({ onOpenAppointmentModal }: FooterProps) {
  const whatsappHref = buildWhatsAppUrl(CLINIC_INFO.defaultWhatsAppMessage);

  return (
    <footer className="bg-[#064E3B] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#home"
              className="inline-block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ClinicLogo variant="dark" />
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-emerald-100">
              {CLINIC_INFO.shortTagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white tabular-nums">
              <Clock className="h-4 w-4 shrink-0 text-emerald-200" aria-hidden="true" />
              <span>{CLINIC_INFO.openingHoursCombined}</span>
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-display text-sm font-semibold text-white">Quick Links</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-emerald-100">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onOpenAppointmentModal}
                  className="text-left transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-display text-sm font-semibold text-white">Contact Information</h2>
            <ul className="mt-4 space-y-3 text-sm text-emerald-100">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" aria-hidden="true" />
                <span>{CLINIC_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 shrink-0 text-emerald-200" aria-hidden="true" />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tabular-nums transition-colors hover:text-white"
                >
                  {CLINIC_INFO.whatsappInternationalDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 text-xs text-emerald-100/90 sm:flex-row sm:items-center">
          <p>© 2026 Al-Shifa Clinic. All Rights Reserved.</p>
          <p className="tabular-nums">{CLINIC_INFO.openingHoursCombined}</p>
        </div>
      </div>
    </footer>
  );
}
