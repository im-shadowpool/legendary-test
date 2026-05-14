import { notFound } from "next/navigation";
import { fetchPageData } from "@/utils/api/pages";
import HomePageHero from "@/components/UI/Homepage/HomePageHero";
import HomePageAbout from "@/components/UI/Homepage/HomePageAbout";
import HomePageCardSlider from "@/components/UI/Homepage/HomePageCardSlider";
import HowItWorksCards from "@/components/UI/Global/HowItWorksCards";
import PartnersSection from "@/components/UI/Global/PartnersSection";
import TestimonialsSlider from "@/components/UI/Global/TestimonialsSection";
import FAQsSection from "@/components/UI/Global/FAQsSection";
import HomePageFranchiseOpportunity from "@/components/UI/Homepage/HomePageFranchiseOpportunity";
import ContactSection from "@/components/UI/Global/ContactSection";
import ImageScrollSection from "@/components/UI/Global/ImageScrollSection";

const COMPONENT_MAP = {
  hero_component: HomePageHero,
  weare_component: HomePageAbout,
  eventtype_component: HomePageCardSlider,
  how_it_works_component: HowItWorksCards,
  patners_slider_component: PartnersSection,
  testimonials_component: TestimonialsSlider,
  faq_component: FAQsSection,
  slider_component: ImageScrollSection,
  franchise_component: HomePageFranchiseOpportunity,
  contact_us_component: ContactSection,
};

const PROPS_MAP = {
  hero_component: (data: any) => ({ data }),
  weare_component: (data: any) => ({ data }),
  eventtype_component: (data: any) => ({ data }),
  how_it_works_component: (data: any) => ({ data }),
  patners_slider_component: (data: any) => ({ data }),
  testimonials_component: (data: any) => ({ data }),
  faq_component: (data: any) => ({ data }),
  slider_component: (data: any) => ({ data }),
  franchise_component: (data: any) => ({ data }),
  contact_us_component: (data: any) => ({ data }),
};

export default async function Page({ params }: { params: any }) {
  const { slug } = await params;

  const data = await fetchPageData(`page/home`);

  if (!data || !data.components) {
    // console.log("DATA FAILED:", data);
    notFound();
  }

  return (
    <>
      {Object.entries(data.components).map(([key, value]) => {
        const Component = COMPONENT_MAP[key as keyof typeof COMPONENT_MAP];
        if (!Component || !value) return null;

        const props = PROPS_MAP[key as keyof typeof PROPS_MAP]
          ? PROPS_MAP[key as keyof typeof PROPS_MAP](value)
          : value;
        return <Component key={key} {...props} />;
      })}
    </>
  );
}
