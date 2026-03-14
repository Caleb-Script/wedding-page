import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import HeroSection from "@/components/HeroSection";
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
    <>
      <HeroSection />
      <WeddingInfo />
      <Timeline />
      <LocationSection />
      <TravelInfo />
      <RSVPSection />
      <QuoteSection />
      <Gallery />
      <WeddingFooter />
    </>
  );
}
