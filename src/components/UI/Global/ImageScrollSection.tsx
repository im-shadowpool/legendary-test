"use client";

import backup from "@/constants/data/backup.json";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { resolveCMSData } from "@/utils/resolveCMSData";

export default function ImageScrollSection({ data }: any) {
  const fallback = backup?.components?.slider_component;
  const finalData = resolveCMSData(data, fallback);
  const { slider_one, slider_two, slider_three, slider_four } = finalData;

  const sectionRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<HTMLDivElement[]>([]);

  const columnImages = [
    slider_one || [],
    slider_two || [],
    slider_three || [],
    slider_four || [],
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = colRefs.current;

      cols.forEach((col, index) => {
        if (!col) return;

        const totalHeight = col.scrollHeight;
        const visibleHeight = col.parentElement!.clientHeight;
        const overflow = totalHeight - visibleHeight;

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
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[150vh] px-4 bg-(--color-secondary)"
    >
      <div className="grid grid-cols-4 gap-4">
        {columnImages.map((images, colIndex) => (
          <div key={colIndex} className="overflow-hidden h-[150vh]">
            <div
              ref={(el) => {
                if (el) colRefs.current[colIndex] = el;
              }}
              className="flex flex-col gap-4 will-change-transform"
            >
              {images.map((img: any, i: number) => (
                <div key={i} className="h-[300px] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt || ""}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
