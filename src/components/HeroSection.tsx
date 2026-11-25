import { CalendarCheck, Clock, MessageCircle, Star } from 'lucide-react';
import { CLINIC_IMAGES, CLINIC_INFO } from '../data/clinicConfig';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onOpenAppointmentModal: () => void;
}

export function HeroSection({ onOpenAppointmentModal }: HeroSectionProps) {

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#F0FDF4]/80 via-[#F0FDF4]/30 to-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="font-display text-sm font-semibold tracking-wide text-[#087F5B]">
              Your Health, Our Priority
            </p>

            <h1 className="mt-3 font-display text-[clamp(2.15rem,4vw,3.35rem)] font-bold leading-[1.12] tracking-tight text-[#1F2937] text-balance">
              Quality Healthcare, Care You Can Trust.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#6B7280] sm:text-lg">
              At Al-Shifa Clinic, we are committed to providing accessible healthcare in a welcoming
              environment. Your health and well-being always come first.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <button
                type="button"
                onClick={onOpenAppointmentModal}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#087F5B] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#064E3B] sm:text-base whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Book an Appointment</span>
              </button>

              <a
                href="#contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-[#1F2937] transition-colors duration-150 hover:border-[#087F5B] hover:text-[#087F5B] sm:text-base whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
              >
                Contact Us
              </a>
            </div>

            <dl className="mt-9 grid grid-cols-1 gap-3 border-t border-gray-200/80 pt-6 sm:grid-cols-3 sm:gap-4">
              <div className="flex items-center gap-2.5 text-sm text-[#1F2937]">
                <Clock className="h-4 w-4 shrink-0 text-[#087F5B]" aria-hidden="true" />
                <dd className="font-medium tabular-nums">Open 24 Hours</dd>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#1F2937]">
                <CalendarCheck className="h-4 w-4 shrink-0 text-[#087F5B]" aria-hidden="true" />
                <dd className="font-medium tabular-nums">7 Days a Week</dd>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#1F2937]">
                <Star className="h-4 w-4 shrink-0 fill-[#087F5B] text-[#087F5B]" aria-hidden="true" />
                <dd className="font-medium tabular-nums">
                  {CLINIC_INFO.googleRating}/5 Google Rating
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex lg:col-span-6">
            <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-lg min-h-[290px] sm:min-h-[380px] lg:min-h-[450px]">
              <ResilientImage
                src={CLINIC_IMAGES.heroConsultation}
                alt="Clinician speaking warmly with a patient inside Al-Shifa Clinic"
                fallbackTitle="Welcoming Patient Care"
                priority
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:min-w-[230px] rounded-xl border border-gray-100 bg-white/95 px-4 py-3 shadow-md backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#087F5B]">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-[#1F2937] tabular-nums">
                      Open 24/7
                    </p>
                    <p className="text-xs text-[#6B7280]">Here when you need us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
