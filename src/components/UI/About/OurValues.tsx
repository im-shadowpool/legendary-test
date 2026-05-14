"use client";

import Subtitle from "@/components/Layouts/Subtitle";
import Image from "next/image";
import Button from "@/components/Layouts/Button";

const OurValues = ({ data }: any) => {
  const { subhead, title, button, items } = data;

  return (
    <section className="section bg-(--color-brand) py-[64px] lg:py-[120px]">
      <div className="custom-container flex-center-col gap-12 lg:gap-16">
        {/* Header */}
        <div className="flex-center-col text-center gap-3 lg:gap-4">
          <Subtitle text={subhead} color="light" />

          <h2 className="text-h2 text-(--color-primary)">{title}</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-(--color-primary) group rounded-2xl p-4 lg:p-6 flex-center-col text-center gap-4 hover:scale-[1.02] hover:shadow transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 relative mb-2 lg:mb-4">
                <Image
                  src={
                    item?.icon ||
                    "https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/attraction.gif"
                  }
                  alt={item.title}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-h3 text-(--color-secondary) group-hover:text-(--color-brand) transition-all duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-body text-(--text-primary)">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}

        {button?.text && (
          <Button
            text={button.text}
            href={button.url}
            className="button-invert"
          />
        )}
      </div>
    </section>
  );
};

export default OurValues;
