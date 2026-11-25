import { MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicConfig';
import { buildWhatsAppUrl } from '../utils/appointment';

export function FloatingWhatsApp() {
  const whatsappHref = buildWhatsAppUrl(CLINIC_INFO.defaultWhatsAppMessage);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Al-Shifa Clinic on WhatsApp"
      className="fixed right-4 bottom-4 z-30 inline-flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-[#087F5B] text-sm font-semibold text-white shadow-lg ring-1 ring-white/20 transition-transform duration-150 hover:scale-[1.03] hover:bg-[#064E3B] sm:right-6 sm:bottom-6 sm:w-auto sm:px-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="hidden whitespace-nowrap sm:inline">WhatsApp</span>
    </a>
  );
}
