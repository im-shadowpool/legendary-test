type HeadingRendererProps = {
  text?: string;
  className?: string;
};

export default function HeadingRenderer({
  text,
  className = "",
}: HeadingRendererProps) {
  if (!text) return null;

  // Split by <span>...</span>
  const parts = text.split(/(<span>.*?<\/span>)/g);

  return (
    <h2 className={`${className}`}>
      {parts.map((part, index) => {
        if (part.startsWith("<span>")) {
          const cleanText = part.replace(/<\/?span>/g, "");
          return (
            <span key={index} className="text-(--color-brand)">
              {cleanText}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </h2>
  );
}
