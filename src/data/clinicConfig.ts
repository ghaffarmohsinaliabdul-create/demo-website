export interface ServiceCategoryItem {
  id: string;
  title: string;
  description: string;
  iconName: 'stethoscope' | 'heart-pulse' | 'hand-heart' | 'clipboard-list';
  inquiryPrompt: string;
}

export const CLINIC_INFO = {
  name: 'Al-Shifa Clinic',
  shortTagline:
    'Committed to providing accessible healthcare in a welcoming environment in Gazdarabad Marwaari Lines, Karachi.',
  address: 'Al-Shifa Clinic, Al-Shifa St, Gazdarabad Marwaari Lines, Karachi, Pakistan',
  shortLocation: 'Gazdarabad Marwaari Lines, Karachi',
  whatsappDisplay: '0321 2132497',
  whatsappInternationalDisplay: '+92 321 2132497',
  whatsappDigits: '923212132497',
  telHref: 'tel:+923212132497',
  openingHoursDays: 'Monday – Sunday',
  openingHoursStatus: 'Open 24 Hours',
  openingHoursCombined: 'Open 24 Hours | Monday – Sunday',
  googleRating: 4.1,
  googleRatingMax: 5,
  totalReviews: 21,
  /**
   * Editable placeholder URL for the clinic's Google Business Profile reviews page.
   * Replace this URL once the verified Google Business Profile review link is available.
   */
  googleReviewsUrl:
    'https://www.google.com/maps/search/?api=1&query=Al-Shifa+Clinic%2C+Al-Shifa+St%2C+Gazdarabad+Marwaari+Lines%2C+Karachi',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Al-Shifa+Clinic%2C+Al-Shifa+St%2C+Gazdarabad+Marwaari+Lines%2C+Karachi',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Al-Shifa%20Clinic,%20Al-Shifa%20St,%20Gazdarabad%20Marwaari%20Lines,%20Karachi,%20Pakistan&t=&z=16&ie=UTF8&iwloc=&output=embed',
  defaultWhatsAppMessage:
    'Assalam-o-Alaikum, I would like to get information about Al-Shifa Clinic.',
  appointmentWhatsAppGreeting:
    'Assalam-o-Alaikum, I would like to book an appointment at Al-Shifa Clinic.',
} as const;

export const CLINIC_IMAGES = {
  heroConsultation: '/src/assets/images/hero_clinic_consultation_1795484917403.jpg',
  aboutReception: '/src/assets/images/about_clinic_lounge_1795484916569.jpg',
} as const;

/**
 * Editable placeholder service categories.
 * Update, add, or remove entries here once final clinic service offerings are confirmed.
 */
export const PLACEHOLDER_SERVICES: ServiceCategoryItem[] = [
  {
    id: 'general-consultation',
    title: 'General Consultation',
    description:
      'A welcoming first point of contact to discuss everyday health concerns and receive attentive guidance.',
    iconName: 'stethoscope',
    inquiryPrompt: 'Inquiry regarding General Consultation at Al-Shifa Clinic.',
  },
  {
    id: 'primary-healthcare',
    title: 'Primary Healthcare',
    description:
      'Accessible routine healthcare support designed around patient comfort and timely attention.',
    iconName: 'heart-pulse',
    inquiryPrompt: 'Inquiry regarding Primary Healthcare availability at Al-Shifa Clinic.',
  },
  {
    id: 'patient-assistance',
    title: 'Patient Assistance',
    description:
      'Respectful support for patients and visiting families seeking medical assistance day or night.',
    iconName: 'hand-heart',
    inquiryPrompt: 'Inquiry regarding Patient Assistance at Al-Shifa Clinic.',
  },
  {
    id: 'medical-guidance',
    title: 'Medical Guidance',
    description:
      'Clear communication and helpful direction so you can understand your options and next steps.',
    iconName: 'clipboard-list',
    inquiryPrompt: 'Inquiry regarding Medical Guidance at Al-Shifa Clinic.',
  },
];

export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-choose-us' },
  { label: 'Contact', href: '#contact' },
] as const;
