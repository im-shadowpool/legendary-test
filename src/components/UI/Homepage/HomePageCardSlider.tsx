"use client";

import Image from "next/image";
import styles from "./HomePageCardSlider.module.css";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Subtitle from "@/components/Layouts/Subtitle";
import Button from "@/components/Layouts/Button";
import Link from "next/link";
import ParagraphRenderer from "@/components/Layouts/ParagraphRenderer";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";

const HomePageCardSlider = ({ data }: any) => {
  const { event_one, cards, event_two } = data;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const startFrameRef = useRef<HTMLDivElement>(null);
  const endFrameRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rotations = useRef<number[]>([]);

  const normalize = (str: any) => str.toLowerCase().replace(/\s+/g, " ").trim();

  const allowedTitles = [
    "corporate events",
    "weddings",
    "graduations",
    "gala",
    "birthdays",
    "christmas parties",
    "award nights",
    "trade shows and brand activations",
    "bar mitzvah",
    "sport events",
  ];

  const filteredAndSortedCards = cards
    .filter((card: any) => allowedTitles.includes(normalize(card.title)))
    .sort(
      (a: any, b: any) =>
        allowedTitles.indexOf(normalize(a.title)) -
        allowedTitles.indexOf(normalize(b.title)),
    );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const startFrame = startFrameRef.current;
      const endFrame = endFrameRef.current;
      if (!track || !startFrame || !endFrame) return;

      const isTablet = window.innerWidth <= 1024;
      const trackWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${trackWidth + windowWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Step 1: Start frame exits
      tl.to(startFrame, {
        opacity: 0,
        scale: 0.9,
        y: -50,
        duration: 1,
        ease: "power2.inOut",
      });

      // Step 2: Cards slide through
      tl.fromTo(
        track,
        { x: windowWidth },
        {
          x: -trackWidth - 5,
          duration: 5,
          ease: "none",
        },
        // "-=0.8",
        isTablet ? "-=0.2" : "-=0.8",
      ).to(
        track,
        {
          pointerEvents: "none",
        },
        // "-=1",
        isTablet ? "-=0.2" : "-=0.3",
      );

      // Step 3: End frame enters
      tl.to(
        endFrame,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",

          onStart: () => {
            endFrame.style.zIndex = "20";
          },

          onReverseComplete: () => {
            endFrame.style.zIndex = "0";
          },
        },
        "-=0.5",
      );

      // Rotate Interaction
      const cards = cardsRef.current;

      // Initial random rotation + stacking depth
      cards.forEach((card, i) => {
        if (!card) return;

        const rotation = gsap.utils.random(
          isTablet ? -6 : -10,
          isTablet ? 6 : 10,
        );
        rotations.current[i] = rotation;

        gsap.set(card, {
          rotate: rotation,
          zIndex: i,
        });
      });

      cards.forEach((card, index) => {
        if (!card) return;

        const handleEnter = () => {
          cards.forEach((otherCard, i) => {
            if (!otherCard) return;

            gsap.killTweensOf(otherCard);

            if (i === index) {
              // Active card → focus
              gsap.to(otherCard, {
                rotate: 0,
                scale: 1.02,
                x: 0,
                duration: 0.4,
                ease: "elasticSmooth",
              });
            } else if (i < index) {
              // Left cards → push left MORE (spread)
              gsap.to(otherCard, {
                x: -(isTablet ? 40 : 80) - (index - i) * (isTablet ? 6 : 10),
                duration: 0.4,
                ease: "elasticSmooth",
              });
            } else {
              // Right cards → push right
              gsap.to(otherCard, {
                x: (isTablet ? 40 : 80) + (i - index) * (isTablet ? 6 : 10),
                duration: 0.4,
                ease: "elasticSmooth",
              });
            }
          });
        };

        const handleLeave = () => {
          cards.forEach((otherCard, i) => {
            if (!otherCard) return;

            gsap.killTweensOf(otherCard);

            const newRotation = gsap.utils.random(-6, 6);
            rotations.current[i] = newRotation;

            gsap.to(otherCard, {
              x: 0,
              scale: 1,
              rotate: newRotation,
              zIndex: i,
              duration: 0.5,
              ease: "elasticSmooth",
            });
          });
        };

        card.addEventListener("mouseenter", handleEnter);
        card.addEventListener("mouseleave", handleLeave);
      });
    }, container);

    // Proper cleanup to avoid "removeChild" error
    return () => {
      // 1. Kill all ScrollTriggers associated with this container
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.vars.trigger === container ||
          container.contains(st.trigger as any)
        ) {
          st.kill(false); // false = don't reset pin spacing (prevents extra DOM mutations)
        }
      });
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      {/* Original Slider Section */}
      <section
        ref={containerRef}
        className={`relative w-full h-screen overflow-hidden flex items-center justify-center __homePageCardSlider bg-(--color-accent)`}
      >
        {/* Starting Frame */}
        <div
          ref={startFrameRef}
          className={`${styles.fixedSectionContent} z-0`}
        >
          <div className="max-w-full lg:max-w-[980px] flex-center-col gap-4 px-6 lg:px-0">
            <Subtitle text={event_one.subhead} color="dark" />
            <HeadingRenderer
              text={event_one.title}
              className="text-h1-primary text-(--color-secondary)"
            />
            <ParagraphRenderer
              text={event_one.description}
              className="mt-2 max-w-full lg:max-w-[695px]"
            />
          </div>
        </div>
        {/* Ending Frame */}
        <div
          ref={endFrameRef}
          className={`${styles.fixedSectionContent} opacity-0 scale-95 translate-y-12`}
        >
          <div className="max-w-full lg:max-w-[980px] flex-center-col gap-8 px-6 lg:px-0">
            <HeadingRenderer
              text={event_two.title}
              className="text-h1-primary text-(--color-secondary) pointer-events-none z-0"
            />
            <Button text={event_two.buttontext} href={event_two.buttonlink} />
          </div>
        </div>
        {/* The Cards Track */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full z-0">
          <div
            ref={trackRef}
            className={`${styles.cardContainer} pointer-events-auto`}
          >
            {filteredAndSortedCards.map((card: any, i: number) => (
              <Link
                key={i}
                href={`/event/${card.link}`}
                className="group block"
              >
                <div
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                  className={`${styles.eventCard} relative overflow-hidden bg-black`}
                >
                  {/* IMAGE WRAPPER */}
                  <div className="relative w-full h-full opacity-50">
                    {/* Default Image */}
                    <Image
                      src={card.image_one}
                      alt={card.title}
                      fill
                      className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                    />

                    {/* Hover Image */}
                    <Image
                      src={card.image_two}
                      alt={card.title}
                      fill
                      className="object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                    />
                  </div>

                  {/* TITLE */}
                  <h3 className="text-h3-primary-large text-(--color-primary) text-center absolute inset-0 flex items-center justify-center pointer-events-none px-4">
                    {card.title}
                  </h3>

                  {/* ARROW */}
                  <div className="absolute top-4 right-4 z-20 pointer-events-none">
                    <div className="translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.85,0,0.41,0.99)]">
                      <Image
                        src="/arrow button.svg"
                        alt="event card cta"
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePageCardSlider;
