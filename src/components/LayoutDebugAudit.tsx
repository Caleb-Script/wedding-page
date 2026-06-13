"use client";

import { useEffect } from "react";

const DEBUG_QUERY = "debugLayout";

export default function LayoutDebugAudit() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get(DEBUG_QUERY) !== "1") {
      return;
    }

    const root = document.documentElement;
    root.classList.add("debug-layout");

    const audit = () => {
      const viewportWidth = window.innerWidth;
      const elements = Array.from(document.querySelectorAll<HTMLElement>("*"));
      const overflowElements = elements
        .map((element) => {
          const rect = element.getBoundingClientRect();

          return {
            element,
            left: rect.left,
            right: rect.right,
            width: rect.width,
            overflowLeft: Math.max(0, -rect.left),
            overflowRight: Math.max(0, rect.right - viewportWidth),
          };
        })
        .filter(
          ({ overflowLeft, overflowRight }) => overflowLeft || overflowRight,
        )
        .sort(
          (a, b) =>
            b.overflowLeft +
            b.overflowRight -
            (a.overflowLeft + a.overflowRight),
        );

      console.table(
        overflowElements.map(
          ({ element, left, right, width, overflowLeft, overflowRight }) => ({
            element,
            left,
            right,
            width,
            overflowLeft,
            overflowRight,
          }),
        ),
      );
      const roots = {
        html: document.documentElement,
        body: document.body,
        main: document.querySelector("main"),
      };

      console.table(
        Object.entries(roots).map(([name, element]) => {
          const rect = element?.getBoundingClientRect();

          return {
            name,
            x: rect?.x,
            y: rect?.y,
            normalizedX: rect ? rect.x + window.scrollX : undefined,
            normalizedY: rect ? rect.y + window.scrollY : undefined,
            width: rect?.width,
          };
        }),
      );
      console.table({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        viewportWidth,
        documentWidth: document.documentElement.scrollWidth,
      });
    };

    audit();
    const delayedAudit = window.setTimeout(audit, 1500);
    window.addEventListener("resize", audit);

    return () => {
      root.classList.remove("debug-layout");
      window.clearTimeout(delayedAudit);
      window.removeEventListener("resize", audit);
    };
  }, []);

  return null;
}
