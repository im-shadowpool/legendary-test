import Button from "@/components/Layouts/Button";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import Subtitle from "@/components/Layouts/Subtitle";
import Image from "next/image";

const HomePageFranchiseOpportunity = ({ data }: any) => {
  const { title, subhead, description, button, media } = data;

  const [para, listHtml] = description?.split("<ul>") || [];

  const listItems =
    listHtml
      ?.replace("</ul>", "")
      ?.split("<li>")
      ?.map((item: string) => item.replace("</li>", "").trim())
      ?.filter(Boolean) || [];

  return (
    <section className="section relative bg-(--color-accent) py-[64px] lg:py-[120px]">
      <div className="custom-container flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-12">
        {/* Left section */}
        <div className="flex-start-col gap-4 w-full lg:w-[729px] shrink-0">
          <Subtitle text={subhead} color="dark" />
          <HeadingRenderer
            text={title}
            className="text-h2 text-(--color-secondary)"
          />

          <div
            className="paragraph-wrapper mt-2 mb-4"
            dangerouslySetInnerHTML={{ __html: para }}
          />

          {/* List */}
          <div className="flex-start-col gap-2 mb-4 lg:mb-6">
            {listItems.map((item: string, index: number) => (
              <span key={index} className="flex-start-row gap-2">
                <Image
                  src="/check-circle.svg"
                  alt="check"
                  width={20}
                  height={20}
                />
                <p className="text-body text-(--text-primary)">{item}</p>
              </span>
            ))}
          </div>

          <Button text={button.text} href={button.url} />
        </div>
        {/* Right Section */}
        <div className="w-full md:w-[343.125px] shrink-0">
          <video
            src={media.url}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HomePageFranchiseOpportunity;
