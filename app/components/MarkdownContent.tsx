"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({node, ...props}: any) => <h1 {...props} />,
          h2: ({node, ...props}: any) => <h2 {...props} />,
          p: ({node, ...props}: any) => <p {...props} />,
          strong: ({node, ...props}: any) => (
            <strong className="font-bold text-[#005a8b]" {...props} />
          ),
          img: ({node, ...props}: any) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              {...props} 
              className="w-full h-auto rounded-xl shadow-md my-8 border border-gray-100" 
            />
          ),
          a: ({node, children, ...props}: any) => {
            const isExternal = props.href?.startsWith('http');
            return (
              <a 
                {...props} 
                className="text-[#005a8b] font-semibold underline-offset-4 hover:underline transition-all inline-flex items-baseline gap-0.5"
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                {children}
                {isExternal && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="inline-block w-[0.75em] h-[0.75em] ml-0.5 shrink-0 translate-y-[-0.05em]"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.182a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.56l-5.22 5.22a.75.75 0 11-1.06-1.06l5.22-5.22h-2.19a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </a>
            );
          },
        } as any}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
