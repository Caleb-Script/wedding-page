"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
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

export default function FAQSection() {
  const t = useTypedTranslations("wedding");
  const [category, setCategory] =
    useState<(typeof categories)[number]["id"]>("general");
  const [openItem, setOpenItem] = useState<string | null>("dressCode");
  const activeCategory = categories.find((item) => item.id === category);

  return (
    <section className={`${styles.scene} ${styles.sceneDeep}`} id="faq">
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
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeCategory?.items.map((item, index) => {
              const isOpen = openItem === item;
              const answerId = `faq-answer-${item}`;

              return (
                <article
                  className={`${styles.faqItem} ${
                    isOpen ? styles.faqItemOpen : ""
                  }`}
                  key={item}
                >
                  <button
                    aria-controls={answerId}
                    aria-expanded={isOpen}
                    className={styles.faqQuestion}
                    onClick={() => setOpenItem(isOpen ? null : item)}
                    type="button"
                  >
                    <span className={styles.faqNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{t(`faq.items.${item}.question`)}</span>
                    <span className={styles.faqToggle}>
                      {isOpen ? <HiMinus /> : <HiPlus />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        animate={{ height: "auto", opacity: 1 }}
                        className={styles.faqAnswer}
                        exit={{ height: 0, opacity: 0 }}
                        id={answerId}
                        initial={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <p>{t(`faq.items.${item}.answer`)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
