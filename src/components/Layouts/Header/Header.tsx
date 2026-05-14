"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Menu from "./Menu";
import Button from "../Button";
import MobileMenu from "./MobileMenu";
import { isSpecialRoute } from "@/utils/isSpecialRoute";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [is404Page, setIs404Page] = useState(false);

  useEffect(() => {
    const notFoundElement = document.querySelector('[data-page="not-found"]');

    setIs404Page(!!notFoundElement);
  }, [pathname]);

  const isLightPage = is404Page || isSpecialRoute(pathname);
  const [isVisible, setIsVisible] = useState(true);
  const [isAboveThreshold, setIsAboveThreshold] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const lastScrollY = useRef(0);
  const direction = useRef<"down" | "up">("down");
  const scrollYAtDirectionChange = useRef(0);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  const THRESHOLD =
    pathname === "/" ? (isMobile ? 90 : 2000) : isMobile ? 90 : 600;

  const SCROLL_UP_BUFFER = 100;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollingDown = currentScroll > lastScrollY.current;
      const aboveThreshold = currentScroll < THRESHOLD;

      setIsAboveThreshold(aboveThreshold);

      // Track direction changes
      if (scrollingDown !== (direction.current === "down")) {
        direction.current = scrollingDown ? "down" : "up";
        scrollYAtDirectionChange.current = lastScrollY.current;
      }

      if (scrollingDown) {
        // Always hide when scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        if (aboveThreshold) {
          // Before threshold: only show at exact top
          setIsVisible(currentScroll === 0);
        } else {
          // After threshold: show only after scrolling up >= 100px
          const scrollUpDelta =
            scrollYAtDirectionChange.current - currentScroll;
          setIsVisible(scrollUpDelta >= SCROLL_UP_BUFFER);
        }
      }

      lastScrollY.current = currentScroll;
    };

    // Initial check
    handleScroll();

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 z-50 header-magnet transition-all duration-300 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "lg:-translate-y-10 lg:opacity-0 lg:pointer-events-none"
        } ${!isAboveThreshold ? "header-scrolled" : ""}`}
      >
        {/* Top header */}
        <div className="bg-(--color-brand) text-white py-2 text-center flex-center-row gap-2 top-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M9.5625 1.125C7.92204 1.12686 6.34931 1.77935 5.18933 2.93933C4.02935 4.09931 3.37686 5.67204 3.375 7.3125C3.375 12.607 9 16.6057 9.23977 16.773C9.33434 16.8393 9.44702 16.8748 9.5625 16.8748C9.67798 16.8748 9.79066 16.8393 9.88523 16.773C10.125 16.6057 15.75 12.607 15.75 7.3125C15.7481 5.67204 15.0956 4.09931 13.9357 2.93933C12.7757 1.77935 11.203 1.12686 9.5625 1.125ZM9.5625 5.0625C10.0075 5.0625 10.4425 5.19446 10.8125 5.44169C11.1825 5.68893 11.4709 6.04033 11.6412 6.45146C11.8115 6.8626 11.8561 7.315 11.7693 7.75145C11.6825 8.18791 11.4682 8.58882 11.1535 8.90349C10.8388 9.21816 10.4379 9.43245 10.0015 9.51927C9.565 9.60608 9.1126 9.56153 8.70146 9.39123C8.29033 9.22093 7.93893 8.93254 7.69169 8.56253C7.44446 8.19252 7.3125 7.75751 7.3125 7.3125C7.3125 6.71576 7.54955 6.14347 7.97151 5.72151C8.39347 5.29955 8.96576 5.0625 9.5625 5.0625Z"
              fill="white"
            />
          </svg>
          <span className="text-body text-(--color-primary)">
            <span className="hidden md:inline">FRANCHISE AVAILABLE: </span>
            NSW | VIC | QLD | WA | SA | TAS | ACT
          </span>
        </div>

        {/* Header */}
        <section className="section">
          <div className="custom-container flex items-center justify-between py-6 header-content">
            <Link href="/">
              <Image
                src="/magnet-logo.svg"
                alt="Logo"
                width={182}
                height={50}
                priority
              />
            </Link>
            <button
              ref={buttonRef}
              onClick={() => setIsMenuOpen(true)}
              className="hamburger-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={20}
                viewBox="0 0 22 20"
                fill="none"
              >
                <path
                  d="M0.928711 4.5L20.9287 4.5"
                  stroke={isLightPage ? "var(--text-primary)" : "white"}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
                <path
                  d="M0.928711 14.5L20.9287 14.5"
                  stroke={isLightPage ? "var(--text-primary)" : "white"}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="hidden lg:flex">
              <Menu pathname={pathname} isLightPage={isLightPage} />
            </div>
            <div className="hidden lg:flex">
              <Button text="let’s connect" href="/contact-us" variant="call" />
            </div>
          </div>
        </section>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerRef={buttonRef}
        pathname={pathname}
      />
    </>
  );
}
