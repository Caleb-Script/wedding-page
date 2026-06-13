"use client";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import GuestGuide from "../GuestGuide";
import ChapterScene from "./ChapterScene";

export default function GuestGuideScene() {
  const t = useTypedTranslations("wedding");

  return (
    <ChapterScene
      id="guest-guide"
      index="05"
      label={t("faq.subtitle")}
      tone="deep"
    >
      <GuestGuide embedded />
    </ChapterScene>
  );
}
