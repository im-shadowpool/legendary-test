import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import Subtitle from "@/components/Layouts/Subtitle";
import backup from "@/constants/data/backup.json";
import { resolveCMSData } from "@/utils/resolveCMSData";
import Script from "next/script";

const ContactSection = ({ data, slug }: any) => {
  const fallback = backup?.components?.contact_us_component;
  const finalData = resolveCMSData(data, fallback);

  const { title, subhead, description } = finalData;

  const paddingSection =
    slug === "contact-us"
      ? "pt-[180px] lg:pt-[264px] bg-(--color-accent)"
      : "pt-[64px] lg:pt-[120px]";

  // Determine which form to show based on slug ending with "franchise"
  const isFranchiseForm = slug && slug.endsWith("franchise");

  // Form configuration
  const formConfig = isFranchiseForm
    ? {
        src: "https://545779.17hats.com/p#/embed/sepe-voniZe_",
      }
    : {
        src: "https://magnetme.17hats.com/p#/embed/Vvf6tiNRKeSP",
      };

  return (
    <section
      id="contact-us"
      className={`section pb-[64px] lg:pb-[120px] ${paddingSection}`}
    >
      <div className="custom-container flex-center-col gap-16">
        {/* Header Section */}
        <div className="flex-center-col gap-3 lg:gap-4 w-full lg:w-[986px] text-center">
          <Subtitle text={subhead} color="dark" />
          <HeadingRenderer
            text={title}
            className="text-h2 text-(--color-secondary)"
          />
          <div className="paragraph-wrapper mt-2 w-full lg:w-[75%]">
            <p>{description}</p>
          </div>
        </div>

        {/* Conditional Form Section */}
        <div className={`w-full lg:w-[1000px] h-full`}>
          <iframe
            name="lc_contact_form"
            frameBorder="0"
            width="100%"
            height="1000"
            src={formConfig.src}
            className="w-full"
          />
        </div>

        {/* Shared iframe resizer script (loaded once) */}
        <Script
          src="https://magnetme.17hats.com/vendor/iframeSizer.min.js"
          strategy="lazyOnload"
        />
      </div>
    </section>
  );
};

export default ContactSection;
