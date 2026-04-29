import Button from "../Button";

export default function FAQCta({ data }: any) {
  const { title, description, button } = data;
  return (
    <section className="section bg-(--color-accent) pb-[64px] lg:pb-[120px]">
      <div className="custom-container">
        <div className="w-full p-6 lg:p-12 flex-center-col gap-4 bg-(--color-primary) rounded-4xl">
          <h3 className="text-[24px]! lg:text-[40px]! text-h3-primary text-(--color-secondary) text-center w-full lg:w-[642px]">
            {title}
          </h3>
          <p className="text-p text-(--text-primary) text-center w-full lg:w-[642px] mt-0 mb-2 lg:mt-2 lg:mb-4">
            {description}
          </p>
          <Button text={button.text} href={button.url} />
        </div>
      </div>
    </section>
  );
}
