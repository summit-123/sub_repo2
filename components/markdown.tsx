import marked from "https://esm.sh/marked@3.0.8";     // prefer esm.sh CDN

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  const renderedContent = marked(content);

  return (
    <div
      class="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}
