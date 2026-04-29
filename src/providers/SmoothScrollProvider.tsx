"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Initialize Lenis and ScrollTrigger once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    lenisRef.current = lenis;

    // 🔥 expose globally
    (window as any).lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Proxy ScrollTrigger to Lenis
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          lenis.scrollTo(value);
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll and refresh on route change
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Give the DOM time to update after navigation
    const resetScroll = () => {
      lenis.scrollTo(0, { immediate: true });
      lenis.resize(); // Recalculate scrollable height
      ScrollTrigger.refresh();
    };

    // Use a microtask or a short delay to ensure new content is rendered
    setTimeout(resetScroll, 0);
  }, [pathname]);

  return <>{children}</>;
}
