interface ClinicLogoProps {
  variant?: 'light' | 'dark';
}

export function ClinicLogo({ variant = 'light' }: ClinicLogoProps) {
  const isDarkSurface = variant === 'dark';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
          isDarkSurface
            ? 'bg-white/12 text-white ring-1 ring-white/20'
            : 'bg-[#087F5B] text-white shadow-sm'
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4.5C10 3.67157 10.6716 3 11.5 3H12.5C13.3284 3 14 3.67157 14 4.5V10H19.5C20.3284 10 21 10.6716 21 11.5V12.5C21 13.3284 20.3284 14 19.5 14H14V19.5C14 20.3284 13.3284 21 12.5 21H11.5C10.6716 21 10 20.3284 10 19.5V14H4.5C3.67157 14 3 13.3284 3 12.5V11.5C3 10.6716 3.67157 10 4.5 10H10V4.5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span
        className={`font-display text-lg font-bold tracking-tight whitespace-nowrap shrink-0 ${
          isDarkSurface ? 'text-white' : 'text-[#1F2937]'
        }`}
      >
        Al-Shifa Clinic
      </span>
    </span>
  );
}
