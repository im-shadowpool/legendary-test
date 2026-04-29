import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

// Register plugins
gsap.registerPlugin(ScrollTrigger, CustomEase);

// Create your custom easing ONCE
CustomEase.create(
  "elasticSmooth",
  "M0,0 C0.2,0.6 0.3,0.85 0.4,0.95 0.5,1.08 0.6,1.14 0.7,1.13 0.8,1.08 0.9,1.02 1,1"
);

// Export everything from one place
export { gsap, ScrollTrigger };