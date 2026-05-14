"use client";

import { TransitionRouter } from "next-transition-router";
import { gsap } from "gsap";
import { startTransition } from "react";

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const tagline = "Events and Weddings Instant Photo Magnets".split(" ");

  return (
    <>
      <TransitionRouter
        auto={true}
        leave={(next) => {
          const tl = gsap.timeline({
            onComplete: () => {
              requestAnimationFrame(() => startTransition(next));
            },
          });

          // Slide first overlay (white)
          tl.fromTo(
            "#transition-overlay-1",
            { y: "100%" },
            {
              y: "0%",
              duration: 0.8,
              ease: "expo.inOut",
            },
          );

          // Slide second overlay (brand) very soon after to show just a little white
          tl.fromTo(
            "#transition-overlay-2",
            { y: "100%" },
            {
              y: "0%",
              duration: 0.8,
              ease: "expo.inOut",
            },
            "-=0.7",
          );

          // Scale and fade in logo
          tl.fromTo(
            "#transition-logo",
            { opacity: 0, scale: 0.9, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "expo.out" },
            "-=0.4",
          );

          // Stagger the tagline text words
          tl.fromTo(
            ".tagline-word",
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.02,
              ease: "power3.out",
            },
            "-=0.4",
          );

          // Fade in the loader track
          tl.fromTo(
            "#transition-loader",
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power3.out",
            },
            "-=0.3",
          );

          // Animate the loader bar filling up
          tl.fromTo(
            "#transition-loader-bar",
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.6,
              ease: "power2.inOut",
            },
            "-=0.2",
          );

          return () => {
            tl.kill();
          };
        }}
        enter={(next) => {
          const tl = gsap.timeline({ onComplete: next });

          // Fade out logo, text, and loader smoothly
          tl.to(["#transition-logo", ".tagline-word", "#transition-loader"], {
            opacity: 0,
            y: -15,
            duration: 0.3,
            stagger: 0.02,
            ease: "power2.inOut",
          });

          // Slide second overlay up and out
          tl.to(
            "#transition-overlay-2",
            {
              y: "-100%",
              duration: 0.8,
              ease: "expo.inOut",
            },
            "-=0.1",
          );

          // Slide first overlay up and out right after, showing a slice of white
          tl.to(
            "#transition-overlay-1",
            {
              y: "-100%",
              duration: 0.8,
              ease: "expo.inOut",
            },
            "-=0.7",
          );

          return () => {
            tl.kill();
          };
        }}
      >
        {children}
      </TransitionRouter>

      {/* Full Screen Overlays outside of TransitionRouter so they stay mounted above layout */}
      <div
        id="transition-overlay-1"
        className="fixed inset-0 z-[99998] bg-white pointer-events-none translate-y-[100%]"
      ></div>

      <div
        id="transition-overlay-2"
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-(--color-brand) pointer-events-none translate-y-[100%]"
      >
        <div className="flex flex-col items-center justify-center">
          <div id="transition-logo" className="opacity-0">
            <img
              src="/magnet-logo.svg"
              alt="Magnet Me"
              className="w-[182px] h-[50px] md:w-[382px] md:h-[62px] object-contain"
            />
          </div>
          
          <p className="text-white text-sm md:text-lg font-medium tracking-widest text-center uppercase overflow-hidden flex flex-wrap justify-center p-6 mx-auto gap-[0.3em]">
            {tagline.map((word, i) => (
              <span
                key={i}
                className="inline-block tagline-word opacity-0 translate-y-[15px]"
              >
                {word}
              </span>
            ))}
          </p>

          {/* Sleek animated loading bar */}
          <div id="transition-loader" className="mt-2 w-[150px] md:w-[200px] h-[3px] bg-white/20 rounded-full overflow-hidden opacity-0">
            <div id="transition-loader-bar" className="w-full h-full bg-white origin-left scale-x-0"></div>
          </div>
        </div>
      </div>
    </>
  );
}
