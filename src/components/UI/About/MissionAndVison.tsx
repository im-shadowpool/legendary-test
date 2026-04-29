import ParagraphRenderer from "@/components/Layouts/ParagraphRenderer";
import Subtitle from "@/components/Layouts/Subtitle";

export default function MissionAndVison({ data }: any) {
  const { subhead, title, items } = data;
  return (
    <section className="section py-[64px] lg:py-[120px]">
      <div className="custom-container flex-center-col gap-12 lg:gap-16">
        <div className="flex-center-col gap-3 lg:gap-4 text-center">
          <Subtitle text={subhead} color="dark" />
          <h2 className="text-h2 text-(--color-secondary)">{title}</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-16">
          {items?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-2 w-full lg:w-[50%] "
              >
                <h3 className="w-full AboutMissionHeading text-(--color-primary) bg-(--color-brand) p-5 lg:p-7 rounded-2xl">
                  {item.title}
                </h3>

                <ParagraphRenderer
                  text={item.description}
                  className="bg-(--color-accent) p-7 rounded-2xl h-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
