import { notFound } from "next/navigation";
import { fetchPageData } from "@/utils/api/pages";
import ContactSection from "@/components/UI/Global/ContactSection";
import BlogMain from "@/components/UI/Blogs/BlogMain";

const COMPONENT_MAP = {
  recent_blog_posts_component: BlogMain,
  contact_us_component: ContactSection,
};

const PROPS_MAP = {
  recent_blog_posts_component: (data: any) => ({ data }),
  contact_us_component: (data: any) => ({ data }),
};

export default async function BlogPage() {
  const data = await fetchPageData(`page/blog`);

  if (!data || !data.components) {
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
