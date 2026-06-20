"use client";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import RSVPInvitation from "../RSVPInvitation";
import ChapterScene from "./ChapterScene";

export default function RSVPScene() {
  const t = useTypedTranslations("wedding");

  return (
    <ChapterScene id="rsvp" index="06" label={t("rsvp.subtitle")} tone="warm">
      <RSVPInvitation embedded />
    </ChapterScene>
  );
}
