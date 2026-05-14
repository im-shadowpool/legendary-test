"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

type HeadingRendererProps = {
  text?: string;
  className?: string;
};

export default function HeadingRenderer({
  text,
  className = "",
}: HeadingRendererProps) {
  // const headingRef = useRef<HTMLHeadingElement>(null);

  // useGSAP(() => {
  //   if (!headingRef.current) return;

  //   gsap.fromTo(
  //     headingRef.current,
  //     { y: 50, opacity: 0 },
  //     {
  //       y: 0,
  //       opacity: 1,
  //       duration: 0.8,
  //       ease: "power3.out",
  //       scrollTrigger: {
  //         trigger: headingRef.current,
  //         start: "top 85%",
  //         toggleActions: "play none none none",
  //       },
  //     }
  //   );
  // }, []);

  if (!text) return null;

  // Split by <span>...</span>
  const parts = text.split(/(<span>.*?<\/span>)/g);

  return (
    <h2
      // ref={headingRef}

      className={`${className}`}
    >
      {parts.map((part, index) => {
        if (part.startsWith("<span>")) {
          const cleanText = part.replace(/<\/?span>/g, "");
          return (
            <span key={index} className="text-(--color-brand)">
              {cleanText}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </h2>
  );
}
