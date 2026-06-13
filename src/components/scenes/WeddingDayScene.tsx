"use client";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import WeddingDayTimeline from "../WeddingDayTimeline";
import WeddingDetailsBeat from "../WeddingDetailsBeat";
import ChapterScene from "./ChapterScene";

export default function WeddingDayScene() {
  const t = useTypedTranslations("wedding");

  return (
    <ChapterScene
      id="wedding-day"
      index="03"
      label={t("timeline.subtitle")}
      tone="deep"
    >
      <WeddingDetailsBeat embedded />
      <WeddingDayTimeline embedded />
    </ChapterScene>
  );
}
