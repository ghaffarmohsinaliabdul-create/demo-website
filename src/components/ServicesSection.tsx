import { ArrowRight, ClipboardList, HandHeart, HeartPulse, Stethoscope } from 'lucide-react';
import { PLACEHOLDER_SERVICES, type ServiceCategoryItem } from '../data/clinicConfig';

interface ServicesSectionProps {
  onSelectService: (service: ServiceCategoryItem) => void;
}

const ICON_MAP = {
  stethoscope: Stethoscope,
  'heart-pulse': HeartPulse,
  'hand-heart': HandHeart,
  'clipboard-list': ClipboardList,
} as const;

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="bg-[#F0FDF4] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold text-[#087F5B]">Healthcare Assistance</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl text-balance">
            Our Healthcare Services
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#6B7280] sm:text-lg">
            Explore the healthcare assistance available at Al-Shifa Clinic.
          </p>
          <p className="mt-2 text-xs text-[#6B7280]">
            General service categories shown as editable placeholders until specific clinic
            offerings are confirmed.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLACEHOLDER_SERVICES.map((service) => {
            const Icon = ICON_MAP[service.iconName];
            return (
              <article
                key={service.id}
                className="flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#087F5B]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-[#1F2937]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    aria-label={`Learn more about ${service.title}`}
                    className="group inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-[#087F5B] transition-colors hover:text-[#064E3B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
                  >
                    <span>Learn More</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
