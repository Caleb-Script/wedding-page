"use client";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import DestinationLocations from "../DestinationLocations";
import DestinationStays from "../DestinationStays";
import DestinationTravel from "../DestinationTravel";
import ChapterScene from "./ChapterScene";

export default function DestinationScene() {
  const t = useTypedTranslations("wedding");

  return (
    <ChapterScene
      id="destination"
      index="04"
      label={t("locations.subtitle")}
      tone="soft"
    >
      <DestinationLocations embedded />
      <DestinationTravel embedded />
      <DestinationStays embedded />
    </ChapterScene>
  );
}
