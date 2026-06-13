"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  HiOutlineSquare3Stack3D,
  HiOutlineTicket,
  HiOutlineTruck,
} from "react-icons/hi2";
import { CINEMATIC_EASE } from "@/components/CinematicMotion";
import CinematicTabs from "@/components/CinematicTabs";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";
import SceneHeader from "./SceneHeader";

type DestinationTravelProps = {
  embedded?: boolean;
};

export default function DestinationTravel({
  embedded = false,
}: DestinationTravelProps) {
  const t = useTypedTranslations("wedding");
  const [tab, setTab] = useState(0);

  const options = [
    {
      tab: t("travel.tabs.ceremony"),
      items: [
        {
          icon: HiOutlineTruck,
          title: t("travel.ceremony.car.title"),
          details: t("travel.ceremony.car.details"),
        },
        {
          icon: HiOutlineTicket,
          title: t("travel.ceremony.train.title"),
          details: t("travel.ceremony.train.details"),
        },
        {
          icon: HiOutlineSquare3Stack3D,
          title: t("travel.ceremony.parking.title"),
          details: t("travel.ceremony.parking.details"),
        },
      ],
    },
    {
      tab: t("travel.tabs.reception"),
      items: [
        {
          icon: HiOutlineTruck,
          title: t("travel.reception.car.title"),
          details: t("travel.reception.car.details"),
        },
        {
          icon: HiOutlineTicket,
          title: t("travel.reception.train.title"),
          details: t("travel.reception.train.details"),
        },
        {
          icon: HiOutlineSquare3Stack3D,
          title: t("travel.reception.parking.title"),
          details: t("travel.reception.parking.details"),
        },
      ],
    },
  ];

  const Root = embedded ? "div" : "section";

  return (
    <Root
      className={
        embedded ? styles.chapterBeat : `${styles.scene} ${styles.sceneWarm}`
      }
      id="travel"
    >
      <div className={styles.inner}>
        <SceneHeader
          eyebrow={t("travel.subtitle")}
          index="07"
          title={t("travel.title")}
        />

        <CinematicTabs
          ariaLabel={t("travel.title")}
          labels={options.map((option) => option.tab)}
          onChange={setTab}
          value={tab}
        />

        <div className={styles.travelGrid} key={tab}>
          {options[tab].items.map((option, index) => {
            const Icon = option.icon;

            return (
              <motion.article
                animate={{ opacity: 1, y: 0 }}
                className={styles.travelCard}
                initial={{ opacity: 0, y: 24 }}
                key={option.title}
                transition={{
                  delay: index * 0.08,
                  duration: 0.7,
                  ease: CINEMATIC_EASE,
                }}
              >
                <div className={styles.travelIndex}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon />
                </div>
                <h3 className={styles.travelTitle}>{option.title}</h3>
                <p className={styles.travelDetails}>{option.details}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Root>
  );
}
