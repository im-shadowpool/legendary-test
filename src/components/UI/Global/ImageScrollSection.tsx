"use client";

import backup from "@/constants/data/backup.json";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { resolveCMSData } from "@/utils/resolveCMSData";

export default function ImageScrollSection({ data }: any) {
  const fallback = backup?.components?.slider_component;
  const finalData = resolveCMSData(data, fallback);
  const { slider_one, slider_two, slider_three, slider_four } = finalData;

  const sectionRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visibleColsCount, setVisibleColsCount] = useState(4);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const allSliders = [
    slider_one || [],
    slider_two || [],
    slider_three || [],
    slider_four || [],
  ];

  // Helper: ensure column height > container height
  // Returns a new array with enough images (no consecutive duplicates)
  const ensureColumnOverflow = (
    originalImages: any[],
    targetCols: number,
    containerRef: HTMLElement | null,
    imageHeightGuess = 300, // approximate average image height, will be overridden by real calculation
  ): any[] => {
    if (!containerRef) return originalImages;

    const containerHeight = containerRef.clientHeight;

    let requiredMinCount = Math.ceil(containerHeight / 200) + 2; // +2 for safety
    if (targetCols === 2) requiredMinCount = Math.max(requiredMinCount, 8);
    if (targetCols === 3) requiredMinCount = Math.max(requiredMinCount, 6);

    if (originalImages.length >= requiredMinCount) return originalImages;

    // Build new array without consecutive duplicates
    const result: any[] = [...originalImages];
    const pool = originalImages;
    if (pool.length === 0) return result;

    while (result.length < requiredMinCount) {
      for (
        let i = 0;
        i < pool.length && result.length < requiredMinCount;
        i++
      ) {
        const candidate = pool[i];
        // Avoid inserting same image as the previous one
        if (
          result.length === 0 ||
          candidate.src !== result[result.length - 1].src
        ) {
          result.push(candidate);
        } else if (pool.length > 1) {
          // pick next one to avoid duplicate
          const nextIdx = (i + 1) % pool.length;
          const nextCandidate = pool[nextIdx];
          if (nextCandidate.src !== result[result.length - 1].src) {
            result.push(nextCandidate);
          } else {
            // fallback: just push candidate
            result.push(candidate);
          }
        } else {
          result.push(candidate); // only one unique image, duplicates unavoidable
        }
      }
    }
    return result;
  };

  const getMinimumImageCount = (cols: number) => {
    switch (cols) {
      case 2:
        return 8;
      case 3:
        return 6;
      default:
        return 4;
    }
  };

  const ensureNoConsecutiveDuplicates = (
    images: any[],
    minCount: number,
  ): any[] => {
    if (images.length === 0) return [];
    if (images.length >= minCount) return images;

    const result = [...images];
    const pool = images;
    while (result.length < minCount) {
      for (let i = 0; i < pool.length && result.length < minCount; i++) {
        const candidate = pool[i];
        if (
          result.length === 0 ||
          candidate.src !== result[result.length - 1].src
        ) {
          result.push(candidate);
        } else if (pool.length > 1) {
          const nextIdx = (i + 1) % pool.length;
          const nextCandidate = pool[nextIdx];
          if (nextCandidate.src !== result[result.length - 1].src) {
            result.push(nextCandidate);
          } else {
            result.push(candidate);
          }
        } else {
          result.push(candidate);
        }
      }
    }
    return result;
  };

  const getColumnImages = () => {
    if (visibleColsCount === 2) {
      const flatImages = allSliders.flat();
      const col1: any[] = [];
      const col2: any[] = [];
      flatImages.forEach((img, idx) => {
        if (idx % 2 === 0) col1.push(img);
        else col2.push(img);
      });
      const minCount = getMinimumImageCount(2);
      return [
        ensureNoConsecutiveDuplicates(col1, minCount),
        ensureNoConsecutiveDuplicates(col2, minCount),
      ];
    } else if (visibleColsCount === 3) {
      // For tablet, take first three sliders and ensure each column has enough images
      return allSliders
        .slice(0, 3)
        .map((col) =>
          ensureNoConsecutiveDuplicates(col || [], getMinimumImageCount(3)),
        );
    } else {
      // Desktop 4 columns
      return allSliders
        .slice(0, 4)
        .map((col) =>
          ensureNoConsecutiveDuplicates(col || [], getMinimumImageCount(4)),
        );
    }
  };

  const columnImages = getColumnImages();

  // Responsive column count
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setVisibleColsCount(4);
      else if (width >= 768) setVisibleColsCount(3);
      else setVisibleColsCount(2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Image loading detection (unchanged, works with duplicated arrays)
  useEffect(() => {
    if (!columnImages.length) return;
    let loadedCount = 0;
    const totalImages = columnImages.reduce((acc, col) => acc + col.length, 0);
    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }
    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) setImagesLoaded(true);
    };
    const imagesToTrack: HTMLImageElement[] = [];
    columnImages.forEach((col) =>
      col.forEach((img: any) => {
        const imgEl = new Image();
        imgEl.src = img.src;
        imgEl.addEventListener("load", handleImageLoad);
        imgEl.addEventListener("error", handleImageLoad);
        imagesToTrack.push(imgEl);
      }),
    );
    return () => {
      imagesToTrack.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
  }, [columnImages]);

  // GSAP with overflow clamping and mobile duplication already done
  useLayoutEffect(() => {
    if (!imagesLoaded) return;

    const ctx = gsap.context(() => {
      const cols = columnRefs.current.slice(0, visibleColsCount);

      cols.forEach((col, index) => {
        if (!col) return;

        const totalHeight = col.scrollHeight;
        const visibleHeight = col.parentElement!.clientHeight;

        // Inside useLayoutEffect, after calculating overflow:
        let overflow = totalHeight - visibleHeight;

        // If still no overflow, force a small movement (scale with column count)
        if (overflow <= 0) {
          if (visibleColsCount === 2) overflow = 50;
          if (visibleColsCount === 3) overflow = 80; // added for tablet
          if (overflow <= 0) return;
        }

        const fromY = index % 2 === 0 ? 0 : -overflow;
        const toY = index % 2 === 0 ? -overflow : 0;

        gsap.fromTo(
          col,
          { y: fromY },
          {
            y: toY,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [visibleColsCount, columnImages, imagesLoaded]);

  // Extra refresh after images load and on resize/orientation
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (imagesLoaded) {
      const timer = setTimeout(refresh, 100);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleRefresh);
    window.addEventListener("resize", handleRefresh);
    window.addEventListener("orientationchange", handleRefresh);
    return () => {
      window.removeEventListener("load", handleRefresh);
      window.removeEventListener("resize", handleRefresh);
      window.removeEventListener("orientationchange", handleRefresh);
    };
  }, []);

  const gridColsClass =
    visibleColsCount === 2
      ? "grid-cols-2"
      : visibleColsCount === 3
        ? "grid-cols-3"
        : "grid-cols-4";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[105vh] lg:min-h-[150vh] px-2 lg:px-4 bg-(--color-secondary)"
    >
      <div className={`grid ${gridColsClass} gap-2 lg:gap-4`}>
        {columnImages.map((images, colIndex) => (
          <div
            key={colIndex}
            className="overflow-hidden h-[105vh] lg:h-[150vh]"
          >
            <div
              ref={(el) => {
                columnRefs.current[colIndex] = el;
              }}
              className="flex flex-col gap-2 lg:gap-4 will-change-transform"
            >
              {images.map((img: any, i: number) => (
                <div key={i} className="rounded overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt || ""}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute top-0 left-0 w-full h-32 lg:h-48 bg-linear-to-b from-[#090909]/95 via-[#090909]/60 to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 lg:h-48 bg-linear-to-t from-[#090909]/95 via-[#090909]/60 to-transparent z-10" />
    </section>
  );
}
