import { useState } from 'react';
import { HeartPulse } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
  priority?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  priority = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F0FDF4] via-white to-[#DCFCE7] p-8 text-center ${className}`}
      >
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#087F5B]/10 text-[#087F5B]">
          <HeartPulse className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="font-display text-base font-semibold text-[#064E3B]">{fallbackTitle}</p>
        <p className="mt-1 text-sm text-[#6B7280]">Al-Shifa Clinic · Karachi</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
