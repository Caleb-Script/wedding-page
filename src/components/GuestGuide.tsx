"use client";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { CINEMATIC_EASE } from "@/components/CinematicMotion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";
import SceneHeader from "./SceneHeader";

const categories = [
  {
    id: "general",
    items: ["dressCode", "arrival", "plusOne", "children", "dietary", "late"],
  },
  {
    id: "location",
    items: ["parking", "publicTransport", "charging", "accessible"],
  },
  {
    id: "accommodation",
    items: [
      "nearbyHotels",
      "recommendedHotels",
      "hotelDistance",
      "hotelTravel",
    ],
  },
  {
    id: "celebration",
    items: ["photographer", "guestPhotos", "dancing", "endTime"],
  },
  { id: "additional", items: ["contact", "weather"] },
] as const;

type GuestGuideProps = {
  embedded?: boolean;
};

export default function GuestGuide({ embedded = false }: GuestGuideProps) {
  const t = useTypedTranslations("wedding");
  const [category, setCategory] =
    useState<(typeof categories)[number]["id"]>("general");
  const [openItem, setOpenItem] = useState<string | null>("dressCode");
  const activeCategory = categories.find((item) => item.id === category);

  const Root = embedded ? "div" : "section";

  return (
    <Root
      className={
        embedded ? styles.chapterBeat : `${styles.scene} ${styles.sceneDeep}`
      }
      id="faq"
    >
      <div className={styles.inner}>
        <SceneHeader
          eyebrow={t("faq.subtitle")}
          index="08"
          title={t("faq.title")}
        />

        <div className={styles.faqLayout}>
          <div
            aria-label={t("faq.categoryLabel")}
            className={styles.faqCategories}
            role="tablist"
          >
            {categories.map((item, index) => (
              <button
                aria-selected={category === item.id}
                className={`${styles.faqCategory} ${
                  category === item.id ? styles.faqCategoryActive : ""
                }`}
                key={item.id}
                onClick={() => {
                  setCategory(item.id);
                  setOpenItem(item.items[0]);
                }}
                role="tab"
                type="button"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {t(`faq.categories.${item.id}`)}
              </button>
            ))}
          </div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={styles.faqList}
            initial={{ opacity: 0, y: 20 }}
            key={category}
            transition={{ duration: 0.55, ease: CINEMATIC_EASE }}
          >
            {activeCategory?.items.map((item, index) => {
              const isOpen = openItem === item;
              const answerId = `faq-answer-${item}`;

              return (
                <Accordion
                  className={`${styles.faqItem} ${
                    isOpen ? styles.faqItemOpen : ""
                  }`}
                  disableGutters
                  elevation={0}
                  expanded={isOpen}
                  key={item}
                  onChange={() => setOpenItem(isOpen ? null : item)}
                  square
                  sx={{
                    background: "transparent",
                    color: "inherit",
                    "&::before": { display: "none" },
                    "&.Mui-expanded": { margin: 0 },
                  }}
                >
                  <AccordionSummary
                    aria-controls={answerId}
                    className={styles.faqQuestion}
                    expandIcon={
                      <span className={styles.faqToggle}>
                        {isOpen ? <HiMinus /> : <HiPlus />}
                      </span>
                    }
                    id={`faq-question-${item}`}
                    sx={{
                      minHeight: { xs: "84px", sm: "96px" },
                      padding: { xs: "20px 16px", sm: "24px 28px" },
                      "& .MuiAccordionSummary-content": {
                        display: "grid",
                        gap: { xs: "10px", sm: "16px" },
                        gridTemplateColumns: { xs: "24px 1fr", sm: "38px 1fr" },
                        margin: 0,
                      },
                      "& .MuiAccordionSummary-expandIconWrapper": {
                        marginLeft: { xs: "10px", sm: "16px" },
                      },
                      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                        transform: "none",
                      },
                    }}
                  >
                    <span className={styles.faqNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{t(`faq.items.${item}.question`)}</span>
                  </AccordionSummary>
                  <AccordionDetails
                    aria-labelledby={`faq-question-${item}`}
                    className={styles.faqAnswer}
                    id={answerId}
                    sx={{ padding: 0 }}
                  >
                    <p>{t(`faq.items.${item}.answer`)}</p>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </motion.div>
        </div>
      </div>
    </Root>
  );
}
