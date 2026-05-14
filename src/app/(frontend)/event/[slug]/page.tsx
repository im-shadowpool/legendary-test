import { notFound } from "next/navigation";
import { fetchPageData } from "@/utils/api/pages";
import PageTitle from "@/components/Layouts/PageTitle";
import InfoBlock from "@/components/Layouts/InfoBlock";
import TeamSection from "@/components/UI/About/TeamSection";
import MissionAndVison from "@/components/UI/About/MissionAndVison";
import OurValues from "@/components/UI/About/OurValues";
import ContactSection from "@/components/UI/Global/ContactSection";
import HowItWorksCards from "@/components/UI/Global/HowItWorksCards";
import PackagesSection from "@/components/UI/HowItWorks/PackagesSection";
import WhyPartner from "@/components/UI/HowItWorks/WhyPartner";
import FAQsSection from "@/components/UI/Global/FAQsSection";
import PartnersSection from "@/components/UI/Global/PartnersSection";
import TestimonialsSlider from "@/components/UI/Global/TestimonialsSection";
import ImageScrollSection from "@/components/UI/Global/ImageScrollSection";
import FranchiseOpportunity from "@/components/UI/Franchise/FranchiseOpportunity";

const COMPONENT_MAP = {
  commonbanner_component: PageTitle,
  weare_component: InfoBlock,
  team_component: TeamSection,
  mission_component: MissionAndVison,
  grid_three_component: OurValues,
  contact_us_component: ContactSection,
  how_it_works_component: HowItWorksCards,
  grid_four_component: PackagesSection,
  why_choose_component: WhyPartner,
  faq_component: FAQsSection,
  patners_slider_component: PartnersSection,
  testimonials_component: TestimonialsSlider,
  slider_component: ImageScrollSection,
};

const PROPS_MAP = {
  commonbanner_component: (data: any) => ({ data }),
  weare_component: (data: any, slug: string) => ({ data, slug }),
  team_component: (data: any) => ({ data }),
  mission_component: (data: any) => ({ data }),
  grid_three_component: (data: any) => ({ data }),
  contact_us_component: (data: any) => ({ data }),
  how_it_works_component: (data: any) => ({ data }),
  grid_four_component: (data: any) => ({ data }),
  why_choose_component: (data: any) => ({ data }),
  faq_component: (data: any) => ({ data }),
  patners_slider_component: (data: any) => ({ data }),
  testimonials_component: (data: any) => ({ data }),
  slider_component: (data: any) => ({ data }),
};

export default async function Page({ params }: { params: any }) {
  const { slug } = await params;

  // console.log("slug", slug);
  if (!slug) notFound();

  const data = await fetchPageData(`event/${slug}`);

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
          ? PROPS_MAP[key as keyof typeof PROPS_MAP](value, slug)
          : value;
        return <Component key={key} {...props} />;
      })}
    </>
  );
}
