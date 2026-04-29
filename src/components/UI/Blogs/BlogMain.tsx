"use client";

import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import Subtitle from "@/components/Layouts/Subtitle";
import Link from "next/link";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 6;

export default function BlogMain({ data }: any) {
  const { header, data: blogs } = data;
  const { title, subhead, description } = header;

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Filter blogs (search)
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog: any) =>
      blog.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, blogs]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  // ✅ Reset page when searching
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };
  return (
    <section className="section paddingTopLightSection bg-(--color-accent) pb-[120px]">
      <div className="custom-container flex flex-col gap-16">
        {/* Header content */}
        <div className="flex items-end justify-between gap-12">
          <div className="flex-start-col gap-4">
            <Subtitle text={subhead} color="dark" />
            <HeadingRenderer
              text={title}
              className="text-h2 text-(--color-secondary)"
            />
            <div className="paragraph-wrapper mt-2 w-[75%]">
              <p>{description}</p>
            </div>
          </div>
          {/* Search */}
          <div className="relative flex shrink-0 w-[370px]">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="border-0 outline-none py-4 pr-6 border-b-1 border-[#CECECE] w-full transition-all duration-300 focus:outline-none focus:border-(--color-brand) hover:border-(--color-brand)"
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
        <div className="grid grid-cols-3 gap-8">
          {paginatedBlogs.map((blog: any) => (
            <Link href={`/blogs/${blog.slug}`} key={blog.id}>
              <div className="bg-white rounded-2xl p-2 hover:shadow transition-all duration-300">
                <div className="overflow-hidden rounded-lg h-[324px] w-full">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 p-6 pt-8">
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="text-body-low text-(--text-caption)">
                    {blog.categoryLabel} •{" "}
                    {new Date(blog.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY STATE */}
        {paginatedBlogs.length === 0 && (
          <p className="text-center mt-10 text-gray-500">No blogs found.</p>
        )}

        {/* FOOTER */}
        <div className="flex-between-row mt-10">
          {/* INFO */}
          <p className="text-body-low text-gray-500">
            Page {currentPage} | {filteredBlogs.length} results
          </p>

          {/* PAGINATION */}
          <div className="flex gap-2 items-center">
            {/* PREV */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="w-8 h-8 rounded-full border disabled:opacity-30"
            >
              ←
            </button>

            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-full border ${
                    currentPage === page ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* NEXT */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-8 h-8 rounded-full border disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
