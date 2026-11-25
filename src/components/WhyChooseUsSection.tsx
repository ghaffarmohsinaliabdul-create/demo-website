import { CalendarDays, Clock, MapPin, MessageCircle } from 'lucide-react';

const REASONS = [
  {
    title: 'Open 24 Hours',
    description: 'Healthcare assistance available around the clock.',
    icon: Clock,
  },
  {
    title: 'Available Every Day',
    description: 'Open seven days a week for your convenience.',
    icon: CalendarDays,
  },
  {
    title: 'Convenient Location',
    description: 'Located in Gazdarabad Marwaari Lines, Karachi.',
    icon: MapPin,
  },
  {
    title: 'Easy Communication',
    description: 'Contact the clinic quickly through WhatsApp.',
    icon: MessageCircle,
  },
] as const;

export function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold text-[#087F5B]">Patient Care</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl text-balance">
            Why Patients Choose Al-Shifa Clinic
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#087F5B]/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#087F5B]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#1F2937]">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
