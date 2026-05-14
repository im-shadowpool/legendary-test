"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Button from "../../Layouts/Button";

const HomePageHero = ({ data }: any) => {
  const { title, description, button_1 } = data;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // DESKTOP
      if (videoRef.current) {
        videoRef.current.src =
          "https://magnetme.com.au/wp-content/uploads/2021/06/Magnet-Me-Event-Text-small0b.mp4";
      }
      runAnimation({
        initialWidth: "30vw",
        initialHeight: "35vh",
        finalHeight: "110vh",
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // MOBILE
      if (videoRef.current) {
        videoRef.current.src =
          "https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/05/Magnet-me-video.mp4";
      }
      runAnimation({
        initialWidth: "66vw",
        initialHeight: "27vh",
        finalHeight: "110vh",
      });
    });

    function runAnimation({ initialWidth, initialHeight, finalHeight }: any) {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

      gsap.set(video, {
        width: "0vw",
        height: "0vh",
        opacity: 0,
        scale: 0,
        rotate: 3,
        borderRadius: "16px",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          scrub: true,
          pin: true,
        },
      });

      // STEP 1
      tl.to(video, {
        width: initialWidth,
        height: initialHeight,
        opacity: 1,
        scale: 1,
        marginTop: "16px",
        ease: "back.out(2)",
        duration: 0.5,
      });

      // STEP 2
      tl.to(video, {
        width: "100vw",
        height: finalHeight,
        y: "-5vh",
        borderRadius: "0px",
        ease: "none",
        duration: 1.2,
        onStart: () => {
          video.play();
        },
        onReverseComplete: () => {
          video.pause();
          video.currentTime = 0;
        },
      });

      tl.to(video, { rotate: 0, duration: 0.3 }, "<");

      tl.to(".hero-text", { opacity: 0, y: -40 }, "<0.1");
      tl.to(".hero-desc, .hero-btn", { opacity: 0, y: 40 }, "<");
    }

    return () => mm.revert();
  }, []);
  return (
    <div
      ref={sectionRef}
      className="w-full relative h-screen lg:h-[115vh] overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          src="https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/banner-animation-5-1-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex-center-col text-center">
        <h1 className="text-h1-primary text-(--color-primary) max-w-[855px] hero-text px-6 lg:px-0">
          WE CAPTURE EVENTS INTO INSTANT
          <span className="text-(--color-brand)"> PHOTO MAGNETS</span>
        </h1>

        {/* Animated Video */}
        <div className="flex justify-center pointer-events-none">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="auto"
            className="object-cover w-0 h-0"
          />
        </div>

        <p className="text-(--color-primary) mt-6 mb-8 hero-desc px-6 lg:px-0">
          {description}
        </p>

        <Button text={button_1.text} href={button_1.url} className="hero-btn" />
      </div>
    </div>
  );
};

export default HomePageHero;
