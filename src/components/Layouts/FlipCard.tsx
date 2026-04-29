"use client";

import { useEffect, useRef, useState } from "react";

interface FlipCardProps {
  frontImage: string;
  backImage: string;
  className?: string;
}

export default function FlipCard({
  frontImage,
  backImage,
  className = "",
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovering) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsFlipped(false);
      return;
    }

    intervalRef.current = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`
        w-[264px] h-[256px]
        md:w-[325px] md:h-[355px]
        lg:w-[425px] lg:h-[455px]
        perspective-[1200px]
        transition-transform duration-700
        hover:rotate-0
        ${className}
      `}
    >
      <div
        className={`
          w-full h-full relative rounded-[18px]
          shadow-[2.217px_8.867px_33.253px_rgba(112,144,176,0.3)]
          transition-transform duration-700
          [transform-style:preserve-3d]
          ${isFlipped ? "rotate-y-180" : ""}
        `}
      >
        {/* Front */}
        <div
          className="
            absolute inset-0 rounded-[16px]
            border-[8.867px] border-[var(--color-primary)]
            overflow-hidden
            [backface-visibility:hidden]
          "
        >
          <img
            src={frontImage}
            alt="front"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Back */}
        <div
          className="
            absolute inset-0 rounded-[16px]
            border-[8.867px] border-[var(--color-primary)]
            overflow-hidden
            [backface-visibility:hidden]
            rotate-y-180
          "
        >
          <img
            src={backImage}
            alt="back"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
