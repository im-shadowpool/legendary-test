import Button from "@/components/Layouts/Button";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import ParagraphRenderer from "@/components/Layouts/ParagraphRenderer";
import Subtitle from "@/components/Layouts/Subtitle";
import Image from "next/image";

const HomePageAbout = ({ data }: any) => {
  const { title, subhead, description, button, media } = data;
  return (
    <section className="section flex relative flex-col lg:flex-row overflow-hidden">
      <div className="custom-container pt-[64px] pb-[0px] lg:py-[120px]">
        <div className="flex-start-col gap-4 max-w-full lg:max-w-[610px]">
          <Subtitle text={subhead} color="dark" />
          <HeadingRenderer
            text={title}
            className="text-h2 text-(--color-secondary)"
          />
          <ParagraphRenderer text={description} className="mt-2 mb-4" />
          <Button text={button.text} href={button.url} />
        </div>
      </div>
      <Image
        src={media.url}
        alt="about section"
        width={1440}
        height={900}
        className="w-full max-w-[100vw] mt-[32px] scale-115 mr-0 lg:-mr-20 sm:scale-110 lg:mt-0 lg:scale-100 lg:max-w-[58vw] h-fit lg:absolute bottom-0 right-0 z-[-1]"
      />
    </section>
  );
};

export default HomePageAbout;
