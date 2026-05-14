"use client";

import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import Subtitle from "@/components/Layouts/Subtitle";
import BlogCard from "@/components/UI/Blogs/BlogCard";
import { useMemo, useState } from "react";
import ContactSection from "../Global/ContactSection";

const ITEMS_PER_PAGE = 6;

export default function BlogMain({ data }: any) {
  const { header, data: blogs } = data;
  const { title, subhead, description } = header;

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Add a small delay to ensure DOM is updated before scrolling
    setTimeout(() => {
      const element = document.getElementById("blogListing");
      if (element) {
        // 120px offset to accommodate headers and give breathing room
        const yOffset = -120;
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  // Filter blogs (search)
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog: any) =>
      blog.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, blogs]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  // Reset page when searching
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <>
      <section className="section pb-[64px] pt-[180px] lg:pb-[120px] lg:pt-[264px] bg-(--color-accent)">
        <div className="custom-container flex flex-col gap-12 lg:gap-16">
          {/* Header content */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12">
            <div className="flex-start-col gap-3 lg:gap-4">
              <Subtitle text={subhead} color="dark" />
              <HeadingRenderer
                text={title}
                className="text-h2 text-(--color-secondary)"
              />
              <div className="paragraph-wrapper mt-2 w-full lg:w-[80%]">
                <p>{description}</p>
              </div>
            </div>
            {/* Search */}
            <div className="relative flex shrink-0 w-full md:w-[370px]">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="border-0 outline-none py-4 pr-6 border-b border-[#CECECE] w-full transition-all duration-300 focus:outline-none focus:border-(--color-brand) hover:border-(--color-brand)"
              />
              <span className="absolute right-0 top-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M14.486 15.5352C14.7759 15.8251 15.2458 15.8251 15.5357 15.5352C15.8256 15.2454 15.8256 14.7754 15.5357 14.4855L15.0109 15.0104L14.486 15.5352ZM12.5366 6.76294H11.7944C11.7944 9.54145 9.54194 11.7939 6.76343 11.7939V12.5361V13.2784C10.3618 13.2784 13.2789 10.3613 13.2789 6.76294H12.5366ZM6.76343 12.5361V11.7939C3.98493 11.7939 1.7325 9.54145 1.7325 6.76294H0.990234H0.247967C0.247967 10.3613 3.16504 13.2784 6.76343 13.2784V12.5361ZM0.990234 6.76294H1.7325C1.7325 3.98444 3.98493 1.73201 6.76343 1.73201V0.989746V0.247478C3.16504 0.247478 0.247967 3.16455 0.247967 6.76294H0.990234ZM6.76343 0.989746V1.73201C9.54194 1.73201 11.7944 3.98444 11.7944 6.76294H12.5366H13.2789C13.2789 3.16455 10.3618 0.247478 6.76343 0.247478V0.989746ZM10.8871 10.8867L10.3623 11.4115L14.486 15.5352L15.0109 15.0104L15.5357 14.4855L11.412 10.3618L10.8871 10.8867Z"
                    fill="#4F4F4F"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Blog grid – using BlogCard */}
          <div
            id="blogListing"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 lg:gap-x-6 lg:gap-y-12"
          >
            {paginatedBlogs.map((blog: any) => (
              <BlogCard
                key={blog.id}
                slug={blog.slug}
                image={blog.image}
                title={blog.title}
                categoryLabel={blog.categoryLabel}
                date={blog.date}
              />
            ))}
          </div>

          {/* Empty state */}
          {paginatedBlogs.length === 0 && (
            <h2 className="text-h3-primary-large text-(--color-secondary) text-center">
              No blogs found, stay tuned.
            </h2>
          )}

          {/* Footer with pagination info and controls */}
          {paginatedBlogs.length !== 0 && (
            <div className="flex items-center justify-between flex-col lg:flex-row gap-4 lg:gap-0 w-full">
              <p className="text-body text-(--text-primary)">
                Page {currentPage} | {filteredBlogs.length} results
              </p>

              <div className="flex gap-2 items-center">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="w-8 h-8 flex-center-row rounded-full border border-(--color-brand) disabled:opacity-30 transition-all duration-500 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F05758"
                    strokeWidth={1.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className=""
                  >
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-full border border-(--color-brand) flex-center-row transition-all duration-500 ease-in-out ${
                        currentPage === page
                          ? "bg-(--color-brand) text-(--color-primary)"
                          : "bg-transparent text-(--color-brand)"
                      }`}
                    >
                      <p className="text-body">{page}</p>
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-8 h-8 flex-center-row rounded-full border border-(--color-brand) disabled:opacity-30 transition-all duration-500 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F05758"
                    strokeWidth={1.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
