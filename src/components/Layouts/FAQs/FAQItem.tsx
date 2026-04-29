"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const FAQItem = ({ faq, isOpen, onClick }: any) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // kill previous animation (IMPORTANT)
    animation.current?.kill();

    if (isOpen) {
      animation.current = gsap.to(el, {
        height: "auto",
        duration: 1.36,
        ease: "elastic.out(1, 0.5)",
      });
    } else {
      animation.current = gsap.to(el, {
        height: 0,
        duration: 1.36,
        ease: "elastic.out(1, 0.5)",
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-[#CECECE]">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-4 lg:py-6 text-start gap-2"
      >
        <span
          className={`transition-colors faq-question-text ${
            isOpen ? "text-(--color-brand)" : "text-(--color-secondary)"
          }`}
        >
          {faq.title}
        </span>

        <span
          className={`transition-transform duration-500 ${
            isOpen ? "rotate-90 text-(--color-brand)" : ""
          }`}
        >
          <svg
            className="mobile-svg"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clipPath="url(#clip0_30392_5986)">
              <path
                d="M12 3.75L12 20.25"
                stroke={`${isOpen ? "var(--color-brand)" : "#090909"}`}
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.25 13.5L12 20.25L18.75 13.5"
                stroke={`${isOpen ? "var(--color-brand)" : "#090909"}`}
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_30392_5986">
                <rect
                  width={24}
                  height={24}
                  fill="white"
                  transform="matrix(0 1 1 0 0 0)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
      </button>

      <div ref={contentRef} className="overflow-hidden h-0">
        <div className="text-(--text-primary) text-body pb-4 lg:pb-6 ">
          {faq.description}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
