"use client";

import React, { useState, useEffect, useCallback } from "react";
function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

export interface GalleryImageInfo {
  id: string | number;
  image: string;
  alt: string;
}

interface GalleryImageGridProps {
  images: GalleryImageInfo[];
}

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const PrevIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const NextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ZoomInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

const ZoomOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

export const GalleryImageGrid: React.FC<GalleryImageGridProps> = ({
  images,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clickStart, setClickStart] = useState({ x: 0, y: 0 });

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    // Slight delay to allow DOM to render before applying transition class
    setTimeout(() => setIsMounted(true), 10);
  };

  const closeLightbox = useCallback(() => {
    setIsMounted(false);
    setTimeout(() => {
      setSelectedIndex(null);
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    }, 300); // Wait for transition
  }, []);

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex === null) return;
      setSelectedIndex((prev) => (prev! + 1) % images.length);
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    },
    [selectedIndex, images.length],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex === null) return;
      setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    },
    [selectedIndex, images.length],
  );

  const handleZoomIn = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  }, []);

  const handleZoomOut = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    setClickStart({ x: clientX, y: clientY });

    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    setPosition({ x: clientX - dragStart.x, y: clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const dist =
      Math.abs(e.clientX - clickStart.x) + Math.abs(e.clientY - clickStart.y);
    if (dist > 5) return;

    if (zoomLevel <= 1) {
      setZoomLevel(2.5);
    } else {
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, closeLightbox, handleNext, handlePrev]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 h-full w-full">
        {images.map((img: any, index: number) => (
          <div
            key={index}
            className="relative group overflow-hidden  cursor-pointer bg-gray-100 rounded h-[154px] md:h-[186px] lg:h-[35vh]"
            onClick={() => openLightbox(index)}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.image}
              alt={"gallery"}
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5  z-20 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedIndex !== null && (
        <div
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 ease-in-out",
            isMounted ? "opacity-100" : "opacity-0",
          )}
        >
          {/* Controls Layer */}
          <div
            className={cn(
              "absolute top-0 left-0 w-full p-4 flex justify-between items-center z-[110] transition-all duration-300 delay-100",
              isMounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4",
            )}
          >
            <div className="text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium tracking-wide">
              {selectedIndex + 1} / {images.length}
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-black/50 rounded-full p-1">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="p-2 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-full hover:bg-white/10"
                >
                  <ZoomOutIcon />
                </button>
                <span className="text-white text-xs font-mono w-10 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 4}
                  className="p-2 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-full hover:bg-white/10"
                >
                  <ZoomInIcon />
                </button>
              </div>
              <button
                onClick={closeLightbox}
                className="p-3 bg-black/50 text-white rounded-full hover:bg-white/20 transition-all backdrop-blur-md"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <button
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all z-[110] backdrop-blur-md hidden md:flex duration-300 delay-100",
              isMounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4",
            )}
            onClick={handlePrev}
          >
            <PrevIcon />
          </button>

          <button
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all z-[110] backdrop-blur-md hidden md:flex duration-300 delay-100",
              isMounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4",
            )}
            onClick={handleNext}
          >
            <NextIcon />
          </button>

          {/* Image Container Layer */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onClick={closeLightbox}
          >
            <div
              className={cn(
                "relative transition-all duration-300",
                isMounted ? "scale-100 opacity-100" : "scale-90 opacity-0",
                isDragging
                  ? "cursor-grabbing"
                  : zoomLevel > 1
                    ? "cursor-zoom-out"
                    : "cursor-zoom-in",
                // Disable transition during panning to prevent lag
                zoomLevel > 1 && isDragging ? "transition-none" : "",
              )}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              onClick={handleImageClick}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[selectedIndex].image}
                alt={"gallery"}
                className="max-w-[95vw] max-h-[85vh] object-contain select-none shadow-2xl"
                draggable={false}
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-[110] md:hidden transition-all duration-300 delay-100",
              isMounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
          >
            <button
              className="p-3 bg-black/50 text-white rounded-full hover:bg-white/20 transition-all backdrop-blur-md"
              onClick={handlePrev}
            >
              <PrevIcon />
            </button>
            <div className="flex items-center gap-1 bg-black/50 rounded-full p-1 mx-2">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-2 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-full"
              >
                <ZoomOutIcon />
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 4}
                className="p-2 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-full"
              >
                <ZoomInIcon />
              </button>
            </div>
            <button
              className="p-3 bg-black/50 text-white rounded-full hover:bg-white/20 transition-all backdrop-blur-md"
              onClick={handleNext}
            >
              <NextIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
