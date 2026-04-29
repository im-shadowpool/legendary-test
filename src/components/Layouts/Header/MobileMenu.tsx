"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button";
import {
  menuData,
  type MenuItem,
  type DropdownSection,
} from "@/constants/data/Menu";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: any;
};

export default function MobileMenu({
  isOpen,
  onClose,
  triggerRef,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Accordion states
  const [openParentIndex, setOpenParentIndex] = useState<number | null>(null);
  const [openSubIndex, setOpenSubIndex] = useState<
    Record<number, number | null>
  >({});

  // ---------- Animation (unchanged) ----------
  useEffect(() => {
    if (!menuRef.current || !triggerRef?.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    if (tl.current) tl.current.kill();
    tl.current = gsap.timeline({ paused: true });

    gsap.set(menuRef.current, {
      transformOrigin: `${startX}px ${startY}px`,
      scale: 0.5,
      translateX: "100%",
      borderRadius: "40%",
      opacity: 0,
      willChange: "transform, opacity",
    });

    tl.current.to(menuRef.current, {
      scale: 1,
      borderRadius: "0%",
      opacity: 1,
      translateX: "0%",
      duration: 0.9,
      ease: "expo.out",
    });
  }, [triggerRef]);

  useEffect(() => {
    if (!tl.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      tl.current.play();
      // Reset all accordion states when menu opens
      setOpenParentIndex(null);
      setOpenSubIndex({});
    } else {
      document.body.style.overflow = "";
      tl.current.reverse();
    }
  }, [isOpen]);

  // ---------- Handlers ----------
  const handleLinkClick = () => onClose();

  const toggleParent = (index: number) => {
    setOpenParentIndex((prev) => (prev === index ? null : index));
    // Close any open sub-section when parent toggles
    setOpenSubIndex((prev) => ({ ...prev, [index]: null }));
  };

  const toggleSub = (parentIndex: number, sectionIndex: number) => {
    setOpenSubIndex((prev) => ({
      ...prev,
      [parentIndex]: prev[parentIndex] === sectionIndex ? null : sectionIndex,
    }));
  };

  // ---------- Render ----------
  return (
    <div
      ref={menuRef}
      className="fixed top-0 left-0 w-full h-screen bg-(--color-primary) z-[999] p-6 flex flex-col overflow-y-auto"
      style={{
        transform: "scale(0.5) translateX(100%)",
        borderRadius: "40%",
        opacity: 0,
      }}
    >
      {/* Logo + Close */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/" onClick={handleLinkClick}>
          <Image
            src="/magnet-logo.svg"
            alt="Magnet-Me"
            width={182}
            height={50}
            priority
          />
        </Link>
        <button onClick={onClose} className="z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 19 20"
            fill="none"
          >
            <path
              d="M3.45312 3.27246L15.6668 15.4861"
              stroke="#3A3A3A"
              strokeWidth="1.29545"
              strokeLinecap="round"
            />
            <path
              d="M3.45312 15.3633L15.6668 3.14962"
              stroke="#3A3A3A"
              strokeWidth="1.29545"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Menu items */}
      <div className="flex flex-col gap-6">
        {menuData.map((item: MenuItem, parentIdx: number) => {
          // Simple link (no dropdown)
          if (!item.dropdown) {
            return (
              <Link
                key={parentIdx}
                href={item.href}
                onClick={handleLinkClick}
                className="menu-item footer-headings text-(--text-primary)"
              >
                {item.label}
              </Link>
            );
          }

          // Item with dropdown (only "Events" in your current data)
          const isParentOpen = openParentIndex === parentIdx;
          return (
            <div key={parentIdx}>
              {/* Parent row */}
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`menu-item footer-headings ${isParentOpen ? "text-(--color-brand)" : "text-(--text-primary)"}`}
                >
                  {item.label}
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleParent(parentIdx);
                  }}
                  className="p-1 transition-transform duration-200"
                  style={{
                    transform: isParentOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  aria-label={`Toggle ${item.label} menu`}
                >
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    stroke={isParentOpen ? "#f05758" : "#4f4f4f"}
                    strokeWidth="2"
                    strokeLinecap="square"
                  >
                    <path d="M2 2L7 7L12 2" />
                  </svg>
                </button>
              </div>

              {/* First level children: section titles (Social Events, Corporate) */}
              {isParentOpen && (
                <div className="overflow-hidden animate-slide-down pl-4 mt-2">
                  {item.dropdown.map(
                    (section: DropdownSection, sectionIdx: number) => {
                      const isSubOpen = openSubIndex[parentIdx] === sectionIdx;
                      return (
                        <div key={sectionIdx} className="">
                          {/* Section header (acts as toggle) */}
                          <div
                            className="flex items-center justify-between py-2 cursor-pointer"
                            onClick={() => toggleSub(parentIdx, sectionIdx)}
                          >
                            <span
                              className={`footer-headings ${isSubOpen ? "text-(--color-brand)" : "text-(--text-primary)"}`}
                            >
                              {section.title}
                            </span>
                            <div className="p-1">
                              <svg
                                width="14"
                                height="8"
                                viewBox="0 0 14 8"
                                fill="none"
                                stroke={isSubOpen ? "#f05758" : "#4f4f4f"}
                                strokeWidth="2"
                                strokeLinecap="square"
                                className={`transition-transform duration-200 ${
                                  isSubOpen ? "rotate-180" : ""
                                }`}
                              >
                                <path d="M2 2L7 7L12 2" />
                              </svg>
                            </div>
                          </div>

                          {/* Second level children: actual links */}
                          {isSubOpen && (
                            <div className="overflow-hidden animate-slide-down pl-4 py-2 flex flex-col gap-4">
                              {section.items.map((subItem, itemIdx) => (
                                <Link
                                  key={itemIdx}
                                  href={subItem.href}
                                  onClick={handleLinkClick}
                                  className="footer-headings text-(--text-primary) hover:text-(--color-brand)"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-auto pt-6">
        <Button
          text="let’s connect"
          href="/contact-us"
          className="mobile-menu-button"
        />
      </div>
    </div>
  );
}
