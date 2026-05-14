import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  slug: string;
  image: string;
  title: string;
  categoryLabel: string;
  date: string;
}

export default function BlogCard({
  slug,
  image,
  title,
  categoryLabel,
  date,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Truncate title
  const truncatedTitle = title.length > 45 ? title.slice(0, 45) + "..." : title;

  return (
    <Link href={`/blogs/${slug}`} className="block">
      <div
        title={title}
        className="bg-(--color-primary) relative group overflow-hidden rounded-2xl p-2 hover:shadow transition-all duration-300"
      >
        <div className="overflow-hidden rounded-lg h-[264px] w-full">
          <img
            src={image}
            alt={title}
            className="rounded-lg w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.41,0.99)]"
          />
        </div>
        <div className="flex flex-col gap-2 p-3 pt-4 lg:p-6 lg:pt-8">
          <h3
            aria-label={title}
            className="blog-card-title text-(--color-secondary) group-hover:text-(--color-brand) group-hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.41,0.99)]"
          >
            {truncatedTitle}
          </h3>
          <p className="text-body-low text-(--text-caption) group-hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.41,0.99)]">
            {categoryLabel} • {formattedDate}
          </p>
        </div>

        {/* Arrow (Top Right) */}
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <div className="translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.41,0.99)]">
            <Image
              src="/arrow button.svg"
              alt="event card cta"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
