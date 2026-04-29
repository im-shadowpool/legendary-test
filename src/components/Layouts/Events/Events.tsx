import Image from "next/image";
import Subtitle from "../Subtitle";
import EventCard from "./EventCard";
import Button from "../Button";
import HeadingRenderer from "../HeadingRenderer";

const Events = ({ data }: any) => {
  const { title, subhead, items } = data;
  return (
    <section className="bg-(--color-accent) py-[64px] lg:py-[120px] px-[16px] flex-start-col gap-12 lg:gap-16">
      <div className="custom-container flex-center-col gap-3 lg:gap-4">
        <Subtitle text={subhead} color="dark" />
        <HeadingRenderer
          text={title}
          className="text-h2 text-(--color-secondary) w-full lg:w-[900px] text-center"
        />
      </div>
      {/* Cards */}

      <div className="w-full">
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:flex max-sm:overflow-x-auto max-sm:gap-4 max-sm:pb-[18px] max-sm:snap-x">
          {/* Dynamic cards */}
          {items.map((item: any, i: number) => (
            <div key={i} className="max-sm:flex-[0_0_85%] max-sm:snap-start">
              <EventCard item={item} />
            </div>
          ))}

          {/* CTA CARD (manual) */}
          <div className="max-sm:flex-[0_0_85%] max-sm:snap-start">
            <div className="block group">
              <div className="relative w-full h-[370px] lg:h-[516px] overflow-hidden rounded-[16px]">
                <div className="relative w-full h-full">
                  <Image
                    src="https://magnetme.com.au/wp-content/uploads/2026/03/SnapInsta.to_625309095_18171328420388677_6784503685945725735_n.webp"
                    alt="Contact us"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/55" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 p-6">
                  <h5 className="text-(--color-primary) text-h3-primary">
                    Planning an event?
                  </h5>
                  <Button text="contact us now" href="/contact-us" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
