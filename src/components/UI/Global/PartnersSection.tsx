"use client";

import backup from "@/constants/data/backup.json";
import { resolveCMSData } from "@/utils/resolveCMSData";
import { useMemo, useState } from "react";
import Image from "next/image";

type PartnerItem = {
  src: string;
  alt: string;
};

const Row = ({ images, direction = "left" }: any) => {
  // Triple the images for smooth looping (adjust as needed)
  const duplicated = useMemo(() => {
    return [...images, ...images, ...images];
  }, [images]);

  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleError = (index: number) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max items-center will-change-transform 
          ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
        }}
      >
        {duplicated.map((item: PartnerItem, i: number) => {
          if (!item?.src) return null;
          const fallbackSrc = "/images/fallback-logo.png";

          return (
            <div key={i} className="shrink-0 mr-12 lg:mr-24 w-[120px]">
              <Image
                src={imgErrors[i] ? fallbackSrc : item.src}
                alt={item.alt || "partner"}
                width={160}
                height={120}
                priority={i < 6}
                unoptimized
                onError={() => handleError(i)}
                className="object-contain w-full h-[60px]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PartnersSection = ({ data }: any) => {
  const fallback = backup?.components?.patners_slider_component;
  const finalData = resolveCMSData(data, fallback);

  const { leftslider = [], rightslider = [], title } = finalData;

  return (
    <section className=" relative max-h-[548px] lg:max-h-[650px] py-[64px] bg-(--color-secondary) overflow-hidden">
      <div className=" overflow-visible flex flex-col justify-center h-full gap-64 md:gap-56 opacity-80">
        {leftslider.length > 0 && <Row images={leftslider} direction="left" />}
        {rightslider.length > 0 && (
          <Row images={rightslider} direction="right" />
        )}
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h2 className="text-h2 text-white text-center px-6 w-full lg:w-[1200px]">
          {title}
        </h2>
      </div>
    </section>
  );
};

export default PartnersSection;
