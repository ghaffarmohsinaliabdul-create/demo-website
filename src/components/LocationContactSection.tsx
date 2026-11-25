import { Building2, Clock, MapPin, MessageCircle, Navigation } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicConfig';
import { buildWhatsAppUrl } from '../utils/appointment';

export function LocationContactSection() {
  const whatsappHref = buildWhatsAppUrl(CLINIC_INFO.defaultWhatsAppMessage);

  return (
    <section id="contact" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold text-[#087F5B]">Location & Contact</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl text-balance">
            Visit Al-Shifa Clinic
          </h2>
          <p className="mt-3 text-base text-[#6B7280] sm:text-lg">
            Reach us easily in Gazdarabad Marwaari Lines, Karachi, or connect via WhatsApp and
            phone anytime.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-2xl border border-gray-200/80 bg-[#F0FDF4]/50 p-5">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#087F5B] shadow-xs">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6B7280]">Clinic Name</p>
                    <p className="mt-0.5 font-display text-base font-semibold text-[#1F2937]">
                      {CLINIC_INFO.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200/80 bg-[#F0FDF4]/50 p-5">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#087F5B] shadow-xs">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6B7280]">Address</p>
                    <p className="mt-0.5 text-sm font-medium leading-relaxed text-[#1F2937]">
                      {CLINIC_INFO.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="rounded-2xl border border-gray-200/80 bg-[#F0FDF4]/50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#087F5B] shadow-xs">
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#6B7280]">WhatsApp</p>
                      <p className="mt-0.5 font-display text-sm font-semibold text-[#1F2937] tabular-nums">
                        {CLINIC_INFO.whatsappDisplay}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200/80 bg-[#F0FDF4]/50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#087F5B] shadow-xs">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#6B7280]">Opening Hours</p>
                      <p className="mt-0.5 text-sm font-semibold text-[#1F2937]">
                        {CLINIC_INFO.openingHoursDays}
                      </p>
                      <p className="text-xs font-medium text-[#087F5B] tabular-nums">
                        {CLINIC_INFO.openingHoursStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#087F5B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#064E3B] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={CLINIC_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#087F5B]/30 bg-[#F0FDF4] px-5 py-3 text-sm font-semibold text-[#064E3B] transition-colors hover:bg-[#DCFCE7] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
              >
                <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          <div className="flex lg:col-span-7">
            <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-[#F0FDF4]/40 shadow-sm min-h-[340px] sm:min-h-[420px]">
              <iframe
                title="Al-Shifa Clinic location on Google Maps"
                src={CLINIC_INFO.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[340px] w-full flex-1 border-0 sm:min-h-[420px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
