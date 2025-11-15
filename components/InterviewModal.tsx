"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Interview } from "@/types/interview";

interface InterviewModalProps {
  interview: Interview;
  isOpen: boolean;
  onClose: () => void;
}

export default function InterviewModal({
  interview,
  isOpen,
  onClose,
}: InterviewModalProps) {
  const { theme } = useTheme();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const difficultyColors: Record<Interview["difficulty"], string> = {
    easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const categoryLabels: Record<Interview["category"], string> = {
    frontend: "프론트엔드",
    backend: "백엔드",
    javascript: "JavaScript",
    react: "React",
    typescript: "TypeScript",
    cs: "CS",
    algorithm: "알고리즘",
  };

  return (
    <div
      className="fixed inset-0 h-screen z-50 flex items-center justify-center p-4 bg-gray-500/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    difficultyColors[interview.difficulty]
                  }`}
                >
                  {interview.difficulty.toUpperCase()}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                  {categoryLabels[interview.category]}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {interview.question}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="닫기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            답변
          </h3>
          <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
            <ReactMarkdown
              components={{
                code(props) {
                  const { children, className, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  const isInline = !match;
                  const isDark = theme === "dark";

                  return !isInline ? (
                    <div className="not-prose">
                      <SyntaxHighlighter
                        // @ts-expect-error - style typing issue with react-syntax-highlighter
                        style={isDark ? vscDarkPlus : oneLight}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: "1rem 0",
                          padding: "1.25rem",
                          fontSize: "0.875rem",
                          lineHeight: "1.6",
                          borderRadius: "0.5rem",
                          backgroundColor: isDark ? "#1f2937" : "#f9fafb",
                          border: isDark
                            ? "1px solid #374151"
                            : "1px solid #e5e7eb",
                          boxShadow: isDark
                            ? "0 1px 3px 0 rgba(0, 0, 0, 0.3)"
                            : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                        }}
                        codeTagProps={{
                          style: {
                            fontFamily:
                              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                          },
                        }}
                        {...rest}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code
                      className="px-1.5 py-0.5 text-sm bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 rounded font-mono"
                      {...rest}
                    >
                      {children}
                    </code>
                  );
                },
                p({ children }) {
                  return (
                    <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      {children}
                    </p>
                  );
                },
                ul({ children }) {
                  return (
                    <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300 !pl-0">
                      {children}
                    </ul>
                  );
                },
                ol({ children }) {
                  return (
                    <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300 !pl-0">
                      {children}
                    </ol>
                  );
                },
                li({ children }) {
                  return <li className="ml-4">{children}</li>;
                },
                strong({ children }) {
                  return (
                    <strong className="font-bold text-gray-900 dark:text-gray-100">
                      {children}
                    </strong>
                  );
                },
                h3({ children }) {
                  return (
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">
                      {children}
                    </h3>
                  );
                },
                h4({ children }) {
                  return (
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-3 mb-2">
                      {children}
                    </h4>
                  );
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300">
                      {children}
                    </blockquote>
                  );
                },
                pre({ children }) {
                  return <div className="my-4">{children}</div>;
                },
              }}
            >
              {interview.answer}
            </ReactMarkdown>
          </div>

          {interview.tags.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap gap-2">
                {interview.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
