import EventForm from "@/components/forms/EventForm";
import SampleForm from "@/components/forms/SampleForm";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import Subtitle from "@/components/Layouts/Subtitle";
import backup from "@/constants/data/backup.json";
import { resolveCMSData } from "@/utils/resolveCMSData";

const SamplesFormSection = () => {
  return (
    <section
      id="contact-us"
      className={`section bg-(--color-accent) pb-[64px] pt-[180px] lg:pb-[120px] lg:pt-[264px]`}
    >
      <div className="custom-container flex-center-col gap-8 lg:gap-16">
        {/* Header Section */}
        <div className="flex-center-col gap-3 lg:gap-4 w-full lg:w-[1286px] text-center">
          <Subtitle text={"PHOTO MAGNETS SAMPLES"} color="dark" />
          <HeadingRenderer
            text={"FREE PHOTO MAGNETS <span>SAMPLES</span>"}
            className="text-h2 text-(--color-secondary)"
          />
          <div className="paragraph-wrapper mt-2 w-full lg:w-[75%]">
            <p>
              If you haven’t seen our instant photo magnets before, we’d love to
              offer you a couple of magnets featuring your own photos. Simply
              upload 2 of your favourite photos along with your full postal
              address, and we’ll send your photo magnets to you.
            </p>
            <p>
              <b>
                Please make sure your photos are high quality so we can create
                the best possible photo magnets for you.
              </b>
            </p>
          </div>
        </div>
        {/* Images */}
        <div className="hidden relative md:flex items-center justify-center pb-12 lg:pb-8 ">
          {/* Card 1 */}
          <div className="relative w-[150px] lg:w-[280px] -rotate-6 hover:rotate-0 t`ransition-all duration-300 shadow-xl rounded-md overflow-hidden bg-white">
            <img
              src="https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/thankyou-2.webp"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 2 (center bigger) */}
          <div className="relative w-[150px] lg:w-[280px] rotate-2 hover:rotate-0 transition-all duration-300 shadow-2xl rounded-md overflow-hidden bg-white z-10">
            <img
              src="https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/thankyou-1.webp"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 3 */}
          <div className="relative w-[150px] lg:w-[280px] -rotate-2 hover:rotate-0 transition-all duration-300 shadow-xl rounded-md overflow-hidden bg-white">
            <img
              src="https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/thankyou-3.webp"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 4 */}
          <div className="relative w-[150px] lg:w-[280px] rotate-[5deg] hover:rotate-0 transition-all duration-300 shadow-xl rounded-md overflow-hidden bg-white">
            <img
              src="https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/thankyou-4.webp"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Form Section */}
        <SampleForm />
      </div>
    </section>
  );
};

export default SamplesFormSection;
