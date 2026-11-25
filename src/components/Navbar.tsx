import { useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/clinicConfig';
import { ClinicLogo } from './ClinicLogo';

interface NavbarProps {
  onOpenAppointmentModal: () => void;
}

export function Navbar({ onOpenAppointmentModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-16 lg:gap-8 lg:px-8">
        <a
          href="#home"
          onClick={() => setMobileMenuOpen(false)}
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
        >
          <ClinicLogo variant="light" />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 md:flex lg:gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 text-sm font-medium text-[#1F2937] transition-colors duration-150 hover:text-[#087F5B] whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#087F5B] after:transition-all after:duration-150 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087F5B]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenAppointmentModal}
            className="hidden md:inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl bg-[#087F5B] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#064E3B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Book Appointment</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-gray-200 text-[#1F2937] transition-colors hover:bg-[#F0FDF4] hover:text-[#087F5B] md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-gray-200 bg-white px-4 py-4 shadow-lg md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-3 text-base font-medium text-[#1F2937] transition-colors hover:bg-[#F0FDF4] hover:text-[#087F5B]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointmentModal();
              }}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#087F5B] px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#064E3B]"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
