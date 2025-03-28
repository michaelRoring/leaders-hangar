import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { cn } from "@/lib/utils";

interface ResponsiveMarkdownProps {
  content?: string;
  className?: string;
}

export function ResponsiveMarkdown({
  content,
  className,
}: ResponsiveMarkdownProps) {
  if (!content) return null;

  return (
    <div
      className={cn(
        "prose prose-sm sm:prose-base lg:prose-lg max-w-none mt-6",
        className
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          // Make tables responsive
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-8">
              <table
                className="min-w-full divide-y divide-gray-200"
                {...props}
              />
            </div>
          ),
          // Make images responsive
          img: ({ node, ...props }) => (
            <img
              className="w-full h-auto rounded-lg my-4"
              {...props}
              loading="lazy"
            />
          ),
          // Make code blocks scroll on small screens
          pre: ({ node, ...props }) => (
            <div className="overflow-x-auto">
              <pre {...props} />
            </div>
          ),
          // Other custom element handling
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
