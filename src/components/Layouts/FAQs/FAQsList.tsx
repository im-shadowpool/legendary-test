"use client";

import { useState, useRef } from "react";
import FAQItem from "./FAQItem";
import { gsap } from "@/lib/gsap";

const FAQsList = ({ faqs, initialCount = 3, sectionRef }: any) => {
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const visibleFaqs = showAll ? faqs : faqs.slice(0, initialCount);

  const toggleView = () => {
    const el = containerRef.current;
    if (!el) return;

    const startHeight = el.offsetHeight;
    const isClosing = showAll;

    setShowAll((prev) => !prev);

    requestAnimationFrame(() => {
      const endHeight = el.scrollHeight;

      gsap.fromTo(
        el,
        { height: startHeight },
        {
          height: endHeight,
          duration: 0.8,
          ease: "power3.inOut",

          onStart: () => {
            if (isClosing && sectionRef?.current) {
              const y =
                sectionRef.current.getBoundingClientRect().top +
                window.scrollY -
                100;

              window.scrollTo({
                top: y,
                behavior: "smooth",
              });
            }
          },

          onComplete: () => {
            el.style.height = "auto";

            // 🔥 Fix: Update Lenis after height change
            const lenis = (window as any).lenis;
            if (lenis) {
              lenis.resize();
            }
          },
        },
      );
    });
  };

  return (
    <div>
      <div ref={containerRef} className="overflow-hidden">
        {visibleFaqs.map((faq: any, index: number) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(index)}
          />
        ))}
      </div>

      {faqs.length > initialCount && (
        <div className="flex-center-col mt-10 lg:mt-12">
          <button
            onClick={toggleView}
            className="px-4 py-[12px] rounded-full bg-[#F0F0F0] text-(--text-primary) gap-2 flex-center-row faq-question-text-button transition-all duration-300 border-[1.7px] border-transparent hover:border-[1.7px] hover:border-(--color-brand) hover:text-(--color-brand) hover:bg-(--color-accent) active:border-[1.7px] active:border-(--color-brand) active:text-(--color-brand) active:bg-(--color-accent)"
          >
            {showAll ? "View Less" : "View More"}
            <div
              className={`transition-transform duration-500 ${showAll ? "rotate-180" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M14 5L8 11L2 5"
                  stroke="#4F4F4F"
                  strokeWidth={2.5}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default FAQsList;
