type ParagraphRendererProps = {
  text?: string;
  className?: string;
};

export default function ParagraphRenderer({
  text,
  className = "",
}: ParagraphRendererProps) {
  if (!text) return null;

  const paragraphs = text
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={`paragraph-wrapper ${className}`}>
      {paragraphs.map((para, index) => (
        <p key={index}>{para}</p>
      ))}
    </div>
  );
}
