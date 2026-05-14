"use client";

import {
  Splide,
  SplideSlide,
  Splide as SplideInstance,
} from "@splidejs/react-splide";
import { useRef, useState } from "react";
import "@splidejs/react-splide/css";
import Subtitle from "@/components/Layouts/Subtitle";
import Image from "next/image";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import backup from "@/constants/data/backup.json";
import { resolveCMSData } from "@/utils/resolveCMSData";
import Link from "next/link";
import Button from "@/components/Layouts/Button";

export default function TestimonialsSlider({ data }: any) {
  const fallback = backup?.components?.testimonials_component;
  const finalData = resolveCMSData(data, fallback);
  const { title, subhead, items } = finalData;

  const splideRef = useRef<any>(null);

  const [index, setIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(0);

  const handleMove = (splide: any) => {
    setIndex(splide.index);
    setEndIndex(splide.Components.Controller.getEnd());
  };

  const prevSlide = () => {
    splideRef.current?.splide.go("<");
  };

  const nextSlide = () => {
    splideRef.current?.splide.go(">");
  };

  const isPrevDisabled = index === 0;
  const isNextDisabled = index >= endIndex;

  return (
    <section className="section bg-(--color-primary) py-[64px] lg:py-[120px] overflow-hidden border-y border-[#CECECE]">
      <div className="custom-container">
        <div className="flex flex-col gap-8 lg:gap-16">
          {/* Header Section */}
          <div className="flex justify-between items-end flex-col lg:flex-row w-full">
            <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-[682px] text-center lg:text-left">
              <Subtitle text={subhead} color="dark" />
              <HeadingRenderer
                text={title}
                className="text-h2 text-(--color-secondary) w-[300px] md:w-full"
              />
            </div>

            {/* Custom Arrows */}
            {
              <div className="hidden gap-2 lg:flex">
                {/* Prev */}
                <button
                  onClick={prevSlide}
                  disabled={isPrevDisabled}
                  className={`p-1 rounded-full border-2 border-(--color-brand) flex-center-row testimonials-button
              ${
                isPrevDisabled
                  ? "opacity-40 cursor-default"
                  : "hover:bg-(--color-brand) hover:scale-105 active:scale-95 cursor-pointer"
              }`}
                >
                  <ArrowLeft />
                </button>

                {/* Next */}
                <button
                  onClick={nextSlide}
                  disabled={isNextDisabled}
                  className={`p-1 rounded-full border-2 border-(--color-brand) flex-center-row testimonials-button
              ${
                isNextDisabled
                  ? "opacity-40 cursor-default"
                  : "hover:bg-(--color-brand) hover:scale-105 active:scale-95 cursor-pointer"
              }`}
                >
                  <ArrowRight />
                </button>
              </div>
            }
          </div>

          {/* Slider Section*/}
          <Splide
            ref={splideRef}
            options={{
              type: "slide",
              perPage: 2,
              perMove: 1,
              gap: "24px",
              arrows: false,
              pagination: false,
              drag: true,
              rewind: false,
              speed: 1500,
              easing: "cubic-bezier(0.91, 0, 0.35, 1)",
              breakpoints: {
                1024: {
                  gap: "16px",
                },
                768: {
                  perPage: 1,
                  gap: "16px",
                },
              },
            }}
            onMoved={handleMove}
            onMounted={(splide: any) => {
              handleMove(splide);
            }}
          >
            {items.map((item: any, i: any) => (
              <SplideSlide key={i}>
                <div className="bg-(--color-accent) rounded-3xl p-6 h-full w-full flex flex-col justify-between gap-8 lg:gap-10">
                  <div className="flex-start-col gap-6">
                    <img src="/testimonials/ratings.svg" alt="ratings" />
                    <p className="text-body text-(--text-primary)">
                      {item.desc}
                    </p>
                  </div>

                  {/* User */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-(--color-brand) flex-center-col">
                      <span className="text-body-high text-(--color-primary)">
                        {item.author.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-start-col gap-1">
                      <p className="text-body font-bold! text-(--text-primary)">
                        {item.author}
                      </p>
                      {/* <p className="text-body-low text-(--text-caption)">
                        {item.time}
                      </p> */}
                    </div>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
          {
            <div className="flex justify-center items-center w-full gap-2 lg:hidden">
              {/* Prev */}
              <button
                onClick={prevSlide}
                disabled={isPrevDisabled}
                className={`p-1 rounded-full border-2 border-(--color-brand) flex-center-row testimonials-button
              ${
                isPrevDisabled
                  ? "opacity-40 cursor-default"
                  : "hover:bg-(--color-brand) hover:scale-105 active:scale-95 cursor-pointer"
              }`}
              >
                <ArrowLeft />
              </button>

              {/* Next */}
              <button
                onClick={nextSlide}
                disabled={isNextDisabled}
                className={`p-1 rounded-full border-2 border-(--color-brand) flex-center-row testimonials-button
              ${
                isNextDisabled
                  ? "opacity-40 cursor-default"
                  : "hover:bg-(--color-brand) hover:scale-105 active:scale-95 cursor-pointer"
              }`}
              >
                <ArrowRight />
              </button>
            </div>
          }
          {/* Footer Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              href={"https://www.facebook.com/magnetme.com.au/reviews/"}
              target="_blank"
            >
              <Image
                src="/testimonials/Facebook rating light.svg"
                alt=" facebook ratings"
                width={300}
                height={67}
              />
            </Link>
            <Link
              href={
                "https://www.easyweddings.com.au/PhotoBooth/Melbourne/MagnetMe/"
              }
              target="_blank"
            >
              <Image
                src="/testimonials/Easyweddings rating.svg"
                alt="easyweddings ratings"
                width={150}
                height={150}
              />
            </Link>
            <Link
              href={
                "https://www.google.com/search?hl=en-PH&gl=ph&q=Magnet-Me+-+Event+Photo+Magnets+%E2%AD%90%E2%AD%90%E2%AD%90%E2%AD%90%E2%AD%90&ludocid=15793404106440264783&lsig=AB86z5U3tbutASUFwZPVHGp1LRTT#lrd=0x6ad6697c27beb949:0xdb2d715b96914c4f,1,,,"
              }
              target="_blank"
            >
              <Image
                src="/testimonials/Google rating light.svg"
                alt="google ratings"
                width={300}
                height={67}
              />
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <Button text={"Enquire Now"} href={"#contact-us"} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Icons ================= */

function ArrowLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={41}
      height={41}
      viewBox="0 0 41 41"
      fill="none"
    >
      <g clipPath="url(#clip0_30315_1134)">
        <path
          d="M33.923 20.1016H6.28201"
          stroke="#F05758"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <path
          d="M17.5897 8.79492L6.28197 20.1026L17.5897 31.4103"
          stroke="#F05758"
          strokeWidth={2}
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_30315_1134">
          <rect
            width={40.2051}
            height={40.2051}
            fill="white"
            transform="matrix(-1 0 0 1 40.2051 0)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={41}
      height={41}
      viewBox="0 0 41 41"
      fill="none"
    >
      <g clipPath="url(#clip0_30315_1143)">
        <path
          d="M6.2821 20.1016H33.9231"
          stroke="#F05758"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <path
          d="M22.6155 8.79492L33.9232 20.1026L22.6155 31.4103"
          stroke="#F05758"
          strokeWidth={2}
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_30315_1143">
          <rect width={40.2051} height={40.2051} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
