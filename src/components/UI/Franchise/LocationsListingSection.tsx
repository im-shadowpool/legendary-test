import Subtitle from "@/components/Layouts/Subtitle";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import Image from "next/image";
import Link from "next/link";

const LocationsListingSection = ({ data }: any) => {
  const { title, description, subhead, items } = data;
  return (
    <section className="section bg-(--color-accent) py-[64px] lg:py-[120px]">
      <div className="custom-container flex flex-col items-center gap-12">
        {/* Header */}
        <div className="flex-center-col text-center gap-3 lg:gap-4 w-full lg:w-[90%]">
          <Subtitle text={subhead} color="dark" />
          <HeadingRenderer
            text={title}
            className="text-h2 text-(--color-secondary)"
          />

          <p className="text-body text-(--text-primary) w-full lg:w-[75%] mt-1">
            {description}
          </p>
        </div>
        {/* Location Listing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map((item: any, index: number) => (
            <Link
              href={item.url}
              key={index}
              className="group relative rounded-2xl overflow-hidden block shadow-2xs"
            >
              {/* Image */}
              <div className="relative p-2 bg-(--color-primary)">
                <div className="relative w-full custom-transition h-[250px] group-hover:h-[200px] lg:h-[388px] lg:group-hover:h-[330px] overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover custom-transition group-hover:scale-110"
                  />
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

                {/* Bottom Content (Slide Up) */}
                <div className="w-full p-4 pt-6 bg-(--color-primary)">
                  {/* Title */}
                  <div className="flex items-center gap-2">
                    <svg
                      className="flex-none"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12.75 1.5C10.5627 1.50248 8.46575 2.37247 6.91911 3.91911C5.37247 5.46575 4.50248 7.56273 4.5 9.75C4.5 16.8094 12 22.1409 12.3197 22.3641C12.4458 22.4524 12.596 22.4998 12.75 22.4998C12.904 22.4998 13.0542 22.4524 13.1803 22.3641C13.5 22.1409 21 16.8094 21 9.75C20.9975 7.56273 20.1275 5.46575 18.5809 3.91911C17.0343 2.37247 14.9373 1.50248 12.75 1.5ZM12.75 6.75C13.3433 6.75 13.9234 6.92595 14.4167 7.25559C14.9101 7.58524 15.2946 8.05377 15.5216 8.60195C15.7487 9.15013 15.8081 9.75333 15.6924 10.3353C15.5766 10.9172 15.2909 11.4518 14.8713 11.8713C14.4518 12.2909 13.9172 12.5766 13.3353 12.6924C12.7533 12.8081 12.1501 12.7487 11.6019 12.5216C11.0538 12.2946 10.5852 11.9101 10.2556 11.4167C9.92595 10.9234 9.75 10.3433 9.75 9.75C9.75 8.95435 10.0661 8.19129 10.6287 7.62868C11.1913 7.06607 11.9544 6.75 12.75 6.75Z"
                        fill="#090909"
                      />
                    </svg>
                    <h3 className="text-h3">{item.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-body text-(--text-primary) mt-0 group-hover:mt-2 h-0 custom-transition opacity-0 group-hover:opacity-100 group-hover:h-[50px]">
                    {item.description.length > 80
                      ? item.description.slice(0, 80) + "..."
                      : item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsListingSection;
