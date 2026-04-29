"use client";

import { useState } from "react";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import Subtitle from "@/components/Layouts/Subtitle";

const FranchiseEquipmentTraining = ({ data }: any) => {
  const { title, description, subhead, images, content } = data;
  const [activeImageId, setActiveImageId] = useState<number>(1);

  return (
    <section className="section py-[64px] lg:py-[120px] border-t border-t-gray-200">
      <div className="custom-container flex flex-col items-stretch gap-4 lg:flex-row lg:gap-24">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-3 lg:gap-4 w-full lg:w-[640px] shrink-0">
          <Subtitle text={subhead} color="dark" className="" />
          <HeadingRenderer
            text={title}
            className="text-h2 text-(--color-secondary)"
          />
          <p className="text-body text-(--text-primary) w-full lg:w-[75%]">
            {description}
          </p>
          <div className="image-box w-full mt-4">
            {images.map((image: any) => (
              <img
                key={image.id}
                src={image.src}
                className={`feature-image ${activeImageId === image.id ? "active" : ""}`}
                data-img={image.id}
                alt={`Feature ${image.id}`}
              />
            ))}
          </div>
        </div>

        {/* Content Section with Images and Cards */}
        <div className="flex flex-col gap-4 w-full">
          {/* Right - Cards Section */}
          {content.map((item: any) => (
            <div
              key={item.id}
              className={`feature-card ${activeImageId === item.id ? "active" : ""}`}
              data-target={item.id}
              onMouseEnter={() => setActiveImageId(item.id)}
            >
              <div className="feature-header">
                <span className="text-h3 text-(--color-brand) opacity-50">
                  {String(item.id).padStart(2, "0")}
                </span>
                <h4 className="text-h3 text-(--color-secondary)">
                  {item.title}
                </h4>
              </div>
              <p className="text-body text-(--text-primary)">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .image-box {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          height: 100%;
        }

        .feature-image {
          position: absolute;
          width: 100%;
          height: 100% !important;
          object-fit: cover;
          object-position: top;
          opacity: 0;
          transform: scale(1.1);
          transition:
            opacity 0.5s cubic-bezier(0.85, 0, 0.41, 0.99),
            transform 0.8s cubic-bezier(0.85, 0, 0.41, 0.99);
        }

        .feature-image.active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }

        .feature-card {
          display: flex;
          padding: 24px;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          border-radius: 16px;
          align-self: stretch;
          background-color: #fef2f2;
          transition: 0.6s ease;
        }

        .feature-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .feature-card span {
          color: #f05858;
          transition: 0.4s ease;
        }

        .feature-card h4,
        .feature-card p {
          transition: 0.4s ease;
        }

        .feature-card.active {
          background-color: #f05858;
          color: white;
        }

        .feature-card.active span {
          color: white;
        }

        .feature-card.active h4 {
          color: white;
        }

        .feature-card.active p {
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 1024px) {
          .feature-card h4 {
            font-size: 18px;
            font-weight: 600;
            line-height: 24px;
          }
          .image-box {
            min-height: 475px !important;
          }
        }

        @media (max-width: 640px) {
          .image-box {
            min-height: 250px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FranchiseEquipmentTraining;
