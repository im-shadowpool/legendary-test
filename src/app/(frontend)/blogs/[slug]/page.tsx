import { notFound } from "next/navigation";
import { fetchPageData } from "@/utils/api/pages";
import ContactSection from "@/components/UI/Global/ContactSection";
import BlogDetail from "@/components/UI/Blogs/BlogDetail";

const COMPONENT_MAP = {
  single_blog_detail_component: BlogDetail,
  contact_us_component: ContactSection,
};

const PROPS_MAP = {
  single_blog_detail_component: (data: any) => ({ data }),
  contact_us_component: (data: any) => ({ data }),
};

export default async function BlogPostPage({ params }: { params: any }) {
  const { slug } = await params;

  console.log("slug", slug);

  // Fetch single blog post data using slug
  const data = await fetchPageData(`blogs/${slug}`);

  console.log("data", data);

  if (!data || !data.single_blog_detail_component) {
    notFound();
  }

  return (
    <>
      {Object.entries(data).map(([key, value]) => {
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

// Optional: Generate static params for dynamic routes
// export async function generateStaticParams() {
//   // Fetch all blog slugs for static generation
//   const blogsData = await fetchPageData(`page/blog`);

//   if (!blogsData?.components?.recent_blog_posts_component?.data?.data) {
//     return [];
//   }

//   const blogs = blogsData.components.recent_blog_posts_component.data.data;

//   return blogs.map((blog: any) => ({
//     slug: blog.slug,
//   }));
// }
