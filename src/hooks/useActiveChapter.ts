"use client";

import { useEffect, useMemo, useState } from "react";

export default function useActiveChapter(chapterIds: readonly string[]) {
  const stableChapterIds = useMemo(() => [...chapterIds], [chapterIds]);
  const [activeChapter, setActiveChapter] = useState(stableChapterIds[0] ?? "");

  useEffect(() => {
    const sections = stableChapterIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    let frame = 0;

    const updateActiveChapter = () => {
      const anchor = window.innerHeight * 0.46;
      let closestId = sections[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= anchor && rect.bottom >= anchor) {
          closestId = section.id;
          closestDistance = 0;
          return;
        }

        const distance = Math.min(
          Math.abs(rect.top - anchor),
          Math.abs(rect.bottom - anchor),
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = section.id;
        }
      });

      setActiveChapter(closestId);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveChapter);
    };

    const observer = new IntersectionObserver(requestUpdate, {
      root: null,
      rootMargin: "-34% 0px -44% 0px",
      threshold: [0, 0.18, 0.36, 0.54, 0.72, 0.9],
    });

    sections.forEach((section) => {
      observer.observe(section);
    });
    updateActiveChapter();

    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", requestUpdate);
    };
  }, [stableChapterIds]);

  return activeChapter;
}
