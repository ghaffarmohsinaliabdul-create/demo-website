import { Clock, HeartHandshake, MapPin } from 'lucide-react';
import { CLINIC_IMAGES } from '../data/clinicConfig';
import { ResilientImage } from './ResilientImage';

const ABOUT_FEATURES = [
  {
    title: 'Patient-Focused Care',
    description: 'Attentive, respectful support centered around your comfort and clarity.',
    icon: HeartHandshake,
  },
  {
    title: 'Convenient Location',
    description: 'Situated on Al-Shifa St in Gazdarabad Marwaari Lines, Karachi.',
    icon: MapPin,
  },
  {
    title: '24/7 Availability',
    description: 'Accessible around the clock from Monday through Sunday.',
    icon: Clock,
  },
] as const;

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex lg:col-span-6">
            <div className="w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-[#F0FDF4] shadow-sm min-h-[280px] sm:min-h-[360px]">
              <ResilientImage
                src={CLINIC_IMAGES.aboutReception}
                alt="Clean and welcoming reception lounge at Al-Shifa Clinic"
                fallbackTitle="Al-Shifa Clinic Reception"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="font-display text-sm font-semibold text-[#087F5B]">About Us</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl text-balance">
              Welcome to Al-Shifa Clinic
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#6B7280] sm:text-lg">
              Al-Shifa Clinic is dedicated to making healthcare accessible and convenient. We aim to
              provide a welcoming environment where patients can seek medical assistance whenever
              they need it.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {ABOUT_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-[#087F5B]/15 bg-[#F0FDF4]/70 p-4 transition-colors duration-150 hover:bg-[#F0FDF4]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#087F5B] shadow-xs">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-3 font-display text-sm font-semibold text-[#1F2937]">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
