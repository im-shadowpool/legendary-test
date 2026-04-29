"use client";

import { useState } from "react";
import Image from "next/image";
import Subtitle from "@/components/Layouts/Subtitle";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";

export default function WhyPartner({ data }: any) {
  const { subhead, title, description, items, image } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section bg-(--color-primary) py-[64px] lg:py-[120px]">
      <div className="custom-container flex-center-col gap-12 lg:gap-16">
        {/* Heading */}
        <div className="text-center flex-center-col gap-4 w-full lg:w-[1000px]">
          <Subtitle text={subhead} color="dark" />
          <HeadingRenderer
            text={title}
            className="text-h2 text-(--color-secondary)"
          />

          <p className="text-body text-(--text-primary) w-full lg:w-[75%]">
            {description}
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* 🖼 Image with smooth transition */}
          <div className="relative rounded-2xl overflow-hidden h-[250px] sm:h-[450px] lg:h-full">
            <Image
              src={
                image ||
                "https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/a97ac243591bb70910183531a9ab9ac812cd6b87.webp"
              }
              alt="Why Partner"
              fill
              className="object-cover transition-all"
            />
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-2 lg:gap-3">
            {items.map((item: any, index: number) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-[600ms] ${
                    isActive ? "bg-(--color-brand)" : "bg-(--color-accent)"
                  }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => setActiveIndex(index)}
                    className="w-full flex gap-2 justify-between items-center p-6 text-left"
                  >
                    <span
                      className={`WhyPartnerTitle uppercase transition-colors duration-300 ${
                        isActive
                          ? "text-(--color-primary)"
                          : "text-(--color-secondary)"
                      }`}
                    >
                      {item.title}
                    </span>

                    <span
                      className={`text-xl transition-transform duration-500 ${
                        isActive ? "rotate-90 howitworksWhyChooseUs" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_30613_16171)">
                          <path
                            d="M12 3.75L12 20.25"
                            stroke="#090909"
                            strokeWidth={2.4}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.25 13.5L12 20.25L18.75 13.5"
                            stroke="#090909"
                            strokeWidth={2.4}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_30613_16171">
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
                  <div
                    className={`grid transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                      ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`text-body px-6 pb-6 transition-all duration-[300ms]
                          ${
                            isActive
                              ? "translate-y-0 opacity-100 text-(--color-primary)"
                              : "-translate-y-2 opacity-0"
                          }
                        `}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
