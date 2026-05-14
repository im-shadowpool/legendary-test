"use client";

import Subtitle from "@/components/Layouts/Subtitle";
import Button from "@/components/Layouts/Button";
import FlipCard from "@/components/Layouts/FlipCard";
import clsx from "clsx";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import ParagraphRenderer from "@/components/Layouts/ParagraphRenderer";

export default function HowItWorksCards({ data }: any) {
  const { title, subhead, description, items } = data;
  return (
    <section className="section relative bg-(--color-brand) pt-[64px] lg:pt-[120px] pb-[140px] md:pb-[200px] flex flex-col gap-16 lg:gap-24">
      {/* Header */}
      <div className="custom-container">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-6 lg:gap-16">
          <div className="flex-start-col gap-4 max-w-full lg:max-w-[800px] shrink-0">
            <Subtitle text={subhead} color="light" />
            <HeadingRenderer
              text={title}
              className="text-h2 text-(--color-primary)"
            />
          </div>

          <p className="text-(--color-primary) max-w-full lg:max-w-[400px]">
            {description}
          </p>
        </div>
      </div>

      {/* Sticky Cards */}
      <div className="relative custom-container flex flex-col gap-4">
        {items.map((card: any, i: number) => {
          const isEven = (i + 1) % 2 === 0;

          return (
            <div
              key={card.id}
              className={`sticky top-[36px] md:top-[64px] lg:top-[74px] 2xl:top-[120px]`}
              style={{ zIndex: 10 + i }}
            >
              <div
                className={clsx(
                  "rounded-[24px] lg:rounded-[48px] py-12 lg:py-16 px-6 lg:px-24 min-h-full h-[800px] md:h-auto md:min-h-[60vh] flex items-center justify-between flex-col lg:flex-row gap-12 shadow",
                  isEven ? "bg-[#fee2e2]" : "bg-(--color-primary)",
                )}
              >
                {/* Left Content */}
                <div className="max-w-full lg:max-w-[630px] w-full">
                  <div className="flex items-center gap-4">
                    <span className="cardNumber">{`0${card.id}`}</span>

                    <h3 className="text-h1-primary text-(--color-secondary)">
                      {card.title}
                    </h3>
                  </div>
                  <ParagraphRenderer
                    text={card.description}
                    className="mt-6 mb-8 lg:mt-10 lg:mb-12"
                  />
                  <Button text={card.button.text} href={card.button.url} />
                </div>

                {/* Right Image */}
                <FlipCard
                  className={`${isEven ? "-rotate-6" : "rotate-6"}`}
                  frontImage={card.image}
                  backImage={card.image2}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
