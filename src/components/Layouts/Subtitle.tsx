const Subtitle = ({
  text,
  color,
  className = "",
}: {
  text: string;
  color: string;
  className?: string;
}) => {
  const isLongText = text.length > 30;

  return (
    <div
      className={`flex items-center justify-start gap-2 ${
        isLongText ? "flex-col md:flex-row" : ""
      } ${className}`}
    >
      <img
        src={"/magnet.svg"}
        alt="magnet icon"
        className="w-[18px] h-[18px]"
      />
      <p
        className={`text-subtitle text-center ${
          color === "dark" ? "text-(--text-caption)" : "text-(--text-secondary)"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default Subtitle;
