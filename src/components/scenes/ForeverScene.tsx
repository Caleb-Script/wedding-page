"use client";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import ForeverStatement from "../ForeverStatement";
import MemoryGallery from "../MemoryGallery";
import WeddingFooter from "../WeddingFooter";
import ChapterScene from "./ChapterScene";

export default function ForeverScene() {
  const t = useTypedTranslations("wedding");

  return (
    <ChapterScene
      id="forever"
      index="07"
      label={t("gallery.subtitle")}
      tone="soft"
    >
      <ForeverStatement embedded />
      <MemoryGallery embedded />
      <WeddingFooter />
    </ChapterScene>
  );
}
