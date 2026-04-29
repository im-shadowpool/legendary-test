import Button from "@/components/Layouts/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section min-h-screen lg:min-h-[110vh] w-full flex items-center justify-center bg-(--color-accent) px-6">
      <div className="text-center flex flex-col items-center gap-5 max-w-[600px]">
        {/* 404 */}
        <h1 className="text-h1-primary text-[160px]! lg:text-[250px]! text-(--color-secondary)">
          404
        </h1>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h2 className="text-h3-primary text-(--color-secondary)">
            Oops! Page not found
          </h2>
          <p className="text-body text-(--text-primary)">
            The page you are looking for doesn’t exist or has been removed.
          </p>
        </div>

        {/* Button */}
        <Button text={"Back to home"} href={"/"} />
      </div>
    </div>
  );
}

// import { notFound } from "next/navigation";
// import { fetchPageData } from "@/utils/api/pages";
// import ContactSection from "@/components/UI/Global/ContactSection";
// import BlogMain from "@/components/UI/Blogs/BlogMain";

// const COMPONENT_MAP = {
//   recent_blog_posts_component: BlogMain,
//   contact_us_component: ContactSection,
// };

// const PROPS_MAP = {
//   recent_blog_posts_component: (data: any) => ({ data }),
//   contact_us_component: (data: any) => ({ data }),
// };

// export default async function BlogPage() {
//   const data = await fetchPageData(`page/blog`);

//   if (!data || !data.components) {
//     notFound();
//   }

//   return (
//     <>
//       {Object.entries(data.components).map(([key, value]) => {
//         const Component = COMPONENT_MAP[key as keyof typeof COMPONENT_MAP];
//         if (!Component || !value) return null;

//         const props = PROPS_MAP[key as keyof typeof PROPS_MAP]
//           ? PROPS_MAP[key as keyof typeof PROPS_MAP](value)
//           : value;
//         return <Component key={key} {...props} />;
//       })}
//     </>
//   );
// }
