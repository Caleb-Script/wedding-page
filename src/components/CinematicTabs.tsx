"use client";

import { Tab, Tabs } from "@mui/material";
import styles from "./CinematicScenes.module.css";

type CinematicTabsProps = {
  ariaLabel: string;
  labels: string[];
  onChange: (value: number) => void;
  value: number;
};

export default function CinematicTabs({
  ariaLabel,
  labels,
  onChange,
  value,
}: CinematicTabsProps) {
  return (
    <Tabs
      aria-label={ariaLabel}
      className={styles.tabs}
      onChange={(_, nextValue: number) => onChange(nextValue)}
      sx={{
        maxWidth: "100%",
        minHeight: 0,
        "& .MuiTabs-flexContainer": { gap: "4px" },
        "& .MuiTabs-indicator": { display: "none" },
      }}
      value={value}
      variant="scrollable"
    >
      {labels.map((label, index) => (
        <Tab
          className={`${styles.tab} ${value === index ? styles.tabActive : ""}`}
          disableRipple
          key={label}
          label={label}
          sx={{
            color: "inherit",
            font: "inherit",
            letterSpacing: "inherit",
            minHeight: 0,
            minWidth: 0,
            opacity: 1,
            padding: 0,
          }}
        />
      ))}
    </Tabs>
  );
}
