import EventForm from "@/components/forms/EventForm";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import Subtitle from "@/components/Layouts/Subtitle";
import backup from "@/constants/data/backup.json";
import { resolveCMSData } from "@/utils/resolveCMSData";

const ContactSection = ({ data, slug }: any) => {
  const fallback = backup?.components?.contact_us_component;
  const finalData = resolveCMSData(data, fallback);

  const { title, subhead, description } = finalData;

  const paddingSection =
    slug === "contact-us"
      ? "pt-[180px] lg:pt-[264px]"
      : "pt-[64px] lg:pt-[120px]";

  console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  console.log(process.env.WP_CONTACT_API_KEY);
  console.log(process.env.RECAPTCHA_SECRET_KEY);

  return (
    <section className={`section pb-[64px] lg:pb-[120px] ${paddingSection}`}>
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
        {/* Form Section */}
        <EventForm />
      </div>
    </section>
  );
};

export default ContactSection;
