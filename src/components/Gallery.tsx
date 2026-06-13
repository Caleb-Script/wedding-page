"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import styles from "./CinematicScenes.module.css";
import SceneHeader from "./SceneHeader";

type GalleryImage = {
  id: string;
  url: string;
};

const fallbackImages: GalleryImage[] = [
  { id: "1", url: "/gallery-1.jpg" },
  { id: "2", url: "/gallery-2.jpg" },
  { id: "3", url: "/gallery-3.jpg" },
  { id: "4", url: "/gallery-4.jpg" },
];

export default function Gallery() {
  const t = useTypedTranslations("wedding");
  const [images, setImages] = useState<GalleryImage[]>(fallbackImages);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  useEffect(() => {
    const loadImages = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
        const response = await fetch(`${baseUrl}/api/gallery`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load gallery images");
        }

        const data: GalleryImage[] = await response.json();

        if (data.length > 0) {
          setImages(data);
        }
      } catch (error) {
        console.error("[Gallery] Failed to fetch images", error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const updateSelection = () =>
      setSelectedIndex(emblaApi.selectedScrollSnap());
    updateSelection();
    emblaApi.on("select", updateSelection);

    return () => {
      emblaApi.off("select", updateSelection);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingRing} />
      </div>
    );
  }

  return (
    <section className={`${styles.scene} ${styles.sceneDeep}`} id="gallery">
      <div className={styles.inner}>
        <SceneHeader
          eyebrow={t("gallery.subtitle")}
          index="07"
          title={t("gallery.title")}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className={styles.galleryViewport} ref={emblaRef}>
            <div className={styles.galleryTrack}>
              {images.map((image, index) => (
                <div className={styles.gallerySlide} key={image.id}>
                  <div className={styles.galleryImage}>
                    <Image
                      alt={t("gallery.imageAlt", {
                        index: Number(image.id),
                      })}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      sizes="(max-width: 900px) 88vw, 72vw"
                      src={image.url}
                      style={{
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.galleryNav}>
            <div className={styles.galleryProgress}>
              <strong>{String(selectedIndex + 1).padStart(2, "0")}</strong>
              <span />
              <strong>{String(images.length).padStart(2, "0")}</strong>
            </div>
            <div className={styles.galleryButtons}>
              <button
                aria-label={t("gallery.prev")}
                className={styles.iconButton}
                onClick={scrollPrev}
                type="button"
              >
                <HiChevronLeft />
              </button>
              <button
                aria-label={t("gallery.next")}
                className={styles.iconButton}
                onClick={scrollNext}
                type="button"
              >
                <HiChevronRight />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
