import type { Metadata } from "next";
import AccommodationSection from "@/components/AccommodationSection";
import FAQSection from "@/components/FAQSection";
import Gallery from "@/components/Gallery";
import HeroSection from "@/components/HeroSection";
import LayoutDebugAudit from "@/components/LayoutDebugAudit";
import LocationSection from "@/components/LocationSection";
import QuoteSection from "@/components/QuoteSection";
import RSVPSection from "@/components/RSVPSection";
import Timeline from "@/components/Timeline";
import TravelInfo from "@/components/TravelInfo";
import WeddingFooter from "@/components/WeddingFooter";
import WeddingInfo from "@/components/WeddingInfo";

export const metadata: Metadata = {
  title: "Caleb & Rachel",
  description: "Wedding information",
};

export default function Page() {
  return (
    <main>
      <LayoutDebugAudit />
      <HeroSection />
      <WeddingInfo />
      <Timeline />
      <LocationSection />
      <AccommodationSection />
      <TravelInfo />
      <FAQSection />
      <RSVPSection />
      <QuoteSection />
      <Gallery />
      <WeddingFooter />
    </main>
  );
}
