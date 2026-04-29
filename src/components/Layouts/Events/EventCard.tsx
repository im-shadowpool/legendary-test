import Image from "next/image";
import Link from "next/link";

const EventCard = ({ item }: { item: any }) => {
  return (
    <Link href={`/event/${item.link}`} className="block group">
      <div className="relative w-full h-[370px] lg:h-[516px] overflow-hidden rounded-2xl">
        {/* FRONT */}
        <div className="absolute inset-0 z-2 transition-opacity duration-950 ease-[cubic-bezier(0.85,0,0.41,0.99)] group-hover:opacity-0">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={item.image1}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-950 ease-[cubic-bezier(0.85,0,0.41,0.99)] group-hover:scale-[1.15]"
            />

            <div className="absolute inset-0 bg-black/55" />
          </div>

          <div className="absolute inset-0 flex-center-col text-center p-6">
            <h5 className="text-(--color-primary) text-h3-primary text-center">
              {item.title}
            </h5>
          </div>
        </div>

        {/* BACK */}
        <Image
          src={item.image2}
          alt={item.title}
          fill
          className="object-cover scale-[1.2] transition-transform duration-[1000ms] ease-[cubic-bezier(0.85,0,0.41,0.99)] group-hover:scale-100"
        />
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <div className="translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.41,0.99)]">
            <Image
              src="/arrow button.svg"
              alt="event card cta"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
