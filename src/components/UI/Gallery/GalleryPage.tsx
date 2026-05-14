import HeadingRenderer from "@/components/Layouts/HeadingRenderer";
import Subtitle from "@/components/Layouts/Subtitle";
import { GalleryImageGrid } from "@/components/UI/Gallery/GalleryImageGrid";

const GalleryPage = ({ data }: any) => {
  const { title, subhead, description, items } = data;

  return (
    <>
      <section className="px-4 py-[64px] lg:py-[120px] flex-center-col gap-12 lg:gap-16 bg-(--color-accent)">
        <div className="flex-center-col gap-3 lg:gap-4 w-full lg:w-[1200px]">
          <Subtitle text={subhead} color="dark" />

          <HeadingRenderer
            text={title}
            className="text-h2 text-(--color-secondary) text-center"
          />
          <p className="text-(--text-primary) max-w-full mt-2 text-center w-full lg:w-[75%]">
            {description}
          </p>
        </div>

        <GalleryImageGrid images={items} />
      </section>
    </>
  );
};

export default GalleryPage;
