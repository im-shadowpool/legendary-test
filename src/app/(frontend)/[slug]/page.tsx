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
import Events from "@/components/Layouts/Events/Events";
import GalleryPage from "@/components/UI/Gallery/GalleryPage";
import FAQCta from "@/components/Layouts/FAQs/FAQCta";
import HomePageHero from "@/components/UI/Franchise/FranchiseHeroSection";
import HomePageFranchiseOpportunity from "@/components/UI/Homepage/HomePageFranchiseOpportunity";
import LocationsListingSection from "@/components/UI/Franchise/LocationsListingSection";
import FranchiseOpportunity from "@/components/UI/Franchise/FranchiseOpportunity";
import FranchiseEquipmentTraining from "@/components/UI/Franchise/FranchiseEquipmentTraining";

const COMPONENT_MAP = {
  commonbanner_component: PageTitle, //
  weare_component: InfoBlock, //
  hero_component: HomePageHero,
  franchise_component: HomePageFranchiseOpportunity,
  team_component: TeamSection, //
  mission_component: MissionAndVison, //
  grid_three_component: OurValues, //
  contact_us_component: ContactSection, //
  how_it_works_component: HowItWorksCards, //
  grid_four_component: PackagesSection, //
  why_choose_component: WhyPartner, //
  faq_component: FAQsSection, //
  patners_slider_component: PartnersSection, //
  testimonials_component: TestimonialsSlider, //
  slider_component: ImageScrollSection,
  eventlist_component: Events, //
  gallery_component: GalleryPage, //
  cta_component: FAQCta, //
  location_component: LocationsListingSection, //
  video_component: FranchiseOpportunity, //
  equipment_component: FranchiseEquipmentTraining, //
};

const PROPS_MAP = {
  commonbanner_component: (data: any) => ({ data }),
  weare_component: (data: any) => ({ data }),
  team_component: (data: any) => ({ data }),
  mission_component: (data: any) => ({ data }),
  grid_three_component: (data: any) => ({ data }),
  contact_us_component: (data: any, slug: string) => ({ data, slug }),
  how_it_works_component: (data: any) => ({ data }),
  grid_four_component: (data: any) => ({ data }),
  why_choose_component: (data: any) => ({ data }),
  faq_component: (data: any, slug: string) => ({ data, slug }),
  patners_slider_component: (data: any) => ({ data }),
  testimonials_component: (data: any) => ({ data }),
  slider_component: (data: any) => ({ data }),
  eventlist_component: (data: any) => ({ data }),
  gallery_component: (data: any) => ({ data }),
  cta_component: (data: any) => ({ data }),
  hero_component: (data: any) => ({ data }),
  franchise_component: (data: any) => ({ data }),
  location_component: (data: any) => ({ data }),
  video_component: (data: any) => ({ data }),
  equipment_component: (data: any) => ({ data }),
};

export default async function Page({ params }: { params: any }) {
  const { slug } = await params;

  console.log("slug", slug);
  if (!slug) notFound();

  const data = await fetchPageData(`page/${slug}`);

  if (!data || !data.components) {
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
