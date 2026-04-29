"use client";

import FAQsList from "@/components/Layouts/FAQs/FAQsList";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import Subtitle from "@/components/Layouts/Subtitle";
import { useRef } from "react";

const FAQsSection = ({ data, slug }: any) => {
  const { title, subhead, items, description } = data;
  const sectionRef = useRef<HTMLDivElement>(null);

  const paddingSection =
    slug === "faqs"
      ? "pt-[180px] lg:pt-[264px] pb-[24px]"
      : "pt-[64px] pb-[64px] lg:pt-[120px] lg:pb-[120px]";
  const initialCount = slug === "faqs" ? 6 : 3;

  return (
    <section
      ref={sectionRef}
      className={`section bg-(--color-accent) ${paddingSection}`}
    >
      <div className="custom-container flex-center-col gap-12">
        <div className="flex-center-col gap-3 lg:gap-4 text-center w-full lg:w-[1000px]">
          <Subtitle text={subhead} color="dark" />
          <HeadingRenderer
            text={title}
            className="text-h2 text-(--color-secondary)"
          />
          <p className="text-body text-(--text-primary) w-full lg:w-[75%] mt-2">
            {description}
          </p>
        </div>
        <div className="px-6 pb-12 lg:p-12 pt-6 bg-(--color-primary) rounded-xl lg:rounded-4xl w-full">
          <FAQsList
            faqs={items}
            initialCount={initialCount}
            sectionRef={sectionRef}
          />
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
