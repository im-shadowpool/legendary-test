"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const PageTitle = ({ data }: any) => {
  const { title, description, background } = data;
  const defaultBanner =
    "https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/Banner-1.webp";

  const isVideo = background?.match(/\.(mp4|webm|ogg)$/i);
  const videoUrl = isVideo ? background : null;
  const imageUrl = !isVideo ? background || defaultBanner : defaultBanner;

  // const sectionRef = useRef<HTMLElement>(null);

  // useGSAP(
  //   () => {
  //     const tl = gsap.timeline({ delay: 0.7 });

  //     tl.fromTo(
  //       ".page-title-heading",
  //       { opacity: 0, y: 40 },
  //       { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
  //     );

  //     tl.fromTo(
  //       ".page-title-desc",
  //       { opacity: 0, y: 40 },
  //       { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
  //       "-=0.6",
  //     );
  //   },
  //   { scope: sectionRef },
  // );

  return (
    <section
      // ref={sectionRef}
      className={`relative w-full h-screen lg:h-screen max-h-[1400px] flex items-center justify-center text-center overflow-hidden`}
    >
      {/* Background Media */}
      {isVideo ? (
        // Video Background
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: "cover" }}
        >
          <source src={videoUrl} type={`video/${videoUrl?.split(".").pop()}`} />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Image Background
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="custom-container relative z-10 flex-center-col -mb-8 py-10">
        <div className="w-full lg:w-[1120px] px-6 flex-center-col gap-4 lg:gap-6">
          <h1 className="text-h1 text-(--color-primary) page-title-heading">
            {title}
          </h1>
          <p className="text-(--text-tertiary) text-body w-full lg:w-[815px] page-title-desc">
            {description}
          </p>
        </div>
      </div>

      {/* Scroll Indicator (optional) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="w-7 h-10 border border-white/40 rounded-full flex justify-center items-start p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce mt-1.5" />
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
