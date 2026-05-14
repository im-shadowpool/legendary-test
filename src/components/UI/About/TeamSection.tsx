import Image from "next/image";
import Subtitle from "@/components/Layouts/Subtitle";
import HeadingRenderer from "@/components/Layouts/HeadingRenderer";

const rotations = [-3, 2, -1, 2, -1, 1, -2, 1];

export default function TeamSection({ data }: any) {
  const { subhead, title, description, items } = data;

  const firstRow = items.slice(0, 2);
  const secondRow = items.slice(2);

  return (
    <section className="section bg-(--color-brand) py-[64px] lg:py-[120px]">
      <div className="custom-container flex-center-col gap-12 lg:gap-16">
        {/* Heading */}
        <div className="text-center w-full lg:w-[900px] flex-center-col gap-4">
          <Subtitle text={subhead} color="light" />
          <HeadingRenderer
            text={title}
            className="text-h2 text-(--color-primary)"
          />
          <p className="text-body text-(--color-primary) mt-2 w-full lg:w-[75%]">
            {description}
          </p>
        </div>

        {/* Row 1 → Center 2 items */}
        {/* <div className="flex justify-center flex-col md:flex-row items-center gap-8 lg:gap-12 w-full">
          {firstRow.map((member: any, index: number) => (
            <Card key={index} member={member} index={index} />
          ))}
        </div> */}

        {/* Row 2 → 4 items */}
        <div className="flex flex-wrap flex-col md:flex-row justify-center items-center gap-8 lg:gap-6 w-full">
          {items.map((member: any, index: number) => (
            <Card key={index} member={member} index={index + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ member, index }: { member: any; index: number }) {
  const rotation = rotations[index % rotations.length];

  return (
    <div
      className="group w-[298px] perspective-[1000px] transition-all duration-800"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="relative w-full h-[384px] transition-transform duration-800 transform-3d group-hover:transform-[rotateY(180deg)]">
        {/* Front */}
        <div className="absolute border-8 border-(--color-primary) inset-0 bg-(--color-primary) rounded-2xl overflow-hidden backface-hidden flex flex-col gap-6">
          <div className="relative max-h-[270px] h-full overflow-hidden rounded-lg">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="mb-2 flex-center-col gap-2 text-center">
            <h3 className="text-h3 text-[20px]! leading-[26px] tracking-[-0.2px] uppercase">
              {member.name}
            </h3>
            <p className="text-body text-(--text-primary)">{member.role}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-(--color-primary) rounded-2xl p-5 flex items-center justify-center text-center transform-[rotateY(180deg)] backface-hidden">
          <p className="text-body text-(--text-primary)">
            {member.description}
          </p>
        </div>
      </div>
    </div>
  );
}
