import { ExternalLink, Star } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicConfig';

function RatingStars({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div
      className="inline-flex items-center gap-1"
      role="img"
      aria-label={`${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, index) => {
        const fillFraction = Math.max(0, Math.min(1, rating - index));
        const fillPercent = Math.round(fillFraction * 100);

        return (
          <span key={index} className="relative inline-block h-6 w-6">
            <Star
              className="h-6 w-6 text-gray-300 fill-gray-200"
              aria-hidden="true"
            />
            {fillPercent > 0 && (
              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fillPercent}%` }}
              >
                <Star
                  className="h-6 w-6 text-amber-500 fill-amber-400"
                  aria-hidden="true"
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="bg-[#F0FDF4]/60 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200/80 bg-white p-8 text-center shadow-sm sm:p-12">
          <p className="font-display text-sm font-semibold text-[#087F5B]">Verified Feedback</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl">
            What Patients Say
          </h2>

          <div className="mt-8 flex flex-col items-center justify-center">
            <RatingStars rating={CLINIC_INFO.googleRating} max={CLINIC_INFO.googleRatingMax} />

            <div className="mt-4 flex items-baseline justify-center gap-1.5 font-display tabular-nums">
              <span className="text-4xl font-bold text-[#1F2937] sm:text-5xl">
                {CLINIC_INFO.googleRating}
              </span>
              <span className="text-xl font-semibold text-[#6B7280]">
                / {CLINIC_INFO.googleRatingMax}
              </span>
            </div>

            <p className="mt-2 text-sm font-semibold text-[#087F5B]">Google Rating</p>
            <p className="mt-1 text-sm text-[#6B7280] tabular-nums">
              Based on {CLINIC_INFO.totalReviews} reviews
            </p>
          </div>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-[#6B7280]">
            Rating summary reflects verified Google listing information for Al-Shifa Clinic. Read
            or leave patient feedback directly on Google.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={CLINIC_INFO.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#087F5B] bg-white px-6 py-3 text-sm font-semibold text-[#087F5B] transition-colors duration-150 hover:bg-[#F0FDF4] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
            >
              <span>View Google Reviews</span>
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
