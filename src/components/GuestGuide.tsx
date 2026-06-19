"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import { motion } from "framer-motion";
import type { KeyboardEvent } from "react";
import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { CINEMATIC_EASE } from "@/components/CinematicMotion";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";
import SceneHeader from "./SceneHeader";

const categories = [
  {
    id: "general",
    items: [
      "dressCode",
      "arrival",
      "plusOne",
      "children",
      // "dietary",
      "late",
    ],
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
  const activeCategoryIndex = categories.findIndex(
    (item) => item.id === category,
  );
  const selectCategory = (index: number) => {
    const nextCategory = categories[index];
    setCategory(nextCategory.id);
    setOpenItem(nextCategory.items[0]);
  };
  const handleCategoryKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const lastIndex = categories.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    selectCategory(nextIndex);
    document
      .getElementById(`faq-category-${categories[nextIndex].id}`)
      ?.focus();
  };

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
            className={`${styles.faqCategories} ${styles.faqCategoriesDesktop}`}
            role="tablist"
          >
            {categories.map((item, index) => (
              <button
                aria-controls="faq-category-panel"
                aria-selected={category === item.id}
                className={`${styles.faqCategory} ${
                  category === item.id ? styles.faqCategoryActive : ""
                }`}
                id={`faq-category-${item.id}`}
                key={item.id}
                onClick={() => selectCategory(index)}
                onKeyDown={(event) => handleCategoryKeyDown(event, index)}
                role="tab"
                tabIndex={category === item.id ? 0 : -1}
                type="button"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {t(`faq.categories.${item.id}`)}
              </button>
            ))}
          </div>

          <Box className={styles.faqCategoriesMobile}>
            <Tabs
              aria-label={t("faq.categoryLabel")}
              onChange={(_, nextValue: number) => selectCategory(nextValue)}
              scrollButtons={false}
              sx={{
                minHeight: 0,
                overflow: "visible",
                "& .MuiTabs-flexContainer": {
                  gap: "8px",
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
              value={activeCategoryIndex}
              variant="scrollable"
            >
              {categories.map((item, index) => (
                <Tab
                  aria-controls="faq-category-panel"
                  disableRipple
                  id={`faq-category-mobile-${item.id}`}
                  key={item.id}
                  label={
                    <Box
                      component="span"
                      sx={{
                        alignItems: "center",
                        display: "inline-flex",
                        gap: "9px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          color: "rgba(216, 184, 121, 0.62)",
                          fontSize: "0.48rem",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </Box>
                      {t(`faq.categories.${item.id}`)}
                    </Box>
                  }
                  sx={{
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "999px",
                    color: "rgba(255, 255, 255, 0.48)",
                    font: "700 0.56rem / 1 var(--font-sans)",
                    letterSpacing: "0.14em",
                    minHeight: "44px",
                    minWidth: "max-content",
                    padding: "0 16px",
                    textTransform: "uppercase",
                    transition:
                      "border-color 250ms ease, color 250ms ease, background-color 250ms ease",
                    "&.Mui-selected": {
                      backgroundColor: "rgba(216, 184, 121, 0.13)",
                      borderColor: "rgba(216, 184, 121, 0.42)",
                      color: "#f1ece3",
                    },
                    "&:focus-visible": {
                      outline: "1px solid var(--scene-accent)",
                      outlineOffset: "3px",
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            aria-label={t(`faq.categories.${category}`)}
            className={styles.faqList}
            id="faq-category-panel"
            initial={{ opacity: 0, y: 20 }}
            key={category}
            role="tabpanel"
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
