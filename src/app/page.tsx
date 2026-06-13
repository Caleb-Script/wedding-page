import type { Metadata } from "next";
import CinematicExperience from "@/components/CinematicExperience";
import ArrivalScene from "@/components/scenes/ArrivalScene";
import DestinationScene from "@/components/scenes/DestinationScene";
import ForeverScene from "@/components/scenes/ForeverScene";
import GuestGuideScene from "@/components/scenes/GuestGuideScene";
import JourneyScene from "@/components/scenes/JourneyScene";
import RSVPScene from "@/components/scenes/RSVPScene";
import WeddingDayScene from "@/components/scenes/WeddingDayScene";

export const metadata: Metadata = {
  title: "Caleb & Rachel",
  description: "Wedding information",
};

export default function Page() {
  return (
    <CinematicExperience>
      <ArrivalScene />
      <JourneyScene />
      <WeddingDayScene />
      <DestinationScene />
      <GuestGuideScene />
      <RSVPScene />
      <ForeverScene />
    </CinematicExperience>
  );
}
