import { useState } from 'react';
import type { ServiceCategoryItem } from './data/clinicConfig';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { AvailabilityBanner } from './components/AvailabilityBanner';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationContactSection } from './components/LocationContactSection';
import { AppointmentSection } from './components/AppointmentSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AppointmentModal } from './components/AppointmentModal';

export default function App() {
  const [selectedInquiryTopic, setSelectedInquiryTopic] = useState('');
  const [selectionNonce, setSelectionNonce] = useState(0);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const openAppointmentModal = () => setIsAppointmentModalOpen(true);
  const closeAppointmentModal = () => setIsAppointmentModalOpen(false);

  const handleSelectService = (service: ServiceCategoryItem) => {
    setSelectedInquiryTopic(service.inquiryPrompt);
    setSelectionNonce((prev) => prev + 1);

    const appointmentElement = document.getElementById('book-appointment');
    if (appointmentElement) {
      appointmentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full bg-white text-[#1F2937]">
      <AnnouncementBar />
      <Navbar onOpenAppointmentModal={openAppointmentModal} />

      <main>
        <HeroSection onOpenAppointmentModal={openAppointmentModal} />
        <AboutSection />
        <ServicesSection onSelectService={handleSelectService} />
        <WhyChooseUsSection />
        <AvailabilityBanner />
        <ReviewsSection />
        <LocationContactSection />
        <AppointmentSection
          selectedInquiryTopic={selectedInquiryTopic}
          selectionNonce={selectionNonce}
        />
      </main>

      <Footer onOpenAppointmentModal={openAppointmentModal} />
      <FloatingWhatsApp />
      <AppointmentModal isOpen={isAppointmentModalOpen} onClose={closeAppointmentModal} />
    </div>
  );
}
