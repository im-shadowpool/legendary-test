"use client";

import Image from "next/image";
import Link from "next/link";
import Subtitle from "@/components/Layouts/Subtitle";
import Button from "./Button";
import HeadingRenderer from "./HeadingRenderer";
import ParagraphRenderer from "./ParagraphRenderer";

export default function InfoBlock({ data, reverse = false }: any) {
  const { subhead, title, description, button, media } = data;

  const imageUrl =
    media?.url ||
    "https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/Design-front_2x.webp";

  return (
    <section className="section bg-(--color-primary) py-[64px] lg:py-[120px]">
      <div className="custom-container">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start ${
            reverse ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* 📝 Content */}
          <div className={`${reverse ? "lg:col-start-2" : ""}`}>
            <div className="flex-start-col gap-3 lg:gap-4">
              {/* Subtitle */}
              <Subtitle text={subhead} color="dark" className="" />

              {/* Title */}

              <HeadingRenderer
                text={title}
                className="text-h2 text-(--color-secondary)"
              />

              {/* Description */}

              <ParagraphRenderer
                text={description}
                className="mt-1 lg:mt-2 mb-2 lg:mb-4"
              />

              {/* CTA */}
              <Button text={button.text} href={button.url} />
            </div>
          </div>

          {/* 🖼 Image */}
          <div
            className={`relative w-full h-[250px] sm:h-[450px] lg:h-full rounded-2xl overflow-hidden ${
              reverse ? "lg:col-start-1" : ""
            }`}
          >
            <Image src={imageUrl} alt="Info" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
