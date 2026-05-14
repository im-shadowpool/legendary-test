"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ContactSection from "../Global/ContactSection";

export default function BlogDetail({ data }: any) {
  const router = useRouter();
  const blog = data;

  const [activeId, setActiveId] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  const formattedDate = new Date(blog.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Create social share URLs from our end
  const getShareUrls = () => {
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(blog.title);

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };
  };

  const shareUrls = getShareUrls();

  // Smooth scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  // Track active heading on scroll
  useEffect(() => {
    setIsClient(true);

    if (!blog["left-sidebar"] || blog["left-sidebar"].length === 0) return;

    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const sidebarItems = blog["left-sidebar"];
          let currentActiveId = "";

          for (const item of sidebarItems) {
            const element = document.getElementById(item.id);
            if (element) {
              const rect = element.getBoundingClientRect();
              // Offset to trigger heading active state
              if (rect.top <= 150) {
                currentActiveId = item.id;
              } else {
                break;
              }
            }
          }

          if (currentActiveId) {
            setActiveId(currentActiveId);
          } else if (sidebarItems.length > 0) {
            // Default to first if none are active yet
            setActiveId(sidebarItems[0].id);
          }

          isScrolling = false;
        });
        isScrolling = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog]);

  // Share function
  const handleShare = (url: string) => {
    if (isClient) {
      window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
    }
  };

  return (
    <>
      <section className="section bg-(--color-accent) pb-[64px] pt-[180px] lg:pb-[120px] lg:pt-[264px]">
        <div className="custom-container flex flex-col gap-8 lg:gap-16">
          {/* Header */}
          <div className="flex flex-col gap-6 lg:gap-12">
            <div className="flex flex-col gap-4 lg:gap-6">
              {/* Breadcrumb */}
              <div className="flex flex-wrap gap-2 text-body text-(--text-caption)">
                <Link href="/" className="transition inline-link-style">
                  Home
                </Link>

                <span>/</span>

                <Link href="/blogs" className="transition inline-link-style">
                  Blog
                </Link>

                <span>/</span>

                <p className="w-full md:w-auto text-(--color-brand)">
                  {blog.title}
                </p>
              </div>
              {/* Details */}
              <h1 className="blog-single-title text-[32px] text-(--color-secondary)">
                {blog.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-body text-(--text-caption)">
                  {blog.categoryLabel}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-(--text-caption)" />
                <span className="text-body text-(--text-caption)">
                  {formattedDate}
                </span>
              </div>
            </div>
            {/* Featured image */}
            <div className="overflow-hidden rounded-4xl w-full h-[250px] sm:h-[450px] lg:h-[550px]">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Main content area with sidebar */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 2xl:gap-24 ">
            {/* Left Sidebar - Table of Contents */}
            {blog["left-sidebar"] && blog["left-sidebar"].length > 0 && (
              <aside className="w-full lg:w-[300px] shrink-0">
                <div className="lg:sticky lg:top-24">
                  <div className="bg-(--color-primary) rounded-2xl p-6 shadow-sm">
                    <h3 className="text-(--color-secondary) faq-question-text mb-6 pb-2 border-b border-[#E5E5E5]">
                      Table of Contents
                    </h3>
                    <nav className="flex flex-col gap-2">
                      {blog["left-sidebar"].map((item: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => scrollToHeading(item.id)}
                          className={`
                          text-left text-sm py-2 px-3 rounded-lg transition-all duration-300
                          hover:bg-(--color-accent) hover:text-(--color-brand)
                          ${
                            activeId === item.id
                              ? "bg-(--color-brand) text-white font-medium"
                              : "text-(--color-secondary) hover:pl-4"
                          }
                        `}
                        >
                          {item.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>
            )}

            {/* Main content */}
            <article className="flex-1 max-w-full w-full">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            {/* Right Sidebar - Social Share */}
            <aside className="w-full lg:w-[80px] shrink-0 mt-4">
              <div className="lg:sticky lg:top-24">
                <div className="flex flex-row lg:flex-col items-center gap-4">
                  <span className="text-body text-(--text-caption) whitespace-nowrap">
                    Share
                  </span>
                  <div className="flex flex-row lg:flex-col gap-2">
                    {/* Facebook Share */}
                    <button
                      onClick={() => handleShare(shareUrls.facebook)}
                      className=""
                      aria-label="Share on Facebook"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          d="M28 4H4V28H16.828V18.7187H13.704V15.0853H16.828V12.412C16.828 9.31333 18.7227 7.624 21.488 7.624C22.42 7.62133 23.3507 7.66933 24.2773 7.764V11.004H22.3733C20.8667 11.004 20.5733 11.716 20.5733 12.7667V15.08H24.1733L23.7053 18.7133H20.552V28H28V4Z"
                          fill="#F05758"
                        />
                      </svg>
                    </button>

                    {/* Twitter/X Share */}
                    <button
                      onClick={() => handleShare(shareUrls.twitter)}
                      className=""
                      aria-label="Share on Twitter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          d="M27.4277 27.4287H3.42773V3.42871H27.4277V27.4287ZM7.24219 8L13.4531 16.125L7.56348 22.8574H10.0889L14.6309 17.6641L18.6064 22.8574H23.6777L17.1992 14.293L22.7061 8H20.1846L16.0312 12.7461L12.4424 8H7.24219ZM11.6816 9.42871L20.6953 21.3506H19.2988L10.1816 9.42871H11.6816Z"
                          fill="#F05758"
                        />
                      </svg>
                    </button>

                    {/* LinkedIn Share */}
                    <button
                      onClick={() => handleShare(shareUrls.linkedin)}
                      className=""
                      aria-label="Share on LinkedIn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          d="M28 4H4V28H28V4ZM12 22.6667H8.636V13.3333H12V22.6667ZM10.2587 11.6227C9.23067 11.6227 8.544 10.9373 8.544 10.0227C8.544 9.108 9.22933 8.42267 10.372 8.42267C11.4 8.42267 12.0867 9.108 12.0867 10.0227C12.0867 10.9373 11.4013 11.6227 10.2587 11.6227ZM24 22.6667H20.744V17.5653C20.744 16.1547 19.876 15.8293 19.5507 15.8293C19.2253 15.8293 18.14 16.0467 18.14 17.5653C18.14 17.7827 18.14 22.6667 18.14 22.6667H14.776V13.3333H18.14V14.636C18.5733 13.876 19.4413 13.3333 21.0693 13.3333C22.6973 13.3333 24 14.636 24 17.5653V22.6667Z"
                          fill="#F05758"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile Social Share - Bottom Bar */}
            {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] p-4 z-50 shadow-lg">
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => handleShare(shareUrls.facebook)}
                  className="flex flex-col items-center gap-1 text-[#1877F2]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-xs">Facebook</span>
                </button>
                <button
                  onClick={() => handleShare(shareUrls.twitter)}
                  className="flex flex-col items-center gap-1 text-[#000000]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="text-xs">Twitter</span>
                </button>
                <button
                  onClick={() => handleShare(shareUrls.linkedin)}
                  className="flex flex-col items-center gap-1 text-[#0A66C2]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227 0.792 24 1.771 24h20.451c0.979 0 1.771-0.773 1.771-1.729V1.729C24 0.774 23.204 0 22.225 0z" />
                  </svg>
                  <span className="text-xs">LinkedIn</span>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
