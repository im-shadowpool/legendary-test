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
  // Triple duplication to ensure seamless scrolling
  const duplicated = useMemo(() => {
    return [...images, ...images, ...images];
  }, [images]);

  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleError = (index: number) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="">
      <div
        className={`flex items-center ${
          direction === "left" ? "marquee-left" : "marquee-right"
        }`}
      >
        {duplicated.map((item: PartnerItem, i: number) => {
          if (!item?.src) return null; // skip missing src

          const fallbackSrc = "/images/fallback-logo.png"; // replace with actual fallback

          return (
            <div key={i} className="shrink-0 mr-24">
              <Image
                src={imgErrors[i] ? fallbackSrc : item.src}
                alt={item.alt || "partner"}
                width={160}
                height={100}
                priority={i < 6}
                unoptimized // allows external URLs without config (remove if domains are configured)
                onError={() => handleError(i)}
                className="object-contain max-h-[120px] w-auto"
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
    <section className=" relative max-h-[448px] lg:max-h-[650px] py-[64px] bg-(--color-secondary) overflow-hidden">
      <div className="custom-container overflow-visible flex flex-col justify-center h-full gap-56 opacity-80">
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
