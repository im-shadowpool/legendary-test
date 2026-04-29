"use client";

import Button from "@/components/Layouts/Button";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import Subtitle from "@/components/Layouts/Subtitle";
import { useState } from "react";

const FranchiseOpportunity = ({ data }: any) => {
  const { title, description, subhead, button, video, thumbnail } = data;
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <section className="section py-[64px] lg:py-[120px]">
      <div className="custom-container flex flex-col items-center gap-12">
        {/* Header */}
        <div className="flex-center-col text-center gap-3 lg:gap-4 w-full lg:w-[1000px]">
          <Subtitle text={subhead} color="dark" />
          <HeadingRenderer
            text={title}
            className="text-h2 text-(--color-secondary)"
          />

          <p className="text-body text-(--text-primary) w-full lg:w-[75%] mt-1 lg:mt-2">
            {description}
          </p>
        </div>
        {/* Video */}
        <div className="relative w-full h-[250px] md:h-[400px] lg:h-[700px] rounded-3xl lg:rounded-[48px] overflow-hidden group">
          {/* Thumbnail + Overlay */}
          {!isPlaying && (
            <>
              <img
                src={thumbnail}
                alt="video thumbnail"
                className="w-full h-full object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-500" />

              {/* Play Button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-[60px] h-[60px] bg-(--color-brand) rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M26.25 13.9999C26.2507 14.297 26.1745 14.5893 26.0289 14.8482C25.8832 15.1071 25.673 15.3239 25.4187 15.4776L9.66 25.1179C9.39431 25.2806 9.09001 25.3694 8.77852 25.3752C8.46703 25.3809 8.15965 25.3035 7.88813 25.1507C7.61918 25.0003 7.39515 24.7811 7.23905 24.5154C7.08296 24.2497 7.00045 23.9473 7 23.6392V4.36072C7.00045 4.05259 7.08296 3.75015 7.23905 3.48448C7.39515 3.21882 7.61918 2.99953 7.88813 2.84915C8.15965 2.69641 8.46703 2.61892 8.77852 2.62469C9.09001 2.63046 9.39431 2.71927 9.66 2.88197L25.4187 12.5223C25.673 12.6759 25.8832 12.8928 26.0289 13.1517C26.1745 13.4106 26.2507 13.7028 26.25 13.9999Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </button>
            </>
          )}

          {/* Video */}
          {isPlaying && (
            <video
              src={video}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {/* Button */}
        <Button text={button.text} href={button.url} />
      </div>
    </section>
  );
};

export default FranchiseOpportunity;
